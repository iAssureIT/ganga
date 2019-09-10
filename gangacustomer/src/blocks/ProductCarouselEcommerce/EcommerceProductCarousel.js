import React, { Component }       from 'react';
import $ 				                  from 'jquery';
import Loadable                   from 'react-loadable';
import axios                      from 'axios';
import swal                       from 'sweetalert';
import { connect }                from 'react-redux';
import "./EcommerceProductCarousel.css";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';	

const OwlCarousel = Loadable({
  loader: () => import('react-owl-carousel'),
  loading() {
    return <div className="col-sm-12 col-xs-12 col-lg-2 col-lg-offset-5 col-md-12 loadingImg"><img src="../images/loadersglms.gif" className="img-responsive" alt="loading"/></div>
  }
});


class EcommerceProductCarousel extends Component {
	constructor(props){
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
				            items:4
				        }
   					 }
	    	
	    };
  	} 
  addtocart(event){
    event.preventDefault();
    var id = event.target.id;
    axios.get('/api/products/get/one/'+id)
    .then((response)=>{
      var totalForQantity   =   parseInt(1 * response.data.offeredPrice);
          const userid = localStorage.getItem('admin_ID');
          
          const formValues = { 
              "user_ID"    : userid,
              "product_ID" : response.data._id,
              "currency" : response.data.currency,
              "productCode" : response.data.productCode,
              "productName" : response.data.productName,
              "category" : response.data.category,
              "subCategory" : response.data.subCategory,
              "productImage" : response.data.productImage,
              "quantity" : 1  ,
              "offeredPrice" : parseInt(response.data.offeredPrice),
              "actualPrice" : parseInt(response.data.actualPrice),
              "totalForQantity" : totalForQantity,
              
          }
          axios.post('/api/carts/post', formValues)
          .then((response)=>{
            
          swal(response.data.message);
          this.props.changeCartCount(response.data.cartCount);
          })
          .catch((error)=>{
            console.log('error', error);
          })
    })
    .catch((error)=>{
      console.log('error', error);
    })
  }


  addtowishlist(event){
    event.preventDefault();
    var id = event.target.id;
    const userid = localStorage.getItem('admin_ID');
    const formValues = 
    { 
        "user_ID"    : userid,
        "product_ID" : id,
    }
    axios.post('/api/wishlist/post', formValues)
    .then((response)=>{
      
      swal(response.data.message);
      this.props.changeWishlistCount(response.data.wishlistCount);
    })
    .catch((error)=>{
      console.log('error', error);
    })
  }
  render() {
  	console.log('Product', this.props.title,this.props.newProducts);
  	  	  const token = localStorage.getItem("admin_ID") ;
          // console.log("admin_ID:",localStorage.getItem("admin_ID"))
		return (

				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ecommerceProductCarousel mt20">
						<div className="row">
  						  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite">
  						    <div className="customPillsEcommerce col-lg-offset-4 col-lg-4">
                    <h3><b>{this.props.title}</b></h3>
                  </div>
  						  </div>
						  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grayLine"></div>
						 <div className="tab-content customTabContent">
						    <div id="home" className="tab-pane fade in active ecommerceTabContent">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt50">
									<OwlCarousel
									    className="owl-theme customnNavButton"
									    margin={5}
									    nav={false}
									    responsive={this.state.responsive} 
                      autoplay={true}
                      autoplayHoverPause={true}

									>
									{

									this.props.newProducts && this.props.newProducts.length > 0 ?
									this.props.newProducts.map((data, index)=>{
										 // console.log('ididid ',data._id);
									return (
								     <div className="item " key={index}>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogs">
                                <div className="">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 flip-box ecommerceProduct ">
                                  {
                                    data.offered == true ?
                                    <div className="row">
                                    <div className="offerDetailstrue col-lg-6">Offer Price </div><div className="offerDetailstrue col-lg-6 "><span className="pull-right"><i className="fa fa-inr"></i>&nbsp;{data.offeredPrice}</span></div>
                                    </div>
                                    :
                                    <div className="row">
                                    <div className="offerDetails col-lg-6">Offer Price </div><div className="offerDetails col-lg-6 "><span className="pull-right"><i className="fa fa-inr"></i>&nbsp;{data.offeredPrice}</span></div>
                                    </div>
                                  }
                                    <a title="View Product"href={"/ProductDetails/"+data._id}><div className=" flip-box-inner">
                                      <img src={data.productImage[0] ? data.productImage[0] : '/images/notavailable.jpg'} className="flip-box-front img-responsive" alt="blog1"/>       
                                      <img src={data.productImage[1] ? data.productImage[1] : (data.productImage[0] ? data.productImage[0] : '/images/notavailable.jpg')} className="flip-box-back img-responsive " alt="blog1"/>
                                    </div></a>
                                    <div id="" className="col-lg-6 col-sm-12 col-xs-12 mt40 row">
                                                  <fieldset className="ratingReview stars ">
                                                      <input type="radio" id="star5" name="ratingReview" value="5" /><label htmlFor="star5"></label>
                                                      <input type="radio" id="star4" name="ratingReview" value="4" /><label htmlFor="star4"></label>
                                                      <input type="radio" id="star3" name="ratingReview" value="3" /><label htmlFor="star3"></label>
                                                      <input type="radio" id="star2" name="ratingReview" value="2" /><label htmlFor="star2"></label>
                                                      <input type="radio" id="star1" name="ratingReview" value="1"/><label htmlFor="star1"></label>
                                                  </fieldset>
                                                  <div className="clearfix "></div>
                                              </div>
                                                <label className="pull-right priceDivProduct mt40"><i className={"fa fa-"+data.currency}> </i>&nbsp;{data.actualPrice}</label><br/>
                                      <span className="col-lg-12 row nameOfProduct">{data.productName}</span>
                                      {
                                        token ?

                                            <div className="optionDiv col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                      <div  data-toggle="tooltip" title="Add to cart" className="col-lg-3 col-md-3 col-sm-3 col-xs-3  " >
                                                       
                                                        {
                                                                      token ?
                                                                      <div className={data.webCategory == "Grocery fa fa-shopping-cart" ? "iconContainerGrocery fa fa-shopping-cart" : "iconContainerEcommerce fa fa-shopping-cart"} onClick={this.addtocart.bind(this)} id={data._id}></div>
                                                           :
                                                                        <a href="/login"className="iconContainerEcommerce"><i className="fa fa-shopping-cart"></i></a>
                                                                    }
                                                        </div>
                                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3" data-toggle="tooltip" title="Add to wishlist">
                                                         {
                                                                      token ?
                                                                        <div className={data.webCategory == "Grocery" ? "iconContainerGrocery fa fa-heart" : "iconContainerEcommerce  fa fa-heart"} onClick={this.addtowishlist.bind(this)} id={data._id} ></div>
                                                                        :
                                                                        <a href="/login"className={data.webCategory == "Grocery" ? "iconContainerGrocery" : "iconContainerEcommerce  "}><i className="fa fa-heart "></i></a>

                                                                    }
                                                                        

                                                      </div>
                                                      <div  data-toggle="tooltip" title="View product">
                                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3  mr0 ">
                                                        <a href={"/ProductDetails/"+data._id}><div className={data.webCategory == "Grocery" ? "iconContainerGrocery  " : "iconContainerEcommerce ht20"}><i className="fa fa-eye "></i></div></a>
                                                      </div>
                                                      </div>
                                            </div>
                                              :
                                               <div className="optionDiv col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                <div  data-toggle="tooltip" title="Add to cart" className="col-lg-3 col-md-3 col-sm-3 col-xs-3  " >
                                                 
                                                  {
                                                                token ?
                                                                <div className={data.webCategory == "Grocery fa fa-shopping-cart" ? "iconContainerGrocery fa fa-shopping-cart" : "iconContainerEcommerce fa fa-shopping-cart"} onClick={this.addtocart.bind(this)} id={data._id}></div>
                                                     :
                                                                  <a href="/login"className="iconContainerEcommerce"><i className="fa fa-shopping-cart"></i></a>
                                                              }
                                                  </div>
                                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3" data-toggle="tooltip" title="Add to wishlist">
                                                   {
                                                                token ?
                                                                  <div className={data.webCategory == "Grocery" ? "iconContainerGrocery fa fa-heart" : "iconContainerEcommerce fa fa-heart"} onClick={this.addtowishlist.bind(this)} id={data._id} ></div>
                                                                  :
                                                                  <a href="/login"className={data.webCategory == "Grocery" ? "iconContainerGrocery" : "iconContainerEcommerce"}><i className="fa fa-heart "></i></a>

                                                              }
                                                                  

                                                </div>
                                                 <div  data-toggle="tooltip" title="View product">
                                             <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 mr0 ">
                                                        {
                                                                  token ?
                                                          <a href={"/ProductDetails/"+data._id}> <div className={data.webCategory == "Grocery" ? "iconContainerGrocery  col-lg-12" : "iconContainerEcommerce ht20 col-lg-12 "}><i className="fa fa-eye "></i></div></a>
                                                                    :
                                                          <a href={"/ProductDetails/"+data._id}> <span className={data.webCategory == "Grocery" ? "iconContainerGrocery " : "iconContainerEcommerce"}><i className="fa fa-eye "></i></span></a>

                                                              }
                                                      </div>                                                
                                                </div>
                                              </div>
                                          }

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
export default(EcommerceProductCarousel);