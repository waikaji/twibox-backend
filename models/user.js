const db = require("../config/db")
const helper = require("../helper/helper")

class User {
  constructor(name="", email="", password="", image_filename="", url="") {
    this.name = name
    this.email = email
    this.password = password
    this.image_filename = image_filename
    this.url = url
  }

  save(){
    const createdAtDate = helper.timeNow()

    const sql = `
      INSERT INTO users(
        name, email, password, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?)
    `

    return db.execute(sql, [this.name, this.email, this.password, createdAtDate, createdAtDate])
  }

  update(id) {
    const createdAtDate = helper.timeNow()

    const sql = `
      UPDATE users
      SET
      name=?,
      updated_at=?
      WHERE
      id=?
    `

    return db.execute(sql, [this.name, createdAtDate, id])
  }

  updateImage(id) {
    const createdAtDate = helper.timeNow();

    const sql = `
    UPDATE users
    SET
    image_filename=?,
    url=?,
    updated_at=?
    WHERE
    id=?
    `
    return db.execute(sql, [image_filename, url, createdAtDate, id])
  }

  static findAll() {
    const sql = `SELECT id, name, email, image_filename, url, created_at, updated_at FROM users`

    return db.execute(sql)
  }

  static findById(id) {
    const sql = `SELECT id, name, email, image_filename, url, created_at, updated_at FROM users WHERE id=?`

    return db.execute(sql, [id])
  }

  static findByEmail(email) {
    const sql = `SELECT id, name, email, image_filename, url, created_at, updated_at FROM users WHERE email=?`

    return db.execute(sql, [email])
  }
}

module.exports = User