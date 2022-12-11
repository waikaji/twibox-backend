const express = require('express')
const router = express.Router()

const {
  getUsers,
  getUser,
  updateUser,
  getUserEmail,
  updateAvatar
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
  
router
  .route("/avatar/:id")
  .patch(updateAvatar)

module.exports = router
