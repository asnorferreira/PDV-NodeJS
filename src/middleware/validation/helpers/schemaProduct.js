import joi from "joi";

export const schemaProduct = joi.object({
  descricao: joi.string().required().messages({
    "any.required": "O campo descricao é obrigatório",
    "string.empty": "O campo descricao não pode estar vazio",
  }),
  quantidade_estoque: joi
    .number()
    .integer()
    .positive()
    .min(1)
    .required()
    .messages({
      "any.required": "O campo quantidade_estoque é obrigatório",
      "number.base": "A quantidade do estoque deve ser um número positivo",
      "number.integer": "A quantidade da estoque deve ser um número inteiro",
      "number.min": "O estoque deve conter no mínimo 1 item",
    }),
  valor: joi.number().integer().positive().min(1).required().messages({
    "any.required": "O campo valor é obrigatório",
    "number.base": "O valor deve ser um número positivo",
    "number.integer": "O valor deve ser um número inteiro",
    "number.min": "O valor não pode ser negativo ou igual a 0",
  }),
  categoria_id: joi.number().integer().positive().required().messages({
    "any.required": "O campo categoria_id é obrigatório",
    "number.base": "A categoria_id deve ser um número positivo",
    "number.integer": "A categoria_id deve ser um número inteiro",
  }),
  produto_imagem: joi.string().optional(),
});
