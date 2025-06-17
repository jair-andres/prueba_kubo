const { View, User, Movie } = require('../models');

const markMovieAsViewed = async (req, res) => {
  try {
    const { user_id, movie_id } = req.body;

    // Validación rápida (puedes mejorarla con express-validator)
    if (!user_id || !movie_id) {
      return res.status(400).json({ error: 'user_id and movie_id are required' });
    }

    // Verificar si ya existe
    const existing = await View.findOne({ where: { user_id, movie_id } });
    if (existing) {
      return res.status(409).json({ message: 'Movie already marked as viewed by this user' });
    }

    const view = await View.create({ user_id, movie_id });
    return res.status(201).json(view);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const listUsersWithViewedMovies = async (req, res) => {
  try {
    const { user_id } = req.query;

    const where = {};
    if (user_id) {
      where.id = user_id;
    }

    const users = await User.findAll({
      where,
      include: {
        model: View,
        as: 'views',
        include: {
          model: Movie,
          as: 'movie',
          attributes: ['id', 'name', 'description', 'date']
        }
      },
      attributes: ['id', 'username', 'email']
    });

    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


module.exports = {
  markMovieAsViewed,
  listUsersWithViewedMovies
};
