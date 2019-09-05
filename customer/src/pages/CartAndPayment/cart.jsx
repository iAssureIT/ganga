import React, { Component } from 'react';
import swal from 'sweetalert';
import $                    from 'jquery';
import StepWizard                   from "../../blocks/common/Wizard/StepWizard.jsx";
import EcommerceHeader              from "../../blocks/common/EcommerceHeader/EcommerceHeader.js";
import EcommerceFooter              from "../../blocks/common/EcommerceFooter/EcommerceFooter.js";
import axios                from 'axios';

import "./cart.css";

class ViewCart extends Component{
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
            totalIndPrice: 0
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
    const token = localStorage.getItem("token");
        return(
            <div className="backColorGray">
            <StepWizard />  
                <div className="cartWrapper backColorGray col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="backColorWhite col-lg-12 col-md-12 col-sm-12 col-xs-12 boxBorder mb20">
                        <div className="col-lg-12 prodCartHeader">
                            <div className="">
                                <div className="prodCartTitle">
                                    Shopping Cart
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="cartBody col-lg-12 mb20">
                                <div className="col-lg-12 cartBodyHeader">
                                    <div className="col-lg-4 col-md-5 col-sm-5 col-xs-5">
                                        Items
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                    Actual Price
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                    Offer Price
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                        Quantity
                                    </div>
                                    <div className="col-lg-1 col-md-2 col-sm-2 col-xs-2">
                                        Total
                                    </div>
                                    <div className="col-lg-1  col-md-1 col-sm-1 col-xs-1">
                                        Action
                                    </div>
                                </div>
                                {
                                    this.state.productCartData && this.state.productCartData && this.state.productCartData.length >0 ?
                                    this.state.productCartData.map((data,index)=>{
                                        console.log('productCartData', data);
                                return(

                                    <div key={index} className="col-lg-12 cartBodyTable">
                                        <div className="col-lg-4 col-md-5 col-sm-5 col-xs-5">
                                            <div className="prodCartItems col-lg-12">
                                                <div className="prodCartItemImg img img-thumbnail col-lg-12">
                                                    <img src={data && data.productImage ? data.productImage[0] : ""} alt="Product Image" className="img-responsive" />
                                                </div>
                                                <div className="prodCartItemDesc  col-lg-12 ">
                                                    <div className="prodDescInner">
                                                        <p className="prodCartItemTitle" title={data.productName} href="">
                                                            {data.productName}
                                                        </p>
                                                        <p className="prodCartItemCode">
                                                            Product Code:{data.productCode}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-2  col-md-2 col-sm-2 col-xs-2">
                                            <div className="cartTableBodyPricePrime">
                                                <div className="cartTableBodyPricePrm fa fa-inr">
                                                &nbsp;{data.actualPrice} 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-2  col-md-2 col-sm-2 col-xs-2">
                                            <div className="cartTableBodyPricePrime">
                                                <div className="cartTableBodyPricePrm fa fa-inr">
                                                &nbsp;{data.offeredPrice} 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-2  col-md-2 col-sm-2 col-xs-2 noLRPad">
                                            <div className="cartTableBodyQntPrime">
                                                <div title="Decrease Quantity"  className="prodQntDecrese"><i className="fa fa-minus quantityiconsize" id={data._id} dataquntity={this.state.quantityAdded != 0 ? this.state.quantityAdded : data.quantity} dataprice={data.offeredPrice} onClick={this.cartquantitydecrease.bind(this)} aria-hidden="true"></i></div>
                                                <span className="prodQntValue">{this.state.quantityAdded != 0 ? this.state.quantityAdded : data.quantity}</span>
                                                <div title="Increase Quantity" className="prodQntIncrease"><i className="fa fa-plus quantityiconsize" id={data._id} dataquntity={this.state.quantityAdded != 0 ? this.state.quantityAdded : data.quantity} dataprice={data.offeredPrice} onClick={this.cartquantityincrease.bind(this)} aria-hidden="true"></i></div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1  col-md-2 col-sm-2 col-xs-2">
                                            <div className="cartTableBodyActPrime">
                                                <div className="cartTableBodyActPrm">
                                                    <div className="cartProdIndvPrice fa fa-inr">
                                                        &nbsp;{this.state.totalIndPrice !=0 ? this.state.totalIndPrice : data.totalForQantity}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1  col-md-1 col-sm-1 col-xs-1">
                                            <div className="cartTableBodyActPrime">
                                                <div className="cartTableBodyActPrm">

                                                    <div title="Remove from Cart"  className=" pull-right removeCartProd">
                                                        <i className="fa fa-trash" aria-hidden="true" id={data._id} onClick={this.Removefromcart.bind(this)}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        );
                                    })
                                    :
                                    <div>
                                        <h5 className="col-lg-12 textAlignCenter"><b>Your cart is empty</b></h5>
                                        <div className="col-lg-12 textAlignCenter">
                                        <img src="/images/emptycart.png" />
                                        </div>
                                        <p className="col-lg-12 textAlignCenter emptyCartMsg">Looks like you haven't added anything to your cart yet.</p>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="col-lg-4 marginBottomCart">
                            <div className="prodCartFooter">
                                <div className="col-lg-12">
                                    <div className="prodCartFooterTotal">
                                        <div className="prodCartheadTotalVal col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <span className ="pull-left">Total</span>
                                            <span className="pull-right">
                                                <i className="fa fa-inr"></i> 
                                                &nbsp; {this.state.productData.cartTotal > 0 ? (parseInt(this.state.productData.cartTotal)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0.00"} 
                                        </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="cartPayDetails">
                                        <div className="row ">
                                            <div className="col-lg-12 cartPayDetails12Col">
                                                <div className="col-lg-8">
                                                    Total Price
                                                </div>
                                                <div className="col-lg-4 cartrightpull">
                                                <i className="fa fa-inr"></i> 
                                                &nbsp; {this.state.productData.cartTotal > 0 ? (parseInt(this.state.productData.cartTotal)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0.00"} 
                                                </div>
                                            </div>
                                            <div className="col-lg-12 cartPayDetails12Col">
                                                <div className="col-lg-8">
                                                    Shipping Charges
                                                </div>
                                                <div className="col-lg-4 cartrightpull">
                                                    <i className="fa fa-inr"></i> 
                                                    &nbsp; {this.state.shippingCharges > 0 ?(this.state.shippingCharges).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0.00"} 
                                                </div>
                                            </div>
                                            <div className="col-lg-12 cartPayDetails12Col">
                                                <div className="col-lg-8">
                                                    GST ({this.state.vatPercent > 0 ? this.state.vatPercent : 0}%)
                                                </div>
                                                <div className="col-lg-4 cartrightpull">
                                                    <i className="fa fa-inr"></i> 
                                                    &nbsp; {this.state.productData.cartTotal > 0 && this.state.vatPercent ?(this.state.productData.cartTotal*(this.state.vatPercent/100)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0.00"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="prodCartFooterValue row">
                                        <div className="col-lg-12">
                                            <div className="prodCartFooterTotal">
                                                <div className="prodCartFooterTotalVal col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <span className ="cartleftpull col-lg-6 col-md-6 col-sm-6 col-xs-6">Grand Total</span> 
                                                <span className="cartrightpull col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                    <i className="fa fa-inr"></i> 
                                                    &nbsp; { ((parseInt(this.state.vatPercent))/100*(parseInt(this.state.productData.cartTotal))+(parseInt(this.state.productData.cartTotal))+this.state.shippingCharges).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt20">
                                            <div className="">
                                                <div className="cartbuttonmrb cartbuttonanchor">
                                                    <a className="" href="/"> Back to Shop </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt20" >
                                            <div className="">
                                                <div className="cartbuttonmrb cartbuttonanchor" >
                                                    <a className="" href="/address">
                                                        Continue&nbsp;To&nbsp;Checkout
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ViewCart;