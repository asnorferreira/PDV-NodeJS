import knex from "../../configs/conection.js";
import schema from "../validation/index.js";

export const validateUser = async (req, res, next) => {
  const { email } = req.body;
  const userId = req.usuario?.id;
  try {
    await schema.schemaUser.validateAsync(req.body, { abortEarly: false });

    if (req.method === "POST") {
      const existingUser = await knex("usuarios").where("email", email).first();

      if (existingUser) {
        return res
          .status(400)
          .json({ mensagem: "E-mail informado já existe!" });
      }
    }

    if (req.method === "PUT") {
      const existingEmail = await knex("usuarios")
        .where("email", email)
        .whereNot("id", userId)
        .first();

      if (existingEmail) {
        return res.status(400).json({
          mensagem:
            "O e-mail informado já está sendo utilizado por outro usuário.",
        });
      }
    }

    next();
  } catch (error) {
    console.error("Erro ao validar usuário:", error);
    return res.status(400).json({ error: error.message });
  }
};
