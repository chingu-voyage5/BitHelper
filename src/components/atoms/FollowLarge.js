import React, { Component } from 'react';
import Button from './Button';

class FollowLarge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            follow: this.props.follow
        }
    }
    handleClick = (e) => {
        console.log('e Follow Large', e);
        this.setState({
            follow: !this.state.follow
        });
        this.props.onFollow(e);
    }
    render() {
        const color = this.state.follow
            ? "#B7140E"
            : "#9E9E9E";
        const style = {
            backgroundColor: color,
            borderColor: color
        };
        return (
            <Button 
                style={style}
                label={this.state.follow ? 'Unfollow' : 'Follow'}
                onClick={this.handleClick}
            />
        );
    }
}

export default FollowLarge;