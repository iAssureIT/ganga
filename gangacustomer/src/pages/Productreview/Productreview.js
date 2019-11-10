import React, {Component} from 'react';
import axios              from 'axios';
import $                  from 'jquery';
import { connect }        from 'react-redux';
import SmallBanner        from '../../blocks/SmallBanner/SmallBanner.js';
import './Productreview.css';
import Sidebar from '../../common/Sidebar/Sidebar.js';
import Message from '../../blocks/Message/Message.js';
import moment                 from "moment";
import swal                   from 'sweetalert';

class Productreview extends Component {
	constructor(props) {
        super(props);
        this.state={
                 reviewData:"",
                bannerData : {
                title : "PRODUCT REVIEW",
                breadcrumb : 'Product reviews',
                backgroungImage : '/images/wishlist.png',
            },
            wishlist : [],
            products : [],
            abc :[],
            quantity : 1

        }
        window.scrollTo(0, 0);
    }
    componentDidMount(){
    this.getMyReview()
     }
        getMyReview(){
              const userid = localStorage.getItem('user_ID');
            // console.log("userid=========================>",userid);
      axios.get("/api/customerReview/get/user/list/"+userid)
            .then((response)=>{
              this.setState({ 
                  reviewData : response.data,
              },()=>{
                     // console.log("reviewData=========================>",this.state.reviewData);
                   // console.log("reviewuserid",this.state.reviewuserid);
              })
          })
            .catch((error)=>{
                console.log('error', error);
            })
    }

    Closepagealert(event){
    event.preventDefault();
    $(".toast-error").html('');
    $(".toast-success").html('');
    $(".toast-info").html('');
    $(".toast-warning").html('');
    $(".toast-error").removeClass('toast');
    $(".toast-success").removeClass('toast');
    $(".toast-info").removeClass('toast');
    $(".toast-warning").removeClass('toast');

  }

      submitReview(event){
      event.preventDefault();
      var id = $(event.target).data('dataid');
      console.log("id==========================>",id);
      var rating = $('input[name="ratingReview"]:checked', '.feedbackForm').val();
      var formValues={
        "rating"                    : rating,
        "customerReview"            : $('.feedbackForm textarea').val()
      }
       if(this.state.reviewData.length!=null){
      axios.patch("/api/customerReview/patch",formValues)
            .then((response)=>{
              this.setState({
              messageData : {
                "type" : "outpage",
                "icon" : "fa fa-check-circle",
                "message" : response.data.message,
                "class": "success",
              }
            }) 
            })
            .catch((error)=>{
            })
      
      console.log(formValues);
    }else{
      swal("Blank Review cant be submitted")
    }
    }


    
    render() {  
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
              <Message messageData={this.state.messageData} />
                <SmallBanner bannerData={this.state.bannerData}/>  
                
                <div className="container">
                    <br/>
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 NOpadding">
                        <Sidebar />
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8 NOpadding">
                      <div className="wishlist col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      { 
                        this.state.reviewData && this.state.reviewData.length >0 ?
                        this.state.reviewData.map((data,index)=>{
                          return (
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 reviewborder topspace15">
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 topspace15">
                              <div className="row">
                                <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 reviewuserimg text-center">
                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center">
                                        {
                                          data.rating == 5 ?
                                          <fieldset className="ratingReview stars givefeedback " disabled>
                                              <input type="radio" id="star1" name="ratingReview5" value="5"  checked /><label htmlFor="star1"></label>
                                              <input type="radio" id="star2" name="ratingReview" value="4"  /><label htmlFor="star2"></label>
                                              <input type="radio" id="star3" name="ratingReview" value="3"  /><label htmlFor="star3"></label>
                                              <input type="radio" id="star4" name="ratingReview" value="2"  /><label htmlFor="star4"></label>
                                              <input type="radio" id="star5" name="ratingReview" value="1"  /><label htmlFor="star5"></label>
                                          </fieldset>                         
                                            : 
                                            data.rating == 4 ?
                                            <fieldset className="ratingReview stars givefeedback " disabled>
                                                <input type="radio" id="star1" name="ratingReview4" value="5" /><label htmlFor="star1"></label>
                                                <input type="radio" id="star2" name="ratingReview4" value="4" checked /><label htmlFor="star2"></label>
                                                <input type="radio" id="star3" name="ratingReview4" value="3"  /><label htmlFor="star3"></label>
                                                <input type="radio" id="star4" name="ratingReview4" value="2"  /><label htmlFor="star4"></label>
                                                <input type="radio" id="star5" name="ratingReview4" value="1"  /><label htmlFor="star5"></label>
                                            </fieldset>
                                                : 
                                                data.rating == 3 ?
                                                <fieldset className="ratingReview stars givefeedback " disabled>
                                                    <input type="radio" id="star1" name="ratingReview3" value="5" /><label htmlFor="star1"></label>
                                                    <input type="radio" id="star2" name="ratingReview3" value="4"  /><label htmlFor="star2"></label>
                                                    <input type="radio" id="star3" name="ratingReview3" value="3" checked /><label htmlFor="star3"></label>
                                                    <input type="radio" id="star4" name="ratingReview3" value="2"  /><label htmlFor="star4"></label>
                                                    <input type="radio" id="star5" name="ratingReview3" value="1"  /><label htmlFor="star5"></label>
                                                </fieldset>
                                                    : 
                                                    data.rating == 2 ?
                                                    <fieldset className="ratingReview stars givefeedback " disabled>
                                                        <input type="radio" id="star1" name="ratingReview2" value="5" /><label htmlFor="star1"></label>
                                                        <input type="radio" id="star2" name="ratingReview2" value="4"  /><label htmlFor="star2"></label>
                                                        <input type="radio" id="star3" name="ratingReview2" value="3"  /><label htmlFor="star3"></label>
                                                        <input type="radio" id="star4" name="ratingReview2" value="2" checked /><label htmlFor="star4"></label>
                                                        <input type="radio" id="star5" name="ratingReview2" value="1"  /><label htmlFor="star5"></label>
                                                    </fieldset>
                                                      : 
                                                      data.rating == 1 ?
                                                      <fieldset className="ratingReview stars givefeedback " disabled>
                                                          <input type="radio" id="star1" name="ratingReview1" value="5" /><label htmlFor="star1"></label>
                                                          <input type="radio" id="star2" name="ratingReview1" value="4"  /><label htmlFor="star2"></label>
                                                          <input type="radio" id="star3" name="ratingReview1" value="3"  /><label htmlFor="star3"></label>
                                                          <input type="radio" id="star4" name="ratingReview1" value="2"  /><label htmlFor="star4"></label>
                                                          <input type="radio" id="star5" name="ratingReview1" value="1" checked /><label htmlFor="star5"></label>
                                                      </fieldset>
                                                            : 
                                                            <fieldset className="ratingReview stars givefeedback " disabled>
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
                                <div className="col-lg-6 col-md-6 col-sm-9 col-xs-9 reviewuserimg">
                                  <div className="row">
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                      <div className="row">
                                        <h5>Review :</h5>
                                      </div>    
                                    </div>    
                                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 topspace8">
                                      <div className="row">
                                        <p>{data.customerReview}</p>
                                      </div>    
                                    </div>    
                                  </div>    
                                </div>  
                                <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 topspace8">
                                  <div className="row">
                                  <a><button type="button" data-toggle="modal" data-target="#feedbackProductModal" className="btn" title="Give Feedback" > <i className="fa fa-pencil"></i></button></a>
                                  </div>    
                                    <div className="modal" id="feedbackProductModal" role="dialog">
                                      <div className="modal-dialog">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <img src="/images/Icon.png" />
                                            <button type="button" className="close modalclosebut" data-dismiss="modal">&times;</button>
                                            <h4 className="modal-title modalheadingcont">EDIT REVIEW</h4>
                                          </div> 
                                          <div className="modal-body">
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                          <table className="data table table-order-items history" id="my-orders-table">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="col id">Product Image</th>
                                                    <th scope="col" className="col id">Product Name</th>
                                                    <th scope="col" className="col date">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>{
                                                      this.state.oneproductdetails  ?
                                                    <tr>
                                                        <td data-th="Order #" className="col id orderimgsize"><img src={this.state.oneproductdetails.productImage[0]}/></td>
                                                        <td data-th="Order #" className="col id">{this.state.oneproductdetails.productName}</td>
                                                        <td data-th="Order Total" className="col total"><span><i className={"fa fa-"+this.state.oneproductdetails.currency}> {this.state.oneproductdetails.offeredPrice}</i></span></td>
                                                    </tr>
                                                    :
                                                   null
                                                  }
                                            </tbody>
                                          </table>
                                            <form className="feedbackForm" id="">
                                                
                                                <div className="col-lg-6 col-sm-12 col-xs-12 row">
                                                    <fieldset className="ratingReview stars givefeedback ">
                                                        <input type="radio" id="star1" name="ratingReview" value="5" /><label htmlFor="star1"></label>
                                                        <input type="radio" id="star2" name="ratingReview" value="4" /><label htmlFor="star2"></label>
                                                        <input type="radio" id="star3" name="ratingReview" value="3" /><label htmlFor="star3"></label>
                                                        <input type="radio" id="star4" name="ratingReview" value="2" /><label htmlFor="star4"></label>
                                                        <input type="radio" id="star5" name="ratingReview" value="1"/><label htmlFor="star5"></label>
                                                    </fieldset>
                                                    <div className="clearfix "></div>
                                                </div>
                                                  <div className="row inputrow">
                                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">Write review</label>
                                                    <textarea rows="5" cols="60"></textarea>
                                                  </div>
                                                  <div className="row inputrow">
                                                  
                                                  </div>
                                            </form>      
                                          </div>
                                              
                                          </div>
                                          <div className="modal-footer modalfooterborder ">
                                           <button className="btn btn-warning" onClick={this.submitReview.bind(this)} dataid={data._id} >Submit</button>
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
                          }) 
                          :
                          null                      
                      }
                      </div> 
                    </div>
                </div>
            </div>
        );  
    }
}
const mapStateToProps = (state)=>{
    return {
      
    }
  }
  const mapDispachToProps = (dispach) =>{
    return {
      changeCartCount : (cartCount)=> dispach({
        type:'CART_COUNT',
        cartCount : cartCount
      }),
      changeWishlistCount : (wishlistCount)=> dispach({
        type:'WISHLIST_COUNT',
        wishlistCount : wishlistCount
      })
    }
  }
  
  export default connect(mapStateToProps, mapDispachToProps)(Productreview);