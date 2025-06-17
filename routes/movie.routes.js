const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const validate = require('../middlewares/validate.middleware');
const {
  createMovieValidation,
  updateMovieValidation,
  movieIdValidation,
  getAllMoviesValidation
} = require('../validators/movie.validator');
const auth = require('../middlewares/auth.middleware');

router.use(auth);
router.post(
  '/',
  validate(createMovieValidation),
  movieController.createMovie
);

router.get(
  '/',
  validate(getAllMoviesValidation),
  movieController.getAllMovies
);

router.get(
  '/new_releases',
  movieController.getNewReleases
);

router.get(
  '/:id',
  validate(movieIdValidation),
  movieController.getMovieById
);

router.put(
  '/:id',
  validate([...movieIdValidation, ...updateMovieValidation]),
  movieController.updateMovie
);

router.delete(
  '/:id',
  validate(movieIdValidation),
  movieController.deleteMovie
);

module.exports = router;
