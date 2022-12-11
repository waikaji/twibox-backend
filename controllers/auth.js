require("dotenv").config()

const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
  const [user, _] = await User.findByEmail(req.body.email)
  if(!user.length){
    return res.status(401).send({message: "Your email and password do not match."})
  }
  try{
    if(await bcrypt.compare(req.body.password, user[0].password) && req.body.password.length > 7) {
      const accessToken = generateAccessToken({
        email: user[0].email,
        id: user[0].id
      })
      const refreshToken = jwt.sign(
        {email: user[0].email, id: user[0].id},
        process.env.REFRESH_TOKEN_SECRET,
        {}
      )
      const result = {
        id: user[0].id,
        name: user[0].name,
      }
      res.json({
        result,
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
    } else {
      res.status(401).send({message: "Your email and password do not match."})
    }
  } catch(error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}

const register = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword
  } = req.body

  const [existingEmail, _] = await User.findByEmail(email)
  
  if(existingEmail.length) {
    return res.status(400).json({ message: {email:"Email already exists."}})
  }

  if(password !== confirmPassword) {
    return res.status(400).json({message: {password:"Passwords don't match"}})
  }

  if(password.length < 8) {
    return res.status(400).json({message: {password:"Password must be longer than 7 characters"}})
  }

  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    let user = new User(name, email, hashedPassword)
    user = await user.save()

    const [getUser, _] = await User.findByEmail(email)

    const accessToken = generateAccessToken({
      email: getUser[0].email,
      id: getUser[0].id,
    })

    const refreshToken = jwt.sign(
      { email: getUser[0].email, id: getUser[0].id},
      process.env.REFRESH_TOKEN_SECRET,
      { }
    )
    const result = {
      id: getUser[0].id,
      name: getUser[0].name,
    }
    res.status(201).json({
      result,
      accessToken: accessToken,
      refreshToken: refreshToken,
    })
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

const generateAccessToken = (userData) => {
  return jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {})
}

module.exports = {login, register}