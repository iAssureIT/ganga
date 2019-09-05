import React, { Component } from 'react';

import BlogCarousel from "./BlogCarousel.js";
import "./EcommerceBlog.css";



export default class EcommerceBlog extends Component {
	constructor(props){
    super(props);
	   this.state = {
			blogArray:[],
		}
  	}  
  	
  render() {
		return (

		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 containBg">
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogContainer" id="blogContainer">
				<label>From Our Blog</label>
			</div>
			<BlogCarousel/>
		</div>
		);
	}
}
