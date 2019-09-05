import React, { Component } from 'react';
import "./NoResult.css";
import swal from 'sweetalert';

export default class NoResult extends Component {
    render(){
        return(
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxBorder backColorWhite mt20 mb20">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noResult">
                    <h2>Sorry, no results found!</h2>
                    <p>Please check the spelling or try searching for something else</p>
                </div>
            </div>
        );
    }
}