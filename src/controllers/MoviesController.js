/**
 * @typedef {{title: string, description: string,
 * rating: number, tags: [string]}} movie
 */

const knex = require('../database/knex')

const AppError = require('../utils/AppError')

class MoviesController {
  async create(req, res) {

    const { user_id } = req.params

    /**@type movie */
    const { title, description, rating, tags} = req.body

    if (isNaN(rating)) throw new AppError('Valor de rating inválido.')

    const ratingValue = Number(rating)

    if (ratingValue > 5 || ratingValue < 0)
      throw new AppError('Informe valor de rating entre 1 e 5.')

    const note_id = await knex('movie_notes').insert({
      title,
      description,
      rating: ratingValue,
      user_id
    })

    const hasTags = tags?.length

    if (hasTags) {
      const tagsInsert = tags.map(name => ({ note_id, user_id, name }))
      await knex('movie_tags').insert(tagsInsert)
    }

    res.json({ user_id, title, description, ratingValue, tags })
  }
}

module.exports = MoviesController
