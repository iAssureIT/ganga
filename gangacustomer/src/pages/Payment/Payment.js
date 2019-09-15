import React, { Component } from 'react';
import SmallBanner          from '../../blocks/SmallBanner/SmallBanner.js';
import OrderPlaced          from '../../blocks/OrderPlaced/OrderPlaced.js';
import "./Payment.css";

class Payment extends Component{
    constructor(props) {
        super(props);
        this.state={
            bannerData : {
                title : "ORDER PLACED SUCCESSFULLY",
                breadcrumb : 'My Shopping Cart',
                backgroungImage : '/images/cartBanner.png',
            }
        }
    }


    render(){
        return(
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <SmallBanner bannerData={this.state.bannerData}/>  
                    <OrderPlaced />
                </div>
            </div>
        )
    }
}

export default Payment;