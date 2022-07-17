const { Film, Genre , Photo, Video ,Actor,GenreFilm,CategoryFilm,sequelize } = require('../models/index')

const addFilm = async (req,res) => {
    const {
        title,
        year,
        director,
        photos,
        videos,
        genres,
        category
    } = req.body;


        try {

            const result = await sequelize.transaction(async (t) => {
            
                const findFilm = await Film.findOne({
                    where: {
                        title: title
                    }
                }, { transaction: t })
    
                if(findFilm === null){
                    const film = await Film.create({
                        title: title,
                        year: year,
                        director:director,
                        rating: 0
                      }, { transaction: t });
            
                      photos.map(photo => {
                          Photo.create({
                              id_film: film.id,
                              photoUrl: photo
                          })
                      })

                      videos.map(video => {
                            Video.create({
                                id_film: film.id,
                                videoUrl: video
                            })
                      })

                      genres.map(genre => {
                          GenreFilm.create({
                              id_film: film.id,
                              id_genre: genre
                          })
                      })

                      CategoryFilm.create({
                        id_film: film.id,
                        id_category: category
                      })

                      
                      return res.status(200).json({
                        status: 'success',
                        message: 'Sukses menambahkan Film',
                        data: film
                    })
                }else{
                    return res.status(400).json({
                        status: 'Gagal',
                        message: 'Film alredy Existsr'
                    })
                }
            
          
            });
          
          } catch (error) {
            return res.status(400).json({
                status: 'Gagal',
                message: 'Gagal menambahkan User'
            })
          }
    
    
}

const allFilm = async (req,res) => {
    Film.findAll({
        attributes: [
            'title',
            'year',
            'director',
            'rating'
        ],
        subQuery: false,
		raw: false,
        include: [
            {
                model: Video,
                as: "FkFilmVideo",
                attributes: ['videoUrl']
            },
            {
                model: Photo,
                as: "FkFilmPhoto",
                attributes: ['photoUrl']
            },
            {
                model: Actor,
                as: "FkFilmActor",
                attributes: ['name']
            },
            {
                model: GenreFilm,
                as: 'FkFilmGenreFilm',
                attributes: [
    
                    [sequelize.literal(`"FkFilmGenreFilm->FkGenreFilmGenre"."name"`), "nameGenre"]
                ],
                subQuery: false,
                include:[
                    {
                        model: Genre,
                        as: "FkGenreFilmGenre",
                        attributes: []
                    }
                ]
            }
        ]
    }).then(data => {
        res.status(200).json({
            status: "success",
            data: data
        })
    }).catch(e => {
        res.status(400).json({
            status: 'fail'
        })
    })
}

const getFilmByTitle = async (req,res) => {
    const {title} = req.body;

    await Film.findOne({
        where: {
            title: title
        },attributes: [
            'title',
            'year',
            'director',
            'rating'
        ],
        subQuery: false,
		raw: false,
        include: [
            {
                model: Video,
                as: "FkFilmVideo",
                attributes: ['videoUrl']
            },
            {
                model: Photo,
                as: "FkFilmPhoto",
                attributes: ['photoUrl']
            },
            {
                model: Actor,
                as: "FkFilmActor",
                attributes: ['name']
            },
            {
                model: GenreFilm,
                as: 'FkFilmGenreFilm',
                attributes: [
    
                    [sequelize.literal(`"FkFilmGenreFilm->FkGenreFilmGenre"."name"`), "nameGenre"]
                ],
                subQuery: false,
                include:[
                    {
                        model: Genre,
                        as: "FkGenreFilmGenre",
                        attributes: []
                    }
                ]
            }
        ]
    }).then(data => {
        res.status(200).json({
            status: "success",
            data: data
        })
    }).catch(e => {
        res.status(400).json({
            status: "Fail",
            message: "Fail"
        })
    })
}

const getFilmByGenre = async (req,res) => {
    const {id_genre} = req.body;

    GenreFilm.findAll({
        where: {
            id_genre: id_genre
        },
        attributes: [
            [sequelize.literal(`"FkGenreFilmFilm"."title"`), "TitleFilm"],
            [sequelize.literal(`"FkGenreFilmFilm"."year"`), "YearFilm"],
            [sequelize.literal(`"FkGenreFilmFilm"."director"`), "DirectorFilm"],
            [sequelize.literal(`"FkGenreFilmFilm"."rating"`), "RatingFilm"],
            [sequelize.literal(`"FkGenreFilmGenre"."name"`), "GenreName"]
        ],
        subQuery: false,
        include: [
            {
                model: Film,
                as: "FkGenreFilmFilm",
                attributes: []
            },
            {
                model: Genre,
                as: "FkGenreFilmGenre",
                attributes: []
            }
        ]
    }).then(data => {
        res.status(200).json({
            status: "success",
            data: data
        })
    }).catch(e => {
        res.status(400).json({
            status:"Fail"
        })
    })
}

module.exports = {
    addFilm,
    allFilm,
    getFilmByTitle,
    getFilmByGenre
}