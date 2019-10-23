import React,{Component} from 'react';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Chart from 'chart.js';

import StatusComponent from './StatusComponent/StatusComponent.js'
import ChartComponent  from './chart/Chart.js'
import UpdateComponent from './UpdateComponent/UpdateComponent.js'
import TableComponent  from './TableComponent/TableComponent.js'
import Productlist     from './productlist/Productlist.js'
import Visitorreport   from './Visitorreport/Visitorreport.js'
import Infocomponent   from './Infocomponent/Infocomponent.js'
import './chart/Chart.css';

// import {StudentMaster} from '/imports/admin/forms/student/api/studentMaster.js';
// import { FranchiseDetails }  from '/imports/admin/companySetting/api/CompanySettingMaster.js';
// import { FlowRouter }   from 'meteor/ostrio:flow-router-extra';

export default class Dashboard extends Component{
  
  constructor(props) {
   super(props);
    this.state = {}
  }
   
  componentDidMount(){
    var ctx3 = document.getElementById('myBarChart');
    var data3 = {
      datasets: [
                {
                  label: 'Total Orders',
                  data: [20, 40, 30, 10]
                }
                ],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
          'Grocery',
          'Clothes',
          'Accessories',
          'Furniture'
      ]
    };

    var myBarChart = new Chart(ctx3, {
        type: 'bar',
        data: data3,  
    });
  }
    
  render(){
    return(
      <div className="col-lg-12">
        <div className="row">
        <br/>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="col-lg-3 box3">     
            <div className="col-lg-12 box3a">
              <div className="row">
                  <div className="col-lg-4 box3aicon">
                    <i className={"fa fa-user"}></i>
                  </div>
                  <div className="col-lg-8 innerbox">
                    <div>
                      <label>Total Users</label>  <span>1500</span>                    
                    </div>
                    <div>
                      <label>Online Users</label>  <span>1000</span>                    
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 box3">     
            <div className="col-lg-12 box3a">
              <div className="row">
                  <div className="col-lg-4 box3aicon">
                    <i className={"fa fa-user"}></i>
                  </div>
                  <div className="col-lg-8 innerbox">
                    <div>
                      <label>Total Category</label>  <span>1500</span>                    
                    </div>
                    <div>
                      <label>Total Proucts</label>  <span>1000</span>                    
                    </div>
                  </div>
              </div>
            </div>
          </div> 
          <div className="col-lg-3 box3">     
            <div className="col-lg-12 box3a">
              <div className="row">
                  <div className="col-lg-4 box3aicon">
                    <i className={"fa fa-user"}></i>
                  </div>
                  <div className="col-lg-8 innerbox">
                    <div>
                      <label>YTD Orders</label>  <span>1500</span>                    
                    </div>
                    <div>
                      <label>MTD Reviews</label>  <span>1000</span>                    
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 box3">     
            <div className="col-lg-12 box3a">
              <div className="row">
                  <div className="col-lg-4 box3aicon">
                    <i className={"fa fa-user"}></i>
                  </div>
                  <div className="col-lg-8 innerbox">
                    <div>
                      <label>YTD Reviews</label>  <span>1500</span>                    
                    </div>
                    <div>
                      <label>MTD Reviews</label>  <span>1000</span>                    
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="row">
        <br/>
        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
          <div className="box1a box2">
            <h4>Order Summary</h4>
            <div className="commonpre">
              <div id="Today" className="charttab currentlyActive">
                Today
              </div>
              <div id="Week" className="charttab">
                Week
              </div>
              <div id="Month" className="charttab">
                Month
              </div>
              <div id="Year" className="charttab">
                1 Year
              </div>
              <div id="2Year" className="charttab">
                2 Year
              </div>
              <div id="3Year" className="charttab">
                3 Year
              </div>
              <div id="5Year" className="charttab">
                5 Year
              </div>
            </div>
            <br/>
            <canvas id="myBarChart"></canvas>
          </div>
        <br/>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
          <div className="col-lg-12 box3">     
            <div className="box3a">
              <div className="col-lg-12">
                  <h4>New Orders</h4> 
                  <label>Today 1000 Orders</label>  
              </div>
            </div>
            <br/>
          </div>

          <div className="col-lg-12 box3 returnbox">     
            <div className="box3a">
              <div className="col-lg-12">
                  <h4>Return Products</h4> 
                  <label>85/1000</label>  
              </div>
            </div>
          </div>

          <div className="col-lg-12 box3 outofstock">     
            <div className="box3a">
              <div className="col-lg-12">
                  <h4>Out of Stock</h4> 
                  <label>150/1500</label>  
              </div>
            </div>
          </div>

          <div className="box3">     
            <div className="col-lg-12 box3a">
              <div className="col-lg-12">
                  <h4>Reviews</h4> 
                  <label>60/500</label>  
              </div>
            </div>
          </div>
        </div>
        </div>

      </div>  

    );
  }
}
