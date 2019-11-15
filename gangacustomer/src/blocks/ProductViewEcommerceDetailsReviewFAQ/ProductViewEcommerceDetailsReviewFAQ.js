import React, { Component } from 'react';
import $ from 'jquery';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import "./ProductViewEcommerceDetailsReviewFAQ.css";
import _ from 'underscore';
import moment from "moment";



export default class ProductViewEcommerceDetailsReviewFAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "product_id": this.props.productID,
      "reviewuserData": "",
      "allReviewCount": 3
    };
    this.getMyReview()
  }
  componentDidMount() {
    if (this.state.product_id) {
      this.getMyReview()
    }
  }
  getMyReview() {
    axios.get("/api/customerReview/get/list/" + this.state.product_id)
    .then((response) => {
      this.setState({
        reviewData: response.data,
      }, () => {
        console.log("reviewData", this.state.reviewData);
        // console.log("reviewuserid",this.state.reviewuserid);
      })
    })
    .catch((error) => {
      console.log('error', error);
    })
  }
  addReview(event) {
    event.preventDefault();
    this.setState({
      allReviewCount: 100
    })
  }

  render(){
    return(
      <div id="gotoreview" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding topspace">
        {
          this.state.reviewData && this.state.reviewData.length > 0 ?
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding reviewborder">
              {
                this.state.reviewData && this.state.reviewData.length > 0 ?
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailtitle">RATINGS & REVIEWS</div>
                  :
                  null
              }

              <div className="topspace15"></div>
              {
                this.state.reviewData && this.state.reviewData.length > 0 ?
                  this.state.reviewData.map((data, index) => {
                    if (index < this.state.allReviewCount) {
                      return (
                        <div key={index} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 topspace15 boxBor">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 reviewuserimg text-center">
                            <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center NOpadding">
                                {
                                  data.rating == 5 ?
                                    <fieldset className="ratingReview stars givefeedback ">
                                      <input type="radio" id="star1" name="ratingReview5" value="5" checked /><label htmlFor="star1"></label>
                                      <input type="radio" id="star2" name="ratingReview" value="4" /><label htmlFor="star2"></label>
                                      <input type="radio" id="star3" name="ratingReview" value="3" /><label htmlFor="star3"></label>
                                      <input type="radio" id="star4" name="ratingReview" value="2" /><label htmlFor="star4"></label>
                                      <input type="radio" id="star5" name="ratingReview" value="1" /><label htmlFor="star5"></label>
                                    </fieldset>
                                    :
                                    data.rating == 4 ?
                                      <fieldset className="ratingReview stars givefeedback ">
                                        <input type="radio" id="star1" name="ratingReview4" value="5" /><label htmlFor="star1"></label>
                                        <input type="radio" id="star2" name="ratingReview4" value="4" checked /><label htmlFor="star2"></label>
                                        <input type="radio" id="star3" name="ratingReview4" value="3" /><label htmlFor="star3"></label>
                                        <input type="radio" id="star4" name="ratingReview4" value="2" /><label htmlFor="star4"></label>
                                        <input type="radio" id="star5" name="ratingReview4" value="1" /><label htmlFor="star5"></label>
                                      </fieldset>
                                      :
                                      data.rating == 3 ?
                                        <fieldset className="ratingReview stars givefeedback ">
                                          <input type="radio" id="star1" name="ratingReview3" value="5" /><label htmlFor="star1"></label>
                                          <input type="radio" id="star2" name="ratingReview3" value="4" /><label htmlFor="star2"></label>
                                          <input type="radio" id="star3" name="ratingReview3" value="3" checked /><label htmlFor="star3"></label>
                                          <input type="radio" id="star4" name="ratingReview3" value="2" /><label htmlFor="star4"></label>
                                          <input type="radio" id="star5" name="ratingReview3" value="1" /><label htmlFor="star5"></label>
                                        </fieldset>
                                        :
                                        data.rating == 2 ?
                                          <fieldset className="ratingReview stars givefeedback ">
                                            <input type="radio" id="star1" name="ratingReview2" value="5" /><label htmlFor="star1"></label>
                                            <input type="radio" id="star2" name="ratingReview2" value="4" /><label htmlFor="star2"></label>
                                            <input type="radio" id="star3" name="ratingReview2" value="3" /><label htmlFor="star3"></label>
                                            <input type="radio" id="star4" name="ratingReview2" value="2" checked /><label htmlFor="star4"></label>
                                            <input type="radio" id="star5" name="ratingReview2" value="1" /><label htmlFor="star5"></label>
                                          </fieldset>
                                          :
                                          data.rating == 1 ?
                                            <fieldset className="ratingReview stars givefeedback ">
                                              <input type="radio" id="star1" name="ratingReview1" value="5" /><label htmlFor="star1"></label>
                                              <input type="radio" id="star2" name="ratingReview1" value="4" /><label htmlFor="star2"></label>
                                              <input type="radio" id="star3" name="ratingReview1" value="3" /><label htmlFor="star3"></label>
                                              <input type="radio" id="star4" name="ratingReview1" value="2" /><label htmlFor="star4"></label>
                                              <input type="radio" id="star5" name="ratingReview1" value="1" checked /><label htmlFor="star5"></label>
                                            </fieldset>
                                            :
                                            <fieldset className="ratingReview stars givefeedback ">
                                              <input type="radio" id="star1" name="ratingReview" value="5" /><label htmlFor="star1"></label>
                                              <input type="radio" id="star2" name="ratingReview" value="4" /><label htmlFor="star2"></label>
                                              <input type="radio" id="star3" name="ratingReview" value="3" /><label htmlFor="star3"></label>
                                              <input type="radio" id="star4" name="ratingReview" value="2" /><label htmlFor="star4"></label>
                                              <input type="radio" id="star5" name="ratingReview" value="1" /><label htmlFor="star5"></label>
                                            </fieldset>

                                }

                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 textAlignLeft NOpadding">
                                {/* <img src="/images/userImage.png"/> */}
                                By<b><span> {data.customerName} </span></b>
                                <span className="reviewDate"> ({moment(data.createdAt).format('DD-MM-YYYY')})</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 reviewuserimg">
                            <div className="row">
                              {/* <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2">
<div className="row">
<h5>Review :</h5>
</div>    
</div>     */}
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 topspace8">
                                <div className="row">
                                  <p>{data.customerReview}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })
                  :
                  null
              }
              {this.state.reviewData && this.state.reviewData.length > this.state.allReviewCount ?
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxBor allReview">
                  <label>All REVIEWS</label>
                  <label className="pull-right allReviewplusSign" onClick={this.addReview.bind(this)}>+</label>
                </div>
                :
                null
              }

            </div>
            :
            null
        }
      </div>
    );
  }
}