import React, { Component } 		  from 'react';
import ProductCollageView from '../../blocks/ProductCollage/ProductCollageView.js';
 


export default class SearchProduct extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	searchResult : []
	    };
  	}

  	componentDidMount() {

  	}
  	render() {
		return (
	      	<div className="container">
	     	<div className="row"> 
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">

              </div>
              <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">

              	<ul class="nav nav-tabs">
				    <li class="active"><a data-toggle="tab" href="#products">Products</a></li>
				    <li><a data-toggle="tab" href="#categories">Categories</a></li>
				  </ul>

				  <div class="tab-content">
				    <div id="products" class="tab-pane fade in active">
				     	<ProductCollageView />
				    </div>
				    <div id="categories" class="tab-pane fade">
				    	Categories
				    </div>
				    
				  </div>
              	
              </div>
            </div>
	     	</div>
	    )
	}
}  	