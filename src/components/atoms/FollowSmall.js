/*----------------------
    PROJECT CARD COMPONENT:
    shows little card with basic project info
------------------------*/

import React, { Component } from 'react';

class FollowSmall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            follow: this.props.follow
        }
    }
    handleClick = (e) => {
        this.setState({
            follow: !this.state.follow
        });
        this.props.onFollow();
    }
    render() {
        return (
            <FaStar 
                className={this.state.follow
                        ? "follow-icon active-icon" 
                        : "follow-icon"} 
                size={32} 
                color={this.state.follow
                        ? "#B7140E"
                        : "#9E9E9E"} 
                onClick={this.handleClick}
            />
        );
    }
}

export default FollowSmall;
