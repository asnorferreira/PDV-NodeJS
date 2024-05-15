import knex from "../../../configs/conection.js";

export const getCategories = async (req, res) => {
  try {
    const listCategories = await knex("categorias").select(["id", "descricao"]);

    return res.status(200).json(listCategories);
  } catch (error) {
    console.error("Falha ao listar as categorias " + error);
    return res.status(500).json({ mensagem: error.message });
  }
};
