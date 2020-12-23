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
    eliminate : async (req, res, next) => {
        try {
            const re = await Categoria.destroy({where: {id:req.body.id}} )
            res.status(200).json(re)
        } catch (error) {
            res.status(500).json({ 'error' : 'Oops, algo pasó' })
            next(error)
        }
    },
    update : async (req, res, next) => {
        try {
            const re = await Categoria.update( { nombre: req.body.nombre, estado: req.body.estado, descripcion: req.body.descripcion}, {where: {id:req.body.id}} )
                res.status(200).json(re)
            
        } catch (error) {
            res.status(500).json({ 'error' : 'Oops, algo pasó' })
            next(error)
        }
    },
    activate : async (req, res, next) => {
        try {
            const re = await Categoria.update( { estado: 1}, {where: {id:req.body.id}} )
            res.status(200).json(re)
        } catch (error) {
            res.status(500).json({ 'error' : 'Oops, algo pasó' })
            next(error)
        }
    },
    deactivate : async (req, res, next) =>  {
        try {
            const re = await Categoria.update( { estado: 0}, {where: {id:req.body.id}} )
            res.status(200).json(re)
        } catch (error) {
            res.status(500).json({ 'error' : 'Oops, algo pasó' })
            next()
        }
    },
}