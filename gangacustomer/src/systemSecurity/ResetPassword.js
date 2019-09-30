import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import axios from 'axios';

class ResetPassword extends Component {
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
    resetPassword(event) {
        event.preventDefault();
        var userID = this.props.match.params.user_ID;
        var formValues = {
            "pwd" : this.refs.newPassword.value
        }
        if($('#resetPassword').valid()){
            axios.put('/api/users/resetpwd/'+userID, formValues)
            .then((response)=>{
                console.log('res', response);
                // swal(response.data.message);
                this.props.history.push('/login');
            })
            .catch((error)=>{
                console.log('error', error);
            })
        }
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
                },

            },
            errorPlacement: function (error, element) {
                if (element.attr("name") == "newPassword") {
                    error.insertAfter("#newPassword");
                }
                if (element.attr("name") == "confirmPassword") {
                    error.insertAfter("#confirmPassword");
                }
            }
        });
    }
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
                <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 mt25 mb25">
                    <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Please enter your email address below to receive a password reset link.</p>
                    <form id="resetPassword">
                        <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">New Password <i className="error">*</i></label>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="newPassword">
                            <input className="col-lg-6 col-md-6 col-sm-12 col-xs-12" ref="newPassword" name="newPassword" type="text" />
                        </div>
                        <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">Confirm Password <i className="error">*</i></label>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="confirmPassword">
                            <input className="col-lg-6 col-md-6 col-sm-12 col-xs-12" ref="confirmPassword" name="confirmPassword" type="text" />
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
                            <button className="btn btn-warning resetBtn" onClick={this.resetPassword.bind(this)}>Reset My Password</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ResetPassword;