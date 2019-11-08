import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import swal from 'sweetalert';
import $ from "jquery";
import axios from 'axios';
import Message from '../blocks/Message/Message.js';
import './SignUp.css';
import Loader from "../common/loader/Loader.js";

 class ConfirmOtp extends Component {
    constructor(props){
      super(props);
      this.state ={
        // "subscription" : {
        //   user         : Meteor.subscribe("userfunction"), 
        // }
      }
    }
    confirmOTP(event){
      event.preventDefault();
      var url = this.props.match.params;
      var formValues ={
        "user_ID" :  this.props.match.params.user_ID,
        "emailOTP":  parseInt(this.refs.emailotp.value),
        "status"  :  "Active"
      }
      $('.fullpageloader').show();
      axios.put('/api/users/otpverification', formValues)
      .then((response)=>{
        $('.fullpageloader').hide();
        // ToastsStore.success(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
        this.setState({
          messageData : {
            "type" : "outpage",
            "icon" : "fa fa-check-circle",
            "message" : "&nbsp; "+response.data.message,
            "class": "success",
          }
        })
        //this.props.history.push('/login');
      })
      .catch((error)=>{
        $('.fullpageloader').hide();
        // ToastsStore.success(<div className="alertback">{error.response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
        this.setState({
          messageData : {
            "type" : "inpage",
            "icon" : "fa fa-times-circle",
            "message" : "&nbsp; "+error.response.data.message,
            "class": "danger",
          }
        })
      })
    }
    inputEffect(event){
      event.preventDefault();
      if($(event.target).val() != ""){
        $(event.target).addClass("has-content");
      }else{
        $(event.target).removeClass("has-content");
      }
    }
    resendOtp(event){
      // event.preventDefault();
      $('.fullpageloader').show();
      document.getElementById("resendOtpBtn").innerHTML = 'Please wait...';
          const userid = this.props.match.params.user_ID;
          axios.get('/api/users/resendotp/'+userid)
          .then((response)=>{
            $('.fullpageloader').hide();
            document.getElementById("resendOtpBtn").innerHTML = 'Resend OTP';
            this.setState({
              messageData : {
                "type" : "inpage",
                "icon" : "fa fa-check-circle",
                "message" : "&nbsp; "+response.data.message,
                "class": "success",
              }
            })
            // ToastsStore.success(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
          })
          .catch((error)=>{
            $('.fullpageloader').hide();
            this.setState({
              messageData : {
                "type" : "inpage",
                "icon" : "fa fa-times-circle",
                "message" : "&nbsp; Failed to resent OTP",
                "class": "danger",
              }
            })
            document.getElementById("resendOtpBtn").innerHTML = 'Resend OTP';
          })    
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



  render(){
    // if(location.pathname=='/forgotOTPVarification/'+FlowRouter.getParam("mailId")){
    //    var mobileEmail = 'Email Id';
    //    var resendOtp ='';
    // }else{
      var resendOtpWrap = "resendOtpWrap resendOtpWrapcss";
      var mobileEmail = 'Mobile Number';
      var resendOtp = "";
    // }

return(
      <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 LoginWrapper">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innloginwrap">
          <Loader type="fullpageloader"/>
          <div className="row">
            <h3>CONFIRMOTP</h3>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt50 mb100">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 borderrightlogin"> 

                <div className="col-lg-10 col-lg-offset-1 col-md-offset-1 col-md-10 col-sm-12 col-xs-12">
                  <Message messageData={this.state.messageData} />
                  <h4><b>Confirm OTP</b></h4>
                  <p>We send you a Verification Code to your registered email <br/><br/></p>
                    <form id="OTPMobMail">
                      <div className="">
                        <div className="">
                          <span>Enter six digit verification code received on <b>Email</b>.<br/></span>
                        </div>
                        <div className="input-group">
                          <input type="text" className="form-control" ref="emailotp" name="emailotp" onBlur={this.inputEffect.bind(this)} aria-describedby="basic-addon1" title="Please enter numbers only!" maxLength="6" pattern="(0|[0-9]*)" required/>
                          <span className="input-group-addon glyphi-custommm"><i className="fa fa-key" aria-hidden="true"></i></span>
                        </div>
                        
                      </div>
                      <div className="loginforgotpass mt10">
                        <lable>Already have an account?</lable>&nbsp;<a href='/login' className="">Sign In <b>&#8702;</b></a>   
                      </div>
                      <div className="mt30 col-lg-12">
                          <div className="col-lg-6">
                            <div id="resendOtpBtn" onClick={this.resendOtp.bind(this)} className="col-lg-12 btn btn-warning systemsecBtn">
                              Resend OTP
                            </div>
                          </div>
                          <div className="col-lg-6">
                              <button type="submit" onClick={this.confirmOTP.bind(this)} className="col-lg-12 btn btn-info systemsecBtn">Submit</button>
                          </div>
                      </div>
                    </form>
                </div>
            </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div className="col-lg-10 col-lg-offset-1 col-md-offset-1 col-md-10 col-sm-12 col-xs-12">
                <h4><b>New Customers</b></h4>
                <p className="mt10">Creating an account has many benefits: check out faster, keep more than one address, track orders and more.</p>
                <ul className="loginlistpadd">
                  <li>Check out faster</li>
                  <li>Keep more than one address</li>
                  <li>Track orders</li>
                  <li>Track wishlist and more</li>
                </ul>
               <div className="col-lg-6 col-md-6 col-sm-6 mt30">
                  <a id="logInBtn" href='/signup' className="btn btn-warning">Create an Account</a>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ConfirmOtp;