import React, { Component }   from 'react';
import axios                  from 'axios';
import IAssureTable           from "../../ProductTable/IAssureTable.jsx";
import swal                   from 'sweetalert';
import _                      from 'underscore';
import '../css/productList.css';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';
import 'font-awesome/css/font-awesome.min.css';
import $ from "jquery";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-react-dropdowns/styles/material.css";

class ProductList extends Component{
    constructor(props) { 
        super(props);
        this.state = {
            tableHeading :{
                "productName" : 'Product Details',
                "section" : 'Section',
                "category" : 'Category',
                "originalPrice" : 'Original Price',
                "discountPercent" : 'Discount Percent',
                "discountedPrice" : 'Discounted Price',
                "availableQuantity" : 'Available Quantity',
            },
            tableObjects : {
                paginationApply : true,
                searchApply     : true,
                deleteMethod    : 'delete',
                apiLink         : '/api/products',
                editUrl         : '/add-product/'
            },
            startRange : 0,
            limitRange : 100,
            selector   : {},
            unCheckedProducts:false
        };
        window.scrollTo(0, 0);
    }


    componentWillReceiveProps(nextProps) {
        
    }


    handleChange(event){
        const target = event.target;
        const name   = target.name;
        this.setState({
            [name]: event.target.value,
        });
    }

    componentDidMount() {
        this.getCount();
        this.getData(this.state.startRange, this.state.limitRange);
        this.getVendorList();
        this.getSectionData();
        this.getCategoryData();

        axios.get('/api/products/get/productCountByStatus')
            .then((response) => {
                
                this.setState({
                    productCountByStatus: response.data
                })

            })
            .catch((error) => {

            })
    }   
    getVendorList() {
        axios.get('/api/vendors/get/list')
            .then((response) => {
                
                var vendorArray = [];
                response.data.map((data,ind)=>{
                    vendorArray.push({id: data.vendor_ID, vendor: data.companyName })
                });
                this.setState({
                    vendorArray: vendorArray
                })

            })
            .catch((error) => {

            })
    }
    getSectionData() {
    axios.get('/api/sections/get/list')
      .then((response) => {

        var sectionArray = [];
        response.data.map((data,ind)=>{
            sectionArray.push({id: data._id, section: data.section })
        });
        this.setState({
          sectionArray: sectionArray
        })

      })
      .catch((error) => {
        console.log('error', error);
      })
    }
    getCategoryData() {
    axios.get('/api/category/get/list')
      .then((response) => {

        var categoryArray = [];
        response.data.map((data,ind)=>{
            categoryArray.push({id: data._id, category: data.category })
        });
        this.setState({
          categoryArray: categoryArray
        })
        
      })
      .catch((error) => {
        console.log('error', error);
      })
    }
    getCount(){
        axios.get('/api/products/get/count')
        .then((response)=>{
            console.log('dataCount', response.data.dataCount);
            this.setState({
                dataCount : response.data.dataCount
            })
        })
        .catch((error)=>{
            console.log('error', error);
        })
    }
    getData(startRange, limitRange){
        var data = {
            startRange : startRange,
            limitRange : limitRange
        }
        this.getCount();
        axios.post('/api/products/get/list', data)
        .then((response)=>{

            this.setState({
                tableData : response.data
            })
        })
        .catch((error)=>{
            console.log('error', error);
        })
    }
    
    publishAllProducts(event){
        event.preventDefault();        
        
        var data ={
            publishData:  _.pluck(this.state.tableData, '_id')
        };
       
        axios.put('/api/products/multiple', data)
        .then((response)=>{
            swal({
                text: 'Product published successfully',
            });
        })
        .catch((error)=>{
            swal({
                title: 'All products are published.',
            });
        });
        this.getData(this.state.startRange, this.state.limitRange);
    }
    getSearchText(searchText){ 
        axios.get("/api/products/get/search/"+searchText)
        .then((response)=>{ 
            this.setState({
                tableData : response.data,
                dataCount : response.data.length
            });
        })
        .catch((error)=>{
              console.log('error', error);
        })
    }

    filterProductCount(formValues){
        axios.post('/api/products/post/adminFilterProductsCount',formValues)
        .then((response)=>{
            this.setState({
                dataCount : response.data.dataCount
            },()=>{
            })
        })
        .catch((error)=>{
             console.log("error = ",error);
        })
    }
    handleChangeVendor(event){
        
        var currentSelection = event.element.getAttribute("id");
        var selector = this.state.selector;

        if (currentSelection == 'vendorChange') {
            selector.vendorIds = event.value;
        }
        if (currentSelection == 'sectionChange') {
            selector.sectionIds = event.value;
        }
        if (currentSelection == 'categoryChange') {
            selector.categoryIds = event.value;
        }
        if (currentSelection == 'statusChange') {
            selector.statusArray = event.value;
        }
        selector.startRange = this.state.startRange
        selector.limitRange = this.state.limitRange


        this.setState({selector: selector})
        this.filterProductCount(selector);

        //console.log(this.state.selector);
        axios.post('/api/products/post/list/adminFilterProducts',selector)
        .then((response)=>{
            this.setState({
                tableData : response.data
            })
            //this.getData(this.state.startRange, this.state.limitRange);
        })
        .catch((error)=>{
             console.log("error = ",error);
        })
    }
    selectedProducts(checkedProductsList){
        // console.log('checkedUsersList', checkedUsersList);
        this.setState({
        checkedProducts : checkedProductsList,
        })

        // console.log("this.state.checkedUser",this.state.checkedUser);
    }
    setunCheckedProducts(value){
        this.setState({
        unCheckedProducts : value,
        })
    }
    productBulkAction(event){

    }
    bulkActionChange(event){
        console.log(this.state.checkedProducts);
        this.setState({unCheckedProducts:false})
        $('#bulkActionModal').show();
        if (this.state.checkedProducts && this.state.checkedProducts.length>0) {
            $('.confirmmsg, #bulkActionModalbtn').show();
            $('.selectmsg').hide();
        }else{
            $('.selectmsg').show();
            $('#bulkActionModalbtn, .confirmmsg').hide();
            
        }
        
    }
    render(){
    
    // maps the appropriate column to fields property
    const fields: object = { text: 'vendor', value: 'id' };
    const sectionfields: object = { text: 'section', value: 'id' };
    const categoryfields: object = { text: 'category', value: 'id' };

    const statusArray = [];
    statusArray.push({status:"Publish"})
    statusArray.push({status:"Draft"})
    statusArray.push({status:"Unpublish"})

    const statusfields: object = { text: 'status', value: 'status' };
       
        return(
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <section className="content">
                            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                                <div className="row">
                                    <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                      <h4 className="NOpadding-right"> Product List</h4>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt">
                                        <div className="col-lg-3">     
                                            <div className="publishedBox" >
                                              <span className="publishedBoxIcon bg-aqua"><i className="fa fa-shopping-cart"></i></span>
                                              <div className="publishedBoxContent">
                                                <span className="publishedBoxtext">Total Products</span><br/>
                                                <span className="publishedBoxNumber">{this.state.productCountByStatus ? this.state.productCountByStatus[0].total : 0 }</span>
                                              </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">     
                                            <div className="publishedBox" >
                                              <span className="publishedBoxIcon bg-green"><i className="fa fa-shopping-cart"></i></span>
                                              <div className="publishedBoxContent">
                                                <span className="publishedBoxtext">Published Products</span><br/>
                                                <span className="publishedBoxNumber">{this.state.productCountByStatus ? this.state.productCountByStatus[0].totalPublish : 0 }</span>
                                              </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">     
                                            <div className="publishedBox" >
                                              <span className="publishedBoxIcon bg-redcolor"><i className="fa fa-shopping-cart"></i></span>
                                              <div className="publishedBoxContent">
                                                <span className="publishedBoxtext">Unpublished Products</span><br/>
                                                <span className="publishedBoxNumber">{this.state.productCountByStatus ? this.state.productCountByStatus[0].totalUnpublish : 0 }</span>
                                              </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">     
                                            <div className="publishedBox" >
                                              <span className="publishedBoxIcon bg-yellow"><i className="fa fa-shopping-cart"></i></span>
                                              <div className="publishedBoxContent">
                                                <span className="publishedBoxtext">Draft Products</span><br/>
                                                <span className="publishedBoxNumber">{this.state.productCountByStatus ? this.state.productCountByStatus[0].totalDraft : 0 }</span>
                                              </div>
                                            </div>
                                        </div>
                                        <div className="searchProductFromList col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTopp NoPadding">
                                            <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12 bulkEmployeeContent">
                                                <label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Bulk Action</label>
                                                <select className="form-control selectRole" ref="filterDropdown" name="filterDropdown" data-toggle="modal" data-target="#bulkActionModal" onChange={this.bulkActionChange.bind(this, "status")} style={{width:'200px'}} >
                                                    <option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" disabled selected>-- Select --</option>   
                                                    <option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" value="Publish">Publish selected products</option>
                                                    <option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" value="Draft">Draft selected products</option>
                                                    <option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" value="Unpublish">Unpublish selected products</option> 
                                                    <option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" value="Unpublish">Delete selected products</option>     
                                                </select>
                                            </div>  
                                            <div className="form-group col-lg-3 col-md-3 col-sm-6 col-xs-6 mt">
                                                <label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Vendor</label>
                                                <MultiSelectComponent id="vendorChange" dataSource={this.state.vendorArray}
                                                    change={this.handleChangeVendor.bind(this)}
                                                    fields={fields} placeholder="Select Vendor" mode="CheckBox"  selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                                    <Inject services={[CheckBoxSelection]} />
                                                </MultiSelectComponent>
                                            </div>
                                            <div className="form-group col-lg-3 col-md-3 col-sm-6 col-xs-6 mt">
                                                <label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Section</label>
                                                <MultiSelectComponent id="sectionChange" dataSource={this.state.sectionArray}
                                                    change={this.handleChangeVendor.bind(this)}
                                                    fields={sectionfields} placeholder="Select Section" mode="CheckBox"  selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                                    <Inject services={[CheckBoxSelection]} />
                                                </MultiSelectComponent>
                                            </div>
                                            <div className="form-group col-lg-3 col-md-3 col-sm-6 col-xs-6 mt">
                                                <label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Category</label>
                                                <MultiSelectComponent id="categoryChange" dataSource={this.state.categoryArray}
                                                    change={this.handleChangeVendor.bind(this)}
                                                    fields={categoryfields} placeholder="Select Category" mode="CheckBox"  selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                                    <Inject services={[CheckBoxSelection]} />
                                                </MultiSelectComponent>
                                            </div>    
                                            <div className="form-group col-lg-3 col-md-3 col-sm-6 col-xs-6 mt">
                                                <label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Status</label>
                                                <MultiSelectComponent id="statusChange" dataSource={statusArray}
                                                    change={this.handleChangeVendor.bind(this)}
                                                    fields={statusfields} placeholder="Select Status" mode="CheckBox"  selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                                    <Inject services={[CheckBoxSelection]} />
                                                </MultiSelectComponent>  
                                            </div>
                                            
                                            {/*<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 NOpadding">
                                                <div className="publishAllProductsClient" aria-hidden="true" data-toggle="modal" data-target={"#publishProduct"}>
                                                    Publish All Products
                                                </div> 
                                                <div className="modal fade col-lg-12 col-md-12 col-sm-12 col-xs-12" id={"publishProduct"} role="dialog">
                                                    <div className=" adminModal adminModal-dialog col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="modal-content adminModal-content col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
                                                            <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <h4 className="WightFont textAlignCenter col-lg-11 col-md-11 col-sm-11 col-xs-11">Publish All Product</h4>
                                                                <div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-12 NOpadding-left NOpadding-right">
                                                                    <button type="button" className="adminCloseButton" data-dismiss="modal" data-target={"publishProduct"}>&times;</button>
                                                                </div>
                                                            </div>
                                                            <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <h4 className="blackLightFont textAlignCenter col-lg-12 col-md-12 col-sm-12 col-xs-12">Are you sure you want to publish all products?</h4>
                                                            </div>

                                                            <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                    <button type="button" className="btn adminCancel-btn col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal">CANCEL</button>
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                    <button onClick={this.publishAllProducts.bind(this)} type="button" className="btn adminFinish-btn col-lg-4 col-lg-offset-7 col-md-4 col-md-offset-7 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal">PUBLISH</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>*/
                                        }
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <IAssureTable 
                                        tableHeading={this.state.tableHeading}
                                        twoLevelHeader={this.state.twoLevelHeader} 
                                        dataCount={this.state.dataCount}
                                        tableData={this.state.tableData}
                                        getData={this.getData.bind(this)}
                                        tableObjects={this.state.tableObjects}
                                        selectedProducts={this.selectedProducts.bind(this)}
                                        getSearchText = {this.getSearchText.bind(this)}
                                        setunCheckedProducts={this.setunCheckedProducts.bind(this)}
                                        unCheckedProducts={this.state.unCheckedProducts}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                            </div>
                            <div className="modal" id="bulkActionModal" role="dialog">
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h3 className="modalTitle">Bulk Action</h3>
                                  </div>
                                  <div className="modal-body">
                                    <div className="confirmmsg" style={{display:"none"}}>
                                        <label>Do you want to ?</label>
                                    </div>
                                    <div className="selectmsg" style={{display:"none"}}>
                                        <label>Please select products to perform bulk action</label>
                                    </div>
                                    <br/>
                                  </div>
                                  <div className="modal-footer">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                      <a href="#" className="btn btn-warning" id="bulkActionModalbtn" onClick={this.productBulkAction.bind(this)} >Yes</a>
                                      <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                    </div>
                </div>


            );
        }
    }
export default ProductList ;