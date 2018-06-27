const express = require('express');
const router = express.Router();

const request = require('request');

const User = require('../../model/users');
const userHelpers = require('./userHelpers.js')

const Project = require('../../model/projects');

 // USER ROUTES

router.route('/')
  // retrieve all users from the database
  // this route is to be removed.
  /*.get(function(req, res) {
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
     res.json(users_filtered);
   });
  })*/
  
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
      else if (!user) {
          console.log("User not found!");
          res.send("User not found!");
      } else { 
          let user_filtered = {
            _id: user._id,
            username: user.username,
            displayName: user.displayName, 
            avatar: user.avatar,
            skillset: user.skillset
          };
          // Only if user is requesting own info, share email address.
          if (req.user && req.user._id === req.params.user_id) {
            user_filtered.email = user.email;
          }
          // respond with full user data only if logged in.
          res.json(user_filtered); 
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
    console.log('Delete User request', req.params.user_id);
    User.findById(req.params.user_id)
      .exec(function (err, user) {
        if (err) return res.send(err);
        if (String(user._id) == String(req.user._id)) {
          // user to be deleted is owned by the logged in user
          // Find and remove owned projects
          Project.deleteMany({
            users: { 
                $elemMatch: {
                    _id: user._id,
                    status: "owner"
                }
            }     
          })
          .exec(function (err, res) {
              if (err) throw err;
              console.log("Projects deleted", res.deletedCount);
          });
          // also find followed projects and remove status
          Project.find({
            users: { 
                $elemMatch: {
                    _id: user._id,
                    status: "following"
                }
            }
          })
          .exec(function (err, projects) {
              if (err) throw err;
              if (projects) {
                projects.forEach(function(project) {
                  //unfollow all followed projects
                  let status = project.users.id(user._id);
                  status.remove();
                  project.save(function(err, update) {
                    if (err) throw err;
                    console.log("Unfollowed projects", update.title);
                  });
                });
                
              }
          });
          // Finally remove user account
          console.log('User to be deleted', user.username);
          user.remove();
          user.save(function(err, update) {
            if (err) throw err;
          });
          return res.redirect('/');
        } else {
          // user to be deleted is not owned by the logged in user
          console.log('logged in user ID does not match user to be deleted');
          return res.send('Cannot delete account not owned by the user');
        }
      }) 
  });

router.route('/contact/:user_id')
  // Contact Form Submission
  .post(function(req, res) {
    // Find recipient info
    User.findById(req.body.recipientId, function(err, recipient) {
      if (err) { res.send(err); }
      else { 
        // Find sender info
        User.findById(req.body.senderId, function(err, sender) {
          if (err) { res.send(err); }
          else { 
            const url = 'https://formspree.io/' + recipient.email;
            const body = {
              name: sender.username,
              _replyto: sender.email,
              subject: req.body.subject,
              message: req.body.message
            };
            console.log('message ready to be sent', url, body);
            request.post(url, {form: body}, function(error, response, body) {
              if (error) { 
                console.log(error);
                res.error(error);
              } else {
                console.log('message submitted', response);
                res.json({message: 'Message successfully sent!'});
              }
            });
          }
        })
      }
    });
  });

module.exports = router;