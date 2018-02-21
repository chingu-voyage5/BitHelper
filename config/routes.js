const Project = require('../model/projects');
const User = require('../model/users');

module.exports = function(router) {

    // This route is just for checking if '/api' route is working
    router.get('/', function(req, res) {
      res.json({ message: 'API Initialized!'});
    });

    // PROJECT ROUTES

    // Function for setting properties of a Project schema object
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

    // Function for setting properties of a User schema object
    const setUserObj = (input, user) => {
      user.username = input.username;
      user.displayName = input.displayName;
      user.avatar = input.avatar;
      user.skillset = input.skillset;
      user.email = input.email;
      user.projects = input.projects;

      return user;
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

      // add project ID to owner's data
      User.findById(project.owner, function(err, user) {
        // console.log('Add project to owner data', project);
        if (err) { console.log(err) }
        if (user) {
          // save project to database
          project.save(function(err) {
            if (err) {'Error: Project could not be saved.'}
          });
          //save user with new project ID added
          user.projects.push(project._id)
          // console.log('new user profile', user);          
          user.save(function(err) {
            if (err) { console.log(err) }
            res.send('Project successfully added.');
          });
        } else {
            res.send('Error: Owner profile not found.')
        }
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
      let user = setUserObj(req.body, new User())
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
        user = setUserObj(req.body, user);
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

  router.route("/follow/:project_id").post(function(req, res) {

    // if user is not logged in reject
    if (!req.user) {
      return res.json({ message: "user does not exist" });
    }

    const { _id: user_id ) = req.user;
    const { project_id } = req.params;

    // Find existing project
    Project.findById(project_id, function(err, project) {
      if (err) res.err(err);

      // Search for existing User
      User.findById(user_id, function(err, user) {
        if (err) res.err(err);

        // Find project_id Users project array;
        const projectExists = user.projects.includes(project_id);

        // If project_id does exist either remove or add to projects array
        const options = projectExists ? { $pull: { projects: project_id } } : { $addToSet: { projects: project_id } };

        // update user information
        user.update(options, function(err, update) {
          if (err) return res.err(err);

          return res.json({ message: "Update Successful" });
        });
      });
    });
  });
}
