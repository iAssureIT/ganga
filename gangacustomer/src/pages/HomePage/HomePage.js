import React, { Component } 		  from 'react';
import $                          from 'jquery';
import EcommerceProductCarousel 	from "../../blocks/ProductCarouselEcommerce/EcommerceProductCarousel.js";
import Ecommercenewproductcaro    from "../../blocks/ProductCarouselEcommerce/Ecommercenewproductcaro.js";
import EcommerceBanner 				    from "../../blocks/Banner/EcommerceBanner.js";
import ProductDivider             from "../../blocks/ProductDivider/ProductDivider.js";
import SaleProductDivider         from "../../blocks/ProductDivider/SaleProductDivider.js"
// import { connect }                from 'react-redux';
import axios                  		from 'axios';
import Loader from "../../common/loader/Loader.js";

var webCategory  = 'Main-Site';
class HomePage extends Component {
	  constructor(props){
    super(props);
	    this.state = {
	    	featuredProducts  : [],
        exclusiveProducts : [],
        categories        : [],
        exclusiveprloading:true,
        bestsellerloading :true,
        newproductloading :true,
        featuredproductsloading : true
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
      this.getWishData();
        var refresh = window.localStorage.getItem('refresh');
        // console.log(refresh);
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
      
      axios.get("/api/products/get/listbytype/"+productType1)
            .then((response)=>{
              // console.log('featuredProducts' , response.data)
              this.setState({
                featuredproductsloading:false,
                featuredProducts : response.data
              })
            })
            .catch((error)=>{
                // console.log('error', error);
            })

    }
    exclusiveProductsData(){
      var productType2 = 'exclusive';
      axios.get("/api/products/get/listbytype/"+productType2)
            .then((response)=>{

              this.setState({
                exclusiveprloading:false,
                exclusiveProducts : response.data
              })
            })
            .catch((error)=>{
                // console.log('error', error);
            })
    }
    newProductsData(){
      var productType3 = 'newProduct';
      axios.get("/api/products/get/listbytype/"+productType3)
            .then((response)=>{

              this.setState({
                newproductloading:false,
                newProducts : response.data
              })
            })
            .catch((error)=>{
                // console.log('error', error);
            })    
    }
    bestSellerData(){
      var productType4 = 'bestSeller';
      axios.get("/api/products/get/listbytype/"+productType4)
            .then((response)=>{
              this.setState({
                bestsellerloading:false,
                bestSellerProducts : response.data
              })
            })
            .catch((error)=>{
                // console.log('error', error);
            })    
    }
    getCategories(){
      axios.get("/api/category/get/list")
      .then((response)=>{
        this.setState({
          categories : response.data
        })
      })
      .catch((error)=>{
        // console.log('error', error);
      })
    }
    changeProductCateWise(categoryID, type){
      axios.get("/api/products/get/listbytypeNcategory/"+categoryID+"/"+type)
      .then((response)=>{
        this.setState({
          [type+"Products"] : response.data
        },()=>{
          this.forceUpdate();
        })
      })
      .catch((error)=>{
        // console.log('error', error);
      })
    }
    getWishData(){
      var user_ID = localStorage.getItem('user_ID');
      axios.get('/api/wishlist/get/userwishlist/'+user_ID)
      .then((response)=>{
        this.featuredProductData();
        this.exclusiveProductsData();
        this.newProductsData();
        this.bestSellerData();
        this.setState({
          wishList : response.data
        },()=>{
        })
      })
      .catch((error)=>{
        // console.log('error', error);
      })
    }
  render() {
		return (
      <div className="">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray">
					<div className="row">
						<EcommerceBanner/>

          </div>
            <div className="homeRow">
            { /*new product */}
            {
              this.state.exclusiveprloading ?  
              <Loader type="carouselloader" productLoaderNo = {4}/>      
              : 
              (this.state.exclusiveProducts.length > 0 ? 
                <EcommerceProductCarousel title={'FLASH SALE'} newProducts={this.state.exclusiveProducts} type={'exclusive'} categories={this.state.categories} getWishData={this.getWishData.bind(this)} wishList={this.state.wishList} changeProductCateWise={this.changeProductCateWise.bind(this)}/>
                :
                null
              )
            }
            {
              this.state.bestsellerloading ?  
              <Loader type="carouselloader" productLoaderNo = {4}/>      
              :
              ( this.state.bestSellerProducts.length  > 0 ? 
                <Ecommercenewproductcaro   title={'BEST SELLERS'} newProducts={this.state.bestSellerProducts} type={'bestSeller'} getWishData={this.getWishData.bind(this)} wishList={this.state.wishList} categories={this.state.categories} changeProductCateWise={this.changeProductCateWise.bind(this)}/>
                :
                null
                )
            }

						<ProductDivider categories={this.state.categories} />
            
            {
              this.state.newproductloading ?  
              <Loader type="carouselloader" productLoaderNo = {4}/>      
              :
              (this.state.newProducts.length >0 ? 
              <Ecommercenewproductcaro title={'NEW PRODUCTS'} newProducts={this.state.newProducts} type={'newProducts'} getWishData={this.getWishData.bind(this)} wishList={this.state.wishList} categories={this.state.categories} changeProductCateWise={this.changeProductCateWise.bind(this)}/>                
              :
              null )
            }
            
            {
              this.state.featuredproductsloading ?  
              <Loader type="carouselloader" productLoaderNo = {4}/>      
              :
              (this.state.featuredProducts.length > 0 ? 
                <Ecommercenewproductcaro  title={'FEATURE PRODUCTS'} newProducts={this.state.featuredProducts} type={'featured'} getWishData={this.getWishData.bind(this)} wishList={this.state.wishList} categories={this.state.categories} changeProductCateWise={this.changeProductCateWise.bind(this)}/>
                : null
              )
            }
            
          </div>
        </div>
        <SaleProductDivider />
      </div>
		);
	}
}



export default (HomePage);
