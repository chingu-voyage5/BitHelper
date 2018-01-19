import React, { Component } from 'react';
import axios from 'axios';
// import '../stylesheets/components/UserEdit.css';
import '../stylesheets/main.css'; // for dev
import Button from './Button';
import Input from './Input';

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: null,
            project: null,
            subject: '',
            body: ''
        }    
    }
    componentDidMount() {
        this.setProject();
    }
    shouldComponentUpdate() {
        return true;
    }
    setProject = () => {
        const projectId = this.props.match.params.projectId;
        console.log('setProject', projectId, this.props);
        this.props.getOneProject(projectId, project => {
            console.log('project found', project);
            if (project) {
                this.setState({
                    project: project,
                    subject: 'RE: ' + project.title
                });
                this.setContact(project.owner);
            } else {
                console.log('setProject could not find project');
                this.props.history.push('/');
            }
        })
    }
    setContact = (contactId) => {
        this.props.getOneUser(contactId, contact => {
            if (contact) {
                this.setState({
                    contact: contact
                })
            } else {
                console.log('setContact could not find contact');
                this.props.history.push('/');
            }
        })
    }
    handleChange = (name, value) => {
        let obj = {};
        obj[name] = value;            
        this.setState(obj);
    }
    handleReset = () => {
        this.setState({
            subject: '',
            body: ''
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.user) {
            console.log('user not logged in');
            alert('Please login first!');
            this.props.history.push('/');
        } else {
            console.log('state',this.state);
            const url = 'https://formspree.io/' + this.props.user.email;
            const body = {
                name: this.props.user.username,
                _replyto: this.props.user.email,
                subject: this.state.subject,
                message: this.state.body
            };
            console.log('message ready to be sent', url, body);
            axios.post(url, body)
            .then(res => {
                console.log('message submitted', res);
                alert('Message successfully sent!');
            })
            .catch(err => { if (err) throw err; });
        }
    }
    render() {
        const contact = this.state.contact;
        const project = this.state.project;
        
        if (contact && project) {
            const inputFields = [
                {
                  label: 'Subject',
                  name: 'subject',
                  placeholder: 'Enter your subject here',
                  value: this.state.subject,
                  required: true
                },
                {
                  tag: 'textarea',
                  label: 'Message',
                  name: 'body',
                  placeholder: 'Enter your message here',
                  value: this.state.body,
                  required: true
                }
              ];
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className='material-card' >
                                <h1>Contact Form</h1>
                                <p>You want to know more about the project <b>{project.title}</b>? Great!</p>
                                <p>Fill out the form below to get in touch with <b>{contact.displayName}</b></p>
                                <form onSubmit={this.handleSubmit}>
                                    <fieldset>
                                        {inputFields.map(item => {
                                            return <Input key={item.name} data={item} onChange={this.handleChange} />
                                        })}
                                        <div className='d-flex justify-content-around'>
                                            <input type='submit' className='btn' value='Submit' />
                                            <input type='reset' className='btn' value='Reset' onClick={this.handleReset}/>
                                            <Button label='Cancel' redirect={'/'} />
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                            <Button label='Back to main'/>
                        </div>
                    </div>
                </div>
            );            
        } else {
            return <h3>Loading...</h3>
        }
        
    }
}

export default ContactForm;
