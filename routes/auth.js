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

    // return user
    res.json(req.user)
});

module.exports = router;
