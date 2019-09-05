import React, { Component } from 'react';
import "./Header.css";

export default class Header extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
  	}  
  render() {
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 miniHeaderDesolved">
							<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 contactDetails">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="col-lg-4 col-md-5 col-sm-5 col-xs-5">
										<div className="row">
											<i className="fa fa-mobile fs18" aria-hidden="true"></i>&nbsp;&nbsp;
											<label className="contactLabal">Call Us Now: </label>&nbsp;
											<label className="greenColor"> 635-662-1372 </label>&nbsp;
										</div>
									</div>
									<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 borderLeft"> English </div>
									<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 borderLeft"> USD </div>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 contactDetails">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="col-lg-3 col-md-5 col-sm-6 col-xs-6">
										
									</div>
									<div className="col-lg-3 col-md-5 col-sm-6 col-xs-6 rightDivContainer pull-right">
										<div className="row">
											<i className="fa fa-user myAccoutText" aria-hidden="true"></i>&nbsp;&nbsp;
											<label className="myAccoutText">My Account </label>&nbsp;
											<img src="/images/search.png" />
										</div>
									</div>
									
								</div>
							</div>
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 constantHeader ">
							<div className="row">
								<div className="col-lg-3 col-md-2 col-sm-3 col-xs-3 ">
									<div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 logoImageContainer ">
										<img src="/images/logo.jpg" />
									</div>
								</div>
								<div className="col-lg-7 col-md-10 col-sm-12 col-xs-12 ">
									<div className="row">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 headerMenu ">
											<div className="row">
						                      <nav className="navbar  navText mt10 ">
						                          <ul className="nav navbar-nav ">
						                              <li className="active showActive"><a href="/">HOME</a></li>
						                             
						                              <li className="dropdown">
						                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">PRODUCTS&nbsp;<i className="fa fa-angle-down"></i></a>
						                                <ul className="dropdown-menu customDropdown col-lg-12">
						                                  <li className="col-lg-6 col-md-6 col-sm-12 col-xs-12"><a href="#" className="headLi">Fresh Vegetables</a>
						                                  		<ul className="dropdown-submenu noStyle">
								                                  <li><a href="#">Potato, Onion & Tomato</a></li>
								                                  <li><a href="#">Cucumber & Capsicum</a></li>
								                                  <li><a href="#">Root Vegetables</a></li>
								                                  <li><a href="#">Cabbage & Cauliflower</a></li>
								                                  <li><a href="#">Leafy Vegetables</a></li>
								                                  <li><a href="#">Beans, Brinjals & Okra</a></li>
								                                  <li><a href="#">Gourd, Pumpkin, Drumstick</a></li>
								                                  <li><a href="#">Lemon, Ginger & Garlic</a></li>
								                                </ul>
						                                  </li>
						                                   <li className="col-lg-6 col-md-6 col-sm-12 col-xs-12"><a href="#" className="headLi">Fresh Fruits</a>
						                                  		<ul className="dropdown-submenu noStyle">
								                                  <li><a href="#">Mangoes</a></li>
								                                  <li><a href="#">Banana, Sapota & Papaya</a></li>
								                                  <li><a href="#">Apples & Pomegranate</a></li>
								                                  <li><a href="#">Kiwi, Melon, Citrus Fruit</a></li>
								                                  <li><a href="#">Seasonal Fruits</a></li>
								                                  <li><a href="#">Fruit Baskets</a></li>
								                                  <li><a href="#">Cuts & Sprouts</a></li>
								                                  <li><a href="#">Cut Fruit, Tender Coconut</a></li>
								                                  <li><a href="#">Cut & Peeled Veggies</a></li>
								                                </ul>
						                                  </li>
						                                  <li className="col-lg-6 col-md-6 col-sm-12 col-xs-12"><a href="#" className="headLi">Fruits & Vegetables</a>
						                                  		<ul className="dropdown-submenu noStyle">
								                                  <li><a href="#">Fresh Vegetables</a></li>
								                                  <li><a href="#">Potato, Onion & Tomato</a></li>
								                                  <li><a href="#">Cucumber & Capsicum</a></li>
								                                  <li><a href="#">Root Vegetables</a></li>
								                                  <li><a href="#">Cabbage & Cauliflower</a></li>
								                                  <li><a href="#">Leafy Vegetables</a></li>
								                                  <li><a href="#">Beans, Brinjals & Okra</a></li>
								                                  <li><a href="#">Gourd, Pumpkin, Drumstick</a></li>
								                                  <li><a href="#">Lemon, Ginger & Garlic</a></li>
								                                </ul>
						                                  </li>
						                                </ul>
						                              </li>

						                              <li className="dropdown">
						                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">BLOGS</a>
						                               {/* <ul className="dropdown-menu">
						                                  <li><a href="#">Page 1-1</a></li>
						                                  <li><a href="#">Page 1-2</a></li>
						                                  <li><a href="#">Page 1-3</a></li>
						                                </ul>*/}
						                              </li>
						                               <li className="dropdown">
						                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">ABOUT US</a>
						                               {/* <ul className="dropdown-menu">
						                                  <li><a href="#">Page 1-1</a></li>
						                                  <li><a href="#">Page 1-2</a></li>
						                                  <li><a href="#">Page 1-3</a></li>
						                                </ul>*/}
						                              </li>
						                              <li className="dropdown">
						                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">CONTACT US</a>
						                              {/*  <ul className="dropdown-menu">
						                                  <li><a href="#">Page 1-1</a></li>
						                                  <li><a href="#">Page 1-2</a></li>
						                                  <li><a href="#">Page 1-3</a></li>
						                                </ul>*/}
						                              </li>
						                              <li className="dropdown">
						                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">CONTACT US</a>
						                              {/*  <ul className="dropdown-menu">
						                                  <li><a href="#">Page 1-1</a></li>
						                                  <li><a href="#">Page 1-2</a></li>
						                                  <li><a href="#">Page 1-3</a></li>
						                                </ul>*/}
						                              </li>
						                          </ul>
						                      </nav>
						                    </div>
										</div>
									</div>
								</div>
								<div className="col-lg-2 col-md-8 col-sm-8 col-xs-8 ">
									<div className="row">
										<div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 backColor ">
											<p className="pull-right"><img src="/images/cart.png" className="cartImg" /><span className="w3-badge mt5">9</span></p> 

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
                </div>
		);
	}
}
