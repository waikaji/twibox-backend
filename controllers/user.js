const User = require("../models/user")

const getUsers = async(req, res, next) => {
  try{
    const [users, _] = await User.findAll()
    res.status(200).send({users})
  } catch(error) {
    console.log(error)
    next(error)
  }
}

const getUser = async(req, res, next) => {
  try{
    const id = req.params.id
    const [user, _] = await User.findById(id)
    res.status(200).send({user})
  } catch(error) {
    console.log(error)
    next(error)
  }
}

const getUserEmail = async(req, res, next) => {
  try {
    const {email} = req.body
    const [user, _] = await User.findByEmail(email)
    res.status(200).send({user})
  } catch(error) {
    console.log(error)
    next(error)
  }
}

const updateUser = async(req, res, next) => {
  try{
    const id = req.params.id
    const {name} = req.body

    let user = new User(name, "", "")
    const [user_by_id, _] = await User.findById(id)
    if(user_by_id.length) {
      if(user_by_id[0].id !== parseInt(id, 10)) {
        res.status(400).send({message: "Failed to update"})
      } else {
        user = await user.update(parseInt(id, 10))
        res.status(201).send({ message: "User updated"})
      }
    } else {
      res.status(400).send({message: "Cannot find user"})
    }
  } catch(error) {
    console.log(error)
    next(error)
  }
}

module.exports = {getUserEmail, getUsers, getUser, updateUser}