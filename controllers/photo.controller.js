const { Film, Photo , GenreFilm,CategoryFilm,sequelize } = require('../models/index')

const addPhoto = async (req,res) => {
    const {id_film,photoUrl} = req.body;

    if(req.role === 'admin'){
        Photo.create({
            id_film: id_film,
            photoUrl: photoUrl
        }).then(data => {
            res.status(200).json({
                status: "success",
                message: "berhasil menambahkan foto"
            })
        }).catch(e => {
            res.status(400).json({
                status: "fail"
            })
        })

    }else{
        res.status(400).json({
            status: 'fail',
            message: 'User not Authorized'
        })
    }
}

const allPhoto = async (req,res) => {
    Photo.findAll().then(data => {
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

const updatePhoto = async (req,res) => {
    const {id} = req.params;

    if(req.role === "admin"){
        Photo.update(req.body,{
            where: {
                id: id
            }
        }).then(data => {
            res.status(200).json({
                status: "success",
                message: "berhasil mengedit Photo"
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

const deletePhoto = async (req,res) => {
    const {id} = req.params;

    if(req.role === "admin"){
        Photo.destroy({
            where: {
                id: id
            }
        }).then(data => {
            res.status(200).json({
                status: "success",
                message: "berhasil menghapus Photo"
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
    addPhoto,
    allPhoto,
    updatePhoto,
    deletePhoto
}