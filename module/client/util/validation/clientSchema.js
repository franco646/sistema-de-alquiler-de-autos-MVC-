const Joi = require('joi');

module.exports = Joi.object({
  id: Joi.number().required(),
  nombres: Joi.string().regex(/^[a-z\d\-_\s]+$/i).required()
    .min(2)
    .max(30)
    .messages({
      'string.empty': 'Ingrese el nombre del cliente.',
      'string.min': 'El nombre debería tener un mínimo de {#limit} caracteres.',
      'string.max': 'El nombre debería tener un maximo de {#limit} caracteres.',
      'string.pattern.base': 'El nombre debe contener solo caracteres alfanuméricos.',
    }),
  apellidos: Joi.string().regex(/^[a-z\d\-_\s]+$/i).required()
    .min(2)
    .max(30)
    .messages({
      'string.empty': 'Ingrese el apellido del cliente.',
      'string.min': 'El apellido debería tener un mínimo de {#limit} caracteres.',
      'string.max': 'El apellido debería tener un maximo de {#limit} caracteres.',
      'string.pattern.base': 'El apellido debe contener solo caracteres alfanuméricos.',
    }),
  tipoDocumento: Joi.string().required()
    .min(3)
    .max(30),
  numeroDocumento: Joi.string().regex(/^[0-9]+$/i).required()
    .min(3)
    .max(30)
    .messages({
      'string.empty': 'Ingrese el numero de documento del cliente.',
      'string.min': 'El numero de documento debería tener un mínimo de {#limit} digitos.',
      'string.max': 'El numero de documento debería tener un maximo de {#limit} digitos.',
      'string.pattern.base': 'El numero de documento debe contener solo numeros.',
    }),
  fechaNacimiento: Joi.date().required()
    .messages({
      'date.base': 'Ingrese una fecha de nacimiento .',
    }),
  nacionalidad: Joi.string().regex(/^[a-z\d\-_\s]+$/i).required()
    .min(3)
    .max(30)
    .messages({
      'string.empty': 'Ingrese la nacionalidad del cliente.',
      'string.min': 'La nacionalidad debería tener un mínimo de {#limit} caracteres.',
      'string.max': 'La nacionalidad debería tener un maximo de {#limit} caracteres.',
      'string.pattern.base': 'La nacionalidad debe contener solo caracteres alfanuméricos.',
    }),
  direccion: Joi.string().regex(/^[a-z\d\-_.\s]+$/i).required()
    .min(3)
    .max(30)
    .messages({
      'string.empty': 'Ingrese la dirección del cliente.',
      'string.min': 'La dirección debería tener un mínimo de {#limit} caracteres.',
      'string.max': 'La dirección debería tener un maximo de {#limit} caracteres.',
      'string.pattern.base': 'La dirección debe contener solo caracteres alfanuméricos.',
    }),
  telefono: Joi.string().regex(/^[0-9]+$/i).required()
    .min(1)
    .max(30)
    .messages({
      'string.empty': 'Ingrese el numero de telefono del cliente.',
      'string.min': 'El telefono debería tener un mínimo de {#limit} digitos.',
      'string.max': 'El telefono debería tener un maximo de {#limit} digitos.',
      'string.pattern.base': 'El telefono debe contener solo numeros.',
    }),
  email: Joi.string().email().required()
    .messages({
      'string.empty': 'Ingrese el email del cliente.',
      'string.email': 'Ingrese un email valido.',
    }),

})
  .unknown(true)
  .messages({
    'string.empty': '{{ #label }} no puede estar vacío.',
    'string.min': '{{ #label }} debería tener un mínimo  de {#limit} caracteres.',
    'string.max': '{{ #label }} debería tener un máximo  de {#limit} caracteres.',
  });
