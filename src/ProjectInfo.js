import React, { Component } from 'react';
import axios from 'axios';
import './style.css';

class ProjectInfo extends Component {
    constructor(props) {
        super(props);

      this.props.data = props.projects.filter((project) => {
        return project._id === props.match.params.id
      });

    }
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <h1>Project Detail</h1>
                <div className='project-info-card'>{JSON.stringify(this.props.data)}
                </div>
                <button id='backToList' onClick={() => this.props.history.push('/')}>Back to Main</button>
            </div>
        );
    }
}

export default ProjectInfo;
