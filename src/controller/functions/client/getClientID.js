import knex from "../../../configs/conection.js";

export const getClientID = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await knex("clientes").where("id", id).first();

    return res.status(200).json(client);
  } catch (error) {
    console.error("Erro ao obter cliente: " + error.message);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};
