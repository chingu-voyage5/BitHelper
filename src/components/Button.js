import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import '../stylesheets/components/Header.css'; 
import '../stylesheets/main.css'; // for dev

class Button extends Component {
  constructor(props){
    super(props);
  }
  handleClick = (e) => {
    let redirect = this.props.redirect ? this.props.redirect : '/';
    this.props.hisotry.push(redirect);
    
    //switch (e.target.innerText) {
        //case "Add a Project":
          //this.props.history.push('/addProject');
          //break;
        //default:
          //this.props.history.push('/');
      //}  
    //}
  }
  render(){
    return(
      <button className="btn" onClick={this.handleClick}>{this.props.label}</button>
    )
  }
}

export default withRouter(Button);