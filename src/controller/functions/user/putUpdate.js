import knex from "../../../configs/conection.js";
import bcrypt from "bcrypt";

export const putUpdate = async (req, res) => {
  const { id } = req.usuario;
  const { nome, email, senha } = req.body;

  try {
    let encryptedPass = null;
    if (senha) {
      encryptedPass = await bcrypt.hash(senha, 10);
    }

    const updated = await knex("usuarios")
      .where("id", id)
      .update({ nome, email, senha: encryptedPass });

    if (updated === 0) {
      return res.status(404).json({ message: "ID não encontrado" });
    }

    return res.status(204).json({ message: "Usuário atualizado" });
  } catch (error) {
    console.error("Falha ao efetuar atualização dos dados, " + error.message);
    return res.status(500).json({ error: error.message });
  }
};
