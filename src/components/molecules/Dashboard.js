import React, { Component } from "react";
import axios from "axios";

import ProjectList from '../organisms/ProjectList';

import projectStatus from '../../js/projectStatus';

class Dashboard extends Component {

    render() {
        /*let { projects } = this.props;
        const { followedProjects } = this.props.user;
        projects = projects.filter( (e)=> {
            return followedProjects.includes(e._id);
        });*/
        if (this.props.projects && this.props.user) {
            let projects = projectStatus.userProjects(this.props.projects, this.props.user).filter(item => {
                return item.status === 'following';
            });

            return (
                <div>
                    <h2 className="text-center">
                        Dashboard
                    </h2>
                    <div className="dashboard">
                        <ProjectList limit={this.props.limit} updateProjects={this.props.updateProjects} projects={projects} user={this.props.user} />
                    </div>
                </div>
            )
        } else {
            return <h1>Loading...</h1>
        }
    }
}

export default Dashboard;