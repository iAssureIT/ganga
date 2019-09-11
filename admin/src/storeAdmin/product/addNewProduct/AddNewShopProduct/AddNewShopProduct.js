import React, { Component }   from 'react';
import $                      from 'jquery';
import jQuery                 from 'jquery';
import axios                  from 'axios';
import ReactTable             from "react-table";
import swal                   from 'sweetalert';
import _                      from 'underscore';
import AddNewTableFeature     from '../addNewTableFeature/addNewTableFeature.js';
import 'bootstrap/js/tab.js';
import "./AddNewProduct.css";

// axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
class AddNewShopProduct extends Component{
  constructor(props) {
      super(props);
      this.state = {
          subcategoryArray        : [],
          categoryArray           : [],
          addrows                 : [1],
          productMode             : '',
          productFeatured         : false,
          productExclusive        : false,
          catError                : false,
          subCatError             : false,
          subCatFormErrors        : false,
          offered                 : false,
          editId                  : this.props.match.params ? this.props.match.params.productID : ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.addNewRow = this.addNewRow.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    var editId = nextProps.match.params.id;
    if(nextProps.match.params.id){
      this.setState({
        editId : editId
      })
      this.edit(editId);
    }
  }
  handleChange(event){
      const target = event.target;
      const name   = target.name;
      this.setState({
          [name]: event.target.value,
      });
  }
  componentDidMount() {
    if(this.state.editId){      
      this.edit(this.state.editId);
    }

    $.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg !== value;
    }, "Please select the category");
    $.validator.addMethod("regxSubCat", function(value, element, arg){
      return arg !== value;
    }, "Please select the sub category");
    $.validator.addMethod("regxWebCat", function(value, element, arg){
      return arg !== value;
    }, "Please select the section");
    $.validator.addMethod("regxbrand", function(value, element, regexpr) {          
      return regexpr.test(value);
    }, "Brand should only contain letters & number.");
    $.validator.addMethod("regxProductCode", function(value, element, regexpr) {          
      return regexpr.test(value);
    }, "Product Code should only contain letters & number.");
    $.validator.addMethod("regxProductName", function(value, element, regexpr) {          
      return regexpr.test(value);
    }, "Product Name should only contain letters & number.");
    $.validator.addMethod("regxUrl", function(value, element, regexpr) {          
      return regexpr.test(value);
    }, "Product Url should only contain letters & number.");
    $.validator.addMethod("regxPrice", function(value, element, regexpr) {          
      return regexpr.test(value);
    }, "Product Price should only contain letters & number.");
    $.validator.addMethod("regxDetails", function(value, element, regexpr) {          
      return regexpr.test(value);
    }, "Product Details should only contain letters & number.");
    $.validator.addMethod("regxShortDesc", function(value, element, regexpr) {          
      return regexpr.test(value);
    }, "Product Short Description should only contain letters & number.");
    $.validator.addMethod("regxPrice", function(value, element, regexpr) {          
      return regexpr.test(value);
    }, "Product Price should only numbers.");
  
      jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
      });

      $("#addNewShopProduct").validate({
        rules: {
          category: {
            required: true,
            valueNotEquals: "Select Category"
          },
          subCategory: {
            required: true,
            regxSubCat: "Select Sub-Category"
          },
          section:{
            required : true,
            regxWebCat : "Select Section"
          },
          brand: {
            required: true,
            regxbrand: /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
          },
          productCode: {
            required: true,
          },
          productName: {
            required: true,
          },
          productUrl: {
            required: true,
            regxUrl: /^[A-Za-z][A-Za-z0-9\-\s]*$/,
          },
          offeredPrice: {
            required: true,
            regxPrice: /^[0-9 ]*$/,
          },
          actualPrice: {
            required: true,
            regxPrice: /^[0-9 ]*$/,
          },
          availableQuantity : {
            required: true,
            regxPrice: /^[0-9 ]*$/,
          },
          currency :{
              required : true,
          },
          productDetails: {
            required: true,
          },
          shortDescription: {
            required: true,
          },
          status: {
            required: true,
            valueNotEquals: "-Select-"
          },
        },
      errorPlacement: function(error, element) {
        if (element.attr("name") == "category"){
          error.insertAfter("#category");
        }
        if (element.attr("name") == "subCategory"){
          error.insertAfter("#subCategory");
        }
        if (element.attr("name") == "section"){
          error.insertAfter("#section");
        }
        if (element.attr("name") == "brand"){
          error.insertAfter("#brand");
        }         
        if (element.attr("name") == "productCode"){
          error.insertAfter("#productCode");
        }         
        if (element.attr("name") == "productName"){
          error.insertAfter("#productName");
        }         
        if (element.attr("name") == "productUrl"){
          error.insertAfter("#productUrl");
        }         
        if (element.attr("name") == "offeredPrice"){
          error.insertAfter("#offeredPrice");
        } 
        if (element.attr("name") == "actualPrice"){
          error.insertAfter("#actualPrice");
        } 
        if (element.attr("name") == "availableQuantity"){
          error.insertAfter("#availableQuantity");
        }        
        if (element.attr("name") == "currency"){
          error.insertAfter("#currency");
        }         
        if (element.attr("name") == "productDetails"){
          error.insertAfter("#productDetails");
        }         
        if (element.attr("name") == "shortDescription"){
          error.insertAfter("#shortDescription");
        }         
        if (element.attr("name") == "status"){
          error.insertAfter("#status");
        }         
      }
    });

    this.getWebCategories();
  }
  getWebCategories(){
    axios.get('/api/category/get/list')
    .then((response)=>{
      console.log('getWebCategories', response)
      var sections = _.pluck(response.data, "section");
      var sectionArray = _.unique(sections);
        this.setState({
          sectionArray : sectionArray
        })
    })
    .catch((error)=>{
        console.log('error', error);
    })
  }
  showRelevantCategories(event){
    var section = event.target.value;
    console.log('section', section);
    axios.get('/api/category/get/list/'+section)
    .then((response)=>{
        this.setState({
            categoryArray     : response.data,
            category          : "Select Category",
          subCategory         : "Select Sub-Category",
        })
    })
    .catch((error)=>{
        console.log('error', error);
    })
  }
  getCategories(){
      axios.get('/api/category/get/list')
      .then((response)=>{
          this.setState({
              categoryArray : response.data
          })
      })
      .catch((error)=>{
          console.log('error', error);
      })
  }
  getSubCategories(categoryID){
    axios.get('/api/category/get/one/'+categoryID)
    .then((response)=>{
      this.setState({
        subcategoryArray  : response.data.subCategory,
      })
    })
    .catch((error)=>{
      console.log('error',error);
    })
  }
  componentWillUnmount() {
      // $("body").find("script[src='/js/adminLte.js']").remove();
      // if(this.basicPageTracker)
      //   this.basicPageTracker.stop();
  }
  addNewRow(event) {
    event.preventDefault();
    var newArr = this.state.addrows;

    if(newArr){
        newArr.push(newArr.length + 1);
        this.setState({
            "addrows": newArr,
        });
    }
  }
  addSubCategoryWithProduct(event){
      event.preventDefault();
      // const isValidEmail = categoryRef.checkValidity();
      // console.log('isValidEmail',isValidEmail);
      // var categoryVal = this.refs.categoryRef.value;
      // var subcategoryVal = this.refs.modalAddSubCategoryRef.value;
      // if(categoryVal != '-Select-'){
      //     if(subcategoryVal){
      //         if (categoryVal.indexOf("/") >= 0 || subcategoryVal.indexOf("/") >= 0){
      //             swal({
      //                 position: 'top-right',
      //                 type: 'error',
      //                 title: 'Please remove "/" from subcategory',
      //                 text: 'Please remove "/" from subcategory',
      //                 showConfirmButton: false,
      //                 timer: 1500
      //             });
      //         }else{
      //             var formValues = {
      //                 "category"          :   categoryVal,
      //                 "subCategory"       :   subcategoryVal,
      //             }
          
      //             Meteor.call('addNewSubCategory', formValues, (error, result) => {
      //                 if(error){
      //                     swal({
      //                         position: 'top-right',
      //                         type: 'error',
      //                         text: 'Sub Category Not Added',
      //                         title: 'Sub Category Not Added',
      //                         showConfirmButton: false,
      //                         timer: 1500
      //                     });
      //                 } else {
      //                     swal({
      //                         position: 'top-right',
      //                         type: 'success',
      //                         text: 'Sub Category Added Successfully',
      //                         title: 'Sub Category Added Successfully',
      //                         showConfirmButton: false,
      //                         timer: 1500
      //                     });
      //                     this.refs.modalAddSubCategoryRef.value    = "";
      //                     $('#openSubCatgModal').modal('hide');
                          
      //                 }
      //             });
      //         }
      //     }else{
      //         this.setState({
      //             subCatFormErrors : true
      //         });
      //     }
      // }else{
      //     swal({
      //         position: 'top-right',
      //         type: 'error',
      //         text: 'Please select category value.',
      //         title: 'Please select category value.',
      //         showConfirmButton: false,
      //     });
      //     $('#openSubCatgModal').modal('hide');
      // }
  }
  addCategoryWithProduct(event){
      event.preventDefault();
      // var categoryVal = this.refs.modalCategoryRef.value;
      // var subcategoryVal = this.refs.modalSubCategoryRef.value;
      // if(categoryVal){
      //     if(subcategoryVal){
      //         if (categoryVal.indexOf("/") >= 0 || subcategoryVal.indexOf("/") >= 0){
      //             swal({
      //                 position: 'top-right',
      //                 type: 'error',
      //                 text: 'Please remove "/" from category or subcategory',
      //                 title: 'Please remove "/" from category or subcategory',
      //                 showConfirmButton: false,
      //                 timer: 1500
      //             });
      //         }else{
      //             var formValues = {
      //                 "category"          :   categoryVal,
      //                 "subCategory"       :   subcategoryVal,
      //             }
          
      //             Meteor.call('addNewCategory', formValues, (error, result) => {
      //                 if(error){
      //                     swal({
      //                         position: 'top-right',
      //                         type: 'error',
      //                         text: 'Category Not Added',
      //                         title: 'Category Not Added',
      //                         showConfirmButton: false,
      //                         timer: 1500
      //                     });
      //                 } else {
      //                     swal({
      //                         position: 'top-right',
      //                         type: 'success',
      //                         text: 'Category Added Successfully',
      //                         title: 'Category Added Successfully',
      //                         showConfirmButton: false,
      //                         timer: 1500
      //                     });
      //                     this.refs.modalCategoryRef.value    = "";
      //                     this.refs.modalSubCategoryRef.value = "";
      //                     $('#openCatgModal').modal('hide');
                          
      //                 }
      //             });            
      //         }
      //     }else{
      //         this.setState({
      //             subCatError : true
      //         });
      //     }
      // }else{
      //     this.setState({
      //         catError : true
      //     });
      // }
      
  }
  showRelevantSubCategories(event){
    event.preventDefault();
    const target = event.target;
    const name   = target.name;
    this.setState({
        [name]: event.target.value,
        subCategory       : "Select Sub-Category",
    });
    var categoryID = event.target.value.split('|')[1];    
    this.getSubCategories(categoryID);  
  }
  edit(id){
    axios.get('/api/products/get/one/'+id)
    .then((response)=>{
      console.log('edit', response.data);
      this.getCategories();
      this.getSubCategories(response.data.category_ID);
      this.setState({
        section           : response.data.section,
        category          : response.data.category+'|'+response.data.category_ID,
        subCategory       : response.data.subCategory+'|'+response.data.subCategory_ID,
        brand             : response.data.brand,
        productCode       : response.data.productCode,
        productName       : response.data.productName,
        productUrl        : response.data.productUrl,
        productDetails    : response.data.productDetails,
        shortDescription  : response.data.shortDescription,
        addrows           : response.data.featureList,
        offeredPrice      : response.data.offeredPrice,
        actualPrice       : response.data.actualPrice,
        offered           : response.data.offered,
        unit              : response.data.unit,
        availableQuantity : response.data.availableQuantity,
        currency          : response.data.currency,
        status            : response.data.status,
      },()=>{
        console.log('this', this.state);
        
      })
      
    })
    .catch((error)=>{
      console.log('error', error);
    })
  }
  submitProduct(event){
    event.preventDefault();
    var addRowLength = (this.state.addrows).length;
    // console.log('addRowLength: ', addRowLength);
    if(this.state.productFeatured){
      var productFeatured = this.state.productFeatured;
    }else {
      var productFeatured = false;
    }
    if(this.state.productExclusive){
      var productExclusive = this.state.productExclusive;
    }else {
      var productExclusive = false;
    }
    if(addRowLength && addRowLength>0){
      var productDimentionArray = [];
      var productArr = [];
      for(var i=0;i<addRowLength;i++){
        var obj = {
          "index"     : i,
          "feature"     : $(".featuresRef"+i).val(),
        }
        if($('.featureRefMain').hasClass("featuresRef"+i)){
          productDimentionArray.push(obj);
        }
      }
    }
    var formValues = {
      "section"       :   this.refs.section.value,
      "category_ID"       :   this.refs.category.value.split('|')[1],
      "category"          :   this.refs.category.value.split('|')[0],
      "subCategory_ID"    :   this.refs.subCategory.value.split('|')[1],
      "subCategory"       :   this.refs.subCategory.value.split('|')[0],
      "brand"             :   this.refs.brand.value,
      "productCode"       :   this.refs.productCode.value,
      "productName"       :   this.refs.productName.value,
      "productUrl"        :   this.refs.productUrl.value,
      "productDetails"    :   this.refs.productDetails.value,
      "shortDescription"  :   this.refs.shortDescription.value,
      "featureList"       :   productDimentionArray,
      "actualPrice"       :   this.refs.actualPrice.value,
      "offeredPrice"      :   this.state.offeredPrice ? this.state.offeredPrice : this.state.actualPrice,
      "availableQuantity" :   this.refs.availableQuantity.value,
      "unit"              :   this.refs.unit.value,
      "offered"           :   this.state.offered,
      "currency"          :   this.refs.currency.value,
      "status"            :   this.refs.status.value,
      "featured"          :   productFeatured,
      "exclusive"         :   productExclusive,
      "fileName"          :   "Manual",
    }
    console.log('formValues', formValues);
    if($('#addNewShopProduct').valid()){
      axios.post('/api/products/post', formValues)
      .then((response)=>{
        console.log('response', response);
        this.props.history.push('/add-product/image/'+response.data.product_ID);
        swal({
          title : response.data.message,
          text  : response.data.message,
        });
        this.setState({
          section       : "Select Section",
          category          : "Select Category",
          subCategory       : "Select Sub-Category",
          brand             : "",
          productCode       : "",
          productName       : "",
          productUrl        : "",
          productDetails    : "",
          shortDescription  : "",
          actualPrice       : "",
          offeredPrice      : "",
          availableQuantity : "",
          offered           : "",
          availableQuantity : "",
          currency          : "",
          status            : "",
        });
      })
      .catch((error)=>{
        console.log('error', error);
      })
    }
    

  }
  updateProduct(event){
    event.preventDefault();
    var addRowLength = (this.state.addrows).length;

    if(this.state.productFeatured){
      var productFeatured = this.state.productFeatured;
    }else {
      var productFeatured = false;
    }
    if(this.state.productExclusive){
      var productExclusive = this.state.productExclusive;
    }else {
      var productExclusive = false;
    }
    if(addRowLength && addRowLength>0){
      var productDimentionArray = [];
      var productArr = [];
      for(var i=0;i<addRowLength;i++){
        var obj = {
          "index"     : i,
          "feature"     : $(".featuresRef"+i).val(),
        }
        if($('.featureRefMain').hasClass("featuresRef"+i)){
          productDimentionArray.push(obj);
        }
      }
    }
    var formValues = {
      "section"       :   this.refs.section.value,
      "product_ID"        :   this.state.editId,
      "category_ID"       :   this.refs.category.value.split('|')[1],
      "category"          :   this.refs.category.value.split('|')[0],
      "subCategory_ID"    :   this.refs.subCategory.value.split('|')[1],
      "subCategory"       :   this.refs.subCategory.value.split('|')[0],
      "brand"             :   this.refs.brand.value,
      "productCode"       :   this.refs.productCode.value,
      "productName"       :   this.refs.productName.value,
      "productUrl"        :   this.refs.productUrl.value,
      "productDetails"    :   this.refs.productDetails.value,
      "shortDescription"  :   this.refs.shortDescription.value,
      "featureList"       :   productDimentionArray,
      "actualPrice"       :   this.state.actualPrice,
      "offeredPrice"      :   this.state.offeredPrice ? this.state.offeredPrice : this.state.actualPrice,
      "availableQuantity" :   this.refs.availableQuantity.value,
      "offered"           :   this.state.offered,
      "currency"          :   this.refs.currency.value,
      "status"            :   this.refs.status.value,
      "featured"          :   productFeatured,
      "exclusive"         :   productExclusive,
    }

    axios.patch('/api/products/patch', formValues)
    .then((response)=>{
      
      swal({
        title : response.data.message,
        text  : response.data.message,
      });
      this.setState({
        section       : "Select Section",
        category          : "Select Category",
        subCategory       : "Select Sub-Category",
        brand             : "",
        productCode       : "",
        productName       : "",
        productUrl        : "",
        productDetails    : "",
        shortDescription  : "",
        offeredPrice      : "",
        availableQuantity : "",
        currency          : "",
        status            : "",
      });
      this.props.history.push('/add-product/image/'+this.state.editId);
    })
    .catch((error)=>{
      console.log('error', error);
    })
    this.setState({
      section       : "Select Section",
      category          : "Select Category",
      subCategory       : "Select Sub-Category",
      brand             : "",
      productCode       : "",
      productName       : "",
      productUrl        : "",
      productDetails    : "",
      shortDescription  : "",
      actualPrice       : "",
      offeredPrice      : "",
      availableQuantity : "",
      offered           : "",
      availableQuantity : "",
      currency          : "",
      status            : "",
    });
  }
  createProductUrl(event){
      const target = event.target;
      const name   = target.name;
      this.setState({
          [name]: event.target.value,
      });
      var url = $(event.currentTarget).val();
      if(url){
          url = url.replace(/\s+/g, '-').toLowerCase();
          $(".productUrl").val(url);
      }
  }
  catError(event){
      // var modalCategoryRef = this.refs.modalCategoryRef.value;
      // if(modalCategoryRef){
      //     this.setState({
      //         catError : false
      //     });
      // }else{
      //     this.setState({
      //         catError : true
      //     });
      // }
  }
  subCatError(event){
      // var modalSubCategoryRef = this.refs.modalSubCategoryRef.value;
      // if(modalSubCategoryRef){
      //     this.setState({
      //         subCatError : false
      //     });
      // }else{
      //     this.setState({
      //         subCatError : true
      //     });
      // }
  }
  subCatFormErrors(){
      // var modalAddSubCategoryRef = this.refs.modalAddSubCategoryRef.value;
      // if(modalAddSubCategoryRef){
      //     this.setState({
      //         subCatFormErrors : false
      //     });
      // }else{
      //     this.setState({
      //         subCatFormErrors : true
      //     });
      // }
  }
  closeCatModal(event){
      event.preventDefault();
      // $('#openCatgModal').modal('hide');
      // this.refs.modalCategoryRef.value = '';
      // this.refs.modalSubCategoryRef.value = '';
  }
  closeCatSubModal(event){
      event.preventDefault();
      // $('#openSubCatgModal').modal('hide');
      // this.refs.modalAddSubCategoryRef.value = '';
  }
  makeProductOffered(event){
    // event.preventDefault();
    var id = event.target.id;
    var checked = event.target.checked;
    console.log('id', id, checked);
    this.setState({
      [id] : event.target.checked
    },()=>{
      console.log('offered', this.state.offered);
      if(this.state.offered == false){
        this.setState({
          offeredPrice : "",
        })
      }
    })
  }
  render(){
      return(
          <div className="container-fluid col-lg-12 col-md-12 col-xs-12 col-sm-12">
              <div className="row">
                <div className="formWrapper col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    <section className="content">
                      <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 titleaddcontact">
                              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 contactdeilsmg pageHeader">
                                  Add Products                               
                               </div>
                              <hr className="hr-head container-fluid row"/>
                            </div>
                            <form className="newTemplateForm" id="addNewShopProduct">
                              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                <div className="addNewProductWrap col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol">
                                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <label>Section <i className="redFont">*</i></label>
                                      <select onChange={this.showRelevantCategories.bind(this)} value={this.state.section}  name="section" className="form-control allProductCategories" aria-describedby="basic-addon1" id="section" ref="section">
                                        <option disabled selected defaultValue="Select Section">Select Category</option>
                                        { this.state.sectionArray && this.state.sectionArray.length > 0 ?
                                          this.state.sectionArray.map( (data, index)=>{
                                            return (
                                              <option key={index} value={data}>{data}</option>
                                            );
                                          })
                                          :
                                          null
                                        }
                                      </select>
                                      
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <label>Category <i className="redFont">*</i></label>
                                    {/*<div className="input-group" id="category">*/}
                                      <select onChange={this.showRelevantSubCategories.bind(this)} value={this.state.category}  name="category" className="form-control allProductCategories" aria-describedby="basic-addon1" id="category" ref="category">
                                        <option disabled selected defaultValue="Select Category">Select Category</option>
                                        { this.state.categoryArray && this.state.categoryArray.length > 0 ?
                                          this.state.categoryArray.map( (data, index)=>{
                                            return (
                                              <option key={index} value={data.category+'|'+data._id}>{data.category}</option>
                                            );
                                          })
                                          :
                                          null
                                        }
                                      </select>
                                      
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <label>Sub Category <i className="redFont">*</i></label>
                                    {/*<div className="input-group" id="subCategory">*/}
                                      <select className="form-control allProductSubCategories" aria-describedby="basic-addon1" name="subCategory" id="subCategory"  ref="subCategory" value={this.state.subCategory} onChange={this.handleChange.bind(this)}>
                                        <option disabled selected defaultValue="Select Sub-Category">Select Sub-Category</option>
                                        { this.state.subcategoryArray && this.state.subcategoryArray.length > 0 ?
                                          this.state.subcategoryArray.map( (data, index)=>{

                                          return (
                                            <option value={data.subCategoryTitle+'|'+data._id} key={index}>{data.subCategoryTitle}</option>
                                            );
                                          })
                                          :
                                          null
                                        }
                                      </select>
                                      
                                  </div>
                                 
                                </div>

                                <div className="addNewProductWrap col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol">
                                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <label>Brand Name <i className="redFont">*</i></label>
                                    <input value={this.state.brand} name="brand" id="brand"  type="text" className="form-control productBrandName" placeholder="Brand Name" aria-label="Brand" aria-describedby="basic-addon1" ref="brand" onChange={this.handleChange.bind(this)} />
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">                                                                        
                                    <label>Product Code <i className="redFont">*</i></label>                                                                        
                                    <input value={this.state.productCode} name="productCode" id="productCode" type="text" className="form-control link-category newProductCode" placeholder="Product Code" aria-label="Username" aria-describedby="basic-addon1" ref="productCode" onChange={this.handleChange.bind(this)} />
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <label>Product Name <i className="redFont">*</i></label>                                                                        
                                    <input value={this.state.productName} name="productName" id="productName" onChange={this.createProductUrl.bind(this)} type="text" className="form-control link-subcategory newProductName" placeholder="Product Name" aria-label="Username" aria-describedby="basic-addon1" ref="productName"  />
                                  </div>
                                </div>
                                  <div className="addNewProductWrap col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol">
                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                    <label>Product URL <i className="redFont">*</i></label>                                                                    
                                    <input value={this.state.productUrl} onChange={this.handleChange.bind(this)} id="productUrl" name="productUrl" type="text" className="form-control link-subcategory newProductName productUrl" placeholder="Product URL" aria-describedby="basic-addon1" ref="productUrl"  />
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                    <label>Unit <i className="redFont">*</i></label>
                                    <select className="form-control" ref="unit" id="unit" name="unit" value={this.state.unit} onChange={this.handleChange.bind(this)}>
                                      <option value="Single">Single</option>
                                      <option value="Dozen">Dozen</option>
                                      <option value="Kilograms">Kilograms</option>
                                      <option value="Miligrams">Miligrams</option>
                                      <option value="Liters">Liters</option>
                                      <option value="Mililiters">Mililiters</option>
                                    </select>
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
                                    <label>Available Quantity <i className="redFont">*</i></label>
                                    <input onChange={this.handleChange.bind(this)} value={this.state.availableQuantity} id="availableQuantity" name="availableQuantity" type="text" className="form-control availableQuantityNew" placeholder="Available Quantity" aria-describedby="basic-addon1" ref="availableQuantity"  />
                                  </div>
                                  </div>
                                  <div className="addNewProductWrap col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol">
                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 add-new-productCol">
                                      <label>Product Currency <i className="redFont">*</i></label>
                                      <select className="form-control" ref="currency" id="currency" name="currency" value={this.state.currency} onChange={this.handleChange.bind(this)}>
                                        <option value="inr">INR</option>
                                        <option value="usd">USD</option>
                                        <option value="eur">EUR</option>
                                        <option value="gbp">GBP</option>
                                      </select>
                                    </div>
                                    <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 add-new-productCol">
                                      <label>Product Actual Price <i className="redFont">*</i></label>
                                      <input onChange={this.handleChange.bind(this)} value={this.state.actualPrice} id="actualPrice" name="actualPrice" type="text" className="form-control actualPrice" placeholder="Price" aria-describedby="basic-addon1" ref="actualPrice"  />
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 add-new-productCol">
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                        <label>Offered</label>
                                        <input type="checkBox" id="offered" checked={this.state.offered}  onChange={this.makeProductOffered.bind(this)}/>
                                      </div>
                                      {
                                        this.state.offered ? 
                                        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 add-new-productCol NOpadding">
                                          <label>Product Offered Price <i className="redFont">*</i></label>
                                          <input onChange={this.handleChange.bind(this)} value={this.state.offeredPrice} id="offeredPrice" name="offeredPrice" type="text" className="form-control offeredPrice" placeholder="Price" aria-describedby="basic-addon1" ref="offeredPrice"  />
                                        </div>
                                        : 
                                        null
                                      }
                                    </div>
                                  </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol table-responsive">
                                  <table className="add-new-product-table table table-bordered">
                                    <thead>
                                      <tr>
                                        <th>Add New Feature</th>
                                        <th>Delete</th>
                                      </tr>
                                    </thead>

                                    <tbody className="tableBodyClass">
                                      {
                                        this.state.addrows.map((data,index)=>{
                                          return (
                                            <AddNewTableFeature index={index} feature={data.feature}  key={index} />
                                          );
                                        })
                                      }
                                    </tbody>

                                  </table>
                                  <div className="marginTop17">
                                    <button className="submitBtn btn btnSubmit col-lg-2 col-lg-offset-10 col-md-2 col-md-offset-10 col-sm-3 col-sm-offset-9 col-xs-3 col-xs-offset-9" onClick={this.addNewRow}>Add Row</button>
                                  </div>
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol">
                                  <label>Product Detail <i className="redFont">*</i></label>                                                                    
                                  <textarea value={this.state.productDetails} name="productDetails" id="productDetails" onChange={this.handleChange.bind(this)} className="form-control newProductDetails" placeholder="Product Detail..." rows="4" aria-describedby="basic-addon1" ref="productDetails" ></textarea>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol">
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <label>Short Description <i className="redFont">*</i></label>                                                                            
                                      <input value={this.state.shortDescription} name="shortDescription" id="shortDescription" onChange={this.handleChange.bind(this)} type="text" className="form-control newProductShortDesc" placeholder="Short Description" aria-label="Username" aria-describedby="basic-addon1" ref="shortDescription"  />
                                    </div>
                                    <div className="col-lg-6">
                                      <label>Status <i className="redFont">*</i></label>                                                           
                                      <select value={this.state.status} name="status" id="status" onChange={this.handleChange.bind(this)} className="form-control newProductStatus" aria-describedby="basic-addon1" ref="status" >
                                        <option>Draft</option>
                                        <option>Publish</option>
                                        <option>Unpublish</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                  <div className="">
                                  {
                                    this.state.editId ? 
                                    <button onClick={this.updateProduct.bind(this)} className="submitBtn btn btnSubmit col-lg-2 col-lg-offset-10 col-md-2 col-md-offset-10 col-sm-3 col-sm-offset-9 col-xs-3 col-xs-offset-9">Update</button>
                                    :
                                    <button onClick={this.submitProduct.bind(this)}  className="submitBtn btn btnSubmit col-lg-2 col-lg-offset-10 col-md-2 col-md-offset-10 col-sm-3 col-sm-offset-9 col-xs-3 col-xs-offset-9">Save & Next</button>
                                  }
                                  </div>
                                </div>
                              </div>
                            </form>
                            
                          </div>
                        </div>
                    </section>
                  </div>
                </div>
              </div>
            );
        }
  }

export default AddNewShopProduct;