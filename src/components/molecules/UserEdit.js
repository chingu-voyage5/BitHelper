/*----------------------
    USER EDIT COMPONENT:
    users can edit their own profiles from here.
------------------------*/


import React, { Component } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';


class UserEditNew extends Component {
    constructor(props) {
        super(props);
        if (this.props.user) {
            this.state = {
                username: this.props.user.username,
                displayName: this.props.user.displayName,
                avatar: this.props.user.avatar,
                skillset: this.props.user.skillset,
                email: this.props.user.email
            }    
        }
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
    handleChange = (name, value) => {
        let obj = {};
        if (name === 'skillset') {
            let arr = value.split(',');
            obj[name] = arr;
        } else {
            obj[name] = value;            
        }
        this.setState(obj);
    }
    handleReset = () => {
        this.setState({
            username: this.props.user.username,
            displayName: this.props.user.displayName,
            avatar: this.props.user.avatar,
            skillset: this.props.user.skillset,
            email: this.props.user.email
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onUserPost({
            _id: this.props.user._id, 
            username: this.state.username,
            displayName: this.state.displayName,
            avatar: this.state.avatar,
            skillset: this.state.skillset,
            email: this.state.email,
            projects: this.props.user.projects
        });
        this.props.history.push('/user/view/'+this.props.user._id);
    }
    render() {
        if (!this.state) {
            return <h3>ERROR: No user data. Redirecting...</h3>;
        } else {
            let skillset = 'Enter data, separating values by commas.';
            if (typeof this.state.skillset === 'object') {
                skillset = this.state.skillset.toString();
            }
            let inputFields = [
                {
                  label: 'Username',
                  name: 'username',
                  placeholder: '',
                  value: this.state.username,
                  required: true
                },
                {
                  label: 'Display Name',
                  name: 'displayName',
                  placeholder: '',
                  value: this.state.displayName,
                  required: true
                },
                {
                  label: 'Email',
                  name: 'email',
                  placeholder: 'Enter your email address',
                  value: this.state.email,
                  required: true
                },
                {
                  label: 'Skillset',
                  name: 'skillset',
                  value: skillset,
                  placeholder: 'Separate values by commas'
                },
                {
                  label: 'Avatar URL',
                  name: 'avatar',
                  placeholder: '',
                  value: this.state.avatar
                }
              ];
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className='material-card' >
                                <h1>Edit User Profile</h1>
                                <form onSubmit={this.handleSubmit}>
                                    <fieldset>
                                        {inputFields.map(item => {
                                            return <Input data={item} onChange={this.handleChange} />
                                        })}
                                        <div className='row d-flex justify-content-around btn-section'>
                                            <input type='submit' className='col btn' value='Submit' />
                                            <input type='reset' className='col btn' value='Reset' onClick={this.handleReset}/>
                                            <Button className='col' label='Cancel' redirect={'/user/view/'+this.props.user._id} />
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                            <Button label='Back to main'/>
                        </div>
                    </div>
                </div>
            );
        }
        
    }
}

export default UserEditNew;
