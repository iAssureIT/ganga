import React, { Component } 		from 'react';
// import EcommerceHeader 				from "../../blocks/common/EcommerceHeader/EcommerceHeader.js";
// import EcommerceBreadcumb 			from "../../blocks/common/Breadcumb/EcommerceBreadcumb.js";
// import FeaturedProducts 			from "../../blocks/FeaturedProducts/FeaturedProducts.js";
// import EcommerceFooter    			from "../../blocks/common/EcommerceFooter/EcommerceFooter.js";
// import ProductDescriptionEcommerce 	from "../../blocks/common/ProductDescriptionEcommerce/ProductDescriptionEcommerce.js";
import ProductViewEcommerce     from "../../blocks/ProductViewEcommerce/ProductViewEcommerce.js";
import ProductViewEcommerceList     from "../../blocks/ProductViewEcommerceList/ProductViewEcommerceList.js";
import ProductViewEcommerceBestSellers     from "../../blocks/ProductViewEcommerceBestSellers/ProductViewEcommerceBestSellers.js";
import ProductViewEcommerceShopingFeature     from "../../blocks/ProductViewEcommerceShopingFeature/ProductViewEcommerceShopingFeature.js";
import ProductViewEcommerceDetailsReviewFAQ 		from "../../blocks/ProductViewEcommerceDetailsReviewFAQ/ProductViewEcommerceDetailsReviewFAQ.js";
// import FeaturedProductsEcommerce 	from "../../blocks/FeaturedProducts/FeaturedProductsEcommerce.js";
import axios                  		from 'axios';

axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default class ProductDetailsEcommerceView extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	 bestSellerProducts:[]
	    };
  	} 
  	componentDidMount(){
  		var productType4 = 'bestSeller';
  		var webCategory = 'Main-Site'
  		axios.get("/api/products/get/listbytype/"+webCategory+"/"+productType4)
            .then((response)=>{

              this.setState({
                  bestSellerProducts : response.data
              })
            })
            .catch((error)=>{
                console.log('error', error);
            }) 
  	} 
  	  	
  	render() {
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop180  backColorGray">
          <ProductViewEcommerce productID = { this.props.productID } />
          <ProductViewEcommerceShopingFeature productID ={ this.props.productID } />
          <ProductViewEcommerceDetailsReviewFAQ productID = { this.props.productID } />
          <ProductViewEcommerceBestSellers productID = { this.props.productID } />
					<ProductViewEcommerceList productID = { this.props.productID } />
        </div>
		);
	}
}