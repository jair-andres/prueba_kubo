const { body, param } = require('express-validator');

const createUserValidation = [
  body('username')
    .notEmpty()
    .withMessage('El nombre de usuario es obligatorio'),

  body('email')
    .isEmail()
    .withMessage('Debe ser un correo electrónico válido'),

  body('password')
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .withMessage('La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un símbolo')
];

const updateUserValidation = [
  param('id')
    .isInt()
    .withMessage('El ID debe ser un número entero'),

  body('username')
    .optional()
    .notEmpty()
    .withMessage('El nombre de usuario no puede estar vacío'),

  body('email')
    .optional()
    .isEmail()
    .withMessage('Debe ser un correo electrónico válido'),

  body('password')
    .optional()
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .withMessage('La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un símbolo')
];

const idParamValidation = [
  param('id')
    .isInt()
    .withMessage('El ID debe ser un número entero')
];

module.exports = {
  createUserValidation,
  updateUserValidation,
  idParamValidation
};
