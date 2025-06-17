module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    }
  }, {
    tableName: 'movies'
  });

  Movie.associate = (models) => {
    Movie.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category'
    });

    Movie.hasMany(models.View, {
      foreignKey: 'movie_id',
      as: 'views'
    });
  };

  return Movie;
};
