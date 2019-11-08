import React, { Component } 		from 'react';

export default class Loader extends Component {
	constructor(props){
    super(props);
	     
  	}

    render(){
      return(
        this.props.type == "fullpageloader" ?
        <div>
          <div className="fullpageloader">Loading&#8230;</div>
        </div>
        
        : 
        <div className="loading">
          <i className="fa fa-spinner fa-spin" ></i>
        </div>
      )
       
    }
}

