const { body } = require('express-validator');

const viewValidation = [
  body('user_id')
    .notEmpty().withMessage('user_id is required')
    .isInt({ min: 1 }).withMessage('user_id must be a valid integer'),

  body('movie_id')
    .notEmpty().withMessage('movie_id is required')
    .isInt({ min: 1 }).withMessage('movie_id must be a valid integer')
];

module.exports = viewValidation;
