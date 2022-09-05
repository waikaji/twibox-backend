const express = require('express')
const router = express.Router()

const {
  getUsers,
  getUser,
  updateUser,
  getUserEmail
} = require('../controllers/user')

router
  .route("/")
  .get(getUsers)

router
  .route("/email")
  .get(getUserEmail)

router
  .route("/:id")
  .get(getUser)
  .patch(updateUser)

module.exports = router
