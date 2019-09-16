import React, {Component} from 'react';
import axios                  from 'axios';
import $                  from 'jquery';
import swal                   from 'sweetalert';
import SmallBanner          from '../../blocks/SmallBanner/SmallBanner.js';
import './Wishlist.css';
import Sidebar from '../../common/Sidebar/Sidebar.js';

export default class Wishlist extends Component {
	constructor(props) {
        super(props);
        this.state={
            bannerData : {
                title : "MY WISHLIST",
                breadcrumb : 'My Shopping Cart',
                backgroungImage : '/images/wishlist.png',
            }
        }
        window.scrollTo(0, 0);
    }

    componentDidMount() {
    }
    
    render() {  
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                <SmallBanner bannerData={this.state.bannerData}/>  
                
                <div className="container">
                    <br/>
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 NOpadding">
                        <Sidebar />
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8 NOpadding">
                        <div className="wishlist col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <img className="img img-responsive" src="/images/ring.jpg" />
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 wishProductDetails">
                                <h5 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding wishProductName">Product Name</h5>
                                <p className="fa fa-inr col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding wishProductPrize mb25"> 256</p>
                                <input className="col-lg-1 col-md-1 col-sm-2 col-xs-2 wishlistInput" value="1"/>
                                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                    <button className="btn col-lg-4 col-md-4 col-sm-10 col-xs-10 wishAddtoCart">ADD TO CART</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );  
    }
}

