import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import SmallBanner from '../../blocks/SmallBanner/SmallBanner.js';
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
            "name"            : this.state.name,
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
            console.log('form deliveryAddressID', formValues);
            axios.patch('/api/users/useraddress', formValues)
            .then((response)=>{
             ToastsStore.success(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
                // swal(response.data);
            })
            .catch((error)=>{
                console.log('error', error)
            });
        }else{
            console.log('form', formValues);
            axios.patch('/api/users/patch/address', formValues)
            .then((response)=>{
             ToastsStore.success(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
                // swal(response.data.message);
            })
            .catch((error)=>{
                console.log('error', error)
            });
        }
        this.props.history.push('/address-book');
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
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                            <h3 className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Contact Information</h3>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Name <span className="required">*</span></label>
                                <input type="text" ref="name" name="name" id="name" value={this.state.name} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
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

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Address;