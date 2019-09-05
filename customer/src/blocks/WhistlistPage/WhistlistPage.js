import React, { Component } from 'react';
import Moment from 'react-moment';
import axios                from 'axios';
import { connect }        from 'react-redux';
import $ from "jquery";
import swal from 'sweetalert';
import _ from 'underscore';
import "./WhistlistPage.css";
axios.defaults.baseURL = 'http://gangaexpressapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';


class WhistlistPage extends Component {
	constructor(props){
		super(props);
  	this.state = {
      wishlist : [],
      products : [],
      abc :[]
    }
	}

componentDidMount(){
        this.getData();   
     }
     getProduct(product_ID){
      axios.get('/api/products/get/one/'+product_ID)
        .then((response)=>{
          console.log('response', response);
        })
        .catch((error)=>{
          console.log('error', error);
        })
     }

    getData(){
        var user_ID = localStorage.getItem('admin_ID');
        console.log('user_ID', user_ID);

        axios.get('/api/wishlist/get/userwishlist/'+user_ID)
        .then((response)=>{
          console.log('userwishlist', response.data)
          response.data.map((a, i)=>{
            console.log('a', a.product_ID);
            axios.get('/api/products/get/one/'+a.product_ID)
            .then((res)=>{
              console.log('response getData', res.data);
              var products = this.state.products;
              products.push({
                "actualPrice"       : res.data.actualPrice,
                "availableQuantity" : res.data.availableQuantity,
                "bestSeller"        : res.data.bestSeller,
                "brand"             : res.data.brand,
                "category"          : res.data.category,
                "currency"          : res.data.currency,
                "offeredPrice"      : res.data.offeredPrice,
                "productCode"       : res.data.productCode,
                "productImage"      : res.data.productImage,
                "product_ID"        : res.data._id,
                "wishlist_ID"       : a._id
              });
              this.setState({
                products : products
              })
            })
            .catch((error)=>{
              console.log('error', error);
            })
          })
        })
        .catch((error)=>{
          console.log('error', error);
        })

    }
  addtocart(event){
    event.preventDefault();
    var id = event.target.id;
    var wishlist_ID = event.target.getAttribute('wishid');
     console.log("iwishdidid", wishlist_ID);
     console.log("ididid", id);
    axios.get('/api/products/get/one/'+id)
    .then((response)=>{
      var totalForQantity   =   parseInt(1 * response.data.offeredPrice);
          const userid = localStorage.getItem('admin_ID');
          // console.log("userid",response.data);
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
            console.log('response', response.data);
            this.props.changeCartCount(response.data.cartCount);
            swal(response.data.message)
            axios.delete('/api/wishlist/delete/'+wishlist_ID)
            .then((response)=>{
              this.setState({
                products : []
              })
              this.getData();
              // swal(response.data.message);
              
            })
            .catch((error)=>{
              console.log('error', error);
            })  

            })
          .catch((error)=>{
            console.log('error', error);
          })
    })
    .catch((error)=>{
      console.log('error', error);
    })
  }

  removefromwishlist(event){
    event.preventDefault();
    var id = event.target.id;
      console.log("ididid", id);
          axios.delete('/api/wishlist/delete/'+id)
          .then((response)=>{
            // console.log('response', response);
            this.setState({
              products : []
            })
            this.getData();
            swal(response.data.message);
            
            
          })
          .catch((error)=>{
            console.log('error', error);
          })  
  }
  
  
  
 render() {
  const token = localStorage.getItem("admin_ID");

  var plength = this.state.products.length ? this.state.products.length : 0;
  var productlength = plength % 3;

  console.log('abc', this.state.products);

	return (
    <div className="col-lg-12">
        <div className="col-lg-12 wishlistheader mt150">
              <div className="">
                  <div className="text-center">
                      Wishlist
                  </div>
              </div>
        </div>
			<div className="row">
{/*          <div className="col-lg-offset-1 col-lg-10 col-md-10 col-sm-10 col-xs-10 backColorWhite ">
            <span className="col-lg-1 dotDiv"> </span>
            <div className="col-lg-10 mainDiv"></div>
            <span className="col-lg-1 dotDiv"> </span>
          </div>

*/}       

        <div className="col-lg-10 col-lg-offset-1 col-md-12 backColorWhite ">
          <div className="row">
          {
            this.state.products && this.state.products.length >0 ?
            this.state.products.map((data,index)=>{
              console.log('wishlist_ID', data.wishlist_ID)
              if(productlength == 2){
                if(plength === index+2){
                  var classes = "mt20 col-lg-4  col-lg-offset-2";
                 
                }else{
                  var classes="mt20 col-lg-4";
               
              }
              }else if(productlength == 1){
                // console.log('productlength')
                if(plength === index+1){
                  var classes = "mt20 col-lg-4 col-lg-offset-4";                                   
                }else{
                  var classes="mt20 col-lg-4";                                 
              }
              }else{
                var classes="mt20 col-lg-4";                               
              }
               return (
                        <div  key={index} className={classes}>
                            <div className="row">
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
                                    <div className=" flip-box-inner">
                                      <img src={data.productImage[0]} className="flip-box-front img-responsive" alt="blog1"/>       
                                      <img src={data.productImage[1] ? data.productImage[1] : data.productImage[0]} className="flip-box-back img-responsive " alt="blog1"/>
                                    </div>
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
                                                                      <div className={data.webCategory == "Grocery fa fa-shopping-cart" ? "iconContainerGrocery fa fa-shopping-cart" : "iconContainerEcommerce fa fa-shopping-cart"} onClick={this.addtocart.bind(this)} wishid={data.wishlist_ID} id={data.product_ID}></div>
                                                           :
                                                                        <a href="/login"className="iconContainerEcommerce"><i className="fa fa-shopping-cart"></i></a>
                                                                    }
                                                        </div>
                                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3" data-toggle="tooltip" title="Remove from wishlist">
                                                         {
                                                                      token ?
                                                                        <div className={data.webCategory == "Grocery" ? "iconContainerGrocery ht20other" : "iconContainerEcommerce ht20"} onClick={this.removefromwishlist.bind(this)} id={data.wishlist_ID} ><i className="fa fa-trash"onClick={this.removefromwishlist.bind(this)} id={data.wishlist_ID}></i></div>
                                                                        :
                                                                        <a href="/login"className={data.webCategory == "Grocery" ? "iconContainerGrocery" : "iconContainerEcommerce  "}><i className="fa fa-heart "></i></a>

                                                                    }
                                                                        

                                                      </div>
                                                      <div  data-toggle="tooltip" title="View Features">
                                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3  mr0 ">
                                                        <a href={"/ProductDetailsEcommerce/"+data._id}><div className={data.webCategory == "Grocery" ? "iconContainerGrocery ht20other " : "iconContainerEcommerce ht20"}><i className="fa fa-eye "></i></div></a>
                                                      </div>
                                                      </div>
                                            </div>
                                              :
                                               <div className="optionDiv col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                <div  data-toggle="tooltip" title="Add to cart" className="col-lg-3 col-md-3 col-sm-3 col-xs-3  " >
                                                 
                                                  {
                                                                token ?
                                                                <div className={data.webCategory == "Grocery fa fa-shopping-cart" ? "iconContainerGrocery fa fa-shopping-cart" : "iconContainerEcommerce fa fa-shopping-cart"} onClick={this.addtocart.bind(this)} wishid={data.wishlist_ID} id={data.product_ID}></div>
                                                     :
                                                                  <a href="/login"className="iconContainerEcommerce"><i className="fa fa-shopping-cart"></i></a>
                                                              }
                                                  </div>
                                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3" data-toggle="tooltip" title="Remove from wishlist">
                                                   {
                                                                token ?
                                                                  <div className={data.webCategory == "Grocery" ? "iconContainerGrocery ht20other" : "iconContainerEcommerce ht20"} onClick={this.removefromwishlist.bind(this)} id={data.wishlist_ID} ><i className="fa fa-trash" onClick={this.removefromwishlist.bind(this)} id={data.wishlist_ID}></i></div>
                                                                  :
                                                                  <a href="/login"className={data.webCategory == "Grocery" ? "iconContainerGrocery" : "iconContainerEcommerce"}><i className="fa fa-heart "></i></a>

                                                  }
                                                                  

                                                </div>
                                                 <div  data-toggle="tooltip" title="View product">
                                             <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 mr0 ">
                                                        {
                                                                  token ?
                                                          <a href={"/ProductDetailsEcommerce/"+data._id}> <div className={data.webCategory == "Grocery" ? "iconContainerGrocery  col-lg-12" : "iconContainerEcommerce ht20 col-lg-12 "}><i className="fa fa-eye "></i></div></a>
                                                                    :
                                                          <a href={"/ProductDetailsEcommerce/"+data._id}> <span className={data.webCategory == "Grocery" ? "iconContainerGrocery ht20other" : "iconContainerEcommerce"}><i className="fa fa-eye "></i></span></a>

                                                              }
                                                      </div>                                                
                                                </div>
                                              </div>
                                          }

                                  </div>
                          
                                </div>
                    </div>
                          </div>
                        </div>
                      );
                 })
                 :
                 <div>
                    <h5 className="col-lg-12 textAlignCenter"><b>Your Wishlist is empty</b></h5>
                    <div className="col-lg-12 textAlignCenter">
                    <img src="/images/nowish.png" />
                    </div>
                    <p className="col-lg-12 textAlignCenter emptyCartMsg">Looks like you haven't added anything to your wishlist yet.</p>
                </div>          
          }
         </div>
				</div>
			</div>
    </div>
		);
	}
}
const mapStateToProps = (state)=>{
  return {
    
  }
}
const mapDispachToProps = (dispach) =>{
  return {
    changeCartCount : (cartCount)=> dispach({
      type:'CART_COUNT',
      cartCount : cartCount
    }),
    changeWishlistCount : (wishlistCount)=> dispach({
      type:'WISHLIST_COUNT',
      wishlistCount : wishlistCount
    })
  }
}

export default connect(mapStateToProps, mapDispachToProps)(WhistlistPage);