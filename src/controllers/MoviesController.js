class MoviesController {

  async create(req, res)  {


    res.json({ ...req.params, ...req.body })
  }

}

module.exports = MoviesController
