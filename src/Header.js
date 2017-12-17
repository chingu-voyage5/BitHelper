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
        this.getUserInfo();
    }
    getUserInfo = () => {
        console.log('get user info', this.props.authUrl);
        axios.get(this.props.authUrl)
        .then(res => {
            console.log('header api response:', res.data);
            if (res.data._id) {
                this.setState({
                    user: res.data,
                    isLoggedIn: true
                });
            } else {
                this.setState({
                    user: null,
                    isLoggedIn: false
                });
            }
        });
    }
    render () {
      return (
        <header>
          <div className='title'>Bears-20 App</div>
          <div className='login'>
            <Auth isLoggedIn={this.state.isLoggedIn} />
            <button onClick={this.getUserInfo}>get auth</button>
          </div>
        </header>
      );
    }
  }

  class Auth extends Component {
      render() {
          if (this.props.isLoggedIn) {
            return <a href="/auth/logout">Log Out</a>;
          } else {
            return <a href="/auth/github">Log In</a>;
          }
      }
  }

  export default Header;