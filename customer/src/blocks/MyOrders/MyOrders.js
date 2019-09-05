import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import ReactTable             from "react-table";
import moment                 from "moment";
// import IAssureTable           from "../../IAssureTable/IAssureTable.jsx";
import swal                   from 'sweetalert';
//import EcommerceHeader        from "../../blocks/common/EcommerceHeader/EcommerceHeader.js";
import './MyOrders.css';

axios.defaults.baseURL = 'http://gangaexpressapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class MyOrders extends Component{
    constructor(props) {
        super(props);

        if(!this.props.loading){
            this.state = {
                "orderData":[],
                // "notificationData" :Meteor.subscribe("notificationTemplate"),
            };
        } else{
            this.state = {
                "orderData":[],
            };
        }
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        this.getMyOrders();
    }
    getMyOrders(){
      var userId=localStorage.getItem('admin_ID');
      axios.get("/api/orders/get/list/"+userId)
            .then((response)=>{
              this.setState({ 
                  orderData : response.data
              })
            })
            .catch((error)=>{
                console.log('error', error);
            })
    }
    showFeedbackForm(){
      $('#feedbackFormDiv').show();
    }
    returnProduct(event){
     // $('#ReturnModal').show();
      console.log($(event.target));
      var status = $(event.target).data('status');
      var id = $(event.target).data('id');
      
      if(status=="Delivered & Paid" || status=="Delivery Initiated") {

        var formValues = {
                          "orderID" :  id,  
                          "userid"  :  localStorage.getItem('admin_ID')
                        }

        swal({
                title   : 'Return Order',
                text    :  'Do you want to return order?',
                icon    : "info",
                buttons : ["Yes","No"],
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel plx!",
              })
              .then(returnedValue => {
                console.log(returnedValue);
                if (returnedValue) {

                }else{
                    axios.patch('/api/orders/get/returnOrder', formValues)
                        .then((response)=>{
                           this.getMyOrders();
                            swal({
                                    title: "Order is returned",
                                    icon: "info", /* type: "info", */
                                    buttons: ["View Return Policy","Close"],
                                    focusConfirm: false,
                                    showCloseButton: true
                                  })
                            .then((inputValue) => {
                              if (inputValue != true) {
                                window.location = '/ReturnPolicy';
                              }
                              })
                             
                        .catch((error)=>{
                          console.log('error', error);
                        })
                      })
              }
              })             
          }
    
      else{


        swal({
          title: "Return Order",
          text: "This order is not delivered yet. You cannot return this order.",
          icon: "info", /* type: "info", */
          buttons: ["View Return Policy","Close"],
          focusConfirm: false,
          showCloseButton: true
        })
        .then((inputValue) => {
          if (inputValue != true) {
            window.location = '/ReturnPolicy';
          }
          
        })

      }      
    }

    cancelProduct(event){
      
      var status = $(event.target).data('status');
      var id = $(event.target).data('id');

      if(status=="New Order" || status=="Verified" || status=="Packed") {
          swal({
                    title   : 'Cancel Order',
                    text    :  'Do you want to cancel order?',
                    icon    : "info",
                    buttons : ["Yes","No"],
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel plx!",
                  })
                  .then(returnedValue => {
                    console.log(returnedValue);
                    if (returnedValue) {

                    }else{
                      const el = document.createElement('div')
                      el.innerHTML = "<a href='/CancellationPolicy' style='color:blue !important'>View Cancellation Policy</a>"
                      
                      var formValues = {
                          "orderID" :  id,  
                          "userid"  :  localStorage.getItem('admin_ID')
                        }
                        axios.patch('/api/orders/get/cancelOrder', formValues)
                        .then((response)=>{
                         
                          console.log('response', response);
                           this.getMyOrders();
                          swal({
                            html:true,
                            text: "Your order is cancelled. Refund will be made as per Cancellation Policy.",
                            content: el,
                            icon: "info", /* type: "info", */
                            button: "Close",
                            focusConfirm: false,
                            showCloseButton: true
                          });
                        })
                        .catch((error)=>{
                          console.log('error', error);
                        })
                    }
                  }) ;
      } else{

        swal({
          title: "Cancel Order",
          text: status=="Delivery Initiated" || status=="Delivered & Paid" ? "This order is delivered. You cannot cancel this order." : "This order is being dispatched. You cannot cancel this order.",
          icon: "info", /* type: "info", */
          button: "Close",
          focusConfirm: false,
          showCloseButton: true
        });
      }      
     
    }
    
    addFeedback(event){
      event.preventDefault();
    }
    render(){
        return( 
        <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1 marginTop180">
        <div className="col-lg-12 myorderlistheader">
              <div className="">
                  <div className="text-center">
                      My Orders
                  </div>
              </div>
        </div>
            <br/>
             <div className="container-fluid">  
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 parentDiv">   
                    {
                    this.state.orderData && this.state.orderData.length > 0 ?
                       this.state.orderData.map((data, index)=>{
                       return(
                        <div key={index} className="col-lg-12 bglight">
                          <div className="col-lg-12 orderpagebox">
                            <div className="row">
                              <div className="col-lg-4">
                              <div className="">
                                <div  className=" col-lg-12 orderButton">{"OrderId-"+(data.orderID)}</div>
                                </div>
                              </div>
                             <div  className="col-lg-4 text-center">
                             <div className="row">
                             <div className="col-lg-5 col-lg-offset-3">
                              {data.deliveryStatus ?
                               data.deliveryStatus.map((delivery, index)=>{
                                return(
                                  <div key={index} className="orderfloat">
                                <button className="orderButton2">
                              <i className={ 
                                         delivery.status == "New Order" || delivery.status == "Verified" ||   delivery.status == "Packed" 
                                         || delivery.status == "Inspection" ||  delivery.status == "Dispatch Approved" 
                                          ? "fa fa-product-hunt admin-orders-stat-NewOrdericon" : 
                                         delivery.status == "Dispatch" || delivery.status=="Delivery Initiated" ? "fa fa-truck admin-orders-stat-Dispatchedicon" : 
                                         delivery.status == "Delivered & Paid"   ? "fa fa-thumbs-up admin-orders-stat-Deliveredpaidicon" : ""
                            }
                               aria-hidden="true"></i> {
                                                      delivery.status=="New Order" || delivery.status == "Verified" || delivery.status == "Packed" ||
                                                      delivery.status == "Inspection" || delivery.status == "Dispatch Approved"
                                                      ? "Order Placed" 
                                                      : delivery.status=="Dispatch" || delivery.status=="Delivery Initiated" ? "Out for Delivery" 
                                                      : delivery.status 
                                                    }</button>
                                
                                </div>
                               );
                                  })
                                 :
                                 null
                                }
                               </div>
                               </div>
                              </div>
                              <div className="col-lg-4 text-right">
                                <div className="row">
                                
                                {
                                  data.deliveryStatus ?
                                  data.deliveryStatus.map((delivery, index)=>{
                                  return(
                                    <div className="actionbtn">
                                      <button type="button" className="btn alphab filterallalphab" name="feedbackbtn" 
                                      onClick={this.showFeedbackForm.bind(this)} title="Feedback">
                                      <i className="fa fa-comment"></i></button>
                                      {
                                        delivery.status == 'Cancelled' || delivery.status == 'Returned' ? '' :
                                        <button type="button" className="btn alphab filterallalphab" name="returnbtn" title="Return" 
                                        onClick={this.returnProduct.bind(this)} data-status={delivery.status} data-id={data._id}>
                                        <i className="fa"  data-status={delivery.status} data-id={data._id}>&#xf0e2;</i></button>
                                        
                                      }
                                      {
                                         delivery.status == 'Cancelled' || delivery.status == 'Returned' ? '' :
                                        <button type="button" className="btn alphab filterallalphab" name="returnbtn" title="Cancel" onClick={this.cancelProduct.bind(this)} 
                                        data-status={delivery.status} data-id={data._id}>X</button>
                                        
                                      }
                                    </div>
                                    );

                                  })
                                   :''
                                }
                                
                                </div>
                              </div>
                            </div>
                            <hr className="hrline"/>
                            <div className="row">
                            {data.products ?
                               data.products.map((products, index)=>{
                                return(
                                        <div key={index} className="col-lg-12">
                                            <div className="col-lg-2 mtop10">
                                              <img className="itemImg" src={products.productImage[0]}/>
                                            </div>
                                            <div className="col-lg-6 mtop10">
                                              <h4>{products.productName}</h4>
                                            </div>
                                            <div className="col-lg-2 mtop10"><p className={"fa fa-"+products.currency}> {products.total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </p>
                                            </div>
                                            <div className="col-lg-2"> <h4>{data.status.charAt(0)+data.status.slice(1).toLowerCase()}</h4>
                                            </div>
                                        </div>
                                              );
                                          })
                                         :
                                         null
                                        }
                            </div>
                            <hr className="hrline"/>
                            <div className="row">
                              <div className="col-lg-12 mtop10">
                              <div className="col-lg-6">
                                <p><span>Ordered On </span>&nbsp;{ moment(data.createdAt).format("DD/MM/YYYY HH:mm") }</p>
                              </div>
                              <div className="col-lg-6 pull-right plright">
                                <p><span>Order Total</span>&nbsp;<span className={"fa fa-"+data.currency}>&nbsp;{data.totalAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </span></p>
                              </div>
                              </div>
                            </div>
                          </div>
                         
                        </div>
                        );
                                })
                               :
                               <div>
                                  <h5 className="col-lg-12 textAlignCenter"><b>Your Orders are empty</b></h5>
                                  <div className="col-lg-12 textAlignCenter">
                                  <img src="/images/emptyorder.png" />
                                  </div>
                                  <p className="col-lg-12 textAlignCenter emptyCartMsg">Looks like you haven't placed anything to your orders yet.</p>
                              </div>
                        }  
                        </div>
                        <br/>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{display:'none'}} id="feedbackFormDiv">
                          <h4>Give Feedback </h4>
                            <form className="feedbackForm" onSubmit={this.addFeedback.bind(this)} id="">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div className="col-lg-6 col-sm-12 col-xs-12 row">
                                  <fieldset className="ratingReview stars ">
                                      <input type="radio" id="star5" name="ratingReview" value="5" /><label htmlFor="star5"></label>
                                      <input type="radio" id="star4" name="ratingReview" value="4" /><label htmlFor="star4"></label>
                                      <input type="radio" id="star3" name="ratingReview" value="3" /><label htmlFor="star3"></label>
                                      <input type="radio" id="star2" name="ratingReview" value="2" /><label htmlFor="star2"></label>
                                      <input type="radio" id="star1" name="ratingReview" value="1"/><label htmlFor="star1"></label>
                                  </fieldset>
                                  <div className="clearfix "></div>
                              </div>
                                <div className="row inputrow">
                                  <textarea rows="5" cols="100"></textarea>
                                </div>
                                <div className="row inputrow">
                                <input  type="submit" className="btn" value="SUBMIT" />
                                </div>
                              </div>
                            </form>
                        </div>

                      </div>
                      </div>
           
           
          </div> 
        );
    }
}

export default MyOrders
