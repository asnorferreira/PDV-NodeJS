import knex from "../../configs/conection.js";
import schema from "../validation/index.js";

export const validateClient = async (req, res, next) => {
  const { id } = req.params;
  const { email, cpf } = req.body;
  try {
    if (req.method === "PUT" || req.method === "GET") {
      const existingClient = await knex("clientes").where("id", id).first();
      if (!existingClient) {
        return res.status(400).json({ mensagem: "Cliente não encontrado!" });
      }
    }
    if (req.method === "PUT" || req.method === "POST") {
      await schema.schemaClient.validateAsync(req.body, { abortEarly: false });
      if (email) {
        const existingEmail = await knex("clientes")
          .where("email", email)
          .whereNot("id", id || null)
          .first();
        if (existingEmail) {
          return res
            .status(400)
            .json({ mensagem: "E-mail informado já cadastrado!" });
        }
      }

      if (cpf) {
        const existingCpf = await knex("clientes")
          .where("cpf", cpf)
          .whereNot("id", id || null)
          .first();
        if (existingCpf) {
          return res
            .status(400)
            .json({ mensagem: "CPF informado já cadastrado!" });
        }
      }
    }
    next();
  } catch (error) {
    console.error("Erro ao validar cliente:", error);
    return res.status(400).json({ error: error.message });
  }
};
