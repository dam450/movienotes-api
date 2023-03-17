require('express-async-errors')
require('dotenv/config')

const express = require('express')
const cors = require('cors')

const AppError = require('./utils/AppError')
const routes = require('./routes')
const migrationsRun = require('./database/sqlite/migrations')
const uploadConfig = require('./configs/upload')

const PORT = process.env.PORT || 3003

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(routes)

app.use(
  '/files',
  express.static(uploadConfig.UPLOAD_FOLDER)
)

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
