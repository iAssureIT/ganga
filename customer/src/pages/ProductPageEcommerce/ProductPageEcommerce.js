import React,{Component} 	from 'react';
import $ 				 	from 'jquery';
import ProductCollageEcommerce 		from "../../blocks/ProductCollage/ProductCollageEcommerce.js";
import Pagination 			from "react-js-pagination";
import axios                from 'axios';

import './ProductPageEcommerce.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
require("bootstrap/less/bootstrap.less");

axios.defaults.baseURL = 'http://gangaexpressapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';
class ProductPageEcommerce extends Component {
	constructor(props){
		super(props);
		this.state = {
			masterproducts:[],
			products:[],
			brands:[],
			categories:[],
			subcategories:[],
			categoryID:'',
			categoryDetails:[],
			subcategoryID:'',
			dupliImage:[],
      		activePage: 1,
      		selectedbrands:[],
      		minPrice: 0,
      		maxPrice: 0,
		}
	}
	handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  	}
	componentDidMount(){
		this.setState({categoryID : this.props.match.params.categoryID})
		this.getProductsByCategory(this.props.match.params.categoryID);
		this.getCategoryDetails(this.props.match.params.categoryID);
		this.getBrands();
		var x = document.getElementsByClassName("add");
		  var acc = document.getElementsByClassName("accordion");
		  console.log('acc', acc.length);
		var i;

		for (i = 0; i < acc.length; i++) {
		  acc[i].addEventListener("click", function() {
			console.log('click');
		    this.classList.toggle("active");

		    var panel = this.nextElementSibling;
		    if (panel.style.display === "block") {
		      panel.style.display = "none";
		    } else {
		      panel.style.display = "block";
		    }
		  });
		}
  		
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
	getProductsBySubcategory(event){
		
		this.setState({subcategoryID : $(event.target).data().id},()=>{
			
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
		if (subcategoryID != '') {
			var products = this.state.masterproducts.filter( (array_el)=>  {
              return subcategoryID == array_el.subCategory_ID;
        	});
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
	render() {
		console.log('products', this.state.products)
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop180 mb50 ">
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  backColorPP">
							<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12  ">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite pad10 row mt20 mb20 boxBorder">
									<div className="col-lg-9 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 ">
										<div className="row">
											<div className="plusContainer accordion marginBot sortByCateEcommerce fs14">Subcategory<i className="fa fa-plus-circle pull-right"></i></div>
												<div className="panel myDIV">
												{
										this.state.categoryDetails && this.state.categoryDetails.subCategory !== undefined ?
										this.state.categoryDetails.subCategory.map((data,index)=>{
											
											return(
													
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 categoriesContainerEcommerce" key={index} >
													<div className="row">
													<div className="plusContainer accordion fs13" data-id={data._id} onClick={this.onSelectedItemsChange.bind(this,'subcategory')}>{data.subCategoryTitle}</div>
													</div>
												</div>

											);

										})
										:
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-align-center">
										<h5>No DbackColorWhiteata Found</h5>
										</div>
									}
												</div>	
										</div>
									</div>
									<div className="col-lg-9 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
										<div className="row">
											<div className="plusContainer accordion marginBot sortByCateEcommerce fs14">Brand<i className="fa fa-plus-circle pull-right"></i></div>
												<div className="panel myDIV">
												{
										this.state.brands && this.state.brands.length > 0 ? 
										this.state.brands.map((data,index)=>{
											
											return(
											<div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 ">
												<div className="row">
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
									</div>
									<div className="col-lg-9 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
										<div className="row">

											<div className="plusContainer accordion marginBot sortByCateEcommerce fs14">Price<i className="fa fa-plus-circle pull-right"></i></div>
												<div className="panel myDIV">
												
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
														<div className="row">
																<select className="custom-select  selectCustomEcommerce col-lg-5" onChange={this.onSelectedItemsChange.bind(this,"minPrice")}>
																<option  className="hidden" >Min</option>
																<option>100</option>
																<option>500</option>
																<option>1000</option>
																<option>1500</option>
																<option>2000</option>
																<option>3000</option>
																<option>4000</option>
																<option>5000</option>
																
																</select> 
																<select className="custom-select  selectCustomEcommerce col-lg-5 col-lg-offset-1" onChange={this.onSelectedItemsChange.bind(this,"maxPrice")}>
																<option  className="hidden" >Max</option>
																<option>100</option>
																<option>500</option>
																<option>1000</option>
																<option>1500</option>
																<option>2000</option>
																<option>3000</option>
																<option>4000</option>
																<option>5000</option>
																
																</select>
											
														</div>
										
													</div>		
											</div>		
										</div>		
									</div>		
									<div className="col-lg-9 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
										<div className="row">
											<div className="plusContainer accordion marginBot sortByCateEcommerce fs14">Offers<i className="fa fa-plus-circle pull-right"></i></div>
												<div className="panel myDIV">
													<div className="col-lg-9  col-md-12 col-sm-12 col-xs-12 mt20">
														<div className="row">
																<div className="centreDetailContainerEcommerce col-lg-1 row">

																<input type="checkbox" name="price" disabled/>
																<span className="centreDetailCheckEcommerce"></span>
																</div>
															<span className="centreDetaillistItemEcommerce">Exchange Offers</span>

														</div>
													</div>
												
													<div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 ">
														<div className="row">
																<div className="centreDetailContainerEcommerce col-lg-1 row">

																<input type="checkbox" name="price" disabled/>
																<span className="centreDetailCheckEcommerce"></span>
																</div>
															<span className="centreDetaillistItemEcommerce">No Cost EMI</span>

														</div>
														
													</div>
													<div className="col-lg-9  col-md-12 col-sm-12 col-xs-12 	">
														<div className="row">
																<div className="centreDetailContainerEcommerce col-lg-1 row">

																<input type="checkbox" name="price" disabled/>
																<span className="centreDetailCheckEcommerce"></span>
																</div>
															<span className="centreDetaillistItemEcommerce">Special Price</span>

														</div>
														
													</div>
												</div>
										</div>
									</div>
									<div className="col-lg-9 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 mb20">
											<div className="row">
												<div className="plusContainer accordion marginBot sortByCateEcommerce fs14">Rating<i className="fa fa-plus-circle pull-right"></i></div>
													<div className="panel myDIV">
														<div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 mt20">
															<div className="row">
																 <div className="centreDetailContainerEcommerce col-lg-1 row">

						                                            <input type="radio" name="price" disabled/>
						                                            <span className="radioCheckEcommerce"></span>
					                                         	 </div>
					                                         	<span className="centreDetaillistItemEcommerce">4 <i class="fa fa-star"></i> & above</span>
					                                         	
															</div>
															
														</div>
														<div className="col-lg-9  col-md-12 col-sm-12 col-xs-12 ">
															<div className="row">
																 <div className="centreDetailContainerEcommerce col-lg-1 row">

						                                            <input type="radio" name="price"disabled/>
						                                            <span className="radioCheckEcommerce"></span>
					                                         	 </div>
					                                         	<span className="centreDetaillistItemEcommerce">3 <i class="fa fa-star"></i> & above</span>
					                                         	
															</div>
															
														</div>
														<div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 ">
															<div className="row">
																 <div className="centreDetailContainerEcommerce col-lg-1 row">

						                                            <input type="radio" name="price"disabled/>
						                                            <span className="radioCheckEcommerce"></span>
					                                         	 </div>
					                                         	<span className="centreDetaillistItemEcommerce">2 <i class="fa fa-star"></i> & above</span>
					                                         	
															</div>
															
														</div>
														<div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 ">
															<div className="row">
																 <div className="centreDetailContainerEcommerce col-lg-1 row">

						                                            <input type="radio" name="price"disabled/>
						                                            <span className="radioCheckEcommerce"></span>
					                                         	 </div>
					                                         	<span className="centreDetaillistItemEcommerce">1 <i class="fa fa-star"></i> & above</span>
					                                         	
															</div>
															
														</div>
													</div>
												</div>
											</div>
								</div>
							</div>
							<div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 boxBorder backColorWhite mt20 mb20">
								<div className="row">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
										<div className="row">
										<div className="col-lg-12  col-md-12 col-sm-12 col-xs-12  ">
											<div className="row">
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row ">
											<span className="headSubEcommerce" style={{display:"none"}}><b>Subcategories</b></span>
											</div>									
												{
													this.state.subcategories.map((subcategory,index)=>{
														return(
																<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 mt20 subcategoriesPicEcommerce" key={index} >
																	<div className="row">
																		<div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 backImgSub ">
																			<img src="/images/electronic.jpg" data-id={subcategory._id} onClick={this.getProductsBySubcategory.bind(this)}/>
																		</div>
																		<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backLabelSubEcommerce">
																			{subcategory.subCategoryTitle}
																		</label>
																	</div>
																</div>
															)
														})
													}
												
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb20">
										<ProductCollageEcommerce products={this.state.products}/> 
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grayLine"></div>
									<div className="col-lg-8 col-lg-offset-3 col-md-12 col-sm-12 col-xs-12 ">
											<Pagination className={"paginationCustom"}
													activePage={this.state.activePage}
													itemsCountPerPage={10}
													totalItemsCount={450}
													prevPageText={"Previous"}
													nextPageText={"Next"}
													pageRangeDisplayed={10}
													onChange={this.handlePageChange.bind(this)}
													/>
										</div>	
								</div>
							</div>

						</div>
					</div>
                </div>
		);
	}
}

export default ProductPageEcommerce;