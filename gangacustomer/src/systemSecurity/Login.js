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
      return $('.inputTextPass').attr('type', 'text');
  }
  hideSignPass(){
      $('.showPwd').toggleClass('showPwd1');
      $('.hidePwd').toggleClass('hidePwd1');
      return $('.inputTextPass').attr('type', 'password');
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
      <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 LoginWrapper">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innloginwrap">
        <Loader type="fullpageloader"/>
          <div className="row">
            <h3>Please Sign In</h3>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt50 mb100">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 borderrightlogin"> 
                <div className="col-lg-10 col-lg-offset-1 col-md-offset-1 col-md-10 col-sm-12 col-xs-12">
                  <Message messageData={this.state.messageData} />
                  <h4><b>Registered Customers</b></h4>
                  <p>If you have an account, sign in with your email address.</p>
                    <form id="login" onSubmit={this.userlogin.bind(this)}>
                      <div className="form-group logininput col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                        <label>Email ID</label><label className="astricsign">*</label>
                        <input type="email" className="form-control" onChange={this.handleChange} ref="loginusername" id="loginusername" name="loginusername" placeholder="Email ID" required/>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                      <span className="logininput">
                         <label>Password</label><label className="astricsign">*</label>
                        <input type="password" className="form-control" ref="loginpassword" name="loginpassword" id="loginpassword" placeholder="Password" required/>
                      </span>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt30">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 mt10">
                            <div className="row loginforgotpass">
                                <a href='/forgotpassword' className="">Forgot Password?</a>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 NOpaddingRight">
                            <input id="logInBtn" type="submit" className="pull-right btn btn-warning" value="Sign In"/>
                          </div>
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
                  <a id="logInBtn" href='/signup' className="btn btn-warning logInBtn">Create an Account</a>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;