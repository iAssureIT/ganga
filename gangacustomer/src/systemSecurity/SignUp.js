import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {browserHistory} from 'react-router';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';
import 'font-awesome/css/font-awesome.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import {ToastsContainer, ToastsStore ,ToastsContainerPosition,message,timer,classNames} from 'react-toasts';

import axios from 'axios';
const formValid = formerrors=>{
//   console.log("formerrors",formerrors);
  let valid = true;
  Object.values(formerrors).forEach(val=>{
  val.length>0 && (valid = false);
  })
  return valid;
}
const firstnameRegex = RegExp(/^[A-za-z']+( [A-Za-z']+)*$/);
const lastnameRegex = RegExp(/^[A-za-z']+( [A-Za-z']+)*$/);
const mobileRegex  = RegExp(/^[0-9][0-9]{9}$|^$/);
const emailRegex = RegExp (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$|^$/);

class SignUp extends Component {

 	constructor(){
      super();
        this.state = {  
      	  checkUserExists    	: 0, 
           loggedIn : false,
           auth:{
                firstname       : '',
                lastname        : '',
                mobNumber       : '',
                email           : '',
                pwd       		: '',
                signupPassword  : '',
                role 			: ''
            },
            formerrors :{
				firstNameV 		: "",
				lastNameV		: "",
				mobileV 		: "",
				emailIDV		: "",
			},
			termsCondition : ["The price of products  is as quoted on the site from time to time.",
							"Price and delivery costs are liable to change at any time, but changes will not affect orders in respect of which we have already sent you a Despatch Confirmation.",
							"Products marked as 'non-returnable' on the product detail page cannot be returned.",
							"Products may not be eligible for return in some cases, including cases of buyer's remorse such as incorrect model or color of product ordered or incorrect product ordered."]
        }
        // console.log("In constructor");
         this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {

    }
 	usersignup(event){
 		event.preventDefault();
 			// console.log("-------this.state.auth------>>",this.state.auth);
 			var auth={
	                firstName       : this.refs.firstname.value,
	                lastName        : this.refs.lastname.value,
	                mobileNumber    : this.refs.mobNumber.value,
	                emailId         : this.refs.signupEmail.value,
	                pwd        		: this.refs.signupPassword.value,
	                signupPassword  : this.refs.signupConfirmPassword.value,
	                roles 			: 'users',
	                status 			: 'Blocked'
	            }
	            
 			// console.log("-------auth------>>",auth);

        document.getElementById("signUpBtn").innerHTML = 'We are processing. Please Wait...';            
            
        var firstname                = this.refs.firstname.value;
        var mobile                   = this.refs.mobNumber.value;
        var email                    = this.refs.signupEmail.value;
        var passwordVar              = this.refs.signupPassword.value;
        var signupConfirmPasswordVar = this.refs.signupConfirmPassword.value;
 		
            if(formValid(this.state.formerrors )){
    			// console.log('companyName==',this.state.formerrors);
            if (passwordVar === signupConfirmPasswordVar) {
                return (passwordVar.length >= 6) ? 
                	(true, 
                	//  console.log("formValues= ",auth),
		             document.getElementById("signUpBtn").innerHTML = 'Create an Account',
      				// browserHistory.push("/"),
                	axios.post('/api/users',auth)
			            .then((response)=> {
			                // console.log("-------userData------>>",response.data.user_id);
            				 ToastsStore.success(<div className="alertback">Great, Information submitted successfully and OTP is sent to your registered Email and Mobile no<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
		            		// swal("Great","Information submitted successfully and OTP is sent to your registered Email and Mobile no");
			                this.props.history.push("/confirm-otp/"+response.data.user_id);
			                
			            })
			            .catch((error)=> {
			                console.log(error);
        					// swal("Unable to submit data.");
       						//  ToastsStore.error(<div className="alertback">Unable to submit data<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
			            })
                	)
                :
	                (
		                document.getElementById("signUpBtn").innerHTML = 'Create an Account',
       					ToastsStore.error(<div className="alertback">Password should be at least 6 Characters Long, Please try again or create an Account<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
		                // swal("Password should be at least 6 Characters Long","Please try again or create an Account")       
	                )

                
            } else {
                document.getElementById("signUpBtn").innerHTML = 'Create an Account';
       			ToastsStore.error(<div className="alertback">Passwords does not match, Please Try Again<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
		        // return swal("Passwords does not match","Please Try Again")
            }
            }else{
                document.getElementById("signUpBtn").innerHTML = 'Create an Account';
       			ToastsStore.error(<div className="alertback">Please enter mandatory fields<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
				// swal("Please enter mandatory fields", "", "warning");
				// console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
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

    checkUserExists(event){
   	if (event.target.value != '') {
	    axios.get('/api/users/get/checkUserExists/'+event.target.value)
	           .then((response)=>{
	           	
	                if (response.data.length>0) {
	                  $(".checkUserExistsError").show();
	                  $('.button3').attr('disabled','disabled');
	                  this.setState({checkUserExists: 1})
	                 
	                } else{
	                  $(".checkUserExistsError").hide();
	                  $('.button3').removeAttr('disabled');
	                  this.setState({checkUserExists: 0})
	                }                        
	            })
	           .catch(function(error){
	                console.log(error);
	           })
   	}else{
		$(".checkUserExistsError").hide();
   	}
  }

 	handleChange(event){
	    // const target = event.target;
	    // const {name , value}   = event.target;
	    const datatype = event.target.getAttribute('data-text');
	    const {name,value} = event.target;
	    let formerrors = this.state.formerrors;
	    
	    // console.log("datatype",datatype);
	    switch (datatype){
	     
	       case 'firstNameV' : 
	       formerrors.firstNameV = firstnameRegex.test(value) ? '' : "Please Enter Valid Name";
	       break;
	       
	       case 'lastNameV' : 
	       formerrors.lastNameV = lastnameRegex.test(value) ? '' : "Please Enter Valid Name";
	       break;

	       case 'mobileV' : 
	       formerrors.mobileV = mobileRegex.test(value) ? '' : "Please Enter Valid Mobile Number";
	       break;

	       case 'emailIDV' : 
	       formerrors.emailIDV = emailRegex.test(value) ? '' : "Invalid EmailID";
	       break;
	       
	       default :
	       break;

	      //  case 'companyName' : 
	      //  formerrors.companyName = value.length < 1 && value.lenght > 0 ? 'Minimum 1 Character ' : "";
	      //  break;

	    }
	    // this.setState({formerrors,})
	    this.setState({ formerrors,
	      [name]:value
	    } );
	}
 	acceptcondition(event){
	    var conditionaccept = event.target.value;
	    // console.log("condition",conditionaccept);
	    if(conditionaccept=="acceptedconditions"){
	        $(".acceptinput").removeAttr('disabled');
	        // if(this.state.roletype=="Student"){
	        //     document.getElementById("lastname").removeAttribute("");
	        // }else{
	        //     null;
	        // }
	    } else{
	        $(".acceptinput").addAttr('disabled');
	    }
    }

    showModal(){
        // if(this.state.roletype){
        //     $(".modalbg").css("display","block");
        // }else{
        //      swal("Please select student or franchise","","warning");
        // }
        $(".modalbg").css("display","block");
    }
    hideModal(){
        $(".modalbg").css("display","none");
    }
    componentDidMount(){
    $(".checkUserExistsError").hide();


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
	proceed(){
		
	}
	render(){
		// var winHeight = window.innerHeight;
  //       var divHeight = winHeight/4.5+'px';
		
return(
      <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 LoginWrapper">
	    <div className="pagealertnone">
	      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
	      </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innloginwrap">
          <div className="row">
            <h3>Create New Customer Account</h3>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt50 mb100">
	        <div className="col-lg-4 col-lg-offset-4 col-md-12 col-sm-12 col-xs-12">
		    <form id="signUpUser">
	   		<div className="logininput">
	   		<label>First Name</label><label className="astricsign">*</label>
			   <input type="text" className="form-control" id="firstname" ref="firstname" name="firstname" placeholder="FirstName" onChange={this.handleChange} data-text="firstNameV" required/>
			   {this.state.formerrors.firstNameV  && (
                <span className="text-danger">{this.state.formerrors.firstNameV}</span> 
              )}
			</div>
			<div className="logininput mt30"> 
	   		<label>Last Name</label><label className="astricsign">*</label>
				<input type="text" className="form-control" id="lastname" ref="lastname" name="lastname" placeholder="LastName" onChange={this.handleChange} data-text="lastNameV" required/>
				{this.state.formerrors.lastNameV  && (
                <span className="text-danger">{this.state.formerrors.lastNameV}</span> 
              )}
			</div>
			<div className="logininput mt30"> 
	   		<label>Mobile Number</label><label className="astricsign">*</label>
			   <input className="form-control" ref="mobNumber" name="mobNumber" id="mobNumber" placeholder="MobileNumber" onChange={this.handleChange} data-text="mobileV" required/>
			   {this.state.formerrors.mobileV  && (
                <span className="text-danger">{this.state.formerrors.mobileV}</span> 
              )}
		    </div>
			<div className="logininput mt30">  
	   		<label>Email ID</label><label className="astricsign">*</label>
			  <input type="email" className="form-control" ref="signupEmail" name="signupEmail" placeholder="EmailID" onChange={this.handleChange} data-text="emailIDV" onBlur={this.checkUserExists.bind(this)} required/>
                <p className="checkUserExistsError">User already exists!!!</p>
			  {this.state.formerrors.emailIDV.length  ? (
                <span className="text-danger">{this.state.formerrors.emailIDV}</span> 
              ) : ""}
			</div>
            <div className="logininput mt30">
	   		<label>Password</label><label className="astricsign">*</label>
                <input type="password" className="form-control" ref="signupPassword" placeholder="Password" name="signupPassword" required/>
            </div>
            <div className="logininput mt30">
	   		<label>Confirm Password</label><label className="astricsign">*</label>
                <input type="password" className="form-control" ref="signupConfirmPassword" placeholder="Confirm Password" name="signupConfirmPassword" required/>
            </div>
	    <div className="mt30 loginforgotpass">
            <input  id="idacceptcondition" required type="checkbox"  value="acceptedconditions" onClick={this.acceptcondition.bind(this)}/><a data-toggle="modal" data-target="#myModal" className="" onClick={this.showModal.bind(this)}>&nbsp;I agree to the <span className=""> terms & conditions</span><label className="astricsign">*</label></a>
        </div>
	    <div class="modal" id="myModal" role="dialog">
	      <div class="modal-dialog">
	        <div class="modal-content">
	          <div class="modal-header">
	            <button type="button" class="close" data-dismiss="modal">&times;</button>
	            <h2 className="modaltext">Terms & Conditions</h2>
	          </div>
	          <div class="modal-body">
				{/* <p className="modaltext modalpara modalparascroll">{this.state.termsCondition?this.state.termsCondition.instruction:null}</p> */}
				<ul>
				{
					this.state.termsCondition && this.state.termsCondition.length>0 ?
					this.state.termsCondition.map((data, index)=>{
						return(
							<li>{data}</li>
						);
					})
					:
					null
				}
				</ul>
	          </div>
	          <div class="modal-footer">
	            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	          </div>
		     </div>
		    </div>
		    </div>
			<div className=" mt30">
		    	<button id="signUpBtn" onClick={this.usersignup.bind(this)} className="col-lg-10 col-md-10 col-sm-10 col-xs-10 button3  btn btn-warning  signupbtn" type="submit"> Create an Account</button>
		    </div>		   
	    	<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 text-center loginforgotpass mt30">
		     <lable>Already have an account?</lable>&nbsp;<a href='/login' className="">Sign In <b>&#8702;</b></a> 	
	    	</div>
		 </form>
	    </div>
       </div>
      </div>
	);
  } 
}
export default SignUp;
