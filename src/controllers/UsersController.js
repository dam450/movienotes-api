const AppError = require('../utils/AppError')
const sqliteConn = require('../database/sqlite')
const validEmail = require('../utils/validEmail')
const { hash } = require('bcryptjs')


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

    if (!validEmail(email)) throw new AppError('E-mail inválido!')

    const hashedPassword = await hash(password, 8)

    const user = await db.run(
      'INSERT INTO users (name, email, password) VALUES ( ?, ?, ? )',
      [name, email, hashedPassword]
    )

    res.status(201).json({ name, email })
  }

  async update(req, res) {



    res.status(200).json({ ...req.params, ...req.body })
  }
}

module.exports = UsersController
