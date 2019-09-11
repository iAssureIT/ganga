import React, { Component } from 'react';
import "./Banner.css";

export default class Banner extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
  	}  
  render() {
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb50">
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grossbannerContainerEcomm bannerContainerEcomm">
							<div className="row">
						  		<div id="customCarousel" className="carousel " data-ride="carousel">
								    <ol className="carousel-indicators squareIndicator">
								      <li data-target="#customCarousel" data-slide-to="0" className="active"></li>
								      <li data-target="#customCarousel" data-slide-to="1"></li>
								      <li data-target="#customCarousel" data-slide-to="2"></li>  
								    </ol>
								    <div className="carousel-inner height350">
								      <div className="item fadding">
								        <img src="/images/slider1.jpg"  />
								    	 <div className="caption slide-top col-lg-12 col-md-12 col-sm-12 col-xs-12">
								          <label>Fresh Organic Food</label>
								          <p className="slide-bottom">We Deliver Organic Fruits And Vegetables Fresh From<br/>
								           Our Fields To Your Home </p>

								          <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 slide-bottom-slow"> 
								          	<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 col-lg-offset-8 shopNowButton">SHOP NOW</div>
								          </div>
								        </div>
								      </div>

								      <div className="item fadding">
								        <img src="/images/slider2.jpg"  />
									      <div className="caption col-lg-12 col-md-12 col-sm-12 col-xs-12">
									          <label>Fresh Organic Food</label>
									          <p>We Deliver Organic Fruits And Vegetables Fresh From<br/>
									           Our Fields To Your Home </p>

									          
								        </div>
								      </div>
								      {/*<div className="item fadding">
								        <img src="/images/slider2.jpg"  />
									      <div className="caption col-lg-12 col-md-12 col-sm-12 col-xs-12">
									          <label>24/7 Service</label>
									          
									         
								        </div>
								      </div>*/}
								      <div className="item active fadding">
								        <img src="/images/bg_html1.jpg"/>
									      <div className="caption col-lg-12 col-md-12 col-sm-12 col-xs-12">
									          <label className="colorBlack">GET 30% OFF</label>
									          <p className="colorBlack">We Deliver Organic Fruits And Vegetables Fresh From<br/>
									           Our Fields To Your Home </p>

									          
								        </div>
								      </div>
								      
							    	<div className="item  fadding">
								        <img src="/images/slider2.jpg"  />
								      	<div className="caption flip-scale-up-hor col-lg-12 col-md-12 col-sm-12 col-xs-12">
								          <label>Fresh Organic Food</label>
								          <p>We Deliver Organic Fruits And Vegetables Fresh From<br/>
								           Our Fields To Your Home </p>

								          <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 "> 
								          	<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 col-lg-offset-8 shopNowButton flip-scale-up-hor">SHOP NOW</div>
								          </div>
								        </div>
							   		 </div>
								</div>
							    <a className="left carousel-control customControl" href="#customCarousel" data-slide="prev">
							      <span className="glyphicon glyphicon-chevron-left backDiv"></span>
							      <span className="sr-only">Previous</span>
							    </a>
							    <a className="right carousel-control" href="#customCarousel" data-slide="next">
							      <span className="glyphicon glyphicon-chevron-right backDiv"></span>
							      <span className="sr-only">Next</span>
							    </a>

						 		</div>
							</div>
						</div>
					</div>
				</div>
		);
	}
}
