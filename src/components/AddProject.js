import React, { Component } from 'react';
import axios from 'axios';
// import '../stylesheets/components/addProject.css';
import '../stylesheets/main.css'; // for dev

// const ProjectsSchema = new Schema({
//     id: String,
//     title: String,        //title of the project
//     owner: String,        //username of the post creator
//     description: String,  //project description
//     status: String,       //status of project, why it's stuck
//     repoUrl: String,      //GitHub repo URL
//     img: [String]         //image URLs of screenshots
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
                <div className="card">
                <form onSubmit={this.onFormSubmit}>
                <fieldset>


                <legend>add-project</legend>


                <div class="form-group">
                  <label class="control-label" for="title">Title</label>
                  <input
                    name="title"
                    type="text"
                    placeholder="project title"
                    class="form-control input-md"
                    value={this.state.title}
                    onChange={this.onInputChange} required="" />

                </div>


                <div class="form-group">
                    <label class="control-label" for="description">Description</label>
                    <textarea
                      class="form-control"
                      name="description"
                      value={this.state.description}
                      placeholder="Project description"
                      onChange={this.onInputChange}
                    />
                </div>


                <div class="form-group">
                    <label class="control-label" for="status">Project Status</label>
                    <textarea
                      class="form-control"
                      name="status"
                      value={this.state.status}
                      placeholder="Current state of the project, reason project needs help"
                      onChange={this.onInputChange}
                      required="" />
                </div>


                <div class="form-group">
                    <label class="control-label" for="repoUrl">Github repo</label>
                    <input
                      name="repoUrl"
                      value={this.state.repoUrl}
                      type="search"
                      placeholder="link to github repo"
                      class="form-control input-md"
                      onChange={this.onInputChange}
                      required="" />
                </div>


                <div class="form-group">
                  <label class="col-md-4 control-label" for="img">Img</label>
                  <input
                    name="img"
                    type="text"
                    value={this.state.img}
                    placeholder="Links to project screenshots, mockups "
                    class="form-control input-md"
                    onChange={this.onInputChange}
                  />
                </div>

                <button className="btn" type="submit" onClick={() => this.props.history.push('/')}>Submit</button>

                </fieldset>
                </form>
                <button className="btn" id='backToList' onClick={() => this.props.history.push('/')}>Back to Main</button>
              </div>
            </div>
          </div>
        </div>
        );
    
      }
    }
}

export default AddProject;
