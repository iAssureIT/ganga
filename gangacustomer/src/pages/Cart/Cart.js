import React, { Component } from 'react';
import $                    from 'jquery';
import axios                from 'axios';
import SmallBanner               from '../../blocks/SmallBanner/SmallBanner.js';
import CartProducts         from '../../blocks/CartProducts/CartProducts.js';
import GiftOption           from '../../blocks/GiftOption/GiftOption.js';
import Discount             from '../../blocks/Discount/Discount.js';
import EstimateShipping     from '../../blocks/EstimateShipping/EstimateShipping.js';
import "./Cart.css";

class Cart extends Component{
    constructor(props) {
        super(props);
        this.state={
            bannerData : {
                title : "MY SHOPPING CART",
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
                    <CartProducts />
                    {/* <GiftOption /> */}
                    {/* <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                            <Discount />
                            <EstimateShipping />
                        </div>
                    </div> */}
                    
                </div>
            </div>
        )
    }
}

export default Cart;