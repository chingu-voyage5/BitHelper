'use strict';
//import dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
const PostsSchema = new Schema({
    id: String, 
    owner: String,        //username of the post creator
    description: String,  //project description
    status: String,       //status of project, why it's stuck
    repoUrl: String,      //GitHub repo URL
    img: [String]         //image URLs of screenshots
});

//export our module to use in server.js
module.exports = mongoose.model('Post', PostsSchema);