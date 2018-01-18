import React, { Component } from 'react';
import axios from 'axios';
// import '../stylesheets/components/ProjectInfo.css';
import '../stylesheets/main.css'; // for dev
import Button from './Button.js';

class ProjectInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: null,
            owner: null
        }
    }
    componentDidMount() {
        const projectId = this.props.match.params.id;
        axios.get('/api/projects/'+projectId)
        .then(res => {
            console.log('project info', res.data);
            this.setState({
                project: res.data
            });
            this.getOwnerInfo(res.data.owner);
        });
    }
    getOwnerInfo = (ownerId) => {
        axios.get('/api/users/' + ownerId)
        .then(res => {
            console.log('owner info', res.data);
            this.setState({
                owner: res.data
            })
        })
        .catch(err => {
            console.error(err); 
        })
    }
    handleDelete = () => {
        this.props.deleteProject(this.state.project);
    }
    render() {
        let project = this.state.project;
        let owner = this.state.owner;
        let user = this.props.user;

        if (!project) {
            return <h3>Loading...</h3>;
        }
        
        let buttons = null;
        if (user && user._id === owner._id) {
            buttons = (
                <div className='d-flex justify-content-around'>
                    <Button label='Edit' redirect={'/project/edit/'+project._id}/>
                    <Button label='Delete' onClick={this.handleDelete}/>
                </div>
            );
        } else {
            buttons = (
                <div className='d-flex justify-content-around'>
                    <Button label='Contact Project Owner' />
                </div>
            );
        }
        
        return (
        <div className="container">
            <div className="row ">
                <div className="col">
                    <div className="material-card">
                        <div className="project-meta row">
                            <p className="project-category col">{project.category}</p>
                            <p className="project-owner col text-md-right">
                                {owner ? (owner.displayName) : ('No Owner Info')}</p>
                            <hr/>
                        </div>
                        <h1>{project.title}</h1>
                        <p>{project.description}</p>
                        <div className="row">
                            <div className="project-attachments col-md-6">
                                <h2>Attachments</h2>
                                <img src="currentProject[0].img" className="img-fluid" alt="Project image"/>
                            </div>
                            <div className="project-tech col-md-4">
                                <h3>Github repo</h3>
                                <a href={project.repoUrl}>{project.repoUrl}</a>
                                <h3>Stack</h3>
                                <ul>{project.stack.map((item) => {
                                    return <li>{item}</li>; })}
                                </ul>      
                            </div>
                        </div>  
                        {buttons}
                    </div>
                <Button label="Back to main" />
                </div>
            </div>
        </div>
        );        
    }

}

export default ProjectInfo;
