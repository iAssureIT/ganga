import React, { Component } from 'react';
import "./ShowProducts.css";

export default class ShowProducts extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
  	}  
  render() {
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt40 ">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
							<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 pr0">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " >
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 vegetableDiv ">

										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innerDivBigger">
											<div className="row">
											<span className="nameOfProductClass"> Fruits & Vegetables</span><br/>
											<button className="shopNowButtonShow">SHOP NOW</button>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
									<div className="row ">
										<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 " >
											<div className=" ">
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 veggiDiv ">
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innerDiv"> 
														<div className="row">
															<span className="nameOfSubProductClass"> Meat & Fish</span><br/>
															<button className="shopNowButtonSubShow">SHOP NOW</button>
														
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12  " >
											<div className=" ">
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 meatDiv ">
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innerDiv"> 
													<div className="row">
														<span className="nameOfSubProductClass"> Snacks & Other</span><br/>
														<button className="shopNowButtonSubShow">SHOP NOW</button>
													</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								
							</div>
							<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 pr0 ">
								<div className="">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " >
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grainDiv ">
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innerDivBigger">
												<div className="row">
													<span className="nameOfProductClass"> Foodgrains,Oil & Masala</span><br/>
													<button className="shopNowButtonShow">SHOP NOW</button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
									<div className="row ">
										<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 " >
											<div className=" ">
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 drinkDiv ">
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innerDiv"> 
														<div className="row">
															<span className="nameOfSubProductClass">Beverages</span><br/>
															<button className="shopNowButtonSubShow">SHOP NOW</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12  " >
											<div className=" ">
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bakeDiv ">
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innerDiv"> 
														<div className="row">
															<span className="nameOfSubProductClass"> Cakes & Diary</span><br/>
															<button className="shopNowButtonSubShow">SHOP NOW</button>
														</div>
													</div>
												</div>
											</div>
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
