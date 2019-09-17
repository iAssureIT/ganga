import React, { Component } from 'react';
import swal from 'sweetalert';
import $                    from 'jquery';
import axios                from 'axios';
import SmallBanner               from '../../blocks/SmallBanner/SmallBanner.js';
import "./EditAccount.css";
import Sidebar from '../../common/Sidebar/Sidebar.js';

class EditAccount extends Component{
    constructor(props) {
        super(props);
        this.state={
        
        }
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
                        <h4 className="accountTitle">Account Information</h4>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt15">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt15">
                                    <label className="mt15">First Name <i>*</i></label><br />
                                    <input type="text" value="Manisha" className="col-lg-8 col-md-8 col-sm-12 col-xs-12" />
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <label className="mt15">Last Name <i>*</i></label><br />
                                    <input type="text" value="Kharare" className="col-lg-8 col-md-8 col-sm-12 col-xs-12" />
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt15">
                                    <input type="checkbox" /> &nbsp; <span>Change Email</span>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb15">
                                    <input type="checkbox" /> &nbsp; <span>Change Password</span>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
                                    <button className="btn btn-warning editAccount">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditAccount;