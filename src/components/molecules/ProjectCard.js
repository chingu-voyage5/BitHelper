/*----------------------
    PROJECT CARD COMPONENT:
    shows little card with basic project info
------------------------*/

import React, { Component } from 'react';
import Dotdotdot from 'react-dotdotdot';
import Button from '../atoms/Button';
import Loader from "../atoms/Loader";
import SearchBox from '../molecules/SearchBox';


class ProjectCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          filters: [],
          limit: (this.props.match.path === '/') ? (6) : (null)
        };
    }
    // for filtering projects to show, by filter state
    filterProjects = (projects, filters) => {
        if (projects.length < 1) { return null }
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
    handleFilterUpdate = (filterArray) => {
        this.setState({
          filters: filterArray
        });
    }
    render() {
        const partial = Boolean(this.state.limit);
        let projects = this.filterProjects(this.props.projects, this.state.filters);
        if (projects) {
            return (
                <div className={partial ? "container" : "container project-cards-full"}
                >
                    {(!partial) ? (
                        <SearchBox projects={this.props.projects} filters={this.state.filters} onTagsUpdate={this.handleFilterUpdate}/>
                    ) : (
                        null
                    )}
                    <div className="row justify-content-center">
                        {projects.map((project, i) => {
                            if (!partial || i < this.state.limit) {
                                return (
                                    <Card 
                                        key={project._id}
                                        project={project}
                                        onClick={() => this.props.history.push('/project/view/' + project._id)}
                                    />
                                );
                            } else {
                                null
                            }
                        })}
                    </div>
                    <div className="text-center">
                        {(partial) ? 
                            (<Button label="All projects" redirect="/project/view/"/>) :
                            (<Button label="Back to main" redirect="/" />)
                        }
                    </div>
                </div>
            );
        } else {
            return <Loader />
        }
        
    }
}

const Card = ({project, onClick}) => (
    <div className="col-md-3 card"
        onClick={onClick}
        key={project._id}
        id={project._id}>
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
