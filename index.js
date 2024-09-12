const { select, input } = require('@inquirer/prompts')

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
                console.log("Vamos Listar")
                break
            case "sair":
                console.log("Ate a proxima!")
                return
        }
    }
    
}

start()