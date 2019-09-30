import React, {Component} from 'react';
import axios                  from 'axios';
import $                  from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';
import './MyOrders.css';
import Sidebar from '../../common/Sidebar/Sidebar.js';
import moment                 from "moment";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';

export default class MyOrders extends Component {
	constructor(props) {
        super(props);

        if(!this.props.loading){
            this.state = {
                "orderData":[],
                "orderID"  :"",
                // "notificationData" :Meteor.subscribe("notificationTemplate"),
            };
        } else{
            this.state = {
                "orderData":[],
                "orderID"  :"",
            };
        }
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        this.getMyOrders();
        this.getMyUser();
    }
    getMyOrders(){
      var userId=localStorage.getItem('user_ID');
      axios.get("/api/orders/get/list/"+userId)
            .then((response)=>{
              this.setState({ 
                  orderData : response.data
              },()=>{
                console.log("orderData",this.state.orderData);
              })
            })
            .catch((error)=>{
                console.log('error', error);
            })
    }
    getMyUser(){
      var userId=localStorage.getItem('user_ID');
        axios.get("/api/users/"+userId)
          .then((response)=>{
            this.setState({ 
                reviewuserData : response.data
            },()=>{
                 // console.log("reviewuserData",this.state.reviewuserData.profile.fullName);
            })
          })
          .catch((error)=>{
              console.log('error', error);
          })  
    }
    showFeedbackForm(){
      $('#feedbackFormDiv').show();
    }
    submitReview(event){
      event.preventDefault();
      var rating = $('input[name="ratingReview"]:checked', '.feedbackForm').val();
      var formValues={
        "customerID"                : localStorage.getItem('user_ID'),
        "customerName"              : this.state.reviewuserData.profile.fullName,
        "orderID"                   : this.state.orderID,
        "productID"                 : $(event.currentTarget).data('productid'),
        "rating"                    : rating,
        "customerReview"            : $('.feedbackForm textarea').val()
      }

      axios.post("/api/customerReview/post",formValues)
            .then((response)=>{
               // swal(response.data.message);    
            })
            .catch((error)=>{
            })
      
      console.log(formValues);
    }
    returnProduct(event){
      $('#returnProductModal').show();
      
      var status = $(event.target).data('status');
      var id = $(event.target).data('id');

      
      var str= '';

      if(status=="Delivered & Paid" || status=="Delivery Initiated") {
        str = 'Do you want to return order?';
        $('#returnProductBtn').attr('data-id', id);
        $('.cantreturn').hide();
        $('.canreturn').show();
      } else{
        str = "This order is not delivered yet. You cannot return this order.";

        $('.cantreturn').show();
        $('.canreturn').hide();
      }

      $('.modaltext').html('');
      $('.modaltext').append(str); 
    }
    getoneproductdetails(event){      
      var id = event.target.id;
      this.setState({orderID:id});
      // console.log("oneproductdetails==>",id);
      axios.get("/api/products/get/one/"+id)
            .then((response)=>{
              this.setState({ 
                oneproductdetails : response.data
              },()=>{
                console.log("oneproductdetails",this.state.oneproductdetails);
              })
            })
            .catch((error)=>{
                console.log('error', error);
            })
    }

    returnProductAction(event){
      event.preventDefault();
        var id = $(event.target).data('id');

        var formValues = {
                          "orderID" :  id,  
                          "userid"  :  localStorage.getItem('user_ID')
                        }

       axios.patch('/api/orders/get/returnOrder', formValues)
                        .then((response)=>{
                           this.getMyOrders();
                            // swal({
                            //         title: "Order is returned",
                            //         icon: "info", 
                            //         buttons: ["View Return Policy","Close"],
                            //         focusConfirm: false,
                            //         showCloseButton: true
                            //       })
                            // .then((inputValue) => {
                            //   if (inputValue != true) {
                            //     window.location = '/returnpolicy';
                            //   }
                              })
                             
                        .catch((error)=>{
                          console.log('error', error);
                        })
                      // })

    }
    cancelProduct(event){
      
      $('#cancelProductModal').show();
      var status = $(event.target).data('status');
      var id = $(event.target).data('id');
      var str= '';

      if(status=="New Order" || status=="Verified" || status=="Packed") {
        str = 'Do you want to cancel order?';
        $('#cancelProductBtn').attr('data-id', id);
        $('.cantcancel').hide();
        $('.cancancel').show();
      }  
      else{

        str = status=="Delivery Initiated" || status=="Delivered & Paid" ? "This order is delivered. You cannot cancel this order." : "This order is being dispatched. You cannot cancel this order.";
       
        $('.cantcancel').show();
        $('.cancancel').hide();
      }
      $('#cancelProductModal .modaltext').html('');
      $('#cancelProductModal .modaltext').append(str);      
    }

    cancelProductAction(event){
      event.preventDefault();
        var id = $(event.target).data('id');

        var formValues = {
                          "orderID" :  id,  
                          "userid"  :  localStorage.getItem('user_ID')
                        }
        axios.patch('/api/orders/get/cancelOrder', formValues)
                        .then((response)=>{
                         
                          console.log('response', response);
                          this.getMyOrders();
                          const el = document.createElement('div')
                      el.innerHTML = "<a href='/CancellationPolicy' style='color:blue !important'>View Cancellation Policy</a>"
                      
                          // swal({
                          //   html:true,
                          //   text: "Your order is cancelled. Refund will be made as per Cancellation Policy.",
                          //   content: el,
                          //   icon: "info",
                          //   button: "Close",
                          //   focusConfirm: false,
                          //   showCloseButton: true
                          // });
                        })
                        .catch((error)=>{
                          console.log('error', error);
                        })                
    }
  render() {  
    return (
    <div className="container">	
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
        <br/>
      	<div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 NOpadding">
      		<Sidebar />
      	</div>

      	<div className="col-lg-9 col-md-9 col-sm-6 col-xs-6">
      	<h4 className="table-caption">My Orders</h4>
        {
        this.state.orderData && this.state.orderData.length > 0 ?
            this.state.orderData.map((data, index)=>{
              return(
                <div className="orderbodyborder">
            		<table className="data table table-order-items history" id="my-orders-table">
                  <thead>
                      <tr>
                          <th scope="col" className="col id">Order #</th>
                          <th scope="col" className="col date">Date</th>
                          <th scope="col" className="col shipping">Ship To</th>
                          <th scope="col" className="col total">Order Total</th>
                          <th scope="col" className="col status">Status</th>
                          <th scope="col" className="col actions">&nbsp;</th>
                      </tr>
                  </thead>
                  <tbody>
      		                <tr key={index}>
      		                    <td data-th="Order #" className="col id">{data.orderID}</td>
      		                    <td data-th="Date" className="col date">{moment(data.createdAt).format("DD/MM/YYYY HH:mm")}</td>
      							          <td data-th="Ship To" className="col shipping">{data.userFullName}</td>
      		                    <td data-th="Order Total" className="col total"><span><i className={"fa fa-"+data.currency}> {data.totalAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </i></span></td>
      		                    <td data-th="Status" className="col status">{ data.deliveryStatus[0].status=="Dispatch" || data.deliveryStatus[0].status == "Delivery Initiated" ? "Out for Delivery" : data.deliveryStatus[0].status }</td>
      		                    <td data-th="Actions" className="col actions">

      		                  
                              {
                                    data.deliveryStatus ?
                                    data.deliveryStatus.map((delivery, index)=>{ 
                                      return(
                                        <div className="actbtns">

                                        <a className="btn alphab filterallalphab" href={"/view-order/"+data._id} title="View Order">
                                        <span> <i className="fa fa-eye"></i></span></a>

                                        {
                                          delivery.status == 'Cancelled' || delivery.status == 'Returned' ? '' :
                                          <button type="button" data-toggle="modal" data-target="#returnProductModal" className="btn alphab filterallalphab" name="returnbtn" title="Return" 
                                          onClick={this.returnProduct.bind(this)} data-status={delivery.status} data-id={data._id}>
                                          <i className="fa"  data-status={delivery.status} data-id={data._id}>&#xf0e2;</i></button>
                                        }
                                        {
                                           delivery.status == 'Cancelled' || delivery.status == 'Returned' ? '' :
                                          <button type="button" data-toggle="modal" data-target="#cancelProductModal" className="btn alphab filterallalphab" name="returnbtn" title="Cancel" onClick={this.cancelProduct.bind(this)} 
                                          data-status={delivery.status} data-id={data._id}>X</button>
                                        }
                                        </div>
                                      );
                                     
                                    }) 
                                    : ''
                              }
      		                    </td>
      		                </tr>
                 	</tbody>
              	</table>
                <table className="data table table-order-items history" id="my-orders-table">
                  <thead>
                      <tr>
                          <th scope="col" className="col id">Product Image</th>
                          <th scope="col" className="col id">Product Name</th>
                          <th scope="col" className="col date">Price</th>
                          <th scope="col" className="col shipping">Qty</th>
                          <th scope="col" className="col total">Subtotal</th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                    data.products && data.products.length > 0 ?
                        data.products.map((productData, index)=>{
                          return(
                          <tr key={'id'+index}>
                              <td data-th="Order #" className="col id orderimgsize"><img src={productData.productImage[0]}/></td>
                              <td data-th="Order #" className="col id">{productData.productName}</td>
                              <td data-th="Date" className="col date"><i className={"fa fa-"+productData.currency}> {productData.total}</i></td>
                              <td data-th="Ship To" className="col shipping">Ordered: {productData.quantity}</td>
                              <td data-th="Order Total" className="col total"><span><i className={"fa fa-"+productData.currency}> {productData.total}</i></span></td>
                              { data.status == "Paid" ?
                              <td data-th="Order Total" className="col total actbtns">
                                  <a><button type="button" data-toggle="modal" data-target="#feedbackProductModal" className="btn alphab filterallalphab" title="Give Feedback" id={productData.product_ID} onClick={this.getoneproductdetails.bind(this)}> <i id={productData.product_ID} onClick={this.getoneproductdetails.bind(this)} className="fa fa-pencil"></i></button></a>
                              </td>
                              :
                              null
                            }
{/*                              <td data-th="Order Total" className="col total actbtns">
                                  <a><button type="button" data-toggle="modal" data-target="#feedbackProductModal" className="btn alphab filterallalphab" title="Give Feedback" id={productData.product_ID} onClick={this.getoneproductdetails.bind(this)}> <i id={productData.product_ID} onClick={this.getoneproductdetails.bind(this)} className="fa fa-pencil"></i></button></a>
                              </td>*/}
                          </tr>
                          );
                      })
                      : ""
                    }
                  </tbody>
                </table>
          </div>
            );
          })
          : ""
        }


           {/* returnProductModal */ }

          <div className="modal" id="returnProductModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h3 className="modalTitle">Return Order</h3>
                </div>
                <div className="modal-body">
                  <h4 className="modaltext"></h4>
                </div>
                <div className="modal-footer">
                  <div className="cantreturn">
                    <a className="btn btn-warning"  href="/returnpolicy">View Return Policy</a>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                  <div className="canreturn">
                    <button className="btn btn-danger" onClick={this.returnProductAction.bind(this)} id="returnProductBtn" data-dismiss="modal"  >Yes</button>
                    <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* cancelProductModal */ }
          <div className="modal" id="cancelProductModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h3 className="modalTitle">Cancel Order</h3>
                </div>
                <div className="modal-body">
                  <h4 className="modaltext"></h4>
                </div>
                <div className="modal-footer">
                   <div className="cantcancel">
                    <a className="btn btn-warning"  href="/ReturnPolicy">View Return Policy</a>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                  <div className="cancancel">
                    <button className="btn btn-danger" onClick={this.cancelProductAction.bind(this)} id="cancelProductBtn" data-dismiss="modal"  >Yes</button>
                    <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* feedbackProductModal */ }
          <div className="modal" id="feedbackProductModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h3 className="modalTitle">Create Review</h3>
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
                          <textarea rows="5" cols="65"></textarea>
                        </div>
                        <div className="row inputrow">
                        
                        </div>
                  </form>      
                </div>
                    
                </div>
                <div className="modal-footer modalfooterborder ">
                     <button className="btn btn-warning" onClick={this.submitReview.bind(this)} data-productid={this.state.oneproductdetails && this.state.oneproductdetails._id}
                     >Submit</button>
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

