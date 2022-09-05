const db = require("../config/db")
const helper = require("../helper/helper")

class User {
  constructor(name, email, password) {
    this.name = name
    this.email = email
    this.password = password
  }

  save(){
    const createdAtDate = helper.timeNow()

    const sql = `
      INSERT INTO users(
        name, email, password, created_at, updated_at
      ) VALUES ('${this.name}', '${this.email}', '${this.password}', '${createdAtDate}', '${createdAtDate}')
    `

    return db.execute(sql)
  }

  update(id) {
    const createdAtDate = helper.timeNow()

    const sql = `
      UPDATE users
      SET
      name='${this.name}',
      updated_at='${createdAtDate}'
      WHERE
      id=${id}
    `

    return db.execute(sql)
  }

  static findAll() {
    const sql = `SELECT * FROM users`

    return db.execute(sql)
  }

  static findById(id) {
    const sql = `SELECT * FROM users WHERE id=${id}`

    return db.execute(sql)
  }

  static findByEmail(email) {
    const sql = `SELECT * FROM users WHERE email='${email}'`

    return db.execute(sql)
  }
}

module.exports = User