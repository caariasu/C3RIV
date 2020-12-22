const { Usuario } = require('../models/');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const servToken = require('../services/token')

module.exports = {
    list : async (req, res, next) => {
        try {
            const re = await Usuario.findAll()
            res.status(200).json(re)
        } catch (error) {
            res.status(500).json({ 'error' : 'Oops, algo pasó' })
            next()
        }
    },
    add : async (req, res, next) => {
        try{
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const user = await Usuario.create({nombre: req.body.nombre, password: req.body.password, rol: req.body.rol, email: req.body.email, estado: 1})
            res.status(200).json(user)
            
        } catch (error) {
            res.status(500)
        }
    },
    login : async (req, res, next) => {
        
        try {
            const user = await Usuario.findOne( { where : { email : req.body.email } } )
            if (user) {
                
                // Evaluar contraseña
                const contraseñaValida = bcrypt.compareSync(req.body.password, user.password)
                
                if (contraseñaValida) {
                    const token = servToken.encode(user.id, user.rol)
                    res.status(200).send({
                        auth: true,
                        tokenReturn : token,
                        user : user
                    })
                }else{
                    res.status(401).send({ auth: false, tokenReturn: null, reason: "Contraseña invalida!"})
                }
            } else {
                res.status(404).send('Usuario no existe')
            }
        } catch (error) {
            res.status(500).send( 'Oops! Something wrong.')
            
        }
    },
    update : async (req, res, next) => {
        try {
            const user = await Usuario.findOne( { where : { email : req.body.email } } )

            const contraseñaValida = bcrypt.compareSync(req.body.password, user.password)

            const nuevaContraseñaEncrip = req.body.newpassword ? bcrypt.hashSync(req.body.newpassword) : user.password
            if (contraseñaValida) {
                const re = await Usuario.update( {nombre: req.body.nombre, email: req.body.email, estado: req.body.estado, password: nuevaContraseñaEncrip}, {where: {id:req.body.id}} )
                res.status(200).send(re)
            } else {
                res.status(401).send({ auth: false, tokenReturn: null, reason: "Contraseña Invalida!" })
            }    
        } catch (error) {
            res.status(500).json({ 'error' : 'Oops! Something wrong.' })
            next(error)
        }
    },
    activate : async (req, res, next) => {
        try {
            const re = await Usuario.update( { estado: 1 }, {where: {id:req.body.id}} )
            res.status(200).json(re)
        } catch (error) {
            res.status(500).json({ 'error' : 'Oops, algo pasó' })
            next(error)
        }
    },
    deactivate : async (req, res, next) =>  {
        try {
            const re = await Usuario.update( { estado: 0 }, {where: {id:req.body.id}} )
            res.status(200).json(re)
        } catch (error) {
            res.status(500).json({ 'error' : 'Oops, algo pasó' })
            next()
        }
    },
}