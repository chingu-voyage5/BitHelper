import React, { Component } from 'react';
// import '../stylesheets/components/UserEdit.css';
import '../stylesheets/main.css'; // for dev

class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.user;
    }
    componentDidMount() {
        // if user is not logged in and therefore user info is null, redirect to home
        // redirect to login page in the future
        if (!this.state) {
            setTimeout(() => {
                this.props.history.push('/');
            }, 3000);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // React isn't catching the changes to state somehow... 
        // for now I am forcing update with each change.
        return true;
    }
    handleChange = (e) => {
        let obj = {};
        if (e.target.name === 'skillset') {
            let arr = e.target.value.split(',');
            obj[e.target.name] = arr;
        } else {
            obj[e.target.name] = e.target.value;            
        }
        this.setState(obj);
    }
    handlePost = (e) => {
        e.preventDefault();
        let user = {};
        user._id = this.state._id;
        user.username = this.state.username;
        user.displayName = this.state.displayName;
        user.avatar = this.state.avatar;
        user.skillset = this.state.skillset;
        user.email = this.state.email;
        this.props.onUserPost(user);
        this.props.history.push('/user/'+user._id);
    }
    render() {
        if (!this.state) {
            return <h3>ERROR: No user data. Redirecting...</h3>;
        } else {
            let skillset = 'Enter data, separating values by commas.';
            if (typeof this.state.skillset === 'object') {
                skillset = this.state.skillset.toString();
            }
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className='user-edit' >
                                <h1>Edit User Profile</h1>
                                <form>
                                    <table>
                                        <tr>
                                            <td className='table-col-1'>User Name: </td>
                                            <td className='table-col-2'>
                                                <input type='text' name='username' value={this.state.username} onChange={this.handleChange}/><br/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='table-col-1'>Display Name: </td>
                                            <td className='table-col-2'>
                                                <input type='text' name='displayName' value={this.state.displayName} onChange={this.handleChange}/><br/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='table-col-1'>Email: </td>
                                            <td className='table-col-2'>
                                                <input type='text' name='email' value={this.state.email} onChange={this.handleChange}/><br/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='table-col-1'>Avatar URL: </td>
                                            <td className='table-col-2'>
                                                <input type='text' name='avatar' value={this.state.avatar} onChange={this.handleChange}/><br/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='table-col-1'>Skillset: </td>
                                            <td className='table-col-2'>
                                                <input type='text' name='skillset' value={skillset} onChange={this.handleChange}/><br/>            
                                            </td>
                                        </tr>
                                    </table>
                                </form>
                                <div className="btn-row">
                                    <button className='btn btn-primary' onClick={this.handlePost}>Submit</button>
                                    <button className='btn btn-primary' onClick={() => this.props.history.push('/user/'+this.state._id)}>Cancel</button>
                                </div>
                            </div>
                            <button className='btn btn-primary' onClick={() => this.props.history.push('/')}>Back to Home</button>
                        </div>
                    </div>
                </div>
            );
        }
        
    }
}

export default UserEdit;
