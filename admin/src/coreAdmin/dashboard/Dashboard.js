import React,{Component} from 'react';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Chart from 'chart.js';

import GoogleChart from 'react-google-charts';

import StatusComponent from './StatusComponent/StatusComponent.js'
import ChartComponent  from './chart/Chart.js'
import UpdateComponent from './UpdateComponent/UpdateComponent.js'
import TableComponent  from './TableComponent/TableComponent.js'
import Productlist     from './productlist/Productlist.js'
import Visitorreport   from './Visitorreport/Visitorreport.js'
import Infocomponent   from './Infocomponent/Infocomponent.js'
import './chart/Chart.css';
import moment from 'moment';
import $ from 'jquery';
import axios                  from 'axios';

// import {StudentMaster} from '/imports/admin/forms/student/api/studentMaster.js';
// import { FranchiseDetails }  from '/imports/admin/companySetting/api/CompanySettingMaster.js';
// import { FlowRouter }   from 'meteor/ostrio:flow-router-extra';

export default class Dashboard extends Component{
  
  constructor(props) {
   super(props);
    this.state = {
      "currentTabView"  : "Today",
      "userCount"       : 0,
      "onlineUserCount" : 0,
      "categoriesCount" : 0,
      "productCount"    : 0,
      "ytdorders"       : 0,
      "mtdorders"       : 0,
      "ytdreviews"      : 0,
      "mtdreviews"      : 0,
      "todaysneworders" : 0,
      "todaysReturnPendingCount" : 0,
      "todaysReturnCount" : 0,
      "outofstock"      : 0,
      "todaysReviewCount": 0,
      "todaysUnpublishedReviewCount": 0,
      "sectionLables"   : [],
      "catLables"       : [],
      "subCatLables"    : []
    }
  }
   
  componentDidMount(){

    axios.get("/api/users/get/count")
    .then((response)=>{
      this.setState({ 
        userCount : response.data.dataCount
      },()=>{
      })
    })
    .catch((error)=>{
        console.log('error', error);
    })

    axios.get("/api/users/get/activeuserscount")
    .then((response)=>{
      this.setState({ 
        onlineUserCount : response.data.dataCount
      },()=>{ 
      })
    })
    .catch((error)=>{
        console.log('error', error);
    })
    
    axios.get("/api/category/get/count")
    .then((response)=>{
      this.setState({ 
        categoriesCount : response.data.dataCount
      },()=>{ 
      })
    })
    .catch((error)=>{
        console.log('error', error);
    })

    axios.get("/api/products/get/count")
    .then((response)=>{
      this.setState({ 
        productCount : response.data.dataCount
      },()=>{ 
      })
    })
    .catch((error)=>{
        console.log('error', error);
    })

    axios.get("/api/orders/get/ytdorders")
    .then((response)=>{
      this.setState({ 
        ytdorders : response.data.dataCount
      },()=>{ 
      })
    })
    .catch((error)=>{
        console.log('error', error);
    })

    axios.get("/api/orders/get/mtdorders")
    .then((response)=>{
      this.setState({ 
        mtdorders : response.data.dataCount
      },()=>{ 
      })
    })
    .catch((error)=>{
        console.log('error', error);
    })


    axios.get("/api/customerReview/get/ytdreviews")
    .then((response)=>{
      this.setState({ 
        ytdreviews : response.data.dataCount
      },()=>{ 
      })
    })
    .catch((error)=>{
        console.log('error', error);
    })

    axios.get("/api/customerReview/get/mtdreviews")
    .then((response)=>{
      this.setState({ 
        mtdreviews : response.data.dataCount
      },()=>{ 
      })
    })
    .catch((error)=>{
        console.log('error', error);
    })

    axios.get("/api/orders/get/todaysneworders")
    .then((response)=>{
      this.setState({ 
        todaysneworders : response.data.dataCount
      },()=>{ 
      })
    })
    .catch((error)=>{
        console.log('error', error);
    })

    axios.get("/api/returnedProducts/get/todayscount")
    .then((response)=>{
      this.setState({ 
        todaysReturnCount : response.data.dataCount
      },()=>{ 
      })
    })
    .catch((error)=>{
        console.log('error', error);
    })


    axios.get("/api/returnedProducts/get/todaysPendingCount")
    .then((response)=>{
      this.setState({ 
        todaysReturnPendingCount : response.data.dataCount
      },()=>{ 
      })
    })
    .catch((error)=>{
        console.log('error', error);
    })

    axios.get("/api/products/get/outofstockproducts")
    .then((response)=>{
      this.setState({ 
        outofstock : response.data.dataCount
      },()=>{ 
      })
    })
    .catch((error)=>{
        console.log('error', error);
    })

    axios.get("/api/customerReview/get/todayscount")
    .then((response)=>{
      this.setState({ 
        todaysReviewCount : response.data.dataCount
      },()=>{ 
      })
    })
    .catch((error)=>{
        console.log('error', error);
    })

    axios.get("/api/customerReview/get/todaysUnpublishedCount")
    .then((response)=>{
      this.setState({ 
        todaysUnpublishedReviewCount : response.data.dataCount
      },()=>{ 
      })
    })
    .catch((error)=>{
        console.log('error', error);
    })

    /* totalOrdersByPeriod bar chart */
    this.setState({ currentDate:moment().startOf('day').format("YYYY-MM-DD") },()=>{
      this.getBarChart(this.state.currentDate);
    });

    
    /*totalOrdersByState horizontal bar chart */
    axios.get("/api/orders/get/totalOrdersByState")
    .then((response)=>{

      var orderByStatesLables = [];
      var orderByStatesData = [];
      response.data.map((data,index)=>{
        orderByStatesLables.push(data._id);
        orderByStatesData.push(data.count);
      })

      var ordersByStatesctx = document.getElementById("ordersByStates").getContext("2d");
      var ordersByStatesChartData = {
          labels: orderByStatesLables,
          datasets: [{
              label: orderByStatesLables,
              data: orderByStatesData,
              backgroundColor: ["#669911", "#119966"],
              hoverBackgroundColor: ["#66A2EB", "#FCCE56"]
          }]
      };

      var MeSeChart = new Chart(ordersByStatesctx, {
          type: 'horizontalBar',
          data: ordersByStatesChartData,
          options: {
              scales: {
                  xAxes: [{
                      ticks: {
                      min: 2
                      }
                  }],
                  yAxes: [{
                    stacked: true
                  }]
              }

          }
      });
    })
    .catch((error)=>{
        console.log('error', error);
    })

    
    /* section Revenue Pie chart */
    axios.get("/api/orders/get/sectionRevenue")
    .then((response)=>{
      var sectionLables = [];
      var sectionRevenue = [];
      response.data.map((data,index)=>{
        sectionLables.push(data._id);
        sectionRevenue.push(data.revenue);
      })

      var sectctx = document.getElementById('SectionChart');
      var sectdata = {
        datasets: [{
            data: sectionRevenue
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: sectionLables
      };
      var myPieChart = new Chart(sectctx, {
        type: 'pie',
        data: sectdata
      });
  })
    /* CategoryRevenue Pie chart */
    axios.get("/api/orders/get/categoryRevenue")
    .then((response)=>{
      var catLables = [];
      var catRevenue = [];
      response.data.map((data,index)=>{
        catLables.push(data._id);
        catRevenue.push(data.revenue);
      })

        var CatChartctx = document.getElementById('CatChart');
        var catdata = {
          datasets: [{
              data: catRevenue
          }],
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: catLables
        };
        var myPieChart = new Chart(CatChartctx, {
          type: 'pie',
          data: catdata
        });

      })
    /* subCategoryRevenue Pie chart */
    axios.get("/api/orders/get/subCategoryRevenue")
    .then((response)=>{
      var subCatLables = [];
      var subCatRevenue = [];
      response.data.map((data,index)=>{
        subCatLables.push(data._id);
        subCatRevenue.push(data.revenue);
      })

      var SubcatChartctx = document.getElementById('SubcatChart');
      var subcatdata = {
        datasets: [{
            data: subCatRevenue
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: subCatLables
      };
      var myPieChart = new Chart(SubcatChartctx, {
        type: 'pie',
        data: subcatdata
      });
      
    })
    .catch((error)=>{
        console.log('error', error);
    })
    
  }
  changeTab(event){
    event.preventDefault();
    var currentTab = $(event.currentTarget).attr('id');

    this.setState({
      'currentTabView': currentTab,
    });

    if (currentTab == "Today") {
      this.setState({ currentDate:moment().startOf('day').format("YYYY-MM-DD") },()=>{
        this.getBarChart(this.state.currentDate);
      });
    }
    else if(currentTab == "Week"){
      this.setState({ currentDate:moment().startOf('Week').format("YYYY-MM-DD") },()=>{
        this.getBarChart(this.state.currentDate);
      });
    }
    else if(currentTab == "Month"){
      this.setState({ currentDate:moment().startOf('Month').format("YYYY-MM-DD") },()=>{
        this.getBarChart(this.state.currentDate);
      });
    }
    else if(currentTab == "Year"){
      this.setState({ currentDate:moment().startOf('Year').format("YYYY-MM-DD") },()=>{
        this.getBarChart(this.state.currentDate);
      });
    }
    else if(currentTab == "2Year"){
      var currentDate = moment(moment().startOf('Year')).subtract(1, 'year');

      this.setState({ currentDate:currentDate.format("YYYY-MM-DD") },()=>{
        this.getBarChart(this.state.currentDate);
      });
    }
    else if(currentTab == "3Year"){
      var currentDate = moment(moment().startOf('Year')).subtract(2, 'year');

      this.setState({ currentDate:currentDate.format("YYYY-MM-DD") },()=>{
        this.getBarChart(this.state.currentDate);
      });
    }
    else if(currentTab == "5Year"){
      var currentDate = moment(moment().startOf('Year')).subtract(4, 'year');

      this.setState({ currentDate:currentDate.format("YYYY-MM-DD") },()=>{
        this.getBarChart(this.state.currentDate);
      });
    }
  }
  getBarChart(currentDate){
      axios.get("/api/orders/get/totalOrdersByPeriod/"+currentDate)
      .then((response)=>{

          var barChartData = [];
          var barChartLable = [];
          response.data.map((data,index)=>{
            barChartLable.push(data._id);
            barChartData.push(data.count);
          })
          var ctx3 = document.getElementById('myBarChart');
          var data3 = {
            datasets: [
                      {
                        label: 'Total Orders',
                        data: barChartData
                      }
                      ],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: barChartLable
          };

          var myBarChart = new Chart(ctx3, {
              type: 'bar',
              data: data3,  
          });
      })
      .catch((error)=>{
          console.log('error', error);
      })
  }    
  render(){
    return(
      <div className="col-lg-12">
        <div className="row">
        <br/>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="col-lg-3">     
            <div className="dash-box" >
              <span className="infoboxicon bg-aqua"><i className="fa fa-user"></i></span>
              <div className="info-box-content">
                <span className="info-box-text">Total User</span>
                <span className="info-box-number">{this.state.userCount}</span>
                <span className="info-box-text">Online User</span>
                <span className="info-box-number">{this.state.onlineUserCount}</span>
              </div>
            </div>
          </div>
          <div className="col-lg-3">     
            <div className="dash-box">
              <span className="infoboxicon bg-aqua"><i className="fa fa-user"></i></span>
              <div className="info-box-content">
                <span className="info-box-text">Total Category</span>
                <span className="info-box-number">{this.state.categoriesCount}</span>
                <span className="info-box-text">Total Proucts</span>
                <span className="info-box-number">{this.state.productCount}</span>
              </div>
            </div>
          </div> 
          <div className="col-lg-3">  
            <div className="dash-box">
                <span className="infoboxicon bg-aqua"><i className="fa fa-user"></i></span>
                <div className="info-box-content">
                  <span className="info-box-text">YTD Orders</span>
                  <span className="info-box-number">{this.state.ytdorders}</span>
                  <span className="info-box-text">MTD Orders</span>
                  <span className="info-box-number">{this.state.mtdorders}</span>
                </div>
            </div> 
          </div>
          <div className="col-lg-3">     
            <div className="dash-box">
                <span className="infoboxicon bg-aqua"><i className="fa fa-user"></i></span>
                <div className="info-box-content">
                  <span className="info-box-text">YTD Reviews</span>
                  <span className="info-box-number">{this.state.ytdreviews}</span>
                  <span className="info-box-text">MTD Reviews</span>
                  <span className="info-box-number">{this.state.mtdreviews}</span>
                </div>
            </div>
          </div>
        </div>
        </div>

        <div className="row">
        <br/>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
            <div className="box1a box2">
              <h4>Total Orders</h4>
              <div className="commonpre">
                <div id="Today" className= { this.state.currentTabView == "Today" ? "charttab currentlyActive" : "charttab"} onClick={this.changeTab.bind(this)}>
                  Today
                </div>
                <div id="Week" className= { this.state.currentTabView == "Week" ? "charttab currentlyActive" : "charttab"} onClick={this.changeTab.bind(this)}>
                  Week
                </div>
                <div id="Month" className= { this.state.currentTabView == "Month" ? "charttab currentlyActive" : "charttab"} onClick={this.changeTab.bind(this)}>
                  Month
                </div>
                <div id="Year" className= { this.state.currentTabView == "Year" ? "charttab currentlyActive" : "charttab"} onClick={this.changeTab.bind(this)}>
                  1 Year
                </div>
                <div id="2Year" className= { this.state.currentTabView == "2Year" ? "charttab currentlyActive" : "charttab"} onClick={this.changeTab.bind(this)}>
                  2 Year
                </div>
                <div id="3Year" className= { this.state.currentTabView == "3Year" ? "charttab currentlyActive" : "charttab"} onClick={this.changeTab.bind(this)}>
                  3 Year
                </div>
                <div id="5Year" className= { this.state.currentTabView == "5Year" ? "charttab currentlyActive" : "charttab"} onClick={this.changeTab.bind(this)}>
                  5 Year
                </div>
              </div>
              <br/>
              <canvas id="myBarChart"></canvas>
            </div>
          <br/>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
            <div className="col-lg-12 box3" style={{marginBottom: "15px"}}>     
              <div className="box3a box1a">
                <div className="col-lg-12">
                    <h4>Call to Action</h4> 
                </div>
              </div>
              <br/>
            </div>
            <div className="col-lg-12 box3">     
              <div className="box3a">
                <div className="col-lg-12">
                    <h4><a href="/new-orders-list">New Orders</a></h4> 
                    <label>Todays {this.state.todaysneworders} Orders</label>  
                </div>
              </div>
              <br/>
            </div>

            <div className="col-lg-12 box3 returnbox">     
              <div className="box3a">
                <div className="col-lg-12">
                    <h4><a href="/returned-products">Return Products</a></h4> 
                    <label>{this.state.todaysReturnPendingCount}/{this.state.todaysReturnCount}</label>  
                </div>
              </div>
            </div>

            <div className="col-lg-12 box3 outofstock">     
              <div className="box3a">
                <div className="col-lg-12">
                    <h4>Out of Stock</h4> 
                    <label>{this.state.outofstock}/{this.state.productCount}</label>  
                </div>
              </div>
            </div>

            <div className="box3">     
              <div className="col-lg-12 box3a">
                <div className="col-lg-12">
                    <h4><a href="/productreview">Reviews</a></h4> 
                    <label>{this.state.todaysUnpublishedReviewCount}/{this.state.todaysReviewCount}</label>  
                </div>
              </div>
            </div>
          </div>

        </div>

        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <div className="box1a box2">
              <h4>Orders by Region</h4>
                <GoogleChart
                width={'500px'}
                height={'300px'}
                chartType="GeoChart"
                data={[
                  ['State', 'Population'],
                  ['Uttar Pradesh', 199581477],
                  ['Maharashtra', 112372972],
                  ['Bihar', 103804637],
                  ['West Bengal', 91347736],
                  ['Madhya Pradesh', 72597565]
                ]}
                /*data={[
                  ['City', 'Popularity'],
                  ['Pune', 700],
                  ['Aurangabad', 300],
                  ['Mumbai', 400]
                  
                ]}*/
                options={{
                  region: 'IN',
                  displayMode: 'regions',
                  resolution: 'provinces',
                  width: 475, 
                }}
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                mapsApiKey="AIzaSyD1hOxDqrgk8V82oEYXU6W2p_U0-kvvu38"
                rootProps={{ 'data-testid': '1' }}
              />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <div className="box1a box2" style={{height:"340px"}}>
              <h4>Top 10 States</h4>
                <canvas id="ordersByStates"></canvas>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
         <br/>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
              <div className="box1a box2">
                <h4>Section Revenue</h4> 
                <canvas id="SectionChart"></canvas>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
              <div className="box1a box2">
                <h4>Category Revenue</h4> 
                <canvas id="CatChart"></canvas>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
              <div className="box1a box2">
                <h4>Subcategory Revenue</h4> 
                <canvas id="SubcatChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <br/>
      </div>  

    );
  }
}
