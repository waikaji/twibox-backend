const User = require("../models/user")
const path = require("path")

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
    let [user, _] = await User.findById(id)
    user = {
      id:user[0].id,
      name:user[0].name,
      email:user[0].email,
      image_filename:user[0].image_filename,
      url:user[0].url,
      created_at:user[0].created_at,
      updated_at:user[0].updated_at
    }
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

const updateAvatar = async (req, res, next) => {
  const id = req.params.id;
  if(req.files === null) return res.status(400).json({message: "No File Uploaded"})
  const file = req.files.file
  const fileSize = file.data.length
  const ext = path.extname(file.name)
  const fileName = file.md5 + ext
  const urlImage = `${req.protocol}://${req.get("host")}/avatar/${fileName}`
  const allowedType = ['.png', '.jpg', '.jpeg']

  if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({message: "Invalid images"})
  if(fileSize > 5000000) return res.status(422).json({message: "Image must be less than 5 MB"})
  let user = new User(image_filename=fileName, url=urlImage)

  file.mv(`./public/avatar/${fileName}`, async(err) => {
    if(err) return res.status(500).json({message: err.message})
    try {
      const [user_by_id, _] = await User.findById(id)

      if(user_by_id.length) {
        if(user_by_id[0].id !== parseInt(id, 10)) {
          res.status(400).send({message: "Failed to update image avatar"})
        } else {
          user = await user.updateImage(parseInt(id, 10))
          res.status(201).send({ message: "User avatar updated"})
        }
      } else {
        res.status(400).send({ message: "User doesn't exist"})
      }
    } catch(error) {
      console.log(error)
      next(error)
    }
  })
}

module.exports = {getUserEmail, getUsers, getUser, updateUser, updateAvatar}