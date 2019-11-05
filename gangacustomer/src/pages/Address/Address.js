import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import jQuery from 'jquery';
import 'jquery-validation';
import "./Address.css";
import Sidebar from '../../common/Sidebar/Sidebar.js';
import _ from 'underscore';
import {ToastsContainer, ToastsStore ,ToastsContainerPosition,message,timer,classNames} from 'react-toasts';

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateArray:[]
        }
        this.camelCase = this.camelCase.bind(this)
    }
    componentDidMount(){
        var user_ID = localStorage.getItem("user_ID");
        var deliveryAddressID = this.props.match.params.deliveryAddressID;
        console.log('deliveryAddressID', deliveryAddressID);
        axios.get('/api/users/'+user_ID)
        .then((response)=>{
            var deliveryAddress = response.data.deliveryAddress.filter((a)=>{return a._id == deliveryAddressID});
            this.getStates(deliveryAddress[0].country);
            this.setState({
                "name"            : deliveryAddress[0].name,
                "email"           : deliveryAddress[0].email,
                "addressLine1"    : deliveryAddress[0].addressLine1,
                "addressLine2"    : deliveryAddress[0].addressLine2,  
                "pincode"         : deliveryAddress[0].pincode,
                "block"           : deliveryAddress[0].block,
                "city"            : deliveryAddress[0].city,
                "state"           : deliveryAddress[0].state,
                "country"         : deliveryAddress[0].country,
                "mobileNumber"    : deliveryAddress[0].mobileNumber,
                "addType"         : deliveryAddress[0].addType,
            })
        })
        .catch((error)=>{
            console.log('error', error);
        });
        this.validations();
    }
    validations(){
        $.validator.addMethod("regxusername", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Name should only contain letters.");
        $.validator.addMethod("regxmobileNumber", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid mobile number.");
        $.validator.addMethod("regxemail", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid email.");
        $.validator.addMethod("regxaddressLine", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid address.");
        $.validator.addMethod("regxcountry", function (value, element, arg) {
            return arg !== value;
        }, "Please select the country.");
        $.validator.addMethod("regxstate", function (value, element, arg) {
            return arg !== value;
        }, "Please select the state");
        $.validator.addMethod("regxblock", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid block name.");
        $.validator.addMethod("regxcity", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid city name");
        $.validator.addMethod("regxpincode", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid pincode.");
        $.validator.addMethod("regxaddType", function (value, element, arg) {
            return arg !== value;
        }, "Please select the address type.");
        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });
        $("#addressForm").validate({
            rules: {
                username: {
                    regxusername : /^[A-Za-z][A-Za-z0-9\-\s]*$/,
                    required: true,
                },
                mobileNumber: {
                    regxmobileNumber : /^([7-9][0-9]{9})$/,
                    required: true,
                },
                email: {
                    required: true,
                },
                addressLine1: {
                    required: true,
                    regxaddressLine : /^[A-Za-z][A-Za-z0-9\-\s]/,
                },
                addressLine2: {
                    required: true,
                    regxaddressLine : /^[A-Za-z][A-Za-z0-9\-\s]/,
                },
                country: {
                    required: true,
                    regxcountry: "Select Country"
                },
                state: {
                    required: true,
                    regxstate: "Select State"
                },
                block: {
                    required: true,
                    regxblock : /^[A-Za-z][A-Za-z0-9\-\s]/,
                },
                city: {
                    required: true,
                    regxcity : /^[A-Za-z][A-Za-z0-9\-\s]/,
                },
                pincode: {
                    required: true,
                    // regxpincode : /^[A-Za-z][A-Za-z0-9\-\s]*$/,
                },
                addType: {
                    required: true,
                    regxaddType: "Select Section"
                },
            },
            errorPlacement: function (error, element) {
              if (element.attr("name") == "username") {
                error.insertAfter("#username");
              }
              if (element.attr("name") == "mobileNumber") {
                error.insertAfter("#mobileNumber");
              }
              if (element.attr("name") == "email") {
                error.insertAfter("#email");
              }
              if (element.attr("name") == "addressLine1") {
                error.insertAfter("#addressLine1");
              }
              if (element.attr("name") == "addressLine2") {
                error.insertAfter("#addressLine2");
              }
              if (element.attr("name") == "country") {
                error.insertAfter("#country");
              }
              if (element.attr("name") == "state") {
                error.insertAfter("#state");
              }
              if (element.attr("name") == "block") {
                error.insertAfter("#block");
              }
              if (element.attr("name") == "city") {
                error.insertAfter("#city");
              }
              if (element.attr("name") == "pincode") {
                error.insertAfter("#pincode");
              }
              if (element.attr("name") == "addType") {
                error.insertAfter("#addType");
              }
            }
        });
    }
    componentWillReceiveProps(nextProps){

    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleChangeCountry(event){
      const target = event.target;
      this.setState({
        [event.target.name] : event.target.value
      })
      this.getStates($(target).val())
    }
    getStates(countryCode){
      axios.get("http://locationapi.iassureit.com/api/states/get/list/"+countryCode)
            .then((response)=>{
          
              this.setState({
                  stateArray : response.data
              })
              $('#Statedata').val(this.state.states);
            })
            .catch((error)=>{
                console.log('error', error);
            })
    }
    saveAddress(event){
        event.preventDefault();
        var deliveryAddressID = this.props.match.params.deliveryAddressID;
        var formValues = {
            "user_ID"         : localStorage.getItem("user_ID"),
            "deliveryAddressID" : deliveryAddressID,
            "name"            : this.state.username,
            "email"           : this.state.email,
            "addressLine1"    : this.state.addressLine1,
            "addressLine2"    : this.state.addressLine2,  
            "pincode"         : this.state.pincode,
            "block"           : this.state.block,
            "city"            : this.state.city,
            "state"           : this.state.state,
            "country"         : this.state.country,
            "mobileNumber"    : this.state.mobileNumber,
            "addType"         : this.state.addType,
        }
        if(deliveryAddressID){
            if($("#addressForm").valid()){
                console.log('form deliveryAddressID', formValues);
                axios.patch('/api/users/useraddress', formValues)
                .then((response)=>{
                ToastsStore.success(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
                    // swal(response.data);
                    this.props.history.push('/address-book');
                })
                .catch((error)=>{
                    console.log('error', error)
                });
            }
        }else{
            if($("#addressForm").valid()){
                axios.patch('/api/users/patch/address', formValues)
                .then((response)=>{
                ToastsStore.success(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
                    // swal(response.data.message);
                    this.props.history.push('/address-book');
                })
                .catch((error)=>{
                    console.log('error', error)
                });
            }
        }
        
    }
    camelCase(str){
      return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
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
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
            <div className="pagealertnone">
              <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
              </div>
                <div className="container">
                    <br />
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 NOpadding">
                        <Sidebar />
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8 NOpadding mt25 mb25">
                        <form id="addressForm" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                            <h3 className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Contact Information</h3>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Name <span className="required">*</span></label>
                                <input type="text" ref="username" name="username" id="username" value={this.state.username} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Mobile Number <span className="required">*</span></label>
                                <input type="text" ref="mobileNumber" name="mobileNumber" id="mobileNumber" value={this.state.mobileNumber} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                {/* <span className="col-lg-2 col-md-2 col-sm-1 col-xs-1  orderConfirmation fa fa-question-circle-o NOpadding" title="For delivery questions."></span> */}
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Email <span className="required">*</span></label>
                                <input type="email" ref="email" name="email" id="email" value={this.state.email} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Address Line 1 <span className="required">*</span></label>
                                <input type="text" ref="addressLine1" name="addressLine1" id="addressLine1" value={this.state.addressLine1} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Address Line 2 <span className="required">*</span></label>
                                <input type="text" ref="addressLine2" name="addressLine2" id="addressLine2" value={this.state.addressLine2} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Country <span className="required">*</span></label>
                                <select ref="country" name="country" id="country" value={this.state.country} onChange={this.handleChangeCountry.bind(this)}  className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <option value="Select Country">Select Country</option>
                                    <option value="IN">India</option>
                                    
                                </select>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">State <span className="required">*</span></label>
                                <select ref="state" name="state" id="state" value={this.state.state} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <option value="Select State">Select State</option>
                                     {
                                      this.state.stateArray && this.state.stateArray.length > 0 ?
                                      this.state.stateArray.map((stateData, index)=>{
                                        return(      
                                            <option key={index} value={this.camelCase(stateData.stateName)}>{this.camelCase(stateData.stateName)}</option>
                                          );
                                        }
                                      ) : ''
                                    }
                                </select>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Block <span className="required">*</span></label>
                                <input type="text" ref="block" name="block" id="block" value={this.state.block} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">City <span className="required">*</span></label>
                                <input type="text" ref="city" name="city" id="city" value={this.state.city} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Zip/Postal Code <span className="required">*</span></label>
                                <input type="text" ref="pincode" name="pincode" id="pincode" value={this.state.pincode} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Address type <span className="required">*</span></label>
                                <select id="addType" name="addType" ref="addType" value={this.state.addType} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <option value="Home">Home (All day delivery) </option>
                                    <option value="Office">Office/Commercial (10 AM - 5 PM Delivery)</option>
                                </select>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                <button onClick={this.saveAddress.bind(this)} className="btn btn-warning addressSaveBtn">Save Address</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Address;