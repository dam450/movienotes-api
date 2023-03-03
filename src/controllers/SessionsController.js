const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const bcrypt = require('bcryptjs')

class SessionsController {
  async create(req, res) {

    const { email, password } = req.body

    if (!email || !password)
      throw new AppError('email e senha obrigatórios', 400)

    const user = await knex('users').where({ email }).first()
    if (!user) throw new AppError('Usuário não encontrado', 404)

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) throw new AppError('Senha incorreta', 401)





    res.status(201).json({ user })
  }
}

module.exports = SessionsController
