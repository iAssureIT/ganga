import React, {Component}    		from 'react';
import StepWizard   				from "../../blocks/common/Wizard/StepWizard.jsx";
import EcommerceHeader 				from "../../blocks/common/EcommerceHeader/EcommerceHeader.js";
import EcommerceFooter    			from "../../blocks/common/EcommerceFooter/EcommerceFooter.js";
import $ 					 from 'jquery';
import _ 					 from 'underscore';
import swal 				 from 'sweetalert';
import axios 				 from 'axios';
import moment from 'moment';
import "./BillingDetails.css";
import Ordertermsandconditions      from"./Ordertermsandconditions.js";
import Paymentgateway           	from"./Paymentgateway.js";

 export default class BillingDetails extends Component{
	constructor(props){
		super(props);
		this.state ={
			"companyData" 	  : {},
			"cartProducts"    :["product1"],
			"cartProduct"       : '',
			"carttotal"       : '',
			"currency"        : '',
			"deliveryaddress" :{},
			"vatPercent:"     :'',
			"shippingCharges" :0,
			"termsandconditions" :'',
		}
	}
	componentDidMount(){
		this.getCartDetails();
		var modal = document.getElementById('Ordertermsandconditionsmodal');
		var span = document.getElementsByClassName("Ordertermsandconditionsmodalclose")[0];
		span.onclick = function() {
			modal.style.display = "none";
        }
		var modal = document.getElementById('paymentgatewayformmodal');
		var span = document.getElementsByClassName("paymentgatewayformclose")[0];
		span.onclick = function() {
			modal.style.display = "none";
        }

        $('input[name="payMethod"]').change(function() {
		   if($(this).is(':checked') && $(this).val() == 'Payment Gateway') {
    		 $('#paymentgatewayformmodal').show();
		   }
		});
	}
	getCartDetails(){
		var user_ID = localStorage.getItem('admin_ID');
		axios.get('/api/carts/get/one/'+user_ID)
		.then((response)=>{
			console.log('res', response.data);
			this.setState({
                cartProduct : response.data
            },()=>{this.getCompanySetting()})
		})
		.catch((error)=>{

		})
	}
	getCompanySetting(){
		axios.get('/api/companysettings/list')
		.then((response)=>{
			console.log('company', response.data[0])
			this.setState({
				"companyData"      : response.data[0],
			},()=>{
				console.log('companyData', this.state.companyData);
				this.getCartTotal()
			})
		})
		.catch((error)=>{
			console.log('error', error);
		})
	}
	getCartTotal(){
		var cartProduct = this.state.cartProduct;
		 if(cartProduct){
		   var carttotal = cartProduct.cartTotal;
		 }else{
		   var carttotal = '';
		 }
		 
		var companyData = this.state.companyData;

		
	   
		   if(companyData){
		   
			 if(cartProduct){
			   if(cartProduct.cartItems.length > 0){
				 this.setState({
				   "shippingCharges":0,
				 });
			   } else{
				 this.setState({
				   "shippingCharges":0,
				 });
			   }
			   
			   this.setState({
				 'cartProducts'    : cartProduct.cartItems,
				 'cartTotal'       : cartProduct.cartTotal,
				 "vatPercent"      : companyData.taxSettings[0].taxRating,
				 'deliveryaddress' : cartProduct.deliveryAdd,
				 'termsandconditions' : companyData.companyTerms,
			   });
   
			 } else{
			   this.setState({
				 "shippingCharges":0,
			   });
			 }
		 }
	}
	grandtotalFunction(cartItemsMoveMain){
		var taxes           = []; 
		var calTax          = [];
		var calculateTax    = [];
		var temp            = [];
		var grandTotal      = 0;
		var taxTotal        = 0;
		var totalTaxApplied = 0;
		var cartElem        = cartItemsMoveMain;
		if(cartElem){
				
			var noOfProducts = cartElem.cartItems.length;
			console.log('noOfProducts', noOfProducts)
			var totalAmount  = 0;
			for(var i=0;i < noOfProducts;i++){
				var productId    = cartElem.cartItems[i].productId;
				var qty          = cartElem.cartItems[i].quantity;
				var offeredPrice = cartElem.cartItems[i].offeredPrice;
				var finalPrice   = offeredPrice * qty;
				totalAmount     += finalPrice;
				
			} // end of i loop
			console.log(totalAmount);
			if(totalAmount > 0){
				var themeSettings = this.state.companyData;
				console.log("themeSettings",themeSettings);
				
					if(themeSettings){
						var taxCount  = themeSettings.taxSettings.length;
						console.log(taxCount);
						if(taxCount > 0){
							for(var j=0;j < taxCount;j++){
								var taxName          = themeSettings.taxSettings[j].taxType;
								var createdAt        = themeSettings.taxSettings[j].createdAt;
								var taxValue         = themeSettings.taxSettings[j].taxRating;
								var taxeffectiveFrom = themeSettings.taxSettings[j].effectiveFrom;
								var taxeffectiveTo   = themeSettings.taxSettings[j].effectiveTo ? themeSettings.taxSettings[j].effectiveTo : new Date();
		
								console.log('taxeffectiveTo',taxeffectiveTo);
		
								var from = taxeffectiveFrom; 
								var effectiveDateFrom = new Date(from[0], from[1] - 1, from[2]);
								taxes.push({
									'taxName'           : taxName,
									'taxValue'          : parseFloat(taxValue),
									'effectiveDateFrom' : effectiveDateFrom,
									// 'effectiveDateTo'   : effectiveDateTo,
									'timeStamp'         : createdAt,
								});
							} // for loop j 
							var taxesAllowed = _.pluck(taxes,"taxName");
							var uniqueTaxes  = _.uniq(taxesAllowed);
							if(uniqueTaxes){
								if(uniqueTaxes.length > 0){
									for(var k=0;k<uniqueTaxes.length;k++){
										for(var l=0;l<taxes.length;l++){
											if(uniqueTaxes[k] == taxes[l].taxName){
												var currentDate = new Date();
												
												// console.log((taxes[l].effectiveDateFrom <= currentDate) && (taxes[l].effectiveDateTo == null || taxes[l].effectiveDateTo >= currentDate || (taxes[l].effectiveDateFrom == currentDate)) )
												
												var taxTotal   = 0;
												var taxApplied = parseFloat(totalAmount) * ( parseFloat(taxes[l].taxValue) / 100 );
										
												taxTotal       = parseFloat(taxTotal) + parseFloat(taxApplied);  								
												calTax.push({
													'taxName'   : taxes[l].taxName,
													'taxValue'  : parseFloat(taxes[l].taxValue),
													'taxTotal'  : parseFloat(taxTotal) ,
													'timeStamp' : taxes[l].timeStamp,
												});
											} // end of uniqueTaxes[k] == taxes[l].taxName
										} // end of l loop
							
									} // end of k loop
								} //uniqueTaxes.length
							}    // if uniqueTaxes
						
							var multipleTaxes     = _.pluck(calTax,"taxName");
							var uniqueTaxesNames  = _.uniq(multipleTaxes); 
		
							for(var c=0;c<uniqueTaxesNames.length;c++){
		
								var taxNameCountVar = 0
								for(var d=0;d<calTax.length;d++){
									if(calTax[d].taxName == uniqueTaxesNames[c]){
										taxNameCountVar++;
									}
								} // Check for count
		
								if(taxNameCountVar > 1){
									for(var d=0;d<calTax.length;d++){
										if(calTax[d].taxName == uniqueTaxesNames[c]){
											temp.push({
													'taxName'   : calTax[d].taxName,
													'taxValue'  : parseFloat(calTax[d].taxValue),
													'taxTotal'  : parseFloat(calTax[d].taxTotal) ,
													'timeStamp' : new Date(calTax[d].timeStamp).getTime(),                             
											}); // end array
										} // end if
									} // end d loop
									for(var e=0;e<temp.length;e++){
									if(temp[0].timeStamp < temp[e].timeStamp){
										temp[0].timeStamp = temp[e].timeStamp;
										temp[0].taxName   = temp[e].taxName;
										temp[0].taxValue  = temp[e].taxValue;
										temp[0].taxTotal  = temp[e].taxTotal;
									
										} // end if
									} // end e loop
		
									calculateTax.push({
										'taxName'   : temp[0].taxName,
										'taxValue'  : parseInt(temp[0].taxValue),
										'taxTotal'  : parseInt(temp[0].taxTotal) ,
										'timeStamp' : temp[0].timeStamp,                             
									}); // end array
									temp = [];
								}else{
									for(var d=0;d<calTax.length;d++){
										if(calTax[d].taxName == uniqueTaxesNames[c]){
											calculateTax.push({
													'taxName'   : calTax[d].taxName,
													'taxValue'  : parseFloat(calTax[d].taxValue),
													'taxTotal'  : (parseFloat(calTax[d].taxTotal)) ,
													// 'taxTotalDisplay'  : formatRupees(parseFloat(calTax[d].taxTotal)) ,
													'taxTotalDisplay'  : (parseFloat(calTax[d].taxTotal)) ,
													'timeStamp' : calTax[d].timeStamp,                             
											}); // end array
										} // end if 
									}  // end of d loop   
								} // end else
							}
						
							if(calculateTax.length > 0){
								for(var m=0;m<calculateTax.length;m++){
									totalTaxApplied += calculateTax[m].taxTotal;
								} // end of m loop
								var finalsubTotal = parseFloat(totalAmount) + parseFloat(totalTaxApplied);
								// console.log("finalsubTotal :"+finalsubTotal);
								if((totalAmount>0) && (totalAmount <= 500)){
									var shippingCharges = 100;
								
								}else if((totalAmount > 500) && (totalAmount <=1000)){
									var shippingCharges = 50;
								}else{
								var shippingCharges = 0; 
								}
								
								var finalTotal = parseFloat(totalAmount) + parseFloat(totalTaxApplied)+this.state.shippingCharges;
								if(cartElem.couponUsed){
									if(cartElem.couponUsed.moneySaved){
										var taxCalc = {
											'finalTotal' : (parseFloat(finalTotal)-parseFloat(cartElem.couponUsed.moneySaved)),
											'taxes'      : calculateTax,
										} // end of taxCalc
		
									}else{
											var taxCalc = {
												'finalTotal' : (parseFloat(finalTotal)),
												'taxes'      : calculateTax,
											} // end of taxCalc         
									}
								}else{
									
									var taxCalc = {
										'finalTotal' : (parseFloat(finalTotal)),
										'taxes'      : calculateTax,
									} // end of taxCalc                            
		
									// console.log("finalTotal :"+(parseInt(finalTotal)));
								}
		
							} // end of calTax.length > 0
		
						} // if taxCount > 0
						// console.log(taxCalc);
					} // end if themesettings
				
	
			} // end of totalAmount > 0
	
	
		} //end of if cartElem
		console.log("taxCalc",taxCalc);
		
		return taxCalc;
	}
	addToOrder(event){
		event.preventDefault();		
		var payMethod = $("input[name='payMethod']:checked").val();
		var checkedBox= $(".termscheckbox").prop("checked");
		var formValues ={
			"payMethod" : payMethod,
			"user_ID" : localStorage.getItem('admin_ID')
		 }
		 console.log('formValues', formValues);
		if(checkedBox){
			if(payMethod == "" || payMethod == null){
				swal('Please Select Payment Method');
			}else{
				console.log(payMethod);
				axios.patch('/api/carts/payment', formValues)
				.then((response)=>{
					console.log('response', response);
				})
				.catch((error)=>{
					console.log('error', error);
				})
		
				var cartItemsMoveMain  = this.state.cartProduct;
				// var cartItemsMoveMain  = Cart.findOne({"userId" : Meteor.userId()});
				// console.log("addToOrder cartItemsMoveMain",cartItemsMoveMain);
	
				var grandTotalArray = this.grandtotalFunction(cartItemsMoveMain);
				// var grandTotalArray = 100;
				//console.log("grandTotalArray=-+-=-=-=->: ",grandTotalArray);
				console.log(grandTotalArray);
				
				if(grandTotalArray){
					var totalAmount       = grandTotalArray.finalTotal;
					// var totalAmount       = 100;
					var selectedPayMethod = payMethod;
					// var userId            = Meteor.userId();
					if(payMethod == "Cash On Delivery"|| payMethod == 'Cash Payment' || payMethod == 'cheque payment'){
	
						var userId      = localStorage.getItem('admin_ID');
						var i           = 0;
						var productIds  = [];
						var prices      = [];
						var qtys        = [];
						var totals      = [];
						var index       = [];
						var discountedProdPrice = [];
						var totalAmount   = 0;
						var discountAvail = 0;
						var cartItemsMove  = cartItemsMoveMain;
						
						if(cartItemsMove){		
							var noOfItems = cartItemsMove.cartItems.length;
							for(i=0;i<noOfItems;i++){
								var discountPrice = 0;
								var cartProduct    = cartItemsMove.cartItems[i];
								var productId      = cartProduct.productId;
								var productIndex   = cartProduct.indexInproducts;
								var qty            = cartProduct.quantity;
	
								if(cartProduct.deductedAmtAftrCoupon){ 
									discountPrice  = cartProduct.deductedAmtAftrCoupon;
								}
			
								productIds[i]   = productId;
								prices[i]       = (cartProduct.offeredPrice);
								qtys[i]         = qty;
								totals[i]       = (cartProduct.totalForQantity); ;
								totalAmount     = totalAmount + totals[i];
								index[i]        = productIndex;
								discountedProdPrice[i] = discountPrice;
							}
						
							// if(grandtotalValue){
								var inputObject = {
									"user_ID"             : userId,
									"productIds"          : productIds,
									"productName"         : cartItemsMove.productName,
									"prices"              : prices,
									"qtys"                : qtys,
									"totals"              : totals,
									"discountedProdPrice" : discountedProdPrice,
									"totalAmount"         : (grandTotalArray.finalTotal),
									"index"               : index,
									"totalForQantity"     : cartItemsMove.totalForQantity,
									"productImage"        : cartItemsMove.productImage,
									// "couponUsed"          : cartItemsMove.couponUsed,
								}
								console.log('inputObject', inputObject);
								axios.post('/api/orders/post', inputObject)
								.then((result)=>{
									if(result){
										console.log('result', result.data);
										axios.get('/api/orders/get/one/'+result.data.order_ID)
										.then((orderStatus)=>{
											if(orderStatus){
												var userId  = orderStatus.userId;
												var orderNo = orderStatus.OrderId;
												var orderDbDate =  orderStatus.createdAt;
												var orderDate   =  moment(orderDbDate).format('DD/MM/YYYY');
												var totalAmount = orderStatus.totalAmount;
												
												
															
												var userId  = localStorage.getItem('admin_ID');
												console.log('order_ID', result.data.order_ID);
												
												// this.props.history.push("/PaymentResponse/"+result.data.order_ID); 
												this.props.history.push('/payment/'+result.data.order_ID);
												// window.location.reload();
												swal('Order Placed Successfully');    	
												
											}
										})
										.catch((error)=>{
											console.log('error', error)
										})
									}
								})
								.catch((error)=>{
									console.log(error)
								})
									
						}else{
							if(selectedPayMethod == "Online Payment"){
								//console.log("in payment gateway meteor call");
								// Meteor.call('paymentGateway',totalAmount,  (error, result)=> { 
								// 	if (error) {
								// 	} 
								// 	else {
								// 		if(result){
								// 			window.location = result;
								// 		}else{                              
								// 			this.props.history.push('/payment-error');
								// 		}
	
								// 	}//the _id of new object if successful
								// });
							}
						}
					}//End of grandtotal array
				}
			}
		}else{
			swal('Please Read and Accept Terms & Conditions');
		}
	}

   Ordertermsandconditionsmodal(event){
     event.preventDefault();
     $('#Ordertermsandconditionsmodal').show();
   }
   Ordertermsandconditionsmodalhide(event){
     event.preventDefault();
     $('#Ordertermsandconditionsmodal').hide();
   }
   paymentgatewayformmodal(event){
     event.preventDefault();
     $('#paymentgatewayformmodal').show();
   }

		  
  render(){
    return (
		<div>
			<StepWizard />	
    		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  backColorGray">
	    	<div className="backColorWhite col-lg-12 col-md-12 col-sm-12 col-xs-12 mt15 boxBorder mb20">
				
	    		<div className="col-lg-12 prodCartHeader">
	    			<div className="prodCartTitle">Order Summary</div>
	    		</div>
				
	    		<div className="col-lg-4 billingmargin">
	    			<div className="">
	    				<h3 className="col-lg-12 AddressHeader">Delivery address</h3>
	    			</div>
	    			<div className="col-lg-12">
		    			<div className="col-lg-12 AddressDetail">
		    			<h5 className="wraplineadd">{this.state.deliveryaddress ? this.state.deliveryaddress.name : ""}</h5>
		    			<p className="wraplineadd">{this.state.deliveryaddress ?<span>{this.state.deliveryaddress.addressLine1} <br /> {this.state.deliveryaddress.addressLine2} {this.state.deliveryaddress.block}, {this.state.deliveryaddress.city},{this.state.deliveryaddress.pincode} <br /> Mobile : {this.state.deliveryaddress.mobileNumber} .</span> : ""}</p>
		    			
		          {/*<h5 className="wraplineadd">{this.state.deliveryaddress.name}</h5>
		            <p className="wraplineadd">{this.state.deliveryaddress.houseNo}, <br /> {this.state.deliveryaddress.street} ,{this.state.deliveryaddress.landmark} - {this.state.deliveryaddress.city},{this.state.deliveryaddress.pin} <br /> Mobile :{this.state.deliveryaddress.mob} .</p>
		          */}</div>
	          	  </div>
	    		</div>
	    	
				<div className="col-lg-12 ProductBorder mb20">
					<div className="col-lg-12">
							<h3 className="col-lg-12 ProductHead">Ordered Products</h3>
						<div className="col-lg-12 tableHead">
					<div className="row">
							<table className="table .table-hover .table-responsive tablesText">
								<thead>
									<tr>
										<th className="ProductNo">Item</th>
										<th className="ProductName">Product Name</th>
										<th className="ProductImg">Product</th>
										<th className="offeredPrice">Price</th>
										<th className="ProductQty">Qty</th>
										<th className="ProductSub">Subtotal</th>
									</tr>
								</thead>
								<tbody>
						
							
									
								
					{  this.state.cartProducts.map((data, index)=>{
						// console.log('productImage', data.productImage);
					return(
						<tr key={index}>
						<td className="ProductTxtdata">{index+1}</td>
						<td className="ProductTxtdata">{data.productName}</td>
					<td className="ProductImageHead">{data && data.productImage ? data.productImage.map((a,i)=>{ if(i==0){return <img className="ProductImage img-thumbnail" src={a}/>}}): null}</td>
						<td className={"ProductTxtdata fa fa-"+data.currency}>&nbsp;{(parseInt(data.offeredPrice)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
						<td className="ProductTxtdata">{data.quantity}</td>
						<td className={"ProductTxtdata fa fa-"+data.currency}>&nbsp;{(parseInt(data.totalForQantity).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}</td>
						</tr>
					)
					
					})
					}
								</tbody>
							</table>
					</div>
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
						<div className="totalAmount totalAmountWrapper pull-right col-lg-4 col-md-12 col-sm-12 col-xs-12 grandTotalCalc">
					
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 garmentextraTaxation">
							<span className="col-lg-6 col-md-6 col-sm-6 col-xs-6 garmentcartvaluesTitles noLRPad">Sub Total</span>
				<span className="summation col-lg-6 col-md-6 col-sm-6 col-xs-6 cartrightpull pull-right noLRPad" id="totalAmount"><span className="">
					<i className={this.state.cartProduct && this.state.cartProduct.cartItems && this.state.cartProduct.cartItems.length > 0 ? "fa fa-"+this.state.cartProduct .cartItems[0].currency : null}></i> 
						&nbsp;</span>{(parseInt(this.state.cartTotal)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> 
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 garmentextraTaxation">
							<span className="col-lg-8 col-md-6 col-sm-6 col-xs-6 garmentcartvaluesTitles noLRPad">Shipping Charges</span>
				<span className="summation col-lg-4 col-md-6 col-sm-6 col-xs-6 cartrightpull pull-right noLRPad" id="totalAmount"> <span className="">
				<i className={this.state.cartProduct && this.state.cartProduct.cartItems && this.state.cartProduct.cartItems.length > 0 ? "fa fa-"+this.state.cartProduct .cartItems[0].currency : null}></i> 
						&nbsp;</span>{(parseInt(this.state.shippingCharges)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> 
						</div>
						
						<br/>
					
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 garmentextraTaxation">
							<span className="col-lg-6 col-md-6 col-sm-6 col-xs-6 garmentcartvaluesTitles  noLRPad"><span className="taxclass">GST</span>&nbsp;({this.state.vatPercent}%)</span> 
					<span className="col-lg-6 col-md-6 col-sm-6 col-xs-6 cartrightpull pull-right taxWrapper noLRPad"><span className="">
					<i className={this.state.cartProduct && this.state.cartProduct.cartItems && this.state.cartProduct.cartItems.length > 0 ? "fa fa-"+this.state.cartProduct .cartItems[0].currency : null}></i> 
					&nbsp;</span>{((parseInt(this.state.vatPercent))/100*(parseInt(this.state.cartTotal))).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span><br/>
						</div>
					
						<br/>
					
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grandTotalWrapper">
							<span className="col-lg-6 col-md-6 col-sm-6 col-xs-6 grandTotalEcommerce  noLRPad">Grandtotal</span>
				<span className="grandTotalEcommerce col-lg-6 col-md-6 col-sm-6 col-xs-6 cartrightpull pull-right taxWrapper noLRPad">
					<span className="">
					<i className={this.state.cartProduct && this.state.cartProduct.cartItems && this.state.cartProduct.cartItems.length > 0 ? "fa fa-"+this.state.cartProduct .cartItems[0].currency : null}></i> 
						&nbsp;</span>{((parseInt(this.state.vatPercent))/100*(parseInt(this.state.cartTotal))+(parseInt(this.state.cartTotal))+this.state.shippingCharges).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
						</div>
						<br/>			

					</div>
			</div>
					</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paymentHead">
				<div className="row">
							<div className="col-lg-12 col-md-11 col-sm-12 col-xs-12 ProductHead garmentshippingHeaders">
								Choose Payment Mode
							</div>
				</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="col-lg-6 col-md-11 col-sm-12 col-xs-12 billingbuttonwrap">
								<form id="payMethods">						
					<div className=" col-lg-12 col-md-6 col-sm-7 col-xs-7">
						<div className=" col-lg-8 col-md-6 col-sm-7 col-xs-7 PaymentProcess">
							<div className="centreDetailContainerEcommerce checkboxclick col-lg-1 ">
								<input type="radio" name="payMethod" value="Cash On Delivery"/>
								<span className="radioCheckEcommerce"></span>
							</div>                  
							<h4 className="paymenth4Ecommerce noLRPad col-lg-8">Cash On Delivery</h4>
						</div>
					</div>
					
					<div className=" col-lg-12 col-md-6 col-sm-7 col-xs-7">
						<div className=" col-lg-8 col-md-6 col-sm-7 col-xs-7 PaymentProcess">
							<div className="centreDetailContainerEcommerce checkboxclick col-lg-1 ">
								<input type="radio" name="payMethod" value="Payment Gateway"/>
								<span className="radioCheckEcommerce"></span>
							</div>                  
							<h4 className="paymenth4Ecommerce noLRPad col-lg-8">Credit/Debit Card</h4>
						</div>
					</div>
					
					{/* {
					{
					this.props.companyData.paymentgateway == true ?
									<div className=" col-lg-12 col-md-6 col-sm-5 col-xs-5 PaymentProcess">
									<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<input type="radio" name="payMethod" value="Online Payment" className="iconRadio garmentRadio col-lg-6 col-md-4 col-sm-4 col-xs-6"/>
										<h4 className="paymenth4 col-lg-4 noLRPad">Payment Gateway</h4>
									</label>
									</div>
					:
					null
					}
					{
					this.props.companyData.upi == true ?
									<div className=" col-lg-12 col-md-6 col-sm-5 col-xs-5 PaymentProcess">
									<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<input type="radio" name="payMethod" value="Online Payment" className="iconRadio garmentRadio col-lg-6 col-md-4 col-sm-4 col-xs-6"/>
										<h4 className="paymenth4 col-lg-4 noLRPad">UPI</h4>
										
									</label>
									</div>
					:
					null
					}
					{
					this.props.companyData.banktransfer == true ?
					<div className=" col-lg-12 col-md-6 col-sm-5 col-xs-5 PaymentProcess">
						<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<input type="radio" name="payMethod" value="Online Payment" className="iconRadio garmentRadio col-lg-6 col-md-4 col-sm-4 col-xs-6"/>
						<h4 className="paymenth4 col-lg-4 noLRPad">Bank Transfer</h4>
						
						</label>
					</div>
					:
					null
					}*/}
					
								
									{/* ***********Terms And Conditions Modal****** */}

											<div id="Ordertermsandconditionsmodal" className="modal Useraccountmodal ssmodal">
											<button type="button" className="close Ordertermsandconditionsmodalclose" onClick={this.Ordertermsandconditionsmodalhide.bind(this)}>&times;</button>
											<Ordertermsandconditions />
											</div>
											<div id="paymentgatewayformmodal" className="modal Useraccountmodal ssmodal">
											<button type="button" className="close paymentgatewayformclose" data-dismiss="modal">&times;</button>
											<Paymentgateway />
											</div>

								{/* 
									==============================================================================
																	Our Policies
									============================================================================== 
								*/}

								</form>
							</div>
							
							<div className="col-lg-6 ">
								<div className="orderplaceFooter Btns col-lg-12 col-md-12 col-sm-12 col-xs-12 addresswrap">
									<div className=" col-lg-12 col-md-6 col-sm-5 col-xs-5 termsandconditionstext">
										{/* <button type="button" className="termsbtn col-lg-12 btn btn-info btn-lg" data-toggle="modal" data-target="#termsandconditions">Our Terms And Conditions</button> */}
						<div className="centreDetailContainerEcommerce col-lg-1 row">

							<input type="checkbox" className="termscheckbox"/>
							<span className="centreDetailCheckEcommerce"></span>
						</div>
						<span className="centreDetaillistItemEcommerce"></span>
						<span className="termsandconditionstext"> I agree,&nbsp;to the</span> 
										<a onClick={this.Ordertermsandconditionsmodal.bind(this)}><strong>Terms & Conditions</strong> </a>
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
												<a className="" onClick={this.addToOrder.bind(this)}>
													Continue&nbsp;To&nbsp;Checkout
												</a>
											</div>
										</div>
									</div>
									<div className=" col-lg-7 col-md-6 col-sm-5 col-xs-5 termsandconditionstext noLRPad">
									</div>
									<div className=" col-lg-5 col-md-6 col-sm-5 col-xs-5 termsandconditionstext">
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
    );
}
}
