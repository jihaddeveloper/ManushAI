//  Author: Mohammad Jihad Hossain
//  Create Date: 30/01/2021
//  Modify Date: 30/01/2021
//  Description: User model file

//Imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Sechema defination
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    avatar: {
        type: String
    },
    deliveryAddress: {
        type: String
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});


//Exporting model
module.exports = mongoose.model('User', UserSchema, 'users');