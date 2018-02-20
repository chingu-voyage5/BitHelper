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


class ProjectCard extends Component {
    // for filtering projects to show, by filter state
    // currently just looks for filter terms in project stack
    filter = (project, filters) => {
        // if no filter is set, display all projects

        if (!filters || filters.length < 1) {
            return true;
        } else {
            let match = false;
            let text = project.stack.join(' ')
                .concat(' ' + project.title)
                .concat(' ' + project.category)
                .concat(' ' + project.description);
            filters.forEach(filter => {
                let regex = new RegExp('\\b' + filter + '\\b', 'i');
                if (regex.test(text)) {
                    match = true;
                }
            })
            return match;   
        }
    }
    setProjects() {
        if (this.props.projects.length > 0) {
            const filters = (this.props.filters) ? (this.props.filters.filter(item => {
                return item.length > 1;
            })) : (null);
            const projects = this.props.projects.filter(project => {
                return this.filter(project, filters);
            });
            return projects.map((item,i) => {
                console.log('limit', this.props.limit);
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
    onInputChange = (name, val) => {
        this.props.onFilterInput(val);
    }
    render() {
        console.log('projects', this.props.projects, this.props.filters);
        const partial = Boolean(this.props.limit);
        return (
            <div className={(partial) ? 
                ("container") : 
                ("container project-cards-full")}
            >
                {(!partial) ? (
                    <div>
                        <Input onChange={this.onInputChange} data={{
                            placeholder: 'Enter search word, separated by commas...',
                            value: this.props.filters
                        }}/>
                    </div>
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
