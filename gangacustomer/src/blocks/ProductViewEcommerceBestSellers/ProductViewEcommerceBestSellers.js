import React, { Component }     from 'react';
import $              from 'jquery';
import {Route, withRouter} from 'react-router-dom';
import axios                  from 'axios';
import swal from 'sweetalert';
import "./ProductViewEcommerceBestSellers.css";
import _                      from 'underscore';

axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';



export default class ProductViewEcommerceBestSellers extends Component {
	constructor(props){
    super(props);
	    
  	} 
  	componentDidMount(){  	} 
  	  	
  	render() {
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 spc20 ">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="bestsellerBx1">
              <div className="bestsellerpill col-lg-1">
                BEST SELLERS
              </div>
            </div>
            <div className="bestsellerBx2">

            </div>
          </div>
        </div>
		);
	}
}