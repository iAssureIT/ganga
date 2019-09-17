import React, { Component } 		from 'react';
import ProductCollageView 			from '../../blocks/ProductCollage/ProductCollageView.js';
import SearchProductPage  			from  './SearchProductPage.css';
import $                    		from 'jquery';
import InputRange 					from 'react-input-range';
import  'react-input-range/lib/css/index.css';
import axios 						from 'axios';
import swal                       from 'sweetalert';

export default class SearchProduct extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	searchResult : [],
	    	data:[1, 2, 3, 4, 5, 6],
	    	price: { min: 8999, max: 12999 },
	    	categoryDetails:[],
	    	masterproducts:[],
	    	products:[],
	    	categoryID:'',
			categoryDetails:[],
			subcategoryID:'',
      		activePage: 1,
      		selectedbrands:[],
      		minPrice: 0,
      		maxPrice: 0,
	    };
	    this.handlePriceChange = this.handlePriceChange.bind(this);  
  	}

  	componentDidMount() {
  		

  		$('div[data-toggle="collapse"]').click(function () {
  			
  			$(this).find('i').toggleClass('fa fa-minus fa fa-plus');

  		});
  		this.getCategoryDetails(this.props.match.params.categoryID);
  		this.getProductsByCategory(this.props.match.params.categoryID);
  		this.getBrands();
  		this.getPriceLimits();
  	}
  	getCategoryDetails(categoryID){
		axios.get("/api/category/get/one/"+categoryID)
	      .then((response)=>{ 
	      	
	          this.setState({
	              categoryDetails : response.data
	          })
	          
	      })
	      .catch((error)=>{
	            console.log('error', error);
	      })
	}
	getPriceLimits(){
		axios.get("http://localhost:5006/api/products/get/minmaxprice")
	      .then((response)=>{ 
	      		

		      	this.setState({
		          price: { min : Number(response.data.min),  max : Number(response.data.max)}
		      	});
	         	
	          
	      })
	      .catch((error)=>{
	            console.log('error', error);
	      })
	}
	getProductsByCategory(categoryID){
		axios.get("/api/products/get/list/"+categoryID)
	      .then((response)=>{ 
	          this.setState({
	              products 		 : response.data,
	              masterproducts : response.data
	          })
	          
	      })
	      .catch((error)=>{
	            console.log('error', error);
	      })
	}
	onSelectedItemsChange(filterType, selecteditems){
		
		if (filterType == 'subcategory') {
			$('.plusContainer').css('font-weight','normal');
			$(selecteditems.target).css('font-weight','bold');
			this.setState({subcategoryID : $(selecteditems.target).data().id},() =>{
				this.filterProducts(this.state.subcategoryID, this.state.selectedbrands,this.state.minPrice,this.state.maxPrice);
			});
			
		}
		if (filterType == 'brands') {
			var checkboxes = document.getElementsByName('brands[]');
			var brands = [];
			for (var i=0, n=checkboxes.length;i<n;i++) 
			{
			    if (checkboxes[i].checked) 
			    {
			    	brands.push(checkboxes[i].value);
			    }
			}
			this.setState({selectedbrands : brands},() =>{
				this.filterProducts(this.state.subcategoryID, this.state.selectedbrands,this.state.minPrice,this.state.maxPrice);
			});
		}
		if (filterType == 'minPrice') {
			var minPrice = $(selecteditems.target).val();
			this.setState({minPrice : minPrice},() =>{
				this.filterProducts(this.state.subcategoryID, this.state.selectedbrands,this.state.minPrice,this.state.maxPrice);
			});
		}
		if (filterType == 'maxPrice') {
			var maxPrice = $(selecteditems.target).val();
			this.setState({maxPrice : maxPrice},() =>{
				this.filterProducts(this.state.subcategoryID, this.state.selectedbrands,this.state.minPrice,this.state.maxPrice);
			});
		}	
	}
	filterProducts(subcategoryID,selectedbrands,minPrice,maxPrice){
		console.log('subcategoryID',subcategoryID);
		console.log('selectedbrands',selectedbrands);
		console.log('minPrice',minPrice);
		console.log('maxPrice',maxPrice);
		if (subcategoryID != '') {
			var products = this.state.masterproducts.filter( (array_el)=>  {
              return subcategoryID == array_el.subCategory_ID;
        	});

        	console.log();
        	this.setState({products :products});
		}
		else if(selectedbrands.length > 0 && subcategoryID != ''){
			var products = this.state.masterproducts.filter( (array_el)=>  {
				return selectedbrands.filter( (selectedItems_el) => {
                  return selectedItems_el == array_el.brand && subcategoryID == array_el.subCategory_ID;
                }).length != 0
              //return subcategoryID == array_el.subCategory_ID;
        	});
        	this.setState({products :products})
		}
		else if(selectedbrands.length > 0 && subcategoryID == ''){
			var products = this.state.masterproducts.filter( (array_el)=>  {
				return selectedbrands.filter( (selectedItems_el) => {
                  return selectedItems_el == array_el.brand;
                }).length != 0
              //return subcategoryID == array_el.subCategory_ID;
        	});
        	this.setState({products :products})
		}
		else if (minPrice > 0) {
			var products = this.state.masterproducts.filter( (array_el)=>  {
              return Number(array_el.offeredPrice) > Number(minPrice);
        	});
        	this.setState({products :products});
		}
		else if (minPrice > 0 && subcategoryID != '') {
			var products = this.state.masterproducts.filter( (array_el)=>  {
              return subcategoryID == array_el.subCategory_ID && Number(array_el.offeredPrice) > Number(minPrice);
        	});
        	this.setState({products :products});
		}
		else if (minPrice > 0 && selectedbrands.length >0) {
			var products = this.state.masterproducts.filter( (array_el)=>  {
				return selectedbrands.filter( (selectedItems_el) => {
                	return 	selectedItems_el == array_el.brand && 
                  			Number(array_el.offeredPrice) > Number(minPrice);
                }).length != 0
              //return subcategoryID == array_el.subCategory_ID;
        	});

        	this.setState({products :products});
		}
		else if (minPrice > 0 && subcategoryID != '' && selectedbrands.length >0) {

			var products = this.state.masterproducts.filter( (array_el)=>  {
				return selectedbrands.filter( (selectedItems_el) => {
                	return 	selectedItems_el == array_el.brand && 
                  			subcategoryID == array_el.subCategory_ID && 
                  			Number(array_el.offeredPrice) > Number(minPrice);
                }).length != 0
              //return subcategoryID == array_el.subCategory_ID;
        	});

        	this.setState({products :products});
		}
		else if (maxPrice > 0) {
			var products = this.state.masterproducts.filter( (array_el)=>  {
              return Number(array_el.offeredPrice) < Number(maxPrice);
        	});
        	this.setState({products :products});
		}	
		else if (minPrice > 0 && maxPrice > 0) {
			var products = this.state.masterproducts.filter( (array_el)=>  {
              return Number(array_el.offeredPrice) > Number(minPrice) && Number(array_el.offeredPrice) < Number(maxPrice);
        	});
        	this.setState({products :products});
		}
		else if (minPrice > 0 && maxPrice > 0 && subcategoryID != '') {

			var products = this.state.masterproducts.filter( (array_el)=>  {
              return subcategoryID == array_el.subCategory_ID 
              		&& Number(array_el.offeredPrice) > Number(minPrice)
              		&& Number(array_el.offeredPrice) < Number(maxPrice);
        	});
        	this.setState({products :products});
		}
		else if (maxPrice > 0 && subcategoryID != '') {
			var products = this.state.masterproducts.filter( (array_el)=>  {
              return subcategoryID == array_el.subCategory_ID 
              		&& Number(array_el.offeredPrice) < Number(maxPrice);
        	});
        	this.setState({products :products});
		}else{

		}
	}
	getBrands(){
		axios.get("/api/products/get/listBrand")

	      	.then((response)=>{ 
	      	
	          this.setState({
	              brands : response.data
	          })
	      	})
	      	.catch((error)=>{
	            console.log('error', error);
	      	})
	}
	handlePriceChange(event) {
	      event.preventDefault();
	      const target = event.target;
	      const name = target.name;
	     

	      if (name == 'slider_min') {
	      	this.setState({
	          price: { min : Number(target.value),  max : Number(this.state.price.max)}
	      	}); 
	      }
	      if (name == 'slider_max') {
	      	this.setState({
	          price: { min : Number(this.state.price.min),  max : Number(target.value)}
	      	}); 
	      } 
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
		console.log('pricemin,',this.state.price.min);
		console.log('pricemax,',this.state.price.max);
		return (
	      	<div className="container" id="containerDiv">
	     	<div className="row"> 
	     		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
	     			<ul className="links">
				    	<li><a  href="/">Home /</a></li>
				    	<li><a href="#categories">Categories</a></li>
				  	</ul>
				</div>		
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
              		<div className="forSearchDiv">
              			<h5 className="showingby">NOW SHOWING BY</h5>
              			<hr/>
              			<h6 className="selcategory">CATEGORY: Electronics</h6> 
              			<span><a href="#" >Remove This Item </a></span><br/>
              			<span><a href="#" >Clear All </a></span>
              		</div>
              		
              		<br/>
 					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nb-brand">
					<div className="Featured-Brands-tittle">Featured Brands</div>
						
						{/*<ul className="Featured-Brands">
																
							<li className="Featured-Brands-li">
								<div className="Featured-Brands-li-div">
									<div className="Featured-Brands-li-div-div">
									<a className="imgs" href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/shopbybrand/index/view/id/1/">
									<img className="img_logo_brand" src="http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media///Shopbybrand//techservice.png" />
									</a>

									<a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/shopbybrand/index/view/id/1/" className="name_brand"> iPhone</a>	
									</div>
								</div>	
							</li>
						</ul>*/}
						<br/>
						{ this.state.brands && this.state.brands.length > 0 ? 
										this.state.brands.map((data,index)=>{
											
											return(
											<div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 " key={index}>
												<div>
														<div className="centreDetailContainerEcommerce col-lg-1 row">
														<input type="checkbox" name="brands[]" onChange={this.onSelectedItemsChange.bind(this,"brands")} value={data}/>
														<span className="centreDetailCheckEcommerce"></span>
														</div>
													<span className="centreDetaillistItemEcommerce">{data}</span>
												</div>
											</div>
											);
										})
										: ''

									}
						
					</div>
              </div>
              <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">

              	<ul className="nav nav-tabs">
				    <li className="active"><a data-toggle="tab" href="#products">Products</a></li>
				    <li><a data-toggle="tab" href="#categories">Categories</a></li>
				</ul>
				<br/>
				  <div className="tab-content">
				    <div id="products" className="tab-pane fade in active">
				    	<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pull-right NoPadding">
				    		
				    		<select className="form-control sortProducts col-lg-3" onChange={this.sortProducts.bind(this)}>
								<option  className="hidden" >Relevence</option>
								<option value="price">Price</option>
								<option value="newProduct">New Product</option>
								<option value="bestSeller">Best Seller</option>
								<option value="promotionProduct">Promotion Product </option>
								<option value="rating">Rating</option>
								<option value="review">Review </option>
							</select>
				    	</div>
				    	<br />
				    	<br />
				    	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding">
				    		{
				    			this.state.products && this.state.products.map((value, index) =>{

				    				return(
				    					<ProductCollageView key={index}  product={value}/>
				    					);
				    				
				    			})
				     		
				    		}
				     	</div>
				    </div>
				    <div id="categories" className="tab-pane fade">
				    	Categories 
				    </div>
				    
				  </div>
              	
              </div>
            </div>
	     	</div>
	    )
	}
}  	