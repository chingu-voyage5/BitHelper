import axios from 'axios';

// Loads environment variables with dotenv
require('dotenv').load();

const apiUrl = process.env.REACT_APP_APPURL || '';

const apiCall = {
  getAllProjects(next) {
    console.log('api call getAllProjects');
    // get projects from api
    axios.get(apiUrl + '/api/projects')
    .then(res => {
      next({projects: res.data});
    })
    .catch(err => {
      console.error('fetch project', err); // handle error if there is one
    });  
  },
  /*
  getOneProject(projectId, next) {
    // If the project is already stored in state
    if (this.state.projects.length > 0) { 
      // check if projectId is equal to the found item
      const project = this.state.projects.find(item => {
        console.log("item ", item);
          return item._id === projectId;
      });
      next(project);
    } else {
      // otherwise looks for it in the api
      axios.get(apiUrl + '/api/projects/' + projectId)
      .then(res => {
        next(res.data);
      })
      // and handle errors
      .catch(err => {
        if (err) throw err;
      });
    }
  },
  // get user data from api and assign it to state
  setUser() {
    axios.get(apiUrl + '/auth')
    .then(res => {
      this.setState({
        user: res.data
      });
    })
  },
  // get user data from api
  getOneUser(id, next) {
    axios.get(apiUrl + '/api/users/' + id)
    .then(res => {
      next(res.data);
    });
  },

  // updates user data 
  postUser(data) {
    axios.put(apiUrl + '/api/users/' + data._id, data)
    .then(res => {
      console.log('update user success');
      this.allProjects();
      this.setUser();
    })
    .catch(err => {
      console.error('error posting user update', err);
    });
  },

  // creates new project
  newProject(data) {
    axios.post(apiUrl + '/api/projects', data)
    .then(res => {
      this.allProjects();
    })
    .catch(err => {
      console.error('error posting new project', err);
    });
  },

  // update project
  updateProject(data) {
    axios.put(apiUrl + '/api/projects/' + data._id, data)
    .then(res => {
      this.allProjects();
    })
    .catch(err => {
      console.error('update project error', err);
    });
  },

  // delete project
  deleteProject(data) {
    axios.delete(apiUrl + '/api/projects/' + data._id)
    .then(res => {
      this.allProjects();
    })
    .catch(err => {
      console.error('delete project error', err);
    });
  }*/
};

export default apiCall;

/*
allProjects = () => {
    // get projects from api
    axios.get(apiUrl + '/api/projects')
    .then(res => {
      this.setState({projects: res.data}) // update state to response data
    })
    .catch(err => {
      console.error('fetch project', err); // handle error if there is one
    });  
  }
  
  getOneProject = (projectId, next) => {
    // If the project is already stored in state
    if (this.state.projects.length > 0) { 
      // check if projectId is equal to the found item
      const project = this.state.projects.find(item => {
        console.log("item ", item);
          return item._id === projectId;
      });
      next(project);
    } else {
      // otherwise looks for it in the api
      axios.get(apiUrl + '/api/projects/' + projectId)
      .then(res => {
        next(res.data);
      })
      // and handle errors
      .catch(err => {
        if (err) throw err;
      });
    }
  }
  // get user data from api and assign it to state
  setUser = () => {
    axios.get(apiUrl + '/auth')
    .then(res => {
      this.setState({
        user: res.data
      });
    })
  }
  // get user data from api
  getOneUser = (id, next) => {
    axios.get(apiUrl + '/api/users/' + id)
    .then(res => {
      next(res.data);
    });
  }

  // updates user data 
  postUser = (data) => {
    axios.put(apiUrl + '/api/users/' + data._id, data)
    .then(res => {
      console.log('update user success');
      this.allProjects();
      this.setUser();
    })
    .catch(err => {
      console.error('error posting user update', err);
    });
  }

  // creates new project
  newProject = (data) => {
    axios.post(apiUrl + '/api/projects', data)
    .then(res => {
      this.allProjects();
    })
    .catch(err => {
      console.error('error posting new project', err);
    });
  }

  // update project
  updateProject = (data) => {
    axios.put(apiUrl + '/api/projects/' + data._id, data)
    .then(res => {
      this.allProjects();
    })
    .catch(err => {
      console.error('update project error', err);
    });
  }

  // delete project
  deleteProject = (data) => {
    axios.delete(apiUrl + '/api/projects/' + data._id)
    .then(res => {
      this.allProjects();
    })
    .catch(err => {
      console.error('delete project error', err);
    });
  }
*/