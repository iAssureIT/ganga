import React, { Component } from 'react';
import swal from 'sweetalert';
import $                    from 'jquery';
import axios                from 'axios';
import SmallBanner               from '../../blocks/SmallBanner/SmallBanner.js';
import "./Account.css";
import Sidebar from '../../common/Sidebar/Sidebar.js';

class Account extends Component{
    constructor(props) {
        super(props);
        this.state={
            bannerData : {
                title : "ACCOUNT CONTROL PANEL",
                breadcrumb : 'My Shopping Cart',
                backgroungImage : '/images/my_account.png',
            }
        }
    }
    componentDidMount(){
        this.getUserData();
    }
    getUserData(){
        var userid = localStorage.getItem("user_ID");
        axios.get('/api/users/'+ userid)
        .then( (res)=>{
            console.log('res', res.data);
            this.setState({
                firstName       : res.data.profile.firstName,
                lastName        : res.data.profile.lastName,
                fullName        : res.data.profile.fullName,
                username        : res.data.profile.emailId,
                mobileNumber    : res.data.profile.mobileNumber,
                addressLine1    : res.data.profile.deliveryAdd[0].addressLine1,
                addressLine2    : res.data.profile.deliveryAdd[0].addressLine2,
                block           : res.data.profile.deliveryAdd[0].block,
                city            : res.data.profile.deliveryAdd[0].city,
                pincode         : res.data.profile.deliveryAdd[0].pincode,
                state           : res.data.profile.deliveryAdd[0].state,
                country         : res.data.profile.deliveryAdd[0].country,
                type            : res.data.profile.deliveryAdd[0].type,
                profileImage    : res.data.profile.profileImage
            })
        })
        .catch((error)=>{
          console.log("error = ",error);
          // alert("Something went wrong! Please check Get URL.");
        });
    }
    editUser(event){
        event.preventDefault();
        this.props.history.push('/edit');
    }
    render(){
        return(
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                <SmallBanner bannerData={this.state.bannerData}/>  
                
                <div className="container">
                    <br/>
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 NOpadding">
                        <Sidebar />
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8 NOpadding mt25">
                        <h4 className="accountTitle">Account control panel</h4>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt15 mb15">
                            <label>Hello {this.state.fullName}</label>
                            <p className="">From your My Account Dashboard you have the ability to view a snapshot of 
                            your recent account activity and update your account information. Select a link 
                            below to view or edit information.</p>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt15 mb15 NOpaddingLeft">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 accountBox">
                                    <div className="row">
                                        <div className="accountDivHeader">Contact Information</div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25 mb25">
                                            <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12">{this.state.fullName}</p>
                                            <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb25">{this.state.username}</p>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
                                                <button className="btn btn-warning" onClick={this.editUser.bind(this)}><i className="fa fa-pencil-square-o"></i> &nbsp; EDIT</button> &nbsp; &nbsp;<button className="btn btn-warning">CHANGE PASSWORD</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt15 mb15 NOpaddingRight">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 accountBox">
                                    <div className="row">
                                        <div className="accountDivHeader">Newsletters</div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25 mb25">
                                            <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12">You don't subscribe to our newsletter.</p>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
                                                <button className="btn btn-warning"><i className="fa fa-pencil-square-o"></i> &nbsp; EDIT</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt15 mb15 row">Address Book</label>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt15 mb15 NOpaddingLeft">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 accountBox">
                                    <div className="row">
                                        <div className="accountDivHeader">Default Billing Address</div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25 mb25">
                                            <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12">{this.state.fullName}</p>
                                            <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb25">
                                            {this.state.addressLine1},<br />
                                            {this.state.addressLine2},<br />
                                            {this.state.block}, {this.state.city},<br />
                                            {this.state.state}, {this.state.country} - {this.state.pincode}<br />
                                                T: {this.state.mobileNumber}
                                            </p>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
                                                <button className="btn btn-warning"><i className="fa fa-pencil-square-o"></i> &nbsp; EDIT ADDRESS</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt15 mb15 NOpaddingRight">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 accountBox">
                                    <div className="row">
                                        <div className="accountDivHeader">Default Shipping Address</div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25 mb25">
                                            <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12">{this.state.fullName}</p>
                                            <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb25">
                                            {this.state.addressLine1},<br />
                                            {this.state.addressLine2},<br />
                                            {this.state.block}, {this.state.city},<br />
                                            {this.state.state}, {this.state.country} - {this.state.pincode}<br />
                                                T: {this.state.mobileNumber}
                                            </p>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
                                                <button className="btn btn-warning"><i className="fa fa-pencil-square-o"></i> &nbsp; EDIT ADDRESS</button>
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

export default Account;