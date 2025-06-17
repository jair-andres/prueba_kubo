const { Op } = require('sequelize');
const { Movie, Category } = require('../models');

const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    return res.status(201).json(movie);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const { title, category_id, page = 1, limit = 10, sort = 'desc' } = req.query;

    const where = {};

    if (title) {
      where.name = { [Op.iLike]: `%${title}%` }; // PostgreSQL LIKE insensible a mayúsculas
    }

    if (category_id) {
      where.category_id = category_id;
    }

    const offset = (page - 1) * limit;

    const movies = await Movie.findAndCountAll({
      where,
      include: {
        association: 'category',
        attributes: ['id', 'name']
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['date', sort.toUpperCase() === 'ASC' ? 'ASC' : 'DESC']]
    });

    return res.json({
      total: movies.count,
      page: parseInt(page),
      pages: Math.ceil(movies.count / limit),
      results: movies.rows
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id, {
      include: {
        association: 'category',
        attributes: ['id', 'name']
      }
    });
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    return res.json(movie);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    await movie.update(req.body);
    return res.json(movie);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    await movie.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getNewReleases = async (req, res) => {
  try {
    const today = new Date();
    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(today.getDate() - 21); // 3 semanas

    const movies = await Movie.findAll({
      where: {
        date: {
          [Op.gte]: threeWeeksAgo
        }
      },
      include: {
        association: 'category',
        attributes: ['id', 'name']
      },
      order: [['date', 'DESC']]
    });

    return res.json(movies);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  getNewReleases
};
