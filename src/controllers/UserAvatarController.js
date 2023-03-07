const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage')

class UserAvatarController {

  async updateAvatar(req, res) {
    const user_id = req.user.id
    const avatarFilename = req.file.filename

    const diskStorage = new DiskStorage()

    const user = await knex('users').select(['avatar']).where({ id: user_id }).first()
    if (!user) throw new AppError('Falha ao buscar usuário', 404)

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFilename)
    user.avatar = filename

    await knex('users').update(user).where({ id: user_id })

    return res.json({ avatar: filename })
  }

}

module.exports = UserAvatarController
