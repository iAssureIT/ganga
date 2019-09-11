import React, { Component }     from 'react';
import $              from 'jquery';
import {Route, withRouter} from 'react-router-dom';
import axios                  from 'axios';
import swal from 'sweetalert';
import "./ProductViewEcommerceList.css";
import _                      from 'underscore';

axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';



export default class ProductViewEcommerceList extends Component {
	constructor(props){
    super(props);
	    
  	} 
  	componentDidMount(){  	} 
  	  	
  	render() {
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 spc20 ">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 lstbxouter">
           <div className="col-lg-3 col-md-3 col-xs-12 col-sm-12 lstbx">
            <span className="listttl col-lg-12 col-md-12 col-sm-12 col-xs-12">ABOUT MARKET</span>
             <span className="listui col-lg-12 col-md-12 col-sm-12 col-xs-12">
               <ul>
                  <li>About Us</li>
                  <li className="">Contact</li>
                  <li>Privacy Policy</li>
                   <li>Site Map</li>
                </ul>

             </span>
           </div>
           <div className="col-lg-3 col-md-3 col-xs-12 col-sm-12 lstbx">
            <span className="listttl col-lg-12 col-md-12 col-sm-12 col-xs-12">MAKE MONEY WITH US</span>
             <span className="listui col-lg-12 col-md-12 col-sm-12 col-xs-12">
               <ul>
                  <li>Marketplace</li>
                  <li className="">Compensation First</li>
                  <li>My Account</li>
                   <li>Return Policy</li>
                   <li>Affiliate</li>
                </ul>

             </span>
           </div>
           <div className="col-lg-3 col-md-3 col-xs-12 col-sm-12 lstbx">
            <span className="listttl col-lg-12 col-md-12 col-sm-12 col-xs-12">PAYMENT AND SHIPPING</span>
             <span className="listui col-lg-12 col-md-12 col-sm-12 col-xs-12">
               <ul>
                  <li>Terms of Use</li>
                  <li className="">Payment Methods</li>
                  <li>Shipping Methods</li>
                  <li>Locations We Ship To</li>
                   <li>Estimated Delivery Time</li>
                </ul>

             </span>
           </div>
           <div className="col-lg-3 col-md-3 col-xs-12 col-sm-12 lstbx">
            <span className="listttl col-lg-12 col-md-12 col-sm-12 col-xs-12">LET US HELP YOU</span>
             <span className="listui col-lg-12 col-md-12 col-sm-12 col-xs-12">
               <ul>
                  <li>Join Free</li>
                  <li className="">Blog</li>
                  <li>Faqs</li>
                   <li>Store Locations</li>
                   <li>Shop By Brands</li>
                </ul>

             </span>
           </div>
          </div>
        </div>
		);
	}
}