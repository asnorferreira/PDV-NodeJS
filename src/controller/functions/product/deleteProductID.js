import knex from "../../../configs/conection.js";
import { deleteFile } from "../../helpers/storage.js";

export const deleteProductID = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await knex("produtos").where("id", id).first();

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    const imagemPath = produto.produto_imagem;
    if (imagemPath) {
      await deleteFile(imagemPath);
    }

    await knex("produtos").where("id", id).del();

    return res.status(200).json({ mensagem: "Produto excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
