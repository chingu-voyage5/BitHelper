// API ROUTING USERS

router.route('/users')
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
  let user = new User();
  // body parser lets us use the req.body
  user.username = req.body.username;
  user.displayName = req.body.displayName;
  user.avatar = req.body.avatar;
  user.skillset = req.body.skillset;
  user.email = req.body.email;
  // save to database
  user.save(function(err) {
    if (err) { res.send(err); }
    res.json({ message: 'User successfully added!' });
  });
});

// Adding a route to a specific user based on the database ID
router.route('/users/:user_id')
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
   console.log(user);
   if (err) { res.send(err); }
   user.username = req.body.username;
   user.displayName = req.body.displayName;
   user.avatar = req.body.avatar;
   user.skillset = req.body.skillset;
   user.email = req.body.email;
   //save user
   user.save(function(err) {
     if (err) { res.send(err); }
     res.json({ message: 'User has been updated'});
   });
 });
})

//delete method for removing a user from our database
.delete(function(req, res) {
 //selects the user by its ID, then removes it.
 User.remove({ _id: req.params.user_id }, function(err, user) {
   if (err) { res.send(err); }
   res.json({ message: 'User has been deleted' })
 })
});