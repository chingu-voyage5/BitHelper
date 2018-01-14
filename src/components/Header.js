import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/components/Header.css';

// import './style.css';

class Header extends Component {
    constructor(props) {
        super(props)

    }
    handleClick = (e) => {
      switch (e.target.id) {
        case "add-project":
          this.props.history.push('/addProject');
          break;
        default:
          this.props.history.push('/');
      }
    }
    render () {
      console.log('Header', this.props);
      return (
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" onClick={this.handleClick}>Bears-20 App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse d-flex justify-content-end navbar-collapse">
                <Auth className="nav-link" user={this.props.user} logoutUser={this.props.logoutUser}/>
            </div>
          </nav>         

      );
    }
  }

  const Auth = (props) =>  {
    console.log('Auth', props);
    if (props.user) {
      return (
                  <ul className="nav">
                  <li class="nav-item nav-link"> 
                  <button className="btn" id="add-project" onClick={this.handleClick}>Add a Project</button>

                  </li>
                  <li class="nav-item nav-link">
                  <p> Welcome <a href={'/user/'+props.user._id} > {props.user.displayName}</a>
             |<a onClick={props.logoutUser} href="">Log Out</a> </p>
                  </li>
                  </ul>
      );
    } else {
      return (

        <ul className="nav justify-content-end">
        <li class="nav-item nav-link"> 
        <a href="/auth/github"><button className="btn">Login</button></a>
        </li>
          </ul>
      )
      
      
      
      
    }
  }

  export default withRouter(Header);