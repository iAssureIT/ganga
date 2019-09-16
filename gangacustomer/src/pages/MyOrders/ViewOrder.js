import React, {Component} from 'react';
import axios                  from 'axios';
import $                  from 'jquery';
import swal                   from 'sweetalert';
import './MyOrders.css';


export default class ViewOrder extends Component {
	constructor(props) {
        super(props);

        if(!this.props.loading){
            this.state = {
                "orderData":[],
                // "notificationData" :Meteor.subscribe("notificationTemplate"),
            };
        } else{
            this.state = {
                "orderData":[],
            };
        }
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        //this.getMyOrders();
    }

  render() {  
    return (
    <div className="container">	
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
      	<div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 NOpadding">
      		<div className="sidebar">
      			<nav className="account-nav">
		            <ul className="nav items">
		                <li className="nav item col-lg-12">
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/customer/account/"><i className="fa fa-user" aria-hidden="true"></i>Account Dashboard</a>
		                </li>
		                <li className="nav item col-lg-12">
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/customer/account/edit/">Account Information</a>
		                </li>
		                <li className="nav item col-lg-12">
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/customer/address/">Address Book</a>
		                </li>
		                <li className="nav item col-lg-12">
		                <a href="/MyOrders">My Orders </a>
		                </li>
		                <li className="nav item col-lg-12">
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/downloadable/customer/products/">My Downloadable Products</a>
		                </li>
		                <li className="nav item col-lg-12">
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/vault/cards/listaction/">My Credit Cards</a>
		                </li>
		                <li className="nav item col-lg-12">
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/newsletter/manage/">Newsletter Subscriptions</a>
		                </li>
		                <li className="nav item col-lg-12">
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/paypal/billing_agreement/">Billing Agreements</a>
		                </li>
		                <li className="nav item col-lg-12">
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/review/customer/">My Product Reviews</a>
		                </li>
		                <li className="nav item col-lg-12">
		                <a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/wishlist/"> Wishlist</a>
		                </li>          
		            </ul>
		        </nav>
      		</div>
      	</div>

      	<div className="col-lg-9 col-md-9 col-sm-6 col-xs-6">
      	<h4 className="table-caption">Items Ordered</h4>
      		<table className="data table table-order-items history" id="my-orders-table">
            
            <thead>
                <tr>
                    <th scope="col" className="col id">Product Name</th>
                    <th scope="col" className="col date">Price</th>
                    <th scope="col" className="col shipping">Qty</th>
                    <th scope="col" className="col total">Subtotal</th>
                </tr>
            </thead>
            <tbody>
            	{
            	/*this.state.orderData && this.state.orderData.length > 0 ?
	                this.state.orderData.map((data, index)=>{
	                	return(*/
		                <tr>
		                    <td data-th="Order #" className="col id">2.56ctw Altai Aquamarine(Tm) With</td>
		                    <td data-th="Date" className="col date">$20.00</td>
							          <td data-th="Ship To" className="col shipping">Ordered: 1</td>
		                    <td data-th="Order Total" className="col total"><span className="price">$25.00</span></td>
		                </tr>
		            /*    );
	            	})
	            	: ""*/
            	}
           	</tbody>

            <tfoot> col-md-
              <tr className="subtotal">
                  <th colspan="3" className="mark" scope="row">Subtotal</th>
                  <td className="amount" data-th="Subtotal"><span className="price">$20.00</span>                    </td>
              </tr>
              <tr className="shipping">
                  <th colspan="3" className="mark" scope="row">Shipping &amp; Handling</th>
                  <td className="amount" data-th="Shipping &amp; Handling">
                    <span className="price">$5.00</span> 
                  </td>
              </tr>
              <tr className="grand_total">
                  <th colspan="3" className="mark" scope="row"><strong> "Estimated Total"</strong></th>
                  <td className="amount" data-th=" &quot;Estimated Total&quot;">
                      <strong><span className="price">$25.00</span></strong>
                  </td>
              </tr>
            </tfoot>
        	</table>

          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <strong class="box-title">
                <span>Shipping Address</span>
            </strong>
            <div className="box-content">
              amitraje shinde
              iassureit
              tupe corner
              pune, 4121454
              India
              T: 8888069628
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <strong class="box-title">
                <span>Shipping Method</span>
            </strong>
            <div className="box-content">
              Flat Rate - Fixed
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <strong class="box-title">
                <span>Billing Address</span>
            </strong>
            <div className="box-content">
              amitraje shinde
              iassureit
              tupe corner
              pune, 4121454
              India
              T: 8888069628
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <strong class="box-title">
                <span>Payment Method</span>
            </strong>
            <div className="box-content">
              Credit Card Direct Post (Authorize.net)
            </div>
          </div>
      	</div>

      </div>
    </div>  
    );  
  }
}

