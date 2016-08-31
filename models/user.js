'use strict';

var Mongoose = require('../database').Mongoose;

var userSchema = new Mongoose.Schema({
  // saves user email, validation of email address is done in paylod
  email: {
    type: String,
    unique: true,
    required: true,
    index: {unique: true}
  },
  // hashed password is saved
  password: {
    type: String,
    required: true
  },
  // here we defines the user role like admin, customer, etc..
  scope: {
    type: String,
    enum: ['Admin', 'Customer'],
    required: true
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  //it tells about the user account/email verification. By default it is false which is not verified and changes to true when account/email gets verified
  isVerified: {
    type: Boolean,
    default: false
  }
});

module.exports = Mongoose.model('User', userSchema, 'user');
