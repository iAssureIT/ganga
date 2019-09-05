import React, {Component}    		from 'react';
import $ 					 from 'jquery';
import _ 					 from 'underscore';
import swal 				 from 'sweetalert';
import axios 				 from 'axios';
import moment from 'moment';
import "./OrderPlaceSuccessfully.css";

class OrderPlaceSuccessfully extends Component {
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

    }
    componentDidMount(){
        $("html,body").scrollTop(0);
        $.getScript('/js/index.js',function(){});

        this.getCompanySetting();
        
        var orderID = this.props.match.params.order_ID;
        console.log('orderID', orderID)
        this.getOrderDetails(orderID);        
    }
    getOrderDetails(orderID){
        axios.get('/api/orders/get/one/'+orderID)
        .then((response)=>{
            var Ordersproduct =  response.data;
            axios.get('/api/companysettings/list')
            .then((res)=>{
                var companyData = res.data[0];
                console.log('companyData', companyData);
                
                console.log("Ordersproduct: ",Ordersproduct);
                var orderDate = Ordersproduct.createdAt;
                var date = new Date();
                var displayDate= moment(orderDate).format('ll'); 
                    if(companyData){
                    
                        if(Ordersproduct){
                            if(Ordersproduct.products.length>0){
                                this.setState({
                                    "shippingCharges":100,
                                });
                            } else{
                                this.setState({
                                    "shippingCharges":0,
                                });
                            }
                            if(Ordersproduct.deliveryStatus.length>0){
                                for(var i=0;i<Ordersproduct.deliveryStatus.length;i++){
                                    if(Ordersproduct.deliveryStatus[i].status == "Dispatch"){
                                        var orderstatus ={
                                            'dispatchcompanyname'   : Ordersproduct.DeliveryStatus[i].DispatchCompanyName,
                                            'deliverypersonname'    : Ordersproduct.DeliveryStatus[i].DeliveryPersonName,  
                                            'deliverypersoncontact' : Ordersproduct.DeliveryStatus[i].DeliveryPersonContact
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
                                'ordersproducts'  : Ordersproduct.products,
                                'ordertotal'      : Ordersproduct.cartTotal,
                                'status'          : Ordersproduct.status,
                                'paymentmode'     : Ordersproduct.paymentMethod,
                                "vatPercent"      : companyData.taxSettings[0].taxRating,
                                'deliveryaddress' : Ordersproduct.deliveryAddress,
                                'displayDate'     : displayDate,
                                'companyName'     : companyData.companyName,
                                'companyLogo'     : companyData.companyLogo,
                                'currency'        : Ordersproduct.currency,
                                
                            });
                        } else{
                            this.setState({
                                "shippingCharges":0,
                            });
                        }
                }
                if(Ordersproduct.deliveryStatus){
                    if(Ordersproduct.deliveryStatus.length > 0){
                        var StateLen = Ordersproduct.deliveryStatus;
                        var currentStatus = "";
                        for(var k=0;k<StateLen.length;k++){
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
                            } else {
                                currentStatus = "None";
                            }
                            

                        }
                        this.setState({
                            "orderStatus":currentStatus,
                        });
                    }
                }
                })
            })
            .catch((error)=>{
                console.log('error', error);
            })
        
        .catch((error)=>{

        })
    }
    getCompanySetting(){
		axios.get('/api/companysettings/list')
		.then((response)=>{
			this.setState({
				"companyData"      : response.data[0],
			},()=>{
				
			})
		})
		.catch((error)=>{
			console.log('error', error);
		})
	}
    printinvoice(event){
        window.print();
    }


    


  render(){
    if(this.state.dispatchDetails){
        var classes='col-lg-4 col-md-4 col-sm-12 col-xs-12';
    }else{
        var classes="col-lg-6 col-md-6 col-sm-12 col-xs-12";
    }
      return(
            <div>
                <div className="garmentsuccess-warapper marginTopOrder col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 uniquePDFPrint">
                    <div className="col-lg-12 ">
                        <h2 className="col-lg-8 col-lg-offset-2 Address-Detail">Your order has been placed successfully.</h2>
                        <div className = "col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 invoiveWrap">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 billing-details">
                                <div className="col-lg-12 col-md-3 col-sm-3 col-xs-3 invoicelogo">
                                    <div className="row"><img className="col-lg-4 col-lg-offset-4 col-md-3 col-sm-3 col-xs-3"src={'/images/im1.png'}/></div>
                                    
                                </div>
                                <div className="col-lg-12 col-md-6 col-sm-6 col-xs-6">
                                    </div>
                                <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2 pull-right downloadoption">
    
                                    {
                                    /* <i className="fa fa-file-pdf-o" aria-hidden="true"  onClick={this.downloadInvoicePDF.bind(this)} ></i> */}
                                    {/*<i className="fa fa-print" aria-hidden="true" onClick={this.printinvoice.bind(this)}></i>*/}
                                </div>
                                <div className="col-lg-12  col-md-12 col-sm-8 col-xs-8">
                                <h3 className="textCenter">Invoice Details</h3>
                                </div>
                               
                            </div>
                            <div className="col-lg-12">
                                
                                <div className={classes}>
                                    <div className="">
                                        <h3 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 AddressHeader">shipping address</h3>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 AddressDetail">
                                            <h5 className="wraplineadd">{this.state.deliveryaddress.name}</h5>
                                            <p className="wraplineadd">{this.state.deliveryaddress ?<span>{this.state.deliveryaddress.addressLine1} <br /> {this.state.deliveryaddress.addressLine2} {this.state.deliveryaddress.block}, {this.state.deliveryaddress.city},{this.state.deliveryaddress.pincode} <br /> Mobile : {this.state.deliveryaddress.mobileNumber} .</span> : ""}</p>
                                        </div>  
                                    </div>  
                                </div>

                                {/* {this.state.dispatchDetails  + "hi"} */}

                                <div className={classes}>
                                    <div className="">
                                        <h3 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 AddressHeader">Payment Details</h3>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                                                    &nbsp; {this.state.status.charAt(0)+this.state.status.slice(1).toLowerCase()}

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
                                <h3 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ProductHead">Products</h3>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tableHead">
                                <table className="table .table-hover .table-responsive tablesText">
                                    <thead>
                                        <tr>
                                            <th className="ProductNo">Items</th>
                                            <th className="ProductName">Product Name</th>
                                            <th className="ProductImg">Product</th>
                                            <th className="offeredPrice">Price</th>
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
                                                <td className="ProductImageHead"><img className="ProductImage img-thumbnail" src= {data && data.productImage ? data.productImage[0] : ""}/></td>
                                                <td className="ProductTxtdata">{(parseInt(data.price)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                <td className="ProductTxtdata">{data.quantity}</td>
                                                <td className="ProductTxtdata">{(parseInt(data.total)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            </tr>
                                        )
                                    
                                        })
                                    }
                                    
                                    </tbody>
                                </table>
                            <div className="totalAmount totalAmountWrapper pull-right col-lg-4 col-md-12 col-sm-12 col-xs-12 grandTotalCalc">
                        
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 garmentextraTaxation">
                                <span className="col-lg-6 col-md-6 col-sm-6 col-xs-6 garmentcartvaluesTitles noLRPad">Sub Total</span>
                                <span className="summation col-lg-6 col-md-6 col-sm-6 col-xs-6 cartrightpull pull-right noLRPad" id="totalAmount">
                                <span className={" fa fa-"+this.state.currency}></span>&nbsp;{(parseInt(this.state.ordertotal)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </span> 
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 garmentextraTaxation">
                                <span className="col-lg-6 col-md-6 col-sm-6 col-xs-6 garmentcartvaluesTitles noLRPad">Shipping Charges</span>
                                <span className="summation col-lg-6 col-md-6 col-sm-6 col-xs-6 cartrightpull pull-right noLRPad" id="totalAmount"> 
                                <span className={" fa fa-"+this.state.currency}></span>&nbsp;{(parseInt(this.state.shippingCharges)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </span> 
                            </div>
                            
                            <br/>
                        
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 garmentextraTaxation">
                                <span className="col-lg-6 col-md-6 col-sm-6 col-xs-6 garmentcartvaluesTitles  noLRPad"><span className="taxclass">GST</span>&nbsp;({this.state.vatPercent}%)</span> 
                                <span className="col-lg-6 col-md-6 col-sm-6 col-xs-6 cartrightpull pull-right taxWrapper noLRPad">
                                <span className={" fa fa-"+this.state.currency}></span>&nbsp;{((parseInt(this.state.vatPercent))/100*(parseInt(this.state.ordertotal))).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </span><br/>
                            </div>
                        
                            <br/>
                        
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grandTotalWrapper">
                                <span className="col-lg-6 col-md-6 col-sm-6 col-xs-6 grandTotal  noLRPad">Grandtotal</span>
                                <span className="grandTotal cartrightpull col-lg-6 col-md-6 col-sm-6 col-xs-6 pull-right taxWrapper noLRPad">
                                <span className={" fa fa-"+this.state.currency}></span>
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
            </div>

      );
  }
}

export default OrderPlaceSuccessfully;