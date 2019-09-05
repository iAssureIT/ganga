import React, { Component } from 'react';
import "./Banner.css";

export default class EcommerceBanner extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
  	}  
  render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite  marginTop180">
				<div className="row">
					<div className="">

						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerContainerEcomm">
							<div className="row">
						  		<div id="customCarousel" className="carousel " data-ride="carousel">
								    <ol className="carousel-indicators squareIndicator">
								      <li data-target="#customCarousel" data-slide-to="0" className="active"></li>
								      <li data-target="#customCarousel" data-slide-to="1"></li>
								      <li data-target="#customCarousel" data-slide-to="2"></li>
								      <li data-target="#customCarousel" data-slide-to="3"></li>
								     
								    </ol>
								    <div className="carousel-inner height350">
								      <div className="item fadding">
								        <img src="/images/eCommerce-Banners_1.png"  />
								    
								      </div>

								      <div className="item fadding">
								        <img src="/images/eCommerce-Banners_2.png"  />
									      <div className="caption col-lg-12 col-md-12 col-sm-12 col-xs-12">
							        </div>
								      </div>
								    
								      <div className="item fadding">
								        <img src="/images/eCommerce-Banners_3.png"  />
									      <div className="caption col-lg-12 col-md-12 col-sm-12 col-xs-12">
							          </div>
								      </div>
								      
							    	<div className="item active fadding">
							        	<img src="/images/eCommerce-Banners_4.png"  />
								    
							   		 </div>
								</div>
							    <a className="left carousel-control customControl" href="#customCarousel" data-slide="next">
							      <span className="glyphicon glyphicon-chevron-left backDivEcommerce"></span>
							      <span className="sr-only">Previous</span>
							    </a>
							    <a className="right carousel-control" href="#customCarousel" data-slide="prev">
							      <span className="glyphicon glyphicon-chevron-right backDivEcommerce"></span>
							      <span className="sr-only">Next</span>
							    </a>

						 		</div>
							</div>
						</div>
					</div>	
				</div>
			</div>
		);
	}
}
