import React, { Component } from 'react';
import axios from 'axios';
import './style.css';


class ProjectList extends Component {
    constructor(props) {
        super(props);
        console.log('projects props', this.props)
        this.projects = props.projects
    }
    componentDidMount() {

    }

    setProjects() {

      if (this.props.projects.length > 0) {
        return this.props.projects.map((item,i) => {
            return (
              <div className='project-card'
                onClick={() => this.props.history.push('/project/' + item._id)}
                key={i}
                id={item._id}>{item.title}
              </div>)
        })

      } else {
        return <div>loading...</div>
      }
    }
    render() {

         return (
            <div>
                <h1>Projects List</h1>
                <div className='project-list-wrapper'>
                    {this.setProjects()}
                </div>
            </div>
        );
    }
}

export default ProjectList;
