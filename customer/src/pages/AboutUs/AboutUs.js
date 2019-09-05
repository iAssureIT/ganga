import React, { Component } 		from 'react';
import EcommerceBreadcumb 			from "../../blocks/common/Breadcumb/EcommerceBreadcumb.js";
import EcommerceHeader 				from "../../blocks/common/EcommerceHeader/EcommerceHeader.js";

import EcommerceFooter    			from "../../blocks/common/EcommerceFooter/EcommerceFooter.js";
import 'bootstrap/js/collapse.js';


import "./AboutUs.css";

export default class AboutUs extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    	
	    };
  	}  
  	  


  render() {
		return (
				<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 backColorEF ">
					<div className="row">
						{/*<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12  storeInfo">
							<div className="row">
								<div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 backColorWhite storeInfo ">
									<label className="onHover"><span>STORE INFORMATION</span></label><br/>
										<ul className="productList1">
											<li className="onHover"><i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;123 Sky Tower, West 21th Street, Suite, NY</li>
											<li className="onHover"><i className="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp;01923-456-789</li>
											<li className="onHover"><i className="fa fa-envelope" aria-hidden="true"></i>&nbsp;&nbsp;info@domain.com</li>
										</ul>
								</div>
							</div>
						</div>
						<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12  linkToOtherPage">
							<div className="row">
								<div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 backColorWhite linkToOtherPage ">
									<label className="onHover"><span><a href="/PrivacyPolicy">Privacy Policy</a></span></label><br/>
									<label className="onHover"><span><a href="/termsandcondition">Terms And Conditions</a> </span></label><br/>
									<label className="onHover"><span><a href="/about-us">About Us</a> </span></label><br/>
									<label className="onHover"><span><a href="/contact-us">Contact Us</a> </span></label><br/>

								</div>
								
							</div>
						</div>
*/}
						<div className=" col-lg-12  col-md-12 col-sm-12 col-xs-12 marginTop180 ">
							{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="row">
									<div className="col-lg-12 col-md-9 col-sm-9 col-xs-9 mt20 ">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorBread pull-right ">
											<span className="pull-right noStylea"><a href="#"> Home&nbsp;&nbsp;&nbsp;&nbsp; /&nbsp;&nbsp;&nbsp;&nbsp;</a><a href="#">About Us </a> </span>
											</div>
										</div>
									</div>
								</div>
							</div>*/}
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  mt20  ">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
										{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 LabelContactUs row">
											<label>ABOUT US</label>
										</div>*/}
									
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 aboutUsContainer backColorWhite ">
											<label className="aboutUsLabel">Welcome to Ganga Express</label>
											<h5 className="mt20">
											The GangaExpress promises an amazing shopping experiance of high quality products delivered at high speed.
											</h5>
											<p className="mt20">
											<h3>Customer satisfaction is the mantra at GangaExpress</h3>
											</p>

										<label className="mt20 whyUs ">Why Choose Us</label>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 parallexDiv ">
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
												<div className="col-lg-2 col-md-3 col-sm-3 col-xs-3 countDiv  ">
													<label className="nameLabel">Lastest Products</label>
												</div>
												<div className="col-lg-2 col-md-3 col-sm-3 col-xs-3 countDiv ">
													<label className="nameLabel">Hotest Discount</label>
												</div>
												<div className="col-lg-2 col-md-3 col-sm-3 col-xs-3 countDiv ">
													<label className="nameLabel">Fast Delivary</label>
												</div>
												<div className="col-lg-2 col-md-3 col-sm-3 col-xs-3 countDiv ">
													<label className="nameLabel">Quality Products</label>
												</div>
											</div>
										</div>
										</div>

										
										{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12   backColorWhite">
										<div className="row">
											<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 ourSkin ">
											<label className="mt20">FAQ</label>
												<div className="faqContainer mt20">
												  <h2>FULLY RESPONSIVE DESIGN</h2>
												 <p>Ut enim ad minim et ven veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex commodo consequat. Duis aute irure dolor in reprehenderit in voluptate. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
												</div>
												<div className="faqContainer mt20">
												  <h2>FULLY RESPONSIVE DESIGN</h2>
												 <p>Ut enim ad minim et ven veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex commodo consequat. Duis aute irure dolor in reprehenderit in voluptate. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
												</div>
											</div>
											<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 ourSkin">
											<label className="mt20">Our Skin</label>
												<div className="progressBar">
												  <h2>Reticulating splines…80%</h2>
												  <div className="progress">
												    <div className="progress-bar progressCustom" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
												    </div>
												  </div>
												</div><div className="progressBar">
												  <h2>Reticulating splines…80%</h2>
												  <div className="progress">
												    <div className="progress-bar progressCustom" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
												    </div>
												  </div>
												</div><div className="progressBar">
												  <h2>Reticulating splines…80%</h2>
												  <div className="progress">
												    <div className="progress-bar progressCustom" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
												    </div>
												  </div>
												</div>
											</div>
										</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pad20 backColorWhite">
											
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 whyUs textAlignCenter ">
											<label className="mt20 ">Why Choose Us</label>
												<div className="whyChoose">
												  <h2>Lastest Products</h2>
												  <h2>Hostest Discount</h2>
												  <h2>Fast Delivary</h2>
												  <h2>Quality Products</h2>
											</div>
										</div>
										</div>*/}
									</div>
							</div>
						</div>
					</div>
				</div>
		);
	}
}
