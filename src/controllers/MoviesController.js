const knex = require('../database/knex')

const AppError = require('../utils/AppError')

class MoviesController {

  async create(req, res) {
    const { id: user_id } = req.user
    const { title, description, rating, tags } = req.body

    if(!title) throw new AppError('Informe o titulo do filme', 400)


    if (isNaN(rating)) throw new AppError('Valor de rating inválido.')

    const ratingValue = Number(rating)


    if (ratingValue > 5 || ratingValue < 0)
      throw new AppError('Rating: informe um valor inteiro entre 1 e 5.')

    const [ note_id ] = await knex('movie_notes').insert({
      title,
      description,
      rating: ratingValue,
      user_id,
    })

    const hasTags = tags?.length > 0

    if (hasTags) {
      const tagsInsert = tags.map(name => ({ note_id, user_id, name }))
      await knex('movie_tags').insert(tagsInsert)
    }

    res.status(201).json({ note_id, title, description, rating: ratingValue, tags })
  }

  async update(req, res) {
    const { id: user_id } = req.user
    const { id } = req.params
    const { title, description, rating, tags } = req.body

    if (!title) throw new AppError('Informe o título do filme', 400)

    if (isNaN(rating)) throw new AppError('Valor de rating inválido.')

    const ratingValue = Number(rating)

    if (ratingValue > 5 || ratingValue < 0)
      throw new AppError('Rating: informe um valor inteiro entre 1 e 5.')

    const now = new Date().toISOString().replace('T', ' ').slice(0, 19)

    await knex('movie_notes')
      .update({
        title,
        description,
        rating: ratingValue,
        updated_at: now
      })
      .where({ id, user_id })

    await knex('movie_tags').where({ note_id: id, user_id }).delete()

    const hasTags = tags?.length > 0

    if (hasTags) {
      const tagsInsert = tags.map(name => ({ note_id: id, user_id, name }))
      await knex('movie_tags').insert(tagsInsert)
    }

    res.json({ update: 'ok' })
  }

  async delete(req, res) {

    const { id } = req.params
    const { id: user_id } = req.user


    const movieNote = await knex('movie_notes').where({ id, user_id }).delete()

    if (!movieNote) return res.status(404).json()

    return res.json()
  }

  async index(req, res) {

    const { id: user_id } = req.user
    const { title = '' } = req.query


      const movieNotes = await knex('movie_notes')
      .where({ user_id })
      .whereLike('title', `%${title}%`)
      .orderBy('created_at')


    const movieTags = await knex('movie_tags')
      .select(['id', 'note_id', 'name'])
      .where({ user_id }).orderBy('name', 'asc')

    const moviesWithTags = movieNotes.map(movie => {
      const tags = movieTags.filter(tag => tag.note_id === movie.id)
      return {...movie, tags }
    })

    res.json(moviesWithTags)
  }

  async show(req, res) {

    const { id: note_id } = req.params
    const { id: user_id } = req.user


    const movieNote = await knex('movie_notes').select('*').where({ id: note_id }).first()

    if (!movieNote) return res.status(404).end()
    if (movieNote.user_id !== user_id) return res.status(403).end()

    const movieTags = await knex('movie_tags').where({ note_id }).orderBy('name', 'asc')

    let tags = []

    if (movieTags)
      tags = movieTags.map(tag => (tag.name))

    res.json({ ...movieNote, tags })
  }
}

module.exports = MoviesController
