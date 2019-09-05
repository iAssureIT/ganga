import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import ReactTable             from "react-table";
import IAssureTable           from "../../../../coreAdmin/IAssureTable/IAssureTable.jsx";
import swal                   from 'sweetalert';
import _                      from 'underscore';

axios.defaults.baseURL = 'http://gangaexpressapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';
class FileWiseProductList extends Component{
    constructor(props) {
      super(props);
      this.state = {
          fileNameNCountData : [],
          tableHeading:{
            "fileName"     : "File Name",
            "productCount" : "Product Count",
            "actions" : "Action"
          },
          "tableObjects"              : {
              deleteMethod              : 'delete',
              apiLink                   : '/api/products/file',
              paginationApply           : true,
              searchApply               : true,
            },
          startRange : 0,
          limitRange : 10
      };
      window.scrollTo(0, 0);
    }
    componentWillReceiveProps(nextProps) {
      this.getCount();
        this.getData(this.state.startRange, this.state.limitRange);
        
    }
    componentDidMount() {
      this.getCount();
      this.getData(this.state.startRange, this.state.limitRange);
      
    }
    deleteFileWiseProduct(event){
        // var id = $(event.currentTarget).attr("data-productId");
        // console.log("id",id);
        // if(id){
        //     Meteor.call("deleteFileWiseListShopProduct",id, (error, result)=> {
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
    getData(startRange, limitRange){
      var data = {
        startRange : startRange,
        limitRange : limitRange
      }
      axios.post('/api/products/get/files', data)
      .then((response)=>{
        console.log(response.data)
        var tableData = response.data.map((a, i)=>{
          return {
            fileName: a.fileName != null ? a.fileName : "-", 
            productCount: a.productCount != NaN ? "<p>"+a.productCount+"</p>" : "a", 
            _id: a._id != null ? a._id : "-"
          }
        })
        console.log('tableData', tableData)
        this.setState({
          tableData : tableData
        })
      })
      .catch((error)=>{
        console.log('error', error);
      })
    }
    getCount(){
      axios.get('/api/products/get/files/count')
      .then((response)=>{
        console.log(response.data)
        this.setState({
          dataCount : response.data
        })
      })
      .catch((error)=>{
        console.log('error', error);
      })
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
                            File Wise Product List                 
                          </div>
                          <hr className="hr-head container-fluid row"/>
                        </div>
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
export default FileWiseProductList ;

// = withTracker(props => {
//     var userId = Meteor.userId();
    
//     // const vendorHandle = Meteor.subscribe("allSupplierList");
//     // const VendorData = Suppliers.findOne({"OwnerId":userId});
//     //console.log('VendorData',VendorData);
//     // const loading = !vendorHandle.ready();

//     // var VendorId = VendorData ? VendorData._id : '';
//     //console.log('VendorId',VendorId);
//     const productHandle     = Meteor.subscribe("productShopPublish");
//     // if(Roles.userIsInRole(Meteor.userId(), ['Vendor'])){
//     //     productData       = ProductShop.find({vendorId:VendorId}).fetch();
//     // }else{
//      const productData = ProductShop.find({},{fields:{"fileName":1}}).fetch();
//      var fileNameNCountData = []
     
//      var Filename =_.pluck(productData,'fileName');
//      if(Filename){
//          var Data =_.uniq(Filename);
//          if(Data){
//             for(var i = 0 ; i < Data.length ; i++){
//                 var fileNmNCount = {
//                     "fileName" : Data[i],
//                     "count" : ProductShop.find({"fileName":Data[i]},{fields:{"fileName":1}}).count()
//                 };   
//                 if(fileNmNCount){
//                     fileNameNCountData.push(fileNmNCount);
//                 }
//             }
//          }
//      }
//     // }
//     const loading = !productHandle.ready();
//        // const productcount = ProductShop.find({"":}).count();
//     return {
//         loading,
//         productData,
//         Data,
//         fileNameNCountData
//     };    
// })(FileWiseProductList);