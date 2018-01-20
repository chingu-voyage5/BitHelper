import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import '../stylesheets/components/Header.css'; 
import '../stylesheets/main.css'; // for dev
import Button from './Button.js';

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
      document.addEventListener("mousedown", (e) => {this.handleClick(e)});
    }
    handleClick = (e) => {
      switch (e.target.id) {
        case "add-project":
          this.setState({
            dropdown: false
          });
          this.props.history.push('/addProject');
          break;
        /*case "avatar":
          this.setState({
            dropdown: !this.state.dropdown
          });
          break;*/
        case "profile":
          this.setState({
            dropdown: false
          });
          this.props.history.push('/user/view/' + this.props.user._id);
          break;
        case "logout":
          this.setState({
            dropdown: false
          });
          this.props.logoutUser();
          break;
        case "brand":
          this.props.history.push('/');
        default:
          this.setState({
            dropdown: false
          });
      }
    }
    render () {
      //console.log('Nav', this.props);
      return (
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" onClick={this.handleClick}>BitHelper</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
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
      );
    }
}

export default withRouter(Nav);

// navbar-toggler" data-toggle="collapse