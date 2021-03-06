import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import jQuery from 'jquery';
import {ntc} from '../../ntc/ntc.js';
import Address              from '../Address/Address.js';
import _ from 'underscore';
import SmallBanner from '../../blocks/SmallBanner/SmallBanner.js';
import Message from '../../blocks/Message/Message.js';
import 'jquery-validation';
import "./Checkout.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';
import Loader from "../../common/loader/Loader.js";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getCartData} from '../../actions/index';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            totalCartPrice: '',
            productData: {},
            productCartData: [],
            vatPercent: 0,
            companyInfo: "",
            cartProduct: "",
            shippingCharges: 0,
            quantityAdded: 0,
            totalIndPrice: 0,
            bannerData: {
                title: "CHECKOUT",
                breadcrumb: 'Checkout',
                backgroungImage: '/images/checkout.png',
            },
            discountCode: false,
            comment: false,
            giftOption: false,
            deliveryAddress: [],
            pincodeExists:true
        }
        // this.getCartData();
        // this.getCompanyDetails();
        this.getUserAddress();
        this.camelCase = this.camelCase.bind(this)
    }
    componentDidMount() {
        // this.getCartData();
        // this.getCompanyDetails();
        this.getUserAddress();
        this.validation();
    }
    validation(){
        $.validator.addMethod("regxusername", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Name should only contain letters.");
        $.validator.addMethod("regxmobileNumber", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid mobile number.");
        $.validator.addMethod("regxemail", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid email.");
        $.validator.addMethod("regxaddressLine", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid address.");
        $.validator.addMethod("regxcountry", function (value, element, arg) {
            return arg !== value;
        }, "Please select the country.");
        $.validator.addMethod("regxstate", function (value, element, arg) {
            return arg !== value;
        }, "Please select the state");
        // $.validator.addMethod("regxblock", function (value, element, regexpr) {
        //     return regexpr.test(value);
        // }, "Please enter valid block name.");
        $.validator.addMethod("regxdistrict", function (value, element, arg) {
            return arg !== value;
        }, "Please select the district");
        $.validator.addMethod("regxcity", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid city name");
        $.validator.addMethod("regxpincode", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid pincode.");
        $.validator.addMethod("regxaddType", function (value, element, arg) {
            return arg !== value;
        }, "Please select the address type.");
        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });
        $("#checkout").validate({
            rules: {
                username: {
                    regxusername : /^[A-Za-z][A-Za-z0-9\-\s]*$/,
                    required: true,
                },
                mobileNumber: {
                    regxmobileNumber : /^([7-9][0-9]{9})$/,
                    required: true,
                },
                email: {
                    required: true,
                },
                addressLine1: {
                    required: true,
                    regxaddressLine : /^[A-Za-z0-9_@./#&+-]/,
                },
                // addressLine2: {
                //     required: true,
                //     regxaddressLine : /^[A-Za-z0-9_@./#&+-]/,
                // },
                country: {
                    required: true,
                    regxcountry: "Select Country"
                },
                state: {
                    required: true,
                    regxstate: "Select State"
                },
                // block: {
                //     required: true,
                //     regxblock : /^[A-Za-z][A-Za-z\-\s]*$/,
                // },
                district: {
                    required: true,
                    regxdistrict: "Select District"
                },
                city: {
                    required: true,
                    regxcity : /^[A-Za-z][A-Za-z\-\s]*$/,
                },
                pincode: {
                    required: true,
                    regxpincode : /^[1-9][0-9]{5}$/,
                },
                addType: {
                    required: true,
                    regxaddType: "Select Type"
                },
                checkoutAddess: {
                    required: true
                },
                payMethod: {
                    required: true
                },
                termsNconditions: {
                    required: true
                }
            },
            errorPlacement: function (error, element) {
              if (element.attr("name") == "username") {
                error.insertAfter("#username");
              }
              if (element.attr("name") == "mobileNumber") {
                error.insertAfter("#mobileNumber");
              }
              if (element.attr("name") == "email") {
                error.insertAfter("#email");
              }
              if (element.attr("name") == "addressLine1") {
                error.insertAfter("#addressLine1");
              }
            //   if (element.attr("name") == "addressLine2") {
            //     error.insertAfter("#addressLine2");
            //   }
              if (element.attr("name") == "countryCode") {
                error.insertAfter("#country");
              }
              if (element.attr("name") == "stateCode") {
                error.insertAfter("#state");
              }
            //   if (element.attr("name") == "block") {
            //     error.insertAfter("#block");
            //   }
            if (element.attr("name") == "district") {
                error.insertAfter("#district");
            }
              if (element.attr("name") == "city") {
                error.insertAfter("#city");
              }
              if (element.attr("name") == "pincode") {
                error.insertAfter("#pincode");
              }
              if (element.attr("name") == "addType") {
                error.insertAfter("#addType");
              }
              if (element.attr("name") == "payMethod") {
                error.insertAfter("#payMethod");
              }
              if (element.attr("name") == "termsNconditions") {
                error.insertAfter("#termsNconditions");
              }
              if (element.attr("name") == "checkoutAddess") {
                error.insertAfter("#checkoutAddess");
              }
            }
        });
    }
    getCartData() {
        $('.fullpageloader').show();
        const userid = localStorage.getItem('user_ID');
        axios.get("/api/carts/get/list/" + userid)
            .then((response) => {
                $('.fullpageloader').hide();
                this.setState({
                    cartProduct: response.data[0]
                });
            })
            .catch((error) => {
                console.log('error', error);
            })
    }
    getCompanyDetails() {
        axios.get("/api/companysettings/list")
            .then((response) => {
                this.setState({
                    companyInfo: response.data[0]
                }, () => {
                    this.getCartTotal();
                })
            })
            .catch((error) => {
                console.log('error', error);
            })
    }
    getCartTotal() {
        var cartData = this.state.cartProduct;
        var companyData = this.state.companyInfo;

        if (cartData && companyData) {

            if (cartData.cartItems.length > 0) {
                this.setState({
                    "shippingCharges": 0,
                });
            } else {
                this.setState({
                    "shippingCharges": 0.00,
                });
            }


            this.setState({
                "productCartData": cartData.cartItems,
                "productData": cartData,
                "vatPercent": companyData.taxSettings ? companyData.taxSettings[0].taxRating : 0,
            });
        } else {
            this.setState({
                "shippingCharges": 0.00,
            });
        }
    }
    getUserAddress() {
        var user_ID = localStorage.getItem('user_ID');
        axios.get("/api/users/" + user_ID)
            .then((response) => {
                // console.log('res', response.data.profile);
                this.setState({
                    "deliveryAddress": response.data.deliveryAddress,
                    "username" : response.data.profile.fullName,
                    "mobileNumber" : response.data.profile.mobileNumber,
                    "email" : response.data.profile.emailId
                });
            })
            .catch((error) => {
                console.log('error', error);
            });
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        if (event.target.name == 'pincode') {
            this.handlePincode(event.target.value);
        }
    }
    handlePincode(pincode){
        
        if (pincode != '') {
            axios.get("https://api.postalpincode.in/pincode/" + pincode)
            .then((response) => {
                
                if ($("[name='pincode']").valid()) {
                    if (response.data[0].Status == 'Success' ) {
                        this.setState({pincodeExists : true})
                    }else{
                        this.setState({pincodeExists : false})
                    }
                }else{
                    this.setState({pincodeExists : true})
                }
            })
            .catch((error) => {
                console.log('error', error);
            })
        }else{
            this.setState({pincodeExists : true})
        }
    }
    Removefromcart(event) {
        event.preventDefault();
        const userid = localStorage.getItem('user_ID');
        const cartitemid = event.target.id;

        const formValues = {
            "user_ID": userid,
            "cartItem_ID": cartitemid,
        }
        axios.patch("/api/carts/remove", formValues)
            .then((response) => {
               this.setState({
                  messageData : {
                    "type" : "outpage",
                    "icon" : "fa fa-check-circle",
                    "message" : "&nbsp; "+response.data.message,
                    "class": "success",
                    "autoDismiss" : true
                  }
                })
                setTimeout(() => {
                    this.setState({
                        messageData   : {},
                    })
                }, 3000);
                // swal(response.data.message);
                this.getCartData();
                this.getCompanyDetails();
                this.getCartTotal();
            })
            .catch((error) => {
                console.log('error', error);
            })
    }
   
    grandtotalFunction(cartItemsMoveMain) {
        // console.log('cart', cartItemsMoveMain);
        var taxes = [];
        var calTax = [];
        var calculateTax = [];
        var temp = [];
        var grandTotal = 0;
        var taxTotal = 0;
        var totalTaxApplied = 0;
        var cartElem = cartItemsMoveMain;
        if (cartElem) {

            var noOfProducts = cartElem.cartItems.length;
            var totalAmount = 0;
            for (var i = 0; i < noOfProducts; i++) {
                var productId = cartElem.cartItems[i].productId;
                var qty = cartElem.cartItems[i].quantity;
                var discountedPrice = cartElem.cartItems[i].discountedPrice;
                var finalPrice = discountedPrice * qty;
                totalAmount += finalPrice;

            } // end of i loop
            console.log('totalAmount', discountedPrice, totalAmount);
            if (totalAmount > 0) {
                var themeSettings = this.state.companyInfo;
                console.log('themeSettings', themeSettings);
                if (themeSettings) {
                    var taxCount = themeSettings.taxSettings.length;
                    if (taxCount > 0) {
                        for (var j = 0; j < taxCount; j++) {
                            var taxName = themeSettings.taxSettings[j].taxType;
                            var createdAt = themeSettings.taxSettings[j].createdAt;
                            var taxValue = themeSettings.taxSettings[j].taxRating;
                            var taxeffectiveFrom = themeSettings.taxSettings[j].effectiveFrom;
                            var taxeffectiveTo = themeSettings.taxSettings[j].effectiveTo ? themeSettings.taxSettings[j].effectiveTo : new Date();



                            var from = taxeffectiveFrom;
                            var effectiveDateFrom = new Date(from[0], from[1] - 1, from[2]);
                            taxes.push({
                                'taxName': taxName,
                                'taxValue': parseFloat(taxValue),
                                'effectiveDateFrom': effectiveDateFrom,
                                // 'effectiveDateTo'   : effectiveDateTo,
                                'timeStamp': createdAt,
                            });
                        } // for loop j 
                        var taxesAllowed = _.pluck(taxes, "taxName");
                        var uniqueTaxes = _.uniq(taxesAllowed);
                        if (uniqueTaxes) {
                            if (uniqueTaxes.length > 0) {
                                for (var k = 0; k < uniqueTaxes.length; k++) {
                                    for (var l = 0; l < taxes.length; l++) {
                                        if (uniqueTaxes[k] == taxes[l].taxName) {
                                            var currentDate = new Date();



                                            var taxTotal = 0;
                                            var taxApplied = parseFloat(totalAmount) * (parseFloat(taxes[l].taxValue) / 100);

                                            taxTotal = parseFloat(taxTotal) + parseFloat(taxApplied);
                                            calTax.push({
                                                'taxName': taxes[l].taxName,
                                                'taxValue': parseFloat(taxes[l].taxValue),
                                                'taxTotal': parseFloat(taxTotal),
                                                'timeStamp': taxes[l].timeStamp,
                                            });
                                        } // end of uniqueTaxes[k] == taxes[l].taxName
                                    } // end of l loop

                                } // end of k loop
                            } //uniqueTaxes.length
                        }    // if uniqueTaxes

                        var multipleTaxes = _.pluck(calTax, "taxName");
                        var uniqueTaxesNames = _.uniq(multipleTaxes);

                        for (var c = 0; c < uniqueTaxesNames.length; c++) {

                            var taxNameCountVar = 0
                            for (var d = 0; d < calTax.length; d++) {
                                if (calTax[d].taxName == uniqueTaxesNames[c]) {
                                    taxNameCountVar++;
                                }
                            } // Check for count

                            if (taxNameCountVar > 1) {
                                for (var d = 0; d < calTax.length; d++) {
                                    if (calTax[d].taxName == uniqueTaxesNames[c]) {
                                        temp.push({
                                            'taxName': calTax[d].taxName,
                                            'taxValue': parseFloat(calTax[d].taxValue),
                                            'taxTotal': parseFloat(calTax[d].taxTotal),
                                            'timeStamp': new Date(calTax[d].timeStamp).getTime(),
                                        }); // end array
                                    } // end if
                                } // end d loop
                                for (var e = 0; e < temp.length; e++) {
                                    if (temp[0].timeStamp < temp[e].timeStamp) {
                                        temp[0].timeStamp = temp[e].timeStamp;
                                        temp[0].taxName = temp[e].taxName;
                                        temp[0].taxValue = temp[e].taxValue;
                                        temp[0].taxTotal = temp[e].taxTotal;

                                    } // end if
                                } // end e loop

                                calculateTax.push({
                                    'taxName': temp[0].taxName,
                                    'taxValue': parseInt(temp[0].taxValue),
                                    'taxTotal': parseInt(temp[0].taxTotal),
                                    'timeStamp': temp[0].timeStamp,
                                }); // end array
                                temp = [];
                            } else {
                                for (var d = 0; d < calTax.length; d++) {
                                    if (calTax[d].taxName == uniqueTaxesNames[c]) {
                                        calculateTax.push({
                                            'taxName': calTax[d].taxName,
                                            'taxValue': parseFloat(calTax[d].taxValue),
                                            'taxTotal': (parseFloat(calTax[d].taxTotal)),
                                            // 'taxTotalDisplay'  : formatRupees(parseFloat(calTax[d].taxTotal)) ,
                                            'taxTotalDisplay': (parseFloat(calTax[d].taxTotal)),
                                            'timeStamp': calTax[d].timeStamp,
                                        }); // end array
                                    } // end if 
                                }  // end of d loop   
                            } // end else
                        }

                        if (calculateTax.length > 0) {
                            for (var m = 0; m < calculateTax.length; m++) {
                                totalTaxApplied += calculateTax[m].taxTotal;
                            } // end of m loop
                            var finalsubTotal = parseFloat(totalAmount) + parseFloat(totalTaxApplied);

                            if ((totalAmount > 0) && (totalAmount <= 500)) {
                                var shippingCharges = 0;

                            } else if ((totalAmount > 500) && (totalAmount <= 1000)) {
                                var shippingCharges = 0;
                            } else {
                                var shippingCharges = 0;
                            }

                            var finalTotal = parseFloat(totalAmount) + parseFloat(totalTaxApplied) + this.state.shippingCharges;
                            if (cartElem.couponUsed) {
                                if (cartElem.couponUsed.moneySaved) {
                                    var taxCalc = {
                                        'finalTotal': (parseFloat(finalTotal) - parseFloat(cartElem.couponUsed.moneySaved)),
                                        'taxes': calculateTax,
                                    } // end of taxCalc

                                } else {
                                    var taxCalc = {
                                        'finalTotal': (parseFloat(finalTotal)),
                                        'taxes': calculateTax,
                                    } // end of taxCalc         
                                }
                            } else {

                                var taxCalc = {
                                    'finalTotal': (parseFloat(finalTotal)),
                                    'taxes': calculateTax,
                                } // end of taxCalc                            


                            }

                        } // end of calTax.length > 0

                    } // if taxCount > 0

                } // end if themesettings


            } // end of totalAmount > 0


        } //end of if cartElem


        return taxCalc;
    }

    discountCode(event) {
        event.preventDefault();
        this.setState({
            discountCode: this.state.discountCode == true ? false : true
        })
    }
    comment(event) {
        event.preventDefault();
        this.setState({
            comment: this.state.comment == true ? false : true
        })
    }
    giftOption(event) {
        event.preventDefault();
        this.setState({
            giftOption: this.state.giftOption == true ? false : true
        })
    }
     placeOrder(event) {
        event.preventDefault();
        var addressValues = {};
        var payMethod = $("input[name='payMethod']:checked").val();
        var checkoutAddess = $("input[name='checkoutAddess']:checked").val();
        var formValues = {
            "payMethod": payMethod,
            "user_ID": localStorage.getItem('user_ID')
        }
        var soldProducts = this.props.recentCartData[0].cartItems.filter((a, i)=>{
            return a.productDetail.availableQuantity <= 0;
        })
        if(soldProducts.length > 0){
            this.setState({
                messageData : {
                  "type" : "outpage",
                  "icon" : "fa fa-exclamation-circle",
                  "message" : "&nbsp; Please remove sold out products from cart to proceed to checkout.",
                  "class": "warning",
                  "autoDismiss" : true
                }
              })
              setTimeout(() => {
                  this.setState({
                      messageData   : {},
                  })
              }, 6000);
        }else{
            if (this.state.deliveryAddress && this.state.deliveryAddress.length > 0) {
                var deliveryAddress = this.state.deliveryAddress.filter((a, i) => {
                    return a._id == checkoutAddess
                })
                addressValues = {
                    "user_ID": localStorage.getItem('user_ID'),
                    "name": deliveryAddress.length > 0 ? deliveryAddress[0].name : "",
                    "email": deliveryAddress.length > 0 ? deliveryAddress[0].email : "",
                    "addressLine1": deliveryAddress.length > 0 ? deliveryAddress[0].addressLine1 : "",
                    "addressLine2": deliveryAddress.length > 0 ? deliveryAddress[0].addressLine2 : "",
                    "pincode": deliveryAddress.length > 0 ? deliveryAddress[0].pincode : "",
                    "block": deliveryAddress.length > 0 ? deliveryAddress[0].block : "",
                    "city": deliveryAddress.length > 0 ? deliveryAddress[0].city : "",
                    "district" : deliveryAddress.length > 0 ? deliveryAddress[0].district : "",
                    "stateCode": deliveryAddress.length > 0 ? deliveryAddress[0].stateCode : "",
                    "state": deliveryAddress.length > 0 ? deliveryAddress[0].state : "",
                    "countryCode": deliveryAddress.length > 0 ? deliveryAddress[0].countryCode : "",
                    "country": deliveryAddress.length > 0 ? deliveryAddress[0].country : "",
                    "mobileNumber": deliveryAddress.length > 0 ? deliveryAddress[0].mobileNumber : "",
                    "addType": deliveryAddress.length > 0 ? deliveryAddress[0].addType : "",
                }
            }else{
                addressValues = {
                    "user_ID": localStorage.getItem('user_ID'),
                    "name": this.state.username,
                    "email": this.state.email,
                    "addressLine1": this.state.addressLine1,
                    "addressLine2": this.state.addressLine2,
                    "pincode": this.state.pincode,
                    "block": this.state.block,
                    "district" : this.state.district,
                    "city": this.state.city,
                    "stateCode": this.state.stateCode,
                    "state": this.state.state,
                    "countryCode": this.state.countryCode,
                    "country": this.state.country,
                    "mobileNumber": this.state.mobileNumber,
                    "addType": this.state.addType
                }
                
                if ($('#checkout').valid() && this.state.pincodeExists) {
                    $('.fullpageloader').show();
                    axios.patch('/api/users/patch/address', addressValues)
                    .then((response) => {
                        $('.fullpageloader').hide();
                        this.setState({
                        messageData : {
                            "type" : "outpage",
                            "icon" : "fa fa-check-circle",
                            "message" : "&nbsp; "+response.data.message,
                            "class": "success",
                            "autoDismiss" : true
                        }
                        })
                        setTimeout(() => {
                            this.setState({
                                messageData   : {},
                            })
                        }, 3000);
                        this.getUserAddress();
                        $(".checkoutAddressModal").hide();
                        $(".modal-backdrop").hide();

                    })
                    .catch((error) => {
                        console.log('error', error);
                    });
                }
            }
            // console.log('pls');
            axios.patch('/api/carts/payment', formValues)
            .then((response) => {
            })
            .catch((error) => {
                console.log('error', error);
            })
            if ($('#checkout').valid() && this.state.pincodeExists) {
                axios.patch('/api/carts/address', addressValues)
                .then(async (response) => {
                    await this.props.fetchCartData();
                    var cartItems = this.props.recentCartData[0].cartItems.map((a, i)=>{
                        return{
                            "product_ID"        : a.productDetail._id,
                            "productName"       : a.productDetail.productName,
                            "discountPercent"   : a.productDetail.discountPercent,
                            "discountedPrice"   : a.productDetail.discountedPrice,
                            "originalPrice"     : a.productDetail.originalPrice,
                            "color"             : a.productDetail.color,
                            "size"              : a.productDetail.size,
                            "currency"          : a.productDetail.currency,
                            "quantity"          : a.quantity,
                            "subTotal"          : a.subTotal,
                            "saving"            : a.saving,
                            "productImage"      : a.productDetail.productImage,
                            "section_ID"        : a.productDetail.section_ID,
                            "section"           : a.productDetail.section,
                            "category_ID"       : a.productDetail.category_ID,
                            "category"          : a.productDetail.category,
                            "subCategory_ID"    : a.productDetail.subCategory_ID,
                            "subCategory"       : a.productDetail.subCategory,
                            "vendor_ID"         : a.productDetail.vendor_ID
                        }
                    })
                    var orderData = {
                        user_ID         : localStorage.getItem('user_ID'),
                        cartItems       : cartItems,
                        total           : this.props.recentCartData[0].total,
                        cartTotal       : this.props.recentCartData[0].cartTotal,
                        discount        : this.props.recentCartData[0].discount,
                        cartQuantity    : this.props.recentCartData[0].cartQuantity,
                        deliveryAddress : this.props.recentCartData[0].deliveryAddress,
                        paymentMethod   : this.props.recentCartData[0].paymentMethod
                    }
                    axios.post('/api/orders/post', orderData)
                    .then((result) => {
                        this.props.fetchCartData();
                        this.setState({
                            messageData : {
                            "type" : "outpage",
                            "icon" : "fa fa-check-circle",
                            "message" : "Order Placed Successfully ",
                            "class": "success",
                            "autoDismiss" : true
                            }
                        })
                        setTimeout(() => {
                            this.setState({
                                messageData   : {},
                            })
                        }, 3000);
                        this.props.history.push('/payment/' + result.data.order_ID);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                })
                .catch((error) => {
                    console.log('error', error);
                })

                
            }
        }
    }
    saveModalAddress(event) {
        event.preventDefault();
        this.modalvalidation();
        var addressValues = {
            "user_ID": localStorage.getItem('user_ID'),
            "name": this.refs.modalname.value,
            "email": this.refs.modalemail.value,
            "addressLine1": this.refs.modaladdressLine1.value,
            "addressLine2": this.refs.modaladdressLine2.value,
            "pincode": this.refs.modalpincode.value,
            "block": this.refs.modalblock.value,
            "city": this.refs.modalcity.value,
            "state": this.refs.modalstate.value,
            "country": this.refs.modalcountry.value,
            "mobileNumber": this.refs.modalmobileNumber.value,
            "addType": this.refs.modaladdType.value
        }

        if ($('#modalAddressForm').valid()) {

            axios.patch('/api/users/patch/address', addressValues)
                .then((response) => {
                    this.setState({
                      messageData : {
                        "type" : "outpage",
                        "icon" : "fa fa-check-circle",
                        "message" : "&nbsp; "+response.data.message,
                        "class": "success",
                      }
                    })
                    setTimeout(() => {
                        this.setState({
                            messageData   : {},
                        })
                    }, 3000);
                    this.getUserAddress();
                    $(".checkoutAddressModal").hide();
                    $(".modal-backdrop").hide();

                })
                .catch((error) => {
                    console.log('error', error);
                });
        }
    }
    Closepagealert(event) {
        event.preventDefault();
        $(".toast-error").html('');
        $(".toast-success").html('');
        $(".toast-info").html('');
        $(".toast-warning").html('');
        $(".toast-error").removeClass('toast');
        $(".toast-success").removeClass('toast');
        $(".toast-info").removeClass('toast');
        $(".toast-warning").removeClass('toast');

    }
    handleChangeCountry(event) {
        const target = event.target;
        this.setState({
            [event.target.name]: event.target.value,
            country : target.options[target.selectedIndex].innerHTML
        })
        this.getStates(event.target.value);
    }
    
    getStates(countryCode) {
        axios.get("http://locationapi.iassureit.com/api/states/get/list/" + countryCode)
            .then((response) => {
                this.setState({
                    stateArray: response.data
                })
                $('#Statedata').val(this.state.states);
            })
            .catch((error) => {
                console.log('error', error);
            })
    }
    handleChangeState(event){
        this.setState({
            [event.target.name]: event.target.value,
            state : event.target.options[event.target.selectedIndex].innerHTML
        })
        const target = event.target;
        const stateCode = event.target.value;
        const countryCode = this.state.countryCode;
        this.getDistrict(countryCode,stateCode);
         
    }
    getDistrict(countryCode, stateCode){
        
    axios.get("http://locationapi.iassureit.com/api/districts/get/list/"+countryCode+"/"+stateCode)
            .then((response)=>{
            // console.log('districtArray', response.data);
            this.setState({
                districtArray : response.data
            })
            // console.log(this.state.city);
            $('#Citydata').val(this.state.city);
            })
            .catch((error)=>{
                console.log('error', error);
            })
    }
    camelCase(str) {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    opDones(){
        this.getUserAddress();
    }
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Message messageData={this.state.messageData} />
                <div className="row">
                    <Loader type="fullpageloader" /> 
                    <Address opDone={this.opDones.bind(this)}/>
                    <SmallBanner bannerData={this.state.bannerData} />
                    <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                        <form id="checkout">
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div className="col-lg-12 col-md-126 col-sm-12 col-xs-12 NOpadding">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paymentMethod NOpadding">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn-warning paymentMethodTitle">PAYMENT METHOD <span className="required">*</span></div>

                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paymentInput">
                                            <input name="payMethod" type="radio" value="Cash On Delivery" className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
                                            <span className="col-lg-11 col-md-11 col-sm-10 col-xs-10">Cash On Delivery</span>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paymentInput">
                                            <input disabled name="payMethod" type="radio" value="Credit Card Direct Post" className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
                                            <span className="col-lg-11 col-md-11 col-sm-10 col-xs-10">Credit / Debit Card</span>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt15">
                                            <div id="payMethod"></div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    this.state.deliveryAddress && this.state.deliveryAddress.length > 0 ?
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingAddress NOpadding">
                                            
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn-warning shippingAddressTitle">SHIPPING ADDRESS <span className="required">*</span></div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label id="checkoutAddess"></label>
                                            </div>
                                            {   this.state.deliveryAddress && this.state.deliveryAddress.length > 0 ?
                                                this.state.deliveryAddress.map((data, index) => {
                                                    return (
                                                        <div key={'check' + index} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <input type="radio" value={data._id} name="checkoutAddess" required /> &nbsp;
                                                            <span className="checkoutADDCss"><b>{data.name}</b> <br/> {data.addressLine1} {data.addressLine2}, {data.city}, {data.district}, {data.state},{data.pincode} {data.country}.  <br/>Email: {data.email} <br/>Mobile: {data.mobileNumber} <br/><br/></span>
                                                        </div>
                                                    );
                                                })
                                                :
                                                null
                                            }
                                            
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
                                                <button className="btn btn-warning" data-toggle="modal" data-target="#checkoutAddressModal">Add New Address</button>
                                            </div>
                                        </div>
                                        :
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingAddress NOpadding">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn-warning shippingAddressTitle">SHIPPING ADDRESS</div>

                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Full Name <span className="required">*</span></label>
                                                <input type="text" maxlength="50" ref="username" name="username" id="username" value={this.state.username} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control" />
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Mobile Number <span className="required">*</span></label>
                                                <input placeholder="Eg. 9876543210" maxLength="10" type="text" ref="mobileNumber" name="mobileNumber" id="mobileNumber" value={this.state.mobileNumber} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control" />
                                                {/* <span className="col-lg-2 col-md-2 col-sm-1 col-xs-1  orderConfirmation fa fa-question-circle-o NOpadding" title="For delivery questions."></span> */}
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Email <span className="required">*</span></label>
                                                <input type="email" ref="email" name="email" id="email" value={this.state.email} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control" />
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Address Line 1 <span className="required">*</span></label>
                                                <input type="text" minLength="10" ref="addressLine1" name="addressLine1" id="addressLine1" value={this.state.addressLine1} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control" />
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Address Line 2 </label>
                                                <input type="text" ref="addressLine2" name="addressLine2" id="addressLine2" value={this.state.addressLine2} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control" />
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Country <span className="required">*</span></label>
                                                <select ref="country" name="countryCode" id="country" value={this.state.countryCode} onChange={this.handleChangeCountry.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control">
                                                    <option value="Select Country">Select Country</option>
                                                    <option value="IN">India</option>
                                                </select>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">State <span className="required">*</span></label>
                                                <select ref="state" name="stateCode" id="state" value={this.state.stateCode} onChange={this.handleChangeState.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control">
                                                    <option value="Select State">Select State</option>
                                                    {
                                                        this.state.stateArray && this.state.stateArray.length > 0 ?
                                                        this.state.stateArray.map((stateData, index)=>{
                                                            return(      
                                                                <option key={index} value={stateData.stateCode}>{this.camelCase(stateData.stateName)}</option>
                                                            );
                                                            }
                                                        ) : ''
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">District <span className="required">*</span></label>
                                                <select ref="district" name="district" id="district" value={this.state.district} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control">
                                                    <option value="Select District">Select District</option>
                                                    {  
                                                        this.state.districtArray && this.state.districtArray.length > 0 ?
                                                        this.state.districtArray.map((districtdata, index)=>{
                                                            return(      
                                                                <option  key={index} value={districtdata.districtName}>{this.camelCase(districtdata.districtName)}</option>
                                                            );
                                                            }
                                                        ) : ''
                                                        }
                                                </select>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">City <span className="required">*</span></label>
                                                <input type="text" ref="city" name="city" id="city" value={this.state.city} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control" />
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Zip/Postal Code <span className="required">*</span></label>
                                                <input type="text" ref="pincode" name="pincode" id="pincode" value={this.state.pincode} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control" />
                                                {this.state.pincodeExists ? null : <label style={{color: "red", fontWeight: "100"}}>This pincode does not exists!</label>}
                                            </div> 
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Address type <span className="required">*</span></label>
                                                <select id="addType" name="addType" ref="addType" value={this.state.addType} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control">
                                                    <option value="Home">Home (All day delivery) </option>
                                                    <option value="Office">Office/Commercial (10 AM - 5 PM Delivery)</option>
                                                </select>
                                            </div>
                                        </div>
                                }
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 orderReviews NOpadding">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn-warning orderReviewsTitle">ORDER REVIEWS</div>
                                    <table className="table table-responsive orderTable">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Products Name</th>
                                                <th className="textAlignRight">Price</th>
                                                <th className="textAlignRight">Quantity</th>
                                                <th className="textAlignRight">SubTotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.props.recentCartData && this.props.recentCartData.length > 0 ?
                                                this.props.recentCartData[0].cartItems.map((data, index) => {
                                                        
                                                        return (
                                                            <tr key={'cartData' + index}>
                                                                {/* <td><span className="fa fa-times-circle-o crossOrder" id={data._id} onClick={this.Removefromcart.bind(this)}></span></td> */}
                                                                <td><img className="img img-responsive orderImg" src={data.productDetail.productImage[0] ? data.productDetail.productImage[0] : "/images/notavailable.jpg"} /></td>
                                                                <td>
                                                                    <a href={"/productdetails/" + data.product_ID}><h5 className="productName">{data.productDetail.productName}</h5></a>
                                                                    
                                                                    {data.productDetail.discountPercent  ?
                                                                        <div className="col-lg-12 col-md-12 NOpadding">
                                                                            <span className="cartOldprice"><i className="fa fa-inr cartOldprice"></i>{data.productDetail.originalPrice}</span> &nbsp; &nbsp;
                                                                            <span className="cartPrice"><i className="fa fa-inr"></i>{data.productDetail.discountedPrice}</span> &nbsp; &nbsp;
                                                                            <span className="cartDiscountPercent">({data.productDetail.discountPercent}%)</span>
                                                                        </div>
                                                                        :
                                                                        <span className="price"><i className="fa fa-inr"></i>{data.productDetail.originalPrice}</span>
                                                                    }
                                                                    <div>
                                                                    {data.productDetail.color ?<span className="cartColor">Color : <span style={{backgroundColor : data.productDetail.color, padding: '0px 5px'}}>&nbsp;</span> {ntc.name(data.productDetail.color)[1]}, </span>: null}
                                                                        {data.productDetail.size ? <span className="cartColor">Size : {data.productDetail.size}</span>: null}
                                                                    </div>
                                                                </td>
                                                                <td className="textAlignRight">
                                                                {
                                                                    data.productDetail.availableQuantity > 0 ?
                                                                    <span className="productPrize textAlignRight"><i className={"fa fa-" + data.productDetail.currency}></i> &nbsp;{parseInt(data.productDetail.discountedPrice).toFixed(2)}</span>
                                                                    :
                                                                    <span>-</span>
                                                                }
                                                                    </td>
                                                                <td className="textAlignRight">
                                                                {
                                                                data.productDetail.availableQuantity > 0 ?
                                                                    <span className=" textAlignRight">{data.quantity}</span>
                                                                    :
                                                                    <span className="textAlignCenter sold">SOLD OUT</span>
                                                                }
                                                                </td>
                                                                <td className="textAlignRight">
                                                                {
                                                                    data.productDetail.availableQuantity > 0 ?
                                                                    <span className="productPrize textAlignRight"><i className={"fa fa-" + data.productDetail.currency}></i> &nbsp;{parseInt(data.subTotal).toFixed(2)}</span>
                                                                    :
                                                                    <span>-</span>
                                                                }
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                    :
                                                    null
                                            }
                                        </tbody>
                                    </table>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb25">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 checkoutBorder"></div>
                                    </div>
                                    <span className="col-lg-6 col-md-6 col-sm-12 col-xs-12">Cart Total:</span><span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 textAlignRight"><i className={"fa fa-inr"}></i> {this.props.recentCartData.length > 0 ? parseInt(this.props.recentCartData[0].cartTotal) : "0.00"}</span>
                                    <span className="col-lg-6 col-md-6 col-sm-12 col-xs-12">Discount:</span><span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 textAlignRight saving">- <i className={"fa fa-inr"}></i> {this.props.recentCartData.length > 0 ? parseInt(this.props.recentCartData[0].discount) : "0.00"}</span>
                                    <span className="col-lg-6 col-md-6 col-sm-12 col-xs-12">Order Total:</span><span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 textAlignRight"><i className={"fa fa-inr"}></i> {this.props.recentCartData.length > 0 ? parseInt(this.props.recentCartData[0].total) : "0.00"}</span>
                                    <span className="col-lg-6 col-md-6 col-sm-12 col-xs-12">Delivery Charges:</span><span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 textAlignRight saving">{this.state.shippingCharges > 0 ? this.state.shippingCharges : "Free"}</span>
                                    

                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt15">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 checkoutBorder"></div>
                                    </div>
                                    <span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 orderTotalText">Order Total</span><span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 textAlignRight orderTotalPrize"><i className={"fa fa-inr"}></i> {this.props.recentCartData.length > 0 ? parseInt(this.props.recentCartData[0].total) : "0.00"}</span>

                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt15 mb15">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 checkoutBorder"></div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <input type="checkbox" name="termsNconditions" title="Please Read and Accept Terms & Conditions" />  &nbsp;
                                        <span className="termsNconditionsmodal" data-toggle="modal" data-target="#termsNconditionsmodal">I agree, to the Terms & Conditions</span> <span className="required">*</span>
                                        <div className="modal col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 checkoutAddressModal" id="termsNconditionsmodal" role="dialog">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="modal-content col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                    <div className="modal-header checkoutAddressModal col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <img src="/images/Icon.png" />
                                                        <button type="button" className="close modalclosebut" data-dismiss="modal">&times;</button>
                                                        <h4 className="modal-title modalheadingcont">TERMS AND CONDITIONS</h4>
                                                    </div>
                                                    <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12 checkoutAddressModal">
                                                        <ul className="listStyle">
                                                            <li>The price of products is as quoted on the site from time to time.</li>
                                                            <li>Price and delivery costs are liable to change at any time, but changes will not affect orders in respect of which we have already sent you a Despatch Confirmation.</li>
                                                            <li>Products marked as 'non-returnable' on the product detail page cannot be returned.</li>
                                                            <li>Products may not be eligible for return in some cases, including cases of buyer's remorse such as incorrect model or color of product ordered or incorrect product ordered.</li>
                                                        </ul>
                                                    </div>
                                                    <div className="modal-footer checkoutAddressModal col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <button type="button" className="btn btn-warning" data-dismiss="modal">Cancel</button>
                                                            
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div id="termsNconditions"></div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <button className="btn btn-warning col-lg-3 col-lg-offset-9 col-md-2 col-md-offset-10 col-sm-12 col-xs-12 placeOrder" onClick={this.placeOrder.bind(this)}>Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
      recentCartData :  state.recentCartData
    }
  }
const mapDispachToProps = (dispatch) => {
  return  bindActionCreators({ fetchCartData: getCartData}, dispatch)
}

export default connect(mapStateToProps, mapDispachToProps)(Checkout);