import React, { Component } from 'react';
import "./ProductDescriptionEcommerce.css";

export default class ProductDescriptionEcommerce extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
  	}  
  render() {
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productDesContainer">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
						<div className="container ">
						
						  <ul className="nav nav-pills customPillsEcommerceDescription">
						    <li className="active"><a data-toggle="pill" href="#home">Description</a></li>
						    <li><a data-toggle="pill" href="#menu2">Product Details</a></li>
						    <li><a data-toggle="pill" href="#menu3">Reviews</a></li>
						  </ul>
						  
						  <div className="tab-content borderBottom">
						    <div id="home" className="tab-pane fade in active descriptionDataEcommerce">
						      <p>Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses
						       which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy,
						        chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention.
						       Now Fashion extends to a range of accessories including shoes, hats, belts and more!</p>
						    </div>
						    <div id="menu2" className="tab-pane fade">
						    	<div className="brandImg"><img src="/images/66-home_default.jpg" alt="brand" /></div>
			                                        	
						    	<span className="tableHeadEcommerce">In Stock</span>&nbsp;:&nbsp;<span className="tableHeadEcommerce">112 Items</span><br/>
						    	<span className="tableHeadEcommerce">Data Sheet</span>
						    	<table className="customTableEcommerce">
									<tr>
										<th>Compositions</th>
										<td>Unavailable</td>
									</tr>
									<tr>
										<th>Properties</th>
										<td>Unavailable</td>
									</tr>
									<tr>
										<th>Properties</th>
										<td>Unavailable</td>
									</tr>
								 </table>
														 
						    </div>
						    <div id="menu3" className="tab-pane fade writeReviewTextEcommerce">
						     	<i className="fa fa-pencil" aria-hidden="true"></i>&nbsp; <span data-toggle="modal" data-target="#reviewModal" >Write a review</span>	
						     		<div className="modal fade in " id="reviewModal" role="dialog">
			                          <div className="modal-dialog customWidthModalEcommerce " >
		                                <button type="button" className="close clsBtn" data-dismiss="modal"> <i className="fa fa-times"></i></button>
		                                <form className="formWrapper">
		                                    <div className="col-lg-12 modalHeader">
		                                      <h4 className="">WRITE A REVIEW</h4>
		                                    </div>
		                                    <div className="row"> 
		                                  		<div className=" col-lg-12 col-sm-12 col-xs-12">
			                                        <div className=" col-lg-6  col-md-6  col-sm-6 col-xs-12 mt20 displayImageReview">
			                                        	<img src="/images/chocolate.jpeg" />
			                                        	<span className="nameOfImage  col-lg-12 col-sm-12 col-xs-12"> Brookside Dark Chocolate</span>
			                                        	<span className="descriptionOfProduct col-lg-12 col-sm-12 col-xs-12"> Brookside Dark Chocolate, Pomegranate, 33.3g</span>
			                                        </div>
			                                         <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12 mt20 fnSizeEcommerce">
			                                         	<div className="row">
				                                         	<div className="col-lg-12 col-sm-12 col-xs-12 mt20 ">
				                                         		<div className="row">
							                                         	 <span className="col-lg-3 col-sm-12 col-xs-12 ">Quality : &nbsp;</span>
												                            <div id="ratingReviewForm" className="col-lg-6 col-sm-12 col-xs-12">
													                          <fieldset className="ratingReview stars">
													                              <input type="radio" id="star5" name="ratingReview" value="5" /><label htmlFor="star5"></label>
													                              <input type="radio" id="star4" name="ratingReview" value="4" /><label htmlFor="star4"></label>
													                              <input type="radio" id="star3" name="ratingReview" value="3" /><label htmlFor="star3"></label>
													                              <input type="radio" id="star2" name="ratingReview" value="2" /><label htmlFor="star2"></label>
													                              <input type="radio" id="star1" name="ratingReview" value="1"/><label htmlFor="star1"></label>
													                          </fieldset>
													                          <div className="clearfix "></div>
													                      </div>
					                                         			<div className="col-lg-12 col-sm-12 col-xs-12  ">
					                                         				<div className="">
					                                         					<div className="col-lg-12 col-sm-12 col-xs-12 marginBottom "></div>
													                    	</div>
												                    </div>
											                     </div>
											                </div>
				                                          <span className="col-lg-12 col-sm-12 col-xs-12">Title &nbsp;<span className="asterix">*</span></span>
				                                          <div className="col-lg-12 col-sm-12 col-xs-12 " >
				                                            <input type="text"  className="form-control customInputField"  />
				                                          </div>
				                                          <span className="col-lg-12 col-sm-12 col-xs-12 mt20">Comment &nbsp;<span className="asterix">*</span></span>
				                                          <div className="col-lg-12 col-sm-12 col-xs-12 " >
				                                            <textarea type="text"  className="form-control customInputField"></textarea>
				                                          </div>
				                                           <span className="col-lg-12 col-sm-12 col-xs-12 mt20">Your Name &nbsp;<span className="asterix">*</span></span>
				                                          <div className="col-lg-12 col-sm-12 col-xs-12 " >
				                                            <input type="text"  className="form-control customInputField"  />
				                                          </div>
				                                        </div>
			                                        </div>
		                                      	</div> 
		                                    </div>
		                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-10 mt20 borderTop">
		                                        <button className=" col-lg-2  col-md-2 col-sm-2 col-xs-2 submitButtonEcommerce pull-right" > Submit</button>
		                                        <button className=" col-lg-2  col-md-2 col-sm-2 col-xs-2 cancelButtonEcommerce pull-right" data-dismiss="modal" > Cancel</button>
		                                    </div>
                                 		</form>
			                          </div>
                        			</div>					    
						   		</div>
						 	</div>
						</div>
					</div>
				</div>
		);
	}
}
