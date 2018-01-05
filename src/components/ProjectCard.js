import React, { Component } from 'react';
import axios from 'axios';
import '../stylesheets/components/ProjectCard.css';

class ProjectCard extends Component {
    constructor(props) {
        super(props);
  
        this.projects = props.projects
    }

    setProjects() {

      if (this.props.projects.length > 0) {
        return this.props.projects.map((item,i) => {
            return (
            <div className="col-md card"
                onClick={() => this.props.history.push('/project/' + item._id)}
                key={i}
                id={item._id}>
                <div class="card-body">
                <p className="card-category">{item.category}</p>
                <h4 className="card-title">{item.title}</h4>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button className="btn btn-primary">More</button>
                </div>
              </div>)
        })

      } else {
        return <div>loading...</div>
      }
    }
    render() {

         return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                <h1 className="text-center">Projects</h1>
                </div>
                    {this.setProjects()}
                </div>
            </div>
        );
    }
}

export default ProjectCard;
