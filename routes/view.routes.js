const express = require('express');
const router = express.Router();
const { markMovieAsViewed, listUsersWithViewedMovies } = require('../controllers/view.controller');
const viewValidation = require('../validators/view.validators');
const validate = require('../middlewares/validate.middleware');
const auth = require('../middlewares/auth.middleware');

router.use(auth);
router.post('/', validate(viewValidation), markMovieAsViewed);
router.get('/users', listUsersWithViewedMovies);

module.exports = router;
