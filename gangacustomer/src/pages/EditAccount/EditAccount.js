import React, { Component } from 'react';
import $                    from 'jquery';
import axios                from 'axios';
import SmallBanner               from '../../blocks/SmallBanner/SmallBanner.js';
import "./EditAccount.css";
import Sidebar from '../../common/Sidebar/Sidebar.js';
import {ToastsContainer, ToastsStore ,ToastsContainerPosition,message,timer,classNames} from 'react-toasts';

class EditAccount extends Component{
    constructor(props) {
        super(props);
        this.state={
            "firstName"     : "",
            "lastName"      : "",
            "emailId"       : "",
            "newPassword"   : "",
            "oldPassword"   : "",
            "changeEmail"   : "",
            "changePassword": "",
            "changeEmail"   : false,
            "changePassword": false
        }
    }
    componentDidMount(){
        this.getUserData();
        $.validator.setDefaults({
            debug: true,
            success: "valid"
        });
    
        $("#editAccount").validate({
            rules: {
                firstName: {
                    required: true,
                },
                lastName: {
                    required: true,
                },
                emailId:{
                    required : true,
                },
                oldPassword: {
                    required: true,
                },
                newPassword: {
                    required: true,
                },
                newPassword2: {
                    required: true,
                },
            },
            errorPlacement: function(error, element) {
                if (element.attr("name") == "firstName"){
                    error.insertAfter("#firstName");
                }
                if (element.attr("name") == "lastName"){
                    error.insertAfter("#lastName");
                }
                if (element.attr("name") == "emailId"){
                    error.insertAfter("#emailId");
                }
                if (element.attr("name") == "oldPassword"){
                    error.insertAfter("#oldPassword");
                }         
                if (element.attr("name") == "newPassword"){
                    error.insertAfter("#newPassword");
                }         
                if (element.attr("name") == "newPassword2"){
                    error.insertAfter("#newPassword2");
                }     
            }
        });
    }
    accountUpdate(event){
        event.preventDefault();
    }
    getUserData(){
        var userid = localStorage.getItem("user_ID");
        axios.get('/api/users/'+userid)
        .then( (res)=>{
            console.log('res', res.data);
            this.setState({
                "firstName"         : res.data.profile.firstName,
                "lastName"          : res.data.profile.lastName,
                "emailId"           : res.data.profile.emailId,
                "newPassword"       : "",
                "oldPassword"       : "",
            })
        })
        .catch((error)=>{
          console.log("error = ",error);
          // alert("Something went wrong! Please check Get URL.");
        });
    }
    updateUser(event){
        event.preventDefault();
        var userid = localStorage.getItem("user_ID");
        console.log('updateUser',userid);
        var field = (this.state.changeEmail == true && this.state.changePassword == true? 'all' : (this.state.changeEmail == true ? 'email' : (this.state.changePassword == true? 'password' :"name")));
        console.log('field', field);
        var formvalues = {
            "field"         : field,
            "firstName"     : this.refs.firstName.value,
            "lastName"      : this.refs.lastName.value,
            "emailId"       : this.state.emailId,
            "newPassword"   : this.state.newPassword,
            "oldPassword"   : this.state.oldPassword,
            "changeEmail"   : this.state.changeEmail,
            "changePassword": this.state.changePassword
        }
        console.log('formvalues',formvalues);
        if($('#editAccount').valid()){
            axios.patch('/api/users/userdetails/'+userid, formvalues)
            .then((response)=> {    
                // console.log(response.message);
             ToastsStore.success(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
                // swal(response.data.message);
            })
            .catch((error)=> {
            console.log('error',error);
            });
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

    changeEmail(event){
        this.setState({
            changeEmail : event.target.checked
        })
    }
    changePassword(event){
        this.setState({
            changePassword : event.target.checked
        })
    }
    onChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    render(){
        return(
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
            <div className="pagealertnone">
              <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
              </div>
                <div className="container">
                    <br/>
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 NOpadding">
                        <Sidebar />
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8 NOpadding mt25">
                        <h4 className="accountTitle">Account Information</h4>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt15">
                            <form id="editAccount">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <label className="mt15">First Name <i className="requiredsign">*</i></label><br />
                                        <div id="firstName" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                            <input type="text" name="firstName"  ref="firstName" value={this.state.firstName} onChange={this.onChange.bind(this)} className="col-lg-8 col-md-8 col-sm-12 col-xs-12" />
                                        </div>
                                        <label className="mt15">Last Name <i className="requiredsign">*</i></label><br />
                                        <div id="lastName" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                            <input type="text" name="lastName"  ref="lastName" value={this.state.lastName} onChange={this.onChange.bind(this)} className="col-lg-8 col-md-8 col-sm-12 col-xs-12" />
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt15 NOpadding">
                                            <input type="checkbox" id="changeEmail" checked={this.state.changeEmail} onChange={this.changeEmail.bind(this)}/> &nbsp; <span>Change Email</span>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb15 NOpadding">
                                            <input type="checkbox" id="changePassword" checked={this.state.changePassword} onChange={this.changePassword.bind(this)}/> &nbsp; <span>Change Password</span>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt15 NOpadding">
                                            <h4>{(this.state.changeEmail == true && this.state.changePassword == true? 'Change Email and Password' : (this.state.changeEmail == true ? 'Change Email' : (this.state.changePassword == true? 'Change Password' :"")))}</h4>
                                        </div>
                                        {
                                            this.state.changeEmail == true?
                                            <div>
                                                <label className="mt15">Email <i className="requiredsign">*</i></label><br />
                                                <div id="emailId" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                    <input type="email" name="emailId"  ref="emailId" value={this.state.emailId} onChange={this.onChange.bind(this)} className="col-lg-8 col-md-8 col-sm-12 col-xs-12" />
                                                </div>
                                            </div>
                                            :
                                            null
                                        }
                                        
                                        {
                                            this.state.changeEmail == true || this.state.changePassword == true?
                                            <div>
                                                <label className="mt15">Current Password <i className="requiredsign">*</i></label><br />
                                                <div  id="oldPassword" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                    <input type="text" name="oldPassword"  ref="oldPassword" value={this.state.oldPassword} onChange={this.onChange.bind(this)} className="col-lg-8 col-md-8 col-sm-12 col-xs-12" />
                                                </div>
                                            </div>
                                            :
                                            null
                                        }
                                        
                                        {
                                            this.state.changePassword == true?
                                            <div>
                                                <label className="mt15">New Password <i className="requiredsign">*</i></label><br />
                                                <div id="newPassword" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                    <input type="password" name="newPassword"  ref="newPassword" value={this.state.newPassword} onChange={this.onChange.bind(this)} className="col-lg-8 col-md-8 col-sm-12 col-xs-12" />
                                                </div>
                                                <label className="mt15">Confirm New Password <i className="requiredsign">*</i></label><br />
                                                <div id="newPassword2" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                    <input type="password" name="newPassword2"  ref="newPassword2" value={this.state.newPassword2} onChange={this.onChange.bind(this)} className="col-lg-8 col-md-8 col-sm-12 col-xs-12" />
                                                </div>
                                            </div>
                                            :
                                            null
                                        }
                                        
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
                                            <button className="btn btn-warning editAccount" onClick={this.updateUser.bind(this)}>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditAccount;