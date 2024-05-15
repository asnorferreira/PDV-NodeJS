import knex from "../../../configs/conection.js";

export const putClient = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  try {
    await knex("clientes").where("id", id).update({
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
    });
    return res.status(200).json({ mensagem: "Cliente atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
