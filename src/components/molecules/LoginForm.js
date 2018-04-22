import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Input }  from "reactstrap";
import axios from 'axios';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            passwordConfirm: null,
            message: null
        }
    }
    onInputChange = (e) => {
        const newValue = {};
        newValue.message = null;
        newValue[e.target.name] = e.target.value;
        this.setState(newValue);
    }
    onSubmit =(e) => {
        e.preventDefault();
        console.log('submit');
        if (!this.state.email) {
            this.setState({
                message: "Please enter an email address!"
            });
        } else if (this.state.password !== this.state.passwordConfirm) {
            this.setState({
                password: null,
                passwordConfirm: null,
                message: "Password fields do not match. Please try again!"
            })
        } else if (this.state.password.length < 9) {
            this.setState({
                password: null,
                passwordConfirm: null,
                message: "Password must be longer than 8 characters"
            })
        } else {
            console.log('submitting form to ', this.props.url);
            const data = {
                email: this.state.email,
                password: this.state.password
            }
            axios.post(this.props.url, data)
            .then(res => {
                console.log('Success', res);
                window.location = res.request.responseURL;
            })
            .catch(err => {
                console.log("Login error", err);
                this.setState({
                    email: null,
                    password: null,
                    passwordConfirm: null,
                    message: "Error"
                })
            });
            this.setState({
                message: null
            })
        }
    }
    render() {
        return (
            <Form>
                {(this.state.message) ? (
                    <div>
                        {this.state.message}
                    </div>
                ) : (null)}
                <FormGroup>
                    <Input 
                        type="email" 
                        name="email" 
                        className="local-login" 
                        id="email-login" 
                        placeholder="Email" 
                        required={true}
                        value={this.state.email}
                        onChange={this.onInputChange}
                    />
                    <Input 
                        type="password" 
                        name="password" 
                        className="local-login" 
                        id="password-login" 
                        placeholder="Password"
                        required={true}
                        value={this.state.password}
                        onChange={this.onInputChange} 
                    />
                    <Input 
                        type="password" 
                        name="passwordConfirm" 
                        className="local-login" 
                        id="password-login-confirm" 
                        placeholder="Retype password" 
                        required={true}
                        value={this.state.passwordConfirm}
                        onChange={this.onInputChange}
                    />
                    <button type="submit" className="btn" onClick={this.onSubmit}>
                        Submit
                    </button>
                </FormGroup>
            </Form>
        )
    }
}

export default LoginForm;