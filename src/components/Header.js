import React, { Component } from 'react';
import axios from 'axios';
// import './style.css';

class Header extends Component {
    constructor(props) {
        super(props)

    }


    render () {
      return (
        <header>
          <div className='title'>Bears-20 App</div>
          <Auth user={this.props.user} logoutUser={this.props.logoutUser}/>
        </header>
      );
    }
  }

  const Auth = (props) =>  {

    if (props.user.displayName) {
      return (
          <div className='login'>
              <p>Welcome <span className='link' >{props.user.displayName}</span>
              <span> | </span><a onClick={props.logoutUser} href="">Log Out</a></p>
          </div>
      );
      } else {
      return <div className='login'><a href="/auth/github">Log In</a></div>;
    }

  }

  export default Header;
