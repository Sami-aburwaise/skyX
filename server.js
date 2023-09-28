//  load packages
const express = require('express')
const mongoose = require('mongoose')
const expressLayouts  = require('express-ejs-layouts')
const session = require('express-session')
require('dotenv').config()

//  invoke initilize
const app = express()



//  import routes


//  use routes


//  listen to port
const port = process.env.PORT
app.listen(port, ()=>{
  console.log('listen to port' + port)
})

//  connect to mongoDB
mongoose.connect(process.env.mongoDBURL, {
  useNewUrlParser: true,
  userUnifiedTopology:true
})