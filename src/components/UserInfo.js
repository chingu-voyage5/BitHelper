import React, { Component } from 'react';
// import '../stylesheets/components/UserInfo.css';
import '../stylesheets/main.css'; // for dev
import Button from './Button.js';


class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            projects: [],
            isOwner: false
        };
    }
    componentDidMount() {
        // Get user ID from URL path, and retrieve user data from server
        const userId = window.location.pathname.replace('/user/view/','');
        const loggedInUser = this.props.user;
        this.props.getOneUser(userId, res => {
            let isOwner = false;
            if (loggedInUser) {
                console.log('isOwner', loggedInUser._id, res._id);
                isOwner = (this.props.user._id === res._id);
            }
            this.setState({
                user: res,
                isOwner: isOwner
            });
            // get project title for each of user-owned projects
            this.getProjectsList(res.projects);
        })
    }
    getProjectsList(list) {
        let ownedProjects = this.props.projects.filter(item => {
            return list.includes(item._id)
        });
        console.log('projects owned', ownedProjects);
        this.setState({
            projects: ownedProjects
        });
    }
    handleClick = (e) => {
        this.props.history.push('/projects/view/' + e.target.id);
    }
    renderInfo = (user, projects) => {
        if (user) {
            return (
                <div className='user-info'>
                    <div className='user-info-meta row'>
                        <p>User Profile</p>
                    </div>
                    <h1>{user.displayName}</h1>
                    <div className='row'>
                        <div className='col'>
                            <table>
                                <tr>
                                    <td><h4>Username:</h4></td>
                                    <td>{user.username}</td>
                                </tr>
                                <tr>
                                    <td><h4>skillset:</h4></td>
                                    <td>{user.skillset.map(item => {
                                        return <tr>{item}</tr>;
                                    })}</td>
                                </tr>
                            </table>
                        </div>
                        <div className='col'>
                            <h4>My Projects</h4>
                            <ul>
                                {(projects.length > 0) ? (
                                    projects.map(item => {
                                        return (
                                            <li key={item}>
                                                <a id={item.id} onClick={this.handleClick}>
                                                    {item.title}
                                                </a>
                                            </li>
                                        ); 
                                    }) 
                                ) : (
                                    'No projects yet'
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className='d-flex justify-content-around btn-section'>
                        {this.renderBtn}
                    </div>
                </div>
            );
        }
        else {
            return <p>loading...</p>;
        }
        
    }
    renderBtn = () => {
        if (this.state.isOwner) {
            return <Button label='Edit Profile' redirect='/user/edit/' />;
        }
    }
    render() {
        let user = this.state.user;
        let projects = this.state.projects;
        console.log('Rendering UserInfo', this.state, this.props);
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        {this.renderInfo(user, projects)}
                        <Button label='Back to main' />
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfo;