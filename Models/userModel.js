const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : false
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phoneNo : {
        type : Number,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
});

const User = mongoose.model('User',userSchema);

module.exports = User;