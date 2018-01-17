const Project = require('../model/projects');
const User = require('../model/users');

module.exports = function(router) {
    // Go to /api to just check if API is working
    router.get('/', function(req, res) {
      res.json({ message: 'API Initialized!'});
    });

    // PROJECT ROUTES

    const setProjectObj = (input, project) => {
      project.title = input.title;
      project.owner = input.owner;
      project.category = input.category;
      project.description = input.description;
      project.stack = input.stack;
      project.status = input.status;
      project.repoUrl = input.repoUrl;
      project.img = input.img;

      return project;
    }

    router.route('/projects')
    // retrieve all projects from the database
    .get(function(req, res) {
      Project.find(function(err, projects) {
        if (err) { res.send(err); }
        //responds with a json object of our database comments.
        res.json(projects)
      });
    })
    // post new projects to the database
    .post(function(req, res) {
      let project = new Project();
      project = setProjectObj(req.body, project);
      // save to database
      project.save(function(err) {
        if (err) { res.send(err); }
        res.json({ message: 'Project successfully added!' });
      });
    });

    // Adding a route to a specific project based on the database ID
    router.route('/projects/:project_id')
    //get project info by ID
    .get(function(req, res) {
      Project.findById(req.params.project_id, function(err, project) {
        if (err) { res.send(err); }
        else { res.json(project); }
      });
    })
    // The put updates project based on the ID passed to the route
    .put(function(req, res) {
     Project.findById(req.params.project_id, function(err, project) {
       if (err) { res.send(err); }
       if (project) {
        project = setProjectObj(req.body, project)
        //save project
        project.save(function(err) {
          if (err) { res.send(err); }
          res.json({ message: 'Project has been updated' });
        });
       } else {
         res.json({ message: "Project not found by the id... no action performed" });
       }
     });
    })
    //delete method for removing a project from our database
    .delete(function(req, res) {
     //selects the project by its ID, then removes it.
     console.log('delete requested', req.params.project_id);
     Project.remove({ _id: req.params.project_id }, function(err, project) {
       if (err) { res.send(err); }
       res.json({ message: 'Project has been deleted' })
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
      if (user) {
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
      } else {
        res.json({ message: 'User not found by id... no action performed'});
      }

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
