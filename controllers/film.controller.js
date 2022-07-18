const req = require('express/lib/request');
const { Film, 
    Genre ,
    Category,
    Photo,
    Video ,
    Actor,
    GenreFilm,
    CategoryFilm,
    sequelize } = require('../models/index')

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

const getFilmByCategory = async (req,res) => {
    const {id_category} = req.body;

    await CategoryFilm.findAll({
        where: {
            id_category: id_category
        },
        attributes: [
            'id',
            [sequelize.literal(`"FkCategoryFilmFilm"."title"`), "TitleFilm"],
            [sequelize.literal(`"FkCategoryFilmFilm"."year"`), "YearFilm"],
            [sequelize.literal(`"FkCategoryFilmFilm"."director"`), "DirectorFilm"],
            [sequelize.literal(`"FkCategoryFilmFilm"."rating"`), "RatingFilm"],
            [sequelize.literal(`"FkCategoryFilmCategory"."name"`), "CategoryFilm"],
        ],
        subQuery: false,
        include: [
            {
                model: Film,
                as: "FkCategoryFilmFilm",
                attributes:[]
            
            },
            {
                model: Category,
                as: "FkCategoryFilmCategory",
                attributes:[]
            }
        ]
    }).then(data => {
        res.status(200).json({
            status: "success",
            data: data
        })
    }).catch(e => {
        res.status(400).json({
            status: "fail"
        })
    })
}

const addFilmGenre = async (req,res) => {
    const {id_film,id_genre} = req.body;

    if(req.role === "admin"){
        GenreFilm.findAll({
            where: {
                id_film:id_film,
                id_genre: id_genre
            }
        }).then(data => {
            console.log(data)
            if(data.length === 0){
                GenreFilm.create({
                    id_film: id_film,
                    id_genre: id_genre
                }).then(data => {
                    res.status(200).json({
                        status: "success",
                        message: "berhasil menambahkan genre"
                    })
                })
            }else{
                res.status(400).json({
                    status: "fail",
                    message: "genre film already exist"
                })
            }
        })
    }else{
        res.status(400).json({
            status: "fail",
            message: "user not authorized"
        })
    }

    
}

const updateFilm = async (req,res) => {
    const {id} = req.params;

    if(req.role === "admin"){
        await Film.update(req.body,{
            where: {
                id: id
            }
        }).then(data => {
            return res.status(200).json({
                status: "success",
                message: "berhasil mengupdate film"
            })
        }).catch(e => {
            return res.status(400).json({
                status: "fail'",
                message: "gagal mengupdate film"
            })
        })
    }else{
        return res.status(400).json({
            status: "fail",
            message: "user not authorized"
        })
    }

    
}

const deleteFilm = async (req,res) => {
    const {id} = req.params
    
    try {

        const result = await sequelize.transaction(async (t) => {
        
            const deleteFilm = await Film.destroy({
                where: {
                    id: id
                }
            }, { transaction: t })

            const deleteGenreFilm = await GenreFilm.destroy({
                where: {
                    id_film: id
                }
            }, { transaction: t })

            const deleteCategoryFilm = await CategoryFilm.destroy({
                where: {
                    id_film: id
                }
            }, { transaction: t })

            const deletePhoto = await Photo.destroy({
                where: {
                    id_film: id
                }
            }, { transaction: t })

            const deleteVideo = await Video.destroy({
                where: {
                    id_film: id
                }
            }, { transaction: t })

            const deleteActor = await Actor.destroy({
                where: {
                    id_film: id
                }
            }, { transaction: t })
        
            return res.status(200).json({
                status: 'Sukses',
                message: 'sukses menghapus Film'
            })
        });
      
      } catch (error) {
        return res.status(400).json({
            status: 'Gagal',
            message: 'Gagal menghapus Film'
        })
      }
}

const orderByDesc = async (req,res) => {
    Film.findAll({
        order: [
            ['rating','DESC']
        ]
    }).then(data => {
        res.status(200).json({
            status: "success",
            data: data
        })
    }).catch(e => {
        res.status(400).json({
            status: "fail"
        })
    })
}

const orderByAsce = async (req,res) => {
    Film.findAll({
        order: sequelize.col('rating')
    }).then(data => {
        res.status(200).json({
            status: "success",
            data: data
        })
    }).catch(e => {
        res.status(400).json({
            status: "fail"
        })
    })
}

module.exports = {
    addFilm,
    allFilm,
    getFilmByTitle,
    getFilmByGenre,
    getFilmByCategory,
    addFilmGenre,
    updateFilm,
    deleteFilm,
    orderByDesc,
    orderByAsce
}