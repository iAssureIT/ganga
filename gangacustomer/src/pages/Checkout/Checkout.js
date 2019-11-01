import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import jQuery from 'jquery';
import moment from 'moment';
import _ from 'underscore';
import SmallBanner from '../../blocks/SmallBanner/SmallBanner.js';
import { ToastsContainer, ToastsStore, ToastsContainerPosition, message, timer, classNames } from 'react-toasts';

import 'jquery-validation';
import "./Checkout.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';

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
            deliveryAddress: []
        }
        this.getCartData();
        this.getCompanyDetails();
        this.getUserAddress();
        this.camelCase = this.camelCase.bind(this)
    }

    componentDidMount() {
        this.getCartData();
        this.getCompanyDetails();
        this.getUserAddress();
        this.validation();
        this.modalvalidation();
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
        $.validator.addMethod("regxblock", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid block name.");
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
                    regxaddressLine : /^[A-Za-z][A-Za-z0-9\-\s]/,
                },
                addressLine2: {
                    required: true,
                    regxaddressLine : /^[A-Za-z][A-Za-z0-9\-\s]/,
                },
                country: {
                    required: true,
                    regxcountry: "Select Country"
                },
                state: {
                    required: true,
                    regxstate: "Select State"
                },
                block: {
                    required: true,
                    regxblock : /^[A-Za-z][A-Za-z0-9\-\s]/,
                },
                city: {
                    required: true,
                    regxcity : /^[A-Za-z][A-Za-z0-9\-\s]/,
                },
                pincode: {
                    required: true,
                    regxpincode : /^[A-Za-z][A-Za-z0-9\-\s]*$/,
                },
                addType: {
                    required: true,
                    regxaddType: "Select Section"
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
              if (element.attr("name") == "addressLine2") {
                error.insertAfter("#addressLine2");
              }
              if (element.attr("name") == "country") {
                error.insertAfter("#country");
              }
              if (element.attr("name") == "state") {
                error.insertAfter("#state");
              }
              if (element.attr("name") == "block") {
                error.insertAfter("#block");
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
            }
        });
    }
    modalvalidation() {
        $.validator.addMethod("modalregxname", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Name should only contain letters & number.");
        $.validator.addMethod("modalregxmobileNumber", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid mobile number.");
        $.validator.addMethod("modalregxemail", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid email address.");
        $.validator.addMethod("modalregxpincode", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid pincode");
        $.validator.addMethod("modalregxblock", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid block");
        $.validator.addMethod("modalregxcity", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid city");
        $.validator.addMethod("modalregxstate", function (value, element, arg) {
            return arg !== value;
        }, "Please select the state");
        $.validator.addMethod("modalregxcountry", function (value, element, arg) {
            return arg !== value;
        }, "Please select the country");
        $.validator.addMethod("modalregxaddType", function (value, element, arg) {
            return arg !== value;
        }, "Please select the address type");

        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });

        $("#modalAddressForm").validate({
            rules: {
                modalname: {
                    required: true,
                    modalregxname : /^[A-Za-z][A-Za-z0-9\-\s]*$/,
                },
                modalmobileNumber: {
                    required: true,
                    modalregxmobileNumber: /^\d{10}$/
                },
                modalemail: {
                    required: true,
                    modalregxemail: /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
                },
                modaladdressLine1: {
                    required: true,
                },
                modaladdressLine2: {
                    required: true,
                },
                modalpincode: {
                    required: true,
                },
                modalblock: {
                    required: true,
                },
                modalcity: {
                    required: true,
                },
                modalstate: {
                    required: true,
                    regxstate: "Select State"
                },
                modalcountry: {
                    required: true,
                    regxcountry: "Select Country"
                },
                modaladdType: {
                    required: true,
                    regxaddType: "Select Type"
                },
            },
            errorPlacement: function (error, element) {
                if (element.attr("name") == "modalname") {
                    error.insertAfter("#modalname");
                }
                if (element.attr("name") == "modalmobileNumber") {
                    error.insertAfter("#modalmobileNumber");
                }
                if (element.attr("name") == "modalemail") {
                    error.insertAfter("#modalemail");
                }
                if (element.attr("name") == "modaladdressLine1") {
                    error.insertAfter("#modaladdressLine1");
                }
                if (element.attr("name") == "modaladdressLine2") {
                    error.insertAfter("#modaladdressLine2");
                }
                if (element.attr("name") == "modalpincode") {
                    error.insertAfter("#modalpincode");
                }
                if (element.attr("name") == "modalblock") {
                    error.insertAfter("#modalblock");
                }
                if (element.attr("name") == "modalcity") {
                    error.insertAfter("#modalcity");
                }
                if (element.attr("name") == "modalstate") {
                    error.insertAfter("#modalstate");
                }
                if (element.attr("name") == "modalcountry") {
                    error.insertAfter("#modalcountry");
                }
                if (element.attr("name") == "modaladdType") {
                    error.insertAfter("#modaladdType");
                }
            }
        });
    }
    getCartData() {
        const userid = localStorage.getItem('user_ID');
        axios.get("/api/carts/get/list/" + userid)
            .then((response) => {
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
                    "shippingCharges": 100.00,
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
                this.setState({
                    "deliveryAddress": response.data.deliveryAddress,
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
                ToastsStore.success(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
                // swal(response.data.message);
                this.getCartData();
                this.getCompanyDetails();
                this.getCartTotal();
            })
            .catch((error) => {
                console.log('error', error);
            })
    }
    cartquantityincrease(event) {
        event.preventDefault();
        const userid = localStorage.getItem('user_ID');
        const cartitemid = event.target.getAttribute('id');
        const quantity = parseInt(event.target.getAttribute('dataquntity'));

        const quantityAdded = parseInt(quantity + 1);
        const proprice = event.target.getAttribute('dataprice');
        if (quantity > 0) {
            var totalIndPrice = quantityAdded * proprice;
        }

        const formValues = {
            "user_ID": userid,
            "cartItem_ID": cartitemid,
            "quantityAdded": quantityAdded,
            "totalIndPrice": totalIndPrice
        }
        axios.patch("/api/carts/quantity", formValues)
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log('error', error);
            })
        this.getCartData();
        this.getCompanyDetails();
    }
    grandtotalFunction(cartItemsMoveMain) {
        console.log('cart', cartItemsMoveMain);
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
                                var shippingCharges = 100;

                            } else if ((totalAmount > 500) && (totalAmount <= 1000)) {
                                var shippingCharges = 50;
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
    cartquantitydecrease(event) {
        event.preventDefault();
        const userid = localStorage.getItem('user_ID');
        const cartitemid = event.target.getAttribute('id');
        const quantity = parseInt(event.target.getAttribute('dataquntity'));


        const quantityAdded = parseInt(quantity - 1) <= 0 ? 1 : parseInt(quantity - 1);
        const proprice = event.target.getAttribute('dataprice');
        if (quantity > 0) {
            var totalIndPrice = quantityAdded * proprice;
        }

        const formValues = {
            "user_ID": userid,
            "cartItem_ID": cartitemid,
            "quantityAdded": quantityAdded,
            "totalIndPrice": totalIndPrice
        }

        axios.patch("/api/carts/quantity", formValues)
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log('error', error);
            })
        this.getCartData();
        this.getCompanyDetails();
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
        var checkedBox = $("input[name='termsNconditions']:checked").val();
        var checkoutAddess = $("input[name='checkoutAddess']:checked").val();
        var formValues = {
            "payMethod": payMethod,
            "user_ID": localStorage.getItem('user_ID')
        }

        if (this.state.deliveryAddress && this.state.deliveryAddress.length > 0) {
            var deliveryAddress = this.state.deliveryAddress.filter((a, i) => {
                return a._id == checkoutAddess
            })
            console.log('in ifffff');
            addressValues = {
                "user_ID": localStorage.getItem('user_ID'),
                "name": deliveryAddress.length > 0 ? deliveryAddress[0].name : "",
                "email": deliveryAddress.length > 0 ? deliveryAddress[0].email : "",
                "addressLine1": deliveryAddress.length > 0 ? deliveryAddress[0].addressLine1 : "",
                "addressLine2": deliveryAddress.length > 0 ? deliveryAddress[0].addressLine2 : "",
                "pincode": deliveryAddress.length > 0 ? deliveryAddress[0].pincode : "",
                "block": deliveryAddress.length > 0 ? deliveryAddress[0].block : "",
                "city": deliveryAddress.length > 0 ? deliveryAddress[0].city : "",
                "state": deliveryAddress.length > 0 ? deliveryAddress[0].state : "",
                "country": deliveryAddress.length > 0 ? deliveryAddress[0].country : "",
                "mobileNumber": deliveryAddress.length > 0 ? deliveryAddress[0].mobileNumber : "",
                "addType": deliveryAddress.length > 0 ? deliveryAddress[0].addType : "",
            }
        }else{
            console.log('in elseee');
            addressValues = {
                "user_ID": localStorage.getItem('user_ID'),
                "name": this.state.username,
                "email": this.state.email,
                "addressLine1": this.state.addressLine1,
                "addressLine2": this.state.addressLine2,
                "pincode": this.state.pincode,
                "block": this.state.block,
                "city": this.state.city,
                "state": this.state.state,
                "country": this.state.country,
                "mobileNumber": this.state.mobileNumber,
                "addType": this.state.addType
            }
            if ($('#checkout').valid()) {
            axios.patch('/api/users/patch/address', addressValues)
                .then((response) => {
                    ToastsStore.success(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
                    // swal(response.data.message);
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
        if ($('#checkout').valid()) {
            axios.patch('/api/carts/address', addressValues)
                .then((response) => {
                })
                .catch((error) => {
                    console.log('error', error);
                })

            axios.patch('/api/carts/payment', formValues)
                .then((response) => {
                })
                .catch((error) => {
                    console.log('error', error);
                })

            var cartItemsMoveMain = this.state.cartProduct;
            var grandTotalArray = this.grandtotalFunction(cartItemsMoveMain);
            console.log('grandTotalArray', grandTotalArray);
            if (grandTotalArray) {
                var totalAmount = grandTotalArray.finalTotal;
                // var totalAmount       = 100;
                var selectedPayMethod = payMethod;
                // var userId            = Meteor.userId();
                if (payMethod == "Cash On Delivery" || payMethod == 'Cash Payment' || payMethod == 'cheque payment') {

                    var userId = localStorage.getItem('user_ID');
                    var i = 0;
                    var productIds = [];
                    var prices = [];
                    var qtys = [];
                    var totals = [];
                    var index = [];
                    var discountedProdPrice = [];
                    var totalAmount = 0;
                    var discountAvail = 0;
                    var cartItemsMove = cartItemsMoveMain;

                    if (cartItemsMove) {
                        var noOfItems = cartItemsMove.cartItems.length;
                        for (i = 0; i < noOfItems; i++) {
                            var discountPrice = 0;
                            var cartProduct = cartItemsMove.cartItems[i];
                            var productId = cartProduct.productId;
                            var productIndex = cartProduct.indexInproducts;
                            var qty = cartProduct.quantity;
                            console.log('qty', qty);
                            if (cartProduct.deductedAmtAftrCoupon) {
                                discountPrice = cartProduct.deductedAmtAftrCoupon;
                            }

                            productIds[i] = productId;
                            prices[i] = (cartProduct.discountedPrice);
                            qtys[i] = qty;
                            totals[i] = (cartProduct.totalForQantity);;
                            totalAmount = totalAmount + totals[i];
                            index[i] = productIndex;
                            discountedProdPrice[i] = discountPrice;
                        }
                        console.log('qtys', qtys);
                        // if(grandtotalValue){
                        var inputObject = {
                            "user_ID"               : userId,
                            "productIds"            : productIds,
                            "productName"           : cartItemsMove.productName,
                            "prices"                : prices,
                            "qtys"                  : qtys,
                            "totals"                : totals,
                            "discountedProdPrice"   : discountedProdPrice,
                            "totalAmount"           : (grandTotalArray.finalTotal),
                            "index"                 : index,
                            "totalForQantity"       : cartItemsMove.totalForQantity,
                            "productImage"          : cartItemsMove.productImage,
                            // "couponUsed"         : cartItemsMove.couponUsed,
                        }

                        axios.post('/api/orders/post', inputObject)
                            .then((result) => {
                                if (result) {
                                    axios.get('/api/orders/get/one/' + result.data.order_ID)
                                    .then((orderStatus) => {
                                        if (orderStatus) {
                                            var userId = orderStatus.userId;
                                            var orderNo = orderStatus.OrderId;
                                            var orderDbDate = orderStatus.createdAt;
                                            var orderDate = moment(orderDbDate).format('DD/MM/YYYY');
                                            var totalAmount = orderStatus.totalAmount;
                                            var userId = localStorage.getItem('user_ID');
                                            // swal('Order Placed Successfully'); 
                                            ToastsStore.success(<div className="alertback">Order Placed Successfully<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)

                                            this.props.history.push('/payment/' + result.data.order_ID);
                                        }
                                    })
                                    .catch((error) => {
                                        console.log('error', error)
                                    })
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            })

                    } else {
                        if (selectedPayMethod == "Online Payment") {
                            //pending
                        }
                    }
                }//End of grandtotal array
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
                    ToastsStore.success(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
                    // swal(response.data.message);
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
            [event.target.name]: event.target.value
        })
        this.getStates($(target).val())
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
    camelCase(str) {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    render() {
        console.log('address',this.state.deliveryAddress);
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="pagealertnone">
                    <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
                </div>
                <div className="row">
                    <SmallBanner bannerData={this.state.bannerData} />
                    <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                        <form id="checkout">
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                {
                                    this.state.deliveryAddress && this.state.deliveryAddress.length > 0 ?
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingAddress NOpadding">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn-warning shippingAddressTitle">1 SHIPPING ADDRESS</div>
                                            {   this.state.deliveryAddress && this.state.deliveryAddress.length > 0 ?
                                                this.state.deliveryAddress.map((data, index) => {
                                                    return (
                                                        <div key={'check' + index} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
                                                            <input type="radio" value={data._id} name="checkoutAddess" required /> &nbsp;
                                                            <span>{data.name} {data.addressLine1} {data.addressLine2} {data.block} {data.city} {data.state} {data.country} {data.pincode}</span>
                                                        </div>
                                                    );
                                                })
                                                :
                                                null
                                            }
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label id="checkoutAddess"></label>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
                                                <button className="btn btn-warning" data-toggle="modal" data-target="#checkoutAddressModal">Add New Address</button>
                                            </div>
                                        </div>
                                        :
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingAddress NOpadding">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn-warning shippingAddressTitle">1 SHIPPING ADDRESS</div>

                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Name <span className="required">*</span></label>
                                                <input type="text" ref="username" name="username" id="username" value={this.state.username} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Mobile Number <span className="required">*</span></label>
                                                <input type="text" ref="mobileNumber" name="mobileNumber" id="mobileNumber" value={this.state.mobileNumber} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                                {/* <span className="col-lg-2 col-md-2 col-sm-1 col-xs-1  orderConfirmation fa fa-question-circle-o NOpadding" title="For delivery questions."></span> */}
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Email <span className="required">*</span></label>
                                                <input type="email" ref="email" name="email" id="email" value={this.state.email} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Address Line 1 <span className="required">*</span></label>
                                                <input type="text" ref="addressLine1" name="addressLine1" id="addressLine1" value={this.state.addressLine1} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Address Line 2 <span className="required">*</span></label>
                                                <input type="text" ref="addressLine2" name="addressLine2" id="addressLine2" value={this.state.addressLine2} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Country <span className="required">*</span></label>
                                                <select ref="country" name="country" id="country" value={this.state.country} onChange={this.handleChangeCountry.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <option value="Select Country">Select Country</option>
                                                    <option value="IN">India</option>
                                                </select>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">State <span className="required">*</span></label>
                                                <select ref="state" name="state" id="state" value={this.state.state} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <option value="Select State">Select State</option>
                                                    {
                                                        this.state.stateArray && this.state.stateArray.length > 0 ?
                                                            this.state.stateArray.map((stateData, index) => {
                                                                return (
                                                                    <option key={index} value={this.camelCase(stateData.stateName)}>{this.camelCase(stateData.stateName)}</option>
                                                                );
                                                            }
                                                            ) : ''
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Block <span className="required">*</span></label>
                                                <input type="text" ref="block" name="block" id="block" value={this.state.block} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">City <span className="required">*</span></label>
                                                <input type="text" ref="city" name="city" id="city" value={this.state.city} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                            </div>

                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Zip/Postal Code <span className="required">*</span></label>
                                                <input type="text" ref="pincode" name="pincode" id="pincode" value={this.state.pincode} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                            </div>

                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Address type <span className="required">*</span></label>
                                                <select id="addType" name="addType" ref="addType" value={this.state.addType} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <option value="Home">Home (All day delivery) </option>
                                                    <option value="Office">Office/Commercial (10 AM - 5 PM Delivery)</option>
                                                </select>
                                            </div>
                                        </div>
                                }
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 NOpaddingLeft">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingMethod NOpadding">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn-warning shippingMethodTitle">2 EXPECTED DELIVERY</div>

                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <label><i className="fa fa-calendar"></i> &nbsp;&nbsp; Delivery Date</label>
                                            <input type="date" name="date" className="col-lg-12 col-md-12 col-sm-12 col-xs-12" min={moment().format('YYYY-MM-DD')} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 NOpaddingRight">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paymentMethod NOpadding">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn-warning paymentMethodTitle">3 PAYMENT METHOD <span className="required">*</span></div>

                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paymentInput">
                                            <input name="payMethod" type="radio" value="Cash On Delivery" className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
                                            <span className="col-lg-11 col-md-11 col-sm-10 col-xs-10">Cash On Delivery</span>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paymentInput">
                                            <input disabled name="payMethod" type="radio" value="Credit Card Direct Post" className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
                                            <span className="col-lg-11 col-md-11 col-sm-10 col-xs-10">Credit Card Direct Post</span>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt15">
                                            <div id="payMethod"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 orderReviews NOpadding">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn-warning orderReviewsTitle">ORDER REVIEWS</div>
                                    <table className="table table-responsive orderTable">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th>Products Name</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>SubTotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.productCartData && this.state.productCartData.length > 0 ?
                                                    this.state.productCartData.map((data, index) => {
                                                        console.log('data', data);
                                                        return (
                                                            <tr key={'cartData' + index}>
                                                                <td><span className="fa fa-times-circle-o crossOrder" id={data._id} onClick={this.Removefromcart.bind(this)}></span></td>
                                                                <td><img className="img img-responsive orderImg" src={data.productImage[0]} /></td>
                                                                <td><span className="productName">{data.productName}</span></td>
                                                                <td className="textAlignRight"><span className="productPrize textAlignRight"><i className={"fa fa-" + data.currency}></i> &nbsp;{parseInt(data.discountedPrice).toFixed(2)}</span></td>
                                                                <td className="textAlignRight"><span className=" textAlignRight">{data.quantity}</span></td>
                                                                <td className="textAlignRight"><span className="productPrize textAlignRight"><i className={"fa fa-" + data.currency}></i> &nbsp;{parseInt(data.totalForQantity).toFixed(2)}</span></td>
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
                                    <span className="col-lg-6 col-md-6 col-sm-12 col-xs-12">Subtotal:</span><span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 textAlignRight"><i className={"fa fa-inr"}></i> {this.state.productData.cartTotal > 0 ? (parseInt(this.state.productData.cartTotal)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0.00"}</span>
                                    <span className="col-lg-6 col-md-6 col-sm-12 col-xs-12">Shipping:</span><span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 textAlignRight"><i className={"fa fa-inr"}></i> {this.state.shippingCharges > 0 ? (this.state.shippingCharges).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0.00"}</span>
                                    <span className="col-lg-6 col-md-6 col-sm-12 col-xs-12">GST ({this.state.vatPercent > 0 ? this.state.vatPercent : 0}%):</span><span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 textAlignRight"><i className={"fa fa-inr"}></i> {this.state.productData.cartTotal > 0 && this.state.vatPercent ? (this.state.productData.cartTotal * (this.state.vatPercent / 100)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0.00"}</span>
                                    {/* <span className="col-lg-6 col-md-6 col-sm-12 col-xs-12">Gift Wrap</span><span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 textAlignRight">$5.00</span> */}
                                    <span className="col-lg-6 col-md-6 col-sm-12 col-xs-12">Order Total:</span><span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 textAlignRight"><i className={"fa fa-inr"}></i> {((parseInt(this.state.vatPercent)) / 100 * (parseInt(this.state.productData.cartTotal)) + (parseInt(this.state.productData.cartTotal)) + this.state.shippingCharges).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>

                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt15">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 checkoutBorder"></div>
                                    </div>
                                    <span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 orderTotalText">Order Total</span><span className="col-lg-6 col-md-6 col-sm-12 col-xs-12 textAlignRight orderTotalPrize"><i className={"fa fa-inr"}></i> {((parseInt(this.state.vatPercent)) / 100 * (parseInt(this.state.productData.cartTotal)) + (parseInt(this.state.productData.cartTotal)) + this.state.shippingCharges).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>

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
                                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                        <h4 className="modal-title">Terms and Conditions</h4>
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
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt15">
                                        <div id="termsNconditions"></div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <button className="btn btn-warning col-lg-2 col-lg-offset-10 col-md-2 col-md-offset-10 col-sm-12 col-xs-12 placeOrder" onClick={this.placeOrder.bind(this)}>Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="modal col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 checkoutAddressModal" id="checkoutAddressModal" role="dialog">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="modal-content col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                    <div className="modal-header checkoutAddressModal col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                        <h4 className="modal-title">Netbaseteam Shipping Address</h4>
                                    </div>
                                    <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12 checkoutAddressModal">
                                        <form id="modalAddressForm">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Name <span className="required">*</span></label>
                                                <input type="text" ref="modalname" name="modalname" id="modalname" className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Mobile Number <span className="required">*</span></label>
                                                <input type="text" ref="modalmobileNumber" name="modalmobileNumber" id="modalmobileNumber" className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                                {/* <span className="col-lg-2 col-md-2 col-sm-1 col-xs-1  orderConfirmation fa fa-question-circle-o NOpadding" title="For delivery questions."></span> */}
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Email <span className="required">*</span></label>
                                                <input type="modalemail" ref="modalemail" name="modalemail" id="modalemail" className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Address Line 1 <span className="required">*</span></label>
                                                <input type="text" ref="modaladdressLine1" name="modaladdressLine1" id="modaladdressLine1" className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Address Line 2 <span className="required">*</span></label>
                                                <input type="text" ref="modaladdressLine2" name="modaladdressLine2" id="modaladdressLine2" className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Country <span className="required">*</span></label>
                                                <select ref="modalcountry" name="modalcountry" id="modalcountry" className="col-lg-12 col-md-12 col-sm-12 col-xs-12" onChange={this.handleChangeCountry.bind(this)}>
                                                    <option value="Select Country">Select Country</option>
                                                    <option value="IN">India</option>
                                                    <option value="USA">USA</option>
                                                    <option value="Chaina">Chaina</option>
                                                </select>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">State <span className="required">*</span></label>
                                                <select ref="modalstate" name="modalstate" id="modalstate" className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <option value="Select State">Select State</option>
                                                    <option value="Maharashtra">Maharashtra</option>
                                                    <option value="Goa">Goa</option>
                                                    <option value="Gujarat">Gujarat</option>
                                                </select>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Block <span className="required">*</span></label>
                                                <input type="text" ref="modalblock" name="modalblock" id="modalblock" className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">City <span className="required">*</span></label>
                                                <input type="text" ref="modalcity" name="modalcity" id="modalcity" className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                            </div>

                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Zip/Postal Code <span className="required">*</span></label>
                                                <input type="text" ref="modalpincode" name="modalpincode" id="modalpincode" className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                            </div>

                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput">
                                                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Address type <span className="required">*</span></label>
                                                <select id="modaladdType" name="modaladdType" ref="modaladdType" className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <option value="Home">Home (All day delivery) </option>
                                                    <option value="Office">Office/Commercial (10 AM - 5 PM Delivery)</option>
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer checkoutAddressModal col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <button type="button" className="btn btn-warning" data-dismiss="modal">Cancel</button>
                                        <button type="button" className="btn btn-warning" onClick={this.saveModalAddress.bind(this)}>Save Address</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Checkout;