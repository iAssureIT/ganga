import React, {Component} from 'react';
import './Sidebar.css';
import $ from 'jquery';

export default class Sidebar extends Component {
	constructor(props){
    super(props);
        
    }
    componentDidMount(){
    	let links = document.getElementsByClassName('nav item');
    	//console.log(links);
    	
    	for (var i = 0; i <= links.length; i++) {
    		console.log(window.location.pathname);
    		console.log($(links[i]).find('a').attr('href'));
    		if (window.location.pathname == $(links[i]).find('a').attr('href')) {
    			
    			$(links[i]).addClass('current');
    		}
    		
    	}
    }
  	render() {  
    return (
		<div className="sidebar">
			<div className="mp-title">
		        <strong>Marketplace</strong>
		    </div>
		    <div className="mp-subtitle">
		        <strong>Marketplace</strong>
		    </div>
		    <nav className="account-nav">
		            <ul className="nav items">
		                <li className="nav item col-lg-12">
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/customer/account/">
		                <i className="fa fa-user" aria-hidden="true"></i>&nbsp; Become a Seller</a>
		                </li>
		            </ul>
		    </nav>    
		    <br/>
		    <br/>        
      			<nav className="account-nav">
		            <ul className="nav items">
		                <li className="nav item col-lg-12">
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/customer/account/"><i className="fa fa-user" aria-hidden="true"></i>&nbsp; Account Dashboard</a>
		                </li>
		                <li className="nav item col-lg-12">
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/customer/account/edit/"><i className="fa fa-info" aria-hidden="true"></i>&nbsp; Account Information</a>
		                </li>
		                <li className="nav item col-lg-12">
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/customer/address/"><i className="fa fa-location-arrow"></i>&nbsp; Address Book</a>
		                </li>
		                <li className="nav item col-lg-12">
		                <a href="/my-orders"><i className="fa fa-download"></i>&nbsp; My Orders </a>
		                </li>
		                <li className="nav item col-lg-12">
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/downloadable/customer/products/"><i className="fa fa-edit"></i>&nbsp; My Downloadable Products</a>
		                </li>
		                <li className="nav item col-lg-12">
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/vault/cards/listaction/"><i className="fa fa-credit-card"></i>&nbsp; My Credit Cards</a>
		                </li>
		                <li className="nav item col-lg-12">
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/newsletter/manage/"><i className="fa fa-envelope"></i> &nbsp; Newsletter Subscriptions</a>
		                </li>
		                <li className="nav item col-lg-12">
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/paypal/billing_agreement/"><i className="fa fa-pencil"></i> &nbsp;Billing Agreements</a>
		                </li>
		                <li className="nav item col-lg-12">
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/review/customer/"><i className="fa fa-eye"></i> &nbsp;My Product Reviews</a>
		                </li>
		                <li className="nav item col-lg-12">
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/wishlist/"><i className="fa fa-heart"></i> &nbsp; Wishlist</a>
		                </li>          
		            </ul>
		        </nav>
		        <br/>
		       	<div className="block block-compare" >
				    <div className="block-title">
				        <strong id="block-compare-heading" role="heading" aria-level="2">Compare Products</strong>
				    </div>
				    <hr/>
				    <div className="empty">You have no items to compare.</div>
				</div>
      		</div>
      		);
	}
}