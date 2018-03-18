// All authentication strategy code should go here.
const GitHubStrategy = require("passport-github").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/users");

module.exports = function(passport) {
  // This middleware is processed for each login call
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK,
        proxy: true
      },
      function(accessToken, refreshToken, profile, cb) {
        // Look for the user in existing database
        User.findOne(
          {
            "github.id": profile.id
          },
          function(err, user) {
            if (err) {
              return cb(err);
            }
            // No user was found... so create a new user with values from github
            if (!user) {
              user = new User();
              user.github.id = profile.id;
              user.github.displayName = profile._json.name;
              user.github.email = profile._json.email;
              user.github.username = profile._json.login;
              user.avatar = profile._json.avatar_url;

              user.save(function(err) {
                if (err) console.log(err);
                return cb(err, user);
              });
            } else {
              // Round user. Return
              return cb(err, user);
            }
          }
        );
      }
    )
  );

  // =========================================================================
  // GOOGLE ================================================================
  // =========================================================================
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
      },
      function(token, refreshToken, profile, done) {
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
          // try to find the user based on their google id
          User.findOne(
            {
              "google.id": profile.id
            },
            function(err, user) {
              if (err) return done(err);

              if (user) {
                // if a user is found, log them in
                return done(null, user);
              } else {
                // if the user isnt in our database, create a new user
                user = new User();
                user.google.id = profile.id;
                user.google.displayName = profile.displayName;
                user.google.username = profile.displayName;
                user.google.email = profile.emails[0].value;

                console.log(user);

                // save the user
                user.save(function(err) {
                  if (err) throw err;
                  return done(null, user);
                });
              }
            }
          );
        });
      }
    )
  );

  // =========================================================================
  // FACEBOOK ================================================================
  // =========================================================================
  passport.use(
    new FacebookStrategy(
      {
        // pull in our app id and secret from our auth.js file
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK
      },

      // facebook will send back the token and profile
      function(token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {
          // find the user in the database based on their facebook id
          User.findOne(
            {
              "facebook.id": profile.id
            },
            function(err, user) {
              // if there is an error, stop everything and return that
              // ie an error connecting to the database
              if (err) return done(err);

              // if the user is found, then log them in
              if (user) {
                return done(null, user); // user found, return that user
              } else {
                // if there is no user found with that facebook id, create them
                user = new User();

                console.log("Facebook profile ", profile);
                // set all of the facebook information in our user model
                user.facebook.id = profile.id; // set the users facebook id
                user.facebook.displayName = profile.displayName;
                user.facebook.username = profile._json.name;

                // save our user to the database
                user.save(function(err) {
                  if (err) {
                    throw err;
                  }
                  console.log(user);
                  // if successful, return the new user
                  return done(null, user);
                });
              }
            }
          );
        });
      }
    )
  );

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // override with email instead of email instead of userame
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
          // find a user whose email is the same as the forms email
          // we are checking to see if the user trying to login already exists
          User.findOne(
            {
              "email": email
            },
            function(err, user) {
              // if there are any errors, return the error
              if (err) return done(err);

              // check to see if theres already a user with that email
              if (user) {
                return done(null, false);

              } else {
                // if there is no user with that email
                // create the user
                var newUser = new User();

                // set the user's local credentials
                newUser.email = email;
                newUser.local.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                  if (err) throw err;
                  return done(null, newUser);
                });
              }
            }
          );
        });
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne(
          {
            "email": email
          },
          function(err, user) {
            // if there are any errors, return the error before anything else
            if (err) return done(err);

            // if no user is found, return the message
            if (!user)
              return done(
                null,
                false ); 

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
              return done(
                null,
                false    ); // create the loginMessage 

            // all is well, return successful user
            return done(null, user);
          }
        );
      }
    )
  );

  // User ID is stored in the passport session,
  // which can be used to access the rest of the User data
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserializeUser returns the entire User data,
  // when User ID is provided
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
