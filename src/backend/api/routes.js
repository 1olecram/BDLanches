import { Router } from 'express';
import BDLanchesController from '../app/controllers/BDLanchesController.js';

const router = Router();

/**
 * Rotas para manipulação de funcionários.
 */
router.get('/funcionarios', BDLanchesController.getFuncionario);
router.get('/funcionarios/:cpf', BDLanchesController.getByCPFFuncionario);
router.post('/funcionarios', BDLanchesController.postFuncionario);
router.put('/funcionarios/:cpf', BDLanchesController.putFuncionario);
router.delete('/funcionarios/:cpf', BDLanchesController.deleteFuncionario);

/**
 * Rotas para histórico de trabalho (TRABALHA_NA).
 */
router.get('/trabalhos/', BDLanchesController.getTrabalhaNa);
router.get('/trabalhos/:cpf', BDLanchesController.getHistorico);

/**
 * Rotas para manipulação de franquias.
 */
router.get('/franquias', BDLanchesController.getFranquias);
router.get('/franquias/:id', BDLanchesController.getByIDFranquia);
router.get('/franquias/:id/relatorio', BDLanchesController.getRelatorioFranquia);
router.get('/franquias/:id/pedidos', BDLanchesController.getPedidosPorFranquia);
router.post('/franquias', BDLanchesController.postFranquia);
router.put('/franquias/:id', BDLanchesController.putFranquia);
router.delete('/franquias/:id', BDLanchesController.deleteFranquia);

/**
 * Rotas para manipulação de produtos do cardápio.
 */
router.get('/produtos', BDLanchesController.getProdutos);
router.get('/produtos/:codigo', BDLanchesController.getProdutoByCodigo);
router.post('/produtos', BDLanchesController.postProduto);
router.put('/produtos/:codigo', BDLanchesController.putProduto);
router.delete('/produtos/:codigo', BDLanchesController.deleteProduto);

/**
 * Rotas para manipulação de estoque por franquia.
 */
router.get('/estoque/:id_franquia', BDLanchesController.getEstoque)
router.put('/estoque/:id_franquia/:codigo', BDLanchesController.putEstoque);

/**
 * Rotas para itens do pedido (pedido_cardapio).
 * 
 */
router.put('/pedidos-cardapio/:numero_pedido/:codigo', BDLanchesController.putPedidoCardapio);

/**
 * Rotas para manipulação de pedidos.
 */
router.get('/pedidos', BDLanchesController.getPedidos);
router.get('/pedidos/:numero', BDLanchesController.getPedidoByNumero);
router.post('/pedidos', BDLanchesController.postPedido);
router.put('/pedidos/:numero', BDLanchesController.putPedido);
router.delete('/pedidos/:numero', BDLanchesController.deletePedido);

/**
 * Rotas para despesas.
 */
router.get('/franquias/:id/despesas', BDLanchesController.getDespesasFranquia);
router.post('/despesas', BDLanchesController.postDespesa);
router.put('/despesas/:id_despesa', BDLanchesController.putDespesa);
router.delete('/despesas/:id_despesa', BDLanchesController.deleteDespesa);

export default router;