//  load packages
const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
require('dotenv').config()
let passport = require('./helper/ppConfig')
const multer = require('multer')
var path = require('path')
//  invoke initilize
const app = express()
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('layout signin', false)
app.set('layout signup', false)
app.set('layout edit', false)
//  initialises the authentication module.
app.use(passport.initialize())
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 45000000 }
  })
)
app.use(passport.session())

// share user info with all ejs pages
app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  next()
})

//  import routes
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')

//  use routes
app.use('/', userRouter)
app.use('/', postRouter)

//  listen to port
const port = process.env.PORT
app.listen(port, () => {
  console.log('listen to port' + port)
})

//  connect to mongoDB
mongoose
  .connect(process.env.mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to mongoDB')
  })
  .catch((err) => {
    console.log('coudnt connect to mongoDB ' + err)
  })
