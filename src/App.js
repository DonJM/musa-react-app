import './App.css';
import React from 'react';
import CamDetector from './detect.js';

class LandingPage extends React.Component {
  render(){
    return (
      <div className="jumbotron-fluid">
        <div className="jumbotron-fluid"  style={{backgroundColor:"#113a11 "}}>
          <div className="container p-0">
            <div class="d-flex flex-column bd-highlight text-light p-2 my-5" id="hero">
              <div class="p-2 bd-highlight mx-auto">
                <img src="logo.png" alt="" id="logo" className="img img-fluid" style={{maxWidth:"250px"}}/>
              </div>
              <div class="p-2 bd-highlight align-self-center fs-4 fw-bold mx-3" style={{fontStyle:"italic"}}>Musa Acuminata</div>
              <button className="w-25 mx-auto btn btn-outline-light my-3" id="start">Start</button>
            </div>
          </div>
        </div>
        <div className="jumbotron-fluid" id="content" style={{display:"none"}}>
          <div className="container p-0"  >
              <div class="d-flex flex-row bd-highlight text-light py-2" >
                <div class="position-relative bg-dark my-0 w-100 py-3" style={{height:"520px"}}>
                  <CamDetector />
                  <div class="position-absolute top-50 start-50 translate-middle">
                    <button className="btn btn-sm rounded" id="play">
                      <i class="far fa-play-circle fs-2 text-light"></i>
                    </button>
                  </div>
                  <div class="position-absolute bottom-0 translate-middle" style={{left:"90%"}}>
                    <button className="btn btn-sm " id="fullscreen">
                      <i class="far fas fa-expand fs-3 text-light"></i>
                    </button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>  
    );
  }
}

export default LandingPage;
