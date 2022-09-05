const db = require("../../config/db")
const helper = require("../../helper/helper")

class Campaign {
  constructor(id_user="", title="", description="", image_filename="", url="") {
    this.id_user = id_user
    this.title = title
    this.description = description
    this.image_filename = image_filename
    this.url = url
  }

  save() {
    const createdAtDate = helper.timeNow()

    const sql = `
      INSERT INTO campaigns(
        id_user, 
        title, 
        description, 
        image_filename,
        url, 
        created_at, 
        updated_at)
        VALUES(
          '${this.id_user}',
          '${this.title}',
          '${this.description}',
          '${this.image_filename}',
          '${this.url}',
          '${createdAtDate}',
          '${createdAtDate}'
      )`
    return db.execute(sql)
  }

  update(id) {
    const createdAtDate = helper.timeNow()
    const sql = `
      UPDATE campaigns 
      SET
      title='${this.title}',
      description='${this.description}',
      updated_at='${createdAtDate}'
      WHERE
      id=${id}
    `

    return db.execute(sql)
  }

  updateImage(id) {
    const createdAtDate = helper.timeNow()

    const sql =`
    UPDATE campaigns
    SET
    image_filename='${image_filename}',
    url='${url}',
    updated_at='${createdAtDate}'
    WHERE
    id=${id}
    `

    return db.execute(sql)
  }

  static findAll() {
    const sql = `
      SELECT * FROM campaigns LIMIT 32
    `
    return db.execute(sql)
  }

  static findById(id) {
    const sql = `
      SELECT * FROM campaigns WHERE id=${id}
    `

    return db.execute(sql)
  }

  static findByKeyword(keyword) {
    const sql = `
      SELECT * FROM campaigns WHERE title LIKE '%${keyword}%' OR description LIKE '%${keyword}%'
    `

    return db.execute(sql)
  }

  static updateDownloader(id, count) {
    const sql = `
      UPDATE campaigns
      SET
      downloader=${count}
      WHERE
      id=${id}
    `

    return db.execute(sql)
  }

  static delete(id) {
    const sql = `
      DELETE FROM campaigns WHERE id=${id}
    `

    return db.execute(sql)
  }

  static findByIdUser(id_user) {
    const sql = `
      SELECT * FROM campaigns WHERE id_user=${id_user}
    `

    return db.execute(sql)
  }
}

module.exports = Campaign