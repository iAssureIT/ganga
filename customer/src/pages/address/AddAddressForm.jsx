import React, { Component } from 'react';
import $                    from 'jquery';
import axios from 'axios';
import './css/address.css'
import Axios from 'axios';
import swal from 'sweetalert';

axios.defaults.baseURL = 'http://gangaexpressapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';
export default class AddAddressForm extends Component{
	constructor(props){
		super(props);
		
	}

		// componentDidMount() {
		// $.validator.addMethod("regxA1", function(value, element, regexpr) {         
		// 	return regexpr.test(value);
		// }, "Please enter alphabets only!");
		// $.validator.addMethod("regxAA2", function(value, element, regexpr) {         
		// 	return regexpr.test(value);
		// }, "Please enter valid text!");
		// $.validator.addMethod("regxA3", function(value, element, regexpr) {         
		// 	return regexpr.test(value);
		// }, "Please enter valid phone number!"); 
		// $.validator.addMethod("regxAA4", function(value, element, regexpr) {         
		// 	return regexpr.test(value);
		// }, "Please enter valid E-mailID");
		// $.validator.addMethod("regxSelect", function(value, element, regexpr) {         
		// 	return regexpr !== value;
		// }, "Please select value");
		
	//      jQuery.validator.setDefaults({
	//         debug: true,
	//         success: "valid"
	//      });
	//      $("#addAddressForm").validate({
	//           rules: {
	//            firstname: {
	//                 required: true,
	//                 regxA1: /^[A-Za-z][A-Za-z0-9\-\s]*/,
	//            },
	//            houseNo: {
	//                 required: true,
	//                 regxAA2: /^[A-Za-z0-9][A-Za-z0-9\-\s]*/,
					
	//            },
	//            mob: {
	//                 required: true,
	//            },
	//            email: {
	//                required: true,
	//                regxAA4: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	//            },
	//            addressLine2 :{
	//            	required :false,
	//            },
	//            addressLine1:{
	//            	required:true,
	//                regxAA2: /^[A-Za-z][A-Za-z0-9\-\s]*/,
	//            },
	//            city: {
	//            	required:true,
	//            	regxAA2: /^[A-Za-z][A-Za-z0-9\-\s]*/,
	//            },
	//            state:{
	//            	required:true,
	//            	regxAA2: /^[A-Za-z][A-Za-z0-9\-\s]*/,
	//            },
	//            pincode:{
	//            	required:true
	//            },
	//            addType:{
	//            	required :true,
	//            	regxSelect: "NOTSELECTED"
	//            }
	//       },
	//       errorPlacement: function(error, element) {
	//            if (element.attr("name") == "firstname"){
	//                 error.insertAfter("#firstname");
	//            }
	//            if (element.attr("name") == "houseNo"){
	//                 error.insertAfter("#houseNo");
	//            }
	//            if (element.attr("name") == "mobileNumber"){
	//                 error.insertAfter("#mobileNumber");
	//            }
	//            if (element.attr("name") == "email"){
	//                 error.insertAfter("#email");
	//            }  
	//            if (element.attr("name") == "addressLine2"){
	//                 error.insertAfter("#addressLine2");
	//            }  
	//            if (element.attr("name") == "addressLine1"){
	//                 error.insertAfter("#addressLine1");
	//            }   
	//            if (element.attr("name") == "city"){
	//                 error.insertAfter("#city");
	//            }  
	//            if (element.attr("name") == "state"){
	//                 error.insertAfter("#state");
	//            }   
	//            if (element.attr("name") == "pincode"){
	//                 error.insertAfter("#pincode");
	//            }  
	//            if (element.attr("name") == "addType"){
	//                 error.insertAfter("#addType");
	//            }  
	//            if (element.attr("name") == "pincode"){
	//                 error.insertAfter("#pincode");
	//            }  
	//        }
	//      });
		// }

	submitaddress(event){
		event.preventDefault();
		console.log('submitaddress')
		var addEditMode = this.props.dataMode;
		var addEditMode = 'AddMode';

		var index = this.props.index;
		var userId = localStorage.getItem('admin_ID');
		console.log('user', userId );
			var formValues = {
				user_ID  : userId,
				name     : this.refs.firstname.value,
				email    : this.refs.email.value,
				mobileNumber      : (this.refs.mobileNumber.value).replace(/-/g,''),
				addressLine1 : this.refs.addressLine1.value,
				addressLine2   : this.refs.addressLine2.value,
				country : this.refs.country.value,
				block : this.refs.block.value,
				city     : this.refs.city.value,
				state    : this.refs.state.value,
				pincode      : this.refs.pincode.value,
				addType  : this.refs.addType.value,
			}
			if(addEditMode == "AddMode"){
				if(userId){
					axios.patch('/api/users/patch/address', formValues)
					.then((response)=>{
						console.log('response', response);
						swal(response.data.message);
						this.props.getAllAddress();
						var modal = document.getElementById('myModalOne');
						modal.style.display = "none";
					})
					.catch((error)=>{
						console.log('error', error);
					})
				}
			}else {
				
				// if(userId){
				// 	Meteor.call('editDeliveryAddress',formValues,userId,index,function(error,result){
				// 		if(result){
				// 			$('#firstname').val('');
				// 			$('#email').val('');
				// 			$('#mobileNumber').val('');
				// 			$('#addressLine2').val('');
				// 			$('#addressLine1').val('');
				// 			$('#city').val('');
				// 			$('#state').val('');
				// 			$('#pincode').val('');
				// 			$('#addType').val('');
				// 		}
				// 	});
				// }
				// $("#myModalOne").modal("hide");
				return false;
			}
		
	}
	// validateNumber(e) {
	// 	var invalidcharacters = /[^0-9]/gi
	// 	var phn = document.getElementById('mobileNumber');
	// 	if (invalidcharacters.test(phn.value)) {
	// 		newstring = phn.value.replace(invalidcharacters, "");
	// 		phn.value = newstring
	// 		// console.log('val phn', phn.value);
	// 	}

	// 	var dynamicMask = new IMask(document.getElementById('mobileNumber'),{
 //    		mask: [{
 //      		mask: '00000-00000'
      		
	//     	}
	//     	// ,
	//     	// {

 //      // 		mask: /^\S*@?\S*$/

 //    		// }
 //    		]
	// 	})

	// }

// validatepin(e) {
// 		var invalidcharacters = /[^0-9]/gi
// 		var phn = document.getElementById('pin');
// 		if (invalidcharacters.test(phn.value)) {
// 			newstring = phn.value.replace(invalidcharacters, "");
// 			phn.value = newstring
// 			// console.log('val phn', phn.value);
// 		}

// 		var dynamicMask = new IMask(document.getElementById('pin'),{
//     		mask: [{
//       		mask: '000000'
      		
// 	    	}
// 	    	// ,
// 	    	// {

//       // 		mask: /^\S*@?\S*$/

//     		// }
//     		]
// 		})

// 	}

	render(){
		return(
			<div className="col-lg-12 addAddress ">
				<form className="addAddressForm" id="addAddressForm">
				 	 
				  <div className="form-group col-lg-12 modalLabelAddr" id="personName">
				    <label className="modalLabelAddr">Full name of receving person<span className="addressastric">*</span> </label>
				    <input type="text" className="form-control" id="firstname" ref="firstname" name="firstname" placeholder="Ex : John Doe"/>
				  </div>
				  <div className="form-group col-lg-8 modalLabelAddr" id="receivingEmail">
				    <label className="modalLabelAddr">Email address of receving person <span className="addressastric">*</span> </label>
				    <input type="email" className="form-control" id="email" ref="email" name="email" placeholder="Ex : John@gmail.com" required/>
				  </div>
				  <div className="form-group col-lg-4 modalLabelAddr" id="mobileNumber">
				    <label className="modalLabelAddr">Mobile number <span className="addressastric">*</span></label>
				    <input type="text" className="form-control" ref="mobileNumber" id="mobileNumber" name="mobileNumber" placeholder="Ex : +91-9876543210" pattern="\d{5}[\-]\d{5}" />
				  </div>
				  
				 
				  <div className="form-group col-lg-12 col-lg-12 modalLabelAddr">
				    <label className="modalLabelAddr">Address Line 1 <span className="addressastric">*</span></label>
				    <input type="text" className="form-control" id="addressLine1" ref="addressLine1" name="addressLine1" placeholder="Ex : Avenue Street" required />
				  </div>
				  <div className="form-group col-lg-6 modalLabelAddr">
				    <label className="modalLabelAddr">Address Line 2 <span className="addressastriccust">*</span></label>
				    <input type="text" className="form-control" id="addressLine2" ref="addressLine2" name="addressLine2" placeholder="Ex : Near Reebok Showroom" />
				  </div>
				  <div className="form-group col-lg-4 modalLabelAddr NOpadding-right">
				    <label className="modalLabelAddr">Block <span className="addressastric">*</span> </label>
				    <input type="text" className="form-control" id="block" ref="block" name="block" placeholder="Ex : Pune" required/>
				  </div>
				  <div className="form-group col-lg-4 modalLabelAddr NOpadding-right">
				    <label className="modalLabelAddr">Town/City <span className="addressastric">*</span> </label>
				    <input type="text" className="form-control" id="city" ref="city" name="city" placeholder="Ex : Pune" required/>
				  </div>
				  <div className="form-group col-lg-4 modalLabelAddr NOpadding-right">
				    <label className="modalLabelAddr">State / Provience <span className="addressastric">*</span></label>
				    <input type="text" className="form-control" id="state" ref="state" name="state" placeholder="Ex : Maharashtra" required/>
				  </div>
				  <div className="form-group col-lg-4 modalLabelAddr NOpadding-right">
				    <label className="modalLabelAddr">Country<span className="addressastric">*</span></label>
				    <input type="text" className="form-control" id="country" ref="country" name="country" placeholder="Ex : Maharashtra" required/>
				  </div>
				  <div className="form-group col-lg-4 modalLabelAddr ">
				    <label className="modalLabelAddr">Pincode /Postcode <span className="addressastric">*</span></label>
				    <input type="text" className="form-control" id="pincode" ref="pincode" name="pincode" placeholder="Ex : 412201"   />
				  </div>
				  <div className="form-group col-lg-12 modalLabelAddr">
					  <label id="addType" className="modalLabelAddr">Address type <span className="addressastric">*</span></label>
					  <select className="form-control" id="addType" name="addType" ref="addType">
					    <option>Home (All day delivery) </option>
					    <option>Office/Commercial (10 AM - 5 PM Delivery)</option>  
                		</select>
					</div>
				  <div className="col-lg-12"><button type="submit" onClick={this.submitaddress.bind(this)} className="col-lg-4 col-lg-offset-4 btn btn-default modalBtns buttonhover" >Delivery to this address</button></div>
				</form>
			</div>

		);
	}
}