'use strict';
//import dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// A nested document which contains users and their relationship to the project
// Allowed status: "owner", "following", "contributor"
const ProjectUsersSchema = new Schema({
    _id: String,
    status: String
});

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
const ProjectsSchema = new Schema({
    id: String, 
    title: String,        //title of the project
    owner: String,        //ID of the post creator ***To be moved to ProjectUsersSchema
    category: String,     //category of the project
    description: String,  //project description
    stack: [String],      //array of technologies used in the project
    status: String,       //status of project, why it's stuck
    repoUrl: String,      //GitHub repo URL
    img: [String],         //image URLs of screenshots
    users: [ProjectUsersSchema]
});

//export our module to use in server.js
module.exports = mongoose.model('Project', ProjectsSchema);