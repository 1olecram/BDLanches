import BDLanchesRepository from "../repository/BDLanchesRepository.js";

class BDLanchesController {

    // Tabela funcionario_lanchonete

    async getFuncionario (req, res){
        try {
            const resultado = await BDLanchesRepository.getFuncionario()
            res.json(resultado)
        } catch (error) {
            console.log(error)
        }
    }

    async getByCPFFuncionario(req, res){
        const cpf = req.params.cpf;
        const resultado = await BDLanchesRepository.getByCPFFuncionario(cpf);
            if (resultado.correto){

                // Confere Se houve alguma atualização, pois se tentar atualizar uma row que não existe no banco de dados, o código não dá erro, apenas não faz nada
                // Então, se por acaso o código não fizer nada, já retorna que não foi atualizado nada porque o ID fornecido não consta no banco.

                if(resultado.resultado.length > 0) res.json({ funcionario: resultado.resultado, busca: true})
                else res.json({ message: 'CPF não consta na base de dados', busca: false})
            } 
            else res.send(resultado.message)
        } catch (error) {
            console.log(error)
    }

    async postFuncionario(req,res){
        try{
            const {cpf, nome, email, salario, cargo} = req.body;
            const resultado = await BDLanchesRepository.postFuncionario(cpf, nome, email, salario, cargo)
            if (resultado.correto) res.json({ message: 'Funcionario cadastrado com sucesso!', cadastrado: true})
            else res.json({ message: resultado.message, cadastrado: false})
        } catch (error) {
            console.log(error)
        }
    }

    async putFuncionario (req,res){
        try {
            const cpf = req.params.cpf;
            const {coluna, valor} = req.body
            const resultado = await BDLanchesRepository.putFuncionario(cpf, coluna, valor)
            if (resultado.correto){

                // Confere Se houve alguma atualização, pois se tentar atualizar uma row que não existe no banco de dados, o código não dá erro, apenas não faz nada
                // Então, se por acaso o código não fizer nada, já retorna que não foi atualizado nada porque o ID fornecido não consta no banco.

                if(resultado.update > 0) res.send('Atualizado com sucesso!')
                else res.send('|CPF não consta na base de dados')
            } 
            else res.send(resultado.message)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteFuncionario(req,res){
        const cpf = req.params.cpf
        const resultado = await BDLanchesRepository.deleteFuncionario(cpf)
            if (resultado.correto){
                // Mesma lógica da atualização
                if(resultado.update > 0) res.json({ message: 'Excluído com sucesso!', exclusao: true})
                else res.json({ message: 'CPF não consta na base de dados', exclusao: false})
            } 
            else res.json({ message: resultado.message, exclusao: false})        
    }

    // Tabela Trabalha Na

    async getTrabalhaNa(req,res){
        try {
            const resultado = await BDLanchesRepository.getTrabalhaNa()
            res.json(resultado)           
        } catch (erro) {
            console.error(erro)
        }

    }

    async getHistorico(req,res){
        try {
            const cpf = req.params.cpf
            const resultado = await BDLanchesRepository.getHistorico(cpf)
            if (resultado.correto){
                if(resultado.resultado.length > 0) res.json({ funcionario: resultado.resultado, busca: true})
                else res.json({ message: 'CPF não consta na base de dados', busca: false})
            } 
            else res.send(resultado.message)
        } catch (error) {
            console.log(error)
        }
    }

    // Tabela Franquia

    async getFranquias(req,res){
        try {
            const resultado = await BDLanchesRepository.getFranquias()
            res.json(resultado)           
        } catch (erro) {
            console.error(erro)
        }

    }

    async getByIDFranquia(req,res){
        try {
            const id = req.params.id
            const resultado = await BDLanchesRepository.getByIDFranquia(id)
            if (resultado.correto){
                if(resultado.resultado.length > 0) res.json({ funcionario: resultado.resultado, busca: true})
                else res.json({ message: 'CPF não consta na base de dados', busca: false})
            } 
            else res.send(resultado.message)
        } catch (error) {
            console.log(error)
        }
    }

    async getRelatorioFranquia(req,res){
        try {
            const id = req.params.id
            const resultado = await BDLanchesRepository.getRelatorioFranquia(id)
            if (resultado.correto){
                if(resultado.resultado.length > 0) res.json({ funcionario: resultado.resultado, busca: true})
                else res.json({ message: 'CPF não consta na base de dados', busca: false})
            } 
            else res.send(resultado.message)
        } catch (error) {
            console.log(error)
        }
    }

    async getPedidosPorFranquia(req,res){
        try {
            const id = req.params.id
            const resultado = await BDLanchesRepository.getPedidosPorFranquia(id)
            if (resultado.correto){
                if(resultado.resultado.length > 0) res.json({ funcionario: resultado.resultado, busca: true})
                else res.json({ message: 'CPF não consta na base de dados', busca: false})
            } 
            else res.send(resultado.message)
        } catch (error) {
            console.log(error)
        }
    }

    async postFranquia(req, res){
        try {
            const {logradouro, cpf_gerente} = req.body;
            const resultado = await BDLanchesRepository.postFranquia(logradouro, cpf_gerente)
            if (resultado.correto) res.json({ message: 'Funcionario cadastrado com sucesso!', cadastrado: true})
            else res.json({ message: resultado.message, cadastrado: false})            
        } catch (error) {
            console.log(error)
        }
    }

    async putFranquia(req,res){
        try{
        const id = req.params.id;
        const {coluna, valor} = req.body
        const resultado = await BDLanchesRepository.putFranquia(id, coluna, valor)
        if (resultado.correto){
            if(resultado.update > 0) res.send('Atualizado com sucesso!')
            else res.send('Id não consta na base de dados')
        } 
        else res.send(resultado.message)
        } catch (error) {  
            console.log(error)
        }

    }

    async deleteFranquia(req,res){
        try {
            const id = req.params.id
            const resultado = await BDLanchesRepository.deleteFranquia(id)
                if (resultado.correto){
                    if(resultado.update > 0) res.json({ message: 'Excluído com sucesso!', exclusao: true})
                    else res.json({ message: 'CPF não consta na base de dados', exclusao: false})
                } 
                else res.json({ message: resultado.message, exclusao: false})              
        } catch (error) {
            console.log(error)
        }
      
    }

    async getProdutos(req, res){
        try {
            const resultado = await BDLanchesRepository.getProdutos()
            res.json(resultado)
        } catch (error) {
            console.log(error)
        }
    }

    async getProdutoByCodigo(req,res){
        try {
            const codigo = req.params.codigo
            const resultado = await BDLanchesRepository.getProdutoByCodigo(codigo)
            if (resultado.correto){
                if(resultado.resultado.length > 0) res.json({ funcionario: resultado.resultado, busca: true})
                else res.json({ message: 'Codigo não consta na base de dados', busca: false})
            } 
            else res.send(resultado.message)
        } catch (error) {
            console.log(error)
        }
    
    }

    async postProduto(req,res){
        try{
            const {descricao, preco_unit} = req.body
            const resultado = await BDLanchesRepository.postProduto(descricao, preco_unit)
            if (resultado.correto) res.json({ message: 'Funcionario cadastrado com sucesso!', cadastrado: true})
            else res.json({ message: resultado.message, cadastrado: false})
        } catch (error) {
            console.log(error)
        }


    }

    async putProduto(req,res){
        try{
            const codigo = req.params.codigo;
            const {coluna, valor} = req.body
            const resultado = await BDLanchesRepository.putProduto(codigo, coluna, valor)
            if (resultado.correto){
                if(resultado.update > 0) res.send('Atualizado com sucesso!')
                else res.send('Id não consta na base de dados')
            } 
            else res.send(resultado.message)
            } catch (error) {  
                console.log(error)
        }
    }

    async deleteProduto(req,res){
        try {
            const codigo = req.params.codigo
            const resultado = await BDLanchesRepository.deleteProduto(codigo)
                if (resultado.correto){
                    if(resultado.update > 0) res.json({ message: 'Excluído com sucesso!', exclusao: true})
                    else res.json({ message: 'CPF não consta na base de dados', exclusao: false})
                } 
                else res.json({ message: resultado.message, exclusao: false})              
        } catch (error) {
            console.log(error)
        }        
    }

    async getEstoque(req,res){
        try {
            const id = req.params.id;
            const resultado = await BDLanchesRepository.getEstoque(id)
            return res.json(resultado)
        } catch (error) {
            console.log(error)   
        }
    }

    async putEstoque (req,res){
        try{
            const codigo = req.params.codigo;
            const id_franquia = req.params.id_franquia
            const {qtd} = req.body
            const resultado = await BDLanchesRepository.putEstoque(qtd, codigo, id_franquia)
            if (resultado.correto){
                if(resultado.update > 0) res.send('Atualizado com sucesso!')
                else res.send('Codigo/ID não consta na base de dados')
            } 
            else res.send(resultado.message)
        } catch (error) {  
            console.log(error)
        }
    }


    async putPedidoCardapio(req, res){
        try{
            const codigo = req.params.codigo;
            const numero_pedido = req.params.numero_pedido
            const {qtd_produto} = req.body
            const resultado = await BDLanchesRepository.putPedidoCardapio(numero_pedido, codigo, qtd_produto)
            if (resultado.correto){
                if(resultado.update > 0) res.send('Atualizado com sucesso!')
                else res.send('Codigo/ID não consta na base de dados')
            } 
            else res.send(resultado.message)
        } catch (error) {  
            console.log(error)
        }
    } 

    async getPedidos(req, res){
        try {
            const resultado = await BDLanchesRepository.getPedidos()
            res.json(resultado)    
        } catch (error) {
            console.log(error)
        }
    }

    async getPedidoByNumero(req,res){
        try {
            const numero = req.params.numero
            const resultado = await BDLanchesRepository.getPedidoByNumero(numero)
            if (resultado.correto){
                if(resultado.resultado.length > 0) res.json({ funcionario: resultado.resultado, busca: true})
                else res.json({ message: 'Numero de pedido não consta na base de dados', busca: false})
            } 
            else res.send(resultado.message)
        } catch (error) {
            console.log(error)
        }        

    }

    async postPedido(req,res){
        try{
            const {cpf_func, id_franquia, valor_total} = req.body
            const resultado = await BDLanchesRepository.postPedido(cpf_func, id_franquia, valor_total)
            if (resultado.correto) res.json({ message: 'Funcionario cadastrado com sucesso!', cadastrado: true})
            else res.json({ message: resultado.message, cadastrado: false})
        } catch (error) {
            console.log(error)
        }
    } 

    async putPedido(req,res){
        try{
            const numero = req.params.numero
            const {coluna, valor} = req.body
            const resultado = await BDLanchesRepository.putPedido(numero, coluna, valor)
            if (resultado.correto){
                if(resultado.update > 0) res.send('Atualizado com sucesso!')
                else res.send('Id não consta na base de dados')
            } 
            else res.send(resultado.message)
        } catch (error) {  
            console.log(error)
        }
    } 

    async deletePedido (req, res){
        try {
            const numero = req.params.numero
            const resultado = await BDLanchesRepository.deletePedido(numero)
                if (resultado.correto){
                    if(resultado.update > 0) res.json({ message: 'Excluído com sucesso!', exclusao: true})
                    else res.json({ message: 'CPF não consta na base de dados', exclusao: false})
                } 
                else res.json({ message: resultado.message, exclusao: false})              
        } catch (error) {
            console.log(error)
        }        
    } 

    async getDespesasFranquia(req,res){
        try {
            const id = req.params.id
            const resultado = await BDLanchesRepository.getDespesasFranquia(id)
                if (resultado.correto){
                    if(resultado.resultado.length > 0) res.json({ funcionario: resultado.resultado, busca: true})
                    else res.json({ message: 'Numero de pedido não consta na base de dados', busca: false})
                } 
                else res.json({ message: resultado.message, exclusao: false})              
        } catch (error) {
            console.log(error)
        }
    }

    async postDespesa(req,res){
        try{
            const {id_franquia, data_despesa, valor, tipo} = req.body
            const resultado = await BDLanchesRepository.postDespesa(id_franquia, data_despesa, valor, tipo)
            if (resultado.correto) res.json({ message: 'Funcionario cadastrado com sucesso!', cadastrado: true})
            else res.json({ message: resultado.message, cadastrado: false})
        } catch (error) {
            console.log(error)
        }
    } 

    async putDespesa(req,res){
        try{
            const id = req.params.id
            const {coluna, valor} = req.body
            const resultado = await BDLanchesRepository.putDespesa(id, coluna, valor)
            if (resultado.correto){
                if(resultado.update > 0) res.send('Atualizado com sucesso!')
                else res.send('Id não consta na base de dados')
            } 
            else res.send(resultado.message)
        } catch (error) {  
            console.log(error)
        }                
    } 

    async deleteDespesa (req,res){
        try {
            const id = req.params.id
            const resultado = await BDLanchesRepository.deleteDespesa
                if (resultado.correto){
                    if(resultado.update > 0) res.json({ message: 'Excluído com sucesso!', exclusao: true})
                    else res.json({ message: 'CPF não consta na base de dados', exclusao: false})
                } 
                else res.json({ message: resultado.message, exclusao: false})              
        } catch (error) {
            console.log(error)
        } 
    }

}


export default new BDLanchesController()
