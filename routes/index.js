const express = require('express');
const routes = express.Router();

const auth = require('./auth/auth.js');
const projects = require('./projects/projects.js');
const users = require('./users/users.js');
const follow = require('./follow/follow.js');

/*

routes.use(function(req, res, next) {

    // get requests allowse
    if (req.method === "GET") {
    return next();
    }

    // if req.user does not exist for POST || PUT || DELETE redirect
    if (!req.user) {
    return res.status(400).json({message: 'You have to be loggedin to access this route.'});
    }

    // user is logged in move to next step
    return next();
});
*/

routes.use('/auth', auth);

// This route is just for checking if '/api' route is working
routes.get('/api', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

routes.use('/api/users', users);
routes.use('/api/projects', projects);
routes.use('/api/follow', follow);

module.exports = routes;