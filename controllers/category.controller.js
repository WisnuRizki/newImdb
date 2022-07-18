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

const allCategory = async (req,res) => {
    Category.findAll().then(data => {
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

const updateCategory = async (req,res) => {
    const {id} = req.params;

    if(req.role === "admin"){
        Category.update(req.body,{
            where: {
                id: id
            }
        }).then(data => {
            res.status(200).json({
                status: "success",
                message: "berhasil mengedit category"
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

const deleteCategory = async (req,res) => {
    const {id} = req.params;

    if(req.role){
        Category.destroy({
            where: {
                id: id
            }
        }).then(data => {
            res.status(200).json({
                status: "success",
                message: "berhasil menghapus category"
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
    addCategory,
    allCategory,
    updateCategory,
    deleteCategory
}