const Joi = require('joi');

module.exports = Joi.object({
  id: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).required(),
  marca: Joi.string().regex(/^[a-z\d\-_\s]+$/i).required()
    .min(3)
    .max(30)
    .messages({
      'string.empty': 'Ingrese la marca del auto.',
      'string.min': 'La marca debería tener un mínimo de {#limit} caracteres.',
      'string.max': 'La marca debería tener un maximo de {#limit} caracteres.',
      'string.pattern.base': 'La marca debe contener solo caracteres alfanuméricos.',
    }),
  modelo: Joi.string().regex(/^[a-z\d\-_\s]+$/i).required()
    .min(3)
    .max(30)
    .messages({
      'string.empty': 'Ingrese el modelo del auto.',
      'string.min': 'El modelo debería tener un mínimo de {#limit} caracteres.',
      'string.max': 'El modelo debería tener un maximo de {#limit} caracteres.',
      'string.pattern.base': 'El modelo debe contener solo caracteres alfanuméricos.',
    }),
  año: Joi.string().regex(/^[0-9]+$/i).required()
    .min(3)
    .max(30)
    .messages({
      'string.empty': 'Ingrese el año del auto.',
      'string.min': 'El año debería tener un mínimo de {#limit} digitos.',
      'string.max': 'El año debería tener un maximo de {#limit} digitos.',
      'string.pattern.base': 'El año debe contener solo numeros.',
    }),
  kms: Joi.string().regex(/^[0-9]+$/i).required()
    .min(0)
    .max(30)
    .messages({
      'string.empty': 'Ingrese los kilometros del auto.',
      'string.min': 'Los kilometros deberían tener un mínimo de {#limit} digitos.',
      'string.max': 'Los kilometros deberían tener un maximo de {#limit} digitos.',
      'string.pattern.base': 'Los kilometros deben ser solo numeros.',
    }),
  color: Joi.string().regex(/^[a-z\d\-_\s]+$/i).required()
    .min(3)
    .max(30)
    .messages({
      'string.empty': 'Ingrese el color del auto.',
      'string.min': 'El color debería tener un mínimo de {#limit} caracteres.',
      'string.max': 'El color debería tener un maximo de {#limit} caracteres.',
      'string.pattern.base': 'El color debe contener solo caracteres alfanuméricos.',
    }),
  imagen: Joi.string().optional(),
  pasajeros: Joi.number().required()
    .min(1)
    .max(30),
  manualAutomatico: Joi.string().required()
    .min(3)
    .max(30),
  precioAlquilerPorDia: Joi.string().regex(/^[0-9]+$/i).required()
    .min(0)
    .max(30)
    .messages({
      'string.empty': 'Ingrese el precio del alquiler por día del auto.',
      'string.min': 'El precio del alquiler debería tener un mínimo de {#limit} digitos.',
      'string.max': 'El precio del alquiler debería tener un maximo de {#limit} digitos.',
      'string.pattern.base': 'El precio del alquiler debe contener solo numeros.',
    }),
  aireAcondicionado: Joi.string().required()
    .min(2)
    .max(30)
    .messages({
      'any.required': 'Seleccione una opción para "Aire acondicionado".',
    }),
  disponible: Joi.alternatives(
    Joi.boolean(),
    Joi.number(),
  ),
})
  .unknown(true)
  .messages({
    'string.pattern.base': '{{ #label }} Debe contener solo caracteres alfanuméricos.',
    'string.empty': '{{ #label }} no puede estar vacío.',
    'string.min': '{{ #label }} debería tener un mínimo  de {#limit} caracteres.',
    'string.max': '{{ #label }} debería tener un máximo  de {#limit} caracteres.',
  });
