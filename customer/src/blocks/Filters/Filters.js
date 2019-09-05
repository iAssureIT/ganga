import React, { Component } from 'react';
import $ 				 from 'jquery';
import OwlCarousel 		 from 'react-owl-carousel';

import "./Filters.css";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default class Filters extends Component {
		  BlogsData(){
        return [
            {
                name  		: "EXTRA 10% OFF",
               
            }, {
                name  		: "$79 CASHBACK",
               
            }, {
                name  		: "80% OFF",
               
            }, {
                name  		: "ON SALE",
               
            },{
                name  		: "UNDER 99",
               
            }
            
            
        ]
    }

  render() {
		return (
			
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20  ">

				<OwlCarousel
				    className="owl-theme"
				    loop
				    items={6}
				    nav
				    autoplay={true}
				>
				{
				this.BlogsData().map((data, index)=>{
                return (
			    <div className="item" key={index}>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 filters">
							<div className="row">
								<span>{data.name}</span>
							</div>
						</div>
						</div>
					</div>
				);
				})
            	}
			   
			</OwlCarousel>
		</div>
		);
	}
}



