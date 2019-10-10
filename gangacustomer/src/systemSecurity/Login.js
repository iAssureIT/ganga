import React, { Component } from 'react';
import { Link} from 'react-router-dom';
// import {browserHistory} from 'react-router-dom';
import { Redirect } from 'react-router';
// import swal from 'sweetalert';
import $ from "jquery";

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import {ToastsContainer, ToastsStore ,ToastsContainerPosition,message,timer,classNames} from 'react-toasts';

import axios from 'axios';
axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class Login extends Component {

  constructor(){
      super();
        this.state = {           
          loggedIn : false,
          auth: {
                email           : '',
                pwd             : '',
            }
        }
  }
  componentDidMount(){
    
  }
  userlogin(event){
    event.preventDefault();
    console.log("in login mode",this.state.auth);
    var auth= {
      email       : this.refs.loginusername.value,
      password    : this.refs.loginpassword.value,
    }
    console.log("auth value",auth);

    axios.post('/api/users/login',auth)
      .then((response)=> {
        // console.log("-------userData------>>",response);

        if (response.data.status=="Active") {
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("user_ID",response.data.user_ID);

        console.log("localStorage =",localStorage.getItem('user_ID'));
        
        if(localStorage==null){
        ToastsStore.error(<div className="alertback">Invalid Email or Password, Please Enter valid email and password<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
          // swal("Invalid Email or Password","Please Enter valid email and password");
        }else{
          this.setState({
              loggedIn  :   true
          })
        }
        
        this.props.history.push('/');
        window.location.reload("/");

      }else{

            // swal({
            //     title: "Need to Verify OTP",
            //     text: "Please Verify Your OPT First",
            //     icon: "warning",
            //     buttons: ["No Thanks", "Verfy OTP"],
            //     dangerMode: true,
            //   })
            //   .then((willDelete) => {
            //     if (willDelete) {
            //       window.location = "/confirm-otp/"+response.data.user_ID;
            //     } 
            // });
        ToastsStore.error(<div className="alertback">Need to Verify OTP, Please Verify Your OPT First<a className="pagealerturl" href={"/confirm-otp/"+response.data.user_ID}>Verify Your OPT >></a><span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
          }
      })
      .catch((error)=> {
          console.log('error==========  ', error);
        if(localStorage!==null){
          // swal(error.message);
        ToastsStore.error(<div className="alertback">{error.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
        }
        
      });
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
      <div className="pagealertnone">
        <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innloginwrap">
          <div className="row">
            <h3>Please Sign In</h3>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt50 mb100">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 borderrightlogin"> 
                <div className="col-lg-10 col-lg-offset-1 col-md-offset-1 col-md-10 col-sm-12 col-xs-12">
                  <h4><b>Registered Customers</b></h4>
                  <p>If you have an account, sign in with your email address.</p>
                    <form id="login" onSubmit={this.userlogin.bind(this)}>
                          <span className="logininput">
                            <input type="email" className="mt30 form-control" onChange={this.handleChange} ref="loginusername" id="loginusername" name="loginusername" placeholder="Email" required/>
                          </span>
                          <span className="logininput">
                            <input type="password" className="mt30 form-control" ref="loginpassword" name="loginpassword" placeholder="Password" required/>
                          </span>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt30">
                            <div className="row">
                              <div className="col-lg-6 col-md-6 col-sm-6 mt10">
                                <div className="row loginforgotpass">
                                    <a href='/forgotpassword' className="">Forgot Your Password?</a>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-6">
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
                  <a id="logInBtn" href='/signup' className="btn btn-warning">Create an Account</a>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;