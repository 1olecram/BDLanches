import consultaSimples from "../database/BDLanchesConnection.js";

class BDLanchesRepository {

    // funcionarios

    async getFuncionario (){
        return consultaSimples('select * from funcionario_lanchonete', '', 'Erro ao buscar tabela')
    }

    async getByCPFFuncionario (cpf){
        return consultaSimples('select * from funcionario_lanchonete where cpf = $1', cpf, "Falha ao buscar CPF")
    }

    async postFuncionario (cpf, nome, email, salario, cargo){
        return consultaSimples('insert into funcionario_lanchonete values($1, $2, $3, $4, $5)', [cpf, nome, email, salario, cargo], "Falha ao inserir funcionário")
    }

    async putFuncionario (cpf, coluna, valor) {
        return consultaSimples(`update funcionario_lanchonete set ${coluna} = $1 where id = $2`, [valor, cpf], 'Falha na atualização dos dados')
    }

    async deleteFuncionario (cpf){
        return consultaSimples('delete from funcionario_lanchonete where id = $1', cpf, 'Falha na exclusão dos dados');
    }

    //trabalha na

    async getTrabalhaNa (){
        return consultaSimples("select * from trabalha_na", '', 'Erro ao achar coluna')
    }

    async getHistorico (cpf){
        return consultaSimples('select * from trabalha_na where cpf = $1', cpf, 'Erro ao buscar CPF')
    }

    async postTrabalhaNa (cpf, id_franquia, data_inicio, data_saida){
        return consultaSimples('insert into trabalha_na values($1, $2, $3, $4)', [cpf, id_franquia, data_inicio, data_saida], "Falha ao inserir funcionário")
    }

    // franquias

    async getFranquias() {
        return consultaSimples('SELECT * FROM franquia', '', 'Erro ao buscar franquias');
    }

    async getByIDFranquia(id) {
        return consultaSimples('SELECT * FROM franquia WHERE id_franquia = $1', id, 'Falha ao buscar franquia');
    }

    async getRelatorioFranquia(id) {
        return consultaSimples(
            'SELECT numero_vendas, receita_total FROM franquia WHERE id_franquia = $1',
            id,
            'Erro ao buscar relatório da franquia'
        );
    }

    async getPedidosPorFranquia(id) {
        return consultaSimples(
            `SELECT p.numero_pedido, p.data_hora, p.valor_total, f.nome AS funcionario
            FROM pedido_lanchonete p
            JOIN funcionario_lanchonete f ON f.cpf = p.cpf_func
            WHERE p.id_franquia = $1
            ORDER BY p.data_hora DESC`,
            id,
            'Erro ao buscar pedidos da franquia'
        );
    }

    async postFranquia(logradouro, cpf_gerente) {
        return consultaSimples(
            'INSERT INTO franquia (logradouro, cpf_gerente) VALUES ($1, $2)',
            [logradouro, cpf_gerente],
            'Falha ao inserir franquia'
        );
    }

    async putFranquia(id, coluna, valor) {
        return consultaSimples(
            `UPDATE franquia SET ${coluna} = $1 WHERE id_franquia = $2`,
            [valor, id],
            'Falha ao atualizar franquia'
        );
    }

    async deleteFranquia(id) {
        return consultaSimples('DELETE FROM franquia WHERE id_franquia = $1', id, 'Falha ao excluir franquia');
    }

    //cardapio

    async getProdutos() {
        return consultaSimples('SELECT * FROM cardapio', '', 'Erro ao buscar produtos');
    }

    async getProdutoByCodigo(codigo) {
        return consultaSimples('SELECT * FROM cardapio WHERE codigo = $1', codigo, 'Erro ao buscar produto');
    }

    async postProduto(descricao, preco_unit) {
        return consultaSimples(
            'INSERT INTO cardapio (descricao, preco_unit) VALUES ($1, $2)',
            [descricao, preco_unit],
            'Erro ao inserir produto'
        );
    }

    async putProduto(codigo, coluna, valor) {
        return consultaSimples(
            `UPDATE cardapio SET ${coluna} = $1 WHERE codigo = $2`,
            [valor, codigo],
            'Erro ao atualizar produto'
        );
    }

    async deleteProduto(codigo) {
        return consultaSimples('DELETE FROM cardapio WHERE codigo = $1', codigo, 'Erro ao excluir produto');
    }

    // pedido cardapio

    async putPedidoCardapio(numero_pedido, codigo, qtd_produto){
        return consultaSimples(
            `UPDATE pedido_cardapio SET qtd_produto = $1 WHERE codigo = $2 and numero_pedido = $3`,
            [qtd_produto, codigo, numero_pedido],
            'Erro ao atualizar produto'
        ); 
    }

    // estoque

    async getEstoque(id){
        return consultaSimples(
            'select * from estoque_franquia where id_franquia = $1',
            id,
            'Erro ao buscar franquia'
        )
    }

    async putEstoque (qtd, codigo, id_franquia){
        return consultaSimples(
            `UPDATE estoque_franquia SET qtd_estoque = $1 WHERE codigo = $2 and id_franquia = $3`,
            [qtd, codigo, id_franquia],
            'Erro ao atualizar produto'
        ); 
    }

    // pedido

    async getPedidos() {
        return consultaSimples('SELECT * FROM pedido_lanchonete', '', 'Erro ao buscar pedidos');
    }

    async getPedidoByNumero(numero) {
        return consultaSimples('SELECT * FROM pedido_lanchonete WHERE numero_pedido = $1', numero, 'Erro ao buscar pedido');
    }

    async postPedido(cpf_func, id_franquia, valor_total) {
        return consultaSimples(
            'INSERT INTO pedido_lanchonete (cpf_func, id_franquia, valor_total) VALUES ($1, $2, $3) RETURNING numero_pedido',
            [cpf_func, id_franquia, valor_total],
            'Erro ao criar pedido'
        );
    }

    async putPedido(numero_pedido, coluna, valor){
        return consultaSimples(
            `update pedido_lanchonete set ${coluna} = $1 where numero_pedido = $2`,
            [valor, numero_pedido],
            'Erro ao atualizar pedido'
        );
    }

    async deletePedido(numero_pedido){
        return consultaSimples('DELETE FROM pedido_lanchonete WHERE numero_pedido = $1', numero_pedido, 'Erro ao excluir produto');
    }

    // despesa

    async getDespesasFranquia(id_franquia) {
        return consultaSimples('SELECT * FROM despesa WHERE id_franquia = $1', id_franquia, 'Erro ao buscar despesas');
    }   

    async postDespesa(id_franquia, data_despesa, valor, tipo) {
        return consultaSimples(
            'INSERT INTO despesa (id_despesa, id_franquia, data_despesa, valor, tipo) VALUES ($1, $2, $3, $4)',
            [id_franquia, data_despesa, valor, tipo],
            'Erro ao registrar despesa'
        );
    }

    async putDespesa (id_despesa, coluna, valor){
        return consultaSimples(
            `update despesa set ${coluna} = $1 where id_despesa = $2`,
            [valor, id_despesa],
            'Erro ao atualizar pedido'
        )
    }

    async deleteDespesa (id_despesa){
        return consultaSimples('DELETE FROM despesa WHERE numero_pedido = $1', id_despesa, 'Erro ao excluir produto');
    }

    // sessions/login

    async confereDadosLogin(email, cpf){
        return consultaSimples('select * from funcionario_lanchonete where cpf = $1 and email = $2',
            [cpf, email],
            "Erro ao buscar cadastro"
        )
    }

}


export default new BDLanchesRepository();