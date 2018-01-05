import React, { Component } from 'react';
import axios from 'axios';
// import './style.css';

class UserInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>User Detail</h1>
                <div className='user-info-card'>{JSON.stringify(this.props.user)}
                </div>
                <button id='backToList' onClick={() => this.props.history.push('/')}>Back to Main</button>
            </div>
        );
    }
}

export default UserInfo;
