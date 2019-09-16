import React, { Component } from 'react';
import "./GroceryProductCollageView.css";

export default class GroceryProductCollageView extends Component {
	constructor(props){
    super(props);
	   
  	}  
  render() {
		return (
			<div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 card">
                <div className="item-top">
                	<div className="productImg">
                		<a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/iphone-7.html" className="product photo product-item-photo" tabindex="-1">
							<img src="http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media/catalog/product/cache/2/small_image/160x/925f46717e92fbc24a8e2d03b22927e1/i/p/ip2.jpg" />
						</a>
						<div className="hoveractions">
							<div className="col-lg-12">  
                                <ul>
                                    <li ><a className="circle spin" href="#"> <i className="fa fa-search viewDetail"></i></a></li>
                                    <li><a className="circle spin" href="#"> <i className="fa fa-refresh addTOCompare"></i> </a></li>
                                    <li><a className="circle spin" href="#"> <i className="fa fa-heart addTOWishList"></i></a></li>
                                </ul>
                            </div>
						</div>
					
                	</div>
                	<div className="productDetails">

                		<div className="innerDiv">
                			<a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/iphone-7.html" className="product-item-link">
							IPhone 7</a>

							<div className="product-reviews-summary">
							    <div className="rating-summary">
	                                  	<fieldset className="ratingReview stars ">
	                                      <input type="radio" id="star5" name="ratingReview" value="5" /><label htmlFor="star5"></label>
	                                      <input type="radio" id="star4" name="ratingReview" value="4" /><label htmlFor="star4"></label>
	                                      <input type="radio" id="star3" name="ratingReview" value="3" /><label htmlFor="star3"></label>
	                                      <input type="radio" id="star2" name="ratingReview" value="2" /><label htmlFor="star2"></label>
	                                      <input type="radio" id="star1" name="ratingReview" value="1"/><label htmlFor="star1"></label>
	                                  	</fieldset>
	                                  <div className="clearfix "></div>
							    </div>
							</div>
							<div > 
								<span className="priceg">$200.00</span> &nbsp;
								<span className="oldpriceg">$230.00</span> 
							</div>
							<div className="actionsg">
								<button type="submit" title="Add to Cart" className="actiontocart primary ">
									<span><i className="fa fa-shopping-cart"></i>&nbsp;Add to Cart</span>
								</button>
							</div>
                		</div>
                	
                	</div>
                </div>
        	</div>   	
		);
	}
}
