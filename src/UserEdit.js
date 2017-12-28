import React, { Component } from 'react';
import './style.css';

class UserEdit extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Edit User Profile</h1>
                <div className='user-info-card'>{JSON.stringify(this.props.user)}
                </div>
                <button id='backToList' onClick={() => this.props.history.push('/')}>Back to Main</button>
            </div>
        );
    }
}

export default UserEdit;
