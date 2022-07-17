const { Film, Category , GenreFilm,CategoryFilm,sequelize } = require('../models/index')

const addCategory = async (req,res) => {
    const {name} = req.body;

    if(req.role === 'admin'){
        Category.findOne({
            where: {
                name:name
            }
        }).then(data => {
            if(data === null){
                Category.create({
                    name:name
                })

                return res.status(200).json({
                    status: "success",
                    message: "berhasil menambahkan Category"
                })
            }

            return res.status(400).json({
                status: 'fail',
                message: 'Category exist'
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
    addCategory
}