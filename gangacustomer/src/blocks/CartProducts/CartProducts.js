import React, { Component } from 'react';
import swal from 'sweetalert';
import $                    from 'jquery';
import axios                from 'axios';
import Banner               from '../../blocks/Banner/Banner.js';
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
        const userid = localStorage.getItem('admin_ID');
        axios.get("/api/carts/get/list/"+userid)
          .then((response)=>{ 
          	// console.log('response', response)
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
                  // console.log('companyInfo', this.state.companyInfo);
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
        const userid = localStorage.getItem('admin_ID');
        // console.log("userid",userid);
        const cartitemid = event.target.getAttribute('id');
        // console.log("cartitemid",cartitemid);

        const formValues = { 
              "user_ID"    : userid,
              "cartItem_ID" : cartitemid,
          }

        axios.patch("/api/carts/remove" ,formValues)
          .then((response)=>{

            swal(response.data.message)           
             .then((obj)=>{
                  window.location.reload();
             });

            this.getData();   

          })
          .catch((error)=>{
                console.log('error', error);
          })


    }

    cartquantityincrease(event){
        event.preventDefault();
        const userid = localStorage.getItem('admin_ID');
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

          })
          .catch((error)=>{
                console.log('error', error);
          })
        this.getCartData();   
        this.getCompanyDetails();
    }

    cartquantitydecrease(event){
    	event.preventDefault();
        const userid = localStorage.getItem('admin_ID');
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

		})
		.catch((error)=>{
		    console.log('error', error);
		})
		this.getCartData();   
        this.getCompanyDetails();
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
                                                                <img className="img img-responsive cartProductImg" src="/images/Logo.png" />
                                                            </td>
                                                            <td className="cartProductDetail">
                                                                <h5>Product Name</h5>
                                                                <span className="fa fa-heart cartWishIcon"></span>
                                                            </td>
                                                        </tr>
                                                    </td>
                                                    <td><span className="cartProductPrize">$336.00</span></td>
                                                    <td>
                                                        <span className="minusQuantity fa fa-minus"></span>&nbsp;
                                                        <span className="inputQuantity">12</span>&nbsp;
                                                        <span className="plusQuantity fa fa-plus"></span>
                                                    </td>
                                                    <td>
                                                        <span className="fa fa-times cartDelete"></span>
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
                            <button className="col-lg-10 col-lg-offset-2 col-md-10 col-md-offset-2 col-sm-12 col-xs-12 btn btn-warning continueShopping"> <i className="fa fa-angle-left cartLeftAngle"></i> &nbsp; CONTINUE SHOPPING</button>
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
                                                    <td className="textAlignRight">$872.00</td>
                                                </tr>
                                                <tr>
                                                    <td>Discount</td>
                                                    <td className="textAlignRight">-$174.40</td>
                                                </tr>
                                                <tr>
                                                    <td>Order Total</td>
                                                    <td className="textAlignRight cartTotal">$697.60</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <button className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-warning cartCheckout">
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
export default CartProducts;