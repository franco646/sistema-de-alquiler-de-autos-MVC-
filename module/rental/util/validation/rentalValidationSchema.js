const Joi = require('joi');

module.exports = Joi.object({
  id: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).required(),
  alquilerDesde: Joi.date().required()
    .messages({
      'date.base': 'Ingrese una la fecha de inicio del alquiler.',
    }),
  alquilerHasta: Joi.date().required()
    .messages({
      'date.base': 'Ingrese la fecha de finalizacion del alquiler.',
    }),
  medioDePago: Joi.string().required()
    .min(3)
    .max(30),
})
  .unknown(true)
  .messages({
    'string.empty': '{{ #label }} no puede estar vacío.',
    'string.min': '{{ #label }} debería tener un mínimo  de {#limit} caracteres.',
    'string.max': '{{ #label }} debería tener un máximo  de {#limit} caracteres.',
  });
