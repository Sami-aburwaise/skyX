const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, 'User Name must have more than 3 characters'],
      maxlength: [99, 'Too Much....']
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Weak Password']
    },
    profilePic: String
  },
  {
    timestamps: true
  }
)

// verify password function
userSchema.methods.verifyPassword = function(password){
  return bcrypt.compareSync(password, this.password)
}
// export maodel
const User = mongoose.model('User', userSchema)
module.exports = User
