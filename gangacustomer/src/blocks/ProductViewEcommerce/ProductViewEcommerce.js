import React, { Component } from 'react';
import $ from 'jquery';
import { bindActionCreators } from 'redux';
import { getCartData } from '../../actions/index';
import axios from 'axios';
import "./ProductViewEcommerce.css";
import _ from 'underscore';
import { connect } from 'react-redux';
import Message from '../Message/Message.js';
import ReactImageZoom from 'react-image-zoom';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Loadable from 'react-loadable';
import ProductViewEcommerceDetailsReviewFAQ from "../../blocks/ProductViewEcommerceDetailsReviewFAQ/ProductViewEcommerceDetailsReviewFAQ.js";

const OwlCarousel = Loadable({
	loader: () => import('react-owl-carousel'),
	loading() {
		return <div className="col-sm-12 col-xs-12 col-lg-2 col-lg-offset-5 col-md-12 loadingImg"><img src="../images/loadersglms.gif" className="img-responsive" alt="loading" /></div>
	}
});
const user_ID = localStorage.getItem("user_ID");
class ProductViewEcommerce extends Component {
	constructor(props) {
		super(props);
		this.state = {
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				1000: {
					items: 5
				}
			},
			"productData": [],
			"subImgArray": [],
			"totalQuanity": 1,
			"quanityLimit": 5,
			"reviewData" : [],
			"imgsrc": "",
			"wishIconClass" : "viewWishList",
			"wishTooltip"   : "Add to wishlist",
		};
		this.changeImage = this.changeImage.bind(this);
	}

	async componentDidMount(){
		await this.props.fetchCartData(); 
		axios.get("/api/products/get/one/" + this.props.productID)
		.then((response) => {
			this.setState({
				productData: response.data,
				selectedImage: response.data.productImage[0],
				quanityLimit: response.data.availableQuantity
			})
			this.forceUpdate();
		})
		.catch((error) => {
			console.log('error', error);
		})
		this.getWishData();
		this.reviewAverage();
		this.getMyReview();
	}
	getWishData(){
		const userid = localStorage.getItem('user_ID');
		
		axios.get("/api/wishlist/get/one/productwish/"+userid+"/" + this.props.productID)
		.then((response) => {
			
			this.setState({
				wishIconClass : response.data ? "viewWishListActive" : "viewWishList",
				wishTooltip   : response.data ? "Remove from wishlist" : "Add to wishlist",
			})
		})
		.catch((error) => {
			console.log('error', error);
		})
	}
	changeImage = (event) => {
		this.setState({
			selectedImage: event.target.src
		}, () => {

		});
	}
	
	addtocart = (event) => {
		// const token = localStorage.getItem("token");
		//   if(token!==null){
		//   // browserHistory.push("/");
		//   this.props.history.push("/");
		// }
		// else{
		// 	  this.props.history.push("/login");
		// }
		event.preventDefault();
		if (user_ID) {

			var id = event.target.id;
			axios.get('/api/products/get/one/' + id)
				.then((response) => {
					var totalForQantity = parseInt(Number(this.state.totalQuanity) * response.data.discountedPrice);
					const userid = localStorage.getItem('user_ID');
					var availableQuantity = response.data.availableQuantity;
					var recentCartData = this.props.recentCartData ? this.props.recentCartData[0].cartItems : [];
					var productCartData = recentCartData.filter((a)=>a.product_ID == id);
					var quantityAdded = productCartData.length>0 ? productCartData[0].quantity : 0;
					var productName = response.data.productName;
					console.log('abc', availableQuantity, quantityAdded);


					this.props.fetchCartData();
					const formValues = {
						"user_ID": userid,
						"product_ID": response.data._id,
						"currency": response.data.currency,
						"productCode": response.data.productCode,
						"productName": response.data.productName,
						"section_ID": response.data.section_ID,
						"section": response.data.section,
						"category_ID": response.data.category_ID,
						"category": response.data.category,
						"subCategory_ID": response.data.subCategory_ID,
						"subCategory": response.data.subCategory,
						"productImage": response.data.productImage,
						"quantity": this.state.totalQuanity,
						"discountedPrice": parseInt(response.data.discountedPrice),
						"originalPrice": parseInt(response.data.originalPrice),
						"discountPercent" :parseInt(response.data.discountPercent),
						"totalForQantity": totalForQantity,

					}
					if(this.state.totalQuanity >= availableQuantity || quantityAdded >= availableQuantity){
						this.setState({
							messageData : {
							  "type" : "outpage",
							  "icon" : "fa fa-check-circle",
							  "message" : "Last "+availableQuantity+" items taken by you",
							  "class": "success",
							  "autoDismiss" : true
							}
						})
						setTimeout(() => {
							this.setState({
								messageData   : {},
							})
						}, 3000);
					  }else{
						axios.post('/api/carts/post', formValues)
						.then((response) => {
							
							this.props.fetchCartData(); 
							this.setState({
								messageData: {
									"type": "outpage",
									"icon": "fa fa-check-circle",
									"message": "&nbsp; " + response.data.message,
									"class": "success",
									"autoDismiss": true
								}
							})
							setTimeout(() => {
								this.setState({
									messageData: {},
								})
							}, 3000);
							
						})
						.catch((error) => {
							console.log('error', error);
						})
					}
				})
				.catch((error) => {
					console.log('error', error);
				})
		} else {
			this.setState({
				messageData: {
					"type": "outpage",
					"icon": "fa fa-times-circle",
					"message": "Need To Sign In, Please <a href='/login'>Sign In</a> First.",
					"class": "danger",
					"autoDismiss": true
				}
			})
			setTimeout(() => {
				this.setState({
					messageData: {},
				})
			}, 3000);
		}
	}
	addtowishlist(event) {
		event.preventDefault();
		var user_ID = localStorage.getItem('user_ID');
		if (user_ID) {
			var id = event.target.id;
			axios.get('/api/products/get/one/' + id)
				.then((response) => {
					const userid = localStorage.getItem('user_ID');
					
					const formValues =
					{
						"user_ID": userid,
						"product_ID": response.data._id,
					}
					axios.post('/api/wishlist/post', formValues)
						.then((response) => {
							this.getWishData();
							this.setState({
								messageData: {
									"type": "outpage",
									"icon": "fa fa-check-circle",
									"message": "&nbsp; " + response.data.message,
									"class": "success",
									"autoDismiss": true
								}
							})
							setTimeout(() => {
								this.setState({
									messageData: {},
								})
							}, 3000);
						})
						.catch((error) => {
							console.log('error', error);
						})
				})
				.catch((error) => {
					console.log('error', error);
				})
		} else {
			this.setState({
				messageData: {
					"type": "outpage",
					"icon": "fa fa-exclamation-circle",
					"message": "Need To Sign In, Please <a href='/login'>Sign In</a> First.",
					"class": "warning",
					"autoDismiss": true
				}
			})
			setTimeout(() => {
				this.setState({
					messageData: {},
				})
			}, 3000);
		}

	}
	Closepagealert(event) {
		event.preventDefault();
		$(".toast-error").html('');
		$(".toast-success").html('');
		$(".toast-info").html('');
		$(".toast-warning").html('');
		$(".toast-error").removeClass('toast');
		$(".toast-success").removeClass('toast');
		$(".toast-info").removeClass('toast');
		$(".toast-warning").removeClass('toast');

	}
	addQuantity() {
		var totalQuanity = this.state.totalQuanity
		totalQuanity++;
		$('#addQuantity').addClass('auto');
		$('#addQuantity').css('background-color', '#fff');
		$('#decreaseQuantity').addClass('auto');
		$('#decreaseQuantity').css('background-color', '#fff');
		var recentCartData = this.props.recentCartData ? this.props.recentCartData[0].cartItems : [];
		var productCartData = recentCartData.filter((a)=>a.product_ID == this.props.productID);
		var quantityAdded = productCartData.length>0 ? productCartData[0].quantity : 0;
		if (Number(totalQuanity) > Number(this.state.quanityLimit) || quantityAdded >= Number(this.state.quanityLimit)) {
			$('#addQuantity').css('background-color', '#ccc');
			$('#addQuantity').addClass('no-drop');
			this.setState({
				messageData: {
					"type": "inpage",
					"icon": "fa fa-check-circle",
					"message": "Last "+this.state.quanityLimit+" items taken by you",
					"class": "warning",
					"autoDismiss": true
				}
			})
			setTimeout(() => {
				this.setState({
					messageData: {},
				})
			}, 5000);
		} else {
			this.setState({ totalQuanity: totalQuanity });
			document.getElementById('totalQuanity').innerHTML = totalQuanity;
		}
	}
	decreaseQuantity() {
		var totalQuanity = this.state.totalQuanity
		totalQuanity--;
		$('#addQuantity').addClass('auto');
		$('#addQuantity').css('background-color', '#fff');
		$('#decreaseQuantity').addClass('auto');
		$('#decreaseQuantity').css('background-color', '#fff');
		if (Number(totalQuanity) == 1 || Number(totalQuanity) > 1) {
			this.setState({ totalQuanity: totalQuanity }, () => {
				document.getElementById('totalQuanity').innerHTML = this.state.totalQuanity;
			});
		} else {
			$('#decreaseQuantity').addClass('no-drop');
			$('#decreaseQuantity').css('background-color', '#ccc');
		}
	}
	getMyReview() {
		axios.get("/api/customerReview/get/list/" + this.props.productID)
		.then((response) => {
		  this.setState({
			reviewData: response.data,
		  })
		})
		.catch((error) => {
		  console.log('error', error);
		})
	}
	reviewAverage(){
		axios.get("/api/customerReview/get/avg/" +this.props.productID)
		.then((response) => {
		  console.log('e', response.data);
		  this.setState({
			  reviewAverage : response.data[0].reviewAvg
		  })
		})
		.catch((error) => {
		  console.log('error', error);
		})
	}
	render() {
		const props = { width: 400, height: 350, zoomWidth: 750, offset: { vertical: 0, horizontal: 30 }, zoomLensStyle: 'cursor: zoom-in;', zoomStyle: 'z-index:1000;background-color:#fff; height:500px;width:750px;box-shadow: 0 4px 20px 2px rgba(0,0,0,.2);border-radius: 8px;', img: this.state.selectedImage ? this.state.selectedImage : "/images/notavailable.jpg" };
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 backColorWhite mb20 boxBorder">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt50">
					<div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 stickyDiv">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imageContainer imgCont">
							<div className="prod-detail-slider prod-detail-filpCommon">
								<div id="react-app" className={"item img-responsiveProduct"}>
									<ReactImageZoom {...props} />
								</div>
							</div>
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imageContainer mt50">
							<div className="">
								<OwlCarousel
									className="owl-theme productview"
									margin={0}
									nav={true}
									responsive={this.state.responsive}
									autoplay={true}
									autoplayHoverPause={true}
								>
									{
										this.state.productData && this.state.productData.productImage && this.state.productData.productImage.length > 0 ?
											this.state.productData.productImage.map((data, index) => {
												
												// if (!_.isEmpty(data)) {
												return (
													<div key={index} className="item col-lg-12 col-md-12 col-sm-12 col-xs-12 miniImagesInNew"  >
														<div className="row">
															{
																data && <img data-index={index} id="change-image" onClick={this.changeImage} src={data} alt="default" />
															}
														</div>
													</div>
												);
												// }
											})
											:
											null
									}
								</OwlCarousel>
							</div>
						</div>
					</div>

					<div className="col-lg-6 col-md-6  col-sm-12 col-xs-12 ">
						<Message messageData={this.state.messageData} />
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="row">
								<div id="brand"><label className="productNameClassNewBrand"> {this.state.productData.brand} </label></div>
								<div ><span className="productNameClassNew"> {this.state.productData.productName}</span> <span className="productCode"> (Product Code: {this.state.productData.productCode})</span></div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="row">
										 {/* <p className="">{this.state.reviewData.length>0?<a href="#gotoreview" className="anchorclr">Be the first to review this product</a>: null} </p> */}
										{/*<span className="priceEcommerce" ><i className={"fa fa-"+this.state.productData.currency}></i>&nbsp;{this.state.productData.discountedPrice}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										{this.state.productData.offered == true ? <span className="originalPrice"><i className={"fa fa-"+this.state.productData.currency}>&nbsp;{this.state.productData.originalPrice}</i></span> : null}*/}
									</div>
									<div className="undrln row"> </div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="row">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding mb15">
											<span className="priceEcommerceNew" ><i className={"fa fa-" + this.state.productData.currency}></i>&nbsp;{this.state.productData.discountedPrice}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											{this.state.productData.discountPercent ? <span className="originalPrice"><i className={"fa fa-" + this.state.productData.currency}>&nbsp;{this.state.productData.originalPrice}</i></span> : null} &nbsp; &nbsp;
											{this.state.productData.discountPercent ?<span className="discountPercent">{this.state.productData.discountPercent}% off</span>: null}
										</div>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
											{this.state.reviewAverage ?<div> <div className="col-lg-1 col-md-1 product-reviews-summary ratebox">{this.state.reviewAverage} &nbsp;<i class="fa fa-star"></i></div> &nbsp; {this.state.reviewData.length} ratings and reviews</div> : null}
										</div>
									</div>

									<div className="row listspace">
										{this.state.productData.featureList && this.state.productData.featureList.length>0 ?
											<span className="col-md-12 col-lg-12 col-sm-12 col-xs-12 paddingleftzero paddingrightzero ttl" >
												Features
											</span>
											:
											null
										}
										<span className="col-md-12 col-sm-12 col-xs-12 col-lg-12 ttllist" >
											{this.state.productData.featureList ?
												<div className="">
													<ul className="paddingleftzero">
														{this.state.productData.featureList &&
															this.state.productData.featureList.map((data, index) => {
																return (
																	<div className="" key={index}>
																		<div className="">
																			<span className="fa fa-circle-o tealColorfnt "></span>
																			<span className="blackColor ">&nbsp;&nbsp;{data.feature}</span>
																		</div>
																	</div>
																);
															})

														}
													</ul>
												</div>
												:
												null
											}

										</span>

									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 adCart ">

									<div className="row spc">
										<div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 NOpadding">
										{
                                            this.state.productData.availableQuantity > 0 ?
												<div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 NOpadding">
													<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 qtyInput" id="totalQuanity">
														1
													</div>
													<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
														<i className="fa fa-plus qtyIncrease" id="addQuantity" onClick={this.addQuantity.bind(this)}></i><br />
														<i className="fa fa-minus qtyIncrease" id="decreaseQuantity" onClick={this.decreaseQuantity.bind(this)}></i>
													</div>
													<div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 NOpadding">
														<div id={this.state.productData._id} onClick={this.addtocart.bind(this)} className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 viewAddtoCart"> &nbsp; Add to Cart</div>
													</div>
												</div>
											:
												<div className=" col-lg-9 col-md-9 col-sm-12 col-xs-12 NOpadding pull-right">
													<span className="soldOut">Sold Out</span>
													<p className="soldOutP">This item is currently out of stock</p>
												</div>
											}

											<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
												<div id={this.state.productData._id} title={this.state.wishTooltip} onClick={this.addtowishlist.bind(this)} className={"btn col-lg-12 col-md-12 col-sm-12 col-xs-12 "+this.state.wishIconClass }></div>
											</div>
										</div>
									</div>

								</div>

							</div>
						</div>
						{
							this.state.productData.productDetails ? 
							<div id="gotoreview" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding topspace detailtitle">DESCRIPTION</div>
								<div className="spcbx topspace15"></div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding detailtxt topspace15">{this.state.productData.productDetails}</div>
							</div>
							:
							null
						}
						<ProductViewEcommerceDetailsReviewFAQ productID = { this.props.productID } />
					</div>
				</div>
				
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
	  recentCartData :  state.recentCartData
	}
  }
  const mapDispachToProps = (dispatch) => {
	return  bindActionCreators({ fetchCartData: getCartData }, dispatch)
  }
  export default connect(mapStateToProps, mapDispachToProps)(ProductViewEcommerce);