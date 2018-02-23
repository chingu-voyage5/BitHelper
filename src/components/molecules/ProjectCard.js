/*----------------------
    PROJECT CARD COMPONENT:
    shows little card with basic project info
------------------------*/

import React, { Component } from 'react';
import '../../stylesheets/main.css'; // for dev
import FaStar from "react-icons/lib/fa/star";
import Dotdotdot from 'react-dotdotdot';
import Button from '../atoms/Button';
import Loader from "../atoms/Loader";
import axios from 'axios';

const iconStyle = {
    position: 'absolute',
    right: '20px',
    top: '10px'
};

class ProjectCard extends Component {


    handleClick = (e, project_id) => {
        // Prevents link from activating router
        e.stopPropagation();
        console.log(this.props, 'this is props on handleclick');
        let self = this;
        
        axios.post(`/api/follow/${project_id}`)
            .then(res => {
                console.log(res, 'this is res');
                this.props.updateProjects(project_id);
            });
    }

    setProjects() {
    let iconColor = 'red';

    if (this.props.projects.length > 0) {
        const projects = this.props.projects.slice(0, this.props.limit);
        return projects.map((item,i) => {

            if (this.props.user) {
                // if user is loggedIn, check whether
                iconColor = this.props.user.followedProjects.includes(item._id)
                ? "aliceblue"
                : "red"
            }

            return (
            <div className="col-md-3 card"
                onClick={() => this.props.history.push('/project/view/' + item._id)}
                key={i}
                id={item._id}>
                {this.props.user && <FaStar className={iconColor} size={24} style={iconStyle} onClick={(e) => {this.handleClick(e, item._id)}} />}
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
        const partial = Boolean(this.props.limit);
        return <div className={partial ? "container" : "container project-cards-full"}>
            <div className="row justify-content-center">
              {this.setProjects()}
            </div>
            <div className="text-center">
              {partial ? (
                <Button
                  label="All projects"
                  redirect="/project/view/"
                />
              ) : (
                <Button label="Back to main" redirect="/" />
              )}
            </div>
          </div>;
    }
}

export default ProjectCard;
