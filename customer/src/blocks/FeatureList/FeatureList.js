import React, { Component } from 'react';
import "./FeatureList.css";

export default class FeatureList extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
  	}  
  render() {
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="row">
						<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12  first Feature">
							<div className="col-lg-3 col-lg-offset-1 col-md-3 col-sm-3 col-xs-3 ">
								<img src="/images/icon_box1.png" />
							</div>
							<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 featureText ">
								<div className="row">
									<label className="greenColor">Worldwide Delivery</label><br/>
									With sites in 5 languages, we shop to over 100 countries and regions.
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 second Feature">
							<div className="col-lg-3 col-lg-offset-1 col-md-3 col-sm-3 col-xs-3 ">
								<img src="/images/icon_box2.png" />
							</div>
							<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 featureText ">
								<div className="row">
									<label className="greenColor">Fresh Food</label><br/>
									We use only the best ingredients to cook the tasty fresh food for you.
								</div>
							</div>
						
						</div>
						<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 third Feature">
							<div className="col-lg-3 col-lg-offset-1 col-md-3 col-sm-3 col-xs-3 ">
								<img src="/images/icon_box3.png" />
							</div>
							<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 featureText ">
								<div className="row">
									<label className="greenColor">24/7 Help Center</label><br/>
									Round-the-clock assistance for a smooth shopping experience.
								</div>
							</div>
						
						</div>
					</div>
				</div>
		);
	}
}
