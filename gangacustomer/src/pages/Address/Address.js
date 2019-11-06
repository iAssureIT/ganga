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
        this.modalvalidation();
        this.edit(this.props.addressId);
    }
    modalvalidation() {
        $.validator.addMethod("modalregxname", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Name should only contain letters & number.");
        $.validator.addMethod("modalregxmobileNumber", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid mobile number.");
        $.validator.addMethod("modalregxemail", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid email address.");
        $.validator.addMethod("regexmodaladdressLine", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid address.");
        $.validator.addMethod("modalregxpincode", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid pincode");
        $.validator.addMethod("modalregxblock", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid block");
        $.validator.addMethod("modalregxcity", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid city");
        $.validator.addMethod("modalregxstate", function (value, element, arg) {
            return arg !== value;
        }, "Please select the state");
        $.validator.addMethod("modalregxcountry", function (value, element, arg) {
            return arg !== value;
        }, "Please select the country");
        $.validator.addMethod("modalregxaddType", function (value, element, arg) {
            return arg !== value;
        }, "Please select the address type");

        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });

        $("#modalAddressForm").validate({
            rules: {
                modalname: {
                    required: true,
                    modalregxname : /^[A-Za-z][A-Za-z0-9\-\s]*$/,
                },
                modalmobileNumber: {
                    required: true,
                    modalregxmobileNumber: /^([7-9][0-9]{9})$/,
                },
                modalemail: {
                    required: true,
                },
                modaladdressLine1: {
                    required: true,
                    regexmodaladdressLine : /^[A-Za-z0-9_@./#&+-]/,
                },
                // modaladdressLine2: {
                //     required: true,
                //     regexmodaladdressLine : /^[A-Za-z0-9_@./#&+-]/,
                // },
                modalpincode: {
                    required: true,
                    modalregxpincode : /^[1-9][0-9]{5}$/,
                },
                modalblock: {
                    required: true,
                    modalregxblock : /^[A-Za-z][A-Za-z\-\s]*$/,
                },
                modalcity: {
                    required: true,
                    modalregxcity : /^[A-Za-z][A-Za-z\-\s]*$/,
                },
                modalstate: {
                    required: true,
                    modalregxstate: "Select State"
                },
                modalcountry: {
                    required: true,
                    modalregxcountry: "Select Country"
                },
                modaladdType: {
                    required: true,
                    modalregxaddType: "Select Type"
                },
            },
            errorPlacement: function (error, element) {
                if (element.attr("name") == "modalname") {
                    error.insertAfter("#modalname");
                }
                if (element.attr("name") == "modalmobileNumber") {
                    error.insertAfter("#modalmobileNumber");
                }
                if (element.attr("name") == "modalemail") {
                    error.insertAfter("#modalemail");
                }
                if (element.attr("name") == "modaladdressLine1") {
                    error.insertAfter("#modaladdressLine1");
                }
                // if (element.attr("name") == "modaladdressLine2") {
                //     error.insertAfter("#modaladdressLine2");
                // }
                if (element.attr("name") == "modalpincode") {
                    error.insertAfter("#modalpincode");
                }
                if (element.attr("name") == "modalblock") {
                    error.insertAfter("#modalblock");
                }
                if (element.attr("name") == "modalcity") {
                    error.insertAfter("#modalcity");
                }
                if (element.attr("name") == "modalstate") {
                    error.insertAfter("#modalstate");
                }
                if (element.attr("name") == "modalcountry") {
                    error.insertAfter("#modalcountry");
                }
                if (element.attr("name") == "modaladdType") {
                    error.insertAfter("#modaladdType");
                }
            }
        });
    }
    edit(deliveryAddressID){
        var user_ID = localStorage.getItem("user_ID");
        // var deliveryAddressID = this.props.match.params.deliveryAddressID;
        console.log('deliveryAddressID', deliveryAddressID);
        axios.get('/api/users/'+user_ID)
        .then((response)=>{
            console.log('res', response.data);
            var deliveryAddress = response.data.deliveryAddress.filter((a)=>{return a._id == deliveryAddressID});
            this.getStates(deliveryAddress[0].country);
            this.setState({
                "modalname"        : deliveryAddress[0].name,
                "modalemail"           : deliveryAddress[0].email,
                "modaladdressLine1"    : deliveryAddress[0].addressLine1,
                "modaladdressLine2"    : deliveryAddress[0].addressLine2,  
                "modalpincode"         : deliveryAddress[0].pincode,
                "modalblock"           : deliveryAddress[0].block,
                "modalcity"            : deliveryAddress[0].city,
                "modalstate"           : deliveryAddress[0].state,
                "modalcountry"         : deliveryAddress[0].country,
                "modalmobileNumber"    : deliveryAddress[0].mobileNumber,
                "modaladdType"         : deliveryAddress[0].addType,
            })
        })
        .catch((error)=>{
            console.log('error', error);
        });
    }
    componentWillReceiveProps(nextProps){
        this.edit(nextProps.addressId);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleChangeCountry(event){
      const target = event.target;
      this.getStates(event.target.value)
      this.setState({
        [event.target.name] : event.target.value
      })
      
    }
    getStates(countryCode) {
        axios.get("http://locationapi.iassureit.com/api/states/get/list/" + countryCode)
        .then((response) => {
            this.setState({
                stateArray: response.data
            })
            $('#Statedata').val(this.state.states);
        })
        .catch((error) => {
            console.log('error', error);
        })
    }
    saveAddress(event){
        event.preventDefault();
        var deliveryAddressID = this.props.addressId;
        var formValues = {
            "user_ID"         : localStorage.getItem("user_ID"),
            "deliveryAddressID" : deliveryAddressID,
            "name"            : this.state.modalname,
            "email"           : this.state.modalemail,
            "addressLine1"    : this.state.modaladdressLine1,
            "addressLine2"    : this.state.modaladdressLine2,  
            "pincode"         : this.state.modalpincode,
            "block"           : this.state.modalblock,
            "city"            : this.state.modalcity,
            "state"           : this.state.modalstate,
            "country"         : this.state.modalcountry,
            "mobileNumber"    : this.state.modalmobileNumber,
            "addType"         : this.state.modaladdType,
        }
        console.log('formValues', formValues);
        if(deliveryAddressID){
            if($("#modalAddressForm").valid()){
                console.log('form deliveryAddressID', formValues);
                axios.patch('/api/users/useraddress', formValues)
                .then((response)=>{
                ToastsStore.success(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
                    // swal(response.data);
                    this.props.opDone();
                    $(".checkoutAddressModal").hide();
                    // $(".checkoutAddressModal").css({display: 'none'});
                    // $(".modal-header").css({display: 'block'});
                    // $(".modal-body").css({display: 'block'});
                    // $(".modal-footer").css({display: 'block'});
                    // $(".checkoutAddressModal").removeClass("in");
                    $(".modal-backdrop").hide();
                    window.location.reload();
                })
                .catch((error)=>{
                    console.log('error', error)
                });
            }
        }else{
            if($("#modalAddressForm").valid()){
                axios.patch('/api/users/patch/address', formValues)
                .then((response)=>{
                ToastsStore.success(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
                    // swal(response.data.message);
                    this.props.opDone();
                    $(".checkoutAddressModal").hide();
                    // $(".checkoutAddressModal").css({display: 'none'});
                    // $(".modal-header").css({display: 'block'});
                    // $(".modal-body").css({display: 'block'});
                    // $(".modal-footer").css({display: 'block'});
                    // $(".checkoutAddressModal").removeClass("in");
                    $(".modal-backdrop").hide();
                    window.location.reload();
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
            <div className="modal col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 checkoutAddressModal NOpadding" id="checkoutAddressModal" role="dialog">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                    <div className="modal-content col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                        <div className="modal-header checkoutAddressModal col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Shipping Address</h4>
                        </div>
                        <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <form id="modalAddressForm">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Full Name <span className="required">*</span></label>
                                    <input type="text" ref="modalname" name="modalname" id="modalname" value={this.state.modalname} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Mobile Number <span className="required">*</span></label>
                                    <input placeholder="Eg. 9876543210" type="text" ref="modalmobileNumber" name="modalmobileNumber" id="modalmobileNumber" value={this.state.modalmobileNumber} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                    {/* <span className="col-lg-2 col-md-2 col-sm-1 col-xs-1  orderConfirmation fa fa-question-circle-o NOpadding" title="For delivery questions."></span> */}
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Email <span className="required">*</span></label>
                                    <input type="email" ref="modalemail" name="modalemail" id="modalemail" value={this.state.modalemail} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Address Line 1 <span className="required">*</span></label>
                                    <input type="text" ref="modaladdressLine1" name="modaladdressLine1" id="modaladdressLine1" value={this.state.modaladdressLine1} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Address Line 2 </label>
                                    <input type="text" ref="modaladdressLine2" name="modaladdressLine2" id="modaladdressLine2" value={this.state.modaladdressLine2} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Country <span className="required">*</span></label>
                                    <select ref="modalcountry" name="modalcountry" id="modalcountry" value={this.state.modalcountry} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" onChange={this.handleChangeCountry.bind(this)}>
                                        <option value="Select Country">Select Country</option>
                                        <option value="IN">India</option>
                                    </select>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">State <span className="required">*</span></label>
                                    <select ref="modalstate" name="modalstate" id="modalstate" value={this.state.modalstate} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <option value="Select State">Select State</option>
                                        {
                                            this.state.stateArray && this.state.stateArray.length > 0 ?
                                                this.state.stateArray.map((stateData, index) => {
                                                    return (
                                                        <option key={index} value={this.camelCase(stateData.stateName)}>{this.camelCase(stateData.stateName)}</option>
                                                    );
                                                }
                                                ) : ''
                                        }
                                    </select>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Block/Taluka <span className="required">*</span></label>
                                    <input type="text" ref="modalblock" name="modalblock" id="modalblock" value={this.state.modalblock} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">City <span className="required">*</span></label>
                                    <input type="text" ref="modalcity" name="modalcity" id="modalcity" value={this.state.modalcity} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Zip/Postal Code <span className="required">*</span></label>
                                    <input type="text" ref="modalpincode" name="modalpincode" id="modalpincode" value={this.state.modalpincode} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Address type <span className="required">*</span></label>
                                    <select id="modaladdType" name="modaladdType" ref="modaladdType" value={this.state.modaladdType} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <option value="Home">Home (All day delivery) </option>
                                        <option value="Office">Office/Commercial (10 AM - 5 PM Delivery)</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer checkoutAddressModal col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <button type="button" className="btn btn-warning" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-warning" onClick={this.saveAddress.bind(this)}>{this.props.addressId ? 'Update Address' :'Save Address'}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Address;