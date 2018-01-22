import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../stylesheets/main.css'; // for dev
import Button from './Button.js';

class Header extends Component{
  render(){
    
    return(
      <div>
      {(!this.props.user) ?
        (
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <div className="header text-center">
    
                <h1 className="header-heading display-3">Build more. Together.</h1>
                <p className="header-lead lead">Discover interesting projects. Find new team mates. Finish your projects faster.</p>
                <Button label="Find projects" onClick={this.props.toggleHeader} redirect="/project/view/"/>
    
              </div>
            </div>
          </div>
        ) : (
          null
        )
      }
      </div>

    )
  }
}

export default withRouter(Header);