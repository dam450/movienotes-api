const knex = require('../database/knex')

const AppError = require('../utils/AppError')

class MoviesController {

  async create(req, res) {
    //const { user_id } = req.params

    const { title, description, rating, tags, user_id } = req.body

    if (isNaN(rating)) throw new AppError('Valor de rating inválido.')

    const ratingValue = Number(rating)

    if (ratingValue > 5 || ratingValue < 0)
      throw new AppError('Informe valor de rating entre 1 e 5.')

    const note_id = await knex('movie_notes').insert({
      title,
      description,
      rating: ratingValue,
      user_id,
    })

    const hasTags = tags?.length

    if (hasTags) {
      const tagsInsert = tags.map(name => ({ note_id, user_id, name }))
      await knex('movie_tags').insert(tagsInsert)
    }

    res.json({ user_id, title, description, ratingValue, tags })
  }

  async update(req, res) {
    /**
     * @todo criar update de movies
     */

    console.count('UPDATE')
    res.json({ ...req.params, ...req.body })
  }

  async delete(req, res) {

    const { id } = req.params

    const movieNote = await knex('movie_notes').where({ id }).delete()

    if (!movieNote) return res.status(404).json()

    return res.json({ id })
  }

  async index(req, res) {

    const { user_id } = req.body

    const movieNotes = await knex('movie_notes')
      .where({ user_id })
      .orderBy('created_at')

    res.json([ ...movieNotes ])
  }

  async show(req, res) {

    const { id } = req.params

    const movieNote = await knex('movie_notes').select('*').where({ id }).first()

    if (!movieNote) return res.status(404).end()

    const movieTags = await knex('movie_tags').where({ note_id: id }).orderBy('name', 'asc')

    let tags = []

    if (movieTags)
      tags = movieTags.map(tag => (tag.name))

    res.json({ ...movieNote, tags })
  }
}

module.exports = MoviesController
