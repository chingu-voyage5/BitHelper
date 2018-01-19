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
        console.log('project info did mount');
        this.getProject();
    }
    getProject = () => {
        const projectId = this.props.match.params.id;
        console.log('getting project', projectId);
        this.props.getOneProject(projectId, project => {
            console.log('setting project', project);
            if (project) {
                this.setState({
                    project: project
                });            
                this.getOwner(project.owner);
            }
        });
    }
    getOwner = (ownerId) => {
        this.props.getOneUser(ownerId, profile => {
            
            let owner = (profile && profile.displayName) ? (profile) : (null);
            
            this.setState({
                owner: owner
            })
        });        
    }
    handleDelete = () => {
        this.props.deleteProject(this.state.project);
    }
    render() {
        const project = this.state.project;
        const owner = this.state.owner;
        const user = this.props.user;
        const isOwner = (user && owner && user._id === owner._id);
        
        if (!project) {
            return <h3>Loading...</h3>;
        }
        
        let buttons = null;
        if (isOwner) {
            buttons = (
                <div className='d-flex justify-content-around btn-section'>
                    <Button label='Edit' redirect={'/project/edit/'+project._id}/>
                    <Button label='Delete' onClick={this.handleDelete}/>
                </div>
            );
        } else {
            buttons = (
                <div className='d-flex justify-content-around btn-section'>
                    {(owner) ? (<Button label='View Owner Profile' redirect={'/user/view/'+owner._id} />) : (null)}
                    <Button label='Contact Project Owner' redirect={'/contact/'+project.owner+'/'+project._id} />
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
                            <div className="row justify-content-between">
                                <div className="project-tech col-md-8">
                                    <h3>Status</h3>
                                    <p>{project.status}</p>
                                </div>
                                <div className="project-tech col-md-4">
                                    <h3>Stack</h3>
                                    <ul>{project.stack.map((item) => {
                                        return <li key={item} >{item}</li>; })}
                                    </ul>      
                                    <h3>Github repo</h3>
                                    <a href={project.repoUrl}>{project.repoUrl}</a>
                                </div>
                                
                            </div>  
                            <div className="row d-flex justify-content-center">
                                {project.img.map(imgUrl => {
                                    return (
                                        <div>
                                            <img key={imgUrl} src={imgUrl} className="img-fluid screenshots" width='300px' alt="Project" />
                                        </div>
                                    );
                                })}
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
