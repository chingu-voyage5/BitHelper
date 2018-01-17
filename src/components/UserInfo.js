import React, { Component } from 'react';
import axios from 'axios';
// import '../stylesheets/components/UserInfo.css';
import '../stylesheets/main.css'; // for dev
import Button from './Button.js';


class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = null;
    }
    componentDidMount() {
        // Get user ID from URL path, and retrieve user data from server
        const userId = window.location.pathname.replace('/user/view/','');
        axios.get('/api/users/'+userId)
        .then(res => {
            this.setState(res.data);
        })
    }
    renderInfo = () => {
        if (this.state) {
            return (
                <div className='user-info'>
                    <div className='user-info-meta row'>
                        <p>User Profile</p>
                    </div>
                    <h1>{this.state.displayName}</h1>
                    <div className='row'>
                        <div className='col'>
                            <table>
                                <tr>
                                    <td>Username:</td>
                                    <td>{this.state.username}</td>
                                </tr>
                                <tr>
                                    <td>email:</td>
                                    <td>{this.state.email}</td>
                                </tr>
                                <tr>
                                    <td>skillset:</td>
                                    <td>{this.state.skillset.map(item => {
                                        return <tr>{item}</tr>;
                                    })}</td>
                                </tr>
                            </table>
                        </div>
                        <div className='col'>
                            <p>My Projects</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-around'>
                        {this.renderBtn()}
                    </div>
                </div>
            );
        }
        else {
            return <p>loading...</p>;
        }
        
    }
    renderBtn = () => {
        if (this.props.user && this.props.user._id === this.state._id) {
            return <Button label='Edit Profile' redirect='/user/edit/' />;
        }
    }
    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        {this.renderInfo()}
                        <Button label='Back to main' />
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfo;
