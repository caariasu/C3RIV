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
    register : async (req, res, next) => {
        res.status(200).send('Lo haremos en el sprint 3')
    },
    login : async (req, res, next) => {
        try {
            const user = await Usuario.findOne( { where : { email : req.body.email } } )
            if (user) {
                // Evaluar contraseña
                const contraseñaValida = bcrypt.compareSync(req.body.password, user.password)
                if (contraseñaValida) {
                    const token = servToken.enconde(user.id, user.rol)

                    res.status(200).sent({
                        auth: true,
                        tokenReturn : token,
                        user : user
                    })
                }else{
                    res.status(401).send({ auth: false, tokenReturn: null, reason: "Invalid Password!"})
                }
            } else {
                res.status(404).send('Usuario no existe')
            }
        } catch (error) {
            res.status(500).json({ 'error' : 'Oops! Something wrong.'})
        }
    },
    update : async (req, res, next) => {
        try {
            const re = await Articulo.update( { categoria: req.body.categoria, rol: req.body.rol, nombre: req.body.nombre, tipo_documento: req.body.tipo_documento, direccion: req.body.direccion, telefono: req.body.telefono, email: req.body.email, password: req.body.password, num_documento: req.body.num_documento}, {where: {id:req.body.id}} )
        } catch (error) {
            res.status(500).json({ 'error' : 'Oops, algo pasó' })
            next(error)
        }
    },
}