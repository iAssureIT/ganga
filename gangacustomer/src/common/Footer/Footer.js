import React, { Component } from 'react';
// import { render } from 'react-dom';

// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import './Footer.css';

export default class Footer extends Component {


  render(){
       return(
        <div className="container">
            <div className="footer col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div className="footer-middle">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 logo-nb"> 
                            <a href="/" title="">
                                <img src="/images/logo1.png" alt="" />
                            </a>
                        </div>
                        <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6"> 
                            <div className="footer-middle-contact">
                                <strong>CONTACTS</strong><br/><br/>
                                <div className="col-lg-3 icondiv">
                                    <i className="fa fa-map-marker"></i>
                                </div>
                                <div className="col-lg-9 addressDetails">  
                                <a>PO Box CT16122 Collins Street<br /> West,  Victoria 8007, Australia.</a>
                                </div>
                            </div>
                        </div> 

                        <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6">
                        <br/><br/> 
                            <div className="col-lg-3 icondiv">
                                <i className="fa fa-phone"></i>
                            </div>
                            <div className="col-lg-9 addressDetails">  
                            <a>Phone: +1 (2) 345 6789<br /> Fax: +1 (2) 345 6789</a>
                            </div>
                        </div> 

                        <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6">
                        <br/><br/> 
                            <div className="col-lg-3 icondiv">
                                <i className="fa fa-envelope"></i>
                            </div>
                            <div className="col-lg-9 addressDetails">  
                            <a>contact@yourdomain.com<br /> Support@yourdomain.com</a>
                            </div>
                        </div>

                        <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6">
                        <strong>FOLLOW US</strong><br/><br/> 
                            <div className="col-lg-12 socialMedia">  
                                <ul>
                                    <li><a className="circle spin" href="https://www.facebook.com/"> <i className="fa fa-facebook-f icon-facebook"></i></a></li>
                                    <li><a className="circle spin" href="https://twitter.com/"> <i className="fa fa-twitter icon-twitter icon-twitter"></i> </a></li>
                                    <li><a className="circle spin" href="https://plus.google.com/"> <i className="fa fa-google-plus icon-gplus"></i></a></li>
                                    <li className="ic-pinterest"><a className="circle spin" href="https://www.pinterest.com/"> <i className="fa fa-pinterest-square icon-pinterest"></i></a></li>
                                    <li><a className="circle spin" href="http://www.linkercreative.com/"> <i className="fa fa-linkedin icon-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div> 
                    </div>
                </div>
                <br />
                <br />
                <div className="categoryDiv row">
                    <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 NoPadding">
                            <strong>MOBILES & TABLETS</strong><br/><br/> 
                        </div>
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 NoPadding">
                            <p>
                                Nokia, Samsung, Sony, Blackberry, Asus, HTC, Oppo, Lenovo, Alcatel, iPhone 4s, iPhone 5s, iPhone 6, Apple iPhone 6s, iPad, Samsung Tablet, Acer Tablet, Lenovo Tablet...
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 NoPadding">
                            <strong>TELEVISIONS</strong><br/><br/> 
                        </div>
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 NoPadding">
                            <p>
                                Sony TV, LG TV, Toshiba TV, Samsung TV, Panasonic TV, Sharp TV, LCD TV, Samsung LCD TV, LG LCD TV, Sharp LCD TV, LED TV, Sony LED TV, Samsung LED TV...
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 NoPadding">
                            <strong>HEALTH & BEAUTY</strong><br/><br/> 
                        </div>
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 NoPadding">
                            <p>
                                Bourjois, L'oreal, The Body Shop, Maybeline, Shiseido...
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 NoPadding">
                            <strong>AIR CONDITIONERS</strong><br/><br/> 
                        </div>
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 NoPadding">
                            <p>
                               Daikin, Electrolux, LG, Mitsubishi, Panasonic, Samsung, Sharp, Toshiba, Gree...
                            </p>
                        </div>
                    </div>
                </div>
                <br />
            </div>

        </div>    
        );
  } 

}