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
            },
            showMessage : false
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
                    "showMessage" : true,
                //     "messageData" : {
                //         "type" : "outpage",
                //         "icon" : "fa fa-check-circle",
                //         "message" : "&nbsp; "+response.data.message,
                //         "class": "success",
                //         "autoDismiss" : false
                //     }
                })
                // setTimeout(() => {
                //     this.setState({
                //         messageData   : {},
                //     })
                // }, 3000);
                // this.props.history.push('/login');
            })
            .catch((error)=>{
                $('.fullpageloader').hide();
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
                    equalTo : "#newPassword"
                },
            },
            messages:{
                confirmPassword:"Password do not match"
            },
            errorPlacement: function (error, element) {
                if (element.attr("name") == "newPassword") {
                    error.insertAfter("#newPasswordmsg");
                }
                if (element.attr("name") == "confirmPassword") {
                    error.insertAfter("#confirmPass");
                }
            }
        });
    }
    showNewPass(){
        $('.showPwd').toggleClass('showPwd1');
        $('.hidePwd').toggleClass('hidePwd1');
        return $('#newPassword').attr('type', 'text');
    }
    hideNewPass(){
        $('.showPwd').toggleClass('showPwd1');
        $('.hidePwd').toggleClass('hidePwd1');
        return $('#newPassword').attr('type', 'password');
    }
    showConfirmPass(){
        $('.showPwd2').toggleClass('showPwd3');
        $('.hidePwd2').toggleClass('hidePwd3');
        return $('#confirmPassword').attr('type', 'text');
    }
    hideConfirmPass(){
        $('.showPwd2').toggleClass('showPwd3');
        $('.hidePwd2').toggleClass('hidePwd3');
        return $('#confirmPassword').attr('type', 'password');
    }
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 LoginWrapper">
            <Loader type="fullpageloader"/>
                <div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-12 col-xs-12 formShadow mb100 mt100">
                    <Message messageData={this.state.messageData} />
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innloginwrap">
                        <h3>Reset Password</h3>
                    </div>
                    {
                        this.state.showMessage == false ? 
                        <div>
                            <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">Please enter your email address below to receive a password reset link.</p>
                            <form id="resetPassword">
                            <div className="form-group logininput col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <label>New Password </label><label className="astricsign">*</label>
                                <input type="password" id="newPassword" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" ref="newPassword" name="newPassword" />
                                <div className="showHideSignDiv">
                                    <i className="fa fa-eye showPwd showEyeupSign" aria-hidden="true" onClick={this.showNewPass.bind(this)}></i>
                                    <i className="fa fa-eye-slash hidePwd hideEyeSignup " aria-hidden="true" onClick={this.hideNewPass.bind(this)}></i>
                                </div> 
                                <br/>
                                <div  id="newPasswordmsg"></div>
                            </div>
                            <div className="form-group logininput col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                                <label>Confirm Password</label><label className="astricsign">*</label>
                                <input type="password" id="confirmPassword" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" ref="confirmPassword" name="confirmPassword" />
                                <div className="showHideSignDiv">
                                    <i className="fa fa-eye showPwd2 showEyeupSign" aria-hidden="true" onClick={this.showConfirmPass.bind(this)}></i>
                                    <i className="fa fa-eye-slash hidePwd2 hideEyeSignup" aria-hidden="true" onClick={this.hideConfirmPass.bind(this)}></i>
                                </div> 
                                <br/>
                                <div id="confirmPass"></div>
                            </div>
                            <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 mt25 mb25">
                                <button className="btn btn-warning resetBtn" onClick={this.resetPassword.bind(this)}>Reset My Password</button>
                            </div>
                        </form>
                        </div>
                        :
                        <div>
                            <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25 textAlignCenter">Your password has been reset successfully!</p>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt10">
                                <div className="row loginforgotpass textAlignCenter"> Please &nbsp;
                                    <a href='/login' className=""><b>Click here</b></a> to sign in.
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default ResetPassword;