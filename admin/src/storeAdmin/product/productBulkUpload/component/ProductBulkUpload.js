// import { Meteor }               from 'meteor/meteor';
// import { Mongo }                from 'meteor/mongo';
// import React, { Component }     from 'react';
// import { render }               from 'react-dom';
// import TrackerReact             from 'meteor/ultimatejs:tracker-react';
// import { createContainer }      from 'meteor/react-meteor-data';
// import Validation               from 'react-validation';
// import validator                from 'validator';
// import {Tracker}                from 'meteor/tracker';
// import { browserHistory }       from 'react-router';
// import { Session }              from 'meteor/session';
// import swal                     from 'sweetalert';
// import { FlowRouter }           from 'meteor/ostrio:flow-router-extra';
// import {withTracker}            from 'meteor/react-meteor-data';
// import { ProductShop }          from '/imports/StoreManagement/product/addNewProduct/AddNewDispalyProduct/ProductMaster.js';
// import { Suppliers }            from '/imports/StoreManagement/SupplierManagement/supplierOnboarding/api/apiSupplierOnboardingForm.js';

import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import ReactTable             from "react-table";
// import IAssureTable           from "../../IAssureTable/IAssureTable.jsx";
import swal                   from 'sweetalert';
import XLSX                   from "xlsx";
import _                      from 'underscore';
//import ProductList            from '../../StoreManagement/productList/component/ProductList.js'; 
//import ProductList            from '../product/productList/component'; 

class AddNewBulkProduct extends Component{
    constructor(props) {
        super(props);

        this.state = {
            "currentProducts" : [],
            "vendor"          : [],
            "productData"     : [],
            "file"            : props&&props.fileData&&props.fileData[0]?props.fileData[0].fileName:'',
            "finalData"       : []
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.productData){
            this.setState({
                productData : nextProps.productData
            },()=>{
                // console.log('productData', this.state.productData);
            });
        }
        if(nextProps.fileData  && nextProps.fileData.length>0){
            var file = nextProps.fileData[0].fileName;
            var productData = nextProps.productData;

            function checkAdult(data) {
              return data.fileName == file;
            }
            var x = productData.filter(checkAdult);
            // console.log('x',x);

            this.setState({
                productData : x
            });
        }
    }

    componentDidMount() {
        
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

    uploadBulkProduct(event){
        event.preventDefault();
      //   UserSession.delete("progressbarSession", Meteor.userId());
      //   UserSession.delete("allProgressbarSession", Meteor.userId());

      //   var file = event.target.files[0];
      //   console.log('file',file.name);

      //   Papa.parse( event.target.files[0], {
		    // header: true,
		    // complete( results) {
      //           console.log('results',results);
		    // 	Meteor.call( 'BulkShopProductCSVUpload', results.data, file.name, ( error, result ) => {
      //           	if ( error ){
      //                   console.log('error',error);
      //                   swal({
      //                       type: 'warning',
      //                       title: 'Please check csv file format ',
      //                       text: 'Please check csv file format',
      //                       showConfirmButton: true,
      //                       // timer: 5000
      //                   });
      //    			} else {
      //                   // // console.log("result = " + result);
      //                   if(result.indexOf("101")>=0){
      //                       let errcode = result.split("-");
      //                       if(errcode[0] == "101"){
      //                           swal({
      //                               position: 'top-right',
      //                               type: 'warning',
      //                               title: 'Please remove "-" from ProductCode of Product Serial Number ' + errcode[1].trim(),
      //                               text: 'Please remove "-" from ProductCode of Product Serial Number ' + errcode[1].trim(),
      //                               showConfirmButton: true,
      //                               // timer: 5000
      //                           });
      //                           $(".adminBlkUpldBkg").val('');
      //                           // setTimeout(()=>{ 
      //                           //     UserSession.delete("progressbarSession", Meteor.userId());
      //                           //     UserSession.delete("allProgressbarSession", Meteor.userId());
      //                           // }, 8000);
      //                       }                            
      //                   }else{
      //                       swal({
      //                           position: 'top-right',
      //                           type: 'success',
      //                           title: 'Products Added Successfully',
      //                           text: 'Products Added Successfully',
      //                           showConfirmButton: false,
      //                           timer: 1500
      //                       });
    
      //                       $(".adminBlkUpldBkg").val('');
      //                       setTimeout(()=>{ 
      //                           UserSession.delete("progressbarSession", Meteor.userId());
      //                           UserSession.delete("allProgressbarSession", Meteor.userId());
      //                       }, 8000);
      //                   }
                       
      //    			}
      // 			});

		    // }
      //   });


    }
    publishAllProducts(event){
        event.preventDefault();        
        // Meteor.call("publishAllShopProducts", (error, result)=>{
        //     if(result){
        //         swal({
        //             position: 'top-right',
        //             type: 'success',
        //             title: 'All Products published successfully',
        //             text: 'All Products published successfully',
        //             showConfirmButton: false,
        //             timer: 1500
        //         });
        //     }
        // });
    }
    changeProductList(event){
        var inputText = $(event.currentTarget).val();

        // if(inputText){
        //     Session.set("inputProductSearch",inputText);
        // } else {
        //     Session.set("inputProductSearch","");
        // }
    }

    deleteProduct(event){
        event.preventDefault();
        // var id = $(event.currentTarget).attr("data-productId");
        // if(id){
        //     Meteor.call("deleteListShopProduct",id, (error, result)=> {
        //         if(error){

        //         } else {
        //             swal({
        //                 position: 'top-right',
        //                 type: 'success',
        //                 text: 'Product Deleted Successfully',
        //                 title: 'Product Deleted Successfully',
        //                 showConfirmButton: false,
        //                 timer: 1500
        //             });
        //             $('.modal-backdrop').hide();

        //         }
        //     });
        // }
    }

    editUniqueProduct(event) {
        // var prodId = $(event.currentTarget).attr('data-prodId');
        // FlowRouter.go('/admin/products/AddNewShopProduct/' + prodId);
        // browserHistory.replace(path);
    }

    changeFeatured(event){
        event.preventDefault();
        // var statusVal = $(event.currentTarget).attr('data-status');
        // var prodVal  = $(event.currentTarget).attr('data-prodVal');


        // if(prodVal){
        //     if(statusVal=="true"){
        //         statusVal = false;
        //         Meteor.call('updateShopProductFeatured', prodVal, statusVal);
        //     } else {
        //         statusVal = true;
        //         Meteor.call('updateShopProductFeatured', prodVal,statusVal);
        //     }
        // }
    }

    changeExclusive(event){
        event.preventDefault();
        // var statusVal = $(event.currentTarget).attr('data-status');
        // var prodVal  = $(event.currentTarget).attr('data-prodVal');
        // if(prodVal){
        //     if(statusVal=="true"){
        //         statusVal = false;
        //         Meteor.call('updateShopProductExclusive', prodVal, statusVal);
        //     } else {
        //         statusVal = true;
        //         Meteor.call('updateShopProductExclusive', prodVal, statusVal);
        //     }
        // }
    }
    
    selectFile(event){
        event.preventDefault();
        // const target = event.target;
        // const name   = target.name;
        // this.setState({
        //     [name]: event.target.value,
        // });

        
        // var selectedFile = this.refs.file.value;
        // // console.log('selectedFile',selectedFile);

        // var productData = this.props.productData;
        // var ages = [3, 10, 18, 20];

        // function checkAdult(data) {
        //   return data.fileName == selectedFile;
        // }
        // var x = productData.filter(checkAdult);
        // // console.log('x',x);

        // this.setState({
        //     productData : x
        // });

    }
    handleChange(e) {
        const files = e.target.files;
        if (files && files[0]) this.handleFile(files[0]);
    }
    handleFile(file) {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = ({ target: { result } }) => {
          const wb = XLSX.read(result, { type: rABS ? "binary" : "array" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 }); 


            var documentObj = [];
            let count = 0;    
              this.setState({inputFileData:data},()=>{
                /*var productCodeArray = [];
                for (var j=1; j <= this.state.inputFileData.length; j++){
                    var record = this.state.inputFileData[j];
                    let header = this.state.inputFileData[0];
                    if (record !== undefined) {
                        productCodeArray.push(record[header.indexOf('productCode')]);
                    }
                } 
                productCodeArray = productCodeArray.filter((item, i, ar) => ar.indexOf(item) === i);
                console.log('productCodeArray',productCodeArray)*/

                var featuresArray = [];  
                var productCode = '';
                
                productCode = this.state.inputFileData[1][this.state.inputFileData[0].indexOf('productCode')];
                // loop on all the records in sheet
                for (var j=1; j <= this.state.inputFileData.length; j++){          
                  var record = this.state.inputFileData[j];
                  if (j==1) {
                    var previousRecord = this.state.inputFileData[j];
                  }else{
                    var previousRecord = this.state.inputFileData[j-1];
                  }
                  
                  let header = this.state.inputFileData[0];
                  
                    if (record !== undefined) {
                        var k;
                        // loop on header columns
                        for(k in header){
                            if (!documentObj.hasOwnProperty(count)) {
                                if (header[k]=='featureList') {
                                    
                                }else{
                                    documentObj.push({[header[k]]:record[k]});
                                }
                            }else{ 
                                if (header[k]=='featureList') {
                                    if (record[k] != undefined) {
                                        featuresArray = record[k].split(';');
                                    }
                                    
                                    //featuresArray.push(record[k]);
                                    documentObj[count][header[k]] = featuresArray; 
                                } else{
                                    documentObj[count][header[k]] = record[k];
                                }
                            }
                        }
                        if (record[header.indexOf('webCategory')] != undefined) {
                            featuresArray = [];
                            count++;
                        } 
                    }
                }
                
                this.setState({finalData:documentObj},()=>{
                     console.log(this.state.finalData);
                });
            });
        };
        if (rABS) reader.readAsBinaryString(file);
        else reader.readAsArrayBuffer(file);
        $('.submitBtn').prop('disabled',false);
       
    }

    enableBulkUpload(){
        $('.adminBlkUploadBtn').prop('disabled',false);
    }
    bulkUpload(){
        
        var formValues = this.state.finalData;
        axios.post('/api/products/post/bulkUploadProduct', formValues)
        .then((response)=>{
            console.log('response', response);
            swal({
                    title : response.data.message,
                    text  : response.data.message,
                  });
        })
        .catch((error)=>{
            console.log('error', error);
        })
    }
    render(){
        const SheetJSFT = [
              "xlsx",
              "xls"
        ]

        return(
            <div className="container-fluid col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div className="row">
                <section className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    <div className="content">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                    <div className="box col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    <div className="box-header with-border">
                    <h4 className="weighttitle">Product Bulk Upload</h4>
                    </div>

                    <div className="">
                    <div className=" col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding">
                        <div className="col-lg-3 col-md-3 col-xs-3 col-sm-3 NOpadding" onClick={this.enableBulkUpload.bind(this)}>
                            <a className="videocard" href="/products.xlsx" title="Click to Download" download><div className="publishAllProductsClient">
                            SAMPLE DATA FORMAT
                            </div></a>
                        </div>
                    <div className="addRolesInWrap col-lg-12 col-md-12 col-xs-12 col-sm-12">

                    <div className="upldProdFileHere"> Upload Your Product File Here:</div>

                    <div className="input-group">
                    <span className="adminBlkUpldIcon input-group-addon" id="basic-addon1"><i className="fa fa-cloud-upload" aria-hidden="true"></i></span>
                    <input className="adminBlkUpldBkg form-control adminBlkUploadBtn"
                                                  ref={this.fileInput}
                                                  type="file"
                                                  accept={SheetJSFT}
                                                  onChange={this.handleChange.bind(this)}
                                                />
                    </div>

                    <div className="upldProdFileInstPre"> 
                    <strong className="upldProdFileInst">Instructions</strong>
                    <ul> 
                    <li> File Type must be CSV file - Comma Separated Values. CSV file can be edited in Excelsheets. </li>
                    <li> Please make sure that Product Code should not have hyphen "-" in it. </li>
                    </ul>
                    </div>
                    <button className="submitBtn btn btnSubmit col-lg-2 col-lg-offset-10 col-md-2 col-md-offset-10 col-sm-3 col-sm-offset-9 col-xs-3 col-xs-offset-9" onClick={this.bulkUpload.bind(this)}>Submit</button>
                    
                    </div>
                    </div>
                    <div className="col-lg-12">
                    {this.showProgressBar(this)}
                    </div>

                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addRolesInWrap">
                    <div className="searchProductFromList row">

                    <div className="col-lg-4 pull-left">

                    <div className="publishAllProductsClient" aria-hidden="true" data-toggle="modal" data-target={"#publishProduct"}>
                    Publish All Products
                    </div>
                    <div className="modal fade col-lg-12 col-md-12 col-sm-12 col-xs-12" id={"publishProduct"} role="dialog">
                    <div className=" modal-dialog adminModal adminModal-dialog col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="modal-content adminModal-content col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
                    <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h4 className="WightFont textAlignCenter col-lg-11 col-md-11 col-sm-11 col-xs-11">publish All Product</h4>
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

                    </div>
                    {
                    /*<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 add-new-productCol">
                    <label>File Name<i className="redFont"></i></label>
                    <select className="form-control" ref="file" id="file" name="file" value={this.state.file} onChange={this.selectFile.bind(this)}>                                                      
                    {
                    this.props.fileData && this.props.fileData.length>0 ?
                    this.props.fileData.map((data, index)=>{
                    if(index == 0){
                    return (
                    <option key={index} selected value={data.fileName}>{data.fileName}</option>
                    );
                    }else{
                    return (
                    <option key={index} value={data.fileName}>{data.fileName}</option>
                    );
                    }

                    })
                    :
                    <option value="SelectFile">Select File</option>
                    }
                    </select>
                    </div>*/
                    }
                    <div className="col-lg-4 pull-right">
                    <label>Search<i className="redFont"></i></label>
                    <input type="text" className="search-prod-list-box form-control" placeholder="Search" onChange={this.changeProductList.bind(this)} />
                    </div>
                    </div>
                    <div className="all-product-list">
                    <table className="table iAssureITtable-bordered table-striped table-hover">
                    <thead className="tempTableHeader">
                    <tr>
                    <th className="col-lg-1 umDynamicHeader srpadd whiteSpace">Product Code</th>
                    <th className="col-lg-6 umDynamicHeader srpadd">Product Name</th>

                    <th className="col-lg-1 umDynamicHeader srpadd">Featured</th>
                    <th className="col-lg-1 umDynamicHeader srpadd">Exclusive</th>
                    <th className="col-lg-1 umDynamicHeader srpadd">Status</th>
                    <th className="col-lg-2 umDynamicHeader srpadd">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.productData && this.state.productData.length > 0 ?
                    this.state.productData.map((listData, index)=>{
                    return(
                    <tr key={index}>
                    <td className="col-lg-1">{listData.productCode}</td>
                    <td className="col-lg-6">
                    <div>
                    {listData.productName}
                    {/* <span className="viewMore-pruduct-desc"  aria-hidden="true" data-toggle="modal" data-target={"#openViewMoreModal"+listData._id} title="view More..." > View More...</span> */}
                    {/*<div className="prod-list-desc-admin">
                    {listData.shortDescription}
                    </div>*/}
                    </div>
                    </td>

                    <td className="col-lg-1 textAlignCenter">
                    <i onClick={this.changeFeatured.bind(this)} data-prodVal={listData._id} data-status={listData.featured} title={( listData.featured ? "Disable It" : "Enable It" )} className={'fa fa-check-circle prodCheckboxDim ' + ( listData.featured ? "prodCheckboxDimSelected" : "prodCheckboxDimNotSelected" )} aria-hidden="true"></i>
                    </td>
                    <td className="col-lg-1 textAlignCenter">
                    <i onClick={this.changeExclusive.bind(this)} data-prodVal={listData._id} data-status={listData.exclusive} title={( listData.exclusive ? "Disable It" : "Enable It" )}  className={'fa fa-check-circle prodCheckboxDim ' + ( listData.exclusive ? "prodCheckboxDimSelected" : "prodCheckboxDimNotSelected" )} aria-hidden="true"></i>
                    </td>
                    <td className="col-lg-1">
                    <div onClick={this.changeStatusOfProd.bind(this)} data-prodId={listData._id} className={( listData.status == ("Unpublish") ? ("prodStatUnpublish") : (listData.status == ("Publish") ? ("prodStatPublish") : ("prodStatDraft")) )} data-pubVal={( listData.status == ("Unpublish") ? ("prodStatUnpublish") : (listData.status == ("Publish") ? ("prodStatPublish") : ("prodStatDraft")) )} title={( listData.status == ("Unpublish") ? ("Click To Publish") : (listData.status == ("Publish") ? ("Click To Unpublish") : ("Click To Publish")) )} >
                    {(listData.status == ("Unpublish") ? ("Unpublished") : (listData.status == ("Draft") ? ("Draft") : ("Publish")))}
                    </div>
                    </td>
                    <td className="col-lg-2 textAlignCenter">

                    <a href={"/productShopdetails/"+listData.category+"/"+listData.subCategory+"/"+listData.productUrl} className="" title="View" data-prodId={listData._id}>
                    <i className="fa fa-eye" aria-hidden="true"></i>
                    </a> &nbsp;&nbsp;
                    <i className="fa fa-pencil" aria-hidden="true" title="Edit" onClick={this.editUniqueProduct.bind(this)} data-prodId={listData._id}></i>

                    &nbsp;&nbsp;

                    <i className="fa fa-trash redFont" aria-hidden="true" title="Delete"  aria-hidden="true" data-toggle="modal" data-target={"#openDeleteModal"+listData._id}></i>


                    <div className="modal fade col-lg-12 col-md-12 col-sm-12 col-xs-12" id={"openDeleteModal"+listData._id} role="dialog">
                    <div className=" modal-dialog adminModal adminModal-dialog col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="modal-content adminModal-content col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
                    <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="adminCloseCircleDiv pull-right  col-lg-1 col-lg-offset-11 col-md-1 col-md-offset-11 col-sm-1 col-sm-offset-11 col-xs-12 NOpadding-left NOpadding-right">
                    <button type="button" className="adminCloseButton" data-dismiss="modal" data-target={"openDeleteModal-"+listData._id}>&times;</button>
                    </div>
                    </div>
                    <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h4 className="blackLightFont textAlignCenter col-lg-12 col-md-12 col-sm-12 col-xs-12">Are you super you want to delete the product?</h4>
                    </div>

                    <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <button type="button" className="btn adminCancel-btn col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal">CANCEL</button>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <button onClick={this.deleteProduct.bind(this)} data-productId={listData._id} id={listData._id} type="button" className="btn adminFinish-btn col-lg-4 col-lg-offset-7 col-md-4 col-md-offset-7 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal">DELETE</button>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>

                    </td>
                    </tr>
                    );
                    })
                    :
                    null
                    }


                    </tbody>
                    </table>
                    </div>
                    </div>
                    </div>
                    </div>

                    </div>

                    </div>
                    </div>
                </section>
                </div>
            </div>
        );
    }
}
export default AddNewBulkProduct;

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