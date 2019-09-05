import React, { Component } from 'react';
import "./Breadcumb.css";

export default class Breadcumb extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
  	}  
  render() {
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productName">
							<span className="nameOfItem">Capsicum</span><br/>
							<span className="breadCumb"><a href="#"> Home /</a><a href="#"> Vegetables /</a><a href="#"> Pickles /</a> <a href="#"> Capsicum </a> </span>
						</div>
					</div>
				</div>
		);	
	}
}
