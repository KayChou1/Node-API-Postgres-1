const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'node',
  password: ' ',
  port: 5432,
})

const getPeople = (request, response) => {
    pool.query('SELECT * FROM people ORDER BY id ASC', (error, results) => {
      if (error, results) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
  
const getPeopleById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM people WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createPeople = (request, response) => {
  const { first, last } = request.body

  pool.query('INSERT INTO people (first, last) VALUES ($1, $2)', [first, last], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`People added: ${first}`)
  })
}

const updatePeople = (request, response) => {
   const id = parseInt(request.params.id)
  const { first, last } = request.body

  pool.query(
    'UPDATE people SET first = $1, last = $2 WHERE id = $3',
    [first, last, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`People modified with ID: ${id}`)
    }
  )
}

const deletePeople = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM people WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`People deleted with ID: ${id}`)
  })
}

  module.exports = {
    getPeople,
    getPeopleById,
    createPeople,
    updatePeople,
    deletePeople,
  }
  

