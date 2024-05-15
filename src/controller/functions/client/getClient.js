import knex from "../../../configs/conection.js";

export const getClient = async (req, res) => {
  try {
    const existClient = await knex("clientes").select([
      "id",
      "nome",
      "email",
      "cpf",
      knex.raw("coalesce(cep, '') as cep"),
      knex.raw("coalesce(rua, '') as rua"),
      knex.raw("coalesce(numero, 0) as numero"),
      knex.raw("coalesce(bairro, '') as bairro"),
      knex.raw("coalesce(cidade, '') as cidade"),
      knex.raw("coalesce(estado, '') as estado"),
    ]);

    if (existClient.length === 0) {
      return res.status(404).json({
        message: "Não existem clientes cadastrados em seu banco de dados",
      });
    }

    return res.status(200).json(existClient);
  } catch (error) {
    console.error("Erro ao listar os clientes: " + error);
    return res.status(500).json({
      message: "Erro interno do servidor ao listar clientes.",
    });
  }
};
