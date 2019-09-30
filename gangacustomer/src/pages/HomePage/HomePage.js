import React, { Component } 		  from 'react';
import $                          from 'jquery';
import EcommerceProductCarousel 	from "../../blocks/ProductCarouselEcommerce/EcommerceProductCarousel.js";
import Ecommercenewproductcaro   from "../../blocks/ProductCarouselEcommerce/Ecommercenewproductcaro.js";
import EcommerceBanner 				    from "../../blocks/Banner/EcommerceBanner.js";
import ShopByCategoriesEcommerce  from "../../blocks/ShopByCategories/ShopByCategoriesEcommerce.js";
import ProductDivider             from "../../blocks/ProductDivider/ProductDivider.js";
import SaleProductDivider         from "../../blocks/ProductDivider/SaleProductDivider.js"
import ProductCollageView         from "../../blocks/ProductCollage/ProductCollageView.js"
import Pagealert                  from "../../common/Pagealert/Pagealert.js"
// import { connect }                from 'react-redux';
import axios                  		from 'axios';
axios.defaults.baseURL = 'http://gangaexpressapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';
var webCategory  = 'Main-Site';
class HomePage extends Component {
	  constructor(props){
    super(props);
	    this.state = {
	    	featuredProducts  : [],
        exclusiveProducts : [],
        categories        : [],
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
      this.getCategories();
        var refresh = window.localStorage.getItem('refresh');
        console.log(refresh);
        if (refresh===null){
            window.location.reload();
            window.localStorage.setItem('refresh', "1");
      }

    }  
    componentWillReceiveProps(nextProps){
      // this.changeProductCateWise(categoryID, type);
    }
    featuredProductData(){
      var productType1 = 'featured';
      
      axios.get("/api/products/get/listbytype/Main-Site/exclusive")
            .then((response)=>{
              // console.log('featuredProducts' , response.data)
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
    getCategories(){
      axios.get("/api/category/get/list")
      .then((response)=>{
        console.log('cate', response.data);
        this.setState({
          categories : response.data
        })
      })
      .catch((error)=>{
        console.log('error', error);
      })
    }
    changeProductCateWise(categoryID, type){
      console.log(categoryID, type)
      axios.get("/api/products/get/listbytypeNcategory/"+categoryID+"/"+type)
      .then((response)=>{
        console.log('res', response.data);
        this.setState({
          [type+"Products"] : response.data
        },()=>{
          this.forceUpdate();
          console.log(type+"Products", this.state[type+"Products"])
        })
      })
      .catch((error)=>{
        console.log('error', error);
      })
    }
  render() {
		return (
      <div className="">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray">
					<div className="row">
					 
						<EcommerceBanner/>
            <Pagealert />
            </div>
            <div className="homeRow">
            { /*new product */}
						<EcommerceProductCarousel title={'FLASH SALE'} newProducts={this.state.exclusiveProducts} type={'exclusive'} categories={this.state.categories} changeProductCateWise={this.changeProductCateWise.bind(this)}/>
            <Ecommercenewproductcaro  title={'BEST SELLERS'} newProducts={this.state.bestSellerProducts} type={'bestSeller'} categories={this.state.categories} changeProductCateWise={this.changeProductCateWise.bind(this)}/>
            <ProductDivider categories={this.state.categories} />
            <Ecommercenewproductcaro title={'NEW PRODUCTS'} newProducts={this.state.newProducts} type={'newProducts'} categories={this.state.categories} changeProductCateWise={this.changeProductCateWise.bind(this)}/>
            <Ecommercenewproductcaro  title={'FEATURE PRODUCTS'} newProducts={this.state.featuredProducts} type={'featured'} categories={this.state.categories} changeProductCateWise={this.changeProductCateWise.bind(this)}/>
            <SaleProductDivider />
        </div>
      </div>
      </div>
		);
	}
}



export default (HomePage);
