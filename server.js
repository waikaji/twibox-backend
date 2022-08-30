const express = require('express')
const cors = require('cors')

require('express-group-routes')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const campaignRouter = require("./routes/twibbon/campaign")
app.use("/api/twibbon/campaigns", campaignRouter)

// group router
// app.group("/api/v1", (router) => {
  // retrieve all users
  // router.get('/users', (req, res) => {
  //   dbConn.query('SELECT * FROM users', (error, results, fields) => {
  //     if (error) throw error;
  //     return res.send({error: false, data: results, message: 'users list.'})
  //   })
  // })

  // router.get('/user/:id', (req, res) => {
  //   const user_id = req.params.id
  //   if(!user_id){
  //     return res.status(400).send({error: true, message: 'Please provide user_id'})
  //   }
  //   dbConn.query('SELECT * FROM users where id=?', user_id, (error, results, fields) => {
  //     if(error) throw error
  //     return res.send({error: false, data: results[0], message: 'users list.'})
  //   })
  // })

  // router.post('/user', (req, res) => {
  //   const user = req.body.user
  //   if(!user) {
  //     return res.status(400).send({error:true, message: 'Please provide user'})
  //   }
  //   dbConn.query('INSERT INTO users SET ?', {user: user}, (error, results, fields) => {
  //     if(error) throw error
  //     return res.send({error: false, data: results, message: 'New user has been created successfully.'})
  //   })
  // })

  // router.put('/user', (req, res) => {
  //   const user_id = req.body.user_id
  //   const user = req.body.user
  //   if(!user_id || !user) {
  //     return res.status(400).send({error: user, message: 'Please provide user and user_id.'})
  //   }
  //   dbConn.query('UPDATE users SET user = ? WHERE id = ?', [user, user_id], (error, results, fields) => {
  //     if (error) throw error
  //     return res.send({error: false, data: results, message: 'user has been updated successfully'})
  //   })
  // })

  // router.delete('/user', (req, res) => {
  //   const user_id = req.body.user_id
  //   if(!user_id) {
  //     return res.status(400).send({error: true, message: 'Please provide user_id'})
  //   }
  //   dbConn.query('DELETE FROM users WHERE id = ?', [user_id], (error, results, fields) => {
  //     if(error) throw error
  //     return res.send({error: false, data: results, message: 'User has been updated successfully'})
  //   })
  // })
// })


app.listen(3000, function() {
  console.log('Node app is running on port 3000')
})

module.exports = app