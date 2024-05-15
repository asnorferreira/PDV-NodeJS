import joi from "joi";

export const schemaUser = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
  }),
  email: joi.string().email().required().messages({
    "string.email": "O e-mail informado é inválido",
    "any.required": "O campo e-mail é obrigatório",
    "string.empty": "O campo e-mail é obrigatório",
  }),
  senha: joi.string().min(6).required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha é obrigatório",
    "string.min": "A senha deve conter no mínimo 6 caracteres",
  }),
});
