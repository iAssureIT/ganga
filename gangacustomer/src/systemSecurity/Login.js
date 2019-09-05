import React, { Component } from 'react';
import { Link} from 'react-router-dom';
// import {browserHistory} from 'react-router-dom';
import { Redirect } from 'react-router';
import swal from 'sweetalert';
import $ from "jquery";

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';

import axios from 'axios';
axios.defaults.baseURL = 'http://gangaexpressapi.iassureit.com';
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
        console.log("-------userData------>>",response);

        localStorage.setItem("token",response.data.token);
        localStorage.setItem("admin_ID",response.data.user_ID);

        console.log("localStorage =",localStorage.getItem('admin_ID'));
        
        if(localStorage==null){
          swal("Invalid Email or Password","Please Enter valid email and password");
        }else{
          this.setState({
              loggedIn  :   true
          })
        }
        this.props.history.push('/');
      })
      .catch((error)=> {
          console.log('error==========  ', error);
        if(localStorage!==null){
          swal("Invalid Email or Password","Please Enter valid email and password");
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
  render(){
    
    return(  
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signUpWrapper loginbg">
        <div className="col-lg-4 col-lg-offset-7 col-md-4 col-md-offset-7 col-sm-12 signupPadding loginFormWrap ">
          <div className="divLoginInWrap">
              <div className="col-lg-12 text-center marbtm10 ">
                <img src="/images/Logo.png" height="70px"/>
              </div>
            <form id="login" onSubmit={this.userlogin.bind(this)}>
              <br/>
              <div className="col-lg-4 col-lg-offset-4 ">
             {/* <h3> hhhh</h3>*/}
              {<h4 className="signInNameTitle "><span className="bordbt">SIGN IN</span></h4>
              }</div>
              <div className="col-lg-12 col-md-12 col-sm-12 ">
                <div className="inputContent">
                  <span className="blocking-span noIb">
                    <input type="email" className="col-lg-12 col-md-1col-lg-12 col-md-12 col-sm-12 oesSignUpForm tmsLoginTextBox" onChange={this.handleChange} ref="loginusername" id="loginusername" name="loginusername" placeholder="" required/>
                    <span className="floating-label"><i className="fa fa-envelope signupIconFont" aria-hidden="true"/>Email ID</span>   
                  </span>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 marBtm30">
                <div className="form-group form-group1 fltlft input-group col-lg-12 col-md-12 col-sm-12 inputContent ">     
                  <span className="blocking-span noIb">
                    <input type="password" className="form-control border3 pass oesSignUpForm confirmbtm inputTextPass tmsLoginTextBox" ref="loginpassword" name="loginpassword" required/>
                    <span className="floating-label1 lbfloatpass"><i className="fa fa-lock" aria-hidden="true"></i> Password</span>                 
                  </span>
               
                <div className="showHideSignDiv">
                  <i className="fa fa-eye showPwd showEyeupSign" aria-hidden="true" onClick={this.showSignPass.bind(this)}></i>
                  <i className="fa fa-eye-slash hidePwd hideEyeSignup " aria-hidden="true" onClick={this.hideSignPass.bind(this)}></i>
                </div> 
                  <span className="focus-border">
                    <i></i>
                  </span>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <input id="logInBtn" type="submit" className="col-lg-12 col-md-12 col-xs-12 col-sm-12 UMloginbutton hvr-sweep-to-right" value="Login"/>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
               <div className="col-lg-6 col-md-6 col-sm-6 ">
                  <Link to='/signup' className="UMGreyy UMGreyy_l UMcreateacc col-lg-12 col-md-12 col-xs-12 col-sm-12"> Sign Up</Link>
                </div>
{/*                <div className="col-lg-6 col-md-6 col-sm-6 offset-lg-1 customFl">
                  <Link to='/forgot-pwd' className="UMGreyy UMGreyy_l UMcreateacc col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    Forgot Password?
                  </Link>
                </div>
*/}              </div>
{/*              <div className="col-lg-12 col-md-12 col-sm-12 pdcls">
                <div className="col-lg-12 col-md-12 col-sm-12 ">
                  <Link to='/verify-account' className="UMGreyy UMGreyy_l forgotpass emailverify col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    OTP Verification
                  </Link>
                </div>
              </div>
*/}            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;