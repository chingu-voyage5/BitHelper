import React, { Component } from 'react';
import axios from 'axios';
import './style.css';

class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    loadProjects = () => {
        axios.get(this.props.url)
          .then(res => {
            this.setState({ data: res.data });
          });1
    }
    componentDidMount() {
        this.loadProjects();
    }
    render() {
        console.log(this.state.data);
        return (
            <div>
                <h1>Projects List</h1>
                <div>
                    <p>Projects by Title:</p>
                    {this.state.data.map((item,i) => <li key={i}>{item.title}</li>)}
                </div>
            </div>
        );
    }
}

export default ProjectList;