import React, { Component } from 'react';
import "./ProductDivider.css";

export default class ProductDivider extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	"imgArray" :["http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media/amazon/banner/1.jpg",
	    				"http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media/amazon/banner/2.jpg",
	    				"http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media/amazon/banner/3.jpg",
	    				"http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media/amazon/banner/4.jpg",
	    				"http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media/amazon/banner/5.jpg",
	    				"http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media/amazon/banner/6.jpg",
	    				"http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media/amazon/banner/7.jpg",
	    				"http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media/amazon/banner/8.jpg",
	    				]
	    	
	    };
  	}  
  render() {
		return (
			<div className="row">

				{
					this.state.imgArray && this.state.imgArray.map((data,index)=>{
						
						return(
							<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6" key={index}>
				                <div className="block">
				                    <a className="image" href="#" target="_blank"> 
				                    <img src={data} alt="home banner" className="divImage"/></a>
				                	<div className="figcaption"></div>
				                </div>
			            	</div>
						);
					})
				}
				
         	</div>   	
		);
	}
}
