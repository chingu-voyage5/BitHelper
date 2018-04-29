/*----------------------
    PROJECT EDIT COMPONENT:
    owners can edit their own projects from here.
------------------------*/

import React, { Component } from 'react';
import Button from '../atoms/Button.js';
import Input from '../atoms/Input';
import Categories from '../molecules/Categories.js';

class ProjectEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: "",
          owner: "",
          categories: [],
          description: "",
          stack: [],
          status: "",
          repoUrl: "",
          img: [],
          users: [],
          active: false,
        };
    }
    componentDidMount() {
      // if user is not logged in and therefore user info is null, redirect to home
      // redirect to login page in the future
      if (!this.props.user) {
        setTimeout(() => {
            this.props.history.push('/');
        }, 3000);
      } else if (this.props.match.params.id) {
        // if editing a project, retrieve project data based on URL
        this.getProjectData();
      } else {
        // if creating a new project, set owner based on props
        // NOTE I've changed the owner info to user ID, because displayname can be changed
        // and therefore cannot be used to identify the user.
        this.setState({
          users: [{
            _id: this.props.user._id,
            status: 'owner'
          }]
        });
      }
    }
    shouldComponentUpdate() {
      return true;
    }
    getProjectData = () => {
        const projectId = this.props.match.params.id;
        this.props.getOneProject(projectId, res => {
            this.setState(res);
        });
    }

    handleClick = (e) => {
      // stop dropdown from closing
      e.stopPropagation();

      return this.setState({
        active: !this.state.active
      })
    }

    onInputChange = (name, value) => {
      const newValue = {};
      if (name === 'img' || name === 'stack') {
        newValue[name] = value.split(',');
      } else {
        newValue[name] = value;
      }
      this.setState(...this.state, newValue);
    }
    onFormSubmit = (e) => {
      e.preventDefault();
      this.props.handleSubmit(this.state);
      this.props.history.push('/');
    }
    onFormReset = () => {
      if (this.props.match.params.id) {
        this.getProjectData();
      } else {
        this.setState({
          title: "",
          categories: [],
          description: "",
          stack: "",
          status: "",
          repoUrl: "",
          img: [],
          users: [],
          active: false,
        });
      }
    }

    setActive = (item, e) => {
      // prevent dropdown from closing
      e.stopPropagation();

      console.log(item, 'this is item');
      let { categories } = this.state;
      const index = categories.indexOf(item.title);

      categories = index === -1 ? [...categories, item.title]
        : [...categories.slice(0, index), ...categories.slice(index +1)]

      return this.setState({
        categories
      });
    }

    removeTag = (name) => {
      let { categories } = this.state;
      const index = categories.indexOf(name);

      categories = index === -1 ? [...categories, name]
        : [...categories.slice(0, index), ...categories.slice(index +1)]

      return this.setState({
        categories
      });
    }

    removeFocus = () => {
      this.setState({
        active: false,
      })
    }

    render() {
      if (!this.props.user) {
          return <h3>ERROR: Not logged in. Redirecting...</h3>;
      } else {
        let inputFields = [
          {
            label: 'Project Title',
            name: 'title',
            placeholder: 'e.g. the Ninja project',
            value: this.state.title,
            required: true
          },
          {
            label: 'Categories',
            name: 'categories',
            type: 'text',
            placeholder: 'e.g. Social, Games, Productivity, etc.',
            value: this.state.categories
          },
          {
            label: 'Description',
            tag: 'textarea',
            name: 'description',
            placeholder: 'e.g. This is the coolest project ever',
            value: this.state.description,
            required: true
          },
          {
            label: 'Project Status',
            tag: 'textarea',
            name: 'status',
            placeholder: 'e.g. Explain what is the current state of the project, why you need help and what roles you might need',
            value: this.state.status,
            required: true
          },
          {
            label: 'Stack',
            name: 'stack',
            type: 'text',
            placeholder: 'Languages, frameworks, libraries... separate by comma',
            value: this.state.stack
          },
          {
            label: 'Code Repository',
            name: 'repoUrl',
            placeholder: 'http://github.com/username/github-repo',
            value: this.state.repoUrl,
            required: true
          },
          {
            label: 'Screenshots URL',
            name: 'img',
            placeholder: 'e.g. http://via.placeholder.com/400x300',
            value: this.state.img
          }
        ];
        return (
          <div className="container" onClick={this.removeFocus}>
            <div className="row">
              <div className="col">
                <div className="material-card">
                <h1>{(this.props.match.params.id) ? 'Edit a Project' : 'Create New Project'}</h1>
                  <form onSubmit={this.onFormSubmit}>
                    <fieldset>
                      {inputFields.map(item => {
                        if (item.name === 'categories') {
                          return (
                                <div>
                                    <label className="control-label">Categories</label>
                                    <Categories removeTag={this.removeTag} categories={this.state.categories} setActive={this.setActive} handleClick={this.handleClick} active={this.state.active} />
                                </div>
                          )      
                        }   

                        return <Input onChange={this.onInputChange} data={item}/>;
                      })}
                      <div className='d-flex justify-content-around btn-section'>
                        <input type='submit' className='btn' value='Submit' />
                        <input type='reset' className='btn' value='Reset' onClick={this.onFormReset} />
                      </div>
                    </fieldset>
                  </form>
                </div>
              <Button label="Back to home" />
            </div>
          </div>
        </div>
        );
    
      }
    }
}

export default ProjectEdit;
