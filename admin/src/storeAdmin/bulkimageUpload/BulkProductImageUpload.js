import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import swal                   from 'sweetalert';
import _                      from 'underscore';
class BulkProductImageUpload extends Component{
  constructor(props){
      super(props);
      this.state = {
        notuploadedImages : [],
        allshopproductimages : []
      }
  }

  componentDidMount() {
    
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      'allshopproductimages':nextProps.productData,
    });
  }
  bulkuplodaProductImages(event){
    event.preventDefault();
    
  }
  getUploadBulUSPercentage(){
  }
  deleteproductImages(event){
    event.preventDefault();
    
  }
    
  render(){
    return( 
      <div className="container-fluid">
        <div className="row">
          <div className="formWrapper">
            <section className="content">
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                <div className="row">
                 <div className="box">
                   <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                        <h4 className="NOpadding-right">  Product Image Bulk Upload</h4>
                  </div>
                  </div>
                          
                  <form className="addRolesInWrap newTemplateForm">
                    <div className="row inputrow">
                      <div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category imageuploadtitle">
                            Upload Product Images 
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
                      eg. ProductCode0-1, ProductCode0-2, ProductCode0-3, ... etc.
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