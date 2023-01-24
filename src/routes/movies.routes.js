const { Router } = require('express')


const moviesRoutes = Router()

moviesRoutes.post('/:user_id',  (req, res) => {


  res.json({...req.params, ...req.body })
})


module.exports = moviesRoutes
