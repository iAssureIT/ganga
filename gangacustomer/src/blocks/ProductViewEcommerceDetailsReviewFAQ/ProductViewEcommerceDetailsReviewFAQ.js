import React, { Component }     from 'react';
import $              from 'jquery';
import {Route, withRouter} from 'react-router-dom';
import axios                  from 'axios';
import swal from 'sweetalert';
import "./ProductViewEcommerceDetailsReviewFAQ.css";
import _                      from 'underscore';

axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';



export default class ProductViewEcommerceDetailsReviewFAQ extends Component {
	constructor(props){
    super(props);
	    
  	} 
  	componentDidMount(){  	} 
  	  	
  	render() {
		return (
				<div id="gotoreview" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop180 topspace">
          <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 faq">
            <ul>
              <li><a >DETAILS</a></li>
              <li className="rvw"><a >REVIEWs</a></li>
              <li><a >FAQ</a></li>
            </ul>

            <div className="topspace detailtitle">DETAILS</div>
            <div className="spcbx topspace15"></div>
             <div className="detailtxt topspace15">
              1.6 GHz Intel Core i5 (Broadwell) 4GB of 1600 MHz LPDDR3 RAM 256GB PCIe-Based Flash Storage Integrated Intel HD Graphics 6000 13.3" LED-Backlit Glossy Display

             </div>

            <div className="topspace detailtitle">REVIEWS</div>
            <div className="spcbx topspace15"></div>

            <div className="topspace15 reviewtitle ">You're reviewing</div>
            &nbsp;&nbsp;
            <i className="fa fa-star reviewstr" aria-hidden="true"></i>
            <i className="fa fa-star reviewstr" aria-hidden="true"></i>
            <i className="fa fa-star reviewstr" aria-hidden="true"></i>
            <i className="fa fa-star reviewstr" aria-hidden="true"></i>
            <i className="fa fa-star reviewstr" aria-hidden="true"></i>
           {/* <div className="row topspace">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className=" ">Nickname</div>
              </div>
               <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className=" ">Summary</div>
              </div>
            </div>*/}
            <div className="row topspace15">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
               <label className=" ">Nickname</label>
               <input className="col-lg-12 col-md-12 col-xs-12 col-sm-12 inputbx" type="text"/>
              </div>
               <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
               <label className=" ">Summary</label>
                <input className="col-lg-12 col-md-12 col-xs-12 col-sm-12 inputbx" type="text"/>
              </div>
            </div>
            <div className="row topspace15">
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div className=" ">Review</div>
              </div>               
            </div>
             <div className="row topspace15">
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
              <textarea className="col-lg-12 col-md-12 col-xs-12 col-sm-12" rows="4" cols="50"></textarea>
              </div>
            </div>
            <div className="row topspace15">
              <div className="col-lg-offset-9 col-lg-3 col-md-offset-9 col-md-3 col-xs-12 col-sm-12">
                <div className="Submitreviewbtn col-lg-12 text-center">Submit Review</div>
              </div>               
            </div>

          </div>
          <div className="col-lg-3 col-md-3 col-xs-12 col-sm-12 bannerimg" title="banner">
            <img className="img-responsive" src="http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media/multistore/banner/banner-slider-right.png"/>
          </div>
        </div>
		);
	}
}