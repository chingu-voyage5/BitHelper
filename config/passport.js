// All authentication strategy code should go here.


const GitHubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require('../model/users');

module.exports = function(passport) {

    // This middleware is processed for each login call
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback",
        proxy: true
      },
      function(accessToken, refreshToken, profile, cb) {
        // Look for the user in existing database
        User.findOne({
            'githubId': profile.id
        }, function(err, user) {
            if (err) {
                return cb(err);
            }
            // No user was found... so create a new user with values from github
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
                // Round user. Return
                return cb(err, user);
            }
        });
      }
    ));

    /* 
    * GOOGLE LOGIN
    */

     passport.use(new GoogleStrategy(
         {
           clientID: process.env.GOOGLE_CLIENT_ID,
           clientSecret: process.env.GOOGLE_CLIENT_SECRET,
           callbackURL: "/auth/google/callback"
         },
         function(token, refreshToken, profile, done) {
           // make the code asynchronous
           // User.findOne won't fire until we have all our data back from Google
           process.nextTick(function() {
             // try to find the user based on their google id
             User.findOne({ "google.id": profile.id }, function(
               err,
               user
             ) {
               if (err) return done(err);

               if (user) {
                 // if a user is found, log them in
                 return done(null, user);
               } else {
                 // if the user isnt in our database, create a new user
                 var newUser = new User();

                 newUser.google.email = profile.emails[0].value;
                 newUser.google.id = profile.id;
                 newUser.google.name = profile.displayName;

                 // save the user
                 newUser.save(function(err) {
                   if (err) throw err;
                   return done(null, newUser);
                 });
               }
             });
           });
         }
       ));

    
    // User ID is stored in the passport session,
    // which can be used to access the rest of the User data
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
    
    // deserializeUser returns the entire User data, 
    // when User ID is provided
    passport.deserializeUser(function(id, done) {
      User.findById(id, function (err, user) {
        done(err, user);
      });
    });

}
