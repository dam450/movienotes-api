class AppError extends Error {
  //message
  statusCode

  constructor(message, statusCode = 400) {
    super(message)
    //this.message = message
    this.statusCode = statusCode
  }

}

module.exports = AppError
