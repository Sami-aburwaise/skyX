const User = require('../models /User')
const bcrypt = require('bcrypt')
const passport = require('../helper/ppConfig')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })
let salt = 12
exports.user_signup_get = (req, res) => {
  res.render('user/signup')
}
exports.user_signup_post = (req, res) => {
  let user = User(req.body)
  let hashPass = bcrypt.hashSync(req.body.password, salt)
  user.password = hashPass
  user
    .save()
    .then(() => {
      res.redirect('/user/signup')
    })
    .catch((err) => {
      res.send('Try Again')
      console.log(err)
    })
  // res.send('Image Upload')
}

//  sign in
exports.user_signin_get = (req, res) => {
  res.render('user/signin')
}

exports.user_signin_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'user/signin'
})
