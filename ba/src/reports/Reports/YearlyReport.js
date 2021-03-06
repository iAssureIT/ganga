import React, { Component } from 'react';
import IAssureTable         from "../../coreAdmin/IAssureTable/IAssureTable.jsx";
export default class YearlyReport extends Component{
	constructor(props){
        super(props);
        this.state = {
            "reportData": [],
            "twoLevelHeader"    : this.props.twoLevelHeader,
            "tableHeading"      : this.props.tableHeading,
            "tableObjects"      : this.props.tableObjects,
            "tableDatas"        : this.props.tableDatas,
            "startRange"        : 0,
            "limitRange"        : 10
            
        }
        this.handleChange = this.handleChange.bind(this);
        
    }

    componentDidMount(){
        this.dataTableList();
        this.setState({
            tableData : this.state.tableDatas.slice(this.state.startRange, this.state.limitRange),
        });
        this.handleChange = this.handleChange.bind(this);
        
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.reportData){
            this.setState({
                reportData : nextProps.reportData
            });
        }
    }
    handleChange(event){
        event.preventDefault();
       const target = event.target;
       const name = target.name;

       this.setState({
           [name] : event.target.value,
       });
   }


    currentyear(){
		// var yearSession = Session.get('selectedYear');
		// if(yearSession){
		// 	var currentYear = yearSession;
		// }else{
		// 	var today = new Date();
	 //        var currentYear = today.getFullYear();
		// 	Session.set("selectedYear",currentYear);
		// }
    var d = new Date();
    var currentYear = d.getFullYear();
    return currentYear;
	}

	previousYear(event){
		// event.preventDefault();
		// var selectedYear = $(".inputyearlyValue").val();
		// var newYear = moment(selectedYear).subtract(1,'years').format('YYYY');
		// Session.set('selectedYear', newYear);
	}

	nextYear(event){
		// event.preventDefault();
		// var selectedYear = $(".inputyearlyValue").val();
		// var newYear = moment(selectedYear).add(1,'years').format('YYYY');
		// Session.set('selectedYear', newYear);

    }
    

    dataTableList(){
		// var yearFromSess = Session.get("selectedYear");
        
  //       var thisYear = yearFromSess;
  //       var yearDateStart = new Date("1/1/" + thisYear);
  //       var yearDateEnd = new Date (yearDateStart.getFullYear(), 11, 31);

		// var reportData = [];
  //       if(this.props.selectedCategory){
  //           if(this.props.selectedSubCategory){
  //               reportData =  Orders.find({'createdAt':{$gte : yearDateStart, $lt : yearDateEnd }, 'status' : 'Paid',  "products": { $elemMatch: { category: this.props.selectedCategory, subCategory: this.props.selectedSubCategory}}}, {sort: {'createdAt': -1}}).fetch();
  //           }else{
  //               reportData =  Orders.find({'createdAt':{$gte : yearDateStart, $lt : yearDateEnd }, 'status' : 'Paid',  "products": { $elemMatch: { category: this.props.selectedCategory}}}, {sort: {'createdAt': -1}}).fetch();
  //           }
  //       }else{
  //           reportData =  Orders.find({'createdAt':{$gte : yearDateStart, $lt : yearDateEnd }, 'status' : 'Paid'}, {sort: {'createdAt': -1}}).fetch();
  //       }
  //       this.setState({
  //           reportData : reportData
  //       });
    }
    getData(startRange, limitRange){
        this.setState({
            tableData : this.state.tableDatas.slice(parseInt(startRange), parseInt(limitRange)),
        },()=>{
            console.log('tableData',this.state.tableData);
        });
    }
    getSearchText(searchText, startRange, limitRange){
        console.log(searchText, startRange, limitRange);
        this.setState({
            tableData : []
        });
    }
   
    render(){
        if(!this.props.loading){
            return( 
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="sales-report-main-class">
                        <div className="reports-select-date-boxmain">
                            <div className="reports-select-date-boxsec">
                                <div className="reports-select-date-Title">Yearly Reports</div>
                                <div className="input-group">
                                    <span onClick={this.previousYear.bind(this)} className="commonReportArrowPoiner input-group-addon" id="basic-addon1"><i className="fa fa-chevron-circle-left" aria-hidden="true"></i></span>
                                    <input onChange={this.handleChange} value={this.currentyear()} name="inputyearlyValue" type="text" className="inputyearlyValue reportsDateRef form-control" placeholder="" aria-label="Brand" aria-describedby="basic-addon1" ref="inputyearlyValue"  />
                                    <span onClick={this.nextYear.bind(this)} className="commonReportArrowPoiner input-group-addon" id="basic-addon1"><i className="fa fa-chevron-circle-right" aria-hidden="true"></i></span>
                                </div>
                            </div>
                        </div>

                        <div className="report-list-downloadMain">
                            <IAssureTable 
                                completeDataCount={this.state.tableDatas.length}
                                twoLevelHeader={this.state.twoLevelHeader} 
                                editId={this.state.editSubId} 
                                getData={this.getData.bind(this)} 
                                tableHeading={this.state.tableHeading} 
                                tableData={this.state.tableData} 
                                tableObjects={this.state.tableObjects}
                                getSearchText={this.getSearchText.bind(this)}/>
                        </div>
                    </div>
                
                    
                </div>
            );
        }else{
            return(
                <div className="col-sm-12 col-xs-12 col-lg-8 col-lg-offset-4 col-md-12 loadingImg loaderDiv"><img className="ldrImageforbulk" src="/images/loadersglms.gif" alt="loading"/></div>
            );
        } 
    }
}
// export default YearlyListContainer = withTracker(props =>{
//     var yearFromSess = Session.get("selectedYear");
        
//     var thisYear = yearFromSess;
//     var yearDateStart = new Date("1/1/" + thisYear);
//     var yearDateEnd = new Date (yearDateStart.getFullYear(), 11, 31);

//     const reportHandle = Meteor.subscribe("OrdersData");
//     var reportData = [];
//     if(props.selectedCategory){
//         if(props.selectedSubCategory){
//             reportData =  Orders.find({'createdAt':{$gte : yearDateStart, $lt : yearDateEnd }, 'status' : 'Paid',  "products": { $elemMatch: { category: props.selectedCategory, subCategory: props.selectedSubCategory}}}, {sort: {'createdAt': -1}}).fetch();
//         }else{
//             reportData =  Orders.find({'createdAt':{$gte : yearDateStart, $lt : yearDateEnd }, 'status' : 'Paid',  "products": { $elemMatch: { category: props.selectedCategory}}}, {sort: {'createdAt': -1}}).fetch();
//         }
//     }else{
//         reportData =  Orders.find({'createdAt':{$gte : yearDateStart, $lt : yearDateEnd }, 'status' : 'Paid'}, {sort: {'createdAt': -1}}).fetch();
//     }
//     const loading = !reportHandle.ready();
//     return{
//         loading,
//         reportData,
//     };
// })(CategoryWiseReportsYearlyList);