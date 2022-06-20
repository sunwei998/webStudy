const { Schema, model } = require('mongoose')
const userSchema = new Schema({
  name: String,
  password: String,
  age: Number,
  sex: Number
})
const userModel = model('users', userSchema)
module.exports=userModel