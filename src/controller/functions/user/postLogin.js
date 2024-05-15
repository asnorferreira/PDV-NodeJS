import knex from "../../../configs/conection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const postLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await knex("usuarios").where("email", email).first();

    if (!user) {
      return res
        .status(400)
        .json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }

    const validPassword = await bcrypt.compare(senha, user.senha);

    if (!validPassword) {
      return res
        .status(400)
        .json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_PASS,
      {
        expiresIn: "8h",
      }
    );

    const { senha: _, ...usuarioLogado } = user;

    return res.status(200).json({ usuario: usuarioLogado, token });
  } catch (error) {
    console.error("Erro ao efetuar login do usuário: ", error);
    return res.status(500).json({ message: error.message });
  }
};
