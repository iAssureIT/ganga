import React, { Component } from 'react';
import $ from 'jquery';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import "./ProductViewEcommerce.css";
import _ from 'underscore';
import { connect } from 'react-redux';
import { ToastsContainer, ToastsStore, ToastsContainerPosition, message, timer, classNames } from 'react-toasts';
import ReactImageZoom from 'react-image-zoom';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';	
import Loadable                   from 'react-loadable';

const OwlCarousel = Loadable({
  loader: () => import('react-owl-carousel'),
  loading() {
    return <div className="col-sm-12 col-xs-12 col-lg-2 col-lg-offset-5 col-md-12 loadingImg"><img src="../images/loadersglms.gif" className="img-responsive" alt="loading"/></div>
  }
});
const user_ID = localStorage.getItem("user_ID");
class ProductViewEcommerce extends Component {
	constructor(props) {
		super(props);
		this.state = {
	    responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:5 
            }
          },
			"productData": [],
			"subImgArray": [],
			"totalQuanity": 1,
			"quanityLimit": 5,
			"imgsrc": "",
		};
		this.changeImage = this.changeImage.bind(this);
	}

	componentDidMount() {
		axios.get("/api/products/get/one/" + this.props.productID)
			.then((response) => {
				// console.log("product info---->", response);
				this.setState({
					productData: response.data,
					selectedImage : response.data.productImage[0],
					quanityLimit: response.data.availableQuantity
				})
				this.forceUpdate();
			})
			.catch((error) => {
				console.log('error', error);
			})
	}
	changeImage = (event) => {
		
		this.setState({
			
			selectedImage : event.target.src
		},() => {
			console.log('this.state.imgsrc', this.state.imgsrc);
		});
	}
	getCartData() {
		// const userid = '5d5bfb3154b8276f2a4d22bf';
		const userid = localStorage.getItem('user_ID');
		axios.get("/api/carts/get/list/" + userid)
			.then((response) => {
				// console.log('cartProduct=======================', response.data[0].cartItems)
				this.setState({
					cartProduct: response.data[0].cartItems
				});
				this.props.initialCartData(response.data[0].cartItems);
			})
			.catch((error) => {
				console.log('error', error);
			})
	}

	addtocart = (event) => {
		// const token = localStorage.getItem("token");
		//   if(token!==null){
		//   // console.log("Header Token = ",token);
		//   // browserHistory.push("/");
		//   this.props.history.push("/");
		// }
		// else{
		// 	  this.props.history.push("/login");
		// }
		if (user_ID) {

			event.preventDefault();
			var id = event.target.id;

			axios.get('/api/products/get/one/' + id)
				.then((response) => {
					var totalForQantity = parseInt(Number(this.state.totalQuanity) * response.data.discountedPrice);
					const userid = localStorage.getItem('user_ID');

					const formValues = {
						"user_ID": userid,
						"product_ID": response.data._id,
						"currency": response.data.currency,
						"productCode": response.data.productCode,
						"productName": response.data.productName,
						"category": response.data.category,
						"subCategory": response.data.subCategory,
						"productImage": response.data.productImage,
						"quantity": this.state.totalQuanity,
						"discountedPrice": parseInt(response.data.discountedPrice),
						"originalPrice": parseInt(response.data.originalPrice),
						"totalForQantity": totalForQantity,

					}
					axios.post('/api/carts/post', formValues)
						.then((response) => {
							// console.log('response', response);
							this.getCartData();
							ToastsStore.success(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 50000)
							// swal(response.data.message)
							this.props.changeCartCount(response.data.cartCount);
						})
						.catch((error) => {
							console.log('error', error);
						})
				})
				.catch((error) => {
					console.log('error', error);
				})
		} else {
			ToastsStore.error(<div className="alertback">Need To Sign In, Please Sign In First<a className="pagealerturl" href="/login">Sign In >></a><span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 50000)
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
					// console.log("userid",response.data);
					const formValues =
					{
						"user_ID": userid,
						"product_ID": response.data._id,
					}
					axios.post('/api/wishlist/post', formValues)
						.then((response) => {
							// console.log('response', response);
							// swal(response.data.message)
							if (response.status == 200) {
								ToastsStore.success(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 50000)
							}
							ToastsStore.warning(<div className="alertback">{response.data.messageinfo}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 50000)
						})
						.catch((error) => {
							console.log('error', error);
						})
				})
				.catch((error) => {
					console.log('error', error);
				})
		} else {
			ToastsStore.error(<div className="alertback">Need To Sign In, Please Sign In First<a className="pagealerturl" href="/login">Sign In >></a><span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 50000)
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
		if (Number(totalQuanity) > Number(this.state.quanityLimit)) {
			$('#addQuantity').css('background-color', '#ccc');
			$('#addQuantity').addClass('no-drop');
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
	render() {
		const props = { width: 400, height: 350, zoomWidth: 750, offset: { vertical: 0, horizontal: 30 }, zoomLensStyle: 'cursor: zoom-in;', zoomStyle: 'z-index:1000;background-color:#fff; height:500px;width:750px;box-shadow: 0 4px 20px 2px rgba(0,0,0,.2);border-radius: 8px;', img: this.state.selectedImage ? this.state.selectedImage : "/images/imgNotFound.jpg" };
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 backColorWhite mb20 boxBorder">
				<div className="pagealertnone">
					<ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
				</div>
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt50">
					<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imageContainer imgCont">
							<div className="prod-detail-slider prod-detail-filpCommon">
								<div id="react-app" className={"item img-responsiveProduct"}>
									<ReactImageZoom {...props}  />
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
													this.state.productData &&  this.state.productData.productImage && this.state.productData.productImage.length>0 ?
													this.state.productData.productImage.map((data, index) => {
														console.log("productData=>>>>>>>>>>>>>>>",data);
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
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productInfoEcommerce">
							<div className="row">
								<div id="brand"><label className="productNameClassNewBrand"> {this.state.productData.productName} </label></div>
								{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="row  productNameClassNew">{this.state.productData.productName}</div>
								</div>*/}

								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="row">
										<p className="orangetxt "><a href="#gotoreview" className="anchorclr">Be the first to review this product</a> (Product Code: {this.state.productData.productCode})</p>
										{/*<span className="priceEcommerce" ><i className={"fa fa-"+this.state.productData.currency}></i>&nbsp;{this.state.productData.discountedPrice}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										{this.state.productData.offered == true ? <span className="originalPrice"><i className={"fa fa-"+this.state.productData.currency}>&nbsp;{this.state.productData.originalPrice}</i></span> : null}*/}
									</div>
									<div className="undrln row"> </div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="row">
										<span className="col-md-1 col-lg-1 col-sm-12 col-xs-12 paddingleftzero ttl" >
											Price:
										</span>
										
										<span className="col-md-6 col-sm-12 col-xs-12 col-lg-6 ">
											<span className="priceEcommerceNew" ><i className={"fa fa-" + this.state.productData.currency}></i>&nbsp;{this.state.productData.discountedPrice}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											{this.state.productData.discountPercent == true ? <span className="originalPrice"><i className={"fa fa-" + this.state.productData.currency}>&nbsp;{this.state.productData.originalPrice}</i></span> : null}
										</span>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
											<div className="col-lg-1 col-md-1 product-reviews-summary ratebox">4.4 &nbsp;<i class="fa fa-star"></i></div> &nbsp; 11 ratings and 1 reviews
										</div>
									</div>

									<div className="row listspace">
									{this.state.productData.featureList ?
										<span className="col-md-2 col-lg-2 col-sm-12 col-xs-12 paddingleftzero paddingrightzero ttl" >
											Features
										</span>
										:
										null
									}
										<span className="col-md-6 col-sm-12 col-xs-12 col-lg-6 ttllist" >
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
											<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 qtyInput" id="totalQuanity">
												1
</div>
											<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
												<i className="fa fa-plus qtyIncrease" id="addQuantity" onClick={this.addQuantity.bind(this)}></i><br />
												<i className="fa fa-minus qtyIncrease" id="decreaseQuantity" onClick={this.decreaseQuantity.bind(this)}></i>
											</div>
											<div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 NOpadding">
												<div id={this.state.productData._id} onClick={this.addtocart.bind(this)} className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 viewAddtoCart"> &nbsp; Add to Cart</div>
											</div>
											<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
												<div id={this.state.productData._id} onClick={this.addtowishlist.bind(this)} className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 viewWishList"></div>
											</div>
										</div>
									</div>

								</div>

							</div>
						</div>

					</div>
				</div>
				<div id="gotoreview" className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 faq">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 faq">
							<div className="col-lg-12 topspace detailtitle">DETAILS</div>
							<div className="spcbx topspace15"></div>
							<div className="col-lg-12 detailtxt topspace15">{this.state.productData.productDetails}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		cartData: state.cartData
	}
}
const mapDispachToProps = (dispach) => {
	return {
		changeCartCount: (cartCount) => dispach({
			type: 'CART_COUNT',
			cartCount: cartCount
		}),
		changeWishlistCount: (wishlistCount) => dispach({
			type: 'WISHLIST_COUNT',
			wishlistCount: wishlistCount
		}),
		initialCartData: (cartData) => dispach({
			type: 'CART_DATA',
			cartData: cartData
		}),
	}
}
export default connect(mapStateToProps, mapDispachToProps)(ProductViewEcommerce);