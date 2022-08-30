const mysql = require('mysql2')
const dotenv = require('dotenv')
const result = dotenv.config()
if (result.error){
  throw result.error
}

const pool = mysql.createPool({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME
})

module.exports = pool.promise()
