import knex from "../../../configs/conection.js";
import bcrypt from "bcrypt";

export const postUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const encryptedPass = await bcrypt.hash(senha, 10);

    const newUser = await knex("usuarios")
      .insert({ nome, email, senha: encryptedPass })
      .returning(["id", "nome", "email"]);

    return res.status(201).json(newUser[0]);
  } catch (error) {
    console.error("Erro efetuar cadastro do usuário: ", error);
    return res.status(500).json({ message: error.message });
  }
};
