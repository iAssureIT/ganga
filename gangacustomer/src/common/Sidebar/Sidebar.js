import React, {Component} from 'react';
import './Sidebar.css';


export default class Header extends Component {
  	render() {  
    return (
		<div className="sidebar">
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
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/customer/account/edit/"><i className="fa fa-download"></i>&nbsp; My Orders </a>
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
		                <a href="/wishlist"><i className="fa fa-heart"></i> &nbsp; Wishlist</a>
		                </li>          
		            </ul>
		        </nav>
		        <div class="nb-brand">
					<div class="Featured-Brands-tittle">Featured Brands</div>
						<ul class="Featured-Brands">
																
							<li class="Featured-Brands-li">
								<div class="Featured-Brands-li-div">
									<div class="Featured-Brands-li-div-div">
									<a class="imgs" href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/shopbybrand/index/view/id/1/">
									<img class="img_logo_brand" src="http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media///Shopbybrand//techservice.png" />
									</a>

									<a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/shopbybrand/index/view/id/1/" class="name_brand"> iPhone</a>	
									</div>
								</div>	
							</li>
	 
						</ul>
				<div class="viewall">
					<form action="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/shopbybrand/index/index/">
						<button type="submit" name="viewall">View All</button>
					</form>
				</div>
				</div>
      		</div>
      		);
	}
}