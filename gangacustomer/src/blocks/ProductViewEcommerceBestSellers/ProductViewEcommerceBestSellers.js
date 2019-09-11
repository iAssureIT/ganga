import React, { Component }     from 'react';
import $              from 'jquery';
import {Route, withRouter} from 'react-router-dom';
import axios                  from 'axios';
import swal from 'sweetalert';
import "./ProductViewEcommerceBestSellers.css";
import _                      from 'underscore';

axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';



export default class ProductViewEcommerceBestSellers extends Component {
	constructor(props){
    super(props);
	    
  	} 
  	componentDidMount(){  	} 
  	  	
  	render() {
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 spc20 ">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="bestsellerBx1">
              <div className="bestsellerpill col-lg-1 col-md-1 col-xs-1 col-sm-1">
                BEST SELLERS
              </div>
            </div>
            <div className="bestsellerBx2">
              <div className="col-lg-3 col-md-3 col-xs-3 col-sm-3 spc20 sellerlist">
                <ul className="sellerul">
                  <li className="sellerul">Jwellery</li>
                  <li className="sellerul">Sports</li>
                  <li className="sellerul">Smartphones</li>
                  <li className="sellerul">Computers</li>
                  <li className="sellerul">Beauty, Healthy</li>
                  <li className="sellerul">Food</li>
                   <li className="sellerul">Furniture</li>
                   <li className="sellerul">Books</li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-3 col-xs-3 col-sm-3">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  sellersubbx">
                  <div className="offerflag col-lg-12 col-md-12 col-sm-12 col-xs-12 ">-30%</div>
                  <div className="offerimg col-lg-8 col-md-8 col-sm-12 col-xs-12">
                   <img className=" offerimgsrc" src="http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media/multistore/banner/banner-slider-right.png"/>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgttl text-center">
                    <span>ASUS 13.3 Zenbook UX31</span>
                  </div>
                   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgrating text-center">
                       <i className="fa fa-star reviewstrimg" aria-hidden="true"></i>
                        <i className="fa fa-star reviewstrimg" aria-hidden="true"></i>
                        <i className="fa fa-star reviewstrimg" aria-hidden="true"></i>
                        <i className="fa fa-star reviewstrimg" aria-hidden="true"></i>
                        <i className="fa fa-star reviewstrimg" aria-hidden="true"></i> 
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                    <span className="linethr">$200.00</span> <span className="lineprice">$200.00</span>
                  </div>
                   <div className="col-lg-4 col-lg-offset-2 col-md-4 col-md-offset-3 col-sm-12 col-xs-12 text-center">
                    <div className="addtocartbtn">
                       <i className="fa fa-shopping-cart" aria-hidden="true"></i> &nbsp;&nbsp;Add To Cart
                    </div>
                   </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-xs-3 col-sm-3">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  sellersubbx">
                  <div className="offerflag col-lg-12 col-md-12 col-sm-12 col-xs-12 ">-30%</div>
                  <div className="offerimg col-lg-8 col-md-8 col-sm-12 col-xs-12">
                   <img className=" offerimgsrc" src="http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media/multistore/banner/banner-slider-right.png"/>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgttl text-center">
                    <span>ASUS 13.3 Zenbook UX31</span>
                  </div>
                   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgrating text-center">
                       <i className="fa fa-star reviewstrimg" aria-hidden="true"></i>
                        <i className="fa fa-star reviewstrimg" aria-hidden="true"></i>
                        <i className="fa fa-star reviewstrimg" aria-hidden="true"></i>
                        <i className="fa fa-star reviewstrimg" aria-hidden="true"></i>
                        <i className="fa fa-star reviewstrimg" aria-hidden="true"></i> 
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                    <span className="linethr">$200.00</span> <span className="lineprice">$200.00</span>
                  </div>
                   <div className="col-lg-4 col-lg-offset-2 col-md-4 col-md-offset-3 col-sm-12 col-xs-12 text-center">
                    <div className="addtocartbtn">
                       <i className="fa fa-shopping-cart" aria-hidden="true"></i> &nbsp;&nbsp;Add To Cart
                    </div>
                   </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-xs-3 col-sm-3">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  sellersubbx">
                  <div className="offerflag col-lg-12 col-md-12 col-sm-12 col-xs-12 ">-30%</div>
                  <div className="offerimg col-lg-8 col-md-8 col-sm-12 col-xs-12">
                   <img className=" offerimgsrc" src="http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media/multistore/banner/banner-slider-right.png"/>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgttl text-center">
                    <span>ASUS 13.3 Zenbook UX31</span>
                  </div>
                   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgrating text-center">
                       <i className="fa fa-star reviewstrimg" aria-hidden="true"></i>
                        <i className="fa fa-star reviewstrimg" aria-hidden="true"></i>
                        <i className="fa fa-star reviewstrimg" aria-hidden="true"></i>
                        <i className="fa fa-star reviewstrimg" aria-hidden="true"></i>
                        <i className="fa fa-star reviewstrimg" aria-hidden="true"></i> 
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                    <span className="linethr">$200.00</span> <span className="lineprice">$200.00</span>
                  </div>
                   <div className="col-lg-4 col-lg-offset-2 col-md-4 col-md-offset-3 col-sm-12 col-xs-12 text-center">
                    <div className="addtocartbtn">
                       <i className="fa fa-shopping-cart" aria-hidden="true"></i> &nbsp;&nbsp;Add To Cart
                    </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
		);
	}
}