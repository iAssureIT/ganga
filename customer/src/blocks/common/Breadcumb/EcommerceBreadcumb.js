import React, { Component } from 'react';
import "./Breadcumb.css";

export default class EcommerceBreadcumb extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
  	}  
  render() {
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
					<div className="col-lg-12 col-md-9 col-sm-9 col-xs-9 ">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorBread pull-right ">
							<span className="pull-right noStylea"><a href="#"> Home&nbsp;&nbsp;&nbsp;&nbsp; /&nbsp;&nbsp;&nbsp;&nbsp;</a><a href="#">Contact Us </a> </span>
							</div>
						</div>
					</div>
				</div>
	);	
	}
}
