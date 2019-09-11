import React, { Component } 		  from 'react';
import ProductCollageView from '../../blocks/ProductCollage/ProductCollageView.js';
import SearchProductPage  from  './SearchProductPage.css';


export default class SearchProduct extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	searchResult : [],
	    	data:[1, 2, 3, 4, 5, 6]
	    };
  	}

  	componentDidMount() {
  		console.log('match',this.props.match.params);
  	}
  	render() {
		return (
	      	<div className="container">
	     	<div className="row"> 
	     		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
	     			<ul className="links">
				    	<li><a  href="/">Home /</a></li>
				    	<li><a href="#categories">Categories</a></li>
				  	</ul>
				</div>		
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
 
              </div>
              <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">

              	<ul className="nav nav-tabs">
				    <li className="active"><a data-toggle="tab" href="#products">Products</a></li>
				    <li><a data-toggle="tab" href="#categories">Categories</a></li>
				</ul>
				<br/>
				  <div className="tab-content">
				    <div id="products" className="tab-pane fade in active">
				    	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding">
				    		<select className="sortProducts col-lg-3 pull-right">
								<option  className="hidden" >Relevence</option>
								<option value="price">Price</option>
								<option value="newProduct">New Product</option>
								<option value="bestSeller">Best Seller</option>
								<option value="promotionProduct">Promotion Product </option>
								<option value="rating">Rating</option>
								<option value="review">Review </option>
							</select>
				    	</div>
				    	<br />
				    	<br />
				    	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding">
				    		{
				    			this.state.data && this.state.data.map((value, index) =>{
				    				return(
				    					<ProductCollageView key={index}/>
				    					);
				    				
				    			})
				     		
				    		}
				     	</div>
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