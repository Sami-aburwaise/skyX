//  load packages
const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
// const multer = require('multer')
// const path = require('path')
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images')
//   },
//   filename: (req, file, cb) => {
//     console.log(file)
//     cb(null, Date.now() + path.extname(file.originalname))
//   }
// })
// const upload = multer({ storage: storage })
require('dotenv').config()
let passport = require('./helper/ppConfig')

//  invoke initilize
const app = express()
app.use(expressLayouts)
app.set('view engine', 'ejs')

//  initialises the authentication module.
app.use(passport.initialize())
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitalized: true,
    resave: false,
    cookie: { maxAge: 45000000 }
  })
)
app.use(passport.session())

// share user info with all ejs pages
app.use(function(req, res, next){
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
