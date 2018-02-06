const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github'),
  function(req, res) {
    // Successful authentication.
    console.log('authenticated')

    // set userId cookie using passport session
    res.cookie('userId', req.session.passport.user)
    // redirect to homepage cant be done in react as github response doesn't allow cors
    res.redirect('/');
});

router.get('/', function(req, res) {
  res.json(req.user);
});

router.get('/logout', function(req, res){
  // logout session on server
  req.logout();
  // dont redirect react user state will handle view
  res.end();
});

module.exports = router;
