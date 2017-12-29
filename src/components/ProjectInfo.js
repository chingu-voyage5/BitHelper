import React, { Component } from 'react';
import axios from 'axios';
// import './style.css';

export default (props) => {


  const currentProject = props.projects.filter((project) => {
    return project._id === props.match.params.id
  });


  return (
      <div>
          <h1>Project Detail</h1>
          <div className='project-info-card'>{JSON.stringify(currentProject)}
          </div>
          <button id='backToList' onClick={() => props.history.push('/')}>Back to Main</button>
      </div>
  );
}
