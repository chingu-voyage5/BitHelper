const Project = require('../model/projects');
const User = require('../model/users');
const passport = require("passport");
const projectStatus = require("../src/js/projectStatus");


function checkBodyForProperties (body) {

  // remove id and owner - these should be unable to be updated from put
  const {id, title, owner, ...rest } = body;
  
  // spread title and rest of the object into new obeject ready to be saved
  const newObj = {
  	title,
   	...rest
  };
  
  return newObj;
}



module.exports = function(router) {

    // All routes except GET are protected

    router.use(function(req, res, next) {

      // get requests allowse
        if (req.method === "GET") {
         return next();
        }
  
        // if req.user does not exist for POST || PUT || DELETE redirect
        if (!req.user) {
          return res.status(400).json({message: 'You have to be loggedin to access this route.'});
        }
        
        // user is logged in move to next step
        return next();
     }) 


    // This route is just for checking if '/api' route is working
    router.get('/', function(req, res) {
      res.json({ message: 'API Initialized!'});
    });

    // PROJECT ROUTES

    // Function for setting properties of a Project schema object
    const setProjectObj = (input, project) => {
      project.title = input.title;
      project.categories = input.categories;
      project.description = input.description;
      project.stack = input.stack;
      project.status = input.status;
      project.repoUrl = input.repoUrl;
      project.img = input.img;
      project.users = input.users;

      return project;
    }

    // Function for setting properties of a User schema object
    const setUserObj = (input, user) => {
      user.username = input.username;
      user.displayName = input.displayName;
      user.avatar = input.avatar || '';
      user.skillset = input.skillset;
      user.email = input.email;

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
    // create new projects on the database
    .put(function(req, res) {
      let project = setProjectObj(req.body, new Project());

      project.save(function(err) {
        if (err) {
          es.send('New project save error', err);
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

    // MERGING WORK CONTINUE HERE... (re-adding auth changes)
    // The put updates project based on the ID passed to the route
    .put(function(req, res) {
      Project.findById(req.params.project_id, function(err, project) {
        if (err) { res.send(err); }

        const ownerId = projectStatus.getOwner(project);

        if (project) {
          if (OwnerId === req.user._id) {
            project = setProjectObj(req.body, project)
            //save project
            project.save(function(err) {
              if (err) { res.send(err); }
              res.json({ message: 'Project has been updated' });
            });
          } else {
            // project is found but requester is not the owner
            res.status(401).json({ message: 'Project update request by non-owner. Cannot proceed'});
          }
        } else {
          res.status(400).json({ message: "Project not found by the id... no action performed" });
        }
      });
    })

    //delete method for removing a project from our database
    .delete(function(req, res) {
      //selects the project by its ID, then removes it.
      console.log('delete requested', req.params.project_id);
      Project.findById(req.params.project_id, function(err, project) {
        if (err) { res.send(err); }

        const ownerId = projectStatus.getOwner(project);

        if (project) {
          if (OwnerId === req.user._id) {
            //delete project
            Project.remove({ _id: req.params.project_id }, function(err) {
              if (err) { res.send(err); }
              res.json({ message: 'Project has been deleted' });
            });
          } else {
            // project is found but requester is not the owner
            res.status(401).json({ message: 'Project delete request by non-owner. Cannot proceed'});
          }
        } else {
          res.status(400).json({ message: "Project not found by the id... no action performed" });
        }
      });
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
        if (err) return res.send(err);
        if (!user._id.equals(req.user._id)) return res.json({message: 'User details do not match.'})
        if (user) {

          //update user
          user.update(req.body)
            .exec(function(err) {
              if (err) { res.send(err); }
              return res.json({ message: 'User has been updated'});
            });
        } else {
          return res.json({ message: 'User not found by id... no action performed'});
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

  router.route("/follow/:project_id").post(function(req, res) {

    const { _id: user_id } = req.user;
    const { project_id } = req.params;

    // Find existing project
    Project.findById(project_id, function(err, project) {
      if (err) res.err(err);
      // Find status of user for this project
      let userStatus = project.users.id(user_id);
      if (userStatus) {
        console.log('User Found', userStatus.status);
        if (userStatus.status === 'following') {
          // User is already following. Unfollow.
          userStatus.remove();
          console.log('Unfollowed', project);
        }
      } else {
        // User not associated to project
        // Add user as a follower
        project.users.push({
          _id: user_id,
          status: 'following'
        });
        console.log('Followed', project);  
      }
      project.save(function(err, update) {
        if (err) throw err;
        console.log('Update Successful', update);
        return res.json({ message: "Update Successful"});
      });
    });
  });
}
