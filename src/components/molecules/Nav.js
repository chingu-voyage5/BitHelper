/*----------------------
    NAV COMPONENT:
    if user is logged in, shows add project button and edit user options. 
    Otherwise, shows option to log in.
------------------------*/

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Modal from "react-modal";
import '../../stylesheets/main.css';  // for dev
import Button from '../atoms/Button';
import logo from "../../images/logo.svg"
import defaultAvatar from "../../images/default-avatar.png";

class Nav extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dropdown: false,
        items: [
          'Profile',
          'Logout'
        ],
        showModal: false
      }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

      handleOpenModal = () => {
    this.setState({ showModal: true });
  }
  
  handleCloseModal = () => {
    this.setState({ showModal: false });
  }
  

    handleClick = (e) => {
      console.log('handleclick', e.target.id);
      switch (e.target.id) {
        case "add-project":
          this.props.history.push('/project/add/');
          break;
        case "profile":
          this.props.history.push('/user/view/' + this.props.user._id);
          break;
        case "login":
          document.cookie="redirect=" + window.location.pathname;
          console.log('login clicked', window.location.pathname);
          window.location = '/auth/github/'
          break;  
        case "logout":
          this.props.history.push('/');
          this.props.logoutUser();
          break;
        case "navbar-brand":
          this.props.history.push('/');
          break;
        default:
      }
    }
    render () {
      console.log('Nav', this.props);
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a id="navbar-brand" className="navbar-brand" onClick={this.handleClick}> <img id="navbar-brand" className="logo" src={logo} alt="BitHelper" /></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between">
             <div>
                {(this.props.user) ?
                  (
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item"> 
                        <Button label="Add a Project" id="add-project" redirect='/project/add'/>
                      </li>
                    </ul>
                  ) : (
                    null
                  )
                }
              </div>
              <div>
                <ul className="nav navbar-nav">
                  {(this.props.user) ? (
                    <li className="dropdown">
                      <img 
                        id="avatar" 
                        className="nav-avatar-img dropdown-toggle" 
                        data-toggle="dropdown"
                        src={this.props.user.avatar}
                        onError={(e) => {
                          console.log('no avatar', e.target.src);
                          e.target.src = defaultAvatar;
                        }} 
                        width='40px' 
                        height='40px'
                      />
                      <ul className="dropdown-menu dropdown-menu-right">
                        {this.state.items.map(item => {
                          return (
                            <li key={item} className="nav-dropdown-item" id={item.toLowerCase()} onClick={this.handleClick}>
                              <span id={item.toLowerCase()}>{item}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                    ) : (
                    <li><button id="login" className="btn" onClick={this.handleOpenModal} >Login</button>

                    <Modal isOpen={this.state.showModal} contentLabel="Login modal" >
                      <button onClick={this.handleCloseModal}>Close Modal</button>
                    </Modal>

                    </li>
                    )
                  } 
                </ul>
              </div>
            </div>
          
          </nav>
          <div className="collapse" id="navbarSupportedContent">
              {(this.props.user) ?
                (
                  <ul className="navbar-nav mr-auto">
                    <li id="add-project" className="nav-dropdown-item" onClick={this.handleClick}>Add a Project</li>
                    <li id="profile" className="nav-dropdown-item" onClick={this.handleClick}>Profile</li>
                    <li id="logout" className="nav-dropdown-item" onClick={this.handleClick}>Logout</li>
                  </ul>
                ) : (
                  <ul className="navbar-nav mr-auto">
                    <li id="login" className="nav-dropdown-item" onClick={this.handleClick}>Login</li>
                  </ul>
                )
              }
          </div>
        </div>
      );
    }
}

export default withRouter(Nav);

