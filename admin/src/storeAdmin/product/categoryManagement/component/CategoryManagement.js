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
import '../css/CategoryManagement.css';

// axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

class CategoryManagement extends Component{
    constructor(props) {
        super(props);
        this.state = {
            "subcatgArr"                        : [],
            "addEditModeCategory"               : "",
            "addEditModeSubCategory"            : [],
            "addEditMode"                       : "",
            "categoryImage"                     : "",
            "tableHeading"                      : {
              section                           : "Section",
              category                          : "Category Title",
              subCategory                       : "Subcategory Title",
              categoryDescription               : "Category Description",
              categoryImage                     : "Category Image",
              actions                           : 'Action',
            },
            "tableObjects"              : {
              deleteMethod              : 'delete',
              apiLink                   : '/api/category/',
              paginationApply           : true,
              searchApply               : true,
              editUrl                   : '/category-management/'
            },
            "startRange"                : 0,
            "limitRange"                : 10,
            "editId"                    : this.props.match.params ? this.props.match.params.categoryID : ''
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
        var editId = nextProps.match.params.categoryID;
        if(nextProps.match.params.categoryID){
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
      }, "Please select the category");

      $.validator.addMethod("regxA1", function(value, element, regexpr) {          
        return regexpr.test(value);
      }, "Name should only contain letters & number.");
  
      $.validator.setDefaults({
        debug: true,
        success: "valid"
      });

      $("#categoryManagement").validate({
        rules: {
          section: {
            required: true,
            valueNotEquals: "Select Section"
          },
          category: {
            required: true,
            regxA1: /^[A-Za-z_0-9 ][A-Za-z\d_ ]/,
          },
          categoryDescription: {
            required: true,
            regxA1: /^[A-Za-z_0-9 ][A-Za-z\d_ ]/,
          },
        },
        errorPlacement: function(error, element) {
          if (element.attr("name") == "section"){
            error.insertAfter("#section");
          }
          if (element.attr("name") == "category"){
            error.insertAfter("#category");
          }
          if (element.attr("name") == "categoryDescription"){
            error.insertAfter("#categoryDescription");
          }         
        }
      });
      this.getDataCount();
      this.getData(this.state.startRange,this.state.limitRange);
    }
    getDataCount(){
      axios.get('/api/category/get/count')
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
      var data={
        startRange : startRange,
        limitRange : limitRange
      }

      axios.post('/api/category/get/list', data)
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
    componentWillUnmount() {
      // $("body").find("script[src='/js/adminLte.js']").remove();
    }
    categorySearchEvent(event){
        // var inputText = $(event.currentTarget).val();

        // if(inputText){
        //     Session.set("inputCategorySearch",inputText);
        // } else {
        //     Session.set("inputCategorySearch","");
        // }
    }
    categoryEditEvent(event){
        window.scrollTo(0, 0);
        var currentId = $(event.currentTarget).attr('data-id');
        // FlowRouter.go('/admin/products/categoryManagement/'+currentId);      
    }
    cancelCategoryUpdate(){
        // Session.set("uploadCatgImageProgressPercent","");
        // Session.set("uploadCatgIconProgressPercent","");
        // FlowRouter.go('/admin/products/categoryManagement');
        // $('.imgCatgUpldInp').val("");
        // $('.imgCatgUpldIconInp').val("");
        // this.setState({
        //     "categoryName"                  : '',
        //     "categoryUrl"                   : '',
        //     "addEditModeCategory"           : '',
        //     "addEditModeSubCategory"        : '',
        //     "categoryShortDesc"             : '',
        //     "subcatgArr"                    : [],
        // });
        
        // this.componentDidMount();
        // Meteor.call("removeTemporaryCollectionData","1");
        // Meteor.call("removeTemporaryIconsCollectionData","1");
        
    }
    addNewSubCatArray(event){
      let arrLength = this.state.subcatgArr;
      arrLength.push({
          subCategoryCode: "a"+arrLength.length,
          subCategoryTitle: "",
      });
      this.setState({
          subcatgArr : arrLength,
      },()=>{
          // console.log('subcatgArr',this.state.subcatgArr);
      }); 
    }
    addNewRow(index){
        // console.log('index',index);
        return(
            <div className="col-lg-12 col-md-12 NOpadding newSubCatgArr">   
                <div className="col-lg-11 col-md-11 NOpadding">             
                    <input type="text" id={index} value={this.state['subCategoryTitle'+index]} name={"subCategoryTitle"+index} onChange={this.handleChange.bind(this)} className={"form-control newSubCatg"+index} placeholder="Category Title" aria-label="Brand" aria-describedby="basic-addon1" ref={"newSubCatg"+index} />
                </div>
                <div className="col-lg-1 col-md-1 deleteSubCategory fa fa-trash" id={index} onClick={this.deleteSubCategory.bind(this)}>
                    {/*<i className="fa fa-trash"></i>*/}
                </div>
            </div>
           
        );
    }
    deleteSubCategory(event){
        event.preventDefault();
        var id = event.target.id;
        // console.log('subCategory Id',id);

        let arrLength = this.state.subcatgArr;
        // console.log('arrLength',arrLength);
        var index = arrLength.indexOf(id);
        // console.log('index',index);
        // someArray3.splice(someArray3.findIndex(v => v.name === "Kristian"), 1);
        arrLength.splice(arrLength.findIndex(v => v.subCategoryCode === id), 1);
        this.setState({
            subcatgArr: arrLength
        },()=>{
            // console.log('subcatgArr', this.state.subcatgArr);
        });
    }
    submitCategory(event){
      event.preventDefault();
      console.log('bjgjbmbmb',$('#categoryManagement').valid());
      if($('#categoryManagement').valid()){
        var addRowLength = this.state.subcatgArr.length;
        var categoryDimentionArray = [];
        

        axios.get('/api/category/get/count')
        .then((response)=>{
          var catCodeLength = response.data.dataCount;
          if(addRowLength){
            for(var i=0;i<addRowLength;i++){
              var obj = {
                   "index"             : i,
                   "subCategoryCode"   : catCodeLength+'|'+i,
                   "subCategoryTitle"  : $(".newSubCatg"+i).val(),
              }
              categoryDimentionArray.push(obj);
            }
          }


          var formValues = {
            "section"               : this.state.section,
            "category"                  : this.refs.category.value,
            "categoryUrl"               : this.refs.categoryUrl.value,
            "subCategory"               : categoryDimentionArray,
            "categoryDescription"       : this.refs.categoryDescription.value,
            "categoryImage"             : this.state.categoryImage,
          }

          axios.post('/api/category/post', formValues)
          .then((response)=>{

            swal({
              text  : response.data.message,
              title : response.data.message,
            });

            this.setState({
              "section"                   : 'Select',
              "category"                      : '',
              "categoryUrl"                   : '',
              "addEditModeCategory"           : '',
              "addEditModeSubCategory"        : '',
              "categoryDescription"           : '',
              "subcatgArr"                    : [],
            });
            this.getData(this.state.startRange, this.state.limitRange);
          })
          .catch((error)=>{
            console.log('error', error);
          });

        })
        .catch((error)=>{
          console.log('error', error);
        });
      }
    }
    updateCategory(event){
      event.preventDefault();
      console.log('bjgjbmbmb',$('#categoryManagement').valid());
      if($('#categoryManagement').valid()){
        var addRowLength = this.state.subcatgArr.length;
        var categoryDimentionArray = [];
        
        var formValues = {
          "category_ID"               : this.state.editId,
          "section"               : this.state.section,
          "category"                  : this.refs.category.value,
          "categoryUrl"               : this.refs.categoryUrl.value,
          "subCategory"               : categoryDimentionArray,
          "categoryDescription"       : this.refs.categoryDescription.value,
          "categoryImage"             : this.state.categoryImage,
        }

        axios.get('/api/category/get/count')
        .then((response)=>{
          var catCodeLength = response.data.dataCount;
          if(addRowLength){
            for(var i=0;i<addRowLength;i++){
              var obj = {
                   "index"             : i,
                   "subCategoryCode"   : catCodeLength+'|'+i,
                   "subCategoryTitle"  : $(".newSubCatg"+i).val(),
              }
              categoryDimentionArray.push(obj);
            }
          }
          axios.patch('/api/category/patch', formValues)
          .then((response)=>{

            swal({
              text  : response.data.message,
              title : response.data.message,
            });
            this.getData(this.state.startRange, this.state.limitRange);
            this.setState({
              "section"                   : 'Select',
              "category"                      : '',
              "categoryUrl"                   : '',
              "addEditModeCategory"           : '',
              "addEditModeSubCategory"        : '',
              "categoryDescription"           : '',
              "editId"                        : '',
              "subcatgArr"                    : [],
              categoryImage : "",
            });
            this.props.history.push('/category-management');
          })
          .catch((error)=>{
            console.log('error', error);
          });
        })
        .catch((error)=>{
          console.log('error', error);
        });
      }
    }
    edit(id){
      axios.get('/api/category/get/one/'+id)
      .then((response)=>{
        console.log('edit', response.data);
        if(response.data){
            this.setState({
              "section"               : response.data.section,
              "category"                  : response.data.category,
              "categoryUrl"               : response.data.categoryUrl,
              "addEditModeCategory"       : response.data.category,
              "addEditModeSubCategory"    : response.data.subCategory,
              "subcatgArr"                : response.data.subCategory,
              "categoryDescription"       : response.data.categoryDescription,
              "categoryImage"       : response.data.categoryImage,
            },()=>{
                var addRowLength = this.state.subcatgArr.length;

                if(addRowLength){
                    for(var i=0;i<addRowLength;i++){
                        this.setState ({
                          ['subCategoryTitle'+response.data.subCategory[i].subCategoryCode] : response.data.subCategory[i].subCategoryTitle
                        },()=>{
                          
                        });
                    }
                }
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
    uploadImage(event){
      event.preventDefault();
      var categoryImage = "";
      if (event.currentTarget.files && event.currentTarget.files[0]) {
          // for(var i=0; i<event.currentTarget.files.length; i++){
              var file = event.currentTarget.files[0];
              if (file) {
                  var fileName  = file.name; 
                  var ext = fileName.split('.').pop();  
                  if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="JPG" || ext==="PNG" || ext==="JPEG"){
                      if (file) {
                          var objTitle = { fileInfo :file }
                          categoryImage = objTitle ;
                          
                      }else{          
                          swal("Images not uploaded","Something went wrong","error");  
                      }//file
                  }else{ 
                      swal("Please upload Image","Allowed images formats are (jpg,png,jpeg)","warning");   
                  }//file types
              }//file
          // }//for 
  
          if(event.currentTarget.files){
              this.setState({
                categoryImage : categoryImage
              });  
              main().then(formValues=>{
                  this.setState({
                    categoryImage : formValues.categoryImage
                  })
              });
              async function main(){
                  var config = await getConfig();
                  
                  var s3url = await s3upload(categoryImage.fileInfo, config, this);


                  const formValues = {
                      "categoryImage"      : s3url,
                      "status"            : "New"
                  };
    
                  return Promise.resolve(formValues);
              }
              function s3upload(image,configuration){
      
                  return new Promise(function(resolve,reject){
                      S3FileUpload
                          .uploadFile(image,configuration)
                          .then((Data)=>{
                              resolve(Data.location);
                          })
                          .catch((error)=>{
                              console.log(error);
                          })
                  })
              }   
              function getConfig(){
                  return new Promise(function(resolve,reject){
                      axios
                          .get('/api/projectSettings/get/one/s3')
                          .then((response)=>{
                              const config = {
                                  bucketName      : response.data.bucket,
                                  dirName         : 'propertiesImages',
                                  region          : response.data.region,
                                  accessKeyId     : response.data.key,
                                  secretAccessKey : response.data.secret,
                              }
                              resolve(config);                           
                          })
                          .catch(function(error){
                              console.log(error);
                          })
      
                  })
              }        
          }
      }
    }
    deleteImage(event){
        // console.log('delete');
        
        var id = event.target.id;
        var productImageArray = this.state.productImageArray;
        // console.log('productImage', productImageArray, id);

        productImageArray.splice(productImageArray.findIndex(v => v === id), 1);
        this.setState({
            productImageArray: productImageArray
        },()=>{
            // console.log('subcatgArr', this.state.subcatgArr);
        });
    }
    createCategoryUrl(event){
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
                categoryUrl : url
            })
        }
    }
    categoryDeleteEvent(event){
        // event.preventDefault();

        // var id = event.target.id;
        // Meteor.call('categoryDeleteEvent', id, (error, result)=>{
        //     if(error){
        //         console.log(error);
        //     }else{
        //         swal({
        //             position: 'top-right',
        //             type: 'error',
        //             text: result,
        //             title: 'Category deleted successfully.',
        //             showConfirmButton: false,
        //             // timer: 1500
        //         });
        //     }
        // });
    }
    render(){
       console.log("s3url------------->",this.state.categoryImage);
      // console.log('categoryImage', this.state.categoryImage);
        return(
            <div className="container-fluid">
              <div className="row">
                <div className="formWrapper">
                    <section className="content">
                      <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 titleaddcontact">
                              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 contactdeilsmg pageHeader">
                                  Category Management                  
                               </div>
                              <hr className="hr-head container-fluid row"/>
                            </div>
                            <form id="categoryManagement" className="">
                              <div className="col-lg-6">
                                  <div className="col-lg-12">
                                      <label>Section <i className="redFont">*</i></label>
                                      <select onChange={this.handleChange.bind(this)} value={this.state.section}  name="section" className="form-control allProductCategories" aria-describedby="basic-addon1" id="section" ref="section">
                                        <option disabled selected defaultValue="Select">Select Section</option>
                                        <option value="Main-Site">Main Site</option>
                                        <option value="Grocery">Grocery</option>
                                      </select>
                                  </div>

                                  <div className="col-lg-12">
                                      <label>Category Title <i className="redFont">*</i></label>
                                      <input value={this.state.category} name="category" id="category" onChange={this.createCategoryUrl.bind(this)} type="text" className="form-control edit-catg-new" placeholder="Category Title" ref="category" />
                                  </div>
                                  <div className="col-lg-12">
                                      <label>Category URL <i className="redFont">*</i></label>                                                                    
                                      <input disabled value={this.state.categoryUrl} onChange={this.handleChange.bind(this)} id="categoryUrl" name="categoryUrl" type="text" className="form-control categoryUrl" placeholder="Category URL" ref="categoryUrl"  />
                                  </div>
                                  <div className="col-lg-12 subCatAddLabel">
                                      <label>Subcategories </label>
                                      {
                                          this.state.subcatgArr.map((dataRowArray, index)=>{
                                              // console.log(dataRowArray, 'subCategoryTitle'+dataRowArray.subCategoryCode);
                                              return(
                                                  <div className="col-lg-12 col-md-12 NOpadding" key={index}>                                                                                  
                                                      <div className="col-lg-12 col-md-12 NOpadding newSubCatgArr">   
                                                          <div className="col-lg-11 col-md-11 NOpadding">             
                                                              <input type="text" id={dataRowArray.subCategoryCode} value={this.state['subCategoryTitle'+dataRowArray.subCategoryCode]} name={"subCategoryTitle"+dataRowArray.subCategoryCode} onChange={this.handleChange.bind(this)} className={"form-control newSubCatg"+index} placeholder="Category Title" aria-label="Brand" aria-describedby="basic-addon1" ref={"newSubCatg"+index} />
                                                          </div>
                                                          <div className="col-lg-1 col-md-1 deleteSubCategory fa fa-trash" id={dataRowArray.subCategoryCode} onClick={this.deleteSubCategory.bind(this)}>
                                                          </div>
                                                      </div>
                                                  </div>
                                              );
                                          })
                                      }
                                  </div>

                                  <div className="col-lg-12 col-md-12">
                                      <div onClick={this.addNewSubCatArray.bind(this)}  className="submitBtn btn btnSubmit col-lg-12">Add New Subcategory</div>
                                  </div>

                              </div>
                              <div className="col-lg-6">
                                  <div className="divideCatgRows">
                                      <label>Category Short Description <i className="redFont">*</i></label>                                                                    
                                      <input type="text" value={this.state.categoryDescription} onChange={this.handleChange.bind(this)} name="categoryDescription" id="categoryDescription" className="form-control categoryShortDesc" placeholder="Category Short Description" ref="categoryDescription" />
                                  </div>
                                  <div className="divideCatgRows">
                                  <label>Category Image</label>
                                      <div className="col-lg-12 col-md-12 col-xs-6 col-sm-6">
                                      <div className="col-lg-12 col-md-12 col-xs-6 col-sm-6 categoryImage" style={{"backgroundImage":`url(`+(this.state.categoryImage && this.state.categoryImage != "" ? this.state.categoryImage : "/images/notavailable.jpg")+`)`}}>
                                        <div className="row">
                                          {/* <span className="fa fa-camera"> */}
                                            <input type="file" onChange={this.uploadImage.bind(this)} title="Click to Edit Photo" className="imgUp col-lg-12 col-sm-12 col-xs-12 col-md-12" accept=".jpg,.jpeg,.png" />
                                          {/* </span> */}
                                        </div>
                                      </div>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-lg-12 NOpadding-right">
                                  <div className="addCategoryNewBtn col-lg-12 NOpadding-right">
                                      <div className="pull-right col-lg-6 NOpadding-right">
                                          {/*<div className=" col-lg-6">
                                              <div onClick={this.cancelCategoryUpdate.bind(this)} className="edit-cancel-catg btn col-lg-12 col-md-12 col-sm-12 col-xs-12">Cancel</div>
                                          </div>*/}
                                          <div className=" col-lg-6 col-lg-offset-6">
                                            {
                                              this.state.editId ? 
                                              <button onClick={this.updateCategory.bind(this)} className="submitBtn btn btnSubmit col-lg-12 col-md-12 col-sm-12 col-xs-12">Update</button>
                                              :
                                              <button onClick={this.submitCategory.bind(this)} className="submitBtn btn btnSubmit col-lg-12 col-md-12 col-sm-12 col-xs-12">Submit</button>
                                            }
                                          </div>
                                      
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
export default CategoryManagement;