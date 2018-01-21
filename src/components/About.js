import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../stylesheets/main.css'; 
import Button from './Button.js';
import target from "../images/target.svg";
import startup from "../images/startup.svg";


class About extends Component{
  render(){
    
    return(
      <div>
      {(!this.props.user) ?
        (
        <section className="about   ">
           <div className="row features">
               <div className="col-md-6 text-center">
                   <img className="about-icon" src={startup} alt=""/>
                    <h2 className="white-text mt-0">Discover projects</h2>
                    <p className="white-text">Join exciting new projects, collaborate with other devs and finetune your dev skills!</p>

               </div>
               <div className="col-md-6 text-center">
                    <img className="about-icon" src={target} alt=""/>
                    <h2 className="white-text mt-0">Find team mates</h2>
                    <p className="white-text">Need a little bit of help with your app? You've come to the right place! Find new team mates and finish your projects fast</p>
               </div>
            </div>
            <div className="row join">
                <div className="col-md-12 text-center">
                    <h2 className="display-4 white-text">Start your journey</h2>
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