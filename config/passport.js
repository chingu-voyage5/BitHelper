const GitHubStrategy = require('passport-github').Strategy;
const User = require('../model/users');

module.exports = function(passport) {

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

}
