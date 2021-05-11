const Joi = require('joi');

module.exports = Joi.object({
  id: Joi.number(),
  email: Joi.string().email().required()
    .messages({
      'string.empty': 'Ingrese el email del cliente.',
      'string.email': 'Ingrese un email valido.',
    }),
  contraseña: Joi.string().required()
    .min(3)
    .max(30)
    .messages({
      'string.empty': 'Ingrese la contraseña.',
      'string.min': 'La contraseña debería tener un mínimo de {#limit} caracteres.',
      'string.max': 'La contraseña debería tener un maximo de {#limit} caracteres.',
    }),
  confirmarContraseña: Joi.any().equal(Joi.ref('contraseña')),
}).messages({
  'string.empty': '{{ #label }} no puede estar vacío.',
  'string.email': 'Ingrese un email valido.',
  'string.min': '{{ #label }} debería tener un mínimo  de {#limit} caracteres.',
  'string.max': '{{ #label }} debería tener un máximo  de {#limit} caracteres.',
  'any.only': 'Ambas contraseñas deben coincidir. ',
});
