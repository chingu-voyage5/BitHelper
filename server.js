const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/routes.js');

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('./model/users');
//const session = require('express-sessions')

const app = express();
const router = express.Router();
const auth = require('./routes/auth')

require('dotenv').load();

console.log(process.env.PORT);

const port = process.env.PORT || 4000;

// db config
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useMongoClient: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// configure body parser for json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Load api routes
routes(router);

// auth
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {

    User.findOne({
        'id': profile.id
    }, function(err, user) {
        if (err) {
            return cb(err);
        }
        //No user was found... so create a new user with values from github
        if (!user) {
            user = new User({
                id: profile.id,
                displayName: profile.name,
                email: profile.email,
                userName: profile.login,
                avatar: profile.avatar_url

            });
            user.save(function(err) {
                if (err) console.log(err);
                return cb(err, user);
            });
        } else {
            //found user. Return
            return cb(err, user);
        }
    });
  }
));


// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
//
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// Initialize Passport and restore authentication state, if any, from the
// session.

app.use(passport.initialize());
app.use(passport.session());

// Serve static assets
app.use(express.static(path.resolve('build')));

// Defines api route root
app.use('/api', router);
app.use('/auth', auth);



// If request doesn't match api request always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve('build', 'index.html'));
});

app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
