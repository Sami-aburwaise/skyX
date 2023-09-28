//For Authentication
//Require Model - PAssport and Passport Strategy
const User = require('../models /User')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
//Save User ID to the Sesstion using serializeUser
//The id saved along with the done is the key saved and used to retreive
passport.serializeUser(function (user, done) {
  done(null, user.id)
})
//Retrieve the data using deserializeUser
//Check if the session of the user id is there
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})
//Using the Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'userName',
      passwordField: 'password'
    },
    async function (userName, password, done) {
      try {
        const user = await User.findOne({ userName })
        if (!user) {
          return done(null, false)
        }
        if (!user.verifyPassword(password)) {
          return done(null, false)
        }
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)
//Exports Passport
module.exports = passport
