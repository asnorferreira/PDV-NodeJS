import knex from "../../../configs/conection.js";

export const postClient = async (req, res) => {
  const { nome, email, cpf } = req.body;

  try {
    const [newClientId] = await knex("clientes")
      .insert({ nome, email, cpf })
      .returning("id");

    const newClient = {
      id: newClientId,
      nome,
      email,
    };

    return res.status(201).json(newClient);
  } catch (error) {
    console.error("Error ao cadastrar cliente: " + error.message);
    return res.status(500).json({ message: error.message });
  }
};
