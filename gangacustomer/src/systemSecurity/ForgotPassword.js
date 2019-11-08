import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import axios from 'axios';
import Message from '../blocks/Message/Message.js';
class ForgotPassword extends Component {
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
    sendLink(event) {
        event.preventDefault();
        var email = this.refs.emailLink.value;
        var formValues = {
            username : email
        }
        if($('#resetPass').valid()){
            axios.post('/api/users/sendlink', formValues)
            .then((response)=>{
                console.log('res', response);
             // ToastsStore.success(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
                // swal(response.data.message);
                this.setState({
                  messageData : {
                    "type" : "inpage",
                    "icon" : "fa fa-check-circle",
                    "message" : "&nbsp; "+response.data.message,
                    "class": "success",
                  }
                })
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

    validation() {
        $.validator.addMethod("regxemail", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid email address.");


        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });

        $("#resetPass").validate({
            rules: {
                emailLink: {
                    required: true,
                    regxemail: /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
                },
            },
            errorPlacement: function (error, element) {

                if (element.attr("name") == "emailLink") {
                    error.insertAfter("#emailLink");
                }
            }
        });
    }
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
                <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 mt25 mb25">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Message messageData={this.state.messageData} />
                    </div>
                    <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Please enter your email address below to receive a password reset link.</p>
                    <form id="resetPass">
                        <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">Email <i className="error">*</i></label>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="emailLink">
                            <input className="col-lg-6 col-md-6 col-sm-12 col-xs-12" ref="emailLink" name="emailLink" type="text" />
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
                            <button className="btn btn-warning resetBtn" onClick={this.sendLink.bind(this)}>Reset My Password</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ForgotPassword;