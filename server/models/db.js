//require('dotenv').config();
const mongoose = require('mongoose');

const connecttomongo=()=>
{
    mongoose.connect(process.env.REACT_APP_MONGO_URI);
}

module.exports=connecttomongo;