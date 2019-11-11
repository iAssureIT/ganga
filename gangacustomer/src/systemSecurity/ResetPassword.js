import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import Message from '../blocks/Message/Message.js';
import axios from 'axios';
import Loader from "../common/loader/Loader.js";

class ResetPassword extends Component {
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
    resetPassword(event) {
        event.preventDefault();
        var userID = this.props.match.params.user_ID;
        var formValues = {
            "pwd" : this.refs.newPassword.value
        }
        if($('#resetPassword').valid()){
            $('.fullpageloader').show();
            axios.put('/api/users/resetpwd/'+userID, formValues)
            .then((response)=>{
                $('.fullpageloader').hide();
                this.setState({
                  "messageData" : {
                    "type" : "outpage",
                    "icon" : "fa fa-check-circle",
                    "message" : "&nbsp; "+response.data.message,
                    "class": "success",
                    "autoDismiss" : false
                  }
                })
                this.props.history.push('/login');
            })
            .catch((error)=>{
                console.log('error', error);
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

    validation(){
        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });

        $("#resetPassword").validate({
            rules: {
                newPassword: {
                    required: true,
                },
                confirmPassword: {
                    required: true,
                    equalTo : "#confirmPassword"
                },
            },
            messages:{
                confirmPassword:"Password do not match"
            },
            errorPlacement: function (error, element) {
                if (element.attr("name") == "newPassword") {
                    error.insertAfter("#newPassword");
                }
                if (element.attr("name") == "confirmPassword") {
                    error.insertAfter("#confirmPassword");
                }
            }
        });
    }
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
            <Loader type="fullpageloader"/>
                <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 mt25 mb25">
                    <Message messageData={this.state.messageData} />
                    <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Please enter your email address below to receive a password reset link.</p>
                    <form id="resetPassword">
                        <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">New Password <i className="error">*</i></label>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <input className="col-lg-6 col-md-6 col-sm-12 col-xs-12" ref="newPassword" name="newPassword" type="text" /><br/>
                            <div id="newPassword" ></div>
                        </div>
                        <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">Confirm Password <i className="error">*</i></label>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                            <input className="col-lg-6 col-md-6 col-sm-12 col-xs-12" ref="confirmPassword" name="confirmPassword" type="text" /><br/>
                            <div id="confirmPassword"></div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
                            <button className="btn btn-warning resetBtn" onClick={this.resetPassword.bind(this)}>Reset My Password</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ResetPassword;