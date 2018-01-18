import React, { Component } from 'react';
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
        this.getProject();
    }
    getProject = () => {
        const projectId = this.props.match.params.id;
        this.props.getOneProject(projectId, project => {
            console.log('got project', project);
            if (!project) { 
                this.props.history.push('/') 
                return;
            }
            this.setState({
                project: project
            });            
            this.getOwner(project.owner);
        });
    }
    getOwner = (ownerId) => {
        console.log('get owner', ownerId)
        this.props.getOneUser(ownerId, (profile) => {
            console.log('owner is', profile);
            let owner = (profile.displayName) ? (profile) : (null);
            
            this.setState({
                owner: owner
            })
        });        
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
        console.log('user and owner', user, owner);
        if (user && owner && user._id === owner._id) {
            buttons = (
                <div className='d-flex justify-content-around btn-section'>
                    <Button label='Edit' redirect={'/project/edit/'+project._id}/>
                    <Button label='Delete' onClick={this.handleDelete}/>
                </div>
            );
        } else {
            buttons = (
                <div className='d-flex justify-content-around btn-section'>
                    <Button label='Contact Project Owner' redirect={'/contact/'+project._id} />
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
                                {project.img.map(imgUrl => {
                                    return <img key={imgUrl} src={imgUrl} className="img-fluid" alt="Project" width='300px' />
                                })}
                            </div>
                            <div className="project-tech col-md-4">
                                <h3>Github repo</h3>
                                <a href={project.repoUrl}>{project.repoUrl}</a>
                                <h3>Stack</h3>
                                <ul>{project.stack.map((item) => {
                                    return <li key={item} >{item}</li>; })}
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
