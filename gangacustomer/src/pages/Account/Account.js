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
                            <label>Hello Manisha Kharare</label>
                            <p className="">From your My Account Dashboard you have the ability to view a snapshot of 
                            your recent account activity and update your account information. Select a link 
                            below to view or edit information.</p>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt15 mb15 NOpaddingLeft">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 accountBox">
                                    <div className="row">
                                        <div className="accountDivHeader">Contact Information</div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25 mb25">
                                            <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Manisha Kharare</p>
                                            <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb25">manisha.kharare@iassureit.com</p>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
                                                <button className="btn btn-warning"><i className="fa fa-pencil-square-o"></i> &nbsp; EDIT</button> &nbsp; &nbsp;<button className="btn btn-warning">CHANGE PASSWORD</button>
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
                                            <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Manisha Kharare</p>
                                            <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb25">
                                                ia<br />
                                                nbmn<br />
                                                bmnnnnnnn, Connecticut, nmbbbbbbb<br />
                                                United States<br />
                                                T: 9087667890
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
                                            <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Manisha Kharare</p>
                                            <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb25">
                                                ia<br />
                                                nbmn<br />
                                                bmnnnnnnn, Connecticut, nmbbbbbbb<br />
                                                United States<br />
                                                T: 9087667890
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