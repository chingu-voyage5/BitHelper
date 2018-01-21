import React, { Component } from 'react';
// import '../stylesheets/components/ProjectCard.css';
import '../stylesheets/main.css'; // for dev
import Dotdotdot from 'react-dotdotdot';
import Button from './Button.js';
import Loader from "./Loader.js";



class ProjectCard extends Component {
    setProjects() {
      if (this.props.projects.length > 0) {
        return this.props.projects.map((item,i) => {
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
              </div>)
        })

      } else {
        return <Loader />
      }
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    {/* <div className="col-12">
                <h1 className="text-center">Projects</h1>
                </div> */}
                    {this.setProjects()}
                </div>
            </div>
        );
    }
}

export default ProjectCard;
