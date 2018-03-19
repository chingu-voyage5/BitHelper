import React, { Component } from "react";
import axios from "axios";

import ProjectCard from './ProjectCard.js';

const dashboardStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
}

class Dashboard extends Component {

    render() {
        let { projects } = this.props;
        const { followedProjects } = this.props.user;

        projects = projects.filter( (e)=> {
            return followedProjects.includes(e._id);
        });

        return (
            <div>
                <h2 style={{"textAlign": 'center'}}>
                    Dashboard
                </h2>
                <div style={dashboardStyle}>
                    <ProjectCard limit={this.props.limit} updateProjects={this.props.updateProjects} projects={projects} user={this.props.user} />
                </div>
            </div>
        )
    }
}

export default Dashboard;