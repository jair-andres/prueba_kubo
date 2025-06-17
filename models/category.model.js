module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'categories',
    freezeTableName: true
  });

  Category.associate = (models) => {
    Category.hasMany(models.Movie, {
      foreignKey: 'category_id',
      as: 'movies'
    });
  };

  return Category;
};
