import React, { Component } from 'react';
import './style.css';

class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillReceiveProps(nextProps) {
        console.log('will receive props', nextProps);
        this.setState(nextProps.user);
    }
    handleChange = (e) => {
        let obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }
    handlePost = (e) => {
        e.preventDefault();
        let skillset = this.state.skillset.split(',');
        let user = {};
        user._id = this.state._id;
        user.username = this.state.username;
        user.displayName = this.state.displayName;
        user.avatar = this.state.avatar;
        user.skillset = skillset;
        user.email = this.state.email;
        this.props.onUserPost(user);
        this.props.history.push('/user/'+user._id);
    }
    render() {
        return (
            <div>
                <h1>Edit User Profile</h1>
                <div className='user-info-card'>
                    <form onSubmit={this.handlePost}>
                        User Name: <input type='text' name='username' value={this.state.username} onChange={this.handleChange}/><br/>
                        Display Name: <input type='text' name='displayName' value={this.state.displayName} onChange={this.handleChange}/><br/>
                        Email: <input type='text' name='email' value={this.state.email} onChange={this.handleChange}/><br/>
                        Avatar URL: <input type='text' name='avatar' value={this.state.avatar} onChange={this.handleChange}/><br/>
                        Skillset: <input type='text' name='skillset' value={this.state.skillset} onChange={this.handleChange}/><br/>
                        <input type='submit' value='Submit'/>
                    </form>
                
                
                </div>
                <button id='backToList' onClick={() => this.props.history.push('/')}>Back to Main</button>
            </div>
        );
    }
}

export default UserEdit;
