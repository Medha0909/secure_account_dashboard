const { Result } = require('express-validator');
const mongoose = require('mongoose');
const {Schema}=mongoose;


const userSchema = new Schema({
  userId:{
    type:String,
    required:true
  },
  loginTime:Date,
  device:{
    type:String,
    default:"abc",
  },
  status:{
    type:String,
    enum: ["loggedIn","loggedOut",]
  },
   // lastname: String,
    //image: Buffer,
   });
const SignInUser = mongoose.model('signInUser',userSchema);
module.exports = SignInUser
