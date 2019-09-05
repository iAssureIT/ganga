import React, { Component } 		from 'react';
import $ 				 			from 'jquery';

import "./ProductView.css";


export default class ProductView extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	"subImgArray":[],
	    };
    this.changeImage = this.changeImage.bind(this); 
  	}  

  	componentDidMount()
  	{
  		var imageArray=[
			{"image":"/images/45-home_default.jpg"},
			{"image":"/images/41-home_default.jpg"},
			{"image":"/images/32-home_default.jpg"},
			{"image":"/images/45-home_default.jpg"},
  		]
  	}
  	 changeImage = ()=>{
        document.getElementById('change-image').src='/images/65-home_default.jpg';
        document.getElementById('change-image1').src='/images/65-home_default.jpg';
  }
  render() {
 
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

						<div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 ">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imageContainer">
								<div className="row">
									<img src="/images/66-home_default.jpg" id="change-image" alt="default"/>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 onHoverDiv" data-toggle="modal" data-target="#myModal"><i className="fa fa-search-plus"></i></div>
								 	<div className="modal fade in " id="myModal" role="dialog">
			                          <div className="modal-dialog modal-lg " >
		                                <button type="button" className="close" data-dismiss="modal"> <i className="fa fa-times"></i></button>
		                                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 backOfModal " >
		                              		<img src="/images/66-home_default.jpg" id="change-image1"/>
		                              	</div>
		                              	<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 suggestedDiv" onClick={this.changeImage}>
		                              		<img src="/images/65-home_default.jpg"/>
		                              	</div>
			                          </div>
                        			</div>
								</div>
							</div>
						{/*Use Map Here*/}
							<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 subImg1" onClick={this.changeImage}>
								<div className="row">
									<img src="/images/65-home_default.jpg" alt="default"/>
								</div>
							</div>
							<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 subImg1" onClick={this.changeImage}>
								<div className="row">
									<img src="/images/66-home_default.jpg" alt="default"/>
								</div>
							</div>
						</div>
						<div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 ">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productInfo">
								<div className="row">
									<label>Capsicum</label><br/>
									 <div id="status"></div>
				                      <div id="ratingForm">
				                      	<span className="pull-left pad10">Rating </span>
				                          <fieldset className="rating stars">
				                              <input type="radio" id="star5" name="rating" value="5" /><label htmlFor="star5"></label>
				                              <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="star4"></label>
				                              <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="star3"></label>
				                              <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="star2"></label>
				                              <input type="radio" id="star1" name="rating" value="1"/><label htmlFor="star1"></label>
				                          </fieldset>
				                          <div className="clearfix "></div>
				                      </div><br/>
									<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 reviewsDiv row">
										<i className="fa fa-comments" aria-hidden="true"></i>&nbsp;	Read reviews (1)
									</div>
									<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 writeReview">
										<i className="fa fa-pencil" aria-hidden="true"></i>&nbsp; Write a review
									</div><br/>
									<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 writeReview">
									</div>
									<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 priceDiv">
										<div className="row">
										<span className="price" >$16.51</span>
										</div>
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
										<div className="row">
										<span className="itemDesc">Capsicum, the pepper, is a genus of flowering plants in the nightshade family Solanaceae. Its species are native to the Americas, where they have been cultivated for thousands of years. Following the Columbian Exchange, 
										it has become cultivated worldwide. 
										</span>
										</div>
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 otherOperation">
										<div className="row">
										  	<div className="col-lg-3 col-sm-12 col-md-6 col-xs-6 ">
										  		<div className="row">
					                              <select className="custom-select form-control selectCustom">
					                                <option  className="hidden" >-- Select Size --</option>
					                                <option>S</option>
					                                <option>M</option>
					                                <option>L</option>
					                              </select>
					                             </div>
				                            </div>
				                            <div className="col-lg-1 col-sm-2 col-md-1 col-xs-2 ">
				                             	<div className="col-lg-6 col-sm-12 col-md-12 col-xs-12 colorDiv">
				                            	</div>
				                            </div>
				                            <div className="col-lg-1 col-sm-2 col-md-1 col-xs-2 row">
				                             	<div className="col-lg-6 col-sm-12 col-md-12 col-xs-12 colorDiv colorDiv2">
				                            	</div>
				                            </div>
										</div>
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 adCart">
										<div className="row">
										  	<div className="col-lg-3 col-sm-12 col-md-12 col-xs-12 itemCounter ">
										  		<div className="row">
										  			<div className="col-lg-4 col-sm-12 col-md-12 col-xs-12 divContain">
										  				<i className="fa fa-plus" aria-hidden="true"></i>
										  			</div>
										  			<div className="col-lg-4 col-sm-12 col-md-12 col-xs-12 divContain">
														3
										  			</div>
										  			<div className="col-lg-4 col-sm-12 col-md-12 col-xs-12 divContain noRightBor">
														<i className="fa fa-minus"></i>		
													</div>
					                             </div>
				                            </div>
				                            <div className="col-lg-3 col-sm-12 col-md-12 col-xs-12  ">
				                            	<div className="row">
				                            	<div className="col-lg-11 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 addToCart ">
									  				<i className="fa fa-shopping-cart"></i>&nbsp;
													ADD TO CART
												</div>
												</div>
				                            </div>
				                             <div className="col-lg-2 col-sm-12 col-md-12 col-xs-12 row">
				                            	<div className="col-lg-5 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 wishList">
									  				<i className="fa fa-heart"></i>&nbsp;
												</div>
				                            </div>
											<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 stockInfo row">
								  				<i className="fa fa-check"></i>&nbsp; In Stock
											</div>
				                        </div>
									</div>
								</div>
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 policies">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 securityPolicy pad50">
								<img src="/images/sheild.png"/>&nbsp;&nbsp;Security policy (edit with Customer reassurance module)
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 deliveryPolicy ">
								<img src="/images/transport.png"/>&nbsp;&nbsp;Delivery policy (edit with Customer reassurance module)
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 returnPolicy ">
								<img src="/images/return.png"/>&nbsp;&nbsp; Return policy (edit with Customer reassurance module)
								</div>
							</div>
						</div>
					</div>
                </div>
		);
	}
}
