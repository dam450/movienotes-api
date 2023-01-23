const AppError = require("../utils/AppError")

class UsersController {

  create(req, res) {

    const { name, email, password } = req.body

    if (!name || !email || !password) throw new AppError('Preencha dados obrigatórios')

    res.status(201).json({ name, email, password })

  }
}

module.exports = UsersController
