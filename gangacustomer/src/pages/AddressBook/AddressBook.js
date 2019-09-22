import React, { Component } from 'react';
import swal from 'sweetalert';
import $                    from 'jquery';
import axios                from 'axios';
import SmallBanner               from '../../blocks/SmallBanner/SmallBanner.js';
import "./AddressBook.css";
import Sidebar from '../../common/Sidebar/Sidebar.js';

class AddressBook extends Component{
    constructor(props) {
        super(props);
        this.state={
            deliveryAddresses : []
        }
    }
    componentDidMount(){
        this.getUserData();
        this.getUserAddresses();
    }
    getUserData(){
        var userid = localStorage.getItem("user_ID");
        axios.get('/api/users/'+ userid)
        .then( (res)=>{
            console.log('res getUserData', res.data);
            this.setState({
                name              : res.data.deliveryAddress ? res.data.deliveryAddress[0].name : "",
                email              : res.data.deliveryAddress ? res.data.deliveryAddress[0].email : "",
                mobileNumber              : res.data.deliveryAddress ? res.data.deliveryAddress[0].mobileNumber : "",
                deliveryAddressID : res.data.deliveryAddress ? res.data.deliveryAddress[0]._id : "",
                addressLine1    : res.data.deliveryAddress ? res.data.deliveryAddress[0].addressLine1 : "",
                addressLine2    : res.data.deliveryAddress ? res.data.deliveryAddress[0].addressLine2 : "",
                block           : res.data.deliveryAddress ? res.data.deliveryAddress[0].block : "",
                city            : res.data.deliveryAddress ? res.data.deliveryAddress[0].city : "",
                pincode         : res.data.deliveryAddress ? res.data.deliveryAddress[0].pincode : "",
                state           : res.data.deliveryAddress ? res.data.deliveryAddress[0].state : "",
                country         : res.data.deliveryAddress ? res.data.deliveryAddress[0].country : "",
                type            : res.data.deliveryAddress ? res.data.deliveryAddress[0].type : "",
            })
        })
        .catch((error)=>{
          console.log("error = ",error);
          // alert("Something went wrong! Please check Get URL.");
        });
    }
    getUserAddresses(){
        var userid = localStorage.getItem("user_ID");
        axios.get('/api/users/'+ userid)
        .then( (res)=>{
            console.log('res getUserData', res.data);
            this.setState({
                deliveryAddresses : res.data.deliveryAddress
            })
        })
        .catch((error)=>{
          console.log("error = ",error);
          // alert("Something went wrong! Please check Get URL.");
        });   
    }


    render(){
        return(
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                <div className="container">
                    <br/>
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 NOpadding">
                        <Sidebar />
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8 NOpadding mt25">
                        <h4 className="addTitle">Default Addresses</h4>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt15 mb15 NOpaddingLeft">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="row">
                                    <label>Default Billing Address</label>
                                    <p>
                                        {this.state.name} <br />
                                        {this.state.addressLine1} <br />
                                        {this.state.addressLine2} <br />
                                        {this.state.block}, {this.state.city},<br />
                                        {this.state.state}, {this.state.country} - {this.state.pincode}<br />
                                        T: {this.state.mobileNumber}
                                    </p>
                                    <a href={'/address/'+this.state.deliveryAddressID} className="btn btn-warning mt15">Change Billing Address</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt15 mb25 NOpaddingRight">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="row">
                                    <label>Default Shipping Address</label>
                                    <p>
                                        {this.state.name} <br />
                                        {this.state.addressLine1} <br />
                                        {this.state.addressLine2} <br />
                                        {this.state.block}, {this.state.city},<br />
                                        {this.state.state}, {this.state.country} - {this.state.pincode}<br />
                                        T: {this.state.mobileNumber}
                                    </p>
                                    <a href={'/address/'+this.state.deliveryAddressID} className="btn btn-warning mt15">Change Shipping Address</a>
                                </div>
                            </div>
                        </div>
                        <h4 className="addTitle mt25">Additional Address Entries</h4>
                        {
                            this.state.deliveryAddresses && this.state.deliveryAddresses.length > 0 ?
                            this.state.deliveryAddresses.map((address , index)=>{
                                if(index != 0){
                                    return(
                                        <div key={'address'+index} className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt15 mb15 NOpaddingLeft">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="row">
                                                    <p>
                                                        {address.name} <br />
                                                        {address.addressLine1} <br />
                                                        {address.addressLine2} <br />
                                                        {address.block}, {address.city},<br />
                                                        {address.state}, {address.country} - {address.pincode}<br />
                                                        T: {address.mobileNumber}
                                                    </p>
                                                    <a href={'/address/'+address._id} className="btn btn-warning mt15">Edit Address</a>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            })
                            :
                            <p>You have no other address entries in your address book.</p>
                        }
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding mt25">
                        <a href="/address" className="btn btn-warning addressSaveBtn">Add New Address</a>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default AddressBook;