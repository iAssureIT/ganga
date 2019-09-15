import React, { Component } from 'react';
import swal from 'sweetalert';
import $                    from 'jquery';
import axios                from 'axios';
import {Route, withRouter} from 'react-router-dom';
import "./CartProducts.css";

class CartProducts extends Component{
    constructor(props) {
        super(props);
        this.state={
            cart:[],
            totalCartPrice:'',
            productData:{},
            productCartData:[],
            vatPercent:"",
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
        this.getCartData();   
        this.getCompanyDetails();
    }

    componentDidMount(){
    	this.getCartData();   
        this.getCompanyDetails();
    }

    getCartData(){
        // const userid = '5d5bfb3154b8276f2a4d22bf';
        const userid = localStorage.getItem('user_ID');
        axios.get("/api/carts/get/list/"+userid)
          .then((response)=>{ 
          	console.log('cartProduct', response.data)
              this.setState({
                cartProduct : response.data[0]
              });
          })
          .catch((error)=>{
                console.log('error', error);
          })
    }
    getCompanyDetails(){
        axios.get("/api/companysettings/list")
          .then((response)=>{ 
              this.setState({
                companyInfo : response.data[0]
              },()=>{
                  console.log('companyInfo', this.state.companyInfo);
                  this.getCartTotal();
              })
          })
          .catch((error)=>{
                console.log('error', error);
          })
    }
    getCartTotal(){
        var cartData = this.state.cartProduct;
        var companyData = this.state.companyInfo;

        if(cartData && companyData){

            if(cartData.cartItems.length>0){
                this.setState({
                    "shippingCharges":100.00,
                });
            } else{
                this.setState({
                    "shippingCharges":0.00,
                });
            }
            
            
            this.setState({
                "productCartData": cartData.cartItems,
                "productData":cartData,
                "vatPercent":companyData.taxSettings ? companyData.taxSettings[0].taxRating : 0,
            });
        } else{
            this.setState({
                "shippingCharges":0.00,
            });
        }
    }

    Removefromcart(event){
        event.preventDefault();
        const userid = localStorage.getItem('user_ID');
        // console.log("userid",userid);
        const cartitemid = event.target.getAttribute('id');
        // console.log("cartitemid",cartitemid);

        const formValues = { 
              "user_ID"    : userid,
              "cartItem_ID" : cartitemid,
          }

        axios.patch("/api/carts/remove" ,formValues)
          .then((response)=>{
            console.log('removed');
            swal(response.data.message)           
             .then((obj)=>{
                  window.location.reload();
             });

            this.getCartData();   
            this.getCompanyDetails();

          })
          .catch((error)=>{
                console.log('error', error);
          })


    }

    cartquantityincrease(event){
        event.preventDefault();
        const userid = localStorage.getItem('user_ID');
        const cartitemid = event.target.getAttribute('id');
        const quantity = parseInt(event.target.getAttribute('dataquntity'));

        const quantityAdded = parseInt(quantity+1);
        const proprice = event.target.getAttribute('dataprice');
        // console.log('proprice', proprice);
        if(quantity>0){
           var totalIndPrice   = quantityAdded * proprice;      
        }
        
        const formValues = { 
			"user_ID"     	: userid,
			"cartItem_ID" 	: cartitemid,
			"quantityAdded" : quantityAdded,
			"totalIndPrice"	: totalIndPrice
		}
        // console.log('formValues',formValues);
        axios.patch("/api/carts/quantity" ,formValues)
          .then((response)=>{
            window.location.reload();
          })
          .catch((error)=>{
                console.log('error', error);
          })
        this.getCartData();   
        this.getCompanyDetails();
    }

    cartquantitydecrease(event){
    	event.preventDefault();
        const userid = localStorage.getItem('user_ID');
        const cartitemid = event.target.getAttribute('id');
        const quantity = parseInt(event.target.getAttribute('dataquntity'));
        // console.log('quantity', quantity);

        const quantityAdded = parseInt(quantity-1) <= 0 ? 1 : parseInt(quantity-1);
        const proprice = event.target.getAttribute('dataprice');
        if(quantity>0){
           var totalIndPrice   = quantityAdded * proprice;      
        }
        
        const formValues = { 
			"user_ID"     	: userid,
			"cartItem_ID" 	: cartitemid,
			"quantityAdded" : quantityAdded,
			"totalIndPrice"	: totalIndPrice
		}
        // console.log('formValues',formValues);
        axios.patch("/api/carts/quantity" ,formValues)
		.then((response)=>{
            window.location.reload();
		})
		.catch((error)=>{
		    console.log('error', error);
		})
		this.getCartData();   
        this.getCompanyDetails();
    }
    proceedToCheckout(event){
        event.preventDefault();
        this.props.history.push('/checkout');
    }
    continueShopping(event){
        event.preventDefault();
        this.props.history.push('/');
    }
    render(){
        return(
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
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
                                        this.state.productCartData && this.state.productCartData.length > 0?
                                        this.state.productCartData.map((data, index)=>{
                                            return(
                                                <tr>
                                                    <td>
                                                        <tr>
                                                            <td>
                                                                <img className="img img-responsive cartProductImg" src={data.productImage[0]} />
                                                            </td>
                                                            <td className="cartProductDetail">
                                                                <h5>{data.productName}</h5>
                                                                <span className="fa fa-heart cartWishIcon"></span>
                                                            </td>
                                                        </tr>
                                                    </td>
                                                    <td className="nowrap"><span className={"cartProductPrize fa fa-"+data.currency}>&nbsp; {data.offeredPrice}</span></td>
                                                    <td className="nowrap">
                                                        <span className="minusQuantity fa fa-minus" id={data._id} dataquntity={this.state.quantityAdded != 0 ? this.state.quantityAdded : data.quantity} dataprice={data.offeredPrice} onClick={this.cartquantitydecrease.bind(this)}></span>&nbsp;
                                                        <span className="inputQuantity">{this.state['quantityAdded|'+data._id] ? this.state['quantityAdded|'+data._id] : data.quantity}</span>&nbsp;
                                                        <span className="plusQuantity fa fa-plus" id={data._id} dataquntity={this.state.quantityAdded != 0 ? this.state.quantityAdded : data.quantity} dataprice={data.offeredPrice} onClick={this.cartquantityincrease.bind(this)}></span>
                                                    </td>
                                                    <td className="nowrap"><span className={"cartProductPrize fa fa-"+data.currency}>&nbsp;{this.state.totalIndPrice !=0 ? this.state.totalIndPrice : data.totalForQantity}</span></td>
                                                    <td>
                                                        <span className="fa fa-times cartDelete" id={data._id} onClick={this.Removefromcart.bind(this)}></span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                        :
                                        null
                                    }
                                </tbody>
                            </table>
                            <div className="col-lg-4 col-lg-offset-5 col-md-4 col-md-offset-5 col-sm-12 col-xs-12 NOpaddingLeft">
                            <button onClick={this.continueShopping.bind(this)} className="col-lg-10 col-lg-offset-2 col-md-10 col-md-offset-2 col-sm-12 col-xs-12 btn btn-warning continueShopping"> <i className="fa fa-angle-left cartLeftAngle" area-hidden="true"></i> &nbsp; CONTINUE SHOPPING</button>
                            </div>
                            <button className="col-lg-3 col-md-3 col-sm-12 col-xs-12 btn btn-warning cartButton"> UPDATE SHOPPING CART</button>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 ">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cartSummary">
                                <strong className="cartSummaryTitle">Summary</strong>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="row">
                                        <table className="table table-responsive summaryTable">
                                            <tbody>
                                                <tr>
                                                    <td>Subtotal</td>
                                                    <td className="textAlignRight">&nbsp; <i className={"fa fa-inr"}></i> {this.state.productData.cartTotal > 0 ? (parseInt(this.state.productData.cartTotal)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0.00"} </td>
                                                </tr>
                                                <tr>
                                                    <td>Shipping Charges</td>
                                                    <td className="textAlignRight">&nbsp; <i className={"fa fa-inr"}></i> {this.state.shippingCharges > 0 ?(this.state.shippingCharges).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0.00"} </td>
                                                </tr>
                                                <tr>
                                                    <td>GST ({this.state.vatPercent > 0 ? this.state.vatPercent : 0}%)</td>
                                                    <td className="textAlignRight">&nbsp; <i className={"fa fa-inr"}></i> {this.state.productData.cartTotal > 0 && this.state.vatPercent ?(this.state.productData.cartTotal*(this.state.vatPercent/100)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0.00"} </td>
                                                </tr>
                                                <tr>
                                                    <td>Order Total</td>
                                                    <td className="textAlignRight cartTotal">&nbsp; <i className={"fa fa-inr"}></i> { ((parseInt(this.state.vatPercent))/100*(parseInt(this.state.productData.cartTotal))+(parseInt(this.state.productData.cartTotal))+this.state.shippingCharges).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  </td>
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
                </div>
            </div>
        );
    }
}
export default withRouter(CartProducts);