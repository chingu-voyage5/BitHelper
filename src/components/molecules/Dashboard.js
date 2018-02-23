import React, { Component } from "react";
import axios from "axios";

import ProjectCard from './ProjectCard.js';

class Dashboard extends Component {

    render() {
        let { projects } = this.props;
        const { followedProjects } = this.props.user;

        projects = projects.filter( (e)=> {
            return followedProjects.includes(e._id);
        });

        console.log(projects, followedProjects, 'this is props on dashbaord');
        return (
            <div>
                <ProjectCard limit={this.props.limit} updateProjects={this.props.updateProjects} projects={projects} user={this.props.user} />
            </div>
        )
    }
}

export default Dashboard;