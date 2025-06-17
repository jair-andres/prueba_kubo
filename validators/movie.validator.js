const { body, param, query } = require('express-validator');

exports.createMovieValidation = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),

  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),

  body('date')
    .notEmpty().withMessage('Date is required')
    .isISO8601().withMessage('Date must be a valid date (YYYY-MM-DD)'),

  body('category_id')
    .notEmpty().withMessage('Category ID is required')
    .isInt({ gt: 0 }).withMessage('Category ID must be a positive integer'),
];

exports.updateMovieValidation = [
  body('name')
    .optional()
    .isString().withMessage('Name must be a string'),

  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),

  body('date')
    .optional()
    .isISO8601().withMessage('Date must be a valid date (YYYY-MM-DD)'),

  body('category_id')
    .optional()
    .isInt({ gt: 0 }).withMessage('Category ID must be a positive integer'),
];

exports.movieIdValidation = [
  param('id')
    .isInt({ gt: 0 }).withMessage('Movie ID must be a positive integer'),
];

exports.getAllMoviesValidation = [
  query('title')
    .optional()
    .isString().withMessage('Title must be a string'),

  query('category_id')
    .optional()
    .isInt({ gt: 0 }).withMessage('Category ID must be a positive integer'),

  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1 }).withMessage('Limit must be a positive integer'),

  query('sort')
    .optional()
    .isIn(['asc', 'desc']).withMessage('Sort must be either asc or desc'),
];
