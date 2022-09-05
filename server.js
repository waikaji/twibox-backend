require("dotenv").config()

const express = require('express')
const FileUpload = require('express-fileupload')
const cors = require('cors')

const app = express()

const {
  authenticateToken,
  regenerateAccessToken,
} = require("./middleware/auth")

const campaignRouter = require("./routes/twibbon/campaign")
const userRouter = require("./routes/user")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(FileUpload())
app.use(express.static("public"))
app.use(cors())
app.use(authenticateToken)
// app.user(regenerateAccessToken)


app.use("/api/users", userRouter)
app.use("/api/campaigns", campaignRouter)

app.listen(process.env.PORT, function() {
  console.log(`Node app is running on port ${process.env.PORT}`)
})

module.exports = app