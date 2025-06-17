const { body, param } = require('express-validator');

exports.createCategoryValidation = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),
];

exports.updateCategoryValidation = [
  body('name')
    .optional()
    .notEmpty().withMessage('Name cannot be empty')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),
];

exports.categoryIdValidation = [
  param('id')
    .isInt({ gt: 0 }).withMessage('Category ID must be a positive integer'),
];
