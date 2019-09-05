import React, { Component } from 'react';
import ProductCarousel from "../ProductCarousel/ProductCarousel.js";
import "./FeaturedProducts.css";

export default class FeaturedProducts extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
  	}  
  render() {
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
						<ProductCarousel />
				</div>
		);
	}
}
