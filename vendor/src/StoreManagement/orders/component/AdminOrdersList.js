import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import ReactTable             from "react-table";
import moment                 from "moment";
// import IAssureTable           from "../../IAssureTable/IAssureTable.jsx";
import swal                   from 'sweetalert';
import _                      from 'underscore';
import DispatchModal          from './dispatchModal.js'
import '../css/AdminOrdersList.css';

//npm i mui-datatables
//npm i @material-ui/core
import MUIDataTable from "mui-datatables";

class AdminOrdersList extends Component{ 
    constructor(props) {
        super(props);

        if(!this.props.loading){ 
            this.state = {
                "orderData":[],
                "orderId": ''
                // "notificationData" :Meteor.subscribe("notificationTemplate"),
            };
        } else{
            this.state = {
                "orderData":[],
                "orderId": ''
            };
        }
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        this.getBA();
    }
    
    getBA(){
      axios.get("/api/businessassociates/get/list")
            .then((response)=>{
              this.setState({
                  baList : response.data
              })
            })
            .catch((error)=>{
                console.log('error', error);
            })  
    }
    componentWillReceiveProps(nextProps){
        if(nextProps){
            this.setState({
                "data": nextProps.data,
            });
        }
    }
    componentWillUnmount() {
        $("body").find("script[src='/js/adminLte.js']").remove();
        if(this.basicPageTracker)
          this.basicPageTracker.stop();
    }

    changeOrderStatus(event){

        event.preventDefault();
        var status = $(event.currentTarget).attr('data-status');
        var id = $(event.currentTarget).attr('data-id');
        
        if(status != "Dispatch"){
            if(status!="Done"){
                swal({
                    title: 'Do you want to change status to '+status+ "?",
                    text: 'Do you want to change status to '+status+ "?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                  }).then((obj)=> {
                    if(obj==true){
                        var formValues = {
                          "orderID" :  id,  
                          "status"  :  status,
                          "userid"  :  localStorage.getItem('admin_ID')
                        }
                        axios.patch('/api/orders/patch/updateDeliveryStatus', formValues)
                        .then((response)=>{
                          this.props.getOrdersFun();
                          //console.log('response', response);
                          swal({
                            title : response.data.message,
                            text  : response.data.message,
                          });
                        })
                        .catch((error)=>{
                          console.log('error', error);
                        })
                    }
                  })
                  .catch((error)=>{
                    console.log('error', error);
                  })
            }
          }
      }   
    

    changeToPreviousStatus(event){
        event.preventDefault();   
        var id = $(event.currentTarget).attr('data-id'); 
        
        swal({
            title: 'Are you sure, do you want to change status to previous status',
            text: 'Are you sure, do you want to change status to previous status',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((obj)=> {
            if(obj==true){
                // Meteor.call("changeAdminOrdersToPreviousStatus",id, currentstatus, (error, result)=>{
                
                // });
                var formValues = {
                      "orderID" :  id, 
                      "userid"  :  localStorage.getItem('admin_ID')
                    }
                    axios.patch('/api/orders/patch/changeToPreviousStatus', formValues)
                    .then((response)=>{

                      this.props.getOrdersFun();
                      swal({
                        title : response.data.message,
                        text  : response.data.message,
                      });
                    })
                    .catch((error)=>{
                      console.log('error', error);
                    })
            }
          });          
    }

    
    openModal(event){
      event.preventDefault();
      $('#dispatchModal').show();
      var id = $(event.currentTarget).attr('data-id');
      this.setState({orderId : id})
    }
    
    render(){
      const data = this.state.data;

      const options = {
        print: false,
        viewColumns: false,
        filter: false,
        responsive: "stacked",
        selectableRows: 'none'
      };
      const columns = [
          { name:"Order Id" },
          { name:"Customer Name" }, 
          { name:"Total Items" },
          { name:"Total Price" },
          { name:"Order Date" },
          { name:"Status",
            options: {
              filter: true,
              sort: false,
              selectableRows: false, 
              customBodyRender: (value, tableMeta, updateValue) => {
                  return (
                    <div>
                    <div className="admin-orders-stat1">
                        {value.status}
                    </div>
                    <div className={ 
                      value.deliveryStatus == "New Order" ?
                       "admin-orders-stat-NewOrder" : ( value.deliveryStatus == "Packed" ? "admin-orders-stat-Packed" : 
                          value.deliveryStatus == "Verified"    ? "admin-orders-stat-Verified"   : 
                          value.deliveryStatus == "Inspection"  ? "admin-orders-stat-Inspection" :
                          value.deliveryStatus == "Dispatch Approved"  ? "admin-orders-stat-OrderVerified" :
                          value.deliveryStatus == "Dispatch"    ? "admin-orders-stat-Dispatched" :
                          value.deliveryStatus == "To Deliver"    ? "admin-orders-stat-Dispatched" :
                          value.deliveryStatus == "Delivery Initiated"    ? "admin-orders-stat-Delivered" :
                          value.deliveryStatus == "Delivered & Paid"   ? "admin-orders-stat-Deliveredpaid" : 
                          value.deliveryStatus == "Returned"   ? "admin-orders-stat-Dispatched" : 
                          value.deliveryStatus == "Cancelled"   ? "admin-orders-stat-Dispatched" : ""
                              ) 
                                                                                      
                        }>
                        {
                           value.deliveryStatus == "Dispatch" ? "Dispatched" : value.deliveryStatus
                        }
                    </div>
                    </div>
                  );
                }
              }    
          },
          {/*
            name: "Action",
            options: {
              filter: true,
              sort: false,
              selectableRows: false, 
              customBodyRender: (value, tableMeta, updateValue) => {
                console.log('dsfhds', value.deliveryStatus);
                  return (

                    <div>

                    {
                    value.deliveryStatus == "Cancelled" || value.deliveryStatus == "Returned" || 
                    value.deliveryStatus == "Dispatch" || value.deliveryStatus == "Delivery Initiated" 
                    ||  value.deliveryStatus == "Delivered & Paid" || value.deliveryStatus == "New Order"? 
                            ""
                          :
                      <div className="admin-order-view col-lg-2 col-md-2"  onClick={this.changeToPreviousStatus.bind(this)} data-id={value._id} 
                              title={  
                                  value.deliveryStatus == "Verified"           ? "New Order" :
                                  value.deliveryStatus == "Packed"             ? "Verify Order" :
                                  value.deliveryStatus == "Inspection"         ? "Order Packed" :
                                  value.deliveryStatus == "Dispatch Approved"  ? "Inspect The Order" : 
                                  value.deliveryStatus == "Delivered & Paid"   ? "Done" : "Done"
                              } 
                              
                              >
                          <i className="fa fa-undo" aria-hidden="true"></i>
                      </div>
                  }

                    <a href={value.viewOrder} target="_blank" title="View Invoice" className="admin-order-view col-lg-2 col-md-2">
                        <i className="fa fa-eye" aria-hidden="true"></i>
                    </a>
                    
                    {
                      value.deliveryStatus == "Dispatch" || value.deliveryStatus == "Delivery Initiated" || value.deliveryStatus == "Delivered & Paid" ? 
                      ""
                      :
                      <div className={
                        value.deliveryStatus == "New Order" ?
                           "col-lg-2" : ( value.deliveryStatus == "Packed" ? "col-lg-2" : 
                            value.deliveryStatus == "Verified"    ? "col-lg-2"   : 
                            value.deliveryStatus == "Inspection"  ? "col-lg-2" :
                            value.deliveryStatus == "Dispatch Approved"  ? "col-lg-2" :
                            value.deliveryStatus == "Dispatch"    ? "col-lg-2" :
                            value.deliveryStatus == "To Deliver"    ? "col-lg-2" :
                            value.deliveryStatus == "Delivery Initiated"    ? "col-lg-2" :
                            value.deliveryStatus == "Delivered & Paid"   ? "col-lg-2" : 
                            value.deliveryStatus == "Returned"   ? "col-lg-2" : 
                            value.deliveryStatus == "Cancelled"   ? "col-lg-2" : ""
                                ) 
                                                                                      
                        } onClick={  value.deliveryStatus != "Dispatch Approved" ? this.changeOrderStatus.bind(this) : this.openModal.bind(this) } 
                            data-id={value._id} data-status={
                            value.deliveryStatus == "New Order"         ? "Verified" :  
                            value.deliveryStatus == "Verified"          ? "Packed" :  
                            value.deliveryStatus == "Packed"            ? "Inspection" :  
                            value.deliveryStatus == "Inspection"        ? "Dispatch Approved" :  
                            value.deliveryStatus == "Dispatch Approved"    ? "Dispatch" :  
                            value.deliveryStatus == "Dispatch"          ? "Delivery Initiated" :  
                            value.deliveryStatus == "Delivery Initiated"         ? "Delivered & Paid" :
                            value.deliveryStatus == "Delivered & Paid"  ? "Done" : "Done"
                          } 
                            title={
                              value.deliveryStatus == "New Order"          ? "Verify The Order" :  
                              value.deliveryStatus == "Verified"           ? "Order Packing" :  
                              value.deliveryStatus == "Packed"             ? "Inspect The Order" :  
                              value.deliveryStatus == "Inspection"         ? "Verify For Dispatch" :  
                              value.deliveryStatus== "Dispatch Approved"     ? "Dispatch Order" :  
                              value.deliveryStatus== "Dispatch"           ? "Initiate Order Delivery" :  
                              value.deliveryStatus == "Delivery Initiated" ? "Delivered & Paid" :  
                              value.deliveryStatus == "Delivered & Paid"   ? "Done" : "Done"
                            }
                            
                            data-currentstatus={
                                value.deliveryStatus == "New Order"          ? value.deliveryStatus :  
                                value.deliveryStatus == "Verified"           ? value.deliveryStatus :  
                                value.deliveryStatus == "Packed"             ? value.deliveryStatus :  
                                value.deliveryStatus == "Inspection"         ? value.deliveryStatus :  
                                value.deliveryStatus == "Dispatch Approved"  ? value.deliveryStatus :  
                                value.deliveryStatus == "Dispatch"           ? value.deliveryStatus :  
                                value.deliveryStatus == "Delivery Initiated" ? value.deliveryStatus : 
                                value.deliveryStatus == "Delivered & Paid"   ? value.deliveryStatus : ""
                            }
                            >
                            <i className={  
                               value.deliveryStatus == "New Order"          ? "fa fa-product-hunt admin-orders-stat-NewOrdericon" :  
                               value.deliveryStatus == "Verified"           ? "fa fa-check-square admin-orders-stat-Verifiedicon" :  
                               value.deliveryStatus == "Packed"             ? "fa fa-archive admin-orders-stat-Packedicon" :  
                               value.deliveryStatus == "Inspection"         ? "fa fa-info-circle admin-orders-stat-Inspectionicon" :  
                               value.deliveryStatus == "Dispatch Approved"  ? "fa fa-angellist admin-orders-stat-OrderVerifiedicon" :  
                               value.deliveryStatus == "Dispatch"           ? "fa fa-truck admin-orders-stat-Dispatchedicon" :  
                               value.deliveryStatus == "Delivery Initiated" ? "fa fa-check-circle admin-orders-stat-Deliveredicon" :  
                               value.deliveryStatus == "Delivered & Paid"   ? "fa fa-check-circle" : ""
                            }
                               aria-hidden="true"></i>
                        </div>
                    }
                    
                    </div>                                               
                  );
                }
            }

          */}
        ];
        return(         
            <div className="container-fluid">
              <div className="row">
                <div className="formWrapper">

                  <section className="content">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                    <br/>
                      <div className="row">
                          <div className="admin-orders-SubTitleRow  row">
                            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                <div className="admin-orders-listofColors">
                                    <span className="">
                                        <span className="admin-orders-stat-NewOrder comm-status-of-order"></span>
                                        New Order
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
                                        Dispatch Approved
                                    </span>
                                    <span className="">
                                        <span className="admin-orders-stat-Dispatched comm-status-of-order"></span>
                                        Dispatched
                                    </span>
                                    <span className="">
                                        <span className="admin-orders-stat-Delivered comm-status-of-order"></span>
                                        Delivery Initiated
                                    </span>
                                    <span className="">
                                        <span className="admin-orders-stat-Deliveredpaid comm-status-of-order"></span>
                                        Delivered & Paid
                                    </span>
                                   </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <MUIDataTable
                            title="Shipment Tracking"
                            options={options}
                            data={data}
                            columns={columns}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <div id="dispatchModal" className="modal ssmodal">
                    <button type="button" className="close dispatchModalClose">&times;</button>
                    <DispatchModal baList={this.state.baList} orderId={this.state.orderId}  />
                  </div>
                </div>
              </div>
            </div> 
        );
    }
}

export default AdminOrdersList
