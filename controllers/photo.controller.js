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

module.exports = { 
    addPhoto
}