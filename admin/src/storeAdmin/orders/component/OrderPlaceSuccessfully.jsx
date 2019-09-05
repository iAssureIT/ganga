import React, {Component}       from 'react';
import Moment                   from 'react-moment';
import {render}                 from 'react-dom';
import { withTracker }          from 'meteor/react-meteor-data';
import { Cart }                 from '/imports/StoreManagement/reports/api/ReportMaster.js';
import { FlowRouter }           from 'meteor/ostrio:flow-router-extra';
import { CompanySettings }      from '/imports/admin/companySetting/CompanyInformation_setting/CompanySettingMaster.js';
import { Orders }               from '/imports/StoreManagement/orders/api/orderMaster.js';
import TrackerReact             from 'meteor/ultimatejs:tracker-react';

class OrderPlaceSuccessfully extends TrackerReact(Component) {
    constructor(props){
        super(props);
        this.state ={
          "ordersproducts"  :[],
          "ordertotal"      : '',
          "status"          : '',
          "deliveryaddress" :{},
          "vatPercent:"     :'',
          "shippingCharges" :0,
          "paymentmode"     : '',
          "displayDate"     : '',
          "companyName"     : '',
          "dispatchDetails" : {},
          "orderStatus"     : "",
        }
      }
      componentWillMount() {    
          if(!$("link[href='/css/style.css']").length > 0)
              {      
                  var styleCss = document.createElement("link");      
                  styleCss.type="text/css";      
                  styleCss.rel ="stylesheet";      
                  styleCss.href="/css/style.css";      
                  //document.head.append(styleCss);    
              }  
          }  
      componentWillUnmount() {    
          $("link[href='/css/style.css']").remove();  
      }
      componentDidMount(){
        $("html,body").scrollTop(0);
           $.getScript('/js/index.js',function(){});
           
    
        // this.orderproduct = Tracker.autorun(()=>{
        //     // console.log("orderproduct",orderproduct);
        //     var handle = Meteor.subscribe('OrdersData');
        //     var handleCurrentUser = Meteor.subscribe("currentUserfunction");
        //     var handleCompanyData = Meteor.subscribe("companyData");
        //     var handleadmin = Meteor.subscribe("adminData");
        //     var companyData = CompanySettings.findOne({});
        //     console.log('companyData',companyData);
        //     var orderId = this.props.orderId;
        //     var date = new Date();
    
        //     if(handle.ready()){
        //         var Ordersproduct =  Orders.findOne({'_id':orderId});
        //         console.log("Ordersproduct: ",Ordersproduct);
        //         var orderDate = Ordersproduct.createdAt;
        //         var displayDate= moment(orderDate).format('ll'); 
        //         if(companyData){
                    
        //             if(Ordersproduct){
        //                 if(Ordersproduct.products.length>0){
        //                     this.setState({
        //                         "shippingCharges":100,
        //                     });
        //                 } else{
        //                     this.setState({
        //                         "shippingCharges":0,
        //                     });
        //                 }
        //                 if(Ordersproduct.DeliveryStatus.length>0){
        //                     for(var i=0;i<Ordersproduct.DeliveryStatus.length;i++){
        //                         if(Ordersproduct.DeliveryStatus[i].status == "Dispatch"){
        //                             var orderstatus ={
        //                                 'dispatchcompanyname'   : Ordersproduct.DeliveryStatus[i].DispatchCompanyName,
        //                                 'deliverypersonname'    : Ordersproduct.DeliveryStatus[i].DeliveryPersonName,  
        //                                 'deliverypersoncontact' : Ordersproduct.DeliveryStatus[i].DeliveryPersonContact
        //                             }
        //                             this.setState({
        //                                 'dispatchDetails': orderstatus,
        //                             }); 
                                  
        //                             break;
        //                         }else{
        //                             var orderstatus ={
        //                                 'dispatchcompanyname'   : "",
        //                                 'deliverypersonname'    : "",  
        //                                 'deliverypersoncontact' : ""
        //                             }
                                    
        //                             this.setState({
        //                                 'dispatchDetails': "",
        //                             }); 
                                   
        //                         }
        //                     }
        //                 }else{
        //                     var orderstatus ={
        //                         'dispatchcompanyname'   : "",
        //                         'deliverypersonname'    : "",  
        //                         'deliverypersoncontact' : ""
        //                     }
                            
        //                     this.setState({
        //                         'dispatchDetails': "",
        //                     }); 
                            
        //                 }
                        
        //                 this.setState({
        //                     'ordersproducts'  : Ordersproduct.products,
        //                     'ordertotal'      : Ordersproduct.cartTotal,
        //                     'status'          : Ordersproduct.status,
        //                     'paymentmode'     : Ordersproduct.paymentMethod,
        //                     "vatPercent"      : companyData.taxSettings[0].applicableTax,
        //                     'deliveryaddress' : Ordersproduct.deliveryAdd,
        //                     'displayDate'     : displayDate,
        //                     'companyName'     : companyData.companyName,
        //                     'companyLogo'     : companyData.companyLogo,
        //                     'currency'        : Ordersproduct.currency,
                            
        //                 });
        //             } else{
        //                 this.setState({
        //                     "shippingCharges":0,
        //                 });
        //             }
        //         }
        //         if(Ordersproduct.DeliveryStatus){
        //             if(Ordersproduct.DeliveryStatus.length > 0){
        //                 var StateLen = Ordersproduct.DeliveryStatus;
        //                 var currentStatus = "";
        //                 for(k=0;k<StateLen.length;k++){
        //                     if(StateLen[k].status == "New Order"){
        //                         currentStatus = "New Order";
        //                     } else if(StateLen[k].status == "Verified"){
        //                         currentStatus = "Order Verified";
        //                     } else if(StateLen[k].status == "Packed"){
        //                         currentStatus = "Packed";
        //                     } else if(StateLen[k].status == "Inspection"){
        //                         currentStatus = "Packed";
        //                     } else if(StateLen[k].status == "Order Verified"){
        //                         currentStatus = "Packed";
        //                     } else if(StateLen[k].status == "Dispatch"){
        //                         currentStatus = "Dispatch";
        //                     } else if(StateLen[k].status == "Delivered"){
        //                         currentStatus = "Delivered";
        //                     } else {
        //                         currentStatus = "None";
        //                     }
                           

        //                 }
        //                 this.setState({
        //                     "orderStatus":currentStatus,
        //                 });
        //             }
        //         }
    
        //     }
        // })
    
      }
      componentWillReceiveProps(nextProps){
        if(nextProps && !nextProps.loading){
            var orderDate = nextProps.Ordersproduct.createdAt;
            var displayDate= moment(orderDate).format('ll');
            if(nextProps.companyData){
                    
                    if(nextProps.Ordersproduct){
                        if(nextProps.Ordersproduct.products.length>0){
                            this.setState({
                                "shippingCharges":100,
                            });
                        } else{
                            this.setState({
                                "shippingCharges":0,
                            });
                        }
                        if(nextProps.Ordersproduct.DeliveryStatus.length>0){
                            for(var i=0;i<nextProps.Ordersproduct.DeliveryStatus.length;i++){
                                if(nextProps.Ordersproduct.DeliveryStatus[i].status == "Dispatch"){
                                    var orderstatus ={
                                        'dispatchcompanyname'   : nextProps.Ordersproduct.DeliveryStatus[i].DispatchCompanyName,
                                        'deliverypersonname'    : nextProps.Ordersproduct.DeliveryStatus[i].DeliveryPersonName,  
                                        'deliverypersoncontact' : nextProps.Ordersproduct.DeliveryStatus[i].DeliveryPersonContact
                                    }
                                    this.setState({
                                        'dispatchDetails': orderstatus,
                                    }); 
                                  
                                    break;
                                }else{
                                    var orderstatus ={
                                        'dispatchcompanyname'   : "",
                                        'deliverypersonname'    : "",  
                                        'deliverypersoncontact' : ""
                                    }
                                    
                                    this.setState({
                                        'dispatchDetails': "",
                                    }); 
                                   
                                }
                            }
                        }else{
                            var orderstatus ={
                                'dispatchcompanyname'   : "",
                                'deliverypersonname'    : "",  
                                'deliverypersoncontact' : ""
                            }
                            
                            this.setState({
                                'dispatchDetails': "",
                            }); 
                            
                        }
                        
                        this.setState({
                            'ordersproducts'  : nextProps.Ordersproduct.products,
                            'ordertotal'      : nextProps.Ordersproduct.cartTotal,
                            'status'          : nextProps.Ordersproduct.status,
                            'paymentmode'     : nextProps.Ordersproduct.paymentMethod,
                            "vatPercent"      : nextProps.companyData.taxSettings[0].applicableTax,
                            'deliveryaddress' : nextProps.Ordersproduct.deliveryAdd,
                            'displayDate'     : displayDate,
                            'companyName'     : nextProps.companyData.companyName,
                            'companyLogo'     : nextProps.companyData.companyLogo,
                            'currency'        : nextProps.Ordersproduct.currency,
                            
                        });
                    } else{
                        this.setState({
                            "shippingCharges":0,
                        });
                    }
                }
                if(nextProps.Ordersproduct.DeliveryStatus){
                    if(nextProps.Ordersproduct.DeliveryStatus.length > 0){
                        var StateLen = nextProps.Ordersproduct.DeliveryStatus;
                        var currentStatus = "";
                        for(k=0;k<StateLen.length;k++){
                            if(StateLen[k].status == "New Order"){
                                currentStatus = "New Order";
                            } else if(StateLen[k].status == "Verified"){
                                currentStatus = "Order Verified";
                            } else if(StateLen[k].status == "Packed"){
                                currentStatus = "Packed";
                            } else if(StateLen[k].status == "Inspection"){
                                currentStatus = "Inspection";
                            } else if(StateLen[k].status == "Order Verified"){
                                currentStatus = "Order Verified";
                            } else if(StateLen[k].status == "Dispatch"){
                                currentStatus = "Dispatch";
                            } else if(StateLen[k].status == "Delivered"){
                                currentStatus = "Delivered";
                            } else if(StateLen[k].status == "Delivered & Paid"){
                                currentStatus = "Delivered & Paid";
                            }else {
                                currentStatus = "None";
                            }
                           

                        }
                        this.setState({
                            "orderStatus":currentStatus,
                        });
                    }
                }
        }
      }
      printinvoice(event){
        window.print();
      }

      downloadInvoicePDF(event){
        var PDFDocument = require ('jspdf');
        var docJSPDF = new PDFDocument();
        // var pdfData = $('#uniquePDFPrint').html();
        
        var pdfData  = `<div style="color:red">Hiiii</div>`;
        // var pdfData = "<!-- react-text: 212 -->100<!-- /react-text -->";
        // console.log("pdfData: ",pdfData);

        // docJSPDF.fromHTML($('#uniquePDFPrint').html(), 15, 15);
        docJSPDF.fromHTML((pdfData), 15, 15, {
            'width': 170,
            'elementHandlers': {
                '#editorPDFFunc': function (element, renderer) {
                    return true;
                }
            },
        });
        // console.log("pdfdocument"+pdfdocument);
        docJSPDF.save('sample-file.pdf');
        
      }
    


  render(){
    if(this.state.dispatchDetails){
        var classes='col-lg-4 col-md-4 col-sm-12 col-xs-12';
    }else{
        var classes="col-lg-6 col-md-6 col-sm-12 col-xs-12";
    }
      return(
            <div>
                <div className="garmentsuccess-warapper marginTopOne col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 uniquePDFPrint">
                    <div className="col-lg-12 ">
                        <h2 className="col-lg-10 col-lg-offset-1 Address-Detail">
                           {/* Your Order Has been placed successfully.*/}
                        </h2>
                        <div className = "col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 invoiveWrap">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 billing-details">
                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 invoicelogo">
                                    <img className="col-lg-7 col-md-3 col-sm-3 col-xs-3"src={this.state.companyLogo}/>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                   <h2 className="invoiceHead">{this.state.companyName}</h2>
                                </div>
                                <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2 pull-right downloadoption">
    
                                    {
                                    /* <i className="fa fa-file-pdf-o" aria-hidden="true"  onClick={this.downloadInvoicePDF.bind(this)} ></i> */}
                                    {/*<i className="fa fa-print" aria-hidden="true" onClick={this.printinvoice.bind(this)}></i>*/}
                                </div>
                                <div className="col-lg-6  col-md-8 col-sm-8 col-xs-8">
                                <h3 className="textCenter invoiceHead">Invoice Details</h3>
                                </div>
                               
                            </div>
                            <div className="col-lg-12">
                                
                                <div className={classes}>

                                    <div className="">
                                        <h3 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 AddressHeader">shipping address</h3>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 AddressDetail">
                                        <h5>{this.state.deliveryaddress.name}</h5>
                                        <p>{this.state.deliveryaddress.houseNo}, <br /> {this.state.deliveryaddress.street} ,{this.state.deliveryaddress.landmark} - {this.state.deliveryaddress.city},{this.state.deliveryaddress.pin} <br /> Mobile :{this.state.deliveryaddress.mob}.</p>
                                    </div>  
                                </div>

                                {/* {this.state.dispatchDetails  + "hi"} */}

                                <div className={classes}>
                                    <div className="">
                                        <h3 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 AddressHeader">Payment Details</h3>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 AddressDetail">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
                                            <span className="col-lg-5 col-md-5 col-sm-5 col-xs-5 noLRPad margintop">Payment Mode</span>
                                            <span className="col-lg-7 col-md-7 col-sm-7 col-xs-7 noLRpad paymentDetails">
                                                <span className="pull-left"> :</span>
                                                &nbsp; {this.state.paymentmode}

                                            </span>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
                                            <span className="col-lg-5 col-md-5 col-sm-5 col-xs-5 noLRPad margintop">Payment Status</span>
                                            <span className="col-lg-7 col-md-7 col-sm-7 col-xs-7 noLRpad paymentDetails">
                                                <span className="pull-left"> :</span>
                                                &nbsp; {this.state.status}

                                            </span>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
                                            <span className="col-lg-5 col-md-5 col-sm-5 col-xs-5 noLRPad margintop">Date</span>
                                            <span className="col-lg-7 col-md-7 col-sm-7 col-xs-7 noLRpad paymentDetails">
                                                <span className="pull-left"> :</span>
                                                &nbsp; {this.state.displayDate}
                                                {/* <Moment format="YYYY/MM/DD">
                                                new Date()
                                                </Moment> */}

                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                    </div>  
                                </div>

                                {  (this.state.dispatchDetails.dispatchcompanyname != "" && this.state.dispatchDetails.dispatchcompanyname) 
                                    ?
                                
                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        <div className="">
                                            <h3 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 AddressHeader">Dispatch Details</h3>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 AddressDetail">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
                                                <span className="col-lg-5 col-md-5 col-sm-5 col-xs-5 noLRPad margintop">Company Name</span>
                                                <span className="col-lg-7 col-md-7 col-sm-7 col-xs-7 noLRpad paymentDetails">
                                                    <span className="pull-left"> :</span>
                                                    &nbsp; {this.state.dispatchDetails.dispatchcompanyname}

                                                </span>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
                                                <span className="col-lg-5 col-md-5 col-sm-5 col-xs-5 noLRPad margintop">Delivery Person</span>
                                                <span className="col-lg-7 col-md-7 col-sm-7 col-xs-7 noLRpad paymentDetails">
                                                    <span className="pull-left"> :</span>
                                                    &nbsp;{this.state.dispatchDetails.deliverypersonname}

                                                </span>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
                                                <span className="col-lg-5 col-md-5 col-sm-5 col-xs-5 noLRPad margintop">Delivery Person Contact</span>
                                                <span className="col-lg-7 col-md-7 col-sm-7 col-xs-7 noLRpad paymentDetails">
                                                    <span className="pull-left"> :</span>
                                                    &nbsp;{this.state.dispatchDetails.deliverypersoncontact}
                                                    {/* <Moment format="YYYY/MM/DD">
                                                    new Date()
                                                    </Moment> */}

                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                        </div>  
                                    </div>
                                    : ""
                                    
                                    
                                }
                                
                                
                            </div>

                            <div className="col-lg-12">
                                <div className="orderStatusCl">
                                    <div className="orderStatusCl1">
                                            Order Status: 
                                    </div>
                                    <div className="orderStatusCl2">
                                        {
                                            this.state.orderStatus
                                        }
                                    </div>
                                </div>
                            </div>
                            
                                                  
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ProductBorder" id="uniquePDFPrint">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
                            <div className="">
                                <h3 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ProductHead">Product</h3>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tableHead">
                                <table className="table .table-hover .table-responsive tablesText">
                                    <thead>
                                        <tr>
                                            <th className="ProductNo">Item</th>
                                            <th className="ProductName">ProductName</th>
                                            <th className="ProductImg">Product</th>
                                            <th className="ProductPrice">Price</th>
                                            <th className="ProductQty">Qty</th>
                                            <th className="ProductSub">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                     {  this.state.ordersproducts.map((data, index)=>{
                                        
                                         return( 
                                            <tr key={index}>
                                                <td className="ProductTxtdata">{index+1}</td>
                                                <td className="ProductTxtdata">{data.productName}</td>
                                                <td className="ProductImageHead"><img className="ProductImage img-thumbnail productImgHeight" src= {data.productImage}/></td>
                                                <td className="ProductTxt textAlignRight">{(parseInt(data.price)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                <td className="ProductTxt">{data.quantity}</td>
                                                <td className="ProductTxt">{(parseInt(data.total)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            </tr>
                                        )
                                    
                                        })
                                    }
                                    
                                    </tbody>
                                </table>
                            <div className="totalAmount totalAmountWrapper pull-right col-lg-4 col-md-12 col-sm-12 col-xs-12 grandTotalCalc">
                        
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 garmentextraTaxation">
                                <span className="col-lg-8 col-md-8 col-sm-8 col-xs-8 garmentcartvaluesTitles noLRPad">Sub Total</span><span className="summation col-lg-4 col-md-4 col-sm-4 col-xs-4 textAlignRight" id="totalAmount"><span className={"fa fa-"+this.state.currency}></span>&nbsp;{(parseInt(this.state.ordertotal)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> 
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 garmentextraTaxation">
                                <span className="col-lg-8 col-md-8 col-sm-8 col-xs-8 garmentcartvaluesTitles noLRPad">Shipping Charges</span><span className="summation col-lg-4 col-md-4 col-sm-4 col-xs-4 textAlignRight" id="totalAmount"> <span className={"fa fa-"+this.state.currency}></span>&nbsp;{(parseInt(this.state.shippingCharges)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> 
                            </div>
                            
                            <br/>
                        
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 garmentextraTaxation">
                                <span className="col-lg-8 col-md-8 col-sm-8 col-xs-8 garmentcartvaluesTitles  noLRPad"><span className="taxclass">GST</span>&nbsp;({this.state.vatPercent}%)</span> <span className="col-lg-4 col-md-4 col-sm-4 col-xs-4 taxWrapper textAlignRight"><span className={"fa fa-"+this.state.currency}></span>&nbsp;{((parseInt(this.state.vatPercent))/100*(parseInt(this.state.ordertotal))).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span><br/>
                            </div>
                        
                            <br/>
                        
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grandTotalWrapper">
                                <span className="col-lg-6 col-md-6 col-sm-6 col-xs-6 grandTotal  noLRPad">Total</span>
                                <span className="grandTotal col-lg-6 col-md-6 col-sm-6 col-xs-6  taxWrapper textAlignRight">
                                <span className={"fa fa-"+this.state.currency}></span>
                                &nbsp;{((parseInt(this.state.vatPercent))/100*(parseInt(this.state.ordertotal))+(parseInt(this.state.ordertotal))+this.state.shippingCharges).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
                                </span>
                            </div>
                            <br/>           

                        </div>
                        </div>
                        </div>
                    </div>
                    
                </div>
                    </div>
                    
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="editorPDFFunc">
                </div>
                <div className="orderplacefooter">
                   
                </div>
                
                </div>
                <h2 className="col-lg-8 col-lg-offset-2 Address-Detail"></h2>
            </div>

      );
  }
}
export default  OrderPlaceSuccessfully = withTracker(props =>{
    var orderId = props.orderId; 
    const handle = Meteor.subscribe('OrdersData');
    const Ordersproduct =  Orders.findOne({'_id':orderId}); 
    const loading = !handle.ready();
    const handleadmin = Meteor.subscribe("adminData");
    const handleCurrentUser = Meteor.subscribe("currentUserfunction");

    const handleCompanyData = Meteor.subscribe("companyData");
    const companyData = CompanySettings.findOne({});
    const loading1 = !handleCompanyData.ready();
    return{
        loading,
        Ordersproduct,
        loading1,
        companyData
    };
})(OrderPlaceSuccessfully)