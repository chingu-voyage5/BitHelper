import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import '../stylesheets/components/Header.css'; 
import '../stylesheets/main.css'; // for dev
import Button from './Button.js';
import logo from "../images/logo.svg"

class Nav extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dropdown: false,
        items: [
          'Profile',
          'Logout'
        ]
      }
    }
    componentDidMount() {
      //document.addEventListener("mousedown", (e) => {this.handleClick(e)});
    }
    handleClick = (e) => {
      console.log('handleClick', e.target.id);
      switch (e.target.id) {
        case "add-project":
          this.props.history.push('/project/add/');
          break;
        case "profile":
          this.props.history.push('/user/view/' + this.props.user._id);
          break;
        case "logout":
          this.props.history.push('/');
          this.props.logoutUser();
          break;
        case "navbar-brand":
          this.props.history.push('/');
        default:
      }
    }
    render () {
      //console.log('Nav', this.props);
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
                        width='40px' 
                        height='40px'
                      />
                      <ul className="dropdown-menu dropdown-menu-right">
                        {this.state.items.map(item => {
                          return (
                            <li key={item} className="nav-dropdown-item" id={item.toLowerCase()}>
                              <span id={item.toLowerCase()}>{item}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                    ) : (
                    <li><a href="/auth/github"><button className="btn">Login</button></a></li>
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
                    <li className="nav-dropdown-item" onClick={this.handleClick}><a href="/auth/github">Login</a></li>
                  </ul>
                )
              }
          </div>
        </div>
      );
    }
}

export default withRouter(Nav);

// navbar-toggler" data-toggle="collapse