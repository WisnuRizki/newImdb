const { Film, Actor , GenreFilm,CategoryFilm,sequelize } = require('../models/index')

const addActor = async (req,res) => {
    const {id_film,name} = req.body;

    if(req.role === 'admin'){
        Actor.findOne({
            where: {
                name:name
            }
        }).then(data => {
            if(data === null){
                Actor.create({
                    id_film:id_film,
                    name:name
                })

                return res.status(200).json({
                    status: "success",
                    message: "berhasil menambahkan Actor"
                })
            }

            return res.status(400).json({
                status: 'fail',
                message: 'Actor exist'
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
    addActor
}