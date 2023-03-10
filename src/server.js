require('express-async-errors')
require('dotenv/config')

const express = require('express')
const AppError = require('./utils/AppError')
const routes = require('./routes')
const migrationsRun = require('./database/sqlite/migrations')

const PORT = process.env.PORT || 3003

const app = express()
app.use(express.json())
app.use(routes)

migrationsRun()

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
