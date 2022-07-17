'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GenreFilm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Film, {
				foreignKey: "id_film",
				as: "FkGenreFilmFilm",
			});

      this.belongsTo(models.Genre, {
				foreignKey: "id_genre",
				as: "FkGenreFilmGenre",
			});
    }
  }
  GenreFilm.init({
    id_film: DataTypes.INTEGER,
    id_genre: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GenreFilm',
  });
  return GenreFilm;
};