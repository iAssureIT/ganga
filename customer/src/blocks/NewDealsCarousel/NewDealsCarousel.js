import React, { Component } from 'react';
import $ 				 from 'jquery';
import OwlCarousel 		 from 'react-owl-carousel';
import "./NewDealsCarousel.css";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default class NewDealsCarousel extends Component {

	BlogsData(){
        return [
            {
                image      	:"/images/pinkBag.jpg",
                name  		: "Pink Lather Bag",
                price 		: "$1.61",
                desc        : "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs.",
                imag1      	:"/images/bag1.jpg",

            }, {
                image      	:"/images/miniImageFlip1.jpg",
                imag1      	:"/images/bag1.jpg",
                name  		: "Lather Shoe",
                desc        : "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs.",
                price 		: "$1.61",
               
            }, {
                image      	:"/images/miniImageFlip.jpg",
                imag1      	:"/images/bag1.jpg",
                name  		: "Lather Shoe",
                desc        : "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs.",
                price 		: "$1.61",
               
            }, {
                image      	:"/images/miniImageFlip1.jpg",
                name  		: "Lather Shoe",
                price 		: "$1.61",
                desc        : "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs.",
                imag1      	:"/images/bag1.jpg",

            }, {
                image      	:"/images/miniImageFlip.jpg",
                name  		: "Lather Shoe",
                price 		: "$1.61",
                desc        : "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs.",

                imag1      	:"/images/bag1.jpg",
            }, {
                image      	:"/images/miniImageFlip1.jpg",
                name  		: "Lather Shoe",
                price 		: "$1.61",
                imag1      	:"/images/bag1.jpg",
                desc        : "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs.",

            }
            
            
        ]
    }
  render() {
		return (			
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="col-lg-12 mt30">
										
										<div id="owl-demo" className="owl-carousel owl-theme " >
										
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

											<OwlCarousel
											    className="owl-theme customnNavButton"
											    loop
											    margin={5}
											    items={4}
											    nav
											>

											{
											this.props.featuredProducts && this.props.featuredProducts.length > 0 ?
											this.props.featuredProducts.map((data, index)=>{
												return(
												    <div class="item ">
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogs">
																<div className="">
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ecommerceProduct ">
																		<div className="row">
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
												                      <label className="pull-right priceDivProduct"><i className={"fa fa-"+data.currency}> </i>{data.offeredPrice}</label><br/>
																		<span className="col-lg-12 row">{data.productName}</span>
																	</div>
																</div>
														</div>
													</div>
												);
												})
												: ''										   
											}
										    
										</OwlCarousel>
									</div>
										
										</div>
									</div>
								</div>
							</div>
		);
	}
}



