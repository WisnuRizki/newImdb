const { User, Role , sequelize } = require('../models/index')
const bcrypt = require('bcrypt')
const { generateToken } = require("../midlleware/authentication");

const signUp = async (req, res) => {
    const body = req.body;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;
    const password = bcrypt.hashSync(body.password, 10);
    // Cek di Database apakah user ada atau enggk => User telah terdaftar 
    // Password => Encrypt
    

    try {

        const result = await sequelize.transaction(async (t) => {
        
            const findUser = await User.findOne({
                where: {
                    email: email
                }
            }, { transaction: t })

            if(findUser === null){
                const user = await User.create({
                    firstName:firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                  }, { transaction: t });
        
                  const role = await Role.create({
                    id_user: user.id,
                    role: 'user'
                  }, { transaction: t });

                  return res.status(200).json({
                    status: 'success',
                    message: 'Sukses menambahkan user',
                    data: user
                })
            }else{
                return res.status(400).json({
                    status: 'Gagal',
                    message: 'Gagal menambahkan User'
                })
            }
        
      
        });
      
      } catch (error) {
        return res.status(400).json({
            status: 'Gagal',
            message: 'Gagal menambahkan User'
        })
      }
};

const login = async (req,res) => {
    const {email,password} = req.body;
    console.log(email,password)
   await User.findOne({
        where: {
            email: email
        },
        include: {
            model: Role,
            as: 'FkUserRole'
        }
    }).then( user => {
        const passwordValid = bcrypt.compareSync(password, user.password);

            if(!passwordValid) {                        
                return res.status(401).send({
                    message: "Email and Password is not match"
                });
            }

           let data = {
                id: user.id,
                username: user.username,
                role: user.FkUserRole.role
            }

            let token = generateToken(data);

            return res.status(200).send({
                status: "SUCCESS",
                message:"User Login Success",
                data: {
                   data,
                   token: token
                }
            })
    }).catch(e => {
        return res.status(400)
    })
};

module.exports = {
    signUp,
    login
}