import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import $ from "jquery";
import axios from 'axios';

import './SignUp.css';

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
      // console.log('confirm otp');
      event.preventDefault();
      var url = this.props.match.params;
      console.log('url = ',url);
      var formValues ={
        "user_ID" :  this.props.match.params.user_ID,
        "mobOTP"  :  parseInt(this.refs.mobotp.value),
        "emailOTP":  parseInt(this.refs.emailotp.value)
      }
      console.log('formValues', formValues);
      axios.put('/api/users/otpverification', formValues)
      .then((response)=>{
        swal(response.data.message);
        this.props.history.push('/login');
      })
      .catch((error)=>{
        console.log('error', error);
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
      event.preventDefault();
      var element = document.getElementById("resendOtpBtn");
      element.classList.add("btn-success");
      element.classList.remove("resendOtpColor");

            const userid = this.props.match.params.user_ID;
           console.log("userid",userid);
          axios.get('/api/users/resendotp/'+userid)
          .then((response)=>{
            // console.log('response', response);
            swal(response.data.message)
          })
          .catch((error)=>{
            console.log('error', error);
          })    
    }


  render(){
    // if(location.pathname=='/forgotOTPVarification/'+FlowRouter.getParam("mailId")){
    //    var mobileEmail = 'Email Id';
    //    var resendOtp ='';
    // }else{
      var resendOtpWrap = "resendOtpWrap resendOtpWrapcss";
      var mobileEmail = 'Mobile Number';
      var resendOtp = <span onClick={this.resendOtp.bind(this)}>Resend OTP</span>;
    // }

return(
      <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 LoginWrapper">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innloginwrap">
          <div className="row">
            <h3>CONFIRMOTP</h3>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt50 mb100">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 borderrightlogin"> 
                <div className="col-lg-10 col-lg-offset-1 col-md-offset-1 col-md-10 col-sm-12 col-xs-12">
                  <h4><b>Confirm OTP</b></h4>
                  <p>We have sent you a Verification Code to your registered mobile and Email <br/><br/></p>
                    <form id="OTPMobMail" onSubmit={this.confirmOTP.bind(this)}>
                      <div className="">
                        <div className="">
                          <span>Enter six digit verification code received on <b>Email</b>.<br/></span>
                        </div>
                        <div className="input-group">
                          <input type="text" className="form-control" ref="emailotp" name="emailotp" onBlur={this.inputEffect.bind(this)} aria-describedby="basic-addon1" title="Please enter numbers only!" maxLength="6" pattern="(0|[0-9]*)" required/>
                          <span className="input-group-addon glyphi-custommm"><i className="fa fa-key" aria-hidden="true"></i></span>
                        </div>
                        <div className=" mt30">
                          <span>Enter four digit verification code received on <b>Mobile</b>.<br/></span>
                        </div>
                        <div className="input-group">
                          <input type="text" className="form-control" ref="mobotp" name="mobotp" onBlur={this.inputEffect.bind(this)} aria-describedby="basic-addon1" title="Please enter numbers only!" maxLength="4" pattern="(0|[0-9]*)" required/>
                          <span className="input-group-addon glyphi-custommm"><i className="fa fa-key" aria-hidden="true"></i></span>
                        </div>
                      </div>
                      <div className="loginforgotpass mt10">
                        <lable>Already have an account?</lable>&nbsp;<a href='/login' className="">Sign In <b>&#8702;</b></a>   
                      </div>
                      <div className="mt30 col-lg-12">
                          <div id="resendOtpBtn" className="col-lg-6">
                            <div id="resendOtpBtn" className="col-lg-12 btn btn-warning systemsecBtn">
                              {resendOtp}
                            </div>
                          </div>
                          <div className="col-lg-6">
                              <button type="submit" className="col-lg-12 btn btn-info systemsecBtn">Submit</button>
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