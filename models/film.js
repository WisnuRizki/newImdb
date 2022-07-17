'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Video, {
				foreignKey: "id_film",
				as: "FkFilmVideo",
			});
			this.hasMany(models.Photo, {
				foreignKey: "id_film",
				as: "FkFilmPhoto",
			});
			this.hasMany(models.Actor, {
				foreignKey: "id_film",
				as: "FkFilmActor",
			});

      this.hasMany(models.GenreFilm, {
				foreignKey: "id_film",
				as: "FkFilmGenreFilm",
			});
    }
  }
  Film.init({
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    director: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Film',
  });
  return Film;
};