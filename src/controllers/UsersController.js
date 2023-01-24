const AppError = require("../utils/AppError")
const sqliteConn = require('../database/sqlite')
const validEmail = require("../utils/validEmail")

class UsersController {

  async create(req, res) {

    const { name, email, password } = req.body

    if (!name || !email || !password) throw new AppError(`Dado obrigatório ausente!`)

    const db = await sqliteConn()

    const checkUserExists = await db.get(
      'SELECT email FROM users WHERE lower(email) = lower(?)',
      [email]
    )

    if (checkUserExists) throw new AppError('E-mail já cadastrado!')

    if(!validEmail(email)) throw new AppError('E-mail inválido!')

    const user = await db.run(
      'INSERT INTO users (name, email, password) VALUES ( ?, ?, ? )',
      [name, email, password]
    )

    res.status(201).json({ name, email })
  }

}

module.exports = UsersController
