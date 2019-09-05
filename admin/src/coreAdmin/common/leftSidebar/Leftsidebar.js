import React,{Component} from 'react';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch,Link,location } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from "jquery";

// import Header from '../header/Header.js'
import './Leftsidebar.css';

export default class Leftsidebar extends Component{
  
  constructor(props) {
   super(props);
    this.state = {}
  }
   
  componentDidMount(){
     /*$(document).ready(function () {
     $('#sidebarCollapse').on('click', function () {
         $('#sidebar').toggleClass('active');
     });
  });*/
  }    

  render(){
    return(
      <div>
        <aside className="leftsidebar">
          <div className="wrapper">
            <nav id="sidebar">
              <div className="sidebar-header">
                <h4 className="text-center"><b><img className="slidlogo1" src="/images/im1.png"/></b></h4>
                <strong><img className="slidlogo" src="images/Logo.png"/></strong>
              </div>
              <ul className="list-unstyled components">
                <li className="active sidebarMenuText">
                  <a href="/dashboard">
                    <i className="fa fa-dashboard"></i>
                    Dashboard
                  </a>
                </li>
                
                <li className="sidebarMenuText">
                  <a href="#Plan" data-toggle="collapse" aria-expanded="false">
                    <i className="fa fa-pie-chart" />
                    Product Management
                  </a>
                  <ul className="collapse list-unstyled" id="Plan">
                      <li>
                        <a href="/add-product">
                          <i className="fa fa-circle-o" /> <span className="sidebarMenuSubText">Add Products</span>
                        </a>
                      </li>
                      <li>
                        <a href="/product-upload">
                          <i className="fa fa-circle-o" /> <span className="sidebarMenuSubText">Product Bulk Upload</span>
                        </a>
                      </li>  
                      <li>
                        <a href="/product-list">
                          <i className="fa fa-circle-o" /> <span className="sidebarMenuSubText">Product List</span>
                        </a>
                      </li>  
                      <li>
                        <a href="/file-wise-product-list">
                          <i className="fa fa-circle-o" /> <span className="sidebarMenuSubText">File Wise Product List</span>
                        </a>
                      </li>   
                      <li>
                        <a href="/product-image-bulk-upload">
                          <i className="fa fa-circle-o" /> <span className="sidebarMenuSubText">Image Bulk Upload</span>
                        </a>
                      </li>   
                      <li>
                        <a href="/category-management">
                          <i className="fa fa-circle-o" /> <span className="sidebarMenuSubText">Category Management</span>
                        </a>
                      </li>   
                  </ul>
                </li>
                <li className="sidebarMenuText">
                  <a href="#Shipment" data-toggle="collapse" aria-expanded="false">
                    <i className="fa fa-map-marker" />
                    Shipment Tracking
                  </a>
                  <ul className="collapse list-unstyled" id="Shipment">
                    <li>
                      <a href="/orders-list">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Shipment Tracking</span>
                      </a>
                    </li>
                  </ul>
                </li> 
                <li className="sidebarMenuText">
                  <a href="#baData" data-toggle="collapse" aria-expanded="false">
                    <i className="glyphicon glyphicon-briefcase" />
                    Business Associates
                  </a>
                  <ul className="collapse list-unstyled" id="baData">
                    <li>
                      <a href="/addNewBA">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Add Business Associate</span>
                      </a>
                    </li>
                    <li>
                      <a href="/ba-list">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Business Associates List</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="sidebarMenuText">
                  <a href="#vendor" data-toggle="collapse" aria-expanded="false">
                    <i className="fa fa-industry" />
                    Vendor Management
                  </a>
                  <ul className="collapse list-unstyled" id="vendor">
                    <li>
                      <a href="/vendor-onboarding">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Add Vendor</span>
                      </a>
                    </li>
                    <li>
                      <a href="/vendor-list">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Vendor List</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="sidebarMenuText">
                  <a href="/">
                    <i className="fa fa-percent"></i>
                    Discount Management
                  </a>
                </li>
                <li className="sidebarMenuText">
                  <a href="/">
                    <i className="fa fa-star"></i>
                    Product Rating System
                  </a>
                </li>
                <li className="sidebarMenuText">
                  <a href="/">
                    <i className="fa fa-copyright"></i>
                    Content Management
                  </a>
                </li>
                <li className="sidebarMenuText">
                  <a href="/">
                    <i className="fa fa-file"></i>
                    Agreement Management
                  </a>
                </li>
                
                <li className="sidebarMenuText">
                  <a href="#Report" data-toggle="collapse" aria-expanded="false">
                    <i className="fa fa-line-chart" />
                    Reports
                  </a>
                  <ul className="collapse list-unstyled" id="Report">
                    <li>
                      <a href="/report">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Sales Report</span>
                      </a>
                    </li>
                    <li>
                      <a href="/report">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Category Wise Sales Report</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="sidebarMenuText">
                  <a href="#MasterData" data-toggle="collapse" aria-expanded="false">
                    <i className="fa fa-university" />
                    Master Data
                  </a>
                  <ul className="collapse list-unstyled" id="MasterData">
                    <li>
                      <a href="/vendor-category">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Vendor Category</span>
                      </a>
                    </li>
                    <li>
                      <a href="/vendor-location-type">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Vendor Location Type</span>
                      </a>
                    </li>
                  </ul>
                </li>          
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    );
  }
}
