import React, { Component } 		from 'react';
import EcommerceBreadcumb 			from "../../blocks/common/Breadcumb/EcommerceBreadcumb.js";
import EcommerceHeader 				from "../../blocks/common/EcommerceHeader/EcommerceHeader.js";

import EcommerceFooter    			from "../../blocks/common/EcommerceFooter/EcommerceFooter.js";
import 'bootstrap/js/collapse.js';

import "./CancellationPolicy.css";

export default class CancellationPolicy extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    	
	    };
  	}  
  	  


  render() {
		return (
				<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 backColorEF marginTop180">
					<div className="row">
						
						<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
							
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  mt20  ">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
										
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 termsAndConditionsContainer backColorWhite ">
											<label className="">Cancellation Policy</label><br/><br/>
											<p className="">
											All Sellers must accept cancellations, returns, refunds and adjustments in accordance with the policies and any terms, conditions, and policies that appear on the Seller's Product Listing at the time of the applicable order.
											</p>
											<h4>Minimum Cancellation, Return, and Refund Policy</h4>
											<p>At a minimum, your cancellation, return and refund policy must:</p>
											<ul>
				                              <li>For subscriptions with a term between 2 months and 5 months, allow a customer to cancel an order of a Product and receive a full refund within 7 days of payment (initial and renewal).
				                              </li>
				                              <li>For subscriptions with a term 6 months or greater, allow a customer to cancel an order of a Product and receive a full refund: (a) within 7 days of initial payment and (b) within 30 days of payment at renewal.
				                              </li>
				                              <li>For all subscription lengths, allow a customer to cancel an order of a Product and receive a full refund at any time where the Product is defective or materially different from the item represented in the Product Listing.
				                              </li>
				                              <li>
				                              For all subscription lengths, allow a customer to cancel an order of a Product and receive a full refund at any time if there is a material change in your Product, the availability of your Product or any of your terms and conditions of use and service relating to the Product.
				                              </li>
				                            </ul>  
				                            <p>We do not currently support functionality that allows you to offer pro rata refunds .</p> 
											<br />
											<h4>Cancellation Process</h4>
											<p>Customers who want to cancel orders must do so through the cancellation process offered by Amazon, including through the subscription manager on the Amazon Site. You must clearly disclose this requirement to customers and provide 
											for such customers to be re-directed to Amazon's subscription manager. You may not directly 
												interact with a customer to cancel a Transaction or otherwise process a cancellation, 
											refund or return for a Product, except as is necessary to re-direct such customer from your 
											website or application to Amazon's subscription manager.</p>
											<br />
											<h4>Refund Process</h4>
											<p>If a customer contacts us with respect to your Product, we may issue refunds as a service to you in accordance with our usual business practices. For each refund that we issue, you will grant us a credit in an amount equal to your portion of 
											the Sales Revenue for the applicable Transactions. If a customer contacts you with respect to your Product and seeks a refund or other adjustment, 
											you will refer such customer to Amazon, and you authorize Amazon to, on your behalf, determine 
											and calculate the amount of all refunds and adjustments (including any taxes or other charges) or 
											other amounts to be paid by you to such customers. All payments to customers in connection with your Transactions will be routed 
											through Amazon or its designated Affiliate. Amazon or its designated Affiliate will provide the refund payments to the applicable customer (which may be in the same payment form originally used to purchase your Product). Amazon may deduct 
											all amounts refunded from the Sales Revenue prior to transmission to you or otherwise seek reimbursement from you for all refunds.</p>
										</div>
	
									</div>
							</div>
						</div>

					</div>
				</div>
		);
	}
}
