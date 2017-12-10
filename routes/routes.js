const Post = require('../model/posts');
const User = require('../model/users');

module.exports = function(router) {

    console.log('router post');

    // Go to /api to just check if API is working
    router.get('/', function(req, res) {
      res.json({ message: 'API Initialized!'});
    });

    // POST ROUTES

    router.route('/posts')
    // retrieve all posts from the database
    .get(function(req, res) {
      Post.find(function(err, posts) {
        if (err) { res.send(err); }
        //responds with a json object of our database comments.
        res.json(posts)
      });
    })
    // post new posts to the database
    .post(function(req, res) {
      let post = new Post();
      // body parser lets us use the req.body
      post.title = req.body.title;
      post.owner = req.body.owner;
      post.description = req.body.description;
      post.status = req.body.status;
      post.repoUrl = req.body.repoUrl;
      post.img = req.body.img;
      
      // save to database
      post.save(function(err) {
        if (err) { res.send(err); }
        res.json({ message: 'Post successfully added!' });
      });
    });
    
    // Adding a route to a specific post based on the database ID
    router.route('/posts/:post_id')
    //get post info by ID
    .get(function(req, res) {
      Post.findById(req.params.post_id, function(err, post) {
        if (err) { res.send(err); }
        else { res.json(post); }
      });
    })
    // The put updates post based on the ID passed to the route
    .put(function(req, res) {
     Post.findById(req.params.post_id, function(err, post) {
       if (err) { res.send(err); }
       post.title = req.body.title;
       post.owner = req.body.owner;
       post.description = req.body.description;
       post.status = req.body.status;
       post.repoUrl = req.body.repoUrl;
       post.img = req.body.img;
       //save post
       post.save(function(err) {
         if (err) { res.send(err); }
         res.json({ message: 'Post has been updated' });
       });
     });
    })
    
    //delete method for removing a post from our database
    .delete(function(req, res) {
     //selects the post by its ID, then removes it.
     Post.remove({ _id: req.params.post_id }, function(err, post) {
       if (err) { res.send(err); }
       res.json({ message: 'Post has been deleted' })
     })
    });

    // USER ROUTES

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
}
