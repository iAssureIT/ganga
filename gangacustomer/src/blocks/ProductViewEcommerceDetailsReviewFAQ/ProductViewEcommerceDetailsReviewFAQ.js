import React, { Component }     from 'react';
import $              from 'jquery';
import {Route, withRouter} from 'react-router-dom';
import axios                  from 'axios';
import "./ProductViewEcommerceDetailsReviewFAQ.css";
import _                      from 'underscore';
import moment                 from "moment";



export default class ProductViewEcommerceDetailsReviewFAQ extends Component {
	constructor(props){
    super(props);
      this.state = {
      "product_id" : this.props.productID,
      "reviewuserData":""
      };
	     this.getMyReview()
  	} 
  	componentDidMount(){  
    this.getMyReview()
//$('input:radio[name="mygroup"][value="5"]').attr('checked',true);

    	} 
  	 
    getMyReview(){
      axios.get("/api/customerReview/get/list/"+this.state.product_id)
            .then((response)=>{
              this.setState({ 
                  reviewData : response.data,
              },()=>{
                   // console.log("reviewData",this.state.reviewData);
                   // console.log("reviewuserid",this.state.reviewuserid);
              })
          })
            .catch((error)=>{
                console.log('error', error);
            })
    }
 	  


  	render() {

		return (
				<div id="gotoreview" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop180 topspace">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 faq">
        { 
            this.state.reviewData && this.state.reviewData.length >0 ?
            <ul>
              <li className="rvw"><a>REVIEWS</a></li>
            </ul> 
                          :
              null                      
          }

            <div className="topspace15"></div>
          { 
            this.state.reviewData && this.state.reviewData.length >0 ?
            this.state.reviewData.map((data,index)=>{
              return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 reviewborder">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 topspace15">
                <div className="col-lg-4 col-md-3 col-sm-3 col-xs-3 reviewuserimg text-center">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center">
                        {
                          data.rating == 5 ?
                          <fieldset className="ratingReview stars givefeedback ">
                              <input type="radio" id="star1" name="ratingReview5" value="5"  checked /><label htmlFor="star1"></label>
                              <input type="radio" id="star2" name="ratingReview" value="4"  /><label htmlFor="star2"></label>
                              <input type="radio" id="star3" name="ratingReview" value="3"  /><label htmlFor="star3"></label>
                              <input type="radio" id="star4" name="ratingReview" value="2"  /><label htmlFor="star4"></label>
                              <input type="radio" id="star5" name="ratingReview" value="1"  /><label htmlFor="star5"></label>
                          </fieldset>                         
                            : 
                            data.rating == 4 ?
                            <fieldset className="ratingReview stars givefeedback ">
                                <input type="radio" id="star1" name="ratingReview4" value="5" /><label htmlFor="star1"></label>
                                <input type="radio" id="star2" name="ratingReview4" value="4" checked /><label htmlFor="star2"></label>
                                <input type="radio" id="star3" name="ratingReview4" value="3"  /><label htmlFor="star3"></label>
                                <input type="radio" id="star4" name="ratingReview4" value="2"  /><label htmlFor="star4"></label>
                                <input type="radio" id="star5" name="ratingReview4" value="1"  /><label htmlFor="star5"></label>
                            </fieldset>
                                : 
                                data.rating == 3 ?
                                <fieldset className="ratingReview stars givefeedback ">
                                    <input type="radio" id="star1" name="ratingReview3" value="5" /><label htmlFor="star1"></label>
                                    <input type="radio" id="star2" name="ratingReview3" value="4"  /><label htmlFor="star2"></label>
                                    <input type="radio" id="star3" name="ratingReview3" value="3" checked /><label htmlFor="star3"></label>
                                    <input type="radio" id="star4" name="ratingReview3" value="2"  /><label htmlFor="star4"></label>
                                    <input type="radio" id="star5" name="ratingReview3" value="1"  /><label htmlFor="star5"></label>
                                </fieldset>
                                    : 
                                    data.rating == 2 ?
                                    <fieldset className="ratingReview stars givefeedback ">
                                        <input type="radio" id="star1" name="ratingReview2" value="5" /><label htmlFor="star1"></label>
                                        <input type="radio" id="star2" name="ratingReview2" value="4"  /><label htmlFor="star2"></label>
                                        <input type="radio" id="star3" name="ratingReview2" value="3"  /><label htmlFor="star3"></label>
                                        <input type="radio" id="star4" name="ratingReview2" value="2" checked /><label htmlFor="star4"></label>
                                        <input type="radio" id="star5" name="ratingReview2" value="1"  /><label htmlFor="star5"></label>
                                    </fieldset>
                                      : 
                                      data.rating == 1 ?
                                      <fieldset className="ratingReview stars givefeedback ">
                                          <input type="radio" id="star1" name="ratingReview1" value="5" /><label htmlFor="star1"></label>
                                          <input type="radio" id="star2" name="ratingReview1" value="4"  /><label htmlFor="star2"></label>
                                          <input type="radio" id="star3" name="ratingReview1" value="3"  /><label htmlFor="star3"></label>
                                          <input type="radio" id="star4" name="ratingReview1" value="2"  /><label htmlFor="star4"></label>
                                          <input type="radio" id="star5" name="ratingReview1" value="1" checked /><label htmlFor="star5"></label>
                                      </fieldset>
                                            : 
                                            <fieldset className="ratingReview stars givefeedback ">
                                                <input type="radio" id="star1" name="ratingReview" value="5" /><label htmlFor="star1"></label>
                                                <input type="radio" id="star2" name="ratingReview" value="4"  /><label htmlFor="star2"></label>
                                                <input type="radio" id="star3" name="ratingReview" value="3"  /><label htmlFor="star3"></label>
                                                <input type="radio" id="star4" name="ratingReview" value="2"  /><label htmlFor="star4"></label>
                                                <input type="radio" id="star5" name="ratingReview" value="1"  /><label htmlFor="star5"></label>
                                            </fieldset>

                        }
                      
                    </div>    
                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                        <img src="/images/userImage.png"/>
                        <p>by {data.customerName}</p>
                        <p>{moment(data.createdAt).format('DD-MM-YYYY')}</p>
                    </div>    
                  </div>    
                </div>    
                <div className="col-lg-8 col-md-9 col-sm-9 col-xs-9 reviewuserimg">
                  <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2">
                      <div className="row">
                        <h5>Review :</h5>
                      </div>    
                    </div>    
                    <div className="col-lg-11 col-md-11 col-sm-10 col-xs-10 topspace8">
                      <div className="row">
                        <p>{data.customerReview}</p>
                      </div>    
                    </div>    
                  </div>    
                </div>    
              </div>    
            </div>
                );
              }) 
              :
              null                      
          }
          </div>
        </div>
		);
	}
}