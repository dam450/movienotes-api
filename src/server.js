const express = require('express')
require('express-async-errors')

const AppError = require('./utils/AppError')
const routes = require('./routes')

const PORT = 3333
const app = express()
app.use(express.json())
app.use(routes)

app.use((error, request, response, next) => {

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(PORT, () => {
  console.log(`[Server] listening on port ${PORT}`)
})
