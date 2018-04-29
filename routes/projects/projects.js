const express = require('express');
const router = express.Router();

const Project = require('../../model/projects');
const projectStatus = require("../../src/js/projectStatus");
const setProjectObj = require('./projectHelpers.js');

router.route('/')
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
      console.log('New project', req.body);
      let project = setProjectObj(req.body, new Project());
      project.save(function(err) {
        if (err) {
          res.json( {
            message: 'New project save error', 
            error: err
          });
        }
      });
    });

    // Adding a route to a specific project based on the database ID
    router.route('/:project_id')
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
      console.log('Edit project', req.body);
      Project.findById(req.params.project_id, function(err, project) {
        if (err) { res.send(err); }

        if (project) {
          const ownerId = projectStatus.getOwner(project);
          if (ownerId === req.user._id.toString()) {
            project = setProjectObj(req.body, project)
            //save project
            project.save(function(err) {
              if (err) { res.send(err); }
              res.json({ message: 'Project has been updated' });
            });
          } else {
            // project is found but requester is not the owner
            console.log('Not the owner. Cannot proceed', ownerId, req.user._id);
            res.status(401).json({ message: 'Project update request by non-owner. Cannot proceed'});
          }
        } else {
          console.log('Invalid Project ID');
          res.status(400).json({ message: "Invalid Project ID" });
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
          if (ownerId === req.user._id.toString()) {
            //delete project
            Project.remove({ _id: req.params.project_id }, function(err) {
              if (err) { res.send(err); }
              res.json({ message: 'Project has been deleted' });
            });
          } else {
            // project is found but requester is not the owner
            console.log('Not the owner. Cannot proceed', ownerId, req.user._id);
            res.status(401).json({ message: 'Project delete request by non-owner. Cannot proceed'});
          }
        } else {
          console.log('Invalid Project ID');
          res.status(400).json({ message: "Invalid Project ID" });
        }
      });
    });


module.exports = router;