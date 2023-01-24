const config = require('../../../knexfile')
const knex = require('knex')

const knexConn = knex(config.development)

module.exports = knexConn
