import React, { Component }   from 'react';
import axios                  from 'axios';
import swal                   from 'sweetalert';
import IAssureTable           from "../../coreAdmin/IAssureTable/IAssureTable.jsx";
import moment from 'moment';
// axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
// axios.defaults.headers.post['Content-Type'] = 'application/json';


class AnnualPlan extends Component{
  
  constructor(props){
    super(props); 
   
    this.state = {
      
      shown                 : true,
       "twoLevelHeader"     : {
        apply               : false,
        firstHeaderData     : [
          {
              heading : '',
              mergedColoums : 10
          },
          {
              heading : 'Source of Fund',
              mergedColoums : 7
          },
        ]
      },
      "tableHeading"        : {
        date                : "Date",
        orderNo             : "Order No.",
        transactionType     : "Transaction Type",
        productCount        : "Product Count",
        quantity            : "Quantity",
        amount              : "Amount"
      },
      " tableObjects"       : {
        apiLink             : '/api/annualPlans/',
        editUrl             : '/Plan/',
      },
      "startRange"          : 0,
      "limitRange"          : 10,
      // "editId"              : this.props.match.params ? this.props.match.params.id : '',
      fields                : {},
      errors                : {},
      currentDate           : ''
    }
  }
 
  handleChange(event){
    event.preventDefault(); 
  }
       
  getData(startRange, limitRange){
   axios({
      method: 'get',
      url: '/api/annualPlans/list',
    }).then(function(response){
      console.log('response======================', response.data);
      this.setState({
        tableData : response.data
      });
     
    }).catch(function (error) {
      console.log('error', error);
    });
  }

  componentWillReceiveProps(nextProps){
    var editId = nextProps.match.params.id;
    if(nextProps.match.params.id){
      this.setState({
        editId : editId
      })
      this.edit(editId);
    }
  }

  componentDidMount() {
      
    document.getElementsByClassName('reportsDateRef').value = moment().startOf('day').format("DD/MM/YYYY") ;
    this.setState({ currentDate:moment().startOf('day').format("DD/MM/YYYY") });
    if(this.state.editId){      
      this.edit(this.state.editId);
    }
    var data = {
      limitRange : 0,
      startRange : 1,
    }
    axios({
      method: 'get',
      url: '/api/annualPlans/list',
      }).then((response)=> {
      var tableData = response.data.map((a, index)=>{return});
      this.setState({
        tableData : response.data,
        editUrl   : this.props.match.params
      },()=>{
        
      });
    }).catch(function (error) {
      console.log('error', error);
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
  handleChange(event){
      // event.preventDefault();
      // var target = event.target;
      // var name = target.name;

      // var dateVal = event.target.value;
      // var dateUpdate = new Date(dateVal);
      // Session.set('newDate',dateUpdate);
      

      // this.setState({
      //     [name] : event.target.value,
      // });
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
    console.log('editId componentDidMount',this.state.currentDate);
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
                <input onChange={this.handleChange} defaultValue={this.state.currentDate} name="reportsDayRef" type="date" className="reportsDateRef reportsDayRef form-control" placeholder="" 
                aria-label="Brand" ref="reportsDayRef"  />
                <span onClick={this.nextDate.bind(this)} className="commonReportArrowPoiner input-group-addon" id="basic-addon1"><i className="fa fa-chevron-circle-right" aria-hidden="true"></i></span>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt formLable boxHeightother " >
            <div className="row">  
              <IAssureTable 
                tableHeading={this.state.tableHeading}
                twoLevelHeader={this.state.twoLevelHeader} 
                dataCount={this.state.dataCount}
                tableData={this.state.tableData}
                getData={this.getData.bind(this)}
                tableObjects={this.state.tableObjects}
              />
            </div>
          </div> 
        </div>
      </div>
    );
  }
}
export default AnnualPlan
