import React, { Component } from 'react';
import '../../stylesheets/main.css'; 
import heart from "../images/heart.svg"

const Footer = (props) => {
  return(
    <footer className="bg-dark text-center d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col">
            <p> Developed with <img className="heart-icon" src={heart} alt="heart" /> by 
              <a href="https://github.com/shibatas/"> Shibatas</a>, 
              <a href="https://github.com/marckimbrey"> MarcKimbrey</a> and 
              <a href="https://github.com/alexgherardelli"> AlexGherardelli</a> </p>
          </div>
          <div className="col">
            <p>A Chingu project</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
