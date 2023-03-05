const { Router } = require('express')
const MoviesController = require('../controllers/MoviesController')
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const moviesController = new MoviesController()


const moviesRoutes = Router()

moviesRoutes.use(ensureAuthenticated)

moviesRoutes.post('/', moviesController.create)
moviesRoutes.put('/:id', moviesController.update)
moviesRoutes.delete('/:id', moviesController.delete)
moviesRoutes.get('/', moviesController.index)
moviesRoutes.get('/:id', moviesController.show)


module.exports = moviesRoutes
