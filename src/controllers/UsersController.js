const AppError = require('../utils/AppError')
const sqliteConn = require('../database/sqlite')
const validEmail = require('../utils/validEmail')
const { hash, compare } = require('bcryptjs')


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

    const { id } = req.user // req.params
    const { name, email, password, new_password } = req.body

    if (email && !validEmail(email))
      throw new AppError('E-mail inválido.')

    const db = await sqliteConn()

    const user = await db.get('SELECT * FROM users WHERE id = (?)', [ id ])

    if (!user) throw new AppError('ID de usuário inválido.', 404)

    const userNewEmail = await db.get(
      'SELECT * FROM users WHERE lower(email) = lower(?)',
      [ email ]
    )

    if (userNewEmail && userNewEmail.id !== user.id)
      throw new AppError('E-mail já cadastrado.')

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (new_password && !password) {
      throw new AppError('Informe a senha atual para definir uma nova senha.')
    }

    if (new_password && password) {
      const checkPassword = await compare(password, user.password)

      if (!checkPassword) {
        throw new AppError('Senha não confere.', 401)
      }

      user.password = await hash(new_password, 8)
    }

    const { changes } = await db.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [ user.name, user.email, user.password, id ]
    )

    if (changes)
      return res.status(200).json()

    res.status(503).json()
  }
}

module.exports = UsersController
