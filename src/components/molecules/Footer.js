/*----------------------
    FOOTER COMPONENT:
    shows footer
------------------------*/

import React from 'react';
import FaHeart from "react-icons/lib/fa/heart";
import GoMarkGithub from "react-icons/lib/go/mark-github";

const Footer = () => {
  return <footer className="bg-dark text-center d-flex align-items-center">
      <div className="container">
        <div className="row mt-3 mt-md-4 footer-row">
          <div className="col-md col-lg-8 mb-3 mb-md-4 d-flex justify-content-center justify-content-md-start align-items-center">
            <p className="my-0 text-md-left">
              <span>Developed with <FaHeart /> by </span>
              <a href="https://github.com/shibatas/">Shibatas</a><span>, </span>
              <a href="https://github.com/marckimbrey">MarcKimbrey</a><span>, </span>
              <a href="https://github.com/heyjp">HeyJP</a><span>, </span>
              <a href="https://github.com/sfiquet">SFiquet</a><span> and </span> 
              <a href="https://github.com/alexgherardelli">AlexGherardelli</a>
            </p>
          </div>
          <div className="col-md col-lg-4 mb-3 mb-md-4 d-flex justify-content-center justify-content-md-end align-items-center">
            <a className="github-link" href="https://github.com/chingu-voyage3/bears-20" aria-label="GitHub Repository">
              <GoMarkGithub className="github-logo" />
            </a>
            <p className="my-0 ml-3">
              A Chingu project. <span className="d-inline-block">© {new Date().getFullYear()}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>;
}

export default Footer;
