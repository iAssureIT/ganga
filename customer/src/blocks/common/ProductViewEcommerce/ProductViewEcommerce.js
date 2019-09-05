import React, { Component } 		from 'react';
import $ 				 			from 'jquery';
import {Route, withRouter} from 'react-router-dom';
import axios                  from 'axios';
import swal from 'sweetalert';
import "./ProductViewEcommerce.css";
import _                      from 'underscore';

axios.defaults.baseURL = 'http://gangaexpressapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';


class ProductViewEcommerce extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	"productData":[],
	    	"subImgArray":[],
	    	"totalQuanity":1,
	    	"quanityLimit":5,
	    };
    this.changeImage = this.changeImage.bind(this); 
  	}  

  	componentDidMount()
  	{
      	axios.get("/api/products/get/one/"+this.props.productID)
            .then((response)=>{
              this.setState({ 
                  productData : response.data,
                  quanityLimit : response.data.availableQuantity
              })
            })
            .catch((error)=>{
                console.log('error', error);
            })

  		var imageArray=[
			{"image":"/images/45-home_default.jpg"},
			{"image":"/images/41-home_default.jpg"},
			{"image":"/images/32-home_default.jpg"},
			{"image":"/images/45-home_default.jpg"},
  		]
  	}
  	 changeImage = (event)=>{
        document.getElementById('change-image').src=event.target.src;
  }

    addtocart =(event)=>{
    // const token = localStorage.getItem("token");
    //   if(token!==null){
    //   // console.log("Header Token = ",token);
    //   // browserHistory.push("/");
    //   this.props.history.push("/");
    // }
    // else{
    // 	  this.props.history.push("/login");
    // }
    event.preventDefault();
    var id = event.target.id;
    
    axios.get('/api/products/get/one/'+id)
    .then((response)=>{
      var totalForQantity   =   parseInt(Number(this.state.totalQuanity) * response.data.offeredPrice);
          const userid = localStorage.getItem('admin_ID');
         
          const formValues = { 
              "user_ID"    : userid,
              "product_ID" : response.data._id,
              "currency" : response.data.currency,
              "productCode" : response.data.productCode,
              "productName" : response.data.productName,
              "category" : response.data.category,
              "subCategory" : response.data.subCategory,
              "productImage" : response.data.productImage,
              "quantity" : this.state.totalQuanity,
			  "offeredPrice" : parseInt(response.data.offeredPrice),
			  "actualPrice" : parseInt(response.data.actualPrice),			  
              "totalForQantity" : totalForQantity,
              
          }
          axios.post('/api/carts/post', formValues)
          .then((response)=>{
            // console.log('response', response);
          swal(response.data.message)
            .then((obj)=>{
                  window.location.reload();
            });

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
    var user_ID = localStorage.getItem('admin_ID'); 
    console.log('admin_ID ===============>>>>>>>>..', user_ID);
    if(user_ID){
    	var id = event.target.id;
	    axios.get('/api/products/get/one/'+id)
	    .then((response)=>{
	          const userid = localStorage.getItem('admin_ID');
	          // console.log("userid",response.data);
	          const formValues = 
	          { 
	              "user_ID"    : userid,
	              "product_ID" : response.data._id,
	          }
	          axios.post('/api/wishlist/post', formValues)
	          .then((response)=>{
	            // console.log('response', response);
	            swal(response.data.message)
	            window.location.reload();
	          })
	          .catch((error)=>{
	            console.log('error', error);
	          })
	    })
	    .catch((error)=>{
	      console.log('error', error);
	    })
    }else{
    	this.props.history.push('/login');
    }
    
  }
  addQuantity(){
  	var totalQuanity = this.state.totalQuanity
  	totalQuanity++;
  	$('#addQuantity').addClass('auto');
  	$('#addQuantity').css('background-color','#fff');
  	$('#decreaseQuantity').addClass('auto');
  	$('#decreaseQuantity').css('background-color','#fff');
  	if(Number(totalQuanity) > Number(this.state.quanityLimit)){
  	 	$('#addQuantity').css('background-color','#ccc');
  	 	$('#addQuantity').addClass('no-drop');
  	}else{
  		this.setState({totalQuanity : totalQuanity});
  		document.getElementById('totalQuanity').innerHTML = totalQuanity;
  	}
  }
  decreaseQuantity(){
  	var totalQuanity = this.state.totalQuanity
  	totalQuanity--;
  	$('#addQuantity').addClass('auto');
  	$('#addQuantity').css('background-color','#fff');
  	$('#decreaseQuantity').addClass('auto');
  	$('#decreaseQuantity').css('background-color','#fff');
  	if(Number(totalQuanity) == 1 || Number(totalQuanity) > 1){
  		this.setState({totalQuanity : totalQuanity},() =>{
  			document.getElementById('totalQuanity').innerHTML = this.state.totalQuanity;
  		});
  		
  	}else{
  		$('#decreaseQuantity').addClass('no-drop');
  		$('#decreaseQuantity').css('background-color','#ccc');	
  	}
  }
  render() {
  		//console.log(this.state.productData.productImage[1]);
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 backColorWhite mb20 boxBorder">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt50">
 
						<div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 ">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imageContainer">
								<div className="row">
									<img src={this.state.productData.productImage && this.state.productData.productImage[0]} id="change-image" alt="default"/>
									
								</div>
							</div>
						{/*Use Map Here*/}
							{
								this.state.productData.productImage && 
								this.state.productData.productImage.map((data, index)=>{
									
									if(index>0 && !_.isEmpty(data)){
										return(
                       					<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 miniImagesIn" onClick={this.changeImage} >
											<div className="row">
											{
												data &&  <img src={data} alt="default"/>
											}
											</div>
										</div>
                       					);
									}
                       				
                       			})	
							}
						</div>
						<div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 ">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productInfoEcommerce">
								<div className="row">
									<div id="brand"><label> {this.state.productData.brand} </label></div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="row productNameClass">{this.state.productData.productName}</div>
									</div>
									
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div className="row">
										<p className="tealColor boldText">Special price</p>
										<span className="priceEcommerce" ><i className={"fa fa-"+this.state.productData.currency}></i>&nbsp;{this.state.productData.offeredPrice}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										{this.state.productData.offered == true ? <span className="actualPrice"><i className={"fa fa-"+this.state.productData.currency}>&nbsp;{this.state.productData.actualPrice}</i></span> : null}
										</div>
									</div>
									<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12">
										<div className="row">
				                      	<span className="pull-left pad10">Rating </span>
				                          <fieldset className="rating stars">
				                              <input type="radio" id="star5" name="rating" value="5" /><label htmlFor="star5"></label>
				                              <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="star4"></label>
				                              <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="star3"></label>
				                              <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="star2"></label>
				                              <input type="radio" id="star1" name="rating" value="1"/><label htmlFor="star1"></label>
				                          </fieldset>
				                          <div className="clearfix "></div>
				                          </div>
				                    </div>
									<div>
										
									</div>

									{ this.state.productData.featureList &&
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 policies">
								<ul>
								{ this.state.productData.featureList && 
									this.state.productData.featureList.map((data,index)=>{
										return (
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={index}>
											<div className="row">
											 <span className="fa fa-tag tealColor col-lg-1 col-md-1 col-sm-1 col-xs-1 row LH tag"></span> <span className="blackColor col-lg-11 col-md-11 col-sm-11 col-xs-11 row LH">{data.feature}</span>
											</div>
											</div>
										);
									})
									
								}
								</ul>
							</div>
							}
									
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
										<div className="row">
										<h4>Product Details :</h4>
										<span className="itemDescEcommerce">
										{this.state.productData.shortDescription}
										</span>
										<br/>
										<span className="itemDescEcommerce">
										{this.state.productData.productDetails}
										</span>
										</div>
									</div>
									
									
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 adCart">
										<div className="row">
										  	<div className="col-lg-3 col-sm-12 col-md-12 col-xs-12 itemCounter ">
										  		<div className="row">
										  			<div className="col-lg-4 col-sm-12 col-md-12 col-xs-12 divContain" id="addQuantity" onClick={this.addQuantity.bind(this)}>
										  				<i className="fa fa-plus" aria-hidden="true"></i>
										  			</div>
										  			<div className="col-lg-4 col-sm-12 col-md-12 col-xs-12 divContain" id="totalQuanity">
														1
										  			</div>
										  			<div className="col-lg-4 col-sm-12 col-md-12 col-xs-12 divContain noRightBor" id="decreaseQuantity" onClick={this.decreaseQuantity.bind(this)}>
														<i className="fa fa-minus"></i>		
													</div>
					                             </div>
				                            </div>
				                            <div className="col-lg-2 col-sm-12 col-md-12 col-xs-12  ">
				                            	<div onClick={this.addtocart.bind(this)} className="addToCartEcommerce" id={this.state.productData._id}>
									  				<i className="fa fa-shopping-cart" id={this.state.productData._id}></i>&nbsp;
												</div>
				                            </div>
				                             <div className="col-lg-2 col-sm-12 col-md-12 col-xs-12 row">
				                            	<div onClick={this.addtowishlist.bind(this)} className="wishListEcommerce" id={this.state.productData._id}>
									  				<i className="fa fa-heart" id={this.state.productData._id}></i>&nbsp;
												</div>
				                            </div>
				                            
				                        </div>
									</div>
								</div>
							</div>
							
						</div>
					</div>
                </div>
		);
	}
}
export default withRouter(ProductViewEcommerce);

