import React, { Component } 		from 'react';
import Banner 						from "../../blocks/Banner/Banner.js";
import FeatureList 					from "../../blocks/FeatureList/FeatureList.js";
import ProductCarousel 				from "../../blocks/ProductCarousel/ProductCarousel.js";
import NewProducts 					from "../../blocks/NewProducts/NewProducts.js";
import ExclusiveProducts 			from "../../blocks/ExclusiveProducts/ExclusiveProducts.js";
import BestSeller 					from "../../blocks/BestSeller/BestSeller.js";
import ShowProducts 				from "../../blocks/ShowProducts/ShowProducts.js";
import ShopByCategories 			from "../../blocks/ShopByCategories/ShopByCategories.js";
import Blog 						from "../../blocks/Blog/Blog.js";
import $ 				 			from 'jquery';
import OwlCarousel 		 			from 'react-owl-carousel';
import Moment            			from 'react-moment';
import EcommerceBanner 				from "../../blocks/Banner/EcommerceBanner.js";
import axios                		from 'axios';
import ShopByCategoriesEcommerce    from "../../blocks/ShopByCategories/ShopByCategoriesEcommerce.js";
import EcommerceProductCarousel 	from "../../blocks/ProductCarouselEcommerce/EcommerceProductCarousel.js";

import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
require("bootstrap/less/bootstrap.less");
 
axios.defaults.baseURL = 'http://gangaexpressapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

var webCategory  = 'Grocery';
export default class HomePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			products:[],
			categories:[],
			subcategories:[],
			categoryID:'',
			subcategoryID:'',
			dupliImage:[],
      		activePage: 1,
      		featuredProducts : [],
      		exclusiveProducts :[],
      		newProducts :[],
      		bestSellerProducts:[]

		}
	  this.featuredProductData();
      this.exclusiveProductsData();
      this.newProductsData();
      this.bestSellerData();

	}
	handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
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
                // console.log('respo', response.data);
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
              
              this.setState({
                  categories : response.data
              })

              	var acc = document.getElementsByClassName("plusContainer");
				var i;
				var categories = this.state.categories;
				var subcategories = [];

				for (i = 0; i < acc.length; i++) {
					
					this.setState({
						categoryID    : this.state.categories[0]._id,
	              		subcategories : subcategories.length > 0 ? subcategories : this.state.categories[0].subCategory
	              	});	
				  acc[i].addEventListener("click", (event)=> {
				  	
				    event.target.classList.toggle("active");

				    var panel = event.target.nextElementSibling;
				    
				    subcategories = categories.filter((n,i)=>{
				    	
						if(n._id == $(event.target).data('id')){
							
							return n;
						}  
					})
					subcategories = subcategories[0].subCategory;
					
					this.setState({
						categoryID    : $(event.target).data('id'),
	              		subcategories : subcategories.length > 0 ? subcategories : this.state.categories[0].subCategory
	              	});
					
				    if (panel.style.display === "block") {
				      panel.style.display = "none";
				    } else {	
				      this.getProductsByCategory(this.state.categoryID);
				      panel.style.display = "block";
				    }
				  });
				}

            })
            .catch((error)=>{
                console.log('error', error);
            })  
	}
	getProductsByCategory(categoryID){
		axios.get("/api/products/get/list/"+categoryID)
	      .then((response)=>{ 
	      	
	          this.setState({
	              products : response.data
	          })
	          
	      })
	      .catch((error)=>{
	            console.log('error', error);
	      })
	}
	getProductsBySubcategory(event){
		
		this.setState({subcategoryID : $(event.target).data().id},()=>{
			console.log(this.state.subcategoryID);
			axios.get("/api/products/get/list/"+this.state.categoryID+'/'+this.state.subcategoryID)
	      	.then((response)=>{ 
	      	
	          this.setState({
	              products : response.data
	          })
	      	})
	      	.catch((error)=>{
	            console.log('error', error);
	      	})
		});
		
	}
	sortProducts(event){
		event.preventDefault();
		var sortBy = event.target.value;

		if(sortBy == "alphabeticallyAsc"){
			let field='productName';
			this.setState({
				products: this.state.products.sort((a, b) => (a[field] || "").toString().localeCompare((b[field] || "").toString()))
			});
		}
		if(sortBy == "alphabeticallyDsc"){
			let field='productName';
			this.setState({
				products: this.state.products.sort((a, b) => -(a[field] || "").toString().localeCompare((b[field] || "").toString()))
			});
		}
		if(sortBy == "priceAsc"){
			let field='offeredPrice';
			this.setState({
				products: this.state.products.sort((a, b) => a[field] - b[field])
			});
		}
		if(sortBy == "priceDsc"){
			let field='offeredPrice';
			this.setState({
				products: this.state.products.sort((a, b) => b[field] - a[field])
			});
		}
	}  
  render() {
		return (
				<div className="col-lg-12 backColorGG">
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop180 mb50">
							<div className="row">
								<Banner /> 
							</div>
            				<div className="homeRow ">
								{ /*new product */}
								<NewProducts title={'New Products'}  newProducts = {this.state.newProducts}/>
								{ /*exclusive */}
								<div className="mt20 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              					<div className="row">
								<ExclusiveProducts title={'Exclusive Products'} newProducts = {this.state.exclusiveProducts}/>
								</div>
								</div>
								{/*featured  */} 
								<NewProducts title={'Featured Products'} newProducts = {this.state.featuredProducts}/>
								<div className="mt20 mb20 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              					<div className="row">
								<ExclusiveProducts title={'Best Seller'} newProducts = {this.state.bestSellerProducts} />
								</div>
								</div>
							</div>
						</div>
                	</div>
                </div>
		);
	}
}
