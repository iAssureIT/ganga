import React, { Component }     from 'react';
import $              from 'jquery';
import {Route, withRouter} from 'react-router-dom';
import axios                  from 'axios';
import swal from 'sweetalert';
import "./ProductViewEcommerceDetailsReviewFAQ.css";
import _                      from 'underscore';

axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';



export default class ProducthomeDetailsReviewFAQ extends Component {
	constructor(props){
    super(props);
	    
  	} 
  	componentDidMount(){  	} 
  	  	
  	render() {
		return (
				<div id="gotoreview" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop180 topspace">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 faq">
            <ul>
              <li className="rvw"><a>REVIEWS</a></li>
            </ul> 
            <div className="topspace15"></div>
           
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 reviewborder">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 topspace15">
                  <div className="row">
                    <div className="col-lg-4 col-md-3 col-sm-3 col-xs-3 reviewuserimg text-center">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                              <fieldset className="ratingReview stars givefeedback ">
                                  <input type="radio" id="star1" name="ratingReview" value="5" /><label htmlFor="star1"></label>
                                  <input type="radio" id="star2" name="ratingReview" value="4" /><label htmlFor="star2"></label>
                                  <input type="radio" id="star3" name="ratingReview" value="3" /><label htmlFor="star3"></label>
                                  <input type="radio" id="star4" name="ratingReview" value="2" /><label htmlFor="star4"></label>
                                  <input type="radio" id="star5" name="ratingReview" value="1"/><label htmlFor="star5"></label>
                              </fieldset>
                        </div>    
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <img src="/images/userImage.png"/>
                            <p>by Amitraje Shinde</p>
                            <p>date</p>
                        </div>    
                      </div>    
                    </div>    
                    <div className="col-lg-8 col-md-9 col-sm-9 col-xs-9 reviewuserimg">
                      <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                          <div className="row">
                            <h5>Review :</h5>
                          </div>    
                        </div>    
                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 topspace8">
                          <div className="row">
                            <p>vary low camera quality, ram showing 8gb but working as 4gb phone, screen resolution is vary low. also disappointing by Amazon because of when i want to return and apply for refund they giving a childish reason no refund no on the spot help just harassment. so please request u all don't purchase this model and also don't purchase online phone from amazon.</p>
                          </div>    
                        </div>    
                      </div>    
                    </div>    
                  </div>    
                </div>    
            </div>

          </div>
        </div>
		);
	}
}