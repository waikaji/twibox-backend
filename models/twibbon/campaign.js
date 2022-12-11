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
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
      )`
    return db.execute(sql, [this.id_user, this.title, this.description, this.image_filename, this.url, createdAtDate, createdAtDate])
  }

  update(id) {
    const createdAtDate = helper.timeNow()
    const sql = `
      UPDATE campaigns 
      SET
      title=?,
      description=?,
      updated_at=?
      WHERE
      id=?
    `

    return db.execute(sql, [this.title, this.description, createdAtDate, id])
  }

  updateImage(id) {
    const createdAtDate = helper.timeNow()

    const sql =`
    UPDATE campaigns
    SET
    image_filename=?,
    url=?,
    updated_at=?
    WHERE
    id=?
    `

    return db.execute(sql, [image_filename, url, createdAtDate, id])
  }

  static countRows() {
    const sql = `SELECT COUNT(*) AS namesCount FROM campaigns`

    return db.execute(sql)
  }

  static findAll(offset, limit) {
    const sql = `
      SELECT * FROM campaigns ORDER BY RAND() LIMIT ? OFFSET ?
    `
    return db.execute(sql, [limit, offset])
  }

  static findById(id) {
    const sql = `
      SELECT * FROM campaigns WHERE id=?
    `

    return db.execute(sql, [id])
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
      downloader=?
      WHERE
      id=?
    `

    return db.execute(sql, [count, id])
  }

  static delete(id) {
    const sql = `
      DELETE FROM campaigns WHERE id=?
    `

    return db.execute(sql, [id])
  }

  static findByIdUser(id_user) {
    const sql = `
      SELECT * FROM campaigns WHERE id_user=?
    `

    return db.execute(sql, [id_user])
  }

  static findByIdUser(id_user) {
    const sql = `
      SELECT * FROM campaigns WHERE id_user=?
    `

    return db.execute(sql, [id_user])
  }

  static countCampaignByIdUser(id_user) {
    const sql = `
      SELECT COUNT(*) AS count FROM campaigns WHERE id_user=?
    `

    return db.execute(sql, [id_user])
  }

  static totalDownloaderByIdUser(id_user) {
    const sql = `
      SELECT SUM(downloader) AS total FROM campaigns WHERE id_user=?
    `

    return db.execute(sql, [id_user])
  }
}

module.exports = Campaign