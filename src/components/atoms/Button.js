/*----------------------
    BUTTON COMPONENT:
    button that redirects somewhere when clicked
------------------------*/

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Button extends Component {
  handleClick = (e) => {
    if (this.props.onClick) {
      console.log('button click', this.props.label);
      this.props.onClick(e);
    }
    if (this.props.redirect) {
      this.props.history.push(this.props.redirect);
    }
  }
  render(){
    const style = this.props.style || null;

    console.log("Button style: ", style);
    return(
      <button className="btn" style={style} onClick={this.handleClick}>{this.props.label}</button>
    )
  }
}

export default withRouter(Button);