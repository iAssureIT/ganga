import React, { Component } 		from 'react';
import $ 				 			from 'jquery';
import {Route, withRouter} from 'react-router-dom';
import axios                  from 'axios';
import "./ProductViewEcommerce.css";
import _                      from 'underscore';
import { connect }                from 'react-redux';


axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const user_ID = localStorage.getItem("user_ID");
class ProductViewEcommerce extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	"productData":[],
	    	"subImgArray":[],
	    	"totalQuanity":1,
	    	"quanityLimit":5,
	    	"imgsrc" : "",
	    };
    this.changeImage = this.changeImage.bind(this); 
  	}  

  	componentDidMount()
  	{
      	axios.get("/api/products/get/one/"+this.props.productID)
            .then((response)=>{
            	console.log("product info---->",response);
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
        var index = event.target.getAttribute('data-index');
        // if(index==event.target.getAttribute('data-index')){
        // 	$('.imgbx'+index).addClass('imgbxborder');
        // }
        this.setState({
        	imgsrc:event.target.getAttribute('data-index')
        })

  }
    getCartData(){
        // const userid = '5d5bfb3154b8276f2a4d22bf';
        const userid = localStorage.getItem('user_ID');
        axios.get("/api/carts/get/list/"+userid)
          .then((response)=>{ 
           // console.log('cartProduct=======================', response.data[0].cartItems)
              this.setState({
                cartProduct : response.data[0].cartItems
              });
                this.props.initialCartData(response.data[0].cartItems);
          })
          .catch((error)=>{
                console.log('error', error);
          })
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
    if(user_ID){

    event.preventDefault();
    var id = event.target.id;
    
    axios.get('/api/products/get/one/'+id)
    .then((response)=>{
      var totalForQantity   =   parseInt(Number(this.state.totalQuanity) * response.data.offeredPrice);
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
              "quantity" : this.state.totalQuanity,
			  "offeredPrice" : parseInt(response.data.offeredPrice),
			  "actualPrice" : parseInt(response.data.actualPrice),			  
              "totalForQantity" : totalForQantity,
              
          }
          axios.post('/api/carts/post', formValues)
          .then((response)=>{
            // console.log('response', response);
          this.getCartData();  
          // swal(response.data.message)
          this.props.changeCartCount(response.data.cartCount);
          })
          .catch((error)=>{
            console.log('error', error);
          })
    })
    .catch((error)=>{
      console.log('error', error);
    })
	}else{
      // swal({
      //     title: "Need to Sign In",
      //     text: "Please Sign In First",
      //     icon: "warning",
      //     buttons: ["No Thanks", "Sign In"],
      //     dangerMode: true,
      //   })
      //   .then((willDelete) => {
      //     if (willDelete) {
      //       window.location = "/login";
      //     } 
      // });
    }
  }
   addtowishlist(event){
    event.preventDefault();
    var user_ID = localStorage.getItem('user_ID'); 
    if(user_ID){
    	var id = event.target.id;
	    axios.get('/api/products/get/one/'+id)
	    .then((response)=>{
	          const userid = localStorage.getItem('user_ID');
	          // console.log("userid",response.data);
	          const formValues = 
	          { 
	              "user_ID"    : userid,
	              "product_ID" : response.data._id,
	          }
	          axios.post('/api/wishlist/post', formValues)
	          .then((response)=>{
	            // console.log('response', response);
	            // swal(response.data.message)
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
      // swal({
      //     title: "Need to Sign In",
      //     text: "Please Sign In First",
      //     icon: "warning",
      //     buttons: ["No Thanks", "Sign In"],
      //     dangerMode: true,
      //   })
      //   .then((willDelete) => {
      //     if (willDelete) {
      //       window.location = "/login";
      //     } 
      // });
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
						<div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 ">							
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 imageContainer">
							{
								this.state.productData.productImage && 
								this.state.productData.productImage.map((data, index)=>{
									
									if( !_.isEmpty(data)){
									// if(index>0 && !_.isEmpty(data)){
										return(
                       					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 miniImagesInNew" onClick={this.changeImage} >
											<div className="row">
											{
												data &&  <img data-index={index} className={index==this.state.imgsrc?"imgbxborder":""} src={data} alt="default"/>
											}
											</div>
										</div>
                       					);
									}
                       				
                       			})	
							}
						</div>
							<div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 imageContainer imgCont">
								<div className="row">
									<img className="productView" src={this.state.productData.productImage && this.state.productData.productImage[0]} id="change-image" alt="default"/>
									
								</div>
							</div>
						</div>
						<div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 ">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productInfoEcommerce">
								<div className="row">
									<div id="brand"><label className="productNameClassNewBrand"> {this.state.productData.productName} </label></div>
									{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="row  productNameClassNew">{this.state.productData.productName}</div>
									</div>*/}
									
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div className="row">
										<p className="orangetxt "><a href="#gotoreview" className="anchorclr">Be the first to review this product</a> ({this.state.productData.productCode})</p>
										{/*<span className="priceEcommerce" ><i className={"fa fa-"+this.state.productData.currency}></i>&nbsp;{this.state.productData.offeredPrice}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										{this.state.productData.offered == true ? <span className="actualPrice"><i className={"fa fa-"+this.state.productData.currency}>&nbsp;{this.state.productData.actualPrice}</i></span> : null}*/}
										</div>
										<div className="undrln row"> </div>
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div className="row">
											<span className="col-md-2 col-lg-2 col-sm-12 col-xs-12 paddingleftzero ttl" >
												Price:
											</span>
											<span className="col-md-6 col-sm-12 col-xs-12 col-lg-6 ">
												<span className="priceEcommerceNew" ><i className={"fa fa-"+this.state.productData.currency}></i>&nbsp;{this.state.productData.offeredPrice}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												{this.state.productData.offered == true ? <span className="actualPrice"><i className={"fa fa-"+this.state.productData.currency}>&nbsp;{this.state.productData.actualPrice}</i></span> : null}
											</span>				                         
				                          </div>
				                          
				                           <div className="row listspace">
											<span className="col-md-2 col-lg-2 col-sm-12 col-xs-12 paddingleftzero paddingrightzero ttl" >
												Features
											</span>
											<span className="col-md-6 col-sm-12 col-xs-12 col-lg-6 ttllist" >												
												{ this.state.productData.featureList &&
													<div className="">
														<ul className="paddingleftzero">
														{ this.state.productData.featureList && 
															this.state.productData.featureList.map((data,index)=>{
																return (
																	<div className="" key={index}>
																	<div className="">
																	 <span className="fa fa-circle-o tealColorfnt "></span>
																	  <span className="blackColor ">&nbsp;&nbsp;{data.feature}</span>
																	</div>
																	</div>
																);
															})
															
														}
														</ul>
													</div>
													}
												
											</span>
															                         
				                          </div>
				                    </div>
									

									
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 adCart ">
										
										<div className="row spc">
											<div className="col-lg-5 col-md-5 col-sm-4 col-xs-4 NOpadding">
												<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 qtyInput" id="totalQuanity">
													1
												</div>
												<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
													<i className="fa fa-plus qtyIncrease" id="addQuantity" onClick={this.addQuantity.bind(this)}></i><br />
													<i className="fa fa-minus qtyIncrease" id="decreaseQuantity" onClick={this.decreaseQuantity.bind(this)}></i>
												</div>
												<div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 NOpadding">
													<div id={this.state.productData._id} onClick={this.addtocart.bind(this)} className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 viewAddtoCart"> &nbsp; Add to Cart</div>
												</div>
												<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
													<div id={this.state.productData._id} onClick={this.addtowishlist.bind(this)} className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 viewWishList"></div>
												</div>
											</div>
										</div>
				                        
								</div>

								</div>
							</div>
							
						</div>
					</div>
			        <div id="gotoreview" className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 faq">
			            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 faq">
			              <div className="col-lg-12 topspace detailtitle">DETAILS</div>
			              <div className="spcbx topspace15"></div>
			               <div className="col-lg-12 detailtxt topspace15">{this.state.productData.productDetails}</div>
			            </div>
			          </div>               
			        </div>               
                </div>
		);
	}
}
const mapStateToProps = (state)=>{
  return {
    cartData :  state.cartData
  }
}
const mapDispachToProps = (dispach) =>{
  return {
    changeCartCount : (cartCount)=> dispach({
      type:'CART_COUNT',
      cartCount : cartCount
    }),
    changeWishlistCount : (wishlistCount)=> dispach({
      type:'WISHLIST_COUNT',
      wishlistCount : wishlistCount
    }),
    initialCartData : (cartData)=> dispach({
      type:'CART_DATA',
      cartData : cartData
    }),
  }
}
export default connect(mapStateToProps, mapDispachToProps)(ProductViewEcommerce);

