import React, {Component} from 'react';
import axios                  from 'axios';
import $                  from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';
import swal                   from 'sweetalert';
import './MyOrders.css';
import Sidebar from '../../common/Sidebar/Sidebar.js';
import moment                 from "moment";

export default class MyOrders extends Component {
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
      var userId=localStorage.getItem('user_ID');
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
                            swal({
                                    title: "Order is returned",
                                    icon: "info", 
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

      /*if(status=="New Order" || status=="Verified" || status=="Packed") {
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
                          "userid"  :  localStorage.getItem('user_ID')
                        }
                        axios.patch('/api/orders/get/cancelOrder', formValues)
                        .then((response)=>{
                         
                          console.log('response', response);
                           this.getMyOrders();
                          swal({
                            html:true,
                            text: "Your order is cancelled. Refund will be made as per Cancellation Policy.",
                            content: el,
                            icon: "info",
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
          icon: "info", 
          button: "Close",
          focusConfirm: false,
          showCloseButton: true
        });
      }*/      
     
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
                      
                          swal({
                            html:true,
                            text: "Your order is cancelled. Refund will be made as per Cancellation Policy.",
                            content: el,
                            icon: "info",
                            button: "Close",
                            focusConfirm: false,
                            showCloseButton: true
                          });
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
            	{
            	this.state.orderData && this.state.orderData.length > 0 ?
	                this.state.orderData.map((data, index)=>{
	                	return(
		                <tr>
		                    <td data-th="Order #" className="col id">{data.orderID}</td>
		                    <td data-th="Date" className="col date">{moment(data.createdAt).format("DD/MM/YYYY HH:mm")}</td>
							           <td data-th="Ship To" className="col shipping">{data.userFullName}</td>
		                    <td data-th="Order Total" className="col total"><span><i className={"fa fa-"+data.currency}> {data.totalAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </i></span></td>
		                    <td data-th="Status" className="col status">{data.deliveryStatus[0].status}</td>
		                    <td data-th="Actions" className="col actions">

		                  
                        {
                              data.deliveryStatus ?
                              data.deliveryStatus.map((delivery, index)=>{ 
                                return(
                                  <div className="actbtns">

                                  <a className="btn alphab filterallalphab" href={"/viewOrder/"+data._id} title="View Order">
                                  <span> <i className="fa fa-eye"></i></span></a>&nbsp;&nbsp;

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
                                    <a className="btn alphab filterallalphab" href={"/#/"+data._id} title="Reorder">
                                            <span> <i className="fa fa-repeat"></i></span></a>&nbsp;&nbsp;
                                  </div>
                                );
                               
                              }) 
                              : ''
                        }
		                    </td>
		                </tr>
		              );
	            	})
	            	: ""
            	}
           	</tbody>
        	</table>

           {/* returnProductModal */ }
          <div className="modal fade" id="returnProductModal" role="dialog">
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
                    <a className="btn btn-default"  href="/ReturnPolicy">View Return Policy</a>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                  <div className="canreturn">
                    <button className="btn btn-default" onClick={this.returnProductAction.bind(this)} id="returnProductBtn" data-dismiss="modal"  >Yes</button>
                    <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* cancelProductModal */ }
          <div className="modal fade" id="cancelProductModal" role="dialog">
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
                    <a className="btn btn-default"  href="/ReturnPolicy">View Return Policy</a>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                  <div className="cancancel">
                    <button className="btn btn-default" onClick={this.cancelProductAction.bind(this)} id="cancelProductBtn" data-dismiss="modal"  >Yes</button>
                    <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
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

