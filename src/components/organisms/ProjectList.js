/*----------------------
    PROJECT List COMPONENT:
    shows list of ProjectCards containing brief info on eac project,
    as well as a search box in full list view.
------------------------*/

import React, { Component } from 'react';
import axios from 'axios';
import Button from '../atoms/Button';
import Loader from "../atoms/Loader";

import ProjectCard from '../molecules/ProjectCard';
import SearchBox from '../molecules/SearchBox';

class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          filters: [],
          limit: (this.props.match.path === '/' && !this.props.user) ? (6) : (null)
        };
    }
    // for filtering projects to show, by filter state
    filterProjects = (projects, filters) => {
        if (projects.length < 1) { return null }
        // if no filter is set, display all projects
        if (!filters || filters.length < 1) {
            return projects;
        } else {
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
    handleClick = (project_id, e) => {
        console.log(e, 'this is e');
        // Prevents link from activating router
        //e.stopPropagation();
        return axios.post(`/api/follow/${project_id}`)
            .then(res => {
                console.log('Follow response', res);
                this.props.updateProjects(project_id);
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
                                    <ProjectCard 
                                        key={project._id}
                                        user={this.props.user}
                                        project={project}
                                        onClick={() => this.props.history.push('/project/view/' + project._id)}
                                        onFollow={this.handleClick.bind(this, project._id)}
                                    />
                                );
                            } else {
                                return null
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

export default ProjectList;