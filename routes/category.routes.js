const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const validate = require('../middlewares/validate.middleware');
const {
  createCategoryValidation,
  updateCategoryValidation,
  categoryIdValidation
} = require('../validators/category.validator');
const auth = require('../middlewares/auth.middleware');

router.use(auth);

router.post(
  '/',
  validate(createCategoryValidation),
  categoryController.createCategory
);

router.get('/', categoryController.getCategories);

router.get(
  '/:id',
  validate(categoryIdValidation),
  categoryController.getCategoryById
);

router.put(
  '/:id',
  validate([...categoryIdValidation, ...updateCategoryValidation]),
  categoryController.updateCategory
);

router.delete(
  '/:id',
  validate(categoryIdValidation),
  categoryController.deleteCategory
);

module.exports = router;
