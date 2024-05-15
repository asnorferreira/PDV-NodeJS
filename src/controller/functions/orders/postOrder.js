import knex from "../../../configs/conection.js";
import { send } from "../../../configs/services.js";
import { compilatorHtml } from "../../../utils/compilatorHtml.js";

export const postOrder = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    const produtos = await knex("produtos").select("*");

    const valor_total = pedido_produtos.reduce((acc, item) => {
      const produto = produtos.find(
        (produto) => produto.id === item.produto_id
      );
      return acc + produto.valor * item.quantidade_produto;
    }, 0);

    const pedido = await knex("pedidos")
      .insert({
        cliente_id,
        observacao: observacao || null,
        valor_total,
      })
      .returning("id");

    const produtosPedidoQuery = pedido_produtos.map((item) => {
      return knex("pedido_produtos")
        .insert({
          pedido_id: pedido[0].id,
          produto_id: item.produto_id,
          quantidade_produto: item.quantidade_produto,
          valor_produto: produtos.find(
            (produto) => produto.id === item.produto_id
          ).valor,
        })
        .returning("*");
    });

    const [pedidoProdutos] = await Promise.all(produtosPedidoQuery);

    const retorno = {
      pedido_id: pedido,
      cliente_id,
      observacao,
      valor_total,
      pedidoProdutos,
    };

    const cliente = await knex("clientes").where("id", cliente_id).first();
    const html = await compilatorHtml("./src/template/index.html", {
      nameuser: cliente.nome,
    });
    await send(cliente.email, "Confirmação de Pedido", html);

    return res.status(200).json(retorno);
  } catch (error) {
    console.error("Error ao cadastrar pedidos: " + error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
