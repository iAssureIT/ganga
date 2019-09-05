import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'meteor/react-meteor-data';
import {Tracker} from 'meteor/tracker';
import { withTracker }          from 'meteor/react-meteor-data';
import { Orders } from '/imports/StoreManagement/orders/api/orderMaster.js';
import IMask from 'imask';
import InputMask from 'react-input-mask';

class AdminOrdersList extends TrackerReact (Component){
    constructor(props) {
        super(props);

        if(!this.props.loading){
            this.state = {
                "orderData":[],
                "notificationData" :Meteor.subscribe("notificationTemplate"),
            };
        } else{
            this.state = {
                "orderData":[],
            };
        }
        window.scrollTo(0, 0);
    }

    componentDidMount() {

        if(!$("link[href='/css/dashboard.css']").length > 0){
            var dashboardCss = document.createElement("link");
            dashboardCss.type="text/css";
            dashboardCss.rel ="stylesheet";
            dashboardCss.href="/css/dashboard.css";
            document.head.append(dashboardCss);
        }



        if (!$("#adminLte").length>0 && !$('body').hasClass('adminLte')) {
          var adminLte = document.createElement("script");
          adminLte.type = "text/javascript";
          adminLte.src = "/js/adminLte.js";
          adminLte.setAttribute('id','adminLte');
          $("body").append(adminLte);
        }

        // this.basicPageTracker = Tracker.autorun( ()=> {

        //     let handleData = Meteor.subscribe("OrdersData");
        //     var handleadmin = Meteor.subscribe("userfunction");
           //  var handlenotificationTemplate = Meteor.subscribe("notificationTemplate");
        
        //     if(handleData.ready()){
        //         var data = Orders.find({},{sort: {createdAt:-1}}).fetch();
        //         this.setState({
        //             "orderData": data,
        //         });
        //     }
        // });


    }

    componentWillReceiveProps(nextProps){
        if(nextProps && !nextProps.loading){
            this.setState({
                "orderData": nextProps.data,
            });
        }
    }
    componentWillUnmount() {
        $("body").find("script[src='/js/adminLte.js']").remove();
        if(this.basicPageTracker)
          this.basicPageTracker.stop();
    }

    changeOrdersList(event){
        
    }

    productOrderList(){
       
    }


    changeOrderStatus(event){
        event.preventDefault();
        var status = $(event.currentTarget).attr('data-status');
        //console.log('status',status);
        var id = $(event.currentTarget).attr('data-id');
        //console.log('id',id);
        //console.log('changeOrderStatus');
        if(status != "Dispatch"){
            if(status!="Done"){
                swal({
                    title: 'Are you sure want to change status to '+status+ "?",
                    text: 'Are you sure want to change status to '+status+ "?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                  }).then((obj)=> {
                    if(obj==true){
                        //console.log('obj');
                        Meteor.call("changeAdminOrdersStatus",status,id, (error, result)=>{
                                if(result =="Delivered & Paid"){
                                    var orderStatus = Orders.findOne({'DeliveryStatus.status' : result });
                                                            
                                    if(orderStatus){
                                    // console.log(orderStatus);
                                    var userId  = orderStatus.userId;
                                    // console.log("userId :"+userId);
                                    var orderNo = orderStatus.OrderId;
                                    var orderDbDate =  orderStatus.DeliveryStatus[6].Date;
                                   
                                    var orderDate   =  moment(orderDbDate).format('DD/MM/YYYY');
                                    var totalAmount = orderStatus.totalAmount;
                                    var userData = Meteor.users.findOne({'roles':'admin'});
                                    
                                    if(userData){
                                        var adminId = userData._id;
                                    }
                                    var userNameObj = Meteor.users.findOne({'_id':userId});  
                                    
                                    if(userNameObj){
                                        // console.log("userNameObj",userNameObj);
                                        var userName  = userNameObj.profile.fullname;
                                    }
                                    
                                    
                                    var msgvariable = {
                                        '[UserName]'    : userName,
                                        '[OrderId]'     : orderNo,
                                        '[OrderDate]'   : orderDate,
                                        '[TotalAmount]' : totalAmount,
                                    }               
                                    
                                    
                                    var inputObj = {  
                                        from         : adminId,
                                        to           : userId,
                                        templateName : 'Order Delivered',
                                        variables    : msgvariable,
                                    }
                                
                                    sendMailNotification(inputObj);
                
                                    // var inputObj = {  
                                    //     from         : adminId,
                                    //     to           : adminId,
                                    //     templateName : 'Order Dispatch Mail For Admin',
                                    //     variables    : msgvariable,
                                    // }
                                    
                                    // sendMailNotification(inputObj);
                                }
                            }
                        });
                    }
                  });
            }
        }
        
    }

    changeToPreviousStatus(event){
        event.preventDefault();
        var status = $(event.currentTarget).attr('data-status');
        var id = $(event.currentTarget).attr('data-id');
        var currentStatus = $(event.currentTarget).attr('data-currentStatus'); 
        if(status!="Nothing"){
            swal({
                title: 'Are you sure you want to change status to '+status+ " ?",
                text: 'Are you sure you want to change status to '+status+ " ?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
              }).then((obj)=> {
                if(obj==true){
                    Meteor.call("changeAdminOrdersToPreviousStatus",id, currentStatus, (error, result)=>{
                    
                    });
                }
              });

           
        }
        
    }

    addDispatchDetails(event){
        event.preventDefault();
        
        var id = $(event.currentTarget).attr('data-id');
        
        var dispatchCompanyName = (event.target.dispatchCompanyName.value).trim();
        var deliveryPersonName = (event.target.deliveryPersonName.value).trim();
        var deliveryPersonContact = (event.target.deliveryPersonContact.value).trim();
        var notificationData = Meteor.subscribe("notificationTemplate");
        

      
        if(id && dispatchCompanyName && deliveryPersonName && deliveryPersonContact){
            Meteor.call("adddispatchdetails",id,dispatchCompanyName,deliveryPersonName,deliveryPersonContact,(error, result)=>{
                if(result){
                    $('#dispatchDetails'+id).modal('hide') 
                    swal({
                        title: 'Dispatch Details Added Successflly',
                        text: "Dispatch Details Added Successflly",
                        type: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('.dispatchCompanyName').val('');
                    $('.deliveryPersonName').val('');
                    $('.deliveryPersonContact').val('');

                    var orderStatus = Orders.findOne({'_id' : result });
                                                        
                    if(orderStatus){
                        var userId  = orderStatus.userId;
                        var orderNo = orderStatus.OrderId;
                        var orderDbDate =  orderStatus.DeliveryStatus[5].Date;
                        var dispatchCompanyName = orderStatus.DeliveryStatus[5].DispatchCompanyName;
                        var deliveryPersonName = orderStatus.DeliveryStatus[5].DeliveryPersonName;
                        var deliveryPersonContact = orderStatus.DeliveryStatus[5].DeliveryPersonContact;
                        var orderDate   =  moment(orderDbDate).format('DD/MM/YYYY');
                        var totalAmount = orderStatus.totalAmount;
                        var userData = Meteor.users.findOne({'roles':'admin'});
                        
                        if(userData){
                            var adminId = userData._id;
                        }
                        var userNameObj = Meteor.users.findOne({'_id':userId});  
                        
                        if(userNameObj){
                            var userName  = userNameObj.profile.fullname;
                        }
                        
                        
                        var msgvariable = {
                            '[UserName]'    : userName,
                            '[DispatchCompanyName]': dispatchCompanyName,
                            '[DeliveryPersonName]' : deliveryPersonName,
                            '[DeliveryPersonContact]':deliveryPersonContact,
                            '[OrderId]'     : orderNo,
                            '[OrderDate]'   : orderDate,
                            '[TotalAmount]' : totalAmount,
                        }               
                        
                        
                        var inputObj = {  
                            from         : adminId,
                            to           : userId,
                            templateName : 'Order Dispatch',
                            variables    : msgvariable,
                        }
                    
                        sendMailNotification(inputObj);

                        var inputObj = {  
                            from         : adminId,
                            to           : adminId,
                            templateName : 'Order Dispatch Mail For Admin',
                            variables    : msgvariable,
                        }
                        
                        sendMailNotification(inputObj);
                    }
            
          

                }
            
            });
        }else{
            swal({
                title: 'Please fill all fields',
                text: "Please fill all fields",
                type: 'error',
                showConfirmButton: false,
                timer: 1500
            });
        } 
  
    }
    validateNumber(e) {
        var invalidcharacters = /[^0-9]/gi
        var phn = e.target;
        console.log('phn',phn);
        if (invalidcharacters.test(phn.value)) {
            newstring = phn.value.replace(invalidcharacters, "");
            phn.value = newstring
            console.log('val phn', phn.value);
        }

        var dynamicMask = new IMask(e.target,{
            mask: [{
            mask: '00000-00000'
            
            }
            ]
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
            <div>
                {/* Content Wrapper. Contains page content */}
                <div className="content-wrapper">
                     <div className="col-lg-12 col-md-12 hidden-sm hidden-xs secdiv"></div>
                        <section className="content">
                            <div className="addrol col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 boxtop">
                                    <div className="box col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                       

                                            {/* /.box-header */}
                                            <div className="NOpadding col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                            <div className="with-border box-header col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                              <div className="col-lg-9 col-md-9 col-sm-9 col-sm-8 pdcls">
                                                   <h4 className="weighttitle">Order List</h4>
                                              </div>                                                               
                                            </div>
                                                <div className="row">
                                                    <div className="col-md-12">

                                                        <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            {/*<h1 className=" admin-orders-SubTitle   text-center">Orders List</h1>
                                                            <hr/>*/}
                                                            

                                                             <div className="admin-orders-SubTitleRow  row">
                                                                <div className="col-lg-12">
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
                                                                            Order Verified
                                                                        </span>
                                                                        <span className="">
                                                                            <span className="admin-orders-stat-Dispatched comm-status-of-order"></span>
                                                                            Dispatch
                                                                        </span>
                                                                        <span className="">
                                                                            <span className="admin-orders-stat-Delivered comm-status-of-order"></span>
                                                                            Delivered
                                                                        </span>
                                                                        <span className="">
                                                                            <span className="admin-orders-stat-Deliveredpaid comm-status-of-order"></span>
                                                                            Delivered & Paid
                                                                        </span>
                                                                       
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="admin-orders-SubTitleTable marginTop11">
                                                                <table className="table iAssureITtable-bordered table-striped table-hover">
                                                                    <thead className="tempTableHeader">
                                                                        <tr>
                                                                            <th className="col-lg-1 whiteSpace">Order ID</th>
                                                                            <th className="col-lg-2">Customer</th>
                                                                            <th className="col-lg-2">No. of Products</th>
                                                                            <th className="col-lg-1">Quantity</th>
                                                                            <th className="col-lg-1">Total Price</th>
                                                                            <th className="col-lg-1 whiteSpace">Order Date</th>
                                                                            <th className="col-lg-2">Status</th>
                                                                            <th className="col-lg-2">Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            this.state.orderData.map((listData, index)=>{
                                                                                return(
                                                                                    <tr key={index}>
                                                                                        <td className="col-lg-1">
                                                                                            {listData.OrderId}
                                                                                        </td>
                                                                                        <td className="col-lg-2">
                                                                                            {listData.userName }
                                                                                        </td>
                                                                                       
                                                                                        <td className="col-lg-2 textAlignRight">
                                                                                            {listData.productLength }
                                                                                        </td>
                                                                                        <td className="col-lg-1 textAlignRight">
                                                                                            {listData.totalQuantity }
                                                                                        </td>
                                                                                        <td className="col-lg-1 textAlignRight">
                                                                                           {/* R &nbsp;{listData.totalAmount } */}
                                                                                           {(parseInt(listData.totalAmount)).toFixed(2)}
                                                                                        </td>
                                                                                        <td className="col-lg-1 textAlignCenter">
                                                                                            {/* {moment(listData.createdAt).format("MMM Do YY")} */}
                                                                                            {moment(listData.createdAt).format('LL')}
                                                                                        </td>
                                                                                        <td className="col-lg-2">
                                                                                            <div className="admin-orders-stat1">
                                                                                                {listData.status}
                                                                                            </div>
                                                                                            <div className={  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "New Order"          ? "admin-orders-stat-NewOrder" :  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Verified"           ? "admin-orders-stat-Verified" :  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Packed"             ? "admin-orders-stat-Packed" :  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Inspection"         ? "admin-orders-stat-Inspection" :  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Order Verified"     ? "admin-orders-stat-OrderVerified" :  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Dispatch"           ? "admin-orders-stat-Dispatched" :  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered"          ? "admin-orders-stat-Delivered" : 
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered & Paid"   ? "admin-orders-stat-Deliveredpaid" : ""
                                                                                                }>

                                                                                                {
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "New Order"          ? listData.DeliveryStatus[listData.DeliveryStatus.length-1].status :  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Verified"           ? listData.DeliveryStatus[listData.DeliveryStatus.length-1].status :  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Packed"             ? listData.DeliveryStatus[listData.DeliveryStatus.length-1].status :  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Inspection"         ? listData.DeliveryStatus[listData.DeliveryStatus.length-1].status :  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Order Verified"     ? listData.DeliveryStatus[listData.DeliveryStatus.length-1].status :  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Dispatch"           ? listData.DeliveryStatus[listData.DeliveryStatus.length-1].status :  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered"          ? listData.DeliveryStatus[listData.DeliveryStatus.length-1].status : 
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered & Paid"   ? listData.DeliveryStatus[listData.DeliveryStatus.length-1].status : ""
                                                                                                   
                                                                                                }
                                                                                            </div><div className="dispatchdetails col-lg-12">
                                                                                                                                                                                     
                                                                                             <div className="modal fade col-lg-12 col-md-12 col-sm-12 col-xs-12" id={"dispatchDetails"+listData._id} role="dialog">
                                                                                                    <div className="modal-dialog adminModal addressModal-dialog col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                                    
                                                                                                    
                                                                                                    <div className="modal-content adminModal-content col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
                                                                                                        <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                                        
                                                                                                        <h4 className="WightFont textAlignCenter col-lg-11 col-md-11 col-sm-11 col-xs-11">Add New Sub Category</h4>
                                                                                                        <div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-12 NOpadding-left NOpadding-right">
                                                                                                          <button type="button" className="adminCloseButton" data-dismiss="modal" onClick={this.closeModal.bind(this)} data-target={"openSubCatgModal"}>&times;</button>
                                                                                                        </div>
                                                                                                        </div>
                                                                                                        <div className="modal-body addressModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                                                        <form className="dispatchForm" onSubmit={this.addDispatchDetails.bind(this)} id={listData._id} data-id={listData._id}>
                                                                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                                            <div className="row inputrow">
                                                                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                                                <div className="form-group">
                                                                                                                    <label>Company Name</label><span className="astrick">*</span>
                                                                                                                    <div className="input-group">
                                                                                                                    <span className="input-group-addon" id="basic-addon1"><i className="fa fa-gg" aria-hidden="true"></i></span>
                                                                                                                    <input type="text" name="dispatchCompanyName" ref="dispatchCompanyName" className="dispatchCompanyName form-control" placeholder="" aria-label="Brand" aria-describedby="basic-addon1"  />
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="row inputrow">
                                                                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                                                <div className="form-group">
                                                                                                                    <label>Delivery Person Name</label><span className="astrick">*</span>
                                                                                                                    <div className="input-group">
                                                                                                                    <span className="input-group-addon" id="basic-addon1"><i className="fa fa-gg" aria-hidden="true"></i></span>
                                                                                                                    <input type="contact" name="deliveryPersonName" ref="deliveryPersonName" className="deliveryPersonName form-control" placeholder="" aria-label="Brand" aria-describedby="basic-addon1"   />
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="row inputrow">
                                                                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                                                <div className="form-group">
                                                                                                                    <label>Contact Number</label><span className="astrick">*</span>
                                                                                                                    <div className="input-group">
                                                                                                                    <span className="input-group-addon" id="basic-addon1"><i className="fa fa-gg" aria-hidden="true"></i></span>


                                                                                                                    <input type="text" name="deliveryPersonContact" ref="deliveryPersonContact" id={"deliveryPersonContact"} className="deliveryPersonContact form-control  " pattern="\d{5}[\-]\d{5}" onKeyUp={this.validateNumber.bind(this)} aria-label="Brand" aria-describedby="basic-addon1" />




                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                </div>
                                                                                                            </div> 
                                                                                                            </div>
                                                                                                            <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                                                                  <button type="button" className="btn adminCancel-btn col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" onClick={this.closeModal.bind(this)} data-dismiss="modal">CANCEL</button>
                                                                                                                </div>
                                                                                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                                                                    <input  type="submit" className="btn adminFinish-btn col-lg-6 col-lg-offset-6 col-md-6 col-md-offset-6 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" value="Submit" />
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            {/* <input  type="submit" className="btn btn-primary addBannerWrapperBtn2" value="Submit" />                  */}
                                                                                                          
                                                                                                        </form>
                                                                                                        </div>
                                                                                                        <div className="">
                                                                                                        {/* <button type="button" className="btn btn-default" data-dismiss="modal">Close</button> */}
                                                                                                        {/* <div className="savetemp col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                                                <div className="addBannerWrapper">
                                                                                                                <div className="addBannerWrapper2 pull-right">
                                                                                                                    <button onClick="" className="btn btn-primary addBannerWrapperBtn1">Cancel</button>
                                                                                                                    <input  type="submit" className="btn btn-primary addBannerWrapperBtn2" value="Submit" />
                                                                                                                </div>
                                                                                                                </div>
                                                                                                            </div> */}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    
                                                                                                    </div>
                                                                                                </div>
                                                                                            
                                                                                            </div>
   
                                                                                        </td>
                                                                                        <td className="col-lg-2 textAlignCenter">

                                                                                        {listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Dispatch" || listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered & Paid" || listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "New Order"? 
                                                                                                ""
                                                                                                :
                                                                                            <div className="admin-order-view"  onClick={this.changeToPreviousStatus.bind(this)} data-id={listData._id} data-status={
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "New Order"         ? "Nothing" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Verified"          ? "New Order" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Packed"            ? "Verified" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Inspection"        ? "Packed" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Order Verified"    ? "Inspection" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Dispatch"          ? "Order Verified" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered"         ? "Dispatch" :
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered & Paid"  ? "Delivered" : "Nothing"
                                                                                                    } 
                                                                                                    title={
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "New Order"         ? "" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Verified"          ? "Change Status to New Order" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Packed"            ? "Change Status to Verified" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Inspection"        ? "Change Status to Packed" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Order Verified"    ? "Change Status to Inspection" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Dispatch"          ? "Change Status to Order Verified" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered"         ? "Change Status to Dispatch" : 
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered & Paid"  ? "Delivered" : ""
                                                                                                    } 
                                                                                                    data-currentStatus={
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "New Order"          ? listData.DeliveryStatus[listData.DeliveryStatus.length-1].status :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Verified"           ? listData.DeliveryStatus[listData.DeliveryStatus.length-1].status :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Packed"             ? listData.DeliveryStatus[listData.DeliveryStatus.length-1].status :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Inspection"         ? listData.DeliveryStatus[listData.DeliveryStatus.length-1].status :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Order Verified"     ? listData.DeliveryStatus[listData.DeliveryStatus.length-1].status :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Dispatch"           ? listData.DeliveryStatus[listData.DeliveryStatus.length-1].status :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered"          ? listData.DeliveryStatus[listData.DeliveryStatus.length-1].status : 
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered & Paid"   ? listData.DeliveryStatus[listData.DeliveryStatus.length-1].status : ""
                                                                                                    }
                                                                                                    >
                                                                                                <i className="fa fa-undo" aria-hidden="true"></i>
                                                                                            </div>
                                                                                        }

                                                                                            <a href={"/orderPlaced/"+listData._id} target="_blank" title="View Invoice" className="admin-order-view">
                                                                                                <i className="fa fa-eye" aria-hidden="true"></i>
                                                                                            </a>    

                                                                                            {listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered & Paid"? 
                                                                                                ""
                                                                                                :
                                                                                                <div className="admin-order-changeStatus " onClick={this.changeOrderStatus.bind(this)} data-id={listData._id} data-status={
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "New Order"         ? "Verified" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Verified"          ? "Packed" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Packed"            ? "Inspection" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Inspection"        ? "Order Verified" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Order Verified"    ? "Dispatch" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Dispatch"          ? "Delivered" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered"         ? "Delivered & Paid" :
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered & Paid"  ? "Done" : "Done"
                                                                                                    } 
                                                                                                    title={
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "New Order"          ? "Change Status to Verified" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Verified"           ? "Change Status to Packed" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Packed"             ? "Change Status to Inspection" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Inspection"         ? "Change Status to Order Verified" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Order Verified"     ? "Change Status to Dispatch" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Dispatch"           ? "Change Status to Delivered" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered"          ? "Change Status to Delivered & Paid" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered & Paid"   ? "Done" : "Done"
                                                                                                    }
                                                                                                    data-target={
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "New Order"         ? "" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Verified"          ? "" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Packed"            ? "" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Inspection"        ? "" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Order Verified"    ? "#dispatchDetails"+listData._id :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Dispatch"          ? "" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered"         ? "" :  
                                                                                                        listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered & Paid"  ? "" : ""
                                                                                                    } 
                                                                                                    data-toggle="modal"
                                                                                                    >
                                                                                                    <i className={  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "New Order"          ? "fa fa-product-hunt admin-orders-stat-NewOrdericon" :  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Verified"           ? "fa fa-check-square admin-orders-stat-Verifiedicon" :  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Packed"             ? "fa fa-archive admin-orders-stat-Packedicon" :  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Inspection"         ? "fa fa-info-circle admin-orders-stat-Inspectionicon" :  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Order Verified"     ? "fa fa-angellist admin-orders-stat-OrderVerifiedicon" :  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Dispatch"           ? "fa fa-truck admin-orders-stat-Dispatchedicon" :  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered"          ? "fa fa-check-circle admin-orders-stat-Deliveredicon" :  
                                                                                                   listData.DeliveryStatus[listData.DeliveryStatus.length-1].status == "Delivered & Paid"   ? "fa fa-check-circle" : ""
                                                                                                }
                                                                                                   aria-hidden="true"></i>
                                                                                                </div>
                                                                                            }


                                                                                            
                                                                                        </td>
                                                                                    </tr>
                                                                                );
                                                                            })
                                                                        }


                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        {/* /.content-wrapper */}
                    </div>

                );
            }
        }

export default AdminOrdersListContainer = withTracker(props =>{
    const handleData = Meteor.subscribe("OrdersData");
    const data = Orders.find({},{sort: {createdAt:-1}}).fetch();
    const loading = !handleData.ready();


    const handleadmin = Meteor.subscribe("userfunction");
    const handlenotificationTemplate = Meteor.subscribe("notificationTemplate");
    
    // if(handleData.ready()){
    
        
    // }

    return{
        loading,
        data
    };
})(AdminOrdersList);