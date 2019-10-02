import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import _ from 'underscore';
import AddNewTableFeature from '../addNewTableFeature/addNewTableFeature.js';
import 'bootstrap/js/tab.js';
import "./AddNewProduct.css";

// axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
class AddNewShopProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subcategoryArray: [],
      categoryArray: [],
      addrows: [1],
      productMode: '',
      productFeatured: false,
      productExclusive: false,
      catError: false,
      subCatError: false,
      subCatFormErrors: false,
      showDiscount : true,
      discountPercentError : "",
      editId: this.props.match.params ? this.props.match.params.productID : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.addNewRow = this.addNewRow.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    var editId = nextProps.match.params.id;
    if (nextProps.match.params.id) {
      this.setState({
        editId: editId
      })
      this.edit(editId);
    }
  }
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value,
    });
  }
  componentDidMount() {
    if (this.state.editId) {
      this.edit(this.state.editId);
    }

    $.validator.addMethod("valueNotEquals", function (value, element, arg) {
      return arg !== value;
    }, "Please select the category");
    $.validator.addMethod("regxSubCat", function (value, element, arg) {
      return arg !== value;
    }, "Please select the sub category");
    $.validator.addMethod("regxsection", function (value, element, arg) {
      return arg !== value;
    }, "Please select the section");
    $.validator.addMethod("regxbrand", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Brand should only contain letters & number.");
    $.validator.addMethod("regxProductCode", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Product Code should only contain letters & number.");
    $.validator.addMethod("regxProductName", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Product Name should only contain letters & number.");
    $.validator.addMethod("regxUrl", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Product Url should only contain letters & number.");
    $.validator.addMethod("regxPrice", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Product Price should only contain letters & number.");
    $.validator.addMethod("regxDetails", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Product Details should only contain letters & number.");
    $.validator.addMethod("regxShortDesc", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Product Short Description should only contain letters & number.");
    $.validator.addMethod("regxPrice", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Product Price should only numbers.");

    jQuery.validator.setDefaults({
      debug: true,
      success: "valid"
    });

    $("#addNewShopProduct").validate({
      rules: {
        
        section: {
          required: true,
          regxsection: "Select Section"
        },
        brand: {
          required: true,
          regxbrand: /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
        },
        productCode: {
          required: true,
        },
        itemCode:{
          required: true,
        },
        productName: {
          required: true,
        },
        productUrl: {
          required: true,
          regxUrl: /^[A-Za-z][A-Za-z0-9\-\s]*$/,
        },
        
        originalPrice: {
          required: true,
          // regxPrice: /^[0-9 ]*$/,
        },
        availableQuantity: {
          required: true,
          regxPrice: /^[0-9 ]*$/,
        },
        currency: {
          required: true,
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
      errorPlacement: function (error, element) {
        if (element.attr("name") == "category") {
          error.insertAfter("#category");
        }
        if (element.attr("name") == "subCategory") {
          error.insertAfter("#subCategory");
        }
        if (element.attr("name") == "section") {
          error.insertAfter("#section");
        }
        if (element.attr("name") == "brand") {
          error.insertAfter("#brand");
        }
        if (element.attr("name") == "productCode") {
          error.insertAfter("#productCode");
        }
        if (element.attr("name") == "itemCode") {
          error.insertAfter("#itemCode");
        }
        if (element.attr("name") == "productName") {
          error.insertAfter("#productName");
        }
        if (element.attr("name") == "productUrl") {
          error.insertAfter("#productUrl");
        }
        if (element.attr("name") == "discountedPrice") {
          error.insertAfter("#discountedPrice");
        }
        if (element.attr("name") == "originalPrice") {
          error.insertAfter("#originalPrice");
        }
        if (element.attr("name") == "availableQuantity") {
          error.insertAfter("#availableQuantity");
        }
        if (element.attr("name") == "currency") {
          error.insertAfter("#currency");
        }
        if (element.attr("name") == "productDetails") {
          error.insertAfter("#productDetails");
        }
        if (element.attr("name") == "shortDescription") {
          error.insertAfter("#shortDescription");
        }
        if (element.attr("name") == "status") {
          error.insertAfter("#status");
        }
      }
    });
    this.getSectionData();
  }
  getSectionData() {
    axios.get('/api/sections/get/list')
      .then((response) => {
        console.log('getWebCategories', response.data);
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
      section: event.target.value.split('|')[0],
      section_ID: event.target.value.split('|')[1],
    })
    axios.get('/api/category/get/list/' + event.target.value.split('|')[0])
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
  getCategories() {
    axios.get('/api/category/get/list')
      .then((response) => {
        this.setState({
          categoryArray: response.data
        })
      })
      .catch((error) => {
        console.log('error', error);
      })
  }
  getSubCategories(categoryID) {
    axios.get('/api/category/get/one/' + categoryID)
      .then((response) => {
        this.setState({
          subcategoryArray: response.data.subCategory,
        })
      })
      .catch((error) => {
        console.log('error', error);
      })
  }
  addNewRow(event) {
    event.preventDefault();
    var newArr = this.state.addrows;

    if (newArr) {
      newArr.push(newArr.length + 1);
      this.setState({
        "addrows": newArr,
      });
    }
  }
  showRelevantSubCategories(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value,
      subCategory: "Select Sub-Category",
    });
    var categoryID = event.target.value.split('|')[1];
    this.getSubCategories(categoryID);
  }
  edit(id) {
    axios.get('/api/products/get/one/' + id)
      .then((response) => {
        console.log('edit', response.data);
        this.getCategories();
        this.getSubCategories(response.data.category_ID);
        this.setState({
          section: response.data.section,
          section_ID: response.data.section_ID,
          category: response.data.category + '|' + response.data.category_ID,
          subCategory: response.data.subCategory + '|' + response.data.subCategory_ID,
          brand: response.data.brand,
          productCode: response.data.productCode,
          itemCode : response.data.itemCode,
          productName: response.data.productName,
          productUrl: response.data.productUrl,
          productDetails: response.data.productDetails,
          shortDescription: response.data.shortDescription,
          addrows: response.data.featureList,
          discountPercent: response.data.discountPercent,
          discountedPrice: response.data.discountedPrice,
          originalPrice: response.data.originalPrice,
          size: response.data.size,
          color: response.data.color,
          unit: response.data.unit,
          availableQuantity: response.data.availableQuantity,
          currency: response.data.currency,
          status: response.data.status,
        }, () => {
          console.log('this', this.state);

        })

      })
      .catch((error) => {
        console.log('error', error);
      })
  }
  submitProduct(event) {
    event.preventDefault();
    var addRowLength = (this.state.addrows).length;
    // console.log('addRowLength: ', addRowLength);
    if (this.state.productFeatured) {
      var productFeatured = this.state.productFeatured;
    } else {
      var productFeatured = false;
    }
    if (this.state.productExclusive) {
      var productExclusive = this.state.productExclusive;
    } else {
      var productExclusive = false;
    }
    if (addRowLength && addRowLength > 0) {
      var productDimentionArray = [];
      var productArr = [];
      for (var i = 0; i < addRowLength; i++) {
        var obj = {
          "index": i,
          "feature": $(".featuresRef" + i).val(),
        }
        if ($('.featureRefMain').hasClass("featuresRef" + i)) {
          productDimentionArray.push(obj);
        }
      }
    }
    var formValues = {
      "section": this.refs.section.value.split('|')[0],
      "section_ID": this.refs.section.value.split('|')[1],
      "category_ID": this.refs.category.value.split('|')[1],
      "category": this.refs.category.value.split('|')[0],
      "subCategory_ID": this.refs.subCategory.value.split('|')[1],
      "subCategory": this.refs.subCategory.value.split('|')[0],
      "brand": this.refs.brand.value,
      "productCode": this.refs.productCode.value,
      "itemCode" : this.refs.itemCode.value,
      "productName": this.refs.productName.value,
      "productUrl": this.refs.productUrl.value,
      "productDetails": this.refs.productDetails.value,
      "shortDescription": this.refs.shortDescription.value,
      "featureList": productDimentionArray,
      "originalPrice": this.refs.originalPrice.value,
      "discountPercent": this.refs.discountPercent.value,
      "discountedPrice": this.state.discountedPrice ? this.state.discountedPrice : this.state.originalPrice,
      "availableQuantity": this.refs.availableQuantity.value,
      "unit": this.refs.unit.value,
      "size": this.refs.size.value,
      "color": this.refs.color.value,
      "currency": this.refs.currency.value,
      "status": this.refs.status.value,
      "featured": productFeatured,
      "exclusive": productExclusive,
      "fileName": "Manual",
    }
    console.log('formValues', formValues);
    if ($('#addNewShopProduct').valid()) {
      if(this.state.discountPercentError == ""){
        console.log('discountPercentError', this.state.discountPercentError);
        axios.post('/api/products/post', formValues)
        .then((response) => {
          console.log('response', response);
          this.props.history.push('/add-product/image/' + response.data.product_ID);
          swal({
            title: response.data.message,
            text: response.data.message,
          });
          this.setState({
            section: "Select Section",
            category: "Select Category",
            subCategory: "Select Sub-Category",
            brand: "",
            productCode: "",
            itemCode : "",
            productName: "",
            productUrl: "",
            productDetails: "",
            shortDescription: "",
            originalPrice: "",
            discountedPrice: "",
            size: "",
            color: "",
            availableQuantity: "",
            availableQuantity: "",
            currency: "",
            status: "",
          });
        })
        .catch((error) => {
          console.log('error', error);
        })
      }
    }
  }
  updateProduct(event) {
    event.preventDefault();
    var addRowLength = (this.state.addrows).length;

    if (this.state.productFeatured) {
      var productFeatured = this.state.productFeatured;
    } else {
      var productFeatured = false;
    }
    if (this.state.productExclusive) {
      var productExclusive = this.state.productExclusive;
    } else {
      var productExclusive = false;
    }
    if (addRowLength && addRowLength > 0) {
      var productDimentionArray = [];
      var productArr = [];
      for (var i = 0; i < addRowLength; i++) {
        var obj = {
          "index": i,
          "feature": $(".featuresRef" + i).val(),
        }
        if ($('.featureRefMain').hasClass("featuresRef" + i)) {
          productDimentionArray.push(obj);
        }
      }
    }
    var formValues = {
      "section": this.refs.section.value.split('|')[0],
      "section_ID": this.refs.section.value.split('|')[1],
      "product_ID": this.state.editId,
      "category_ID": this.refs.category.value.split('|')[1],
      "category": this.refs.category.value.split('|')[0],
      "subCategory_ID": this.refs.subCategory.value.split('|')[1],
      "subCategory": this.refs.subCategory.value.split('|')[0],
      "brand": this.refs.brand.value,
      "productCode": this.refs.productCode.value,
      "itemCode": this.refs.itemCode.value,
      "productName": this.refs.productName.value,
      "productUrl": this.refs.productUrl.value,
      "productDetails": this.refs.productDetails.value,
      "shortDescription": this.refs.shortDescription.value,
      "featureList": productDimentionArray,
      "originalPrice": this.state.originalPrice,
      "discountPercent": this.state.discountPercent,
      "size": this.refs.size.value,
      "color": this.refs.color.value,
      "discountedPrice": this.state.discountedPrice ? this.state.discountedPrice : this.state.originalPrice,
      "availableQuantity": this.refs.availableQuantity.value,
      "currency": this.refs.currency.value,
      "status": this.refs.status.value,
      "featured": productFeatured,
      "exclusive": productExclusive,
    }

    axios.patch('/api/products/patch', formValues)
      .then((response) => {

        swal({
          title: response.data.message,
          text: response.data.message,
        });
        this.setState({
          section: "Select Section",
          category: "Select Category",
          subCategory: "Select Sub-Category",
          brand: "",
          productCode: "",
          itemCode : "",
          productName: "",
          productUrl: "",
          productDetails: "",
          shortDescription: "",
          size: "",
          color: "",
          discountedPrice: "",
          availableQuantity: "",
          currency: "",
          status: "",
        });
        this.props.history.push('/add-product/image/' + this.state.editId);
      })
      .catch((error) => {
        console.log('error', error);
      })
    this.setState({
      section: "Select Section",
      category: "Select Category",
      subCategory: "Select Sub-Category",
      brand: "",
      productCode: "",
      itemCode : "",
      productName: "",
      productUrl: "",
      productDetails: "",
      shortDescription: "",
      originalPrice: "",
      discountedPrice: "",
      availableQuantity: "",
      size: "",
      color: "",
      availableQuantity: "",
      currency: "",
      status: "",
    });
  }
  createProductUrl(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value,
    });
    var url = $(event.currentTarget).val();
    if (url) {
      url = url.replace(/\s+/g, '-').toLowerCase();
      $(".productUrl").val(url);
    }
  }
  discountedPrice(event){
    event.preventDefault();
    this.setState({
      [event.target.name] : event.target.value
    })
    console.log('discountPercent', event.target.value);
    if(event.target.value > 100){
      this.setState({
        discountPercentError : "Discount Percent should be less than 100."
      })
    }else if(event.target.value < 0){
      this.setState({
        discountPercentError : "Discount Percent should be greater than 0.",
        discountedPrice : 0
      })
    }else{
      this.setState({
        discountPercentError : ""
      })
    }
    var originalPrice = parseFloat(this.refs.originalPrice.value).toFixed(2);
    
    if(originalPrice != "NaN"){
      var discountedPrice = parseFloat(originalPrice) - parseFloat((originalPrice * event.target.value)/100);
      this.setState({
        discountedPrice : discountedPrice < 0 ? 0 : discountedPrice
      })
    }
  }
  discountPercent(event){
    event.preventDefault();
    this.setState({
      [event.target.name] : event.target.value
    })
    
    var originalPrice = parseFloat(this.refs.originalPrice.value).toFixed(2);
    if(originalPrice != "NaN"){
      var discountPercent = parseFloat(((originalPrice - event.target.value)/originalPrice )*100).toFixed(2);
      this.setState({
        discountPercent : discountPercent
      })
    }
  }
  percentAndPrice(event){
    event.preventDefault();
    this.setState({
      [event.target.name] : event.target.value,
      
    });
    if(event.target.value){
      this.setState({
        showDiscount : false
      })
    }else{
      this.setState({
        showDiscount : true,
        discountPercent : "",
        discountedPrice : "",
      })
    }
    var discountPercent =  parseFloat(this.refs.discountPercent.value);
    var discountedPrice = parseFloat(this.refs.discountedPrice.value);

    if(discountPercent){
      this.setState({
        discountedPrice : parseFloat(event.target.value) - parseFloat((event.target.value * discountPercent)/100).toFixed(2)
      });
    }
    if(discountedPrice){
      this.setState({
        discountPercent : parseFloat((event.target.value - discountedPrice/event.target.value )*100).toFixed(2)
      });
    }
  }
  render() {
    return (
      <section className="content">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
          <div className="row">
            <div className="box">
              <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                <h4 className="NOpadding-right">Add Products</h4>
              </div>

            </div>
            <form className="newTemplateForm" id="addNewShopProduct">
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 marginTopp">
                <div className="addNewProductWrap col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol">
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <label>Section <i className="redFont">*</i></label>
                    <select onChange={this.showRelevantCategories.bind(this)} value={this.state.section + '|' + this.state.section_ID} name="section" className="form-control allProductCategories" aria-describedby="basic-addon1" id="section" ref="section">
                      <option defaultValue="Select Section">Select Section</option>
                      {this.state.sectionArray && this.state.sectionArray.length > 0 ?
                        this.state.sectionArray.map((data, index) => {
                          return (
                            <option key={index} value={data.section + '|' + data._id}>{data.section}</option>
                          );
                        })
                        :
                        null
                      }
                    </select>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <label>Category </label>
                    {/*<div className="input-group" id="category">*/}
                    <select onChange={this.showRelevantSubCategories.bind(this)} value={this.state.category} name="category" className="form-control allProductCategories" aria-describedby="basic-addon1" id="category" ref="category">
                      <option disabled selected defaultValue="">Select Category</option>
                      {this.state.categoryArray && this.state.categoryArray.length > 0 ?
                        this.state.categoryArray.map((data, index) => {
                          return (
                            <option key={index} value={data.category + '|' + data._id}>{data.category}</option>
                          );
                        })
                        :
                        null
                      }
                    </select>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <label>Sub Category </label>
                    {/*<div className="input-group" id="subCategory">*/}
                    <select className="form-control allProductSubCategories" aria-describedby="basic-addon1" name="subCategory" id="subCategory" ref="subCategory" value={this.state.subCategory} onChange={this.handleChange.bind(this)}>
                      <option disabled selected defaultValue="">Select Sub-Category</option>
                      {this.state.subcategoryArray && this.state.subcategoryArray.length > 0 ?
                        this.state.subcategoryArray.map((data, index) => {

                          return (
                            <option value={data.subCategoryTitle + '|' + data._id} key={index}>{data.subCategoryTitle}</option>
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
                    <label>Product Code <i className="redFont">*</i></label>
                    <input value={this.state.productCode} name="productCode" id="productCode" type="text" className="form-control link-category newProductCode" placeholder="Product Code" aria-label="Username" aria-describedby="basic-addon1" ref="productCode" onChange={this.handleChange.bind(this)} />
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <label>Item Code <i className="redFont">*</i></label>
                    <input value={this.state.itemCode} name="itemCode" id="itemCode" type="text" className="form-control link-category newProductCode" placeholder="Product Code" aria-label="Username" aria-describedby="basic-addon1" ref="itemCode" onChange={this.handleChange.bind(this)} />
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <label>Product Name <i className="redFont">*</i></label>
                    <input value={this.state.productName} name="productName" id="productName" onChange={this.createProductUrl.bind(this)} type="text" className="form-control link-subcategory newProductName" placeholder="Product Name" aria-label="Username" aria-describedby="basic-addon1" ref="productName" />
                  </div>
                  
                </div>
                <div className="addNewProductWrap col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <label>Product URL <i className="redFont">*</i></label>
                    <input value={this.state.productUrl} onChange={this.handleChange.bind(this)} id="productUrl" name="productUrl" type="text" className="form-control link-subcategory newProductName productUrl" placeholder="Product URL" aria-describedby="basic-addon1" ref="productUrl" />
                  </div>

                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <label>Brand Name <i className="redFont">*</i></label>
                    <input value={this.state.brand} name="brand" id="brand" type="text" className="form-control productBrandName" placeholder="Brand Name" aria-label="Brand" aria-describedby="basic-addon1" ref="brand" onChange={this.handleChange.bind(this)} />
                  </div>

                  <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 paddingRightZeroo">
                    <label>Quantity <i className="redFont">*</i></label>
                    <input onChange={this.handleChange.bind(this)} value={this.state.availableQuantity} id="availableQuantity" name="availableQuantity" type="text" className="form-control availableQuantityNew" placeholder="Quantity" aria-describedby="basic-addon1" ref="availableQuantity" />
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 paddingLeftZeroo">
                    <label>Unit <i className="redFont">*</i></label>
                    <select className="form-control selectdropdown " ref="unit" id="unit" name="unit" value={this.state.unit} onChange={this.handleChange.bind(this)}>
                      <option value="Single">Single</option>
                      <option value="Dozen">Dozen</option>
                      <option value="Kilograms">Kilograms</option>
                      <option value="Miligrams">Miligrams</option>
                      <option value="Liters">Liters</option>
                      <option value="Mililiters">Mililiters</option>
                    </select>
                  </div>

                  
                </div>
                <div className="addNewProductWrap col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol">
                  <div className=" col-lg-2 col-md-2 col-sm-12 col-xs-12 paddingRightZeroo">
                    <label>Original Price <i className="redFont">*</i></label>
                    <input onChange={this.percentAndPrice.bind(this)} value={this.state.originalPrice} id="originalPrice" name="originalPrice" type="text" className="form-control availableQuantityNew" placeholder="Original Price" aria-describedby="basic-addon1" ref="originalPrice" />
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 paddingLeftZeroo">
                    <label>Currency <i className="redFont">*</i></label>
                    <select className="form-control selectdropdown" ref="currency" id="currency" name="currency" value={this.state.currency} onChange={this.handleChange.bind(this)}>
                      <option value="inr">INR</option>
                      <option value="usd">USD</option>
                      <option value="eur">EUR</option>
                      <option value="gbp">GBP</option>
                    </select>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 NOpadding">
                    <div className=" col-lg-6 col-md-6 col-sm-12 col-xs-12 paddingRightZeroo">
                      <label>Discount Percent (%)</label>
                      <input disabled={this.state.showDiscount}  value={this.state.discountPercent} onChange={this.discountedPrice.bind(this)} placeholder="Discount Percent" id="discountPercent" name="discountPercent" type="number" className="form-control  availableQuantityNew"  aria-describedby="basic-addon1" ref="discountPercent" />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 paddingLeftZeroo">
                      <label>Discount Price </label>
                      <input disabled={this.state.showDiscount} onChange={this.discountPercent.bind(this)} value={this.state.discountedPrice} id="discountedPrice" name="discountedPrice" type="text" className="form-control  selectdropdown" placeholder="Discounted Price" aria-describedby="basic-addon1" ref="discountedPrice" />
                    </div>
                    <label className="error col-lg-12">{this.state.discountPercentError}</label>
                  </div>
                  
                  <div className=" col-lg-2 col-md-2 col-sm-12 col-xs-12 ">
                    <label>Size</label>
                    <input onChange={this.handleChange.bind(this)} value={this.state.size} id="size" name="size" type="text" className="form-control " placeholder="Size" aria-describedby="basic-addon1" ref="size" />
                  </div>
                  <div className=" col-lg-2 col-md-2 col-sm-12 col-xs-12   ">
                    <label>Color</label>
                    <input onChange={this.handleChange.bind(this)} value={this.state.color} id="color" name="color" type="color" className="form-control" placeholder="Color" aria-describedby="basic-addon1" ref="color" />
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
                        this.state.addrows.map((data, index) => {
                          return (
                            <AddNewTableFeature index={index} feature={data.feature} key={index} />
                          );
                        })
                      }
                    </tbody>

                  </table>
                  <div className="marginTop17">
                    <button className="submitBtn btn btnSubmit col-lg-2 col-lg-offset-10 col-md-2 col-md-offset-10 col-sm-3 col-sm-offset-9 col-xs-3 col-xs-offset-9 pull-right" onClick={this.addNewRow}>Add Row</button>
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
                      <input value={this.state.shortDescription} name="shortDescription" id="shortDescription" onChange={this.handleChange.bind(this)} type="text" className="form-control newProductShortDesc" placeholder="Short Description" aria-label="Username" aria-describedby="basic-addon1" ref="shortDescription" />
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
                        <button onClick={this.updateProduct.bind(this)} className="submitBtn btn btnSubmit col-lg-2 col-lg-offset-10 col-md-2 col-md-offset-10 col-sm-3 col-sm-offset-9 col-xs-3 col-xs-offset-9 pull-right">Update</button>
                        :
                        <button onClick={this.submitProduct.bind(this)} className="submitBtn btn btnSubmit col-lg-2 col-lg-offset-10 col-md-2 col-md-offset-10 col-sm-3 col-sm-offset-9 col-xs-3 col-xs-offset-9 pull-right">Save & Next</button>
                    }
                  </div>
                </div>
              </div>
            </form>

          </div>
        </div>
      </section>
    );
  }
}

export default AddNewShopProduct;