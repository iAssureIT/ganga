import React, { Component } from 'react';
import $ 				 from 'jquery';
import OwlCarousel 		 from 'react-owl-carousel';
import "./ShopByCategoriesCarousel.css";
import axios                  		from 'axios';

axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default class ShopByCategoriesCarousel extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    };
  	}
  	
  render() {
  	console.log("data in --------------->>>>>>>>>>",this.props.newProducts);
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="col-lg-12 mt30">
						<div id="owl-demo" className="owl-carousel owl-theme " >
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						{
							this.state.newProducts && this.state.newProducts.length > 0 ?
							this.state.newProducts.map((data, index)=>{
								return(
								    <div class="item ">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogs">
												<div className="">
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ecommerceProduct ">
														<div className="row">
														{
                            								data.offered == "true" ?
															<div className="row">
																<div className="offerDetails col-lg-6">Offer Price </div>
																<div className="offerDetails col-lg-6 "><span className="pull-right"><i className="fa fa-inr"></i>{data.offeredPrice}</span></div>
															</div>
															:
															null
														}
															<img src={data.productImage[0]}  alt="blog1"/>
															<span className="backColorTras">
							                           			<a href="#" data-toggle="tooltip" title="Add to cart"><span className="iconContainer"><i className="fa fa-shopping-cart onTransDivElement"></i></span></a>
							                           			<a href="#" data-toggle="tooltip" title="Add to fevroite"><span className="iconContainer" ><i className="fa fa-heart onTransDivElement"></i></span></a>
							                           			<a href="#" data-toggle="tooltip" title="View product"><span className="iconContainer"><i className="fa fa-eye onTransDivElement"></i></span></a>
							                           		</span>
														</div>
														<div id="" className="col-lg-6 col-sm-12 col-xs-12 row">
								                          <fieldset className="ratingReview stars ">
								                              <input type="radio" id="star5" name="ratingReview" value="5" /><label htmlFor="star5"></label>
								                              <input type="radio" id="star4" name="ratingReview" value="4" /><label htmlFor="star4"></label>
								                              <input type="radio" id="star3" name="ratingReview" value="3" /><label htmlFor="star3"></label>
								                              <input type="radio" id="star2" name="ratingReview" value="2" /><label htmlFor="star2"></label>
								                              <input type="radio" id="star1" name="ratingReview" value="1"/><label htmlFor="star1"></label>
								                          </fieldset>
								                          <div className="clearfix "></div>
								                      </div>
								                      <label className="pull-right priceDivProduct"><i className={"fa fa-"+data.currency}> </i>{data.actualPrice}</label><br/>
														<span className="col-lg-12 row">{data.productName}</span>
													</div>
												</div>
										</div>
									</div>
								);
								})
								: ''										   
							}
						   </div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}



