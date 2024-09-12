const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: "Tomar 3L de agua por dia",
    checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:"})

    if(meta.length == 0) {
        console.log('A meta nao pode estar vazia.')
        return
    }

    metas.push({ value: meta, checked: false })
}

const listarMeta = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaco para marcar ou desmarcar e o Enter para finalizar esta etapa.",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        console.log('Nenhuma meta selecionada')
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log('Meta(s) marcadas como concluida(s)')
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        console.log('Nao existem metas realizadas! :(')
        return
    }

    await select({
        message: "Metas Realizadas " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.checked
    })

    if(abertas.length == 0) {
        console.log('Nao existem metas abertas! :)')
        return
    }

    await select({
        message: "Metas Abertas " + abertas.length,
        choices: [...abertas]
    })
}

const start = async () => {
    
    while(true){

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar Metas",
                    value: "cadastrar"
                },
                {
                    name: "Listar Metas",
                    value: "listar"
                },
                {
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "abertas"
                },
                {
                    nome: "Sair",
                    value: "sair"
                }
            ]
        })


        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMeta()
                break
            case "realizadas":
                    await metasRealizadas()
                    break
            case "abertas":
                    await metasAbertas()
                    break
            case "sair":
                console.log("Ate a proxima!")
                return
        }
    }
    
}

start()