import knex from "../../../configs/conection.js";

export const getProductID = async (req, res) => {
  const { id } = req.params;

  try {
    const existProduct = await knex("produtos").where("id", id).first();

    return res.status(200).json(existProduct);
  } catch (error) {
    console.error("Error ao efetuar listagem do produto: " + error);
    return res.status(500).json({ message: error.message });
  }
};
