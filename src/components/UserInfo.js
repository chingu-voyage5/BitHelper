import React, { Component } from 'react';
import axios from 'axios';
// import './style.css';
import '../stylesheets/components/UserInfo.css';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        console.log(window.location.pathname);
        this.state = {};
    }
    handleClick = (e) => {
        this.props.history.push('/edit/user/'+this.props.user._id);
    }
    renderInfo = () => {
        return <p>Test</p>;
    }
    renderBtn = () => {
        return <button className='btn btn-primary' onClick={this.handleClick}>Edit Profile</button>;
    }
    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='user-info'>
                            <div className='user-info-meta row'>
                                <p>User Profile</p>
                            </div>
                            <h1>User Detail</h1>
                            <div>{this.renderInfo()}</div>
                            <div className='btn-row'>{this.renderBtn()}</div>
                        </div>
                        <button className='btn btn-primary' onClick={() => this.props.history.push('/')}>Back to Main</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfo;
