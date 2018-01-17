import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import '../stylesheets/components/Header.css'; 
import '../stylesheets/main.css'; // for dev

class Button extends Component {
  constructor(props){
    super(props);
  }
  handleClick = (e) => {
    console.log(typeof this.props.onClick, this.props.onClick);
    if (this.props.onClick) {
      console.log('onClick exists');
      this.props.onClick(this.props.label);
    }
    let redirect = this.props.redirect ? this.props.redirect : '/';
    console.log('redirect to', redirect);
    this.props.history.push(redirect);
    
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