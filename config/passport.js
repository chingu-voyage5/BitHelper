// All authentication strategy code should go here.

const GitHubStrategy = require('passport-github').Strategy;
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
