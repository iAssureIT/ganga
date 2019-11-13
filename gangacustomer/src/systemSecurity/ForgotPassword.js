import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import axios from 'axios';
import Message from '../blocks/Message/Message.js';
import Loader from "../common/loader/Loader.js";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerData: {
                title: "MY SHOPPING CART",
                breadcrumb: 'My Shopping Cart',
                backgroungImage: '/images/cartBanner.png',
            }
        }
    }
    componentDidMount(){
        this.validation();
    }
    sendLink(event) {
        event.preventDefault();
        
        var email = this.refs.emailLink.value;
        var formValues = {
            username : email
        }
        if($('#resetPass').valid()){
            document.getElementById("sendlink").innerHTML = 'Please Wait...';
            $('.fullpageloader').show();
            axios.post('/api/users/sendlink', formValues)
            .then((response)=>{
                $('.fullpageloader').hide();
                this.setState({
                  messageData : {
                    "type" : "inpage",
                    "icon" : "fa fa-check-circle",
                    "message" : "&nbsp; "+response.data.message,
                    "class": "success",
                    "autoDismiss" : false
                  }
                })
                this.props.history.push('/login');
                document.getElementById("sendlink").innerHTML = 'Reset My Password';
            })
            .catch((error)=>{
                console.log('error', error);
                this.setState({
                    messageData : {
                      "type" : "inpage",
                      "icon" : "fa fa-check-circle",
                      "message" : "&nbsp; ",
                      "class": "warning",
                      "autoDismiss" : false
                    }
                  })
            })
        }
    }
      Closepagealert(event){
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

    validation() {
        $.validator.addMethod("regxemail", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid email address.");


        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });

        $("#resetPass").validate({
            rules: {
                emailLink: {
                    required: true,
                    regxemail: /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
                },
            },
            errorPlacement: function (error, element) {

                if (element.attr("name") == "emailLink") {
                    error.insertAfter("#emailLink");
                }
            }
        });
    }
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 LoginWrapper">
            <Loader type="fullpageloader"/>
                <div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-12 col-xs-12 formShadow mt100 mb100">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <Message messageData={this.state.messageData} />
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innloginwrap">
                        <h3>Forgot Password</h3>
                    </div>
                    <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">Please enter your email address below to receive a password reset link.</p>
                    <form id="resetPass">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25" >
                            <label className="labelCss">Email ID</label><label className="astricsign">*</label>
                            <input className="form-control col-lg-12 col-md-12 col-sm-12  col-xs-12" placeholder="Email ID" ref="emailLink" name="emailLink" type="text" />
                            <div id="emailLink"></div>
                        </div>
                        <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 mt25 mb25">
                            <button id="sendlink" className="btn btn-warning resetBtn" onClick={this.sendLink.bind(this)}>Reset My Password</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ForgotPassword;