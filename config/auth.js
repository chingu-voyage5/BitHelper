// This file contain all Express routing related to authentication
// Remember that the root for this route is '/auth'
const express = require('express');
const router = express.Router();
const passport = require('passport');

// To log-in with GitHub OAuth
router.get('/github',
  passport.authenticate('github'));

// User will arrive here after GitHub login
router.get('/github/callback',
  passport.authenticate('github'),
  function(req, res) {
    // Successful authentication.
    console.log('Authenticated with Github')

    // set userId cookie using passport session
    res.cookie('userId', req.session.passport.user)
    // redirect to homepage cant be done in react as github response doesn't allow cors
    res.redirect('/');
});


// TODO: Add email login here

// TODO: Add Google login here
    router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    
    
    router.get("/google/callback", 
      passport.authenticate("google",{
        successRedirect: "/",
        failureRedirect: "/"
      })
    );
      
// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

// handle the callback after facebook has authenticated the user
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

// This route return the logged-in user's profile. 
router.get('/', function(req, res) {
  res.json(req.user);
});

// This route is for logging the user out
router.get('/logout', function(req, res){
  // logout session on server
  req.logout();
  // dont redirect react user state will handle view
  res.end();
});

module.exports = router;
