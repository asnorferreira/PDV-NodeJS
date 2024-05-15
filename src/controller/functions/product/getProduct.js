import knex from "../../../configs/conection.js";

export const getProduct = async (req, res) => {
  const { categoria_id } = req.query;

  try {
    if (categoria_id) {
      const existingCategory = await knex("categorias")
        .where("id", categoria_id)
        .first();
      if (!existingCategory) {
        return res.status(404).json({
          message: `Categoria informada incorreta!`,
        });
      }
      const listProducts = await knex("produtos").where(
        "categoria_id",
        categoria_id
      );

      return res.status(200).json(listProducts);
    }

    const listProducts = await knex("produtos");
    return res.status(200).json(listProducts);
  } catch (error) {
    console.error("Error ao listar os produtos: " + error.message);
    return res.status(500).json({ message: error.message });
  }
};