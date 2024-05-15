import knex from "../../configs/conection.js";
import schema from "../validation/index.js";

export const validateOrder = async (req, res, next) => {
  const { cliente_id, pedido_produtos } = req.body;

  try {
    await schema.schemaOrder.validateAsync(req.body, { abortEarly: false });

    const cliente = await knex("clientes").where("id", cliente_id).first();
    if (!cliente) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    for (const pedidoProduto of pedido_produtos) {
      const { produto_id, quantidade_produto } = pedidoProduto;

      const produto = await knex("produtos").where("id", produto_id).first();
      if (!produto) {
        return res
          .status(404)
          .json({ mensagem: `Produto com ID ${produto_id} não encontrado` });
      }

      if (produto.quantidade_estoque < quantidade_produto) {
        return res.status(400).json({
          mensagem: `Quantidade insuficiente em estoque para o produto ${produto.descricao}`,
        });
      }
    }

    next();
  } catch (error) {
    console.error("Erro ao validar pedido:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
