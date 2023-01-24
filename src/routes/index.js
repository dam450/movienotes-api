const { Router } = require('express')
const moviesRoutes = require('./movies.routes')
const usersRoutes = require('./users.routes')

const routes = Router()

routes.get('/', (req, res) => {
  res.send('Server Online!')
})

routes.use('/users', usersRoutes)
routes.use('/movies', moviesRoutes)


module.exports = routes
