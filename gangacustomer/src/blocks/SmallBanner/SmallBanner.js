import React, { Component } from 'react';
import swal from 'sweetalert';
import $                    from 'jquery';
import axios                from 'axios';

import "./SmallBanner.css";

class SmallBanner extends Component{

    render(){
        return(
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 banner">
                        <h1>{this.props.bannerData.title}</h1>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerText">
                            <ul className="bannerUL">
                                <li><a href="/">Home</a></li>&nbsp; / &nbsp;
                                <li><strong>{this.props.bannerData.breadcrumb}</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default SmallBanner;