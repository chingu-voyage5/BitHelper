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
     let users_filtered = users.map(function(item) {
        return {
          _id: item._id,
          username: item.username,
          displayName: item.displayName, 
          avatar: item.avatar,
          skillset: item.skillset
        };
     })
     //respond with full user data if logged in, filterd data if not logged in.
     res.json((req.user) ? (users) : (users_filtered));
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
      else { 
          let user_filtered = {
            _id: user._id,
            username: user.username,
            displayName: user.displayName, 
            avatar: user.avatar,
            skillset: user.skillset
          };
          // respond with full user data only if logged in.
          res.json((req.user) ? (user) : (user_filtered)); 
        }
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

router.route('/contact/:user_id')
  // Contact Form Submission
  .post(function(req, res) {
    console.log("Contact Form Submission", req.body);
    /* Contact submission code from React
    const url = 'https://formspree.io/' + this.state.contact.email;
              const body = {
                  name: this.props.user.username,
                  _replyto: this.props.user.email,
                  subject: this.state.subject,
                  message: this.state.body
              };
              console.log('message ready to be sent', url, body);
              axios.post(url, body)
              .then(res => {
                  console.log('message submitted', res);
                  alert('Message successfully sent!');
              })
              .catch(err => { if (err) throw err; });
    */
  });

module.exports = router;