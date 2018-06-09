'use strict';
//import dependency
const mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");

const Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
const UsersSchema = new Schema({
  username: { 
    type: String, default: '', 
  },
  email: String,
  displayName: {
    type: String,
  }, 
  avatar: {
    type: String,
    default: ''
  },
  skillset: [String], //array of strings, like "React" and "Nodejs"
  google: {
    id: String,
    //username: String,
    //displayName: String,
    //email: String
  },
  facebook: {
    id: String,
    //username: String,
    //displayName: String,
    //email: String
  },
  github: {
    id: String,
    //username: String,
    //displayName: String,
    //email: String
  },
  local: {
    //email: String,
    password: String
  }
});


UsersSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UsersSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

UsersSchema.pre('save', function (next) {

  let user = this;

  // username / displayName isnt changed then skip
  if (!user.isModified('username') || !user.isModified('displayName')) {
    return next()
  };
  // checker username does not already exist
  user.constructor.findOne()
    .or([{username: user.username}, { displayName: user.displayName}])
    .exec((err, doc) => {
      if (err) return next(err);
      // no results
      if (!doc) {
        return next();
      }
      
      // if document has a username, reset
      if (doc.username === user.username) {
        user.username = "";
      }

      // if document has a displayName reset
      if (doc.displayName === user.displayName) {
        user.displayName = "";
      }

      return next();
    })

});

//export our module to use in server.js
module.exports = mongoose.model('User', UsersSchema);
