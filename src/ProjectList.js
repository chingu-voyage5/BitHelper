import React, { Component } from 'react';
import axios from 'axios';
import './style.css';


class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    loadProjects = () => {
        axios.get(this.props.url)
          .then(res => {
            this.setState({ data: res.data });
          });
    }
    componentDidMount() {
        this.loadProjects();
    }
    handleClick = (e) => {
        console.log(e.target.id);
        this.props.onCardClick(e.target.id);
    }
    render() {
        return (
            <div>
                <h1>Projects List</h1>
                <div className='project-list-wrapper'>
                    {this.state.data.map((item,i) => 
                        <div className='project-card' 
                            onClick={this.handleClick} 
                            key={i}
                            id={item._id}>{item.title}
                        </div>)}
                </div>
            </div>
        );
    }
}

export default ProjectList;
