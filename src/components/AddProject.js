import React, { Component } from 'react';
import axios from 'axios';
// import '../stylesheets/components/addProject.css';
import '../stylesheets/main.css'; // for dev
import Button from './Button.js';

// const ProjectsSchema = new Schema({
//   id: String, 
//   title: String,        //title of the project
//   owner: String,        //username of the post creator
//   category: String,     //category of the project
//   description: String,  //project description
//   stack: [String],      //array of technologies used in the project
//   status: String,       //status of project, why it's stuck
//   repoUrl: String,      //GitHub repo URL
//   img: [String]         //image URLs of screenshots
// });


class AddProject extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
          title: "",
          owner: "",
          description: "",
          status: "",
          repoUrl: "",
          img: []
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }
    componentDidMount() {
      // if user is not logged in and therefore user info is null, redirect to home
      // redirect to login page in the future
      if (!this.props.user) {
          setTimeout(() => {
              this.props.history.push('/');
          }, 3000);
      } else {
        this.setState({
          owner: this.props.user.displayName
        });
      }
    }
    onInputChange(event) {
      const newValue = {}
      newValue[event.target.name] = event.target.value;

      this.setState(...this.state, newValue);

    }
    onFormSubmit(e) {
      e.preventDefault()
      console.log(this.props)
      this.props.createPoll(this.state)
    }
    render() {
      if (!this.props.user) {
          return <h3>ERROR: Not logged in. Redirecting...</h3>;
      } else {
         return (
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="material-card">
                <h1>Add a project </h1>
                <form onSubmit={this.onFormSubmit}>
                <fieldset>
                <div class="form-group">
                  <label class="control-label" for="title">Project title</label>
                  <input
                    name="title"
                    type="text"
                    placeholder="e.g. the Ninja project"
                    class="form-control input-md"
                    value={this.state.title}
                    onChange={this.onInputChange} required="" />

                </div>


                <div class="form-group">
                    <label class="control-label" for="description">
                      Description</label>
                    <textarea
                      class="form-control"
                      name="e.g. This is the coolest project ever"
                      value={this.state.description}
                      placeholder="Project description"
                      onChange={this.onInputChange}
                    />
                </div>


                <div class="form-group">
                    <label class="control-label" for="status"><strong>Project Status</strong></label>
                    <textarea
                      class="form-control"
                      name="status"
                      value={this.state.status}
                      placeholder="E.g. Explain what is the current state of the project, why you need help and what roles you might need"
                      onChange={this.onInputChange}
                      required="" />
                </div>


                <div class="form-group">
                    <label class="control-label" for="repoUrl">
                      Code repository</label>
                    <input
                      name="repoUrl"
                      value={this.state.repoUrl}
                      type="search"
                      placeholder="http://github.com/username/github-repo"
                      class="form-control input-md"
                      onChange={this.onInputChange}
                      required="" />
                </div>


                <div class="form-group">
                  <label class="col-md-4 control-label" for="img">Image</label>
                  <input
                    name="img"
                    type="text"
                    value={this.state.img}
                    placeholder="e.g. http://via.placeholder.com/400x300"
                    class="form-control input-md"
                    onChange={this.onInputChange}
                  />
                </div>

                <button className="btn" type="submit" onClick={() => this.props.history.push('/')}>Submit</button>

                </fieldset>
                </form>
                <Button label="Back to home" />
              </div>
            </div>
          </div>
        </div>
        );
    
      }
    }
}

export default AddProject;
