import React, { Component } from 'react';
// import axios from 'axios';
// import '../stylesheets/components/ProjectInfo.css';
import '../stylesheets/main.css'; // for dev
import Button from './Button.js';

export default (props) => {

  const currentProject = props.projects.filter((project) => {
    return project._id === props.match.params.id
  });

  const stackList = currentProject[0].stack.map((item) =>
    <li>{item}</li>
  );

  return (
     <div className="container">
     <div className="row ">
       <div className="col">
         <div className="material-card">
           <div className="project-meta row">
            <p className="project-category col">{currentProject[0].category}</p>
            <p className="project-owner col text-md-right">{currentProject[0].owner}</p>
            <hr/>
          </div>
           <h1>{currentProject[0].title}</h1>
           <p>{currentProject[0].description}</p>
           <div className="row">
           <div className="project-attachments col-md-6">
            <h2>Attachments</h2>
            <img src="currentProject[0].img" className="img-fluid" alt="Project image"/>
            </div>
            <div className="project-tech col-md-4">
            <h3>Github repo</h3>
            <a href="{currentProject[0].repoUrl}">{currentProject[0].repoUrl}</a>
            <h3>Stack</h3>
            <ul>{stackList}</ul>      

            </div>
            </div>     
         </div>
         <Button label="All projects" />

       </div>
     </div>
   </div>
  );
}
