import React, { Component } from 'react';
import "./ProductDivider.css";

export default class SaleProductDivider extends Component {
	constructor(props){
    super(props);
	    
  	}  
  render() {
		return (
		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
            <div className="block">
                <a className="image" href="#" target="_blank"> 
                <img src="/images/bottombaner.png" alt="home banner" className="divImage"/></a>
            	<a href="#flashsalediv"><div className="btn btn-warning shopnowbtn" title="Checkout">Shop Now</div></a>
            	<div className="figcaption2"></div>
            </div>
    	</div> 	
		);
	}
}
