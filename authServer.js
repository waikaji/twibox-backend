require("dotenv").config()
const express = require('express')
const FileUpload = require('express-fileupload')
const cors = require('cors')

const app = express()
const campaignRouter = require("./routes/twibbon/campaign")
const authRouter = require("./routes/auth")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(FileUpload())
app.use(express.static("public"))
app.use(cors())

app.use("/api/auth", authRouter)
app.use("/api/campaigns", campaignRouter)

app.listen(process.env.AUTH_PORT, function() {
  console.log(`Node app is running on port ${process.env.AUTH_PORT}`)
})

module.exports = app