/*----------------------
    NAV COMPONENT:
    if user is logged in, shows add project button and edit user options. 
    Otherwise, shows option to log in.
------------------------*/

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../atoms/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText }  from "reactstrap";
import logo from "../../images/logo.svg"
import defaultAvatar from "../../images/default-avatar.png";
import githubLogin from "../../images/github-login.svg";
import facebookLogin from "../../images/facebook-login.svg";
import googleLogin from "../../images/google-login.svg";


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      items: ["Profile", "Logout"],
      showModal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  handleClick = e => {
    console.log("handleclick: ", e.target.id);
    switch (e.target.id) {
      case "add-project":
        this.props.history.push("/project/add/");
        break;
      case "profile":
        this.props.history.push("/user/view/" + this.props.user._id);
        break;
      case "github-login":
        document.cookie = "redirect=" + window.location.pathname;
        console.log("login clicked", window.location.pathname);
        window.location = "/auth/github/";
        break;
      case "logout":
        this.props.history.push("/");
        this.props.logoutUser();
        break;
      case "navbar-brand":
        this.props.history.push("/");
        break;
      case "dashboard":
        this.props.history.push("/dashboard");
      default:
    }
  };
  render() {
    // console.log("Nav", this.props);
    return <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a id="navbar-brand" className="navbar-brand" onClick={this.handleClick}>
            {" "}
            <img id="navbar-brand" className="logo" src={logo} alt="BitHelper" />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-between">
            <div>
              {this.props.user ? <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Button label="Add a Project" id="add-project" redirect="/project/add" />
                  </li>
                </ul> : null}
            </div>
            <div>
              <ul className="nav navbar-nav">
                {this.props.user ? <li className="dropdown">
                    <img id="avatar" className="nav-avatar-img dropdown-toggle" data-toggle="dropdown" src={this.props.user.avatar} onError={e => {
                        console.log("no avatar", e.target.src);
                        e.target.src = defaultAvatar;
                      }} width="40px" height="40px" />
                    <ul className="dropdown-menu dropdown-menu-right">
                      {this.state.items.map(item => {
                        return <li key={item} className="nav-dropdown-item" id={item.toLowerCase()} onClick={this.handleClick}>
                            <span id={item.toLowerCase()}>{item}</span>
                          </li>;
                      })}
                    </ul>
                  </li> : <li>
                    <button className="btn" onClick={this.toggleModal}>
                      {" "}
                      Login or Sign up
                    </button>

                    <Modal isOpen={this.state.showModal} toggle={this.toggleModal} className={this.props.className}>
                      <ModalHeader toggle={this.toggleModal}>
                        Login or sign up
                      </ModalHeader>
                      <ModalBody className="text-center">
                        <a href="auth/github">
                          <img src={githubLogin} className="social-login" alt="Sign in with GitHub" />
                        </a>
                        <a href="auth/google">
                          <img src={googleLogin} className="social-login" alt="Sign in with Google" />
                        </a>
                        <a href="auth/facebook">
                          <img src={facebookLogin} className="social-login" alt="Sign in with Facebook." />
                        </a>
                        <p>
                          <strong>or sign in with your email</strong>
                        </p>
                        <Form action="/auth/login" method="POST">
                          <FormGroup>
                            <Input type="email" name="email" className="local-login" id="email-login" placeholder="Email" />
                            <Input type="password" name="password" className="local-login" id="password-login" placeholder="Password" />
                            <button type="submit" className="btn">
                              Submit
                            </button>
                          </FormGroup>
                        </Form>
                        <p>
                          <strong>
                            You don't have an account? Sign up
                          </strong>
                        </p>
                        <Form action="/auth/register" method="POST">
                          <FormGroup>
                            <Input type="email" name="email" className="local-login" id="email-signup" placeholder="Email" />
                            <Input type="password" name="password" className="local-login" id="password-signup" placeholder="Password" />
                          </FormGroup>
                          <button type="submit" className="btn">
                            Submit
                          </button>
                        </Form>
                      </ModalBody>
                    </Modal>
                  </li>}
              </ul>
            </div>
          </div>
        </nav>
        <div className="collapse" id="navbarSupportedContent">
          {this.props.user ? <ul className="navbar-nav mr-auto">
              <li id="add-project" className="nav-dropdown-item" onClick={this.handleClick}>
                Add a Project
              </li>
              <li id="profile" className="nav-dropdown-item" onClick={this.handleClick}>
                Profile
              </li>
              <li id="dashboard" className="nav-dropdown-item" onClick={this.handleClick}>
                Dashboard
              </li>
              <li id="logout" className="nav-dropdown-item" onClick={this.handleClick}>
                Logout
              </li>
            </ul> : <ul className="navbar-nav mr-auto">
              <li id="login" className="nav-dropdown-item" onClick={this.handleClick}>
                Login
              </li>
            </ul>}
        </div>
      </div>;
  }
}

export default withRouter(Nav);

