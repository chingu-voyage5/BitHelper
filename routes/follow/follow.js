const express = require('express');
const router = express.Router();

const Project = require('../../model/projects');

router.route("/:project_id").post(function(req, res) {

    const { _id: user_id } = req.user;
    const { project_id } = req.params;

    // Find existing project
    Project.findById(project_id, function(err, project) {
      if (err) return res.err(err);
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



module.exports = router;