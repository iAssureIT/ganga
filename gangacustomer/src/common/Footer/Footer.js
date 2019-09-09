import React, { Component } from 'react';
// import { render } from 'react-dom';

// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import './Footer.css';

export default class Footer extends Component {


  render(){
       return(
            <div className="footer col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div className="footer-middle">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12"> 
                            <a class="logo-nb" href="/" title="">
                                <img src="/images/logo1.png" alt="" />
                            </a>
                        </div>
                        <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6"> 
                            <div className="footer-middle-contact">
                                <strong>CONTACTS</strong><br />
                                <div className="col-lg-3">
                                    <i class="fa fa-map-marker"></i>
                                </div>
                                <div className="col-lg-9">  
                                <a>PO Box CT16122 Collins Street<br /> West,  Victoria 8007, Australia.</a>
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>    

            </div>
        );
  } 

}