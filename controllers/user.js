const User = require('../models /User')
const { Post } = require('../models /Post')
const bcrypt = require('bcrypt')
const passport = require('../helper/ppConfig')
const multer = require('multer')
let salt = 12

//  Sign up
exports.user_signup_get = (req, res) => {
  res.render('user/signup', { layout: 'user/signup' })
}

exports.user_signup_post = (req, res) => {
  let user = User(req.body)
  if (typeof req.file !== 'undefined') {
    user.profilePic = 'profilePic/' + req.file.filename
  }

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
  res.render('user/signin', { layout: 'user/signin' })
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
      User.findById(req.body.id)
        .then((user) => {
          res.render('user/profile', { posts, user })
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
}

//Get Edit profile Page
exports.profile_edit_get = (req, res) => {
  User.findById(req.query.id)
    .then((user) => {
      res.render('user/edit', { user, layout: 'user/edit' })
    })
    .catch((err) => {
      console.log(err)
    })
}
exports.profile_edit_post = (req, res) => {
  let user = req.body
  if (req.body.prev !== req.body.password) {
    let hashPass = bcrypt.hashSync(req.body.password, salt)
    user.password = hashPass
  }
  if (typeof req.file !== 'undefined') {
    user.profilePic = 'profilePic/' + req.file.filename
  }
  User.findByIdAndUpdate(req.body.id, user)
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err)
    })
}
