const { Film, Genre , GenreFilm,CategoryFilm,sequelize } = require('../models/index')

const addGenre = async (req,res) => {
    const {name} = req.body;

    if(req.role === 'admin'){
        Genre.findOne({
            where: {
                name:name
            }
        }).then(data => {
            if(data === null){
                Genre.create({
                    name:name
                })

                return res.status(200).json({
                    status: "success",
                    message: "berhasil menambahkan Genre"
                })
            }

            return res.status(400).json({
                status: 'fail',
                message: 'genre exist'
            })
        })
    }else{
        res.status(400).json({
            status: 'fail',
            message: 'User not Authorized'
        })
    }
}

const allGenre = async (req,res) => {
    Genre.findAll().then(data => {
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

const updateGenre = async (req,res) => {
    const {id} = req.params;

    if(req.role === "admin"){
        Genre.update(req.body,{
            where: {
                id: id
            }
        }).then(data => {
            res.status(200).json({
                status: "success",
                message: "berhasil mengedit genre"
            })
        }).catch(e => {
            res.status(400).json({
                status: "gagal"
            })
        })
    }else{
        res.status(400).json({
            status: "fail",
            message: "user not authorized"
        })
    }

    
}

const deleteGenre = async (req,res) => {
    const {id} = req.params;

    if(req.role){
        Genre.destroy({
            where: {
                id: id
            }
        }).then(data => {
            res.status(200).json({
                status: "success",
                message: "berhasil menghapus genre"
            })
        }).catch(e => {
            res.status(400).json({
                status: "gagal"
            })
        })
    }else{
        res.status(400).json({
            status: "fail",
            message: "user not authorized"
        })
    }

    
}

module.exports = { 
    addGenre,
    allGenre,
    updateGenre,
    deleteGenre
}