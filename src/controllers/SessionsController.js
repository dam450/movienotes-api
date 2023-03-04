const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const { compare } = require('bcryptjs')
const { jwt } = require('../configs/auth')
const { sign,  } = require('jsonwebtoken')

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body

    if (!email || !password)
      throw new AppError('email e senha obrigatórios', 400)

    const user = await knex('users').where({ email }).first()
    if (!user) throw new AppError('Usuário não encontrado', 404)

    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) throw new AppError('Senha incorreta', 401)

    const { expiresIn, secret } = jwt
    const token = sign({}, secret, { subject: String(user.id), expiresIn })

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    }

    return res.status(201).json({ token, user: userData })
  }
}

module.exports = SessionsController
