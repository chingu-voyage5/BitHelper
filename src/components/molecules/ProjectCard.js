/*----------------------
    PROJECT CARD COMPONENT:
    shows little card with basic project info
------------------------*/

import React, { Component } from 'react';
import FaStar from "react-icons/lib/fa/star";
import Dotdotdot from 'react-dotdotdot';
import Button from '../atoms/Button';

const ProjectCard = ({user, project, onClick, onFollow}) => (
    <div className="col-md-3 card"
        onClick={onClick}
        key={project._id}
        id={project._id}>
        {/* Follow button shows only if user is logged in and not the owner */}
        {(user && project.owner !== user._id) ? (
                <FaStar 
                    className={user.followedProjects.includes(project._id) 
                            ? "follow-icon active-icon" 
                            : "follow-icon"} 
                    size={32} 
                    color={user.followedProjects.includes(project._id)
                            ? "#B7140E"
                            : "#9E9E9E"} 
                    onClick={onFollow}
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

export default ProjectCard;
