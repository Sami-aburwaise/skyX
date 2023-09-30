const User = require('../models /User')
const { Post } = require('../models /Post')
const bcrypt = require('bcrypt')
const passport = require('../helper/ppConfig')
const multer = require('multer')
let salt = 12
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './profilePic')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  }
})
var upload = multer({
  storage: storage
}).single('profilePic')

exports.user_signup_get = (req, res) => {
  res.render('user/signup')
}

//  Sign up
exports.user_signup_post = (req, res) => {
  let user = User(req.body)
  
  let hashPass = bcrypt.hashSync(req.body.password, salt)
  user.password = hashPass
  user
    .save()
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      res.send('Try Again')
      console.log(err)
    })
}

//  sign in
exports.user_signin_get = (req, res) => {
  res.render('user/signin')
}

exports.user_signin_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'signin'
})

//  log out
exports.user_logout_get = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/user/signin')
  })
}


//  show profile
exports.profile_show_get = (req, res) => {
  Post.find({ user: res.locals.currentUser })
    .then((posts) => {
      res.render('user/profile', { posts })
    })
    .catch((err) => {
      console.log(err)
    })
}

