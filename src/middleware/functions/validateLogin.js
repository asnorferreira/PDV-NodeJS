import joi from "joi";

export const validateLogin = async (req, res, next) => {
  try {
    const schemaLogin = joi.object({
      email: joi.string().email().required().messages({
        "string.email": "O e-mail informado é inválido",
        "any.required": "O campo e-mail é obrigatório",
      }),
      senha: joi.string().min(6).required().messages({
        "string.min": "A senha deve conter no mínimo 6 caracteres",
        "any.required": "O campo senha é obrigatório",
      }),
    });

    const { error } = schemaLogin.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ mensagem: error.details.map((detail) => detail.message) });
    }

    next();
  } catch (error) {
    console.error("Erro no middleware de validação: ", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
