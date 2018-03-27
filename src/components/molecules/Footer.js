/*----------------------
    FOOTER COMPONENT:
    shows footer
------------------------*/

import React from 'react';
import heart from "../../images/heart.svg"
import github from "../../images/github-logo.svg"

const Footer = () => {
  return(
    <footer className="bg-dark text-center d-flex align-items-center">
      <div className="container">
        <div className="row footer-row">
          <div className="col footer-developers">
            <p> Developed with <img className="heart-icon" src={heart} alt="heart" /> by 
              <a href="https://github.com/shibatas/"> Shibatas</a>, 
              <a href="https://github.com/marckimbrey"> MarcKimbrey</a> and 
              <a href="https://github.com/alexgherardelli"> AlexGherardelli</a> </p>
          </div>
          <div className="col">
            <div className="footer-copyrights">
            <a href="https://github.com/chingu-voyage3/bears-20">
              <img className="github-logo" src={github} alt="BitHelper GitHub repository"/>
            </a>
            <p>  A Chingu project. © Copyright {(new Date()).getFullYear()}</p>
            
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
