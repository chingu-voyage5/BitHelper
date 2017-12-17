import React, { Component } from 'react';
import axios from 'axios';
import './style.css';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {}
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
            });
    }
    render () {
        console.log('header state: ', this.state);
      return (
        <header>
          <div className='title'>Bears-20 App</div>
          <div className='login'>
            <a href="/auth/github">Log In with github</a>
            <button onClick={this.getUserInfo}>get auth</button>
          </div>
        </header>
      );
    }
  }

  export default Header;