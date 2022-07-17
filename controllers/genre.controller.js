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

module.exports = { 
    addGenre
}