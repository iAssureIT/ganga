import React, { Component }   from 'react';
import $                      from 'jquery';
import jQuery                 from 'jquery';
import axios                  from 'axios';
import ReactTable             from "react-table";
import swal                   from 'sweetalert';
import _                      from 'underscore';
import 'bootstrap/js/tab.js';

class VendorLocationType extends Component {
  
    componentDidMount() {
        window.scrollTo(0, 0);
        $.validator.addMethod("regxA1", function(value, element, regexpr) {          
            return regexpr.test(value);
        }, "Name should only contain letters & number.");

        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });
        $("#vendorLocationType").validate({
            rules: {
                categoryName: {
                required: true,
                regxA1: /^[A-Za-z_0-9 ][A-Za-z\d_ ]*$/,
                },
            },
            errorPlacement: function(error, element) {
                if (element.attr("name") == "locationType"){
                    error.insertAfter("#locationType");
                }
            }
        });
    }

  
    constructor(props) {
        super(props);
        this.state = {
            locationType : ""
        };
    }
    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value
        });   
    }
    submitType(event){
        event.preventDefault();
        var formValues = {
            "locationType" : this.refs.locationType.value
        }
        axios.post('/api/vendorLocationType/post', formValues)
        .then((response)=>{
            console.log('response', response);
            swal(response.data.message);
            this.setState({
                locationType : ""
            })
        })
        .catch((error)=>{
            console.log('error', error);
        })
    }


    render() {
        return (
            <div className="container-fluid col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div className="row">
                    <section className="content">
                        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 titleaddcontact">
                                    <div className="box col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                        <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                            <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Vendor Location Type</h4>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                            <br/>
                                            <br/>
                                            <form className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="vendorLocationType">
                                                <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12 pdcls"> 
                                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Location Type<i className="astrick">*</i></label>
                                                    <input type="text" id="locationType" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.locationType}  ref="locationType" name="locationType" onChange={this.handleChange.bind(this)} placeholder="Enter category name.." required/>
                                                </div>
                                                <br/>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <button onClick={this.submitType.bind(this)} className="btn button3 pull-right">Submit</button>
                                                </div> 
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div> 
            </div> 
        );
    } 
}
export default VendorLocationType;

