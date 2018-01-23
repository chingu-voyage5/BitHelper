const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/routes.js');
//const faker = require("faker"); // for dev only

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('./model/users');
const session = require('express-session')

const app = express();
const router = express.Router();
const auth = require('./routes/auth')

require('dotenv').load();

const port = process.env.PORT || 3001;

// db config
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useMongoClient: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// configure body parser for json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'bears-20',
	resave: false,
	saveUninitialized: true
}));

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
    callbackURL: "/auth/github/callback",
    proxy: true
  },
  function(accessToken, refreshToken, profile, cb) {

    User.findOne({
        'githubId': profile.id
    }, function(err, user) {
        if (err) {
            return cb(err);
        }
        //No user was found... so create a new user with values from github
        if (!user) {
            user = new User({
                githubId: profile.id,
                displayName: profile._json.name,
                email: profile._json.email,
                username: profile._json.login,
                avatar: profile._json.avatar_url

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


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

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
 console.log(`API running on port ${port}`);
});
