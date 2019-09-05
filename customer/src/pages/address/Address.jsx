import React, { Component } from 'react';
import $                    from 'jquery';
import StepWizard                   from "../../blocks/common/Wizard/StepWizard.jsx";
import AddAddressForm 		from './AddAddressForm.jsx';
import validator              from 'validator';
import './css/address.css';
import axios from 'axios';
import swal from 'sweetalert';


export default class Address extends Component{
	constructor(props){
		super(props);
		if(!this.props.loading){
            this.state = {
				'alldeliveryaddress':[],
				'addEditState'	:'',
				'index'  :'',
				'productCartTotal':'',
				'shippingCharges':0,
				"vatPercent"	: "",
				"productData":{},
			}
        } else{
            this.state = {
				'alldeliveryaddress':[],
				'addEditState'	:'',
				'index'  :'',
				'productCartTotal':'',
				'shippingCharges':0,
				"vatPercent"	: "",
				"productData":{},
				
			}
        }
		this.getCartData();   
        this.getCompanyDetails();
		this.getAllAddress();
	}
	componentWillReceiveProps(nextProps){
		this.getCartData();   
        this.getCompanyDetails();
		this.getAllAddress();
	}
	componentDidMount(){
		console.log('componentDidMount');
		this.getCartData();   
        this.getCompanyDetails();
		this.getAllAddress();

	   
		var modal = document.getElementById('myModalOne');
		var span = document.getElementsByClassName("addressmodalclose")[0];
		span.onclick = function() {
			modal.style.display = "none"; 
		}
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
	}

    getCartData(){
        const userid = localStorage.getItem('admin_ID');
        axios.get("/api/carts/get/list/"+userid)
          .then((response)=>{ 
              this.setState({
                cartProduct : response.data[0]
              })
               // console.log("cart1",this.state.cart._id);
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
	getAllAddress(){
		var user_ID = localStorage.getItem('admin_ID');
		axios.get('/api/users/'+user_ID)
		.then((response)=>{
			this.setState({
				alldeliveryaddress : response.data.profile.deliveryAdd
			})
		})
		.catch((error)=>{
			console.log('error', error);
		})
	}
	OpenLoinModal(event){
		event.preventDefault();
		$('#myModalOne').show();
	}

	addNewAddressMode(){
		// $('#firstname').val('');
		// $('#email').val('');
		// $('#mob').val('');
		// $('#houseNo').val('');
		// $('#landmark').val('');
		// $('#street').val('');
		// $('#city').val('');
		// $('#state').val('');
		// $('#pin').val('');
		// $('#addType').val('');
		// this.setState({
		// 	"addEditState":"AddMode",
		// });
	}

	editUserAddress(event){
		event.preventDefault();
		$('#myModalOne').show();

		// var currentIndex =$(event.currentTarget).attr('data-value');
		// this.setState({
		// 	"addEditState":"EditMode",
		// 	"index"       : currentIndex,
		// });
		
		// var userId  = Meteor.userId();
		// var address = Meteor.users.findOne({'_id':userId},{'profile.deliveryAdd':1});
		// // console.log("address---------------->",address);
		// 	if(address){
		// 		if(address.profile.deliveryAdd.length > 0){

		// 			$('#firstname').val(address.profile.deliveryAdd[currentIndex].name);
		// 			$('#email').val(address.profile.deliveryAdd[currentIndex].email);
		// 			$('#mob').val(address.profile.deliveryAdd[currentIndex].mob);
		// 			$('#houseNo').val(address.profile.deliveryAdd[currentIndex].houseNo);
		// 			$('#landmark').val(address.profile.deliveryAdd[currentIndex].landmark);
		// 			$('#street').val(address.profile.deliveryAdd[currentIndex].street);
		// 			$('#city').val(address.profile.deliveryAdd[currentIndex].city);
		// 			$('#state').val(address.profile.deliveryAdd[currentIndex].state);
		// 			$('#pin').val(address.profile.deliveryAdd[currentIndex].pin);
		// 			$('#addType').val(address.profile.deliveryAdd[currentIndex].addType);
		// 		}
		// 	}
	}

	removeAddress(event){
		// event.preventDefault();
		// var currentIndex =$(event.currentTarget).attr('data-value');
		// var userId = Meteor.userId();

		// if(userId){

		// 	Meteor.call('deleteDeliveryAddress',currentIndex,userId);
		// 	Meteor.call('removenullAddress',userId);
		// }

	}

	AddAddressToCart(event){
		event.preventDefault();
		const addrValue = $("input[name='deliveryAddr']:checked").val();
		console.log('addrValue', addrValue);
		// var addrObj = Meteor.users.findOne({"_id" : Meteor.userId()});
		var selectedObj = this.state.alldeliveryaddress[addrValue];
		console.log('selectedAdd', selectedObj);

		var formValues={
			user_ID 	: localStorage.getItem('admin_ID'),
			addType 	: selectedObj.addType,
			city 		: selectedObj.city,
			email 		: selectedObj.email,
			addressLine1 	: selectedObj.addressLine1,
			addressLine2 	: selectedObj.addressLine2,
			mobileNumber 		: selectedObj.mobileNumber,
			name 		: selectedObj.name,
			pincode 		: selectedObj.pincode,
			country : selectedObj.country,
			state 		: selectedObj.state,
		}
		axios.patch('/api/carts/address', formValues)
		.then((response)=>{
			console.log('res', response);
			this.props.history.push('/confirm-order');
		})
		.catch((error)=>{
			console.log('error', error);
		})
	}
	

	render(){
		window.scrollTo(0,0);
		return(
			<div className="backColorGray">	
				<StepWizard />
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addressouterwrapper backColorGray">
					<div className="backColorWhite col-lg-12 col-md-12 col-sm-12 col-xs-12 mt15 boxBorder mb20">
						<div className="col-lg-12 prodCartHeader">
							<div className="">
								<div className="prodCartTitle">
								Shipping Details
								</div>
							</div>
						</div>
						<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mb20">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addresswrap">
						<div className="garmentshippingHeader col-lg-9 col-md-12 col-sm-12 col-xs-12">Select Delivery Address
					</div>
					<div className="col-lg-9 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 addresses noLRPad">
					{/*<form>*/}
						{  this.state.alldeliveryaddress.map((data, index)=>{
								return(
									<div className="col-lg-5 col-md-5 col-sm-5 col-xs-12 garmentaddress-row" key={index}>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radioBtn">
											<input className="radiostyle addrRadio" type="radio" name="deliveryAddr" value={index} defaultChecked/>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addrHeightfix">
											<div title={data.name} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 deliveryName"><b>{data.name}</b></div>
											<div className="address-content col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<div title={data.addressLine1 +","} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 wraplineadd">{data.addressLine1},</div>
											<div title={data.addressLine2+data.city+" - "+data.pincode} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 wraplineadd">{data.addressLine2} <br/>{data.city} - {data.pincode}</div>
											<div title={data.state} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 wraplineadd">{data.state}</div>
											</div>
											<div className="mob col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<span className="mobile-label">Mobile:</span>
													<span className="mobile">{data.mobileNumber}</span>
											</div>

											{/* <div className="serviceability col-lg-12 col-md-12 col-sm-12 col-xs-12">
												<div>• Cash/Card on Delivery available</div>
												<div>• Standard delivery available</div>
											</div> */}
										</div>
										<div className="side-menu col-lg-12 col-md-12 col-sm-12 col-xs-12">

											<button className="btn col-lg-5 buttonhover deleteAdd" data-value={index} onClick={this.removeAddress.bind(this)} > Remove </button>
											<div className="btn btn-link buttonhover col-lg-5 pull-right editaddress" data-value={index} onClick={this.editUserAddress.bind(this)}> Edit </div>
										</div>

									</div>
								);
												
							})
						}
						
								

						{/*<!-- Modal -->*/}

						<div id="addressModal" className="modal fade" role="dialog">
						<div className="modal-dialog">

							{/*!<-- Modal content-->*/}
							<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal">&times;</button>
								<h4 className="modal-title">Shipping address</h4>
							</div>
							<div className="modal-body">
								addAddressEdit
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
							</div>
							</div>

						</div>
						</div>

						<div onClick={this.OpenLoinModal.bind(this)} className="col-lg-5 col-md-5 col-md-offset-0 col-sm-5 col-sm-offset-1 col-xs-12 addAddress-row garmentaddress">
						<i className="fa fa-plus-circle addMoreAddr" aria-hidden="true"></i><br/> 
							Add New Address 
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						
						</div>
						{/*</form>*/}

						
						<div id="myModalOne" className="modal addressmodal col-lg-8 col-lg-offset-2">
							<span className="addressmodalclose">X</span>
							<AddAddressForm dataMode={this.state.addEditState} index={this.state.index} getAllAddress={this.getAllAddress.bind(this)}/>
						</div>

					</div>	
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
													<a className="" onClick={this.AddAddressToCart.bind(this)}>
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

		);
	}
}