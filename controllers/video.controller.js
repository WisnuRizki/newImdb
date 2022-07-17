const { Film, Video , GenreFilm,CategoryFilm,sequelize } = require('../models/index')

const addVideo = async (req,res) => {
    const {id_film,videoUrl} = req.body;

    if(req.role === 'admin'){
        Video.create({
            id_film: id_film,
            videoUrl: videoUrl
        }).then(data => {
            res.status(200).json({
                status: "success",
                message: "berhasil menambahkan video"
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
    addVideo
}