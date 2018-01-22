import React, { Component } from 'react';
// import '../stylesheets/components/ProjectCard.css';
import '../stylesheets/main.css'; // for dev
import Dotdotdot from 'react-dotdotdot';
import Button from './Button.js';
import Loader from "./Loader.js";

class ProjectCard extends Component {
    setProjects(limit) {
    if (this.props.projects.length > 0) {
        const projects = this.props.projects.slice(0, limit);
        return projects.map((item,i) => {
            return (
            <div className="col-md-3 card"
                onClick={() => this.props.history.push('/project/view/' + item._id)}
                key={i}
                id={item._id}>
                <div className="card-body">
                    <p className="card-category">{item.category}</p>
                    <h4 className="card-title">{item.title}</h4>
                        <Dotdotdot clamp={4}>
                        <p className="card-text">
                            {item.description}</p>
                        </Dotdotdot>
                    <Button label="More" />
                </div>
            </div>
        );   
    })

      } else {
        return <Loader />
      }
    }
    render() {
        if (this.props.limit && !this.props.user) {
            // With limit prop, this is the project cards view on the landing page
            return (    
                <div className="container">
                    <div className="row justify-content-center">
                        {this.setProjects(this.props.limit)}
                    </div>
                </div>
            );
        } else {
            // With limit prop, this is the full list view
            return (
                <div className="container project-cards-full">
                    <div className="text-center"><h3>All Projects</h3></div>
                    <div className="row justify-content-center">
                        {this.setProjects()}
                    </div>
                </div>
            );
        }
    }
}

export default ProjectCard;
