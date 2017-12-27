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

    // redirect to main
    res.redirect('/');
});

router.get('/', function(req, res) {
  res.json(req.user);
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
