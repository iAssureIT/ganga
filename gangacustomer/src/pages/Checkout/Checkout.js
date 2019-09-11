import React, { Component } from 'react';
import swal                 from 'sweetalert';
import $                    from 'jquery';
import axios                from 'axios';
import SmallBanner               from '../../blocks/SmallBanner/SmallBanner.js';
import "./Checkout.css";

class Checkout extends Component{
    constructor(props){
        super(props);
        this.state={
            bannerData : {
                title : "CHECKOUT",
                breadcrumb : 'Checkout',
                backgroungImage : '/images/checkout.png',
            },
            discountCode: false,
            comment : false
        }
    }
    discountCode(event){
        event.preventDefault();
        this.setState({
            discountCode: this.state.discountCode == true ? false : true
        })
    }
    comment(event){
        event.preventDefault();
        this.setState({
            comment: this.state.comment == true ? false : true
        })
    }
    render(){
        return(
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <SmallBanner bannerData={this.state.bannerData}/>
                    <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingAddress NOpadding">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn-warning shippingAddressTitle">1 SHIPPING ADDRESS</div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label>Email Address</label>
                                    <input className="col-lg-10 col-md-10 col-sm-10 col-xs-10" />
                                    <span className="col-lg-2 col-md-2 col-sm-1 col-xs-1  orderConfirmation fa fa-question-circle-o NOpadding" title="We'll send your order confirmation here."></span>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label>Password</label>
                                    <input className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shipLog">
                                    <label className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 NOpadding">Forgot Your Password?</label>
                                    <button className="col-lg-3 col-md-3 col-sm-12 col-xs-12 btn btn-warning shippingLogin">Login</button>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label>First Name</label>
                                    <input className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label>Last Name</label>
                                    <input className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label>Company</label>
                                    <input className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label>Street Address</label>
                                    <input className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label>City</label>
                                    <input className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label>State</label>
                                    <select className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <option>Maharashtra</option>
                                        <option>Goa</option>
                                        <option>Gujarat</option>
                                    </select>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label>Zip/Postal Code</label>
                                    <input className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label>Country</label>
                                    <select className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <option>India</option>
                                        <option>USA</option>
                                        <option>Chaina</option>
                                    </select>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                    <label>Phone Number</label>
                                    <input className="col-lg-10 col-md-10 col-sm-10 col-xs-10" />
                                    <span className="col-lg-2 col-md-2 col-sm-1 col-xs-1  orderConfirmation fa fa-question-circle-o NOpadding" title="For delivery questions."></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 NOpaddingLeft">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingMethod NOpadding">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn-warning shippingMethodTitle">2 SHIPPING METHOD</div>
                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Flat Rate</label>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <input type="radio" name="rate" className="col-lg-1 col-md-1 col-sm-2 col-xs-2"/>
                                        <span className="col-lg-4 col-md-4 col-sm-3 col-xs-3">Fixed</span>
                                        <span className="col-lg-7 col-md-7 col-sm-7 col-xs-7">$0.00</span>
                                    </div>
                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Best Way</label>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <input type="radio" name="rate" className="col-lg-1 col-md-1 col-sm-2 col-xs-2"/>
                                        <span className="col-lg-4 col-md-4 col-sm-3 col-xs-3">Table Rate</span>
                                        <span className="col-lg-7 col-md-7 col-sm-7 col-xs-7">$0.00</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <label><i className="fa fa-calendar"></i> &nbsp;&nbsp; Delivery Date</label>
                                        <input type="date" className="col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 NOpaddingRight">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paymentMethod NOpadding">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn-warning paymentMethodTitle">3 PAYMENT METHOD</div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paymentInput">
                                        <input type="radio" name="rate" className="col-lg-1 col-md-1 col-sm-2 col-xs-2"/>
                                        <span className="col-lg-11 col-md-11 col-sm-10 col-xs-10">Check / Money order</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paymentInput">
                                        <input type="radio" name="rate" className="col-lg-1 col-md-1 col-sm-2 col-xs-2"/>
                                        <span className="col-lg-11 col-md-11 col-sm-10 col-xs-10">Purchase Order</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paymentInput">
                                        <input type="radio" name="rate" className="col-lg-1 col-md-1 col-sm-2 col-xs-2"/>
                                        <span className="col-lg-11 col-md-11 col-sm-10 col-xs-10">Bank Transfer Payment</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paymentInput">
                                        <input type="radio" name="rate" className="col-lg-1 col-md-1 col-sm-2 col-xs-2"/>
                                        <span className="col-lg-11 col-md-11 col-sm-10 col-xs-10">Cash On Delivery</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paymentInput">
                                        <input type="radio" name="rate" className="col-lg-1 col-md-1 col-sm-2 col-xs-2"/>
                                        <span className="col-lg-11 col-md-11 col-sm-10 col-xs-10">Credit Card Direct Post (Authorize.net)</span>
                                    </div>
                                </div>
                            </div>                    
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 orderReviews NOpadding">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn-warning orderReviewsTitle">ORDER REVIEWS</div>
                                <table className="table table-responsive orderTable">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th>Products Name</th>
                                            <th>Quanlity</th>
                                            <th>SubTotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><span className="fa fa-times-circle-o crossOrder"></span></td>
                                            <td><img className="img img-responsive orderImg" src="/images/Logo.png" /></td>
                                            <td><span className="productName">Baguette Diamond Rhodium Over Brass</span></td>
                                            <td><input className="quantityInput" type="number" value="1" /></td>
                                            <td><span className="productPrize">$100.00</span></td>
                                        </tr>
                                        <tr>
                                            <td><span className="fa fa-times-circle-o crossOrder"></span></td>
                                            <td><img className="img img-responsive orderImg" src="/images/Logo.png" /></td>
                                            <td><span className="productName">Baguette Diamond Rhodium Over Brass</span></td>
                                            <td><input className="quantityInput" type="number" value="1" /></td>
                                            <td><span className="productPrize">$100.00</span></td>
                                        </tr>
                                        <tr>
                                            <td><span className="fa fa-times-circle-o crossOrder"></span></td>
                                            <td><img className="img img-responsive orderImg" src="/images/Logo.png" /></td>
                                            <td><span className="productName">Baguette Diamond Rhodium Over Brass</span></td>
                                            <td><input className="quantityInput" type="number" value="1" /></td>
                                            <td><span className="productPrize">$100.00</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb25">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 checkoutBorder"></div>
                                </div>
                                <span className="col-lg-6 col-md-6 col-sm-12 col-xs-12">Subtotal:</span><span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 textAlignRight">$1,563.00</span>
                                <span className="col-lg-6 col-md-6 col-sm-12 col-xs-12">Shipping</span><span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 textAlignRight">Not yet calculated</span>
                                <span className="col-lg-6 col-md-6 col-sm-12 col-xs-12">Discount Codes:</span><span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 textAlignRight">-$312.60</span>
                                <span className="col-lg-6 col-md-6 col-sm-12 col-xs-12">Gift Wrap</span><span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 textAlignRight">$5.00</span>
                                <span className="col-lg-6 col-md-6 col-sm-12 col-xs-12">Order Total</span><span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 textAlignRight">$1,250.40</span>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 checkoutBorder mt25"></div>
                                </div>
                                <span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb15 discountCode" onClick={this.discountCode.bind(this)}>Discount Codes:</span>
                                { this.state.discountCode == true ?
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 couponCode NOpadding">Enter your coupon code:</label>
                                        <input type="text" className="col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                                        <button className="btn btn-warning applyBtn col-lg-2 col-lg-offset-10 col-md-2 col-md-offset-10 col-sm-12 col-xs-12">Apply</button>
                                    </div>
                                    :
                                    null
                                }
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 checkoutBorder"></div>
                                </div>
                                <span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb15 discountCode" onClick={this.comment.bind(this)}>Comment</span>
                                { this.state.comment == true ?
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb15">
                                        <textarea rows="3" className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> </textarea>
                                    </div>
                                    :
                                    null
                                }
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 checkoutBorder"></div>
                                </div>
                                <span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 orderTotalText">Order Total</span><span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 textAlignRight orderTotalPrize">$1,250.40</span>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 checkoutBorder"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Checkout;