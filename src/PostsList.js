import React, { Component } from 'react';
import axios from 'axios';
import style from './style';

class PostsList extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    loadPosts = () => {
        axios.get(this.props.url)
          .then(res => {
            this.setState({ data: res.data });
          });1
    }
    componentDidMount() {
        this.loadPosts();
    }
    render() {
        console.log(this.state.data);
        return (
            <div>
                <h1 style={style.title} >Posts List</h1>
                <div>
                    <p>Posts by Title:</p>
                    {this.state.data.map((item,i) => <li key={i}>{item.title}</li>)}
                </div>
            </div>
        );
    }
}

export default PostsList;