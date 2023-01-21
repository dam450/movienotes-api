const { Router } = require('express')
const usersRoutes = require('./users.routes')

const routes = Router()

routes.get('/', (req, res) => {
  res.send('Server Online!')
})

routes.use('/users', usersRoutes)


module.exports = routes
