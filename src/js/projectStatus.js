const projectStatus = {
    // Get status for all projects by user
    userProjects(projects, userId) {
      if (!projects) return null;
      return projects.reduce((result, project) => {
        if (!project.users) return result;
        let user = project.users.find(user => {
          return user._id === userId;
        });
        if (user) {
          return [...result, {
            projectId: project._id, 
            projectTitle: project.title, 
            status: user.status
          }];
        } else {
          return result;
        }
      }, []);
    },
    // Get status of a user for a certain project
    getStatusById(projects, projectId, userId) {
      if (!projects) return null;
      const project = projects.find(item => {
        return item._id === projectId;
      });
      if (!project) {
        console.log('projectStatus.getStatusById: Project not found')
        return null;
      }
      if (!project.users) return null;
      const found = project.users.find(user => {
        return user._id === userId
      });
      return found._id;
    },
    // Get owner ID for a project
    getOwner(project) {
      if (!project.users) return null;
      const found = project.users.find(user => {
        return user.status === 'owner';
      });
      if (found) { return found._id; }
      else { return null; }
    },
    // Get all followers for a project
    getFollowers(project) {
      if (!project.users) return null;
      const followers = project.users.filter(user => {
        return user.status === 'following';
      });
      return followers.map(item => {
        return item._id;
      });
    }
  };
  
  module.exports = projectStatus;