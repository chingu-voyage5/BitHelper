/*----------------------
    PROJECT INFO COMPONENT:
    shows details of project. Owners can also access edit and delete features
------------------------*/

import React, { Component } from 'react';
import axios from 'axios';

import ProjectList from '../organisms/ProjectList';
import FollowLarge from '../atoms/FollowLarge';
import Button from "../atoms/Button.js";
import Loader from "../atoms/Loader";
import projectStatus from '../../js/projectStatus';

class ProjectInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      owner: null
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.getProject(id);
  }
  componentWillReceiveProps(nextProps) {
    const id = nextProps.match.params.id;
    if (id) {
      this.getProject(id);
    }
  }
  getProject = projectId => {
    if (projectId) {
      this.props.getOneProject(projectId, project => {
        if (project) {
          this.setState({
            project: project
          });
          this.getOwner(projectStatus.getOwner(project));
        }
      });
    }
  };
  getOwner = ownerId => {
    console.log('get owner', ownerId);
    this.props.getOneUser(ownerId, profile => {
      let owner = profile && profile.displayName ? profile : null;
      this.setState({
        owner: owner
      });
    });
  };

  handleClick = (project_id, e) => {
    e.stopPropagation();
    if (this.props.user) {
        axios.post(`/api/follow/${project_id}`).then(res => {
            this.props.updateProjects(project_id);
        });
    } else {
        // Return 
        return false;
    }
  };

  handleDelete = () => {
    this.props.deleteProject(this.state.project);
    this.props.history.push('/');
  };
  render() {  
    const projectId = this.props.match.params.id;
    const project = this.state.project;
    const owner = this.state.owner;
    const user = this.props.user;
    const isOwner = user && owner && user._id === owner._id;
    let buttons = null;

    console.log('render', project);
    if (!projectId) {
      //this is the '/projects/view/' route without projectId
      return <ProjectList {...this.props} />;
    } else {
      if (!project) {
        return <Loader />;
      }

      if (isOwner) {
        buttons = (
          <div className="d-flex justify-content-around btn-section">
            <Button label="Edit" redirect={"/project/edit/" + project._id} />
            <Button label="Delete" onClick={this.handleDelete} />
          </div>
        );
      } else {
        buttons = 
          owner ? (
            <div className="d-flex justify-content-around btn-section">
              <Button
                label="View Owner Profile"
                redirect={"/user/view/" + owner._id}
              />
              <Button
                label="Contact Project Owner"
                redirect={"/contact/" + owner._id + "/" + project._id}
              />
            </div>
          ) : (
            null
          )
      }
    }

    return (
      <div className="container">
        <div className="row ">
          <div className="col">
            <div className="material-card">
              <div className="project-meta row">
                  <div className="flex-row">
                      {
                        project.categories.map(category => {
                          return <p className="mr-1">{category}</p>
                        })
                      }
                  </div>
                <p className="project-owner col text-md-right">
                  {owner ? owner.displayName : "No Owner Info"}
                </p>
                <hr />
              </div>
              {!isOwner && user && (
                <FollowLarge
                  follow={projectStatus.getFollowers(project).includes(user._id)}
                  onFollow={this.handleClick.bind(this, projectId)}
                />
              )}
              <h1>{project.title}</h1>
              <p>{project.description}</p>
              <div className="row justify-content-between">
                <div className="project-tech col-md-8">
                  <h3>Status</h3>
                  <p>{project.status}</p>
                </div>
                <div className="project-tech col-md-4">
                  <h3>Stack</h3>
                  <ul>
                    {project.stack.map(item => {
                      return <li key={item}>{item}</li>;
                    })}
                  </ul>
                  <h3>Github repo</h3>
                  <a href={project.repoUrl}>{project.repoUrl}</a>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                {project.img.map(imgUrl => {
                  return (
                    <div key={imgUrl}>
                      <img
                        src={imgUrl}
                        className="img-fluid screenshots"
                        width="300px"
                        alt="Project"
                      />
                    </div>
                  );
                })}
              </div>
              {buttons}
            </div>
            <Button label="Back to main" redirect={'/'}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectInfo;