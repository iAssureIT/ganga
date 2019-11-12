import React, { Component } 		from 'react';
import ProductCollageView 			from '../../blocks/ProductCollage/ProductCollageView.js';
import SearchProductPage  			from  './SearchProductPage.css';
import $                    		from 'jquery';
import InputRange 					from 'react-input-range';
import  'react-input-range/lib/css/index.css';
import axios 						from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/collapse.js';
import Loader from "../../common/loader/Loader.js";

class ProductCollage extends Component {
	constructor(props){
    super(props);
	    this.state = { 
	    	searchResult : [],
	    	data:[1, 2, 3, 4, 5, 6],
	    	price: { min: 10, max: 1299999 },
	    	categoryDetails:[],
	    	masterproducts:[],
	    	products:[],
	    	sectionID:'',
	    	categoryID:'',
			subcategoryID:'',
      		activePage: 1,
      		selectedbrands:[],
      		minPrice: 0,
      		maxPrice: 0,
      		minPriceLmt: 0,
      		maxPriceLmt: 0,
      		sizes : [],
      		colors: [],
      		color: '',
      		size : '',
      		selector:{},
      		loading:true

      		//selector:{sectionID: this.props.match.params.sectionID, categoryID:'',subcategoryID:'',brands:[], size:'',color:'',price: { min: 10, max: 129999 } }
	    };
	    this.handlePriceChange = this.handlePriceChange.bind(this);  
  	}

  	componentDidMount() {
		this.getWishData();
  		$('div[data-toggle="collapse"]').click(function () {
  			$(this).find('i').toggleClass('fa fa-minus fa fa-plus');
  		});

  		if (this.props.match.params.categoryID && this.props.match.params.subcategoryID) {
  			this.getProductsBySubCategory(this.props.match.params.categoryID, this.props.match.params.subcategoryID);
  		}
  		else if(this.props.match.params.categoryID){
  			this.getProductsByCategory(this.props.match.params.categoryID);
  		}
  		else{
  			this.getProductsBySection(this.props.match.params.sectionID);
  		}
  		this.getSectionDetails(this.props.match.params.sectionID);
  		// this.getCategoryDetails(this.props.match.params.categoryID);
  		
  		this.getBrands();
  		this.getSize();
  		this.getColor();
  		this.getPriceLimits();

		$('.dropdown-submenu a.test').on("click", function(e){
		    $(this).next('ul').toggle();
		    e.stopPropagation();
		    e.preventDefault();
		});
  	}
  	getSectionDetails(sectionID){
  		axios.get("/api/category/get/"+sectionID)
	      .then((response)=>{ 
	          this.setState({
	              categoryDetails : response.data
	          })
	          
	      })
	      .catch((error)=>{
	            console.log('error', error);
	      })
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
		axios.get("/api/products/get/minmaxprice")
	      .then((response)=>{ 
	      		

		      	this.setState({
		      		minPriceLmt : Number(response.data.min),
		        	maxPriceLmt : Number(response.data.max),
		        	price:{min : Number(response.data.min), max: Number(response.data.max) }
		      	});
	         	
	          
	      })
	      .catch((error)=>{
	            console.log('error', error);
	      })
	}
	getProductsBySection(sectionID){
		
		axios.get("/api/products/get/list/"+sectionID)
	      .then((response)=>{ 
	      		
	          	this.setState({
	          	  //loading:false,
	              products 		 : response.data,
	              masterproducts : response.data
	          	})
	      })
	      .catch((error)=>{
	      	//alert();
	            console.log('error', error);
	      })
	}
	
	getProductsByCategory(categoryID){
		axios.get("/api/products/get/listbycategory/"+categoryID)
	      .then((response)=>{ 
	          this.setState({
	          	  loading:false,
	              products 		 : response.data,
	              masterproducts : response.data
	          })
	          
	          
	      })
	      .catch((error)=>{
	            console.log('error', error);
	      })
	}
	
	getProductsBySubCategory(categoryID, subcategoryID){
		axios.get("/api/products/get/list/"+categoryID+'/'+subcategoryID)
	      .then((response)=>{ 
	          this.setState({
	          	loading:false,
	              products 		 : response.data,
	              masterproducts : response.data
	          })
	          
	          
	      })
	      .catch((error)=>{
	            console.log('error', error);
	      })
	}
	onSelectedItemsChange(filterType, selecteditems){
		
		var checkboxes = document.getElementsByName('brands[]');
		var brands = [];
		for (var i=0, n=checkboxes.length;i<n;i++) 
		{
		    if (checkboxes[i].checked) 
		    {
		    	brands.push(checkboxes[i].value);
		    }
		}
		if (filterType == 'category') {
			var selector=this.state.selector;
			delete selector.subCategory_ID;
			selector.section_ID = this.props.match.params.sectionID;
			selector.price = this.state.price;
			selector.category_ID = $(selecteditems.target).data().id;

			this.setState({	selector: selector },()=>{
					this.getFilteredProducts(this.state.selector);
				}) 
			
			/*this.setState(
				{	selector:
					{ 
						sectionID 		: this.props.match.params.sectionID,
						categoryID 		: $(selecteditems.target).data().id,
						subcategoryID   : this.state.selector.subcategoryID,
						brands 			: brands,
						size 			: this.state.selector.size,	
						color 			: this.state.selector.color,
						price 			: this.state.selector.price		
					}
				},()=>{
					this.getFilteredProducts(this.state.selector);
				} 			
				);*/
		}
		if (filterType == 'subcategory') {
			var selector=this.state.selector;
			selector.section_ID = this.props.match.params.sectionID;
			selector.price = this.state.price;
			selector.subCategory_ID = $(selecteditems.target).data().id;
			
			this.setState({	selector: selector },()=>{
				this.getFilteredProducts(this.state.selector);
			}) 
			/*this.setState(
				{	selector:
					{ 
						sectionID 		: this.props.match.params.sectionID,
						categoryID 		: this.state.selector.categoryID,
						subcategoryID   : $(selecteditems.target).data().id,
						brands 			: brands,
						size 			: this.state.selector.size,	
						color 			: this.state.selector.color,
						price 			: this.state.selector.price		
					}
				},()=>{
					this.getFilteredProducts(this.state.selector);
				} 			
				);*/
		}
		if (filterType == 'brands') {
			var selector=this.state.selector;
			selector.section_ID = this.props.match.params.sectionID;
			selector.price = this.state.price;
			selector.brands = brands;
			
			this.setState({	selector: selector },()=>{
				this.getFilteredProducts(this.state.selector);
			})
			/*this.setState(
				{	selector:
					{ 
						sectionID 		: this.props.match.params.sectionID,
						categoryID 		: this.state.selector.categoryID,
						subcategoryID   : this.state.selector.subcategoryID,
						brands 			: brands,
						size 			: this.state.selector.size,	
						color 			: this.state.selector.color,
						price 			: this.state.selector.price		
					}
				},()=>{
					this.getFilteredProducts(this.state.selector);
				});*/
		}
		if (filterType == 'price') {
			var minPrice = selecteditems.min;
			var maxPrice = selecteditems.max;

			var selector=this.state.selector;
			selector.section_ID = this.props.match.params.sectionID;
			
			this.setState({price: {min: minPrice, max: maxPrice } }, ()=>{
				selector.price = this.state.price;
				this.setState({	selector: selector },()=>{
					this.getFilteredProducts(this.state.selector);
				})
			});

			

			// this.setState(
			// 	{	selector:
			// 		{ 
			// 			sectionID 		: this.props.match.params.sectionID,
			// 			categoryID 		: this.state.selector.categoryID,
			// 			subcategoryID   : this.state.selector.subcategoryID,
			// 			brands 			: brands,
			// 			size 			: this.state.selector.size,	
			// 			color 			: this.state.selector.color,
			// 			price 			: { min: minPrice, max: maxPrice } 	
			// 		}
			// 	},()=>{
			// 		this.getFilteredProducts(this.state.selector);
			// 	});
		}
		if (filterType == 'color') {
			$('.color-option').css('box-shadow','0px 0px 0px 0px #888888');
			$(selecteditems.currentTarget).find('.color-option').css('box-shadow','0px 0px 1px 4px #888888');
			console.log($(selecteditems.currentTarget).find('.color-option'))
			var selector=this.state.selector;
			selector.section_ID = this.props.match.params.sectionID;
			selector.price = this.state.price;
			selector.color = $(selecteditems.currentTarget).find('.color-option').data('color');
			this.setState({	selector: selector },()=>{
				this.getFilteredProducts(this.state.selector);
			})
			/*this.setState(
				{	selector:
					{ 
						sectionID 		: this.props.match.params.sectionID,
						categoryID 		: this.state.selector.categoryID,
						subcategoryID   : this.state.selector.subcategoryID,
						brands 			: brands,
						size 			: this.state.selector.size,	
						color 			: $(selecteditems.currentTarget).find('.color-option').data('color'),
						price 			: this.state.selector.price	 	
					}
				},()=>{
					this.getFilteredProducts(this.state.selector);
				});*/
		}
		if (filterType == 'size') {
			var selector=this.state.selector;
			selector.section_ID 	= this.props.match.params.sectionID;
			selector.price 		= this.state.price;
			selector.size 	= $(selecteditems.currentTarget).val();

			this.setState({	selector: selector },()=>{
				this.getFilteredProducts(this.state.selector);
			})
			/*this.setState(
				{	selector:
					{ 
						sectionID 		: this.props.match.params.sectionID,
						categoryID 		: this.state.selector.categoryID,
						subcategoryID   : this.state.selector.subcategoryID,
						brands 			: brands,
						size 			: $(selecteditems.currentTarget).val(),	
						color 			: this.state.selector.color,
						price 			: this.state.selector.price	
					}
				},()=>{
					this.getFilteredProducts(this.state.selector);
				});*/
		}
	}
	getFilteredProducts(selector){
		if ($('.limitProducts').val()) {
			selector.limit = $('.limitProducts').val();
		}else{
			selector.limit = "10";
		}
		

		axios.post("/api/products/post/list/filterProducts/",selector)

	      	.then((response)=>{ 
	      		this.setState({products :response.data});
	      	})
	      	.catch((error)=>{
	            console.log('error', error);
	      	})
	}
	filterProducts(subcategoryID,selectedbrands,price,color,size){
		console.log('masterproducts',this.state.masterproducts);
		console.log('subcategoryID',subcategoryID);
		console.log('selectedbrands',selectedbrands);
		console.log('price',this.state.price);
		
		if (subcategoryID != '') { 

			var products = this.state.masterproducts.filter( (array_el)=>  {
              return subcategoryID == array_el.subCategory_ID 
              && Number(array_el.discountedPrice) > Number(this.state.price.min) 
              && Number(array_el.discountedPrice) < Number(this.state.price.max);
        	});
        	this.setState({products :products});
		}
		if(selectedbrands.length > 0 && subcategoryID != ''){
			var products = this.state.masterproducts.filter( (array_el)=>  {
				return selectedbrands.filter( (selectedItems_el) => {
                  return selectedItems_el == array_el.brand 
                  	&& subcategoryID == array_el.subCategory_ID
                  	&& Number(array_el.discountedPrice) > Number(this.state.price.min) 
              		&& Number(array_el.discountedPrice) < Number(this.state.price.max);
                }).length != 0
        	});
        	this.setState({products :products})
		}
		if (subcategoryID == '') {
			
			var products = this.state.masterproducts.filter( (array_el)=>  {
              return Number(array_el.discountedPrice) > Number(this.state.price.min) 
              && Number(array_el.discountedPrice) < Number(this.state.price.max);
        	});
         	this.setState({products :products});
		}
		if (subcategoryID == '' && selectedbrands.length > 0) {
			var products = this.state.masterproducts.filter( (array_el)=>  {
				return selectedbrands.filter( (selectedItems_el) => {
                  return selectedItems_el == array_el.brand
                  	&& Number(array_el.discountedPrice) > Number(this.state.price.min) 
              		&& Number(array_el.discountedPrice) < Number(this.state.price.max);
                }).length != 0
        	});
        	this.setState({products :products});
		}
		else{

		}
	}
	getBrands(){
		axios.get("/api/products/get/listBrand/"+this.props.match.params.sectionID)

	      	.then((response)=>{ 
	      	
	          this.setState({
	              brands : response.data
	          })
	      	})
	      	.catch((error)=>{
	            console.log('error', error);
	      	})
	}
	getSize(){
		axios.get("/api/products/get/listSize/"+this.props.match.params.sectionID)

	      	.then((response)=>{ 
	      	
	          this.setState({
	              sizes : response.data
	          })
	      	})
	      	.catch((error)=>{
	            console.log('error', error);
	      	})
	}
	getColor(){
		axios.get("/api/products/get/listColor/"+this.props.match.params.sectionID)

	      	.then((response)=>{ 
	      	
	          this.setState({
	              colors : response.data
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
		      	},()=>{
		      		console.log('target',Number(target.value))
		      		if ( Number(target.value) < this.state.minPriceLmt) {
		      			this.setState({
		          		price: { min : Number(this.state.minPriceLmt), max : Number(this.state.price.max) } });
	      			}else{
	      				var selector=this.state.selector;
						selector.section_ID = this.props.match.params.sectionID;
						selector.price = this.state.price;
							this.setState({	selector: selector },()=>{
								this.getFilteredProducts(this.state.selector);
							})
	      			}
		      		
				});
	      	//}
	      	 
	      }
	      if (name == 'slider_max') {
	      	if (Number(target.value) == this.state.maxPriceLmt) {

	      	}else{
		      	this.setState({
		          price: { min : Number(this.state.price.min),  max : Number(target.value)}
		      	},()=>{
		      		var selector=this.state.selector;
					selector.section_ID = this.props.match.params.sectionID;
					selector.price = this.state.price;
						this.setState({	selector: selector },()=>{
							this.getFilteredProducts(this.state.selector);
						})
		      	}); 
		    }
	      	
	      }
	}
	getWishData(){
		var user_ID = localStorage.getItem('user_ID');
		axios.get('/api/wishlist/get/userwishlist/'+user_ID)
		.then((response)=>{
		  this.setState({
			wishList : response.data
		  },()=>{
		  })
		})
		.catch((error)=>{
		  console.log('error', error);
		})
	  }
  	render() {
		
    	var tempdata = [1,2,3]
		let minPrice = this.state.price.min;
		let maxPrice = this.state.price.max;
		return (
	      	<div className="container" id="containerDiv">
	     	 <div className="row"> 

	     	 	<div>		
	     		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

	     			<ul className="links">
				    	<li><a  href="/">Home /</a></li>
				    	{ this.state.categoryDetails[0] ? 
				    		<li><a  href={"/section/"+this.state.categoryDetails[0].section.replace(/\s+/g, '-').toLowerCase()+'/'+this.state.categoryDetails[0].section_ID}>
				    		{this.state.categoryDetails[0].section}</a></li>
				    		: ""
				    	}
				    	{
				    	/*<li><a href={"/product-collage/"+this.state.categoryDetails._id}>{this.state.categoryDetails && this.state.categoryDetails.category}</a></li>*/
				  		}
				  	</ul>
				</div>	
               {/*for sm and xs*/}

                  <div className="hidden-lg hidden-md col-sm-12 col-xs-12 menudiv1">
                    <div className="hidden-lg menudiv hidden-md col-sm-4 col-xs-4">
                      <div className="dropdown">
					    <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Menu
					    <span className="caret"></span></button>
					    <ul className="dropdown-menu">
					      	<li className="dropdown-submenu">
					        <a className="test" tabindex="-2" href="#">CATEGORY<span className="caret"></span></a>
					        <ul className="dropdown-menu">
					        {
								this.state.categoryDetails.length > 0  ?
								this.state.categoryDetails.map((data,index)=>{
									return(
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 categoriesContainerEcommerce" key={index} >
											<li>
												<a href="#productDiv" className="subcategory" data-id={data._id} onClick={this.onSelectedItemsChange.bind(this,'category')} style={{fontWeight:"100!important"}}>{data.category}</a>
												<ul>
													{
														data.subCategory.map((subcat,subind)=>{
															return(
																<li>
																<a href="#productDiv" className="subcategory" data-id={subcat._id} onClick={this.onSelectedItemsChange.bind(this,'subcategory')} style={{fontWeight:"100!important"}}>{subcat.subCategoryTitle}</a>
																</li>
															);	
														})
													}
													
												</ul>
											</li>
										</div>
									);
								})
								:
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-align-center">
								<li>No data Found</li>
								</div>
							}	
					        </ul>
					      	</li>

					      	{
					      		this.state.categoryDetails[0] && this.state.categoryDetails[0].section != "Grocery" &&
						    <li className="dropdown-submenu">
						        <a className="test" tabindex="-1" href="#">COLOR <span className="caret"></span></a>
						        <ul className="dropdown-menu">

						          {this.state.colors ? 
							      	this.state.colors.map((data,index)=>{
							      		return(
							      		<a href="#" className="col-sm-6 col-xs-6 swatch-option-link-layered" onClick={ this.onSelectedItemsChange.bind(this,"color")}>
	                                    	<div className="color-option" data-color={data} style={{backgroundColor:data}} option-tooltip-value={data} ></div>
	                            		</a>);
							      	})
							      	
							      	: <li>"no data </li>}	

						          {/*<li><a tabindex="-1" href="#">2nd level dropdown</a></li>
						          <li><a tabindex="-1" href="#">2nd level dropdown</a></li>*/}
						        </ul>
						    </li> 
						    }
						    {
					      	this.state.categoryDetails[0] && this.state.categoryDetails[0].section != "Grocery" &&
						       	<li className="dropdown-submenu">
						        <a className="test" tabindex="-1" href="#">SIZE <span className="caret"></span></a>
						        <ul className="dropdown-menu">
						         <select className="sortProducts" onChange={ this.onSelectedItemsChange.bind(this,"size")}>
						          {this.state.sizes ? 
							      	this.state.sizes.map((data,index)=>{
							      		return(<option value={data}>{data}</option>);
							      	  })
							      	: ''}
							      	</select>

						          {/*<li><a tabindex="-1" href="#">2nd level dropdown</a></li>
						          <li><a tabindex="-1" href="#">2nd level dropdown</a></li>*/}
						        </ul>
						      	</li>
					      }
					    </ul>
					  </div>		
			          </div> 
			           <div className="hidden-lg  hidden-md col-sm-4 col-xs-4 pull-right">
			            <div className="dropdown">
			              <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Menu1
						   <span className="caret"></span></button>
						    <ul className="dropdown-menu">
						     <li className="dropdown-submenu">
						        <a className="test" tabindex="-2" href="#">Featured Brands<span className="caret"></span></a>
						        <ul className="dropdown-menu">

						        { this.state.brands && this.state.brands.length > 0 ? 
								this.state.brands.map((data,index)=>{											
									return(
									<div className="hidden-lg hidden-md col-sm-6 col-xs-6 " key={index}>
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
						       </ul>
						      </li>
						    </ul>
			             </div>
			           </div>
			          </div> 


         {/*for lg and md*/}
			{
			this.state.categoryDetails.length > 0	?		
              <div className="col-lg-3 col-md-3 hidden-sm hidden-xs">
              		<div className="nb-brand">
						<div className="accordion" id="accordionExample">
						   <div className="card-header" id="headingOne">
						    <div className="pagefilter" data-toggle="collapse" data-target="#collapseOne" >	
						        <button className="btn btn-link" type="button" >
						          CATEGORY 
						        </button>
						        <span className="expand"><i className="fa fa-plus"></i></span>
						    </div>
						   </div>
						    <div id="collapseOne" className="collapse">
						      <div className="card-body">
						      	{
									this.state.categoryDetails.length > 0  ?
									this.state.categoryDetails.map((data,index)=>{
										return(
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 categoriesContainerEcommerce" key={index} >
												<li>
													<a href="#productDiv" className="subcategory" data-id={data._id} onClick={this.onSelectedItemsChange.bind(this,'category')} style={{fontWeight:"100!important"}}>{data.category}</a>
													<ul>
														{
															data.subCategory.map((subcat,subind)=>{
																return(
																	<li>
																	<a href="#productDiv" className="subcategory" data-id={subcat._id} onClick={this.onSelectedItemsChange.bind(this,'subcategory')} style={{fontWeight:"100!important"}}>{subcat.subCategoryTitle}</a>
																	</li>
																);	
															})
														}
														
													</ul>
												</li>
											</div>
										);
									})
									:
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-align-center">
									<li>No data Found</li>
									</div>
								}
						      </div>
						    </div>
							{
								this.state.categoryDetails[0] && this.state.categoryDetails[0].section != "Grocery" &&
								<div className="card-header" id="headingTwo">
						      <div className="pagefilter" data-toggle="collapse" data-target="#collapseTwo" >	
						        <button className="btn btn-link" type="button" >
						          COLOR 
						        </button>
						        <span className="expand"><i className="fa fa-plus"></i></span>
						     </div>
						    </div>
							}
						    

						    <div id="collapseTwo" className="collapse" >
						      <div className="card-body">
						      <br/>
						      {this.state.colors ? 
						      	this.state.colors.map((data,index)=>{
						      		return(
						      		<a href="#" className="swatch-option-link-layered" onClick={ this.onSelectedItemsChange.bind(this,"color")}>
                                    	<div className="color-option" data-color={data} style={{backgroundColor:data}} option-tooltip-value={data} ></div>
                            		</a>);
						      	})
						      	
						      	: ''}	
						      </div>
						    </div>
						
							{
					      	this.state.categoryDetails[0] && this.state.categoryDetails[0].section != "Grocery" &&
						    <div className="card-header" id="headingFour">
						      <div className="pagefilter" data-toggle="collapse" data-target="#collapseFour" >	
						        <button className="btn btn-link" type="button" >
						          SIZE
						        </button>
						        <span className="expand"><i className="fa fa-plus"></i></span>
						      </div>
						    </div>
							}
						    <div id="collapseFour" className="collapse" >
						      <br/>
						      <div className="card-body">
							    <select className="sortProducts" onChange={ this.onSelectedItemsChange.bind(this,"size")}>
							      {this.state.sizes ? 
							      	this.state.sizes.map((data,index)=>{
							      		return(<option value={data}>{data}</option>);
							      	  })

							      	: ''}
							      	
	                            </select>	
						      </div>
						    </div>

						    <div className="card-header" id="headingThree">
						      <div className="pagefilter"  data-toggle="collapse" data-target="#collapseThree">	
						        <button className="btn btn-link" type="button">
						          PRICE
						        </button>
						        <span className="expand"><i className="fa fa-plus"></i></span>
						      </div>
						    </div>
						    <div id="collapseThree" className="collapse" >
						      <div className="card-body">
						      	<InputRange
							        maxValue={this.state.maxPriceLmt}
							        minValue={this.state.minPriceLmt}
							        value={this.state.price}
							        onChange={ this.onSelectedItemsChange.bind(this,"price")} />
							        <label>Min </label>
							        <input className="input-field min-value" type="text" id="slider_min" name="slider_min" placeholder="From" value={this.state.price.min} onChange={this.handlePriceChange} /> &nbsp;
							        <label>Max </label><input className="input-field max-value" type="text" id="slider_max" name="slider_max" placeholder="To" value={this.state.price.max} onChange={this.handlePriceChange} />
						      </div> 
						    </div>
						 </div>
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
              </div> : ""
          	}
              	{ 
              		this.state.loading ? 
              		<div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 col-lg-offset-3" id="productDiv">
              			<Loader type="collageloader" productLoaderNo = {8}/> 
			        </div>  
			          :
              		this.state.products.length > 0 ? 
	              <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12" id="productDiv">
					<br/>
					  <div className="tab-content">
					    <div id="products" className="tab-pane fade in active">
					    	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding content">
					    	{
					    		<ProductCollageView
					    		products={this.state.products} 
					    		categoryDetails={this.state.categoryDetails} 
					    		getWishData={this.getWishData.bind(this)} wishList={this.state.wishList}
					    		getFilteredProductsFun = {this.getFilteredProducts.bind(this)}
					    		parameters={this.props.match.params} 
					    		selector={this.state.selector}/>
					    	}		
					     	</div>
					    </div>
					    <div id="categories" className="tab-pane fade">
					    	Categories 
					    </div>
					  </div>
	              </div>
              	: <div className="text-center"><img src="/images/noproducts.jpeg" /></div>
          		}
              </div>
            
             </div>
	     	</div>
	    )
	}
}  	
export default ProductCollage;