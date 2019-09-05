import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';
import { HTTP } from 'meteor/http';
import {Cart} from '/imports/StoreManagement/reports/api/ReportMaster.js';

export const Orders = new Mongo.Collection('orders');



if(Meteor.isServer){
    Meteor.publish("OrdersData", (_id)=> {
        var orderData = Orders.find({});
        return orderData;
    });

    Meteor.publish("OrdersDatalimit", (_id)=> {
        var orderDatalimit = Orders.find({},{sort:{"createdAt":-1}, limit: 10});
        return orderDatalimit;
    });

    Meteor.methods({
// Method to move paid items from Cart to Order Table
'moveFromCartToOrder': function(inputObject){
    var i = 0;
    //Put human readable OrderId to display on Order Page
    maxOrderIdObj = Orders.findOne({"userId": inputObject.userId}, {sort: {numericOrderId: -1}});
    
    if(maxOrderIdObj){
      maxOrderId = maxOrderIdObj.numericOrderId + 1;
    }else{
      maxOrderId = 1;
    }

    var orderIdObj = Orders.findOne({}, {sort: {OrderId: -1}});
    if(orderIdObj){
      OrderId = orderIdObj.OrderId + 1;
    }else{
      OrderId = 1;
    }
    if(inputObject.qtys.length > 0){
      var userId = Meteor.userId();
      var payModeObj = Cart.findOne({"userId" : userId});
          
      if(payModeObj){
        var now = new Date();
        var day = now.getDay();
        var month = now.getMonth();
        var year = now.getFullYear();
        var date = now.getDate();
        var transactionID = year+month+date+'00'+OrderId;
        var cartArray = [];

        if(payModeObj.cartItems.length>0){
          var productLength = 0;
          var totalQuantity = 0;

          for(k=0;k<payModeObj.cartItems.length;k++){
            productLength = productLength + 1;
            totalQuantity = totalQuantity + parseInt(payModeObj.cartItems[k].quantity);
            cartArray.push({
              "productId"         : payModeObj.cartItems[k].productId,
              "productName"       : payModeObj.cartItems[k].productName,
              "price"             : payModeObj.cartItems[k].price,
              "quantity"          : payModeObj.cartItems[k].quantity,
              "total"             : payModeObj.cartItems[k].totalForQantity,
              "indexInProducts"   : payModeObj.cartItems[k].cartIndex,
              "productImage"      : payModeObj.cartItems[k].productImage,
              "category"          : payModeObj.cartItems[k].category,
              "subCategory"       : payModeObj.cartItems[k].subCategory,

            });
          }
        }

        var userNameData = Meteor.user();

        if(userNameData){
          var userName = userNameData.username;
        }else{
          var userName = "User";
        }

        var newOrderId = Orders.insert({
          'OrderId'           : OrderId,
          "userId"            : inputObject.userId,
          "userName"          : userName,
          "numericOrderId"    : maxOrderId,
          "cartTotal"         : payModeObj.cartTotal,
          "totalAmount"       : inputObject.totalAmount,
          "transactionID"     : transactionID,
          "status"            : "UnPaid",
          "createdAt"         : new Date(),
          "products"          : cartArray,
          "paymentMethod"     : payModeObj.paymentMethod,
          "productLength"     : productLength,
          "totalQuantity"     : totalQuantity,
          'deliveryAdd'       :{
                                  "name"     : payModeObj.deliveryAdd.name,
                                  "email"    : payModeObj.deliveryAdd.email,
                                  "houseNo"  : payModeObj.deliveryAdd.houseNo,
                                  "street"   : payModeObj.deliveryAdd.street,
                                  "landmark" : payModeObj.deliveryAdd.landmark,
                                  "pin"      : payModeObj.deliveryAdd.pin,
                                  "city"     : payModeObj.deliveryAdd.city,
                                  "state"    : payModeObj.deliveryAdd.state,
                                  "mob"      : payModeObj.deliveryAdd.mob,

                                  },
          "DeliveryStatus"   : [
              {
                "status"            : "New Order", 
                "Date"              : new Date(),
                "Userid"            : inputObject.userId, 
              }
          ], 
        });      
      }
    }

    var userCart = Cart.findOne({"userId":inputObject.userId});
    if(userCart){
      Cart.update(
        {"_id": userCart._id},
        { $set: { 
          "cartItems" : [],
          "cartTotal" : 0,
          "paymentMethod" : ""
          } 
        }
      );
    }

    Meteor.call('products.reduceTotalQty', inputObject, function(error, result) { 
      if (error) {
          console.log ( error ); 
      } else {
          // console.log ( "successful reduction in quantities");
      }
    });
    
    return newOrderId;
  },

    'changeAdminOrdersStatus': function(orderStatus, orderId){
      var newObj = {
        "status"  : orderStatus,
        "Date"    : new Date(),
        "Userid"  : Meteor.userId()
      }

      if(orderStatus=="Delivered & Paid"){

        var orderData = Orders.update(
          {"_id":orderId},
          {
            $push: {
              "DeliveryStatus": newObj,
            }, 
            $set: {
              "status":"Paid",
            }
          }
        );
      
        return "Delivered & Paid";
      }else {
        var orderData = Orders.update(
          {"_id":orderId},
          {
            $push: {
              "DeliveryStatus": newObj,
            }
          }
        );
        return orderData;
      }

     
    },

    /*Add Dispatch Details */
    "adddispatchdetails":function(id,dispatchCompanyName,deliveryPersonName,deliveryPersonContact){
      // console.log(" Serverside id :"+id)
      var newObj = {
        "status"              :"Dispatch",
        "Date"                : new Date(),
        "Userid"              : Meteor.userId(),
        "DispatchCompanyName" : dispatchCompanyName,
        "DeliveryPersonName"  : deliveryPersonName,
        "DeliveryPersonContact": deliveryPersonContact
      }

      var dispatchDetails= Orders.update(
        {'_id':id},
        { $push: {
              "DeliveryStatus": newObj,
          }
        }
      );

      return id;
    },

    
    
    'products.reduceTotalQty': function(inputObject){
        var numberOfProducts = inputObject.productIds.length;
        // console.log("numberOfProducts :" + numberOfProducts);
        var totalQtyVar;
        if(numberOfProducts > 0){
          for(i=0; i<numberOfProducts; i++){
            totalQtyVar = Products.findOne({"_id": inputObject.productIds[i]});
            if(totalQtyVar){
              var index = inputObject.index[i];
              var sizes = totalQtyVar.allSizes[index].sizes;
              
              // console.log("totalQtyVar.totalQuantity : " + totalQtyVar.totalQuantity);
              finalTotalQty = parseInt(totalQtyVar.allSizes[index].currentQty) - parseInt(inputObject.qtys[i]) ; 
              // console.log(finalTotalQty);
              Products.update(
                    { "_id" : inputObject.productIds[i], 'allSizes.sizes': sizes },
                    { $set: {
                              'allSizes.$.currentQty' : parseInt(finalTotalQty)
                            }  
                    }
              );//end update 
            }
          } //end of for loop
        } //end of if 
    },

    paymentGateway: function (grandTotal) {
      // console.log('Server amount: ' + grandTotal);
  
      // this.unblock();
      console.log("paymentGateway grandTotal :"+grandTotal);
      var userId       = Meteor.userId();
      // console.log("userId :"+userId);
      var userObj      = Meteor.users.findOne({"_id":userId});
      var mobileNumber = userObj.profile.mobNumber;
      // console.log("mobileNumber :"+mobileNumber);
      var quickWalletInput = {
                 "partnerid"   :   "263",
                //  "mobile"   :   mobileNumber,
                "mobile"       :   "9604584418",
                 "secret"      :   "pYaAXstPusVFDPHBqVTSXcRDaHutHKEWR",
                 "amount"      :    grandTotal,
                 "redirecturl" :   '/PaymentResponse'
      };
            // console.log(quickWalletInput);
      try {
        if (Meteor.isServer) {
          var result = HTTP.call("POST","https://uat.quikwallet.com/api/partner/263/requestPayment",
                                 {params: quickWalletInput});
  
          // console.log('result');
          // console.log(result);
          // parseResult = JSON.parse(result.content);
          // console.log("parseResult.data.status = " + parseResult.data.status);
  
          if(result.data.status == 'success'){
            var paymentUrl = result.data.data.url;
            // console.log("paymentUrl :"+paymentUrl);
            return paymentUrl;
          }else{
            return false;
          }
        }
      } catch (err) {
        console.log('err');
        console.log(err);
        // Got a network error, time-out or HTTP error in the 400 or 500 range.
        return false;
      }
    },

    'insertOnlineDetailsToOrder':function(status, id, billnumbers, checksum){
    
      var orderid = Orders.insert({
          ' status '       : status,
          ' trabsactionId' : id ,
          ' billNumber'    : billnumbers ,
      });
      return orderid ;
  
    },

    "changeAdminOrdersToPreviousStatus": function(id,status){
        Orders.update({'_id': id,"DeliveryStatus.status":status},{$unset:{"DeliveryStatus.$":1}},{'multi':true});
        
        Orders.update({'_id': id},{$pull:{"DeliveryStatus":null}},{'multi':true});


    },

    
    /*Move from cart to order for online process*/

  'moveFromCartToOrderOnlineProcess': function(inputObject){
  
    var i = 0;
    //Put human readable OrderId to display on Order Page
    maxOrderIdObj = Orders.findOne({"userId": inputObject.userId}, {sort: {numericOrderId: -1}});

    if(maxOrderIdObj){
    console.log(maxOrderIdObj);
    maxOrderId = maxOrderIdObj.numericOrderId + 1;
    }else{
    maxOrderId = 1;
    }

    var orderIdObj = Orders.findOne({}, {sort: {OrderId: -1}});

    if(orderIdObj){
    console.log("moveFromCartToOrderOnlineProcess :"+JSON.stringify(orderIdObj));
    OrderId = orderIdObj.OrderId + 1;
    }else{
    OrderId = 1;
    }


    if(inputObject.qtys[i] > 0){
    var userId = Meteor.userId();
    var payModeObj = Cart.findOne({"userId" : userId});

    if(payModeObj){

      var now = new Date();
      var day = now.getDay();
      var month = now.getMonth();
      var year = now.getFullYear();
      var date = now.getDate();
      var transactionID = year+month+date+'00'+OrderId;
      // console.log('now : ' + now + 'day : ' + day + 'date :'+ date + 'month :' + month + 'year : ' + year);
      var newOrderId = Orders.update({"_id":inputObject.orderId},
        {
          $set :
          {
              'OrderId'           : OrderId,
              "userId"            : inputObject.userId,
              "numericOrderId"    : maxOrderId,
              "totalAmount"       : inputObject.totalAmount,
              "transactionID"     : transactionID,
              "createdAt"         : new Date(),
              "products"          : [
                  {
                    "productId"         : inputObject.productIds[i], 
                    "price"             : inputObject.prices[i],
                    "quantity"          : inputObject.qtys[i], 
                    "total"             : inputObject.totals[i], 
                    "indexInProducts"   : inputObject.index[i],
                    "discountedProdPrice"   : inputObject.discountedProdPrice[i],
                  }
              ],
              "paymentMethod"     : payModeObj.paymentMethod,
              'deliveryAdd'       :{
                                      "name"     : payModeObj.deliveryAdd.name,
                                      "email"    : payModeObj.deliveryAdd.email,
                                      "houseNo"  : payModeObj.deliveryAdd.houseNo,
                                      "street"   : payModeObj.deliveryAdd.street,
                                      "landmark" : payModeObj.deliveryAdd.landmark,
                                      "pin"      : payModeObj.deliveryAdd.pin,
                                      "city"     : payModeObj.deliveryAdd.city,
                                      "state"    : payModeObj.deliveryAdd.state,
                                      "mob"      : payModeObj.deliveryAdd.mob,

                                      },
              "DeliveryStatus"   : [
                  {
                    "status"            : "New Order", 
                    "Date"              : new Date(),
                    "Userid"            : inputObject.userId, 
                  }
              ], 
              "couponUsed"        :  inputObject.couponUsed,         
          }
        }
    );


    // }

    } // end of if payModeObj
    } //if quantity of product is greater than 0 .

    //After the ordered products are paid, Remove them from Cart.
    //Remove first product as above. Here i = 0 defined.


    var userCart = Cart.findOne({"userId":inputObject.userId});
    if(userCart){
    Cart.update(
      {"_id": userCart._id},
      {$pull: {"cartItems": {"productId": inputObject.productIds[i]} }}
    );

    Cart.update(
      {"_id": userCart._id},{ $unset: { "couponUsed.promotionalCode": "", "couponUsed.moneySaved": "" } }
    );
    }

    //If Order has more than one products, add them to Order table and remove from Cart table
    if(newOrderId){
      var numberOfProducts = inputObject.productIds.length;
      if(numberOfProducts > 0){
        for(i=1; i<numberOfProducts; i++){

            if(inputObject.qtys[i] > 0){
              Orders.update(
                {"_id": newOrderId,  "userId": inputObject.userId},
                {$push: {"products":
                            {
                              "productId" : inputObject.productIds[i], 
                              "price"     : inputObject.prices[i],
                              "quantity"  : inputObject.qtys[i], 
                              "total"     : inputObject.totals[i],
                              "indexInProducts"   : inputObject.index[i], 
                              "discountedProdPrice"   : inputObject.discountedProdPrice[i],
                            }
                        }
                }
              );//end update  
            }   //if quantity of product is greater than 0 .


            //After the ordered products are paid, Remove them from Cart.
            var userCart = Cart.findOne({"userId": inputObject.userId});
            Cart.update(
              {"_id": userCart._id},
              {$pull: {"cartItems": {"productId": inputObject.productIds[i]} }}
            );

        }        
      }//if numberOfProducts > 0
    
    }//if orderId exists. 

    Meteor.call('products.reduceTotalQty', inputObject,
    function(error, result) { 
        if (error) {
            console.log ( error ); 
        } //info about what went wrong 
        else {
            // console.log ( "successful reduction in quantities");
            //logic for success message`
        }//the _id of new object if successful
    }
    );// End of reduce quantities

    return inputObject.orderId;
    },

    'getDasbordValues': function(){
  var yearDateStart = new Date(moment().startOf('year'));
  var monthDateStart = new Date(moment().startOf('month'));
  var monthDateToEnd = new Date();
  var Orderbymon =  Orders.find({'createdAt':{$gte : monthDateStart, $lt : monthDateToEnd }}).count();
  var Orderbyyear = Orders.find({'createdAt':{$gte : yearDateStart, $lt : monthDateToEnd }}).count();

  var Totalbymon =  Orders.find({'createdAt':{$gte : monthDateStart, $lt : monthDateToEnd }}).fetch();
  var Totalbyyear = Orders.find({'createdAt':{$gte : yearDateStart, $lt : monthDateToEnd }}).fetch();

  var countMon =0;
  if(Totalbymon&&Totalbymon.length>0){
    for(i=0;i<Totalbymon.length;i++)
    {
      countMon = countMon+Totalbymon[i].totalAmount;
      //console.log("countMon",countMon);
    }
  }

  var countyear =0;
  if(Totalbyyear&&Totalbyyear.length>0){
    for(i=0;i<Totalbyyear.length;i++)
    {
      countyear = countyear+Totalbyyear[i].totalAmount;
      //console.log("countyear",countyear);
    }
  }

    var data = {
      'Orderbymon'  :Orderbymon ,
      'Orderbyyear' :Orderbyyear,
      'countMon'    :countMon ,
      'countyear'   :countyear ,

    }
    return data;
    }



    });
}