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
        case "avatar":
          this.setState({
            dropdown: !this.state.dropdown
          });
          break;
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
            <a id="brand" className="navbar-brand nav-link">BitHelper</a>
            <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
              <div>
                {(this.props.user) ?
                  (
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item nav-link"> 
                        <Button label="Add a Project" id="add-project" redirect='/project/add'/>
                      </li>
                    </ul>
                  ) : (
                    null
                  )
                }
              </div>
              <div>
                {(this.props.user) ? (
                  <img 
                    id="avatar" 
                    className="nav-avatar-img" 
                    src={this.props.user.avatar} 
                    width='50px' 
                    height='50px'
                  />
                  ) : (
                  <a href="/auth/github"><button className="btn">Login</button></a>
                  )
                }
                {/*<Auth className="nav-link" user={this.props.user} logoutUser={this.props.logoutUser}/>*/}              
              </div>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={(this.state.dropdown) ? ("nav-dropdown active") : ("nav-dropdown")}>
              {this.state.items.map(item => {
                return (
                  <div key={item} className="nav-dropdown-item" id={item.toLowerCase()}>
                    <span id={item.toLowerCase()}>{item}</span>
                  </div>
                );
              })}
            </div>
          </nav>
      );
    }
}

export default withRouter(Nav);