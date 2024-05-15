export const getUser = async (req, res) => {
  try {
    const usuario = req.usuario;
    return res.status(201).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    });
  } catch (error) {
    console.log("Erro ao listar Usuario: ", error);
    return res.status(500).json({ menssagem: error.message });
  }
};
