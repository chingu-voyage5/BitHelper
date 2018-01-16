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
          category: "",
          description: "",
          stack: "",
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
      e.preventDefault();
      if (this.state.title.length > 0) {
        this.props.createPoll(this.state)
      } else {
        alert('Please at least enter a title!');
      }
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
                    <div className="form-group">
                      <label className="control-label" for="title">Project title</label>
                      <input
                        name="title"
                        type="text"
                        placeholder="e.g. the Ninja project"
                        className="form-control input-md"
                        value={this.state.title}
                        onChange={this.onInputChange} required="" />
                    </div>

                    <div className="form-group">
                      <label className="control-label" for="category">Category</label>
                      <input
                        name="category"
                        type="text"
                        placeholder="category"
                        className="form-control input-md"
                        value={this.state.category}
                        onChange={this.onInputChange} required="" />
                    </div>

                    <div className="form-group">
                      <label className="control-label" for="description">
                        Description</label>
                      <textarea
                        className="form-control"
                        name="e.g. This is the coolest project ever"
                        value={this.state.description}
                        placeholder="Project description"
                        onChange={this.onInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="control-label" for="status"><strong>Project Status</strong></label>
                      <textarea
                        className="form-control"
                        name="status"
                        value={this.state.status}
                        placeholder="E.g. Explain what is the current state of the project, why you need help and what roles you might need"
                        onChange={this.onInputChange}
                        required="" />
                    </div>

                    <div className="form-group">
                      <label className="control-label" for="stack">Stack</label>
                      <input
                        name="stack"
                        type="text"
                        placeholder="Languages, frameworks, libraries... separate by comma"
                        className="form-control input-md"
                        value={this.state.stack}
                        onChange={this.onInputChange} required="" />
                    </div>

                    <div className="form-group">
                      <label className="control-label" for="repoUrl">
                        Code repository</label>
                      <input
                        name="repoUrl"
                        value={this.state.repoUrl}
                        type="search"
                        placeholder="http://github.com/username/github-repo"
                        className="form-control input-md"
                        onChange={this.onInputChange}
                        required="" />
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label" for="img">Image</label>
                        <input
                          name="img"
                          type="text"
                          value={this.state.img}
                          placeholder="e.g. http://via.placeholder.com/400x300"
                          className="form-control input-md"
                          onChange={this.onInputChange}
                        />
                    </div>

                  <button className="btn" type="submit" onClick={() => this.props.history.push('/')}>Submit</button>

                  </fieldset>
                </form>
                <Button label="Back to home" />
              </div>
              <button className='btn btn-primary' onClick={() => this.props.history.push('/')}>Back to Home</button>
            </div>
          </div>
        </div>
        );
    
      }
    }
}

export default AddProject;
