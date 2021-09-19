const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    user_username : {
        type : String,
        required : [true, 'Please enter a username'],
        unique: true,
        lowercase: true
    },
    user_email : {
        type : String,
        required: [true, 'Please enter an email address'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    user_password : {
        type: String,
        required : true,
        minlength: [6, 'Minimum password length is 6']
    },
    user_phone_no : {
        type : Number,
        required : true,
        minlength: 10,
        maxlength: 12
    }

}, {timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User