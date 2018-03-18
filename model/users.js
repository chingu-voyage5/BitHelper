'use strict';
//import dependency
const mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");

const Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
const UsersSchema = new Schema({
  username: String, //username
  displayName: String, //display name
  avatar: String, //avatar image URL, can be empty
  skillset: [String], //array of strings, like "React" and "Nodejs"
  projects: [String], //array of project IDs that this user has created
  followedProjects: [String],
  google: {
    id: String,
    username: String,
    displayName: String,
    email: String
  },
  facebook: {
    id: String,
    username: String,
    displayName: String,
    email: String
  },
  github: {
    id: String,
    username: String,
    displayName: String,
    email: String
  },
  local: {
    email: String,
    password: String
  }
});


UsersSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UsersSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

//export our module to use in server.js
module.exports = mongoose.model('User', UsersSchema);