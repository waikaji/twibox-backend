require("dotenv").config()
const express = require('express')
const FileUpload = require('express-fileupload')
const cors = require('cors')

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express()
const campaignRouter = require("./routes/twibbon/campaign")
const authRouter = require("./routes/auth")

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(FileUpload())
app.use(express.static("public"))
app.use(cors(corsOptions))

app.use("/api/auth", authRouter)
app.use("/api/campaigns", campaignRouter)

app.listen(process.env.AUTH_PORT, function() {
  console.log(`Node app is running on port ${process.env.AUTH_PORT}`)
})

module.exports = app