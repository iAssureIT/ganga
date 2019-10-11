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
import {ToastsContainer, ToastsStore ,ToastsContainerPosition,message,timer,classNames} from 'react-toasts';

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
        $.validator.setDefaults({
          debug: true,
          success: "valid"
        });
        $("#returnForm").validate({
        rules: {
        reasonForReturn: {
          required: true,
        },
        bankname: {
          required: true,
        },
        bankacctno: {
          required: true,
        },
        ifsccode: {
          required: true,
        }
      },
        errorPlacement: function(error, element) {
              if (element.attr("name") == "reasonForReturn"){
                error.insertAfter(".reasonForReturn");
              }
              if (element.attr("name") == "bankname"){
                error.insertAfter("#bankname");
              }
              if (element.attr("name") == "bankacctno"){
                error.insertAfter("#bankacctno");
              }
              if (element.attr("name") == "ifsccode"){
                error.insertAfter("#ifsccode");
              }
            }
      });
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
             ToastsStore.success(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
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
      var productid = $(event.target).data('productid');
      console.log($(event.target));
      var str= '';

      axios.get("/api/products/get/one/"+productid)
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
      if(status=="Paid") {
        str = 'Do you want to return order?';
        $('#returnProductBtn').attr('data-id', id);
        $('#returnProductBtn').attr('data-productid', productid);
        $('.cantreturn').hide();
        $('.canreturn').show();
      } else{
        str = "This order is not delivered yet. You cannot return this order.";

        $('.cantreturn').show();
        $('.canreturn').hide();
      }

      //$('.modaltext').html('');
      // $('.modaltext').append(str); 
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
        var productid = $(event.target).data('productid');
        var reasonForReturn = $('.reasonForReturn').val();
        console.log('returnForm',$('#returnForm').valid());
        
        var formValues = {
                          "orderID"   : id,  
                          "productID" : productid,
                          "reasonForReturn" : reasonForReturn,
                          "bankname"  : $('#bankname').val(), 
                          "bankacctno" : $('#bankacctno').val(),
                          "ifsccode"   : $('#ifsccode').val()
                        }
        //console.log(formValues);

        if ($('#returnForm').valid()) {
          axios.patch('/api/orders/get/returnOrder', formValues)
              .then((response)=>{
                console.log('response',response)
                this.getMyOrders();
                    ToastsStore.warning(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
                    $('#returnProductModal').modal('hide');
                })
                   
              .catch((error)=>{
                console.log('error', error);
              })
        }
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
                                ToastsStore.warning(<div className="alertback">Your order is cancelled. Refund will be made as per Cancellation Policy<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
                        })
                        .catch((error)=>{
                          console.log('error', error);
                        })                
    }
    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }
  render() {  
    return (
    <div className="container">	
            <div className="pagealertnone">
              <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
              </div>
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
                <div className={data.deliveryStatus[data.deliveryStatus.length-1].status == 'Cancelled' ? "cancelledorder" : "orderbodyborder"}  >
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
      		                    <td data-th="Status" className="col status">{ data.deliveryStatus[data.deliveryStatus.length-1].status=="Dispatch" || data.deliveryStatus[data.deliveryStatus.length-1].status == "Delivery Initiated" ? "Out for Delivery" : data.deliveryStatus[data.deliveryStatus.length-1].status }</td>
      		                    <td data-th="Actions" className="col actions">
                              {
                                    <div className="actbtns">

                                        <a className="btn alphab filterallalphab" href={"/view-order/"+data._id} title="View Order">
                                        <span> <i className="fa fa-eye"></i></span></a>
                                        {
                                          data.deliveryStatus[data.deliveryStatus.length-1].status == 'Cancelled' || data.deliveryStatus[data.deliveryStatus.length-1].status == 'Returned' ? '' :
                                          data.deliveryStatus[data.deliveryStatus.length-1].status =="New Order" || data.deliveryStatus[data.deliveryStatus.length-1].status =="Verified" 
                                          || data.deliveryStatus[data.deliveryStatus.length-1].status =="Packed" ? <button type="button" data-toggle="modal" data-target="#cancelProductModal" className="btn alphab filterallalphab" name="returnbtn" title="Cancel" onClick={this.cancelProduct.bind(this)} 
                                          data-status={data.deliveryStatus[data.deliveryStatus.length-1].status} data-id={data._id}>X</button> : ''
                                        }
                                    </div>
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
                        data.products.map((productData, pindex)=>{
                          console.log('productData',productData)
                          return(
                          <tr key={'id'+index} className={productData.status=="Returned" ? "greybg" : ""}>
                              <td data-th="Order #" className="col id orderimgsize"><img src={productData.productImage[0]}/></td>
                              <td data-th="Order #" className="col id">{productData.productName}</td>
                              <td data-th="Date" className="col date"><i className={"fa fa-"+productData.currency}> {productData.total}</i></td>
                              <td data-th="Ship To" className="col shipping">Ordered: {productData.quantity}</td>
                              <td data-th="Order Total" className="col total"><span><i className={"fa fa-"+productData.currency}> {productData.total}</i></span></td>
                              { data.status == "Paid" ?
                              <td data-th="Order Total" className="col total actbtns">
                                  <a><button type="button" data-toggle="modal" data-target="#feedbackProductModal" className="btn alphab filterallalphab" title="Give Feedback" id={productData.product_ID} onClick={this.getoneproductdetails.bind(this)}> <i id={productData.product_ID} onClick={this.getoneproductdetails.bind(this)} className="fa fa-pencil"></i></button></a>
                                  {
                                    data.status == 'Cancelled' || productData.status == 'Returned' ? '' :
                                    data.status == 'Paid' ? <button type="button" data-toggle="modal" data-target="#returnProductModal" className="btn alphab filterallalphab" name="returnbtn" title="Return" 
                                    onClick={this.returnProduct.bind(this)} data-status={data.status} data-id={data._id} data-productid={productData.product_ID}>
                                    <i className="fa"  data-status={data.status} data-id={data._id} data-productid={productData.product_ID} >&#xf0e2;</i></button> :''
                                  }
                              </td>
                              :
                              null
                            }
                            {
                              productData.status == "Returned" ?  
                              data.returnProducts.map((value)=> { 
                                if (value.product_ID == productData.product_ID) {
                                  return(
                                    <td>
                                    { value.returnStatus[value.returnStatus.length-1].status }
                                    </td>
                                  );  
                                }
                              })
                              :
                              null
                            }  
                          </tr>
                           
                          );
                      })
                : 
                ""
                  } 
                  </tbody>
                </table>
          </div>
            );
          })
          : 
        <div className="col-lg-12 textAlignCenter">
          <img src="/images/emptyorder.png" />
        </div>
        }


           {/* returnProductModal */ }

          <div className="modal" id="returnProductModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <img src="/images/Icon.png" />
                  <button type="button" className="close modalclosebut" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title modalheadingcont">Return Product</h4>
                </div> 
                  <h4 className="modaltext"></h4>
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
                  <div className="inputrow">
                    <h4>Back Details</h4>
                  </div>

                  <form id="returnForm">
                    <div className="inputrow">
                      <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">Reason for Return</label>
                      <textarea rows="5" cols="55" className="reasonForReturn" name="reasonForReturn" required></textarea>
                    </div> 
                    <div className="inputrow">
                      <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">Bank Name</label>
                      <input type="text" ref="bankname" name="bankname" id="bankname" value={this.state.bankname} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-control" required/>
                    </div>
                    <div className="inputrow">
                      <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">Bank Account No.</label>
                      <input type="text" ref="bankacctno" name="bankacctno" id="bankacctno" value={this.state.bankacctno} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-control" required/>
                    </div>
                    <div className="inputrow">
                      <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">IFSC Code</label>
                      <input type="text" ref="ifsccode" name="ifsccode" id="ifsccode" value={this.state.ifsccode} onChange={this.handleChange.bind(this)} className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-control" required/>
                    </div>
                  </form>
                  

                  </div>
                
{/*                  <div className="cantreturn">
                    <a className="btn btn-warning"  href="/returnpolicy">View Return Policy</a>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
*/}                 <div className="canreturn modal-footer">
                      <div className="col-lg-12">
                        <br/>

                        <button className="btn btn-danger" onClick={this.returnProductAction.bind(this)} id="returnProductBtn" >Save</button>
                        <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
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
                  <img src="/images/Icon.png" />
                  <button type="button" className="close modalclosebut" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title modalheadingcont">PRODUCT- REVIEW</h4>
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

