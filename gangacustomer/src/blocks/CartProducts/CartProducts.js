import React, { Component } from 'react';
import swal from 'sweetalert';
import $                    from 'jquery';
import axios                from 'axios';
import Banner               from '../../blocks/Banner/Banner.js';
import "./CartProducts.css";

class CartProducts extends Component{
    render(){
        return(
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 cartProduct">
                            <table className="table table-responsive cartProductTable">
                                <thead>
                                    <tr>
                                        <th>ITEMS</th>
                                        <th>PRICE</th>
                                        <th>QUANTITY</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <tr>
                                                <td>
                                                    <img className="img img-responsive cartProductImg" src="/images/Logo.png" />
                                                </td>
                                                <td className="cartProductDetail">
                                                    <h5>Product Name</h5>
                                                    <span className="fa fa-heart cartWishIcon"></span>
                                                </td>
                                            </tr>
                                        </td>
                                        <td><span className="cartProductPrize">$336.00</span></td>
                                        <td>
                                            <span className="minusQuantity fa fa-minus"></span>&nbsp;
                                            <span className="inputQuantity">12</span>&nbsp;
                                            <span className="plusQuantity fa fa-plus"></span>
                                        </td>
                                        <td>
                                            <span className="fa fa-times cartDelete"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <tr>
                                                <td>
                                                    <img className="img img-responsive cartProductImg" src="/images/Logo.png" />
                                                </td>
                                                <td className="cartProductDetail">
                                                    <h5>Product Name</h5>
                                                    <span className="fa fa-heart cartWishIcon"></span>
                                                </td>
                                            </tr>
                                        </td>
                                        <td><span className="cartProductPrize">$336.00</span></td>
                                        <td>
                                            <span className="minusQuantity fa fa-minus"></span>&nbsp;
                                            <span className="inputQuantity">12</span>&nbsp;
                                            <span className="plusQuantity fa fa-plus"></span>
                                        </td>
                                        <td>
                                            <span className="fa fa-times cartDelete"></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="col-lg-4 col-lg-offset-5 col-md-4 col-md-offset-5 col-sm-12 col-xs-12 NOpaddingLeft">
                            <button className="col-lg-10 col-lg-offset-2 col-md-10 col-md-offset-2 col-sm-12 col-xs-12 btn btn-warning continueShopping"> <i className="fa fa-angle-left cartLeftAngle"></i> &nbsp; CONTINUE SHOPPING</button>
                            </div>
                            <button className="col-lg-3 col-md-3 col-sm-12 col-xs-12 btn btn-warning cartButton"> UPDATE SHOPPING CART</button>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 ">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cartSummary">
                                <strong className="cartSummaryTitle">Summary</strong>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="row">
                                        <table className="table table-responsive summaryTable">
                                            <tbody>
                                                <tr>
                                                    <td>Subtotal</td>
                                                    <td className="textAlignRight">$872.00</td>
                                                </tr>
                                                <tr>
                                                    <td>Discount</td>
                                                    <td className="textAlignRight">-$174.40</td>
                                                </tr>
                                                <tr>
                                                    <td>Order Total</td>
                                                    <td className="textAlignRight cartTotal">$697.60</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <button className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-warning cartCheckout">
                                    PROCEED TO CHECKOUT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default CartProducts;