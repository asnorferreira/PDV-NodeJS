import joi from "joi";

export const schemaClient = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
  }),
  email: joi.string().email().required().messages({
    "string.email": "O e-mail informado é inválido",
    "any.required": "O campo e-mail é obrigatório",
    "string.empty": "O campo e-mail é obrigatório",
  }),
  cpf: joi.string().min(11).required().messages({
    "string.empty": "O campo cpf é obrigatório",
    "any.required": "O campo cpf é obrigatório",
    "string.min": "O cpf deve conter no mínimo 11 números",
  }),
  cep: joi.string().optional(),
  rua: joi.string().optional(),
  numero: joi.number().optional(),
  bairro: joi.string().optional(),
  cidade: joi.string().optional(),
  estado: joi.string().optional(),
});
