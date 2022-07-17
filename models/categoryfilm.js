'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryFilm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Film, {
				foreignKey: "id_film",
				as: "FkCategoryFilmFilm",
			});

      this.belongsTo(models.Category, {
				foreignKey: "id_category",
				as: "FkCategoryFilmCategory",
			});
    }
  }
  CategoryFilm.init({
    id_film: DataTypes.INTEGER,
    id_category: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CategoryFilm',
  });
  return CategoryFilm;
};