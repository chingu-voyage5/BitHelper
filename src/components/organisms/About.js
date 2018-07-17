/*----------------------
    ABOUT COMPONENT:
    shows information about BitHelper rationale
------------------------*/


import React, { Component } from 'react';
import Button from '../atoms/Button.js';
import target from "../../images/target.svg";
import startup from "../../images/startup.svg";


class About extends Component{
  render(){
    
    return(
      <div>
      {(!this.props.user) ?
        (
        <section className="about   ">
          <div className="features d-flex flex-column justify-content-center">
            <div className="container py-0">
              <div className="row">
                <div className="col-md-6 text-center py-3">
                   <img className="about-icon" src={startup} alt=""/>
                    <h2 className="white-text mt-0">Discover projects</h2>
                    <p className="white-text mb-0">Join exciting new projects, collaborate with other devs and finetune your dev skills!</p>

                </div>
                <div className="col-md-6 text-center py-3">
                    <img className="about-icon" src={target} alt=""/>
                    <h2 className="white-text mt-0">Find team mates</h2>
                    <p className="white-text mb-0">Need a little bit of help with your app? You've come to the right place! Find new teammates and finish your projects fast</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row join">
            <div className="col-md-12 text-center my-5">
                <h2 className="display-4 white-text mt-0">Start your journey</h2>
                <p className="white-text">Build more projects, faster and together</p>
                <a href="/auth/github"><Button label="Join" /></a>
            </div>
          </div>
        </section>
        ) : (
          null
        )
      }
      </div>

    )
  }
}

export default About