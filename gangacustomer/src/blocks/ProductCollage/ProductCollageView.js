import React, { Component } from 'react';
import "./ProductCollageView.css";
import axios                      from 'axios';
import swal                       from 'sweetalert';

export default class ProductCollageView extends Component {
	constructor(props){
    super(props);
	   this.state = {
	   		product:[]
	   }
  	}  
  	componentDidMount() {
  		this.setState({
	      product : this.props.product
	    });
  	}
  	componentWillRecieveprops(nextProps){
  		
	    this.setState({
	      product : nextProps.product
	    });
  	}
  	addtocart(event){
    event.preventDefault();
    var id = event.target.id;
    console.log('id', id);
    axios.get('/api/products/get/one/'+id)
    .then((response)=>{
      var totalForQantity   =   parseInt(1 * response.data.offeredPrice);
          const userid = localStorage.getItem('user_ID');
          
          const formValues = { 
              "user_ID"    : userid,
              "product_ID" : response.data._id,
              "currency" : response.data.currency,
              "productCode" : response.data.productCode,
              "productName" : response.data.productName,
              "category" : response.data.category,
              "subCategory" : response.data.subCategory,
              "productImage" : response.data.productImage,
              "quantity" : 1  ,
              "offeredPrice" : parseInt(response.data.offeredPrice),
              "actualPrice" : parseInt(response.data.actualPrice),
              "totalForQantity" : totalForQantity,
              
          }
          axios.post('/api/carts/post', formValues)
          .then((response)=>{
            
          swal(response.data.message);
          this.props.changeCartCount(response.data.cartCount);
          })
          .catch((error)=>{
            console.log('error', error);
          })
    })
    .catch((error)=>{
      console.log('error', error);
    })
  }


  addtowishlist(event){
    event.preventDefault();
    var id = event.target.id;
    const userid = localStorage.getItem('user_ID');
    const formValues = 
    { 
        "user_ID"    : userid,
        "product_ID" : id,
    }
    axios.post('/api/wishlist/post', formValues)
    .then((response)=>{
      
      swal(response.data.message);
      this.props.changeWishlistCount(response.data.wishlistCount);
    })
    .catch((error)=>{
      console.log('error', error);
    })
  }
  render() {
  		//console.log('products',this.state.product);
		return (
			<div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 card">
                <div className="item-top">
                	<div className="productImg">
                		<a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/iphone-7.html" className="product photo product-item-photo" tabIndex="-1">
							<img className="productImage" src={this.state.product && this.state.product.productImage && this.state.product.productImage[0] ? this.state.product.productImage[0] : '/images/notavailable.jpg'} />
						</a>
						<div className="hoveractions">
							<div className="col-lg-12">  
                                <ul>
                                    <li ><a className="circle spin" href="#"> <i className="fa fa-info viewDetail"></i></a></li>
                                    
                                    <li><a className="circle spin" href="#"> <i className="fa fa-heart addTOWishList"></i></a></li>
                                </ul>
                            </div>
						</div>
					
                	</div>
                	<div className="productDetails">

                		<div className="innerDiv">
                			<a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/iphone-7.html" className="product-item-link">
							 {
							 	this.state.product.productName !== undefined ? 
							 		(this.state.product.productName.length > 25 ? this.state.product.productName.substring(0, 25) + '...' : this.state.product.productName )
							 	: ''}</a>

							<div className="product-reviews-summary">
							    <div className="rating-summary">
	                                  	<fieldset className="ratingReview stars ">
	                                      <input type="radio" id="star5" name="ratingReview" value="5" /><label htmlFor="star5"></label>
	                                      <input type="radio" id="star4" name="ratingReview" value="4" /><label htmlFor="star4"></label>
	                                      <input type="radio" id="star3" name="ratingReview" value="3" /><label htmlFor="star3"></label>
	                                      <input type="radio" id="star2" name="ratingReview" value="2" /><label htmlFor="star2"></label>
	                                      <input type="radio" id="star1" name="ratingReview" value="1"/><label htmlFor="star1"></label>
	                                  	</fieldset>
	                                  <div className="clearfix "></div>
							    </div>
							</div>
							<div > 
								<span className="price">$200.00</span> &nbsp;
								<span className="oldprice">$230.00</span> 
							</div>
							<div className="actions">
								<button type="submit" title="Add to Cart" className="actiontocart primary ">
									<span><i className="fa fa-shopping-cart"></i>&nbsp;Add to Cart</span>
								</button>
							</div>
                		</div>
                	
                	</div>
                </div>
        	</div> 




		);
	}
}
