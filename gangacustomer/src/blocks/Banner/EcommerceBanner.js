import React, { Component } from 'react';
import "./Banner.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/carousel.js';
import Loadable                   from 'react-loadable';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';	

export default class EcommerceBanner extends Component {
	constructor(props){
    super(props);
	    this.state = {
	      responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:1 
            }
          },

	    	
	    };
  	}  
  render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite  marginTop180">
				<div className="row">
					<div className="">

						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerContainerEcomm">
							<div className="row">
						 		<OwlCarousel
									    className="owl-theme bannercaro"
									    loop
                            			responsive={this.state.responsive} 
			                            autoplay={true}
			                            autoplayHoverPause={true}
			                            dots={true}
			                            dotData={true}
									>
									    <div className="item"><img className="img img-responsive" src="/images/Banner_1.jpg"  /></div>
									    <div className="item"><img className="img img-responsive" src="/images/Banner_2.png"  /></div>
									    <div className="item"><img className="img img-responsive" src="/images/Banner_3.png"  /></div>
									</OwlCarousel>

							</div>
						</div>
					</div>	
				</div>
			</div>
		);
	}
}