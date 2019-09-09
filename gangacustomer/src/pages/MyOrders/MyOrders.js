import React, {Component} from 'react';
import axios                  from 'axios';
import $                  from 'jquery';
import swal                   from 'sweetalert';
import './MyOrders.css';
import Sidebar from '../../common/Sidebar/Sidebar.js';

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
  render() {  
    return (
    <div className="container">	
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
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
            	/*this.state.orderData && this.state.orderData.length > 0 ?
	                this.state.orderData.map((data, index)=>{
	                	return(*/
		                <tr>
		                    <td data-th="Order #" className="col id">000000100</td>
		                    <td data-th="Date" className="col date">9/4/19</td>
							<td data-th="Ship To" className="col shipping">amitraje shinde</td>
		                    <td data-th="Order Total" className="col total"><span className="price">$25.00</span></td>
		                    <td data-th="Status" className="col status">Pending</td>
		                    <td data-th="Actions" className="col actions">
		                        <a href="/viewOrder" className="action view">
		                            <span> "View"</span></a>
		                    <a href="" className="action order">
		                                <span>Reorder</span></a>
		                    </td>
		                </tr>
		            /*    );
	            	})
	            	: ""*/
            	}
           	</tbody>
        	</table>
      	</div>

      </div>
    </div>  
    );  
  }
}

