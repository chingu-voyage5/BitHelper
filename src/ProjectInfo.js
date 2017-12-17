import React, { Component } from 'react';
import axios from 'axios';
import './style.css';

class ProjectInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentWillMount() {
        console.log('will mount');
        this.loadProjectInfo();
    }
    loadProjectInfo = () => {
        console.log('load project info', this.props.url)
        axios.get(this.props.url)
        .then(res => {
          this.setState({ data: res.data });
        });
    }
    handleClick = (e) => {
        e.preventDefault();
        if (e.target.id === 'backToList') {
            this.props.backToMain();
        }
    }
    render() {
        return (
            <div>
                <h1>Project Detail</h1>
                <div className='project-info-card'>{JSON.stringify(this.state.data)}
                </div>
                <button id='backToList' onClick={this.handleClick}>Back to Main</button>
            </div>
        );
    }
}

export default ProjectInfo;
