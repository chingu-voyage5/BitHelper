/*----------------------
    PROJECT CARD COMPONENT:
    shows little card with basic project info
------------------------*/

import React, { Component } from 'react';
import FaStar from "react-icons/lib/fa/star";
import Dotdotdot from 'react-dotdotdot';
import Button from '../atoms/Button';

import projectStatus from '../../js/projectStatus';

const ProjectCard = ({user, project, onClick, onFollow}) => (
    <div className="col-md-3 card"
        key={project._id}
        id={project._id}>
        {/* Follow button shows only if user is logged in and not the owner */}
        {(user && projectStatus.getOwner(project) !== user._id) ? (
                <FollowSmall 
                    follow={projectStatus.getFollowers(project).includes(user._id)} 
                    onFollow={onFollow} 
                />
            ) : (
                null
            )
        }
        <div className="card-body">
            <p className="card-category">{project.category}</p>
            <h4 className="card-title">{project.title}</h4>
                <Dotdotdot clamp={4}>
                <p className="card-text">
                    {project.description}</p>
                </Dotdotdot>
            <Button label="More" />
        </div>
    </div>  
);

class FollowSmall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            follow: this.props.follow
        }
    }
    handleClick = (e) => {
        this.setState({
            follow: !this.state.follow
        });
        this.props.onFollow();
    }
    render() {
        console.log('follow', this.state.follow);
        return (
            <FaStar 
                className={this.state.follow
                        ? "follow-icon active-icon" 
                        : "follow-icon"} 
                size={32} 
                color={this.state.follow
                        ? "#B7140E"
                        : "#9E9E9E"} 
                onClick={this.handleClick}
            />
        );
    }
}

export default ProjectCard;
