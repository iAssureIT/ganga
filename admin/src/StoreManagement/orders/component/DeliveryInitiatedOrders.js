import React,{Component} from 'react';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch,Link,location } from 'react-router-dom';
import axios                  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from "jquery";
import AdminOrdersList from './AdminOrdersList.js';


export default class DeliveryInitiatedOrders extends Component{
  
  constructor(props) {
   super(props);
    this.state = {
      "data" : [] 
    }
    this.getOrders = this.getOrders.bind(this);
  }
   
  componentDidMount(){
    this.getOrders();
  }    
  getOrders(){
      axios.get("/api/orders/get/orderlist/Delivery Initiated")
            .then((response)=>{
              var UsersArray = [];
                for (let i = 0; i < response.data.length; i++) {
                  var _id = response.data[i]._id;
                  var orderID = response.data[i].orderID;
                  var userFullName = response.data[i].userFullName;
                  var totalQuantity = response.data[i].totalQuantity;
                  var currency = response.data[i].currency;
                  var totalAmount = response.data[i].totalAmount;
                  var createdAt = response.data[i].createdAt;
                  var status = response.data[i].status;
                  var deliveryStatus = response.data[i].deliveryStatus[0].status == "Dispatch" ? 'Out for Delivery' : response.data[i].deliveryStatus[0].status;
                  var viewOrder =  "/viewOrder/"+response.data[i]._id;
                  var deliveryStatus =  response.data[i].deliveryStatus[0].status;

                  var UserArray = [];
                  UserArray.push(orderID);
                  UserArray.push(userFullName);
                  UserArray.push(totalQuantity);
                  UserArray.push(<i className={"fa fa-"+currency}>&nbsp;{(parseInt(totalAmount)).toFixed(2)}</i>);
                   
                  UserArray.push(createdAt);
                  UserArray.push({status : status, deliveryStatus : deliveryStatus});
                  UserArray.push({_id:_id, viewOrder:viewOrder, deliveryStatus:deliveryStatus});
                  
                  UsersArray.push(UserArray);
                }

                this.setState({
                  data: UsersArray
                });

                this.setState({
                  orderData: response.data
                });

            })
            .catch((error)=>{
                console.log('error', error);
            })
    }

  render(){
    return(
      <div>
      <AdminOrdersList data={this.state.data} getOrdersFun={this.getOrders}/>
      </div>
      );
    
  }
}
