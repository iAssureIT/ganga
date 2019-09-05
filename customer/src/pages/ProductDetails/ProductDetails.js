import React, { Component } 		from 'react';
import EcommerceHeader 				from "../../blocks/common/EcommerceHeader/EcommerceHeader.js";
import FeaturedProducts 			from "../../blocks/FeaturedProducts/FeaturedProducts.js";
import EcommerceFooter    			from "../../blocks/common/EcommerceFooter/EcommerceFooter.js";
import Breadcumb 					from "../../blocks/common/Breadcumb/Breadcumb.js";
import ProductDescription 			from "../../blocks/common/ProductDescription/ProductDescription.js";
import ProductView 					from "../../blocks/common/ProductView/ProductView.js";

export default class ProductDetails extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
  	}  
  render() {
  	
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop180 mb50">
					<div className="row">
						<ProductView />
						<FeaturedProducts />

						<ProductDescription />
						<FeaturedProducts />

					</div>
                </div>
		);
	}
}
