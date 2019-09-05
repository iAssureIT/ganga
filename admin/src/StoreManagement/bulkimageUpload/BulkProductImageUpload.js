// import { Meteor }           from 'meteor/meteor';
// import { Mongo }            from 'meteor/mongo';
// import React, { Component } from 'react';
// import { render }           from 'react-dom';
// import TrackerReact         from 'meteor/ultimatejs:tracker-react';
// import { createContainer }  from 'meteor/react-meteor-data';
// import Validation           from 'react-validation';
// import validator            from 'validator';
// import {Tracker}            from 'meteor/tracker';
// import { browserHistory }   from 'react-router';
// import { ProductShop }      from '/imports/StoreManagement/product/addNewProduct/AddNewDispalyProduct/ProductMaster.js'
// import {withTracker}        from 'meteor/react-meteor-data';
// import swal from 'sweetalert';


import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import ReactTable             from "react-table";
// import IAssureTable           from "../../IAssureTable/IAssureTable.jsx";
import swal                   from 'sweetalert';
import _                      from 'underscore';
class BulkProductImageUpload extends Component{
	constructor(props){
        super(props);
        this.state = {
            'allshopproductimages': [],
            'notuploadedImages':[],
        }
    }

    componentDidMount() {
        // if(!$("link[href='/css/dashboard.css']").length > 0){
        //     var dashboardCss = document.createElement("link");
        //     dashboardCss.type="text/css";
        //     dashboardCss.rel ="stylesheet";
        //     dashboardCss.href="/css/dashboard.css";
        //     document.head.append(dashboardCss);
        // }
    
        // Meteor.subscribe('projectSettings');

        // this.bulkimagestracketr = Tracker.autorun(()=>{
        //   var handle = Meteor.subscribe('productShopPublish');
        //   var allproductImages = ProductShop.find({}).fetch();
          
        //   if(allproductImages){
        //       this.setState({
        //         'allshopproductimages':allproductImages,
        //       });
        //   }else{
        //     this.setState({
        //       'allshopproductimages':[],
        //     });
        //   }
        // });

    }
    componentWillReceiveProps(nextProps){
      this.setState({
        'allshopproductimages':nextProps.productData,
      });
    }
    bulkuplodaProductImages(event){
      event.preventDefault();
      // Session.set('addProductImgsBulkUploadToS3Function',"");
      // var filesupload = event.target.files;
      // // // console.log("this: ",this);
      
      // let self = this;
      // var notUploadedImg = [];
      // // var currentUpload = 0;
      // for (var i = 0; i < filesupload.length; i++) {
      //   // currentUpload = i;
      
      //   if (event.currentTarget.files[i]) {
      //     var dataImg =event.currentTarget.files[i];

      //     var fileName     = filesupload[i].name;
      //     var splitFileName= fileName.split("-");
      //     var productCode  = splitFileName[0];

      //     if((dataImg.type == "image/jpeg" || dataImg.type == "image/png")&&splitFileName.length==2){
      //         addProductImgsBulkUploadToS3Function(filesupload[i],self,productCode);
      //     } else {
      //       notUploadedImg.push(fileName);
      //     }
      //   } 
      // }

      
      

      // this.setState({
      //   "notuploadedImages": notUploadedImg,
      // });
      //   $('.bulkuplodaProductImagesInp').val("");
      
    }

  

    getUploadBulUSPercentage(){
      // var uploadProgressPercent = Session.get("addProductImgsBulkUploadToS3Function");
      // if(uploadProgressPercent){
      //     var percentVal = parseInt(uploadProgressPercent);
      //     if(percentVal){
              
      //         var styleC = {
      //             width:percentVal + "%",
      //             display:"block",
      //         }
      //         var styleCBar = {
      //             display:"block",
      //             marginTop:5,
      //         }
      //     }
      //     if(!percentVal){
      //         var percentVal = 0;
  
      //         var styleC = {
      //             width:0 + "%",
      //             display:"none",
      //         }
      //         var styleCBar = {
      //             display:"none",
      //             marginTop:5,
      //         }
      //     }
      //     console.log('percentVal',percentVal);
      //     if(percentVal == 100){
      //       return(
      //           <div></div>
      //         );
      //     }else{
      //       return (
      //         <div>
      //             <div className="progress"  style= {styleCBar}>
      //                 <div className="progress-bar progress-bar-striped active" role="progressbar"
      //               aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style= {styleC}>
      //                 {percentVal} %
      //                 </div>
      //             </div>
      //         </div>
      //       );  
      //     }          
      // }
    }


    

    deleteproductImages(event){
      event.preventDefault();
      // var imageUrl = $(event.currentTarget).attr('data-currentindex');
      // var productId   = $(event.currentTarget).attr('data-productid');
     
      // if(imageUrl && productId){
      //   Meteor.call('deleteShopProductImage',productId,imageUrl);
      // }
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
                        Product Image Bulk Upload                      
                     </div>
                    <hr className="hr-head container-fluid row"/>
                  </div>
                  <form className="addRolesInWrap newTemplateForm">
                    <div className="row inputrow">
                      <div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category imageuploadtitle">
                            Upload Product Shop Images 
                          </label>
                          <input type="file" className="form-control bulkuplodaProductImagesInp" multiple onChange ={this.bulkuplodaProductImages.bind(this)}/>
                          <div>{this.getUploadBulUSPercentage()}</div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 upldImgTextColor">
                      Image name must be saved in format <span className="upldImgTextColor1">Your Product Code</span> - <span className="upldImgTextColor2">Image Number for that product. </span>
                      eg. Cubiscan150TS-1, Cubiscan150TS-2, Cubiscan200TS-1, ... etc.
                    </div>
                    <div className="col-lg-12">
                      {
                        this.state.notuploadedImages.length > 0 ?

                          <div className="notBlkUplImgListOuter">
                            <div className="notBlkUplImgListTitle">
                              Images not Uploaded
                            </div>
                            {
                              this.state.notuploadedImages.map((data, index)=>{
                                return (
                                  <div className="notBlkUplImgList" key={index}> 
                                    {data}
                                  </div>
                                );
                              })
                            }
                          </div>

                        :

                        ""

                      } 
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    <div className="create-email-template-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div>
                        <div className="HRMSWrapper col-lg-12">
                          <table className="table iAssureITtable-bordered table-striped table-hover">
                            <thead className="tempTableHeader">
                              <tr >
                                <th className="col-lg-1 umDynamicHeader srpadd">Sr no.</th>
                                <th className="col-lg-2 umDynamicHeader srpadd">Product Code</th>
                                <th className="col-lg-2 umDynamicHeader srpadd">Product Name</th>
                                <th className="col-lg-7 umDynamicHeader srpadd">Images</th>
                              </tr>
                            </thead>
                            <tbody>
                              {  
                                this.state.allshopproductimages.map((data,index)=>{
                                  return(
                                    <tr key ={index}>
                                      <td> {index+1}     </td>
                                      <td> {data.productCode}    </td>
                                      <td> {data.productName}    </td>
                                      <td>
                                      {
                                        data.productImage.length > 0 ? 
                                          <div className="deleteimagewrapper bulkimagebg">  
                                            {  
                                              data.productImage.map((imgdata,index)=>{
                                                return(
                                                  <div className="col-lg-3 deleteImgBlkUpldCol-lg-3" key={index}>
                                                    <i className="fa fa-times deleteImgBlkUpld" aria-hidden="true" data-productid={data._id} data-currentindex={imgdata} onClick={this.deleteproductImages.bind(this)}></i>
                                                    <img src={imgdata} className="img-thumbnail"/>
                                                  </div>
                                                );
                                              })
                                            }
                                          </div>
                                        :
                                        <div className="bulkImgUpldNotShown">
                                          No Images Available
                                        </div>
                                      }
                                      </td>
                                    </tr> 
                                  )
                                })
                              }   
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    {/*<IAssureTable 
                      tableHeading={this.state.tableHeading}
                      twoLevelHeader={this.state.twoLevelHeader} 
                      dataCount={this.state.dataCount}
                      tableData={this.state.tableData}
                      getData={this.getData.bind(this)}
                      tableObjects={this.state.tableObjects}
                    />*/}
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
export default BulkProductImageUpload ;
// = withTracker(props =>{
//   const productHandle     = Meteor.subscribe("productShopPublish");
//   const productData       = ProductShop.find({},{fields:{productCode:1, productImage:1, productName:1}}).fetch();
//   const loading1          = !productHandle.ready();
// return{
//   productData
// };
// })(BulkProductImageUpload);