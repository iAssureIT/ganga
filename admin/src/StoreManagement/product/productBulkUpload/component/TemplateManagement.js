import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import _ from 'underscore';
import ProductList from '../../productList/component/ProductList.js';
import { withRouter } from 'react-router-dom';
import XLSX from "xlsx";

class TemplateManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentWillReceiveProps(nextProps) {
        
    }

    componentDidMount() {
        this.getSectionData();
    }
    getSectionData() {
    axios.get('/api/sections/get/list')
      .then((response) => {
        // console.log('getWebCategories', response.data);
        this.setState({
          sectionArray: response.data
        })
      })
      .catch((error) => {
        console.log('error', error);
      })
    }
    showRelevantCategories(event) {
    var section = event.target.value;
    this.setState({
      section: event.target.value,
      section_ID: event.target.value.split('|')[1],
    })
    axios.get('/api/category/get/list/' + event.target.value.split('|')[1])
      .then((response) => {
        this.setState({
          categoryArray: response.data,
          category: "Select Category",
          subCategory: "Select Sub-Category",
        })
      })
      .catch((error) => {
        console.log('error', error);
      })
    }
    docBrowse(e){
    e.preventDefault();
        var fileObj = e.currentTarget.files[0];
        console.log(fileObj);
    }
    clicktoattach(event){
        event.preventDefault();
        $("#upload-file").click();
      }

    render() {

        
        return (
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-right">
            <section className="content">
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                <div className="row">
                    <div className="addNewProductWrap col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol">
                        <div className="box">
                            <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                <h4 className="NOpadding-right">Templates</h4>
                            </div>
                        </div>
                        
                        <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 inputFields marginTopp">
                            <label>Section <i className="redFont">*</i></label>
                            <select onChange={this.showRelevantCategories.bind(this)} value={this.state.section} name="section" className="form-control" aria-describedby="basic-addon1" id="section" ref="section">
                                <option disabled selected defaultValue="">Select Section</option>
                                {this.state.sectionArray && this.state.sectionArray.length > 0 ?
                                    this.state.sectionArray.map((data, index) => {
                                        return (
                                            <option key={index} value={data.section + '|' + data._id} >{data.section}</option>
                                        );
                                    })
                                    :
                                    <option disabled>{"Section not available"}</option>
                                }
                            </select>
                            {this.state.section ? null : <span>Please select a section for template upload</span>}
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 inputFields marginTopp">
                            <label>Category <i className="redFont">*</i></label>
                            <select onChange={this.showRelevantCategories.bind(this)} value={this.state.section} name="section" className="form-control" aria-describedby="basic-addon1" id="section" ref="section">
                                <option disabled selected defaultValue="">Select Category</option>
                                {this.state.categoryArray && this.state.sectionArray.length > 0 ?
                                    this.state.categoryArray.map((data, index) => {
                                        return (
                                            <option key={index} value={data._id} >{data.category}</option>
                                        );
                                    })
                                    :
                                    <option disabled>{"Category not available"}</option>
                                }
                            </select>
                            {this.state.section ? null : <span>Please select a category for template upload</span>}
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt">
                            
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 input-group">
                                <span className="adminBlkUpldIcon input-group-addon" id="basic-addon1"><i className="fa fa-cloud-upload" aria-hidden="true"></i></span>
                                <input className="form-control adminBlkUploadBtn"
                                    ref={this.fileInput}
                                    type="file"
                                    accept=".xlsx, .xls, .csv"
                                    onChange={this.docBrowse.bind(this)}
                                />
                            </div>
                            <div className="upldProdFileHere"> Upload Your Template File Here:</div>
                        </div>
                        <br/>
                    </div>
 
                </div>
            </div>
        </section>
      </div>
        );
    }
}
export default withRouter(TemplateManagement);
