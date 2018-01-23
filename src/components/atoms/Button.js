import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import '../stylesheets/components/Header.css'; 
import '../../stylesheets/main.css'; // for dev

class Button extends Component {
  constructor(props){
    super(props);
  }
  handleClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(this.props.label);
    }
    let redirect = this.props.redirect ? this.props.redirect : '/';
    this.props.history.push(redirect);
  }
  render(){
    return(
      <button className="btn" onClick={this.handleClick}>{this.props.label}</button>
    )
  }
}

export default withRouter(Button);