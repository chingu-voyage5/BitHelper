import React, { Component } from 'react';
// import axios from 'axios';
// import './style.css';

export default (props) => {


  const currentProject = props.projects.filter((project) => {
    return project._id === props.match.params.id
  });

    const stack = currentProject[0].stack;
    console.log(stack);
    const stackList = stack.map((item) =>
  <li>{item}</li>
);
  console.log(stackList);


  return (
     <div className="container">
     <div className="row">
       <div className="col">
         <div className="project-info">
           <div className="meta">
            <p>{currentProject[0].category}</p>
            <p>{currentProject[0].owner}</p>
            <hr/>
          </div>
           <h1>{currentProject[0].title}</h1>
           <p>{currentProject[0].description}</p>
            <h2>Attachments</h2>
            <img src="currentProject[0].img" alt="Project image"/>
            <h3>Github repo</h3>
            <a href="{currentProject[0].repoUrl}">{currentProject[0].repoUrl}</a>
            <h3>Stack</h3>
            <ul>{stackList}</ul>           
         </div>
         <button className="btn btn-primary" id='backToList' onClick={() => props.history.push('/')}>All projects</button>

       </div>
     </div>
   </div>
  );
}
