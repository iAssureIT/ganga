import React, { Component } from 'react';
// import { render } from 'react-dom';

// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import './Footer.css';

export default class Footer extends Component {


  render(){
       return(
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite mt20">
                    <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 footerContainerEcommerce">
                            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12  footerLogo borderRight ">
                                <img src="/images/im1.png" /><br/>
                                <label className="">Shop at Ganga Express <br/>Patna, India.</label>
                            </div>
                            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 ">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColor333 borderBottom">
                                    
                                    <div className="row">
                                    <label className="col-lg-5">Subscribe to GangaExpress</label>
                                        <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12 inputContainer">
                                            <div className="row">
                                            <i className="fa fa-envelope"></i> &nbsp;<input type="text" className="customInputFooter" placeholder="Enter your Email"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12  footerContent">
                                <label className="onHover"><span>Get to know us</span></label><br/>
                                <ul className="productList">
                                    <a href="/about-us"><li className="onHover"><span>About Us</span></li></a>
                                    <a href="/contact-us"><li className="onHover"><span>Contact Us</span></li></a>
                                <a href="/allblogs"><li className="onHover"><span>Blogs</span></li></a>
                             </ul>                        
                            </div><div className="col-lg-2 col-md-12 col-sm-12 col-xs-12  footerContent">
                                <label className="onHover"><span>Connect with us</span></label><br/>
                                <ul className="productList">
                                    <a href="https://www.facebook.com"><li className="onHover"><span>Facebook</span></li></a>
                                    <a href="https://twitter.com/login?lang=en"><li className="onHover">Twitter</li></a>
                                    <a href="https://www.instagram.com/?hl=en"><li className="onHover"><span>Instagram</span></li></a>
                                    </ul>
                            
                            </div><div className="col-lg-2 col-md-12 col-sm-12 col-xs-12  footerContent">
                                <label className="onHover"><span>Policy</span></label><br/>
                                <ul className="productList">
                                    <a href="/ReturnPolicy"><li className="onHover">Return Policy</li></a>
                                    <a href="/termsandconditions"><li className="onHover">Terms Of Use</li></a>
                                    <a href="/PrivacyPolicy"><li className="onHover">Privacy Policy</li></a>
                                </ul>
                            
                            </div>
                        </div>  
                            
                            <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bottomFooterEcommerce ">
                                <div className="col-lg-5 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">
                                    All rights reserved by  <span className="">iAssureIT © 2019.</span>
                                </div>
                                <div className="col-lg-5 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">
                                    Design & Developed By iAssure International Technology PVT. LTD.
                                </div>
                            </div>
                    </div>
                </div>
        );
  } 

}