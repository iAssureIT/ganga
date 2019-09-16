import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import moment                 from "moment";
// import IAssureTable           from "../../IAssureTable/IAssureTable.jsx";
import swal                   from 'sweetalert';
import './ShipmentTracking.css';
 
axios.defaults.baseURL = 'http://gangaexpressapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class ShipmentTracking extends Component{
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
    closeModal(event){
        // console.log('event',event);
        event.preventDefault();
        $('.dispatchCompanyName').val('');
        $('.deliveryPersonName').val('');
        $('.deliveryPersonContact').val('');
    }
    
    render(){
        return( 
        <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1 marginTop180">
          <div className="col-lg-12 myorderlistheader">
                <div className="">
                    <div className="text-center">
                        Shipment Tracking
                    </div>
                </div>
          </div>
            <br/>
            {
              this.state.orderData && this.state.orderData.length > 0 ?

            <div className="col-lg-12 col-md-12 col-sm-12 admin-orders-SubTitleRow">
                  <div className="admin-orders-listofColors">
                      {
                      /*<span className="">
                          <span className="admin-orders-stat-NewOrder comm-status-of-order"></span>
                          Order Placed
                      </span>
                      <span className="">
                          <span className="admin-orders-stat-Verified comm-status-of-order"></span>
                          Verified
                      </span>
                      <span className="">
                          <span className="admin-orders-stat-Packed comm-status-of-order"></span>
                          Packed
                      </span>
                      <span className="">
                          <span className="admin-orders-stat-Inspection comm-status-of-order"></span>
                          Inspection
                      </span>
                      <span className="">
                          <span className="admin-orders-stat-OrderVerified comm-status-of-order"></span>
                          Order Verified
                      </span>*/
                    }
                      <span className="">
                          <span className="admin-orders-stat-Dispatched comm-status-of-order"></span>
                          Out for Delivery
                      </span>
                      
                      <span className="">
                          <span className="admin-orders-stat-Deliveredpaid comm-status-of-order"></span>
                          Delivered & Paid
                      </span>
                  </div>
          </div> : ''
          }


        {
        this.state.orderData && this.state.orderData.length > 0 ?
           this.state.orderData.map((data, index)=>{
            console.log('data',data);
            
            return(
            <div className="container-fluid">  
                <div className="row">
                    
                          
                    </div>      
                    <br/>
                    <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  parentDiv">
                    {   data.deliveryStatus[0].status == 'Dispatch' ||   data.deliveryStatus[0].status == 'Delivery Initiated'
                        || data.deliveryStatus[0].status == 'Delivered & Paid' ? 
                          <div key={index} className="col-lg-12 bglight">
                            <div className="col-lg-12 orderpagebox">
                              <div className="row">
                                <div className="col-lg-4">
                                <div className="">
                                  <div  className=" col-lg-12 orderButton">Cart Details</div>
                                  </div>
                                </div>
                               <div  className="col-lg-4 text-center">
                               <div className="row">
                               <div className="col-lg-5 col-lg-offset-3">
                                {data.deliveryStatus ?
                                 data.deliveryStatus.map((delivery, index)=>{
                                  return(
                                    <div key={index} className="orderfloat  ">
                                  <button className="orderButton2">
                                <i className={ 
                                           delivery.status == "New Order"          ? "fa fa-product-hunt admin-orders-stat-NewOrdericon" : 
                                           delivery.status == "Verified"           ? "fa fa-check-square admin-orders-stat-Verifiedicon" : 
                                           delivery.status == "Packed"             ? "fa fa-archive admin-orders-stat-Packedicon" : 
                                           delivery.status == "Inspection"         ? "fa fa-info-circle admin-orders-stat-Inspectionicon" : 
                                           delivery.status == "Dispatch Approved"     ? "fa fa-angellist admin-orders-stat-OrderVerifiedicon" : 
                                           delivery.status == "Dispatch"           ? "fa fa-truck admin-orders-stat-Dispatchedicon" : 
                                           delivery.status == "Delivery Initiated"          ? "fa fa-check-circle admin-orders-stat-Deliveredicon" : 
                                           delivery.status == "Delivered & Paid"   ? "fa fa-thumbs-up admin-orders-stat-Deliveredpaidicon" : ""
                              }
                                 aria-hidden="true"></i> {delivery.status=="New Order"  ? "Order Placed" 
                                                : delivery.status=="Dispatch"   ? "Out for Delivery" 
                                                : delivery.status }</button>
                                  
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
                          : ''
                        }
                            
                          </div>
                        </div>
                    </div>
                  );
                      })
                     :
                     <div> 
                        <h5 className="col-lg-12 textAlignCenter"><b>There is no order to track</b></h5>
                        <div className="col-lg-12 textAlignCenter">
                        <img src="/images/emptyorder.png" />
                        </div>
                        <p className="col-lg-12 textAlignCenter emptyCartMsg">Looks like you haven't placed anything to your orders yet.</p>
                    </div>
              }
        </div>
        );
    }
}

export default ShipmentTracking
