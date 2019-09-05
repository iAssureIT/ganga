import React, { Component } 		from 'react';
import EcommerceBreadcumb 			from "../../blocks/common/Breadcumb/EcommerceBreadcumb.js";
import EcommerceHeader 				from "../../blocks/common/EcommerceHeader/EcommerceHeader.js";

import EcommerceFooter    			from "../../blocks/common/EcommerceFooter/EcommerceFooter.js";
import 'bootstrap/js/collapse.js';


import "./ContactUS.css";

export default class ContactUs extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    	
	    };
  	}  
  	  


  render() {
		return (
				<div className="col-lg-10 col-lg-offset-1  col-md-12 col-sm-12 col-xs-12 backColorEF ">
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
						</div>*/}

						<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop180  ">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  mt20 imageOfBlog">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">

									<form className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite contactUsBody ">
											<div className="col-lg-11 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 LabelContactUs row">
												<label>CONTACT US</label>
											</div>
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin1Top10">
												<div className="row">
													<div className="col-lg-1 col-md-12 col-sm-12 col-xs-12 ">
														<label></label>
													</div>
													<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 textAlignRight contactUsSpan ">
														<div className="row">
														<span>Subject</span>&nbsp;
														</div>
													</div>
													<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 ">
					                        			<input type="text" className="customInput"  placeholder="Enter your name"/>
													</div>
												</div>
											</div>
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin1Top10 ">
												<div className="row">
													<div className="col-lg-1 col-md-12 col-sm-12 col-xs-12 ">
														<label></label>
													</div>
													<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 textAlignRight contactUsSpan ">
														<div className="row">
														<span>E-mail</span>&nbsp;
														</div>
													</div>
													<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 ">
					                        			<input type="text" className="customInput"  placeholder="Enter your email"/>
													</div>
												</div>
											</div>
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin1Top10 ">
												<div className="row">
													<div className="col-lg-1 col-md-12 col-sm-12 col-xs-12 ">
														<label></label>
													</div>
													<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 textAlignRight contactUsSpan ">
														<div className="row">
														<span>Attachment</span>&nbsp;
														</div>
													</div>
													<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 ">
					                        			<input type="file" className="customInput"/>
													</div>
												</div>
											</div>
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin1Top10 ">
												<div className="row">
													<div className="col-lg-1 col-md-12 col-sm-12 col-xs-12 ">
														<label></label>
													</div>
													<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 textAlignRight contactUsSpan ">
														<div className="row">
														<span>Comment</span>&nbsp;
														</div>
													</div>
													<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 ">
					                        			<textarea type="text" className="customInputArea" rows="7"  placeholder="How can we help ?"></textarea>
													</div>
												</div>
											</div>
											
											<div className="col-lg-6  col-lg-offset-5 col-md-12 col-sm-12 col-xs-12 margin1Top10 ">
												<button className="col-lg-2 col-md-12 col-sm-12 col-xs-12 submitBtnContactUs pull-right"> Send
												</button>
											</div>
										
									</form>
							</div>
							</div>
						</div>

					</div>
				</div>
		);
	}
}
