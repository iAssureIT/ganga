import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import ReactTable             from "react-table";
import swal                   from 'sweetalert';
import _                      from 'underscore';
import validator              from 'validator';
import IAssureTable           from '../../../../coreAdmin/IAssureTable/IAssureTable.jsx';
import 'jquery-validation';
import 'bootstrap/js/tab.js';
import '../css/CategoryManagement.css';

axios.defaults.baseURL = 'http://gangaexpressapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class CategoryManagement extends Component{
    constructor(props) {
        super(props);
        this.state = {
            "subcatgArr"                        : [],
            "addEditModeCategory"               : "",
            "addEditModeSubCategory"            : [],
            "addEditMode"                       : "",
            "categoryImageLink"                 : "",
            "categoryImageId"                   : "",
            "categoryIconLink"                  : "",
            "categoryIconId"                    : "",
            "tableHeading"                      : {
              webCategory                       : "Web Category",
              category                          : "Category Title",
              subCategory                       : "Subcategory Title",
              categoryDescription               : "Category Description",
              categoryIcon                      : "Category Icon",
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
          webCategory: {
            required: true,
            valueNotEquals: "Select Web Category"
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
          if (element.attr("name") == "webCategory"){
            error.insertAfter("#webCategory");
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

    categoryTableList(){
     //    var categoryData = Category.find({}).fetch();
     //    // // console.log('categoryData',categoryData);
     //    var productKey = Session.get('inputCategorySearch');
     //    if(categoryData){
     //        for(var j=0;j<categoryData.length;j++){
     //            if(!categoryData[j].categoryImage){
     //                categoryData[j].categoryImage = "/images/no-category-image.jpg";
     //            }
     //            if(!categoryData[j].categoryIcon){
     //                categoryData[j].categoryIcon = "/images/no-category-image.jpg";
     //            }
     //        }
     //    }else{
     //        return [];
     //    }

     //    if(productKey){
     //        productKey = (productKey).toUpperCase();
     //        var categoryDataSearched = [];
     //        for(var i=0;i<categoryData.length;i++){
     //            var searchTextString1 = false;
     //            // var searchTextStringArrKey = false;
     //            // var searchTextString3 = false;
     //            // var searchTextString4 = false;


     //            if(((categoryData[i].category.toUpperCase()).indexOf(productKey) != -1)){
					// searchTextString1 = true;
     //            }
                
                
     //            if(searchTextString1){
     //                categoryDataSearched.push(categoryData[i]);
     //            }
     //        }
     //        // // console.log("categoryDataSearched: ",categoryDataSearched);
     //        if(categoryDataSearched.length > 0){
     //            return categoryDataSearched;
     //        } else {
     //            return [];
     //        }


     //    } else {
     //        return categoryData;
     //    }
     return [];
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
    onSubmitCategory(event){
        event.preventDefault();
        // if($('#categoryManagement').valid()){
           //  let category = (this.refs.categoryName.value).trim();
           //  let categoryDesc = (this.refs.categoryShortDesc.value).trim();
            
           //  var getProductId = FlowRouter.getParam("id");
           //  let subCatgLength = this.state.subcatgArr;

           //   // To add All Rows in FormValues Object as a Array
           //   var addRowLength = this.state.subcatgArr.length;
           //   var categoryDimentionArray = [];

           //   var catCodeLength = Category.find({}).count();


           //   if(addRowLength){
           //       for(var i=0;i<addRowLength;i++){
           //          var obj = {
           //               "index"        : i,
           //               "subCategoryCode":catCodeLength+'|'+i,
           //               "subCategoryTitle"  : $(".newSubCatg"+i).val(),
           //          }
           //          categoryDimentionArray.push(obj);
           //       }
           //   }
           // // console.log('categoryDimentionArray',categoryDimentionArray);
           //  // Get Category Image
           //  var categoryImage = TemporaryImages.findOne({"userId":Meteor.userId()},{sort:{"createdAt":-1}});
           //  // // console.log('categoryImage',categoryImage);
           //  var imageUrl = "";
           //  if(categoryImage){
           //      imageUrl = categoryImage.imageLink;
           //      imageId  = categoryImage.imgId;
           //  } else {
           //      if(getProductId){
           //          imageUrl  = this.state.categoryImageLink;
           //          imageId   = this.state.categoryImageId;
           //      } else{
           //          imageUrl  = "";
           //          imageId   = "";
           //      }
           //  }

           //  // Get Category Icon
           //  var categoryIcon = TemporaryIcons.findOne({"userId":Meteor.userId()},{sort:{"createdAt":-1}});
           //  // // console.log('categoryIcon',categoryIcon);
           //  var iconUrl = "";
           //  // var imageUrl = "";
           //  if(categoryIcon){
           //      iconUrl = categoryIcon.imageLink;
           //      iconId  = categoryIcon.imgId;
           //  } else {
           //      if(getProductId){
           //          iconUrl  = this.state.categoryIconLink;
           //          iconId   = this.state.categoryIconId;
           //      } else{
           //          iconUrl  = "";
           //          iconId   = "";
           //      }
           //  }
             
           //  var formValues = {
           //      "category"      : category,
           //      "categoryUrl"   : this.state.categoryUrl,
           //      "subCategory"   : categoryDimentionArray,
           //      "imageUrl"      : imageUrl,
           //      "iconId"        : iconId,
           //      "iconUrl"       : iconUrl,
           //      "categoryDesc"  : categoryDesc,                
           //  }

           //  if(category && categoryDesc){
           //      if(getProductId){
           //          // In Edit Mode
           //          var addEditModeCategory = this.state.addEditModeCategory;
           //          var addEditModeSubCategory = this.state.addEditModeSubCategory;
                    
           //          let exitOrNotCheck = false;
                    
           //          if(category == this.state.addEditModeCategory){
           //              let exitOrNotCheck = false;
           //          }else{
           //              let exitOrNot = Category.find({"category":category}).fetch();
           //              if(exitOrNot && exitOrNot.length>0){
           //                  let exitOrNotCheck = true;
           //              }else{
           //                  let exitOrNotCheck = false;
           //              }
           //          }
        
        
           //          if(exitOrNotCheck && categoryDimentionArray.length == 0){
           //              swal({
           //                  position: 'top-right',
           //                  type: 'error',
           //                  title: 'Category Already Added, Please Add Different Category',
           //                  text: 'Category Already Added, Please Add Different Category',
           //                  showConfirmButton: false,
           //                  timer: 1500
           //              });
           //          } else {
           //              Meteor.call("editCategoryFromCatgManage",formValues,addEditModeCategory,addEditModeSubCategory,getProductId, (error, result)=>{
           //                  if(result){
           //                      swal({
           //                          position: 'top-right',
           //                          type: 'success',
           //                          text: 'Category updated Successfully',
           //                          title: 'Category updated Successfully',
           //                          showConfirmButton: false,
           //                          timer: 1500
           //                      });
           //                      FlowRouter.go('/admin/products/categoryManagement');
           //                      this.setState({
           //                          "categoryName"              : '',
           //                          "categoryUrl"               : '',
           //                          "addEditModeCategory"       : '',
           //                          "addEditModeSubCategory"    : '',
           //                          "categoryShortDesc"         : '',
           //                      });
           //                      $('.edit-catg-new').val("");
           //                      $('.imgCatgUpldInp').val("");
           //                      $('.imgCatgUpldIconInp').val("");
                                
           //                      $('.categoryShortDesc').val("");
           //                      Session.set("uploadCatgImageProgressPercent","");
           //                      Session.set("uploadCatgIconProgressPercent","");
                                
           //                      $(".categoryIcon").css({display:'none'});
           //                      $(".categoryImage").css({display:'none'});
           //                      $(".categoryTempIcon").css({display:'none'});
           //                      $(".categoryTempImage").css({display:'none'});
           //                      $("#categoryImage").show();
           //                      $("#categoryIcon").show();
                            
           //                      this.setState({
           //                          "subcatgArr":[],
           //                      });
                                
           //                  }
           //              });
           //          }
        
           //      }else{
           //          // In Add Mode
           //          let exitOrNot = Category.find({"category":category}).fetch();
           //          var addEditModeCategory = this.state.addEditModeCategory;
        
           //          if((exitOrNot && exitOrNot.length>0 && categoryDimentionArray.length == 0)){
           //              swal({
           //                  position: 'top-right',
           //                  type: 'error',
           //                  text: 'Category Already Added, Please Add Different Category',
           //                  title: 'Category Already Added, Please Add Different Category',
           //                  showConfirmButton: false,
           //                  timer: 1500
           //              });
           //          } else {
           //              Meteor.call("addNewCategoryFromCatgManage",formValues, (error, result)=>{
           //                  swal({
           //                      position: 'top-right',
           //                      type: 'success',
           //                      text: 'Category Added Successfully',
           //                      title: 'Category Added Successfully',
           //                      showConfirmButton: false,
           //                      timer: 1500
           //                  });
           //                  $('.edit-catg-new').val("");
           //                  $('.imgCatgUpldInp').val("");
           //                  $('.imgCatgUpldIconInp').val("");
                            
           //                  $('.categoryShortDesc').val("");
           //                  Session.set("uploadCatgImageProgressPercent","");
           //                  Session.set("uploadCatgIconProgressPercent","");

           //                  $(".categoryTempIcon").css({display:'none'});
           //                  $(".categoryTempImage").css({display:'none'});
           //                  $("#categoryImage").show();
           //                  $("#categoryIcon").show();
                            
           //                  this.setState({
           //                      "categoryName"                  : '',
           //                      "categoryUrl"                   : '',
           //                      "addEditModeCategory"           : '',
           //                      "addEditModeSubCategory"        : '',
           //                      "categoryShortDesc"             : '',
           //                      "subcatgArr"                    : [],
           //                  });
           //                  FlowRouter.go('/admin/products/categoryManagement');
           //              });
           //          } 
           //      }
           //  }else{
           //      swal({
           //          position: 'top-right',
           //          type: 'error',
           //          text: 'Please fill all fields',
           //          title: 'Please fill all fields',
           //          showConfirmButton: false,
           //          timer: 1500
           //      });
           //  }
        // }
  
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
            "webCategory"               : this.state.webCategory,
            "category"                  : this.refs.category.value,
            "categoryUrl"               : this.refs.categoryUrl.value,
            "subCategory"               : categoryDimentionArray,
            "categoryDescription"       : this.refs.categoryDescription.value,
            "categoryImage"             : "NA",
            "categoryIcon"              : "NA",
          }

          axios.post('/api/category/post', formValues)
          .then((response)=>{

            swal({
              text  : response.data.message,
              title : response.data.message,
            });

            this.setState({
              "webCategory"                   : 'Select',
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
          "webCategory"               : this.state.webCategory,
          "category"                  : this.refs.category.value,
          "categoryUrl"               : this.refs.categoryUrl.value,
          "subCategory"               : categoryDimentionArray,
          "categoryDescription"       : this.refs.categoryDescription.value,
          "categoryImage"             : "NA",
          "categoryIcon"              : "NA",
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
              "webCategory"                   : 'Select',
              "category"                      : '',
              "categoryUrl"                   : '',
              "addEditModeCategory"           : '',
              "addEditModeSubCategory"        : '',
              "categoryDescription"           : '',
              "editId"                        : '',
              "subcatgArr"                    : [],
            });
            $(".categoryTempIcon").css({display:'none'});
            $(".categoryTempImage").css({display:'none'});
            $("#categoryImage").show();
            $("#categoryIcon").show();
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
              "webCategory"               : response.data.webCategory,
              "category"                  : response.data.category,
              "categoryUrl"               : response.data.categoryUrl,
              "addEditModeCategory"       : response.data.category,
              "addEditModeSubCategory"    : response.data.subCategory,
              "subcatgArr"                : response.data.subCategory,
              "categoryDescription"       : response.data.categoryDescription,
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
            // console.log('image',response.data.categoryImage);
            if(response.data.categoryImage){
                // this.setState({
                //     "categoryImageLink"                 : response.data.categoryImage,
                //     "categoryIconLink"                  : response.data.categoryIcon,
                //     "categoryImageId"                   : response.data.categoryImageId,
                //     "categoryIconId"                    : response.data.categoryIconId,
                // })
                // $(".categoryImage").css({display:'block'});
                // $(".categoryIcon").css({display:'block'});
                // $("#categoryIcon").hide();
                // $("#categoryImage").hide();
            }else{

            }
                             

        } else{
            this.setState ({

            });
        }
      })
      .catch((error)=>{
        console.log('error', error);
      });
    }
    addCategoryImage(event){
        event.preventDefault();
        // let self = this;
        // Session.set("uploadCatgImageProgressPercent","");

        // if (event.currentTarget.files && event.currentTarget.files[0]) {
            
        //     var dataImg =event.currentTarget.files[0];
        //     if(dataImg.type == "image/jpeg" || dataImg.type == "image/png"){
                
        //         var file = event.currentTarget.files[0];
        //         if (file) {
        //             addCategoryImgsToS3Function(file,self);
        //         }
        //     } else {
        //         swal({
        //         position: 'top-right',
        //         type: 'error',
        //         title: 'Please select image',
        //         text: 'Please select image',
        //         showConfirmButton: false,
        //         timer: 1500
        //         });
        //     }

        //     var tempImageLink = TemporaryImages.findOne({"userId":Meteor.userId()},{sort:{"createdAt":-1}});
            
        //     if(tempImageLink){
        //         this.setState({
        //             "categoryTempImageLink":tempImageLink.imageLink,
        //             "categoryTempImageId":tempImageLink.imgId,
        //         });
        //         $(".categoryTempImage").css({display:'block'});
        //         $("#categoryImage").hide();
        //     }
        // }
    }

    addCategoryIcon(event){
        event.preventDefault();
        // let self = this;
        // Session.set("uploadCatgIconProgressPercent","");

        // if (event.currentTarget.files && event.currentTarget.files[0]) {
        //     var dataImg =event.currentTarget.files[0];
        //     if(dataImg.type == "image/jpeg" || dataImg.type == "image/png"){
        
        //         var file = event.currentTarget.files[0];
        //         if (file) {
        //             addCategoryIconsToS3Function(file,self);
        //         }
        //     } else {
        //         swal({
        //         position: 'top-right',
        //         type: 'error',
        //         title: 'Please select image',
        //         text: 'Please select image',
        //         showConfirmButton: false,
        //         timer: 1500
        //         });
        //     }
        // }
    }
    getUploadCatgImgPercentage(){
        // var uploadProgressPercent = Session.get("uploadCatgImageProgressPercent");
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
        //     if(percentVal == 100){
        //         return (
        //             <div>
                        
        //             </div>
        //         );
        //     }else{
        //         return (
        //             <div>
        //                 <div className="progress"  style= {styleCBar}>
        //                     <div className="progress-bar progress-bar-striped active" role="progressbar"
        //                   aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style= {styleC}>
        //                     {percentVal} %
        //                     </div>
        //                 </div>
        //             </div>        
        //         );
        //     }
        // }
    }
    removeIcon(event){
        var id = event.currentTarget.id;
        // console.log('removeIcon id',id);
        // Meteor.call('deleteTempIcon',id,
        //     (error,result)=>{
        //         if(error){
        //             // console.log('error: ',error);
        //         }else{
        //             $(".categoryTempIcon").css({display:'none'});
        //             $("#categoryIcon").show();
        //             $(".optionALabel").show();
        //         }
        //     }
        // );
    }
    removeImage(event){
        var id = event.currentTarget.id;
        // Meteor.call('deleteTempImage',id,
        //     (error,result)=>{
        //         if(error){
        //             // console.log('error: ',error);
        //         }else{
        //             $(".categoryTempImage").css({display:'none'});
        //             $("#categoryImage").show();
        //         }
        //     }
        // );
    }
    deleteIcon(event){
        var id = event.currentTarget.id;
        
        // Meteor.call('deleteIcon',id,
        //     (error,result)=>{
        //         if(error){
        //             // console.log('error: ',error);
        //         }else{
        //             /*// console.log('questionImage deleted');*/
        //             $(".categoryIcon").css({display:'none'});
        //             $("#categoryIcon").show();
        //             $(".optionALabel").show();
        //             this.setState({
        //                 categoryIconLink    : '',
        //                 categoryIconId  : '',
        //             });
        //         }
        //     }
        // );
    }

    deleteImage(event){
        var id = event.currentTarget.id;
        
        // Meteor.call('deleteImage',id,
        //     (error,result)=>{
        //         if(error){
        //             // console.log('error: ',error);
        //         }else{
        //             /*// console.log('questionImage deleted');*/
        //             $(".categoryImage").css({display:'none'});
        //             $("#categoryImage").show();
        //             $(".optionALabel").show();
        //             this.setState({
        //                categoryImageLink    : '',
        //                 categoryImageId  : '',
        //             });
        //         }
        //     }
        // );
    }
    showTempImage(){
        // var x = TemporaryImages.findOne({});
        // console.log('y',x);
        
        // if(x){
        //     $(".categoryTempImage").css({display:'block'});
        //     $("#categoryImage").hide();
        //     return x;
        // }
        
    }
    showTempIcon(){
        // var x = TemporaryIcons.findOne({});
        // // console.log('y',x);
        
        // if(x){
        //     $(".categoryTempIcon").css({display:'block'});
        // $("#categoryIcon").hide();
        //     return x;
        // }        
    }
    getUploadCatgIconPercentage(){
        // var uploadProgressPercent = Session.get("uploadCatgIconProgressPercent");
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
        //     if(percentVal == 100){
        //         return (
        //             <div>
                        
        //             </div>
        //         );
        //     }else{
        //         return (
        //             <div>
        //                 <div className="progress"  style= {styleCBar}>
        //                     <div className="progress-bar progress-bar-striped active" role="progressbar"
        //                   aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style= {styleC}>
        //                     {percentVal} %
        //                     </div>
        //                 </div>
        //             </div>        
        //         );
        //     }
        // }
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
                                      <label>Web Category <i className="redFont">*</i></label>
                                      <select onChange={this.handleChange.bind(this)} value={this.state.webCategory}  name="webCategory" className="form-control allProductCategories" aria-describedby="basic-addon1" id="webCategory" ref="webCategory">
                                        <option disabled selected defaultValue="Select">Select Web Category</option>
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
                                      
                                      <div>Upload Category Icon<span className="imageUploadInstructions">(Upload Maximum 50px X 50px Image)</span></div>
                                      <div className="">
                                          <div className="col-lg-12 uploadedImageFromLoclCatg1">
                                              <input onChange={this.addCategoryIcon.bind(this)} id="categoryIcon" type="file" className="form-control imgCatgUpldIconInp" placeholder="Category Icon" aria-label="Brand" aria-describedby="basic-addon1" />
                                              <div>{this.getUploadCatgIconPercentage()}</div>
                                          </div>

                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding categoryIcon">                                              
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop17">
                                                  <i className="fa fa-times deleteImg" id={this.state.categoryIconId} onClick={this.deleteIcon.bind(this)} aria-hidden="true"></i>
                                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 categoryImg">
                                                      <img src={this.state.categoryIconLink?this.state.categoryIconLink:null} className="img-responsive"/>
                                                  </div>
                                              </div>                                                                                              
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding categoryTempIcon">                                              
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop17">
                                                  <i className="fa fa-times deleteImg" id={this.showTempIcon() && this.showTempIcon()._id  ? this.showTempIcon()._id  :null} onClick={this.removeIcon.bind(this)} aria-hidden="true"></i>
                                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 categoryImg">
                                                      <img src={this.showTempIcon() && this.showTempIcon().imageLink  ? this.showTempIcon().imageLink  :null} className="img-responsive"/>
                                                  </div>
                                              </div>                                                                                              
                                          </div>
                                   
                                      </div>
                                     
                                  </div>

                                  <div className="divideCatgRows">
                                      
                                      <div>Upload Category Image<span className="imageUploadInstructions">(Upload Maximum 674px X 500px Image)</span></div>
                                      <div className="">

                                          <div className="col-lg-12 uploadedImageFromLoclCatg1">                                                                            
                                              <input onChange={this.addCategoryImage.bind(this)} id="categoryImage" type="file" className="form-control imgCatgUpldInp" placeholder="Category Image" aria-label="Brand" aria-describedby="basic-addon1" />
                                              <div>{this.getUploadCatgImgPercentage()}</div>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding categoryImage">                                              
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop17">
                                                  <i className="fa fa-times deleteImg" id={this.state.categoryImageId} onClick={this.deleteImage.bind(this)} aria-hidden="true"></i>
                                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 categoryImg">
                                                      <img src={this.state.categoryImageLink?this.state.categoryImageLink:null} className="img-responsive"/>
                                                  </div>
                                              </div>                                                                                              
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding categoryTempImage">                                              
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop17">
                                                  <i className="fa fa-times deleteImg" id={this.showTempImage() && this.showTempImage()._id  ? this.showTempImage()._id  :null} onClick={this.removeImage.bind(this)} aria-hidden="true"></i>
                                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 categoryImg">
                                                      <img src={this.showTempImage() && this.showTempImage().imageLink  ? this.showTempImage().imageLink  :null} className="img-responsive"/>
                                                  </div>
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

// CategoryManagement = withTracker(props => {
//     var productId           = FlowRouter.getParam('id');
//     // // console.log('productId',productId);
//     const categoryHandle    = Meteor.subscribe("category");
//     const catgData          = Category.findOne({"_id":productId});
//     const loading           = !categoryHandle.ready();


//     const imageHandle    = Meteor.subscribe("temporaryimage");
//     const loading1       = !imageHandle.ready();

//     const iconHandle    = Meteor.subscribe("temporaryicon");
//     const loading2       = !iconHandle.ready();


//     // // console.log('catgData',catgData);
//     return {
//         catgData,
//     };    
// })(CategoryManagement);