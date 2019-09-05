import React, { Component } from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import {Link} from 'react-router';

import "./StepWizard.css";

export default class StepWizard extends Component{
	constructor(props){
		super(props);
		this.state = {
			
		}
	}

	componentDidMount(){
		var pathname = window.location.pathname;
		console.log("pathname",pathname);

		if(pathname =='/cart'){
			$('#cartbg').addClass('bgcolor');
			console.log("cartin");

		}else if(pathname =='/address'){
			$('#cartbg').addClass('bgcolor');
			$('#addressbg').addClass('bgcolor');
						console.log("addin");

			
		}else if(pathname =='/confirm-order'){
			$('#cartbg').addClass('bgcolor');
			$('#addressbg').addClass('bgcolor');		
			$('#ConfirmOrder').addClass('bgcolor');		
				console.log("billin");

		}	

	}

	render(){
		return(

			<div className="garmentTWizard col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray pt106">
	            <div className="wizard-inner col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite boxBorder">
	                <div className="connecting-line"></div>
	                <ul className="nav nav-tabs custmTabs" role="tablist">

	                    <li role="presentation" className=''>
	                        <a>
	                            <span title="Cart" className="round-tab selectcart stepwizardclass" id="cartbg">
	                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
	                            </span>
	                        </a>
	                    </li>
	                    <li role="presentation" className="">
	                        <a>
	                            <span title="Delivery Address" className="round-tab selectAddr stepwizardclass" id="addressbg">
	                                <i className="fa fa-map-marker" aria-hidden="true"></i>
	                            </span>
	                        </a>
	                    </li>

	                    <li role="presentation" className="">
	                        <a>
	                            <span  title="Order Summary" className="round-tab selectPayment stepwizardclass" id="ConfirmOrder">
	                                <i className="fa fa-credit-card" aria-hidden="true"></i>
	                            </span>
	                        </a>
	                    </li>
	                </ul>
	            </div>
	        </div>
		);
	}
}