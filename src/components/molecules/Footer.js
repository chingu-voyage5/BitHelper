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
          <div className="col-md mb-3 mb-md-4 footer-developers">
            <p className="my-0">
              Developed with <FaHeart /> by
              <a href="https://github.com/shibatas/"> Shibatas</a>,
              <a href="https://github.com/marckimbrey"> MarcKimbrey</a> and
              <a href="https://github.com/alexgherardelli"> AlexGherardelli</a>
            </p>
          </div>
          <div className="col-md mb-3 mb-md-4">
            <div className="footer-copyrights">
              <a href="https://github.com/chingu-voyage3/bears-20">
                <GoMarkGithub className="github-logo" />
              </a>
              <p className="my-0"> A Chingu project. © Copyright {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>;
}

export default Footer;
