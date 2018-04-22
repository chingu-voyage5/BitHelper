import axios from 'axios';

// Loads environment variables with dotenv
require('dotenv').load();

const apiUrl = process.env.REACT_APP_APPURL || '';
console.log('apiUrl', apiUrl);

const apiCall = {
  // Retrieve all projects from server
  getAllProjects(next) {
    // get projects from api
    axios.get(apiUrl + '/api/projects')
    .then(res => {
      next({data: res.data});
    })
    .catch(err => {
      if (err) {
        next({error: err});
        throw err;
      }
    });  
  },
  // Retrieve one project by ID
  getProjectById(projects, projectId, next) {
    // In case projects data already exists
    if (projects) {
      const project = projects.find(item => {
        return item._id === projectId;
      });
      if (project) {
        next({data: project});
      } else {
        next({error: 'Project not found!'});
      }
    } else {
      axios.get(apiUrl + '/api/projects/' + projectId)
      .then(res => {
        next({data: res.data});
      })
      // and handle errors
      .catch(err => {
        if (err) {
          next({error: err});
          throw err;
        }
      });
    }
  },
  // Get logged in user data from api and assign it to state
  getCurrentUser(next) {
    console.log('api call getCurrentUser');
    axios.get(apiUrl + '/auth')
    .then(res => {
      console.log('getCurrentUser Response', res);
      let data = (res.data !== '') ? res.data : null;
      next({data: data});
    })
    .catch(err => {
      if (err) {
        next({error: err});
        throw err;
      }
    })
  },
  // get user data from api
  getUserById(id, next) {
    axios.get(apiUrl + '/api/users/' + id)
    .then(res => {
      next({data: res.data});
    })
    .catch(err => {
      if (err) {
        next({error: err});
        throw err;
      }
    });
  },

  // Updates user data 
  postUser(data, next) {
    axios.put(apiUrl + '/api/users/' + data._id, data)
    .then(res => {
      next({data: res.data});
    })
    .catch(err => {
      next({error: err});
      throw err;
    });
  },

  // creates new project or updates a project
  postProject(data, next) {
    const id = data._id || '';
    console.log('api call update project id', id, 'data', data);
    axios.put(apiUrl + '/api/projects/' + id, data)
    .then(res => {
      console.log('api call update project success', res.data);
      next({data: res.data});
    })
    .catch(err => {
      console.log(err);
      next({error: err});
      throw err;
    });
  },

  // delete project
  deleteProject(data, next) {
    axios.delete(apiUrl + '/api/projects/' + data._id)
    .then(res => {
      next({data: res.data});
    })
    .catch(err => {
      next({error: err});
      throw err;
    });
  }
};

export default apiCall;