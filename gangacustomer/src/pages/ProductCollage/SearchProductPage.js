import React, { Component } 		  from 'react';
import ProductCollageView from '../../blocks/ProductCollage/ProductCollageView.js';
import SearchProductPage  from  './SearchProductPage.css';
import $                    from 'jquery';
import InputRange from 'react-input-range';
import  'react-input-range/lib/css/index.css';

export default class SearchProduct extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	searchResult : [],
	    	data:[1, 2, 3, 4, 5, 6],
	    	price: { min: 2, max: 10 }
	    };
	    this.handlePriceChange = this.handlePriceChange.bind(this);  
  	}

  	componentDidMount() {
  		console.log('match',this.props.match.params);

  		$('button[data-toggle="collapse"]').click(function () {
  			//$(this).next().find('i').removeClass();
  			$(this).next().find('i').toggleClass('fa fa-minus fa fa-plus');

  			if ($(this).css('display') == 'inline-block') {
  				//$(this).next().find('i').addClass('fa fa-minus')
  			}else{
  				//$(this).next().find('i').addClass('fa fa-plus')
  			}
  		});
  	}

	handlePriceChange(event) {
	      event.preventDefault();
	      const target = event.target;
	      const name = target.name;
	     

	      if (name == 'slider_min') {
	      	this.setState({
	          price: { min : Number(target.value),  max : Number(this.state.price.max)}
	      	}); 
	      }
	      if (name == 'slider_max') {
	      	this.setState({
	          price: { min : Number(this.state.price.min),  max : Number(target.value)}
	      	}); 
	      } 
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
              		<div className="forSearchDiv">
              			<h5 className="showingby">NOW SHOWING BY</h5>
              			<hr/>
              			<h6 className="selcategory">CATEGORY: Electronics</h6> 
              			<span><a href="#" >Remove This Item </a></span><br/>
              			<span><a href="#" >Clear All </a></span>
              		</div>
              		<div className="nb-brand">
						<div className="accordion" id="accordionExample">
						  
						    <div className="card-header" id="headingOne">
						    <div className="pagefilter">	
						        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
						          CATEGORY 
						        </button>
						        <span className="expand"><i className="fa fa-plus"></i></span>
						    </div>
						    </div>

						    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
						      <div className="card-body">
						        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
						      </div>
						    </div>
						 
						    <div className="card-header" id="headingTwo">
						      <div className="pagefilter">	
						        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
						          COLOR
						        </button>
						        <span className="expand"><i className="fa fa-plus"></i></span>
						      </div>
						    </div>
						    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
						      <div className="card-body">
						      	<a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/computers/accessories.phtml?color=49&amp;price=83-361" className="swatch-option-link-layered">
                                    <div className="color-option" option-type="1" option-id="49" option-label="Black" option-tooltip-thumb="" option-tooltip-value="#000000" ></div>
                            	</a>
                            	<a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/computers/accessories.phtml?color=49&amp;price=83-361" className="swatch-option-link-layered">
                                    <div className="color-option" option-type="1" option-id="49" option-label="Black" option-tooltip-thumb="" option-tooltip-value="#000000" ></div>
                            	</a>
                            	<a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/computers/accessories.phtml?color=49&amp;price=83-361" className="swatch-option-link-layered">
                                    <div className="color-option" option-type="1" option-id="49" option-label="Black" option-tooltip-thumb="" option-tooltip-value="#000000" ></div>
                            	</a>
						      </div>
						    </div>

						    <div className="card-header" id="headingTwo">
						      <div className="pagefilter">	
						        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseTwo">
						          PRICE
						        </button>
						        <span className="expand"><i className="fa fa-plus"></i></span>
						      </div>
						    </div>
						    <div id="collapseThree" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
						      <div className="card-body">
						      	<InputRange
							        maxValue={20}
							        minValue={0}
							        value={this.state.price}
							        onChange={price => this.setState({ price  })} />
							        <input className="input-field min-value" type="text" id="slider_min" name="slider_min" placeholder="From" value={this.state.price.min} onChange={this.handlePriceChange} />
							        <input className="input-field max-value" type="text" id="slider_max" name="slider_max" placeholder="To" value={this.state.price.max} onChange={this.handlePriceChange} />
						      </div> 
						    </div>
						 </div>
              		</div>
              		<br/>
 					<div className="nb-brand">
					<div className="Featured-Brands-tittle">Featured Brands</div>
						<ul className="Featured-Brands">
																
							<li className="Featured-Brands-li">
								<div className="Featured-Brands-li-div">
									<div className="Featured-Brands-li-div-div">
									<a className="imgs" href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/shopbybrand/index/view/id/1/">
									<img className="img_logo_brand" src="http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media///Shopbybrand//techservice.png" />
									</a>

									<a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/shopbybrand/index/view/id/1/" className="name_brand"> iPhone</a>	
									</div>
								</div>	
							</li>
	 
						</ul>
						<div className="viewall">
							<form action="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/shopbybrand/index/index/">
								<button type="submit" name="viewall">View All</button>
							</form>
						</div>
					</div>
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
				    <div id="categories" className="tab-pane fade">
				    	Categories 
				    </div>
				    
				  </div>
              	
              </div>
            </div>
	     	</div>
	    )
	}
}  	