const { Categoria } = require('../models/');

module.exports = {
    list : async (req, res, next) => {
        try {
            const re = await Categoria.findAll()
            res.status(200).json(re)
        } catch (error) {
            res.status(500).json({ 'error' : 'Oops, algo pasó' })
            next(error)
        }
        
    },
    add : async (req, res, next) => {
        try {
            const re = await Categoria.create(req.body)
            res.status(200).json(re)
        } catch (error) {
            res.status(500).json({ 'error' : 'Oops, algo pasó' })
            next(error)
        }
    },
    update : async (req, res, next) => {
        try {
            const re = await Categoria.update( { categoria: req.body.categoria, rol: req.body.rol, nombre: req.body.nombre, tipo_documento: req.body.tipo_documento, direccion: req.body.direccion, telefono: req.body.telefono, email: req.body.email, password: req.body.password, num_documento: req.body.num_documento}, {where: {id:req.body.id}} )
            res.status(200).json(re)
        } catch (error) {
            res.status(500).json({ 'error' : 'Oops, algo pasó' })
            next(error)
        }
    },
    activate : async (req, res, next) => {
        try {
            const re = await Articulo.update( { estado: 1}, {where: {id:req.body.id}} )
            res.status(200).json(re)
        } catch (error) {
            res.status(500).json({ 'error' : 'Oops, algo pasó' })
            next(error)
        }
    },
    deactivate : async (req, res, next) =>  {
        try {
            const re = await Articulo.update( { estado: 0}, {where: {id:req.body.id}} )
            res.status(200).json(re)
        } catch (error) {
            res.status(500).json({ 'error' : 'Oops, algo pasó' })
            next()
        }
    },
}