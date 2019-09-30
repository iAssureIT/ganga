import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import ReactTable             from "react-table";
import swal                   from 'sweetalert';
import _                      from 'underscore';
import S3FileUpload           from 'react-s3';
// import validator              from 'validator';
import IAssureTable           from '../../../../coreAdmin/IAssureTable/IAssureTable.jsx';
import 'jquery-validation';
import 'bootstrap/js/tab.js';
import '../css/SectionManagement.css';

// axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

class SectionManagement extends Component{
    constructor(props) {
        super(props);
        this.state = {
            "addEditMode"                       : "",
            
            "tableHeading"                      : {
              section                           : "Section",
              section                           : "Section Title",
              actions                           : 'Action',
            },
            "tableObjects"              : {
              deleteMethod              : 'delete',
              apiLink                   : 'http://localhost:5006/api/sections/',
              paginationApply           : true,
              searchApply               : true,
              editUrl                   : '/section-management/'
            },
            "startRange"                : 0,
            "limitRange"                : 10,
            "editId"                    : this.props.match.params ? this.props.match.params.sectionID : ''
        };
    }
    handleChange(event){
        const target = event.target;
        const name   = target.name;
        this.setState({
            [name]: event.target.value,
        });
    }
    componentWillReceiveProps(nextProps) {
        var editId = nextProps.match.params.sectionID;
        if(nextProps.match.params.sectionID){
          this.setState({
            editId : editId
          })
          this.edit(editId);
        }
    }
    componentDidMount(){
      window.scrollTo(0, 0);
      if(this.state.editId){      
        this.edit(this.state.editId);
      }
      $.validator.addMethod("valueNotEquals", function(value, element, arg){
        return arg !== value;
      }, "Please select the section");

      $.validator.addMethod("regxA1", function(value, element, regexpr) {          
        return regexpr.test(value);
      }, "Name should only contain letters & number.");
  
      $.validator.setDefaults({
        debug: true,
        success: "valid"
      });

      $("#sectionManagement").validate({
        rules: {
          section: {
            required: true,
            valueNotEquals: "Select Section"
          },
          section: {
            required: true,
            regxA1: /^[A-Za-z_0-9 ][A-Za-z\d_ ]/,
          },
        
        },
        errorPlacement: function(error, element) {
          if (element.attr("name") == "section"){
            error.insertAfter("#section");
          }
          if (element.attr("name") == "section"){
            error.insertAfter("#section");
          }        
        }
      });
      this.getDataCount();
      this.getData(this.state.startRange,this.state.limitRange);
    }
    getDataCount(){
      axios.get('http://localhost:5006/api/sections/get/count')
      .then((response)=>{
        console.log('dataCount', response.data);
        this.setState({
          dataCount : response.data.dataCount
        })
      })
      .catch((error)=>{
        console.log('error', error);
      });
    }
    getData(startRange, limitRange){
      axios.get('http://localhost:5006/api/sections/get/list-with-limits/'+startRange+'/'+limitRange,)
      .then((response)=>{
        console.log('tableData', response.data);
        this.setState({
          tableData : response.data
        })
      })
      .catch((error)=>{
        console.log('error', error);
      });
    }
    
    submitsection(event){
      event.preventDefault();
      if($('#sectionManagement').valid()){
        var formValues = {
            "section"                  : this.state.section,
            "createdBy"                : localStorage.getItem("admin_ID")
        }
        axios.post('http://localhost:5006/api/sections/post', formValues)
          .then((response)=>{
            swal({
              text  : response.data.message,
              title : response.data.message,
            });
            this.setState({
              "section"                      : 'Select',
              "sectionUrl"                   : '',
              "addEditModeSubsection"        : '',
            });
            this.getData(this.state.startRange, this.state.limitRange);
          })
          .catch((error)=>{
            console.log('error', error);
          });

      }
    }
    updatesection(event){
      event.preventDefault();
      if($('#sectionManagement').valid()){
        
        var formValues = {
          "sectionID"                : this.state.editId,
          "section"                  : this.state.section,
        }

        axios.patch('http://localhost:5006/api/sections/patch', formValues)
          .then((response)=>{
            swal({
              text  : response.data.message,
              title : response.data.message,
            });
            this.getData(this.state.startRange, this.state.limitRange);
            this.setState({
              "section"                   : '',
              "sectionUrl"                : '',
            });
            //this.props.history.push('/section-management');
          })
          .catch((error)=>{
            console.log('error', error);
          });
      }
    }
    edit(id){
      axios.get('http://localhost:5006/api/sections/get/one/'+id)
      .then((response)=>{
        console.log('edit', response.data);
        if(response.data){
            this.setState({
              "section"                  : response.data.section,
              "sectionUrl"               : response.data.sectionUrl
            });
        } else{
            this.setState ({

            });
        }
      })
      .catch((error)=>{
        console.log('error', error);
      });
    }
    
    createsectionUrl(event){
        const target = event.target;
        const name   = target.name;
        this.setState({
            [name]: event.target.value,
        });
        var url = event.target.value;
        // console.log('url',url);
        if(url){
            url = url.replace(/\s+/g, '-').toLowerCase();
            // $(".productUrl").val(url);
            this.setState({
                sectionUrl : url
            })
        }
    }
    
    render(){
        return(
            <div className="container-fluid">
              <div className="row">
                <div className="formWrapper">
                    <section className="content">
                      <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 titleaddcontact">
                              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 contactdeilsmg pageHeader">
                                  Section Management                  
                               </div>
                              <hr className="hr-head container-fluid row"/>
                            </div>
                            <form id="sectionManagement" className="">
                            <div className="row">
                              <div className="col-lg-6">
                                  <div className="col-lg-12">
                                      <label>Section Title <i className="redFont">*</i></label>
                                      <input value={this.state.section} name="section" id="section" onChange={this.createsectionUrl.bind(this)} type="text" className="form-control edit-catg-new" placeholder="section Title" ref="section" />
                                  </div>
                                  <div className="col-lg-12">
                                      <label>Section URL <i className="redFont">*</i></label>                                                                    
                                      <input disabled value={this.state.sectionUrl} onChange={this.handleChange.bind(this)} id="sectionUrl" name="sectionUrl" type="text" className="form-control sectionUrl" placeholder="section URL" ref="sectionUrl"  />
                                  </div>
                              </div>
                            </div>
                            <div className="row">  
                              <div className="col-lg-6 NOpadding-right">
                                  <div>
                                      {
                                        this.state.editId ? 
                                        <button onClick={this.updatesection.bind(this)} className="submitBtn btn btnSubmit">Update</button>
                                        :
                                        <button onClick={this.submitsection.bind(this)} className="submitBtn btn btnSubmit">Submit</button>
                                      }
                                  </div>
                              </div>
                            </div> 
                          </form>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                      </section>
                    </div>
                  </div>
            </div>
          );
        }
    }
export default SectionManagement;