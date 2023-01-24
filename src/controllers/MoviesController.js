const knex = require('../database/knex')

class MoviesController {

  async create(req, res) {

    const { user_id } = req.params
    const { title, description, rating } = req.body

    /**
     * @todo receber os dados e gravar no BD
     */


    res.json({ user_id, title, description, rating })

  }

}

module.exports = MoviesController
