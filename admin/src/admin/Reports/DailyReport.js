import React, { Component }   from 'react';
import axios                  from 'axios';
import swal                   from 'sweetalert';
import IAssureTable           from "../../coreAdmin/IAssureTable/IAssureTable.jsx";
import moment from 'moment';
// axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
// axios.defaults.headers.post['Content-Type'] = 'application/json';


class DailyReport extends Component{
  
  constructor(props){
    super(props); 
   
    this.state = {
      
      shown                 : true,
       "twoLevelHeader"     : {
        apply               : false,
        // firstHeaderData     : [
        //   {
        //       heading : '',
        //       mergedColoums : 10
        //   },
        //   {
        //       heading : 'Source of Fund',
        //       mergedColoums : 7
        //   },
        // ]
      },
      "tableHeading"        : {
        deliveryStatus             : "Order No."
      },
      "tableData"           : [],
      "tableObjects"        : {
        apiLink             : '/api/annualPlans/',
        editUrl             : '/Plan/',
      },
      "startRange"          : 0,
      "limitRange"          : 10,
      fields                : {},
      errors                : {},
      currentDate           : '',
      dataCount             : 0
    }
  }
 
  getReport(event){
    event.preventDefault(); 
    console.log(event.currentTarget.value)
    this.getData(event.currentTarget.value, this.state.startRange, this.state.limitRange);
  }
       
  getData(startDate,startRange,limitRange){
    axios.get("/api/orders/get/report/"+startDate+'/'+startDate+'/'+startRange+'/'+limitRange)
    .then((response)=>{
      this.setState({ 
        tableData : response.data
      },()=>{ 
        console.log("tableData",this.state.tableData);
      })
    })
    .catch((error)=>{
        console.log('error', error);
    })
  }
  getCount(){
        axios.get('/api/orders/get/count')
        .then((response)=>{
            this.setState({
                dataCount : response.data.dataCount
            })
        })
        .catch((error)=>{
            console.log('error', error);
        })
    }
  componentWillReceiveProps(nextProps){
    
  }

  componentDidMount() {
    this.getCount();  
    document.getElementsByClassName('reportsDateRef').value = moment().startOf('day').format("DD/MM/YYYY") ;
    this.setState({ currentDate:moment().startOf('day').format("YYYY-MM-DD") },()=>{
      console.log('currentDate',this.state.currentDate);
      this.getData(this.state.currentDate, this.state.startRange, this.state.limitRange);
    });
    
  }

  
  previousDate(event){
    // event.preventDefault();
    // var selectedDate1 = $(".reportsDayRef").val();
    // var selectedDate = selectedDate1.replace(/-/g, '\/');

    // var newDate1 = new Date(selectedDate);
    // var newDate2 = new Date(newDate1.getTime() - (24*60*60*1000) );
    // Session.set('newDate', newDate2);

  }
  nextDate(event){
    // event.preventDefault();
    // var selectedDate1 = $(".reportsDayRef").val();
    // var selectedDate = selectedDate1.replace(/-/g, '\/');

    // var newDate1 = new Date(selectedDate);
    // var newDate2 = new Date(newDate1.getTime() + (24*60*60*1000) );
    // Session.set('newDate', newDate2);

  }
  
  currentDate(){
   //       var setDate = Session.get('newDate');

    // if(setDate){
    //  var today = new Date(setDate);
    // }else{
    //  var today = new Date();
    // }
    // var dd = today.getDate();
    // var mm = today.getMonth()+1; //January is 0!
    // var yyyy = today.getFullYear();
    // if(dd<10){
    //     dd='0'+dd;
    // }
    // if(mm<10){
    //     mm='0'+mm;
    // }
    //  var today = yyyy+'-'+mm+'-'+dd;

    // return today;

  }

  render() {
    console.log('componentDidMount',this.state.currentDate);
    var shown = {
      display: this.state.shown ? "block" : "none"
    };
    
    var hidden = {
      display: this.state.shown ? "none" : "block"
    }

    return (
      <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
        <div className="sales-report-main-class">
          <div className="reports-select-date-boxmain">
            <div className="reports-select-date-boxsec">
              <div className="reports-select-date-Title">Daily Reports</div>
              <div className="input-group">
                <span onClick={this.previousDate.bind(this)} className="commonReportArrowPoiner input-group-addon" id="basic-addon1"><i className="fa fa-chevron-circle-left" aria-hidden="true"></i></span>
                <input onChange={this.getReport.bind(this)} defaultValue={this.state.currentDate} name="reportsDayRef" type="date" className="reportsDateRef reportsDayRef form-control" 
                ref="reportsDayRef"  />
               
                <span onClick={this.nextDate.bind(this)} className="commonReportArrowPoiner input-group-addon" id="basic-addon1"><i className="fa fa-chevron-circle-right" aria-hidden="true"></i></span>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt formLable boxHeightother " >
            <div className="row">  
              {<IAssureTable 
                tableHeading={this.state.tableHeading}
                twoLevelHeader={this.state.twoLevelHeader} 
                dataCount={this.state.dataCount}
                tableData={this.state.tableData}
                getData={this.getData.bind(this)}
                tableObjects={this.state.tableObjects}
              />}
            </div>
          </div> 
        </div>
      </div>
    );
  }
}
export default DailyReport
