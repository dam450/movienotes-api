const { Router } = require('express')

const moviesRoutes = require('./movies.routes')
const usersRoutes = require('./users.routes')
const sessionsRoutes = require('./sessions.routes')


const routes = Router()

routes.get('/', (req, res) => {
  res.send('Server Online!')
})

routes.use('/users', usersRoutes)
routes.use('/movies', moviesRoutes)
routes.use('/sessions', sessionsRoutes)



module.exports = routes
