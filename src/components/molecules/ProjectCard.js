/*----------------------
    PROJECT CARD COMPONENT:
    shows little card with basic project info
------------------------*/

import React, { Component } from 'react';
import '../../stylesheets/main.css'; // for dev
import Dotdotdot from 'react-dotdotdot';
import Button from '../atoms/Button';
import Loader from "../atoms/Loader";
import Input from "../atoms/Input";
import SearchBox from '../molecules/SearchBox';


class ProjectCard extends Component {
    // for filtering projects to show, by filter state
    filterProjects = (projects, filters) => {
        // if no filter is set, display all projects

        if (!filters || filters.length < 1) {
            return projects;
        } else {
            let match = false;
            
            filters.forEach(filter => {
                let regex = new RegExp('\\b' + filter + '\\b', 'i');
                projects = projects.filter(project => {
                    let text = project.stack.join(' ')
                        .concat(' ' + project.title)
                        .concat(' ' + project.category);
                    return regex.test(text);
                });
            })
            return projects;   
        }
    }
    setProjects() {
        if (this.props.projects.length > 0) {
            const filters = (this.props.filters) ? (this.props.filters.filter(item => {
                return item.length > 1;
            })) : (null);
            const projects = (Boolean(this.props.limit)) ? (
                    this.props.projects
                ) : (
                    this.filterProjects(this.props.projects, filters)
                );
            return projects.map((item,i) => {
                if (!this.props.limit || i < this.props.limit) {
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
                } else {
                    return null;
                }
            });
        } else {
        return <Loader />
        }
    }
    handleTagsUpdate = (filterArray) => {
        this.props.onFilterUpdate(filterArray);
    }
    render() {
        const partial = Boolean(this.props.limit);
        return (
            <div className={(partial) ? 
                ("container") : 
                ("container project-cards-full")}
            >
                {(!partial) ? (
                    <SearchBox projects={this.props.projects} filters={this.props.filters} onTagsUpdate={this.handleTagsUpdate}/>
                ) : (
                    null
                )}
                <div className="row justify-content-center">
                    {this.setProjects()}
                </div>
                <div className="text-center">
                    {(partial) ? 
                        (<Button label="All projects" redirect="/project/view/"/>) :
                        (<Button label="Back to main" redirect="/" />)
                    }
                </div>
            </div>
        );
    }
}

export default ProjectCard;
