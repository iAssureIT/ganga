import React, { Component } 		  from 'react';
import EcommerceProductCarousel 	from "../../blocks/ProductCarouselEcommerce/EcommerceProductCarousel.js";
import EcommerceBanner 				    from "../../blocks/Banner/EcommerceBanner.js";
import ShopByCategoriesEcommerce  from "../../blocks/ShopByCategories/ShopByCategoriesEcommerce.js";
import { connect }                from 'react-redux';
import axios                  		from 'axios';

axios.defaults.baseURL = 'http://gangaexpressapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';
var webCategory  = 'Main-Site';
class EcommerceHomepage extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	featuredProducts : [],
	    	exclusiveProducts: []
	    };
      this.featuredProductData();
      this.exclusiveProductsData();
      this.newProductsData();
      this.bestSellerData();

  	}  
  	componentDidMount() {
      this.featuredProductData();
      this.exclusiveProductsData();
      this.newProductsData();
      this.bestSellerData();
  	}  
    featuredProductData(){
      var productType1 = 'featured';
      
      axios.get("/api/products/get/listbytype/"+webCategory+"/"+productType1)
            .then((response)=>{
              // var featuredProducts = {
              //   products : response.data,
              //   title    : "New Products"
              // }
              // this.props.setFeaturedProductData(featuredProducts)
              this.setState({
                featuredProducts : response.data
              })
            })
            .catch((error)=>{
                console.log('error', error);
            })

    }
    exclusiveProductsData(){
      var productType2 = 'exclusive';
      axios.get("/api/products/get/listbytype/"+webCategory+"/"+productType2)
            .then((response)=>{

              this.setState({
                  exclusiveProducts : response.data
              })
            })
            .catch((error)=>{
                console.log('error', error);
            })
    }
    newProductsData(){
      var productType3 = 'newProduct';
      axios.get("/api/products/get/listbytype/"+webCategory+"/"+productType3)
            .then((response)=>{

              this.setState({
                  newProducts : response.data
              })
            })
            .catch((error)=>{
                console.log('error', error);
            })    
    }
    bestSellerData(){
      var productType4 = 'bestSeller';
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
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray">
					<div className="row">
					
						<EcommerceBanner/>
            </div>
            <div className="homeRow">
            { /*new product */}
						<EcommerceProductCarousel title={'New Products'} newProducts = {this.state.newProducts}/>
						
            { /*exclusive */}
            <div className="mt20 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="row">
						 <ShopByCategoriesEcommerce title={'Exclusive Products'} newProducts = {this.state.exclusiveProducts}/>
             </div>
             </div>
						{/*featured  */} 
						<EcommerceProductCarousel title={'Featured Products'} newProducts = {this.state.featuredProducts}/>
            <div className="mt20 mb20 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="row">
						<ShopByCategoriesEcommerce title={'Best Seller'} newProducts = {this.state.bestSellerProducts} />
            </div>
            </div>
            </div>
        </div>
		);
	}
}



export default (EcommerceHomepage);