import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import _ from 'underscore';
import ProductList from '../../productList/component/ProductList.js';
import { withRouter } from 'react-router-dom';
import BulkUploadComponent from './BulkUploadComponent';
import XLSX from "xlsx";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import  '../css/productBulkUpload.css'

class AddNewBulkProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "currentProducts": [],
            "productData": [],
            "file": props && props.fileData && props.fileData[0] ? props.fileData[0].fileName : '',
            
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.productData) {
            this.setState({
                productData: nextProps.productData
            }, () => {
                // console.log('productData', this.state.productData);
            });
        }
        if (nextProps.fileData && nextProps.fileData.length > 0) {
            var file = nextProps.fileData[0].fileName;
            var productData = nextProps.productData;

            function checkAdult(data) {
                return data.fileName == file;
            }
            var x = productData.filter(checkAdult);
            // console.log('x',x);

            this.setState({
                productData: x
            });
        }
    }

    componentDidMount() {
        this.getVendorList();
        // var dbdata = [];
        // dbdata.push({name: "section", type: "string", label:"Section"})
        // dbdata.push({name: "category", type: "string", label:"Category"})
        // dbdata.push({name: "subCategory", type: "string", label:"Subcategory" })
        // dbdata.push({name: "brand", type: "string", label:"Brand"})
        // dbdata.push({name: "productCode", type: "string", label:"Product Code"})
        // dbdata.push({name: "itemCode", type: "string", label:"Item Code"})
        // dbdata.push({name: "productName", type: "string", label:"Product Name"})
        // dbdata.push({name: "productDetails", type: "string", label:"Product Details"})
        // dbdata.push({name: "shortDescription", type: "string", label:"Short Description"})
        // dbdata.push({name: "featureList", type: "string", label:"Feature List"})
        // dbdata.push({name: "currency", type: "string", label:"Currency"})
        // dbdata.push({name: "originalPrice", type: "number", label:"Original Price"})
        // dbdata.push({name: "discountPercent", type: "number", label:"Discount Percent"})
        // dbdata.push({name: "discountedPrice", type: "number", label:"Discounted Price"})
        // dbdata.push({name: "availableQuantity", type: "number", label:"Available Quantity"})
        // dbdata.push({name: "unit", type: "string", label:"Unit"})
        // dbdata.push({name: "size", type: "string", label:"Size"})
        // dbdata.push({name: "color", type: "string", label:"Color"})
        // dbdata.push({name: "exclusive", type: "string", label:"Does this product is Exclusive"})
        // dbdata.push({name: "featured", type: "string", label:"Does this product Featured"})
        // dbdata.push({name: "taxInclude", type: "string", label:"Does Tax Include"})
        // dbdata.push({name: "taxRate", type: "string", label:"Tax Rate"})

        // this.setState({
        //   dbdata: dbdata
        // })
        //console.log('dbdata',this.state.dbdata);  
    }

    componentWillUnmount() {

    }


    showProgressBar() {
        // var getPercernt = UserSession.get("progressbarSession",Meteor.userId());
        // var allPercernt = UserSession.get("allProgressbarSession",Meteor.userId());

        // if(getPercernt && allPercernt){
        //     var total = getPercernt/allPercernt*100;
        //     total = parseInt(total);
        //     var styleC = {
        //         width:total + "%",
        //         display:"block",
        //     }
        //     var styleCBar = {
        //         display:"block",
        //     }
        // }
        // if(!getPercernt){
        //     var total = 0;

        //     var styleC = {
        //         width:0 + "%",
        //         display:"none",
        //     }
        //     var styleCBar = {
        //         display:"none",
        //     }
        // }
        // // console.log('total',total);
        // if(total == 100){
        //     return (
        //         <div></div>
        //     );
        // }else{
        //     return (
        //         <div>
        //             <div className="progress"  style= {styleCBar}>
        //                 <div className="progress-bar progress-bar-striped active" role="progressbar"
        //                 aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style= {styleC}>
        //                     {total} %
        //                 </div>
        //             </div>
        //         </div>
        //     );
        // }
    }
    
    
    selectOption(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value
        });
    }
    getVendorList() {
        axios.get('/api/vendors/get/list')
            .then((response) => {
                this.setState({
                    vendorArray: response.data
                })
            })
            .catch((error) => {

            })
    }
    render() {

        const SheetJSFT = [
            "xlsx",
            "xls"
        ]

        return (
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-right">
            <section className="content">
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                <div className="row">
                    <div className="addNewProductWrap col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol">
                        <div className="box">
                            <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                <h4 className="NOpadding-right">Product Bulk Upload</h4>
                            </div>
                        </div>
                        {
                            localStorage.getItem('role') == 'superAdmin' ? 
                            <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pull-right" >
                                <a href="/template-management"><button type="button" className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 addexamform clickforhideshow">Add Template</button></a>
                            </div>
                            : null
                        }
                        <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 inputFields marginTopp">
                            <label>Vendor <i className="redFont">*</i></label>
                            <select onChange={this.selectOption.bind(this)} value={this.state.vendor} name="vendor" className="form-control allProductCategories" aria-describedby="basic-addon1" id="vendor" ref="vendor">
                                <option disabled selected defaultValue="">Select Vendor</option>
                                <option value={localStorage.getItem("admin_ID")} >Admin</option>
                                {this.state.vendorArray && this.state.vendorArray.length > 0 ?
                                    this.state.vendorArray.map((data, index) => {
                                        return (
                                            <option key={index} value={data._id}>{data.companyName} - ({data.vendorID})</option>
                                        );
                                    })
                                    :
                                    <option disabled>{"No vendor added"}</option>
                                }
                            </select>
                            {this.state.vendor ? null : <span>Please select a vendor for bulk upload</span>}
                        </div>
                        {

                            /*<div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 inputFields marginTopp">
                                <label>Categroy <i className="redFont">*</i></label>
                                <select onChange={this.selectOption.bind(this)} value={this.state.vendor} name="vendor" className="form-control allProductCategories" aria-describedby="basic-addon1" id="vendor" ref="vendor">
                                    <option disabled selected defaultValue="">Select Category</option>
                                    <option value={localStorage.getItem("admin_ID")} >Admin</option>
                                    {this.state.categoryArray && this.state.categoryArray.length > 0 ?
                                        this.state.categoryArray.map((data, index) => {
                                            return (
                                                <option key={index} value={data._id}>{data.companyName} - ({data.vendorID})</option>
                                            );
                                        })
                                        :
                                        <option disabled>{"No vendor added"}</option>
                                    }
                                </select>
                                {this.state.category ? null : <span>Please select category to export excel file template</span>}
                            </div>*/
                        }
                        <br/>
                    </div>
                    {
                       this.state.vendor ?
                        <BulkUploadComponent url="http://localhost:5006/api/states/post/bulkinsert" 
                            fileurl="./products.xlsx"
                            fileDetailUrl="http://localhost:5006/api/products/get/filedetails/"
                            />   : null    
                        
                    }
                </div>
            </div>
        </section>
      </div>
        );
    }
}
export default withRouter(AddNewBulkProduct);

// AddNewBulkProduct = withTracker(props => {
//     var vendorData          = [];
//     const productHandle     = Meteor.subscribe("productShopPublish");
//     const productData       = ProductShop.find({},{sort: {dateAdded: -1}}).fetch();
//     const fileDatas         = ProductShop.find({},{sort: {dateAdded: -1}},{fields:{"fileName" : 1}}).fetch();
//     const loading1          = !productHandle.ready();

//     var fileData = Array.from(new Set(fileDatas.map(x => x.fileName))).map(
//     fileName =>{
//         return{
//             fileName: fileName,
//             _id     : fileDatas.find(s => s.fileName === fileName)._id
//         };
//     });
//     console.log('fileData',fileData);
//     const vendorHandle      = Meteor.subscribe("allSupplierList");
//     if(Roles.userIsInRole(Meteor.userId(), ['Vendor'])){
//         vendorData        = Suppliers.find({"OwnerId":Meteor.userId()}).fetch();
//     }else{
//         vendorData        = Suppliers.find({}).fetch();
//     }
//     const loading2          = !vendorHandle.ready();
//     return {
//         productData,
//         vendorData,
//         fileData
//     };    
// })(AddNewBulkProduct);