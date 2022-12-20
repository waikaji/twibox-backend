const express = require('express')
const router = express()

const {
  getUsers,
  getUser,
  updateUser,
  getUserEmail,
  updateAvatar
} = require('../controllers/user')

const {
  authenticateToken,
  regenerateAccessToken,
} = require("../middleware/auth")

router.get("/", authenticateToken, getUsers)

router.get("/email", authenticateToken, getUserEmail)

router.get("/:id", authenticateToken, getUser)
router.patch("/:id", authenticateToken, updateUser)
  
router.patch("/avatar/:id", authenticateToken, updateAvatar)

module.exports = router
