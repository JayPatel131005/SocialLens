const mongoose = require('mongoose')

const userschema = new mongoose.Schema({  
    username:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:20,
    },
    phoneno:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        max:50
    },

});

module.exports = mongoose.model("User",userschema);