import React, { Component } from 'react';
import swal from 'sweetalert';
import $                    from 'jquery';
import axios                from 'axios';
import SmallBanner               from '../../blocks/SmallBanner/SmallBanner.js';
import "./Address.css";
import Sidebar from '../../common/Sidebar/Sidebar.js';

class Address extends Component{
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
                        <h4 className="addTitle">Default Addresses</h4>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt15 mb15 NOpaddingLeft">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="row">
                                        <label>Default Billing Address</label>
                                        <p>
                                            Manisha Kharare <br />
                                            ia <br />
                                            nbmn <br />
                                            bmnnnnnnn, Connecticut, nmbbbbbbb <br />
                                            United States <br />
                                            T: 9087667890
                                        </p>
                                        <button className="btn btn-warning mt15">Change Billing Address</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt15 mb15 NOpaddingRight">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="row">
                                        <label>Default Shipping Address</label>
                                        <p>
                                            Manisha Kharare <br />
                                            ia <br />
                                            nbmn <br />
                                            bmnnnnnnn, Connecticut, nmbbbbbbb <br />
                                            United States <br />
                                            T: 9087667890
                                        </p>
                                        <button className="btn btn-warning mt15">Change Shipping Address</button>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Address;