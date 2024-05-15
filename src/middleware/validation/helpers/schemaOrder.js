import Joi from "joi";

export const schemaOrder = Joi.object({
  cliente_id: Joi.number().integer().positive().required().messages({
    "number.base": "O cliente_id deve ser um número positivo",
    "number.integer": "O cliente_id deve ser um número inteiro",
    "number.positive": "O cliente_id deve ser um número positivo",
    "any.required": "O campo cliente_id é obrigatório",
  }),
  observacao: Joi.string().optional(),
  pedido_produtos: Joi.array()
    .items(
      Joi.object({
        produto_id: Joi.number().integer().positive().required().messages({
          "number.base": "O produto_id deve ser um número positivo",
          "number.integer": "O produto_id deve ser um número inteiro",
          "number.positive": "O produto_id deve ser um número positivo",
          "any.required": "O campo produto_id é obrigatório",
        }),
        quantidade_produto: Joi.number()
          .integer()
          .positive()
          .required()
          .messages({
            "number.base": "A quantidade_produto deve ser um número positivo",
            "number.integer": "A quantidade_produto deve ser um número inteiro",
            "number.positive":
              "A quantidade_produto deve ser um número positivo",
            "any.required": "O campo quantidade_produto é obrigatório",
          }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "Deve haver pelo menos um produto no pedido",
      "any.required": "O campo pedido_produtos é obrigatório",
    }),
});
