import React, { Component } from 'react';
import $                    from 'jquery';
import axios                from 'axios';
import {Route, withRouter} from 'react-router-dom';
import "./CartProducts.css";
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCartData } from '../../actions/index';
import Loader from "../../common/loader/Loader.js";
import Message from '../Message/Message.js';
class CartProducts extends Component{
    constructor(props) {
        super(props);
        this.state={
            cart:[],
            totalCartPrice:'',
            productData:{},
            productCartData:[],
            vatPercent:0,
            companyInfo:"",
            cartProduct:"",
            shippingCharges:0,
            quantityAdded: 0,
            totalIndPrice: 0,
            bannerData : {
                title : "MY SHOPPING CART",
                breadcrumb : 'My Shopping Cart',
                backgroungImage : '/images/cartBanner.png',
            }
        }
    }

    async componentDidMount(){
    	await this.props.fetchCartData();
    }
    componentWillReceiveProps(nextProps) { 
       
    }
    getCartData(){
        const userid = localStorage.getItem('user_ID');
        axios.get("/api/carts/get/cartproductlist/"+userid)
          .then((response)=>{ 
              console.log('cartData', response.data);
            this.setState({
                cartData : response.data
            })
          })
          .catch((error)=>{
            console.log('error', error);
          })
    }
    Removefromcart(event){
        event.preventDefault();
        const userid = localStorage.getItem('user_ID');
        const cartitemid = event.target.getAttribute('id');
        const formValues = { 
            "user_ID"    : userid,
            "cartItem_ID" : cartitemid,
        }
        axios.patch("/api/carts/remove" ,formValues)
        .then((response)=>{
            this.setState({
                messageData : {
                  "type" : "outpage",
                  "icon" : "fa fa-check-circle",
                  "message" : response.data.message,
                  "class": "success",
                  "autoDismiss" : true
                }
            })
            setTimeout(() => {
                this.setState({
                    messageData   : {},
                })
            }, 3000);
            this.props.fetchCartData();
        })
        .catch((error)=>{
        console.log('error', error);
        })
    }
    cartquantityincrease(event){
        event.preventDefault();
        const userid = localStorage.getItem('user_ID');
        const product_ID = event.target.getAttribute('productid');
        const quantity = parseInt(event.target.getAttribute('dataquntity'));
        
        var availableQuantity = parseInt(event.target.getAttribute('availableQuantity'));
        const quantityAdded = parseInt(quantity+1);
        const formValues = { 
            "user_ID"     	: userid,
            "product_ID" 	: product_ID,
            "quantityAdded" : quantityAdded,
        }
        if(quantityAdded > availableQuantity){
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
            axios.patch("/api/carts/quantity" ,formValues)
            .then((response)=>{
                    this.props.fetchCartData();
            })
            .catch((error)=>{
                    console.log('error', error);
            })
        }
    }
    Closepagealert(event){
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
    cartquantitydecrease(event){
    	event.preventDefault();
        const userid = localStorage.getItem('user_ID');
        const cartitemid = event.target.getAttribute('id');
        const quantity = parseInt(event.target.getAttribute('dataquntity'));

        const quantityAdded = parseInt(quantity-1) <= 0 ? 1 : parseInt(quantity-1);
        
        const formValues = { 
			"user_ID"     	: userid,
			"product_ID" 	: cartitemid,
			"quantityAdded" : quantityAdded,
        }
        console.log('for', formValues);
        axios.patch("/api/carts/quantity" ,formValues)
		.then((response)=>{
             this.props.fetchCartData();
		})
		.catch((error)=>{
		    console.log('error', error);
		})
    }
    proceedToCheckout(event){
        event.preventDefault();
        this.props.history.push('/checkout');
    }
    continueShopping(event){
        event.preventDefault();
        this.props.history.push('/');
    }
    updateShoppingCart(){
        window.location.reload();
    }
    moveWishlist(event){
        event.preventDefault();
        const userid = localStorage.getItem('user_ID');
        const cartitemid = event.target.getAttribute('id');
        const productid = event.target.getAttribute('productid');
        const formValues = { 
            "user_ID"    : userid,
            "cartItem_ID" : cartitemid,
        }


          const wishValues = {
            "user_ID": userid,
            "product_ID": productid,
          }
          axios.post('/api/wishlist/post', wishValues)
            .then((response) => {
                axios.patch("/api/carts/remove" ,formValues)
                .then((response)=>{
                    this.setState({
                        messageData : {
                          "type" : "outpage",
                          "icon" : "fa fa-check-circle",
                          "message" : "Product moved to wishlist successfully.",
                          "class": "success",
                          "autoDismiss" : true
                        }
                    })
                    setTimeout(() => {
                        this.setState({
                            messageData   : {},
                        })
                    }, 3000);
                    this.props.fetchCartData();
                })
                .catch((error)=>{
                    console.log('error', error);
                })
            })
            .catch((error) => {
              console.log('error', error);
            })


        

    }
    render(){
        console.log(this.props.recentCartData[0]);
        return(
            <div className="container">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cartHeight">
                <Loader type="fullpageloader"/>
                <div className="row">
                    <Message messageData={this.state.messageData} />
                    {
                        this.props.recentCartData.length > 0 &&  this.props.recentCartData[0].cartItems.length > 0? 
                        <div className="col-lg-12 col-sm-12 col-xs-12 NOpadding">
                            
                            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 cartProduct">
                                <table className="table table-responsive cartProductTable">
                                    <thead>
                                        <tr>
                                            <th>ITEMS</th>
                                            <th>PRICE</th>
                                            <th>QUANTITY</th>
                                            <th>TOTAL</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            
                                            this.props.recentCartData[0].cartItems.map((data, index)=>{
                                                
                                                return(
                                                    <tr key={index}>
                                                        <td>
                                                            <tr>
                                                                <td>
                                                                    <a href={"/productdetails/" + data.productDetail.product_ID}><img className="img img-responsive cartProductImg" src={data.productDetail.productImage[0] ? data.productDetail.productImage[0] : '/images/notavailable.jpg'} /></a>
                                                                </td>
                                                                <td className="cartProductDetail">
                                                                <a href={"/productdetails/" + data.product_ID}><h5>{data.productDetail.productName}</h5></a>
                                                                {
                                                                    data.productDetail.discountPercent  ?
                                                                        <div className="col-lg-12 col-md-12 NOpadding">
                                                                            
                                                                            <span className="oldprice"><i className="fa fa-inr oldprice"></i>&nbsp;{data.productDetail.originalPrice}</span> &nbsp;
                                                                            <span className="price"><i className="fa fa-inr"></i>&nbsp;{data.productDetail.discountedPrice}</span> &nbsp;
                                                                            <span className="cartDiscountPercent">({data.productDetail.discountPercent}%)</span>
                                                                        </div>
                                                                        :
                                                                        <span className="price"><i className="fa fa-inr"></i>&nbsp;{data.productDetail.originalPrice}</span>
                                                                }
                                                                <br/>
                                                                    <button productid={data.productDetail.product_ID} id={data._id} onClick={this.moveWishlist.bind(this)} className="btn btn-warning moveWish">Move to Wishlist</button>
                                                                </td>
                                                                
                                                            </tr>
                                                        </td>
                                                        <td className="nowrap"><span id="productPrize" className={"cartProductPrize fa fa-inr"}>&nbsp;{data.productDetail.discountedPrice}</span></td>
                                                        <td className="nowrap">
                                                            <span className="minusQuantity fa fa-minus" id={data.productDetail._id} dataquntity={this.state.quantityAdded != 0 ? this.state.quantityAdded : data.quantity} onClick={this.cartquantitydecrease.bind(this)}></span>&nbsp;
                                                            <span className="inputQuantity">{this.state['quantityAdded|'+data._id] ? this.state['quantityAdded|'+data._id] : data.quantity}</span>&nbsp;
                                                            <span className="plusQuantity fa fa-plus" productid={data.product_ID} id={data.productDetail._id} dataquntity={this.state.quantityAdded != 0 ? this.state.quantityAdded : data.quantity} availableQuantity={data.productDetail.availableQuantity}  onClick={this.cartquantityincrease.bind(this)}></span>
                                                        </td>
                                                        <td className="nowrap"><span className={"cartProductPrize fa fa-inr"}>&nbsp;{data.subTotal}</span></td>
                                                        <td>
                                                            <span className="fa fa-trash trashIcon" id={data._id} onClick={this.Removefromcart.bind(this)}><a href="#" style={{color:"#337ab7"}} ></a></span>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                            
                                        }
                                    </tbody>
                                </table>
                                
                            </div>
                            
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 NOpadding">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cartSummary">
                                    <strong className="cartSummaryTitle">Summary</strong>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="row">
                                            <table className="table table-responsive summaryTable">
                                                <tbody>
                                                    <tr>
                                                        <td>Cart Total</td>
                                                        <td className="textAlignRight">&nbsp; <i className={"fa fa-inr"}></i> {this.props.recentCartData[0].cartTotal > 0 ? parseInt(this.props.recentCartData[0].cartTotal) : 0.00} </td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td>Discount</td>
                                                        <td className="textAlignRight saving">&nbsp;- <i className={"fa fa-inr"}></i> {this.props.recentCartData[0].discount} </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Order Total</td>
                                                        <td className="textAlignRight">&nbsp; <i className={"fa fa-inr"}></i> {this.props.recentCartData[0].total > 0 ? parseInt(this.props.recentCartData[0].total) : 0.00} </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Delivery Charges</td>
                                                        <td className="textAlignRight saving">&nbsp;{this.state.shippingCharges > 0 ?(this.state.shippingCharges).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "Free"} </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="cartTotal">Total</td>
                                                        <td className="textAlignRight cartTotal">&nbsp; <i className={"fa fa-inr"}></i> {this.props.recentCartData[0].total > 0 ? parseInt(this.props.recentCartData[0].total) : 0.00}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <button onClick={this.proceedToCheckout.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-warning cartCheckout">
                                        PROCEED TO CHECKOUT
                                    </button>
                                </div>
                            </div>
                        </div>
                        : 
                        <div className="col-lg-12 textAlignCenter">
                          <img src="/images/emptycart.png" />
                        </div>   
                    }
                    
                </div>
            </div>
            </div>
        );
    }
}
const mapStateToProps = (state)=>{
  return {
    recentCartData :  state.recentCartData
  }
}
const mapDispachToProps = (dispatch) =>{
    return bindActionCreators({ fetchCartData: getCartData }, dispatch);  
}  
export default connect(mapStateToProps, mapDispachToProps)(withRouter(CartProducts));