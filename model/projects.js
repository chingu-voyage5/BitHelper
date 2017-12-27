'use strict';
//import dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
const ProjectsSchema = new Schema({
    id: String, 
    title: String,        //title of the project
    owner: String,        //username of the post creator
    category: String,     //category of the project
    description: String,  //project description
    stack: [String],      //array of technologies used in the project
    status: String,       //status of project, why it's stuck
    repoUrl: String,      //GitHub repo URL
    img: [String]         //image URLs of screenshots
});

//export our module to use in server.js
module.exports = mongoose.model('Project', ProjectsSchema);