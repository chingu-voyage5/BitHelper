const Post = require('./model/posts')

// API ROUTING POSTS

module.exports = function(router) {
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
}
