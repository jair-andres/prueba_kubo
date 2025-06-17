module.exports = (sequelize, DataTypes) => {
  const View = sequelize.define('View', {}, {
    tableName: 'views',
    timestamps: false
  });

  View.associate = (models) => {
    View.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });

    View.belongsTo(models.Movie, {
      foreignKey: 'movie_id',
      as: 'movie'
    });
  };

  return View;
};
