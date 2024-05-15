import knex from "../../configs/conection.js";
import jwt from "jsonwebtoken";

export const verifyAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Token de autenticação ausente" });
  }

  try {
    const token = authorization.replace("Bearer ", "").trim();

    const { id } = jwt.verify(token, process.env.JWT_PASS);

    const user = await knex("usuarios").where({ id }).first();

    if (!user) {
      return res.status(401).json({ mensagem: "Não autorizado" });
    }

    const { senha, ...usuario } = user;

    req.usuario = usuario;

    next();
  } catch (error) {
    console.error("Error ao efetuar a verificação de autenticação", error);
    return res.status(401).json({ mensagem: error.message });
  }
};
