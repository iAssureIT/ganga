import React, { Component } from 'react';
import "./ProductDivider.css";

export default class SaleProductDivider extends Component {
	constructor(props){
    super(props);
	    
  	}  
  render() {
		return (
			<div className="row">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
	                <div className="block">
	                    <a className="image" href="#" target="_blank"> 
	                    <img src="http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media/amazon/banner/9.jpg" alt="home banner" className="divImage"/></a>
	                	<div className="figcaption2"></div>
	                </div>
            	</div>
         	</div>   	
		);
	}
}
