import knex from "../../../configs/conection.js";
import { uploadFile } from "../../helpers/storage.js";

export const putProduct = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } =
    req.body;
  const { id } = req.params;

  try {
    let imageUrl = null;

    if (req.file) {
      imageUrl = await uploadFile(
        req.file.originalname,
        req.file.buffer,
        req.file.mimetype
      );
    }

    const updatedProduct = await knex("produtos")
      .where({ id })
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem: imageUrl,
      })
      .returning([
        "id",
        "descricao",
        "quantidade_estoque",
        "valor",
        "categoria_id",
        "produto_imagem",
      ]);

    return res.status(201).json(updatedProduct[0]);
  } catch (error) {
    console.error("Erro efetuar cadastro de produto: ", error);
    return res.status(500).json({ message: error.message });
  }
};
