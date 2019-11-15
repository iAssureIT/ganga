import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import $ from 'jquery';
import axios from 'axios';
import jQuery from 'jquery';
import 'jquery-validation';
import Message from '../blocks/Message/Message.js';
import Loader from "../common/loader/Loader.js";

class Login extends Component {

  constructor(){
      super();
        this.state = {           
          loggedIn : false,
          auth: {
                email           : '',
                pwd             : '',
            },
            messageData : {
              "type" : "",
            }
        }
  }
  componentDidMount(){
    $.validator.addMethod("regxemail", function (value, element, regexpr) {
        return regexpr.test(value);
    }, "Please enter valid email.");
    
    jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
    });
    $("#login").validate({
        rules: {
            loginusername: {
                required: true,
            },
            loginpassword:{
              required:true
            }
        },
        errorPlacement: function (error, element) {
          if (element.attr("name") == "loginusername") {
            error.insertAfter("#loginusername");
          }
          if (element.attr("name") == "loginpassword") {
            error.insertAfter("#loginpassword");
          }
        }
    });
  }
  userlogin(event){
    event.preventDefault();
    var auth= {
      email       : this.refs.loginusername.value,
      password    : this.refs.loginpassword.value,
    }
    if($("#login").valid()){
      $('.fullpageloader').show();
      document.getElementById("logInBtn").value = 'Please Wait...';
      axios.post('/api/users/login',auth)
      .then((response)=> {
        $('.fullpageloader').hide();
        document.getElementById("logInBtn").value = 'Sign In';
        if (response.data.status=="Active") {
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("user_ID",response.data.user_ID);

        // console.log("localStorage =",localStorage.getItem('user_ID'));
        
        if(localStorage==null){
          this.setState({
            "messageData" : {
              "type" : "inpage",
              "icon" : "fa fa-times-circle",
              "message" : response.data.message,
              "class": "danger",
              "autoDismiss" : false
            }
          })
          // swal("Invalid Email or Password","Please Enter valid email and password");
        }else{
          this.setState({
              loggedIn  :   true
          })
        }
        
        this.props.history.push('/');
        window.location.reload("/");

      }else{
        $('.fullpageloader').hide();
            this.setState({
              messageData : {
                "type" : "inpage",
                "icon" : "fa fa-exclamation-circle",
                "message" : response.data.message,
                "class": "warning",
                "autoDismiss" : false
              }
            })
          }
      })
      .catch((error)=> {

        $('.fullpageloader').hide();
        document.getElementById("logInBtn").value = 'Sign In';
        if(localStorage!==null){
          // swal(error.message);
          this.setState({
            messageData : {
              "type" : "inpage",
              "icon" : "fa fa-times-circle",
              "message" : "&nbsp; "+error.response.data.message,
              "class": "danger",
              "autoDismiss" : false
            }
          })
        }
      });
    }
  }
  showSignPass(){
      $('.showPwd').toggleClass('showPwd1');
      $('.hidePwd').toggleClass('hidePwd1');
      return $('#loginpassword').attr('type', 'text');
  }
  hideSignPass(){
      $('.showPwd').toggleClass('showPwd1');
      $('.hidePwd').toggleClass('hidePwd1');
      return $('#loginpassword').attr('type', 'password');
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
    return(  
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 LoginWrapper">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innloginwrap">
        <Loader type="fullpageloader"/>
          {/* <div className="row">
            <h3>Please Sign In</h3>
          </div> */}
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt50 mb100">
            <div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-12 col-xs-12 formShadow"> 
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xs-12">
                  <Message messageData={this.state.messageData} />
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innloginwrap">
                    <h3>Sign In</h3>
                  </div>
                  {/* <p>If you have an account, sign in with your email address.</p> */}
                    <form id="login" onSubmit={this.userlogin.bind(this)}>
                      <div className="form-group logininput col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding mt25">
                        <label>Email ID</label><label className="astricsign">*</label>
                        <input type="email" className="form-control" onChange={this.handleChange} ref="loginusername" id="loginusername" name="loginusername" placeholder="Email ID" required/>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding mb25">
                      <span className="logininput">
                         <label>Password</label><label className="astricsign">*</label>
                        <input type="password" className="form-control" ref="loginpassword" name="loginpassword" id="loginpassword" placeholder="Password" required/>
                        <div className="showHideSignDiv">
                          <i className="fa fa-eye showPwd showEyeupSign" aria-hidden="true" onClick={this.showSignPass.bind(this)}></i>
                          <i className="fa fa-eye-slash hidePwd hideEyeSignup " aria-hidden="true" onClick={this.hideSignPass.bind(this)}></i>
                        </div> 
                      </span>
                      </div>
                      <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 NOpaddingRight">
                        <input id="logInBtn" type="submit" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-warning" value="Sign In"/>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt30 mb25">
                        <div className="row">
                          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mt10">
                            <div className="row loginforgotpass">
                                <a href='/forgotpassword' className="">Forgot Password?</a>
                            </div>
                          </div>

                          <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mt10 textAlignRight">
                            <div className="row loginforgotpass">
                                New to GangaExpress? <a href='/signup' className="">Sign Up</a>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </form> 
                </div>
            </div>
          
        </div>
      </div>
    );
  }
}
export default Login;