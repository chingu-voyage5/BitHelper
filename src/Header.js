import React, { Component } from 'react';
import axios from 'axios';
import './style.css';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            isLoggedIn: false
        }
    }
    componentWillMount() {
        console.log('component will mount header');
        // this.getUserInfo();
    }
    // getUserInfo = () => {
    //     console.log('get user info', this.props.authUrl);
    //     axios.get(this.props.authUrl)
    //     .then(res => {
    //         console.log('header api response:', res.data);
    //         if (res.data._id) {
    //             this.setState({
    //                 user: res.data,
    //                 isLoggedIn: true
    //             });
    //         } else {
    //             this.setState({
    //                 user: null,
    //                 isLoggedIn: false
    //             });
    //         }
    //     });
    // }
    render () {
      return (
        <header>
          <div className='title'>Bears-20 App</div>
          <Auth user={this.state.user}
            isLoggedIn={this.state.isLoggedIn}
            onNameClick={this.props.onNameClick}/>
        </header>
      );
    }
  }

  class Auth extends Component {
      handleClick =() => {
          console.log('click');
          this.props.onNameClick('5a3699922f244403bba5992e');
      }
      render() {
          if (this.props.isLoggedIn) {
            return (
                <div className='login'>
                    <p>Welcome <span className='link' onClick={this.handleClick}>{this.props.user.displayName}</span>
                    <span> | </span><a href="/auth/logout">Log Out</a></p>
                </div>
            );
            } else {
            return <div className='login'><a href="/auth/github">Log In</a></div>;
          }
      }
  }

  export default Header;
