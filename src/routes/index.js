const { Router } = require('express')

const routes = Router()

routes.get('/', (req, res) => {
  res.send('Server Online!')
})

module.exports = routes
