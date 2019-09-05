import React, { Component } from 'react';
import $                    from 'jquery';
import jquery               from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import "./Useraccountpage.css";
import Addaddress 			from "../../blocks/Addaddress/Addaddress.js";
import Edituser 			from "../../blocks/Edituser/Edituser.js";


export default class Useraccountpage extends Component{
	constructor(props){
		super(props);
		
	}

		componentDidMount() {

		  
		  $("#author_bio_wrap_toggle").click(function()
		  {
		    
		    $("#author_bio_wrap").slideToggle( "slow");
		    
		  });
		  $("#author_bio_wrap_toggle1").click(function()
		  {
		    
		    $("#author_bio_wrap1").slideToggle( "slow");
		    
		  });  
		  
			
		}

	

	render(){
		return(	
			<div className="col-lg-12 useraccwrap backColorGray">
				<Edituser />
			</div>
			);
	}
}