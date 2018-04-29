const express = require('express');
const router = express.Router();

const User = require('../../model/users');
const userHelpers = require('./userHelpers.js')

 // USER ROUTES

 router.route('/')
 // retrieve all users from the database
 .get(function(req, res) {
   User.find(function(err, users) {
     if (err) { res.send(err); }
     //responds with a json object of our database comments.
     res.json(users)
   });
 })
 // post new users to the database
 .post(function(req, res) {

   let user = userHelpers.setUserObj(req.body, new User())
   // save to database
   user.save(function(err) {
     if (err) { res.send(err); }
     res.json({ message: 'User successfully added!' });
   });
 });

 // Adding a route to a specific user based on the database ID
 router.route('/:user_id')
 //get user info by ID
 .get(function(req, res) {
   User.findById(req.params.user_id, function(err, user) {
     if (err) { res.send(err); }
     else { res.json(user); }
   });
 })

 // The put updates user based on the ID passed to the route
  .put(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) return res.send(err);
      if (!user) return res.json({ message: 'User not found by id... no action performed'});
      // yif (!user._id.equals(req.user._id)) return res.json({message: 'User details do not match.'})
      if (user) {
        userHelpers.checkDisplayOrUsername(req.body, function (err, users) {
          if (err) {
            return res.json(err);
          }
          // username or displayname exist
          if (users) {
            return res.json(users);
          }
        //update user
          user.update(req.body)
          .exec(function(err) {
            if (err) { res.send(err); }
            return res.json({ message: 'User has been updated'});
          });
        }); 
      }
    });
  })

 //delete method for removing a user from our database
 .delete(function(req, res) {
   User.findById(req.user._id)
     .exec(function (err, user) {
       if (!user._id.equals(req.user._id)) return res.json({ message: 'Users do not match'});
       //selects the user by its ID, then removes it.
       User.remove({ _id: req.params.user_id }, function(err, user) {
         if (err) { res.send(err); }
         return res.json({ message: 'User has been deleted' })
       })
     })
});


module.exports = router;