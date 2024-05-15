import knex from "../../configs/conection.js";
import schema from "../validation/index.js";

export const validateProduct = async (req, res, next) => {
  const { categoria_id } = req.body;
  const { id } = req.params;
  try {
    if (
      req.method === "GET" ||
      req.method === "DELETE" ||
      req.method === "PUT"
    ) {
      const existProduct = await knex("produtos").where("id", id).first();

      if (!existProduct) {
        return res
          .status(400)
          .json({ mensagem: "Produto não encontrado no sistema" });
      }
    }

    if (req.method === "DELETE") {
      const productOnOrders = await knex("pedido_produtos")
        .where("produto_id", id)
        .first();

      if (productOnOrders) {
        return res.status(400).json({
          mensagem:
            "O produto está vinculado a um ou mais pedidos e não pode ser excluído.",
        });
      }
    }

    if (req.method === "POST" || req.method === "PUT") {
      await schema.schemaProduct.validateAsync(req.body, { abortEarly: false });

      const existingCategory = await knex("categorias")
        .where("id", categoria_id)
        .first();
      if (!existingCategory) {
        return res
          .status(400)
          .json({ message: "A categoria informada não existe." });
      }
    }

    next();
  } catch (error) {
    console.error("Erro ao validar produto:", error);
    return res.status(400).json({ error: error.message });
  }
};
