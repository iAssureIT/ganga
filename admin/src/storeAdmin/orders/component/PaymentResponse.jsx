import React, {Component} from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import { Cart } from '/imports/StoreManagement/reports/api/ReportMaster.js';
import { Orders } from '/imports/StoreManagement/orders/api/orderMaster.js';
import { FlowRouter }        from 'meteor/ostrio:flow-router-extra';

import {Link} from 'react-router';
import { browserHistory } from 'react-router';
import { CompanySettings } from '/imports/admin/companySetting/CompanyInformation_setting/CompanySettingMaster.js';
import OrderPlaceSuccessfully from './OrderPlaceSuccessfully';
//import { CompanySettings } from '/imports/dashboard/companySetting/api/CompanySettingMaster.js';

/*After payment process for online payment*/

afteronlinePaymentProcess = function(orderId){

    //-----------------------------------------------------------------
    //Get Multiplying factor for this client
    // Try to define Global class which extends default user class
            // var multiplyingFactor = getMultiflyingFactor();
          
    //-----------------------------------------------------------------
    
            // Now payment is successful. 
            // Move Cart Items which were selected for Order, to Order table. 
            // var companyObj  = CompanySettings.findOne({"companyId" : 101});
            var userId      = Meteor.userId();
            // var userRoles   = Meteor.users.findOne({'_id':userId});
            var i           = 0;
            var productIds  = [];
            var prices      = [];
            var qtys        = [];
            var totals      = [];
            var index       = [];
            var discountedProdPrice = [];
            var totalAmount   = 0;
            var discountAvail = 0;
            
    
            var cartItemsMove  = Cart.findOne({"userId" : userId});
            if(cartItemsMove){
                // console.log(cartItemsMove);
                // if(cartItemsMove.couponUsed){
                //     if(cartItemsMove.couponUsed.moneySaved){
                //         discountAvail = cartItemsMove.couponUfsed.moneySaved;
                //     }
                // }
                
                var noOfItems = cartItemsMove.cartItems.length;
        
                for(i=0;i<noOfItems;i++){
                    var discountPrice = 0;
                    var cartProduct    = cartItemsMove.cartItems[i];
                    var productId      = cartProduct.productId;
                    var productIndex   = cartProduct.cartIndex;
                    var qty            = cartProduct.quantity;
                    if(cartProduct.deductedAmtAftrCoupon){ 
                        discountPrice  = cartProduct.deductedAmtAftrCoupon;
                    }
    
                    productIds[i]   = productId;
                    prices[i]       = parseInt(cartProduct.price);
                    qtys[i]         = qty;
                    totals[i]       = parseInt(cartProduct.total); ;
                    totalAmount     = totalAmount + totals[i];
                    index[i]        = productIndex;
                    discountedProdPrice[i] = discountPrice;
    
                }
    
            var grandtotalValue = grandtotalFunction();
            if(grandtotalValue){
            var inputObject = {
                                "orderId"             : orderId,
                                "userId"              : userId,
                                "productIds"          : productIds,
                                "productName"         : cartItemsMove.productName,
                                "prices"              : prices,
                                "qtys"                : qtys,
                                "totals"              : totals,
                                "discountedProdPrice" : discountedProdPrice,
                                "totalAmount"         : (grandtotalValue.finalTotal),
                                "index"               : index,
                                "couponUsed"          : cartItemsMove.couponUsed,
                                "totalForQantity"     : cartItemsMove.totalForQantity,
                                "productImage"        : cartItemsMove.productImage,
                            }
            Meteor.call('moveFromCartToOrderOnlineProcess', inputObject,
                            function(error, result) { 
                                if (error) {
                                    console.log ( error ); 
                                } //info about what went wrong 
                                else {
                                    if(result){ 
                                        // console.log('id: ',result);
                                        // var orderStatus = Orders.findOne({'_id' : result });
                                        //  if(orderStatus){
                                        //     console.log(orderStatus);
                                        //     var userId  = orderStatus.userId;
                                        //     console.log("userId :"+userId);
                                        //     var orderNo = orderStatus.OrderId;
                                        //     var orderDbDate =  orderStatus.createdAt;
                                        //     var orderDate   =  moment(orderDbDate).format('DD/MM/YYYY');
                                        //     var totalAmount = orderStatus.totalAmount;
                                        //     // console.log("afterPaymentProcess orderNo : "+orderNo);
                                        //     // console.log("afterPaymentProcess paymentMethod : "+orderStatus.paymentMethod);
                                        //     var userData = Meteor.users.findOne({'roles':'admin'});
                                        //     console.log("userData :"+JSON.stringify(userData));
                                        //     var userNameObj = Meteor.users.findOne({'_id':userId});  
                                        //     var userName  = userNameObj.profile.firstName;
                                        //     var adminId = userData._id;
                                        //     var userId  = Meteor.userId();
                                        //     console.log("userName :"+userName,"adminId :"+adminId,"userId",userId);
                                        //     var msgvariable = {
                                        //             '[UserName]'    : userName,
                                        //             '[OrderId]'     : orderNo,
                                        //             '[OrderDate]'   : orderDate,
                                        //             '[TotalAmount]' : totalAmount,
                                        //         }
                                        //         console.log("msgvariable :"+JSON.stringify(msgvariable));
                                        //         var inputObj = {  
                                        //             from         : adminId,
                                        //             to           : userId,
                                        //             templateName : 'New Order',
                                        //             variables    : msgvariable,
                                        //         }
                                        //             // sendMailnNotif(inputObj);
                                        //         sendMailNotification(inputObj);
    
                                        //             //mail to admin
                                        //         var inputObj = {  
                                        //             from         : adminId,
                                        //             to           : adminId,
                                        //             templateName : 'New Order Info For Admin',
                                        //             variables    : msgvariable,
                                        //         }
                                        //         sendMailNotification(inputObj);
                                            
                                                    var path =  "/orderPlaced/"+result;
                                                    // console.log("path :"+path);
                                                    browserHistory.replace(path);      
                                                    // FlowRouter.go('/orderPlaced/:orderId', {'orderId' : result}); 
                                                    // $(window).scrollTop(0); 
                                            
                                        // }
                                                                        
                                    }
                                    // console.log ( "successfully moved item to cart and reduced quantities");
                                    //logic for success message`
                                }//the _id of new object if successful
                            });
                    }
        }
        $('html, body').scrollTop(0);
    } //End of function
    

export default class PaymentResponse extends TrackerReact(Component) {
  constructor(props){
    super(props);
  }

  // componentDidMount(){
  //       // console.log("Inside paymentRply");
  //           var status      = this.props.params.status;
  //           var id          = this.props.params.id;
  //           var billnumbers = this.props.params.billnumbers;
  //           var checksum    = this.props.params.checksum;
  //           var userId      = Meteor.userId();

  //           console.log("status==========>",status,is,billnumbers,checksum,userId);
  //           if(status == 'paid'){
                 
  //                 Meteor.call("insertOnlineDetailsToOrder",status, id, billnumbers,function(err,result){
  //                   if(result){
  //                       //  console.log(result);
  //                        var orderId = result;
  //                        afteronlinePaymentProcess(orderId);
  //                         FlowRouter.go("/payment-success/:orderId",{"orderId":orderId});
                    
  //                 }
  //                 });
               
  //           }else{
  //               FlowRouter.go("/payment-error");
  //           }
  //               return status;
       
  // }



  render(){
    //console.log('orderid',FlowRouter.getParam('id'));
      return(
          <div>
              <OrderPlaceSuccessfully orderId={FlowRouter.getParam('orderId')} />
          </div>
      );
  }
 
}


// export default  PaymentResponseContainer = withTracker(({params}) => {
 
//   const postHandle  = Meteor.subscribe('productsCart');
//   const loading = !postHandle.ready();
//   var cartData = Cart.findOne({"userId" : Meteor.userId()})||{}; 

//   const postHandleCompanyInfo  = Meteor.subscribe('companyData');
//   const loadingCompanyInfo = !postHandle.ready();
//   var   companyData = CompanySettings.findOne({"userId" : Meteor.userId()})||{}; 
 
//   return{
//     // loading,
//     cartData,
//     // companyData,
//   }
// })(PaymentResponse);