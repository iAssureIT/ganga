import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import ReactTable             from "react-table";
import moment                 from "moment";
// import IAssureTable           from "../../IAssureTable/IAssureTable.jsx";
import swal                   from 'sweetalert';
//import EcommerceHeader        from "../../blocks/common/EcommerceHeader/EcommerceHeader.js";
import './MyOrders.css';

axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
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
        
    }

    showFeedbackForm(){
      $('#feedbackFormDiv').show();
    }
    returnProduct(event){
     // $('#ReturnModal').show();
      console.log($(event.target));
      var status = $(event.target).data('status');
      console.log(status);
      if(status=="Delivered & Paid" || status=="Delivered") {

        swal({
          title: "Return Order",
          
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
                      swal({
                        html:true,
                        text: "Your order is cancelled. Refund will be made as per Cancellation Policy.",
                        content: el,
                        icon: "info", /* type: "info", */
                        button: "Close",
                        focusConfirm: false,
                        showCloseButton: true
                      });
                    }
                  }) ;
      } else{
        swal({
          title: "Cancel Order",
          text: "This order is being dispatched. You cannot cancel this order.",
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
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop180">
        <div className="modal-dialog modal-lg">
        <div className="modal-content col-lg-12 col-md-12  col-sm-12 col-xs-12 noPadding">
            <div className="modal-header col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
            <button type="button" className="close myordermodalclose" data-dismiss="modal">&times;</button>                                                                             
            <h4 className="WightFont textAlignCenter col-lg-11 col-md-11 col-sm-11 col-xs-11">My Orders</h4>
            </div>
            <div className="modal-body addressModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">   

              <div className="container-fluid">  
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 parentDiv">   
                    {
                      this.props.orderData && this.props.orderData.length > 0 ?
                         this.props.orderData.map((data, index)=>{
                          console.log('data',data);
                          
                          return(
                  <div key={index} className="col-lg-12 bglight">
                    <div className="col-lg-12 orderpagebox">
                      <div className="row">
                        <div className="col-lg-4">
                        <div className="">
                          <div  className=" col-lg-12 orderButton">{"OrderId-"+(index+1)}</div>
                          </div>
                        </div>
                       <div  className="col-lg-4 text-center">
                       <div className="row">
                       <div className="col-lg-5 col-lg-offset-3">
                        {data.deliveryStatus ?
                         data.deliveryStatus.map((delivery, index)=>{
                          return(
                            <div key={index} className="orderfloat">
                          <button
                          title={

                                  delivery.status == "New Order"          ? "Order Placed" : 
                                  delivery.status == "Verified"           ? "Verify" : 
                                  delivery.status == "Packed"             ? "Packed" : 
                                  delivery.status == "Inspection"         ? "Inspected" : 
                                  delivery.status == "Order Verified"     ? "Order Verified" : 
                                  delivery.status == "Dispatch"           ? "Out for Delivery" : 
                                  delivery.status == "Delivered"          ? "Delivered" : 
                                  delivery.status == "Delivered & Paid"   ? "Delivered & Paid" : "Delivered & Paid"
                              }
                        className="orderButton2">
                        <i className={ 
                                   delivery.status == "New Order"          ? "fa fa-product-hunt admin-orders-stat-NewOrdericon" : 
                                   delivery.status == "Verified"           ? "fa fa-check-square admin-orders-stat-Verifiedicon" : 
                                   delivery.status == "Packed"             ? "fa fa-archive admin-orders-stat-Packedicon" : 
                                   delivery.status == "Inspection"         ? "fa fa-info-circle admin-orders-stat-Inspectionicon" : 
                                   delivery.status == "Order Verified"     ? "fa fa-angellist admin-orders-stat-OrderVerifiedicon" : 
                                   delivery.status == "Dispatch"           ? "fa fa-truck admin-orders-stat-Dispatchedicon" : 
                                   delivery.status == "Delivered"          ? "fa fa-check-circle admin-orders-stat-Deliveredicon" : 
                                   delivery.status == "Delivered & Paid"   ? "fa fa-thumbs-up admin-orders-stat-Deliveredpaidicon" : ""
                      }
                         aria-hidden="true"></i> {delivery.status=="New Order"  ? "Order Placed" 
                                                : delivery.status=="Dispatch"   ? "Out for Delivery" 
                                                : delivery.status=="TO Deliver" ? "Order Initiated" : delivery.status }</button>
                          
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
                                <button type="button" className="btn alphab filterallalphab" name="returnbtn" title="Return" 
                                onClick={this.returnProduct.bind(this)} data-status={delivery.status}>
                                <i className="fa"  data-status={delivery.status}>&#xf0e2;</i></button>
                                <button type="button" className="btn alphab filterallalphab" name="returnbtn" title="Cancel" onClick={this.cancelProduct.bind(this)} data-status={delivery.status}>X</button>
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
                            <img src="/images/noorder.png" />
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
          </div>
          </div> 
          </div> 
        );
    }
}

export default MyOrders
