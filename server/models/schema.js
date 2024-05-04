const { Result } = require('express-validator');
const mongoose = require('mongoose');
const {Schema}=mongoose;


const userSchema = new Schema({
  email:{
    type:String,
    unique:true,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  timestamps:{
    type:String
  }
   // lastname: String,
    //image: Buffer,
   });
const User = mongoose.model('user',userSchema);
User.createIndexes();
module.exports = User
