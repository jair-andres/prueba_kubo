const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  createUserValidation,
  updateUserValidation,
  idParamValidation
} = require('../validators/user.validator');

router.post('/', auth, validate(createUserValidation), controller.create);
router.get('/', auth, controller.findAll);
router.get('/:id', auth, validate(idParamValidation), controller.findOne);
router.put('/:id', auth, validate(updateUserValidation), controller.update);
router.delete('/:id', auth, validate(idParamValidation), controller.delete);

module.exports = router;
