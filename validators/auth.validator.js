const { body } = require('express-validator');

const registerValidation = [
  body('username')
    .notEmpty()
    .withMessage('El nombre de usuario es obligatorio'),

  body('email')
    .isEmail()
    .withMessage('Debe ser un correo electrónico válido'),

  body('password')
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .withMessage(
      'La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un símbolo'
    )
];

const loginValidation = [
  body('username')
    .notEmpty()
    .withMessage('El nombre de usuario es obligatorio'),

  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
];

module.exports = { registerValidation, loginValidation };
