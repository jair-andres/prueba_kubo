const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const { registerValidation, loginValidation } = require('../validators/auth.validator');
const validate = require('../middlewares/validate.middleware');

router.post('/register', validate(registerValidation), controller.register);
router.post('/login', validate(loginValidation), controller.login);

module.exports = router;
