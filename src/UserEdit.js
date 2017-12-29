import React, { Component } from 'react';
import './style.css';

class UserEdit extends Component {
    constructor(props) {
        super(props);
    }
    handlePost = (e) => {
        e.preventDefault();
        let skillset = this.refs.skillset.value.split(',');
        let user = {};
        user._id = this.props.match.params.id;
        user.username = this.refs.username.value;
        user.displayName = this.refs.displayName.value;
        user.avatar = this.refs.avatar.value;
        user.skillset = skillset;
        user.email = this.refs.email.value;
        this.props.onUserPost(user);
    }
    render() {
        return (
            <div>
                <h1>Edit User Profile</h1>
                <div className='user-info-card'>
                    <form onSubmit={this.handlePost}>
                        User Name: <input type='text' name='username' ref='username'/><br/>
                        Display Name: <input type='text' name='displayName' ref='displayName'/><br/>
                        Email: <input type='text' name='email' ref='email'/><br/>
                        Avatar URL: <input type='text' name='avatar' ref='avatar'/><br/>
                        Skillset: <input type='text' name='skillset' ref='skillset'/><br/>
                        <input type='submit' value='Submit'/>
                    </form>
                
                
                </div>
                <button id='backToList' onClick={() => this.props.history.push('/')}>Back to Main</button>
            </div>
        );
    }
}

export default UserEdit;
