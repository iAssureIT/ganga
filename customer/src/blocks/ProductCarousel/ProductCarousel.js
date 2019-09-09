import React,{Component} from 'react';
import $ 				 from 'jquery';
import OwlCarousel 		 from 'react-owl-carousel';
import Moment            from 'react-moment';
import swal from 'sweetalert';


import './ProductCarousel.css'; 
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios                  		from 'axios';

axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';
export default class ProductCarousel extends Component {
	constructor(props){
		super(props);
		this.state = {
			propertiesData:[],
			dupliImage:[],

		}
	}
	componentDidMount(){
		const propertiesDataArray = [
			{"image":"","name":"Dark Fantacy Biscuits","price":"$2.00"},
			{"image":"","name":"Dark Fantacy Biscuits","price":"$2.00"},
			{"image":"","name":"Dark Fantacy Biscuits","price":"$2.00"},
			{"image":"","name":"Dark Fantacy Biscuits","price":"$2.00"},
			{"image":"","name":"Dark Fantacy Biscuits","price":"$2.00"},
			
		];

		this.setState({
			propertiesData: propertiesDataArray,
		},()=>{});

		// var productType = 'featured';
  // 		axios.get("api/products/get/listbytype/"+productType)
  //           .then((response)=>{

  //             this.setState({
  //                 products : response.data
  //             })
  //           })
  //           .catch((error)=>{
  //               console.log('error', error);
  //           })


		$.getScript('/js/carousel.js',function(){});
	}
		 addtocart(event){
    event.preventDefault();
    var id = event.target.id;
     console.log("ididid", id);
    axios.get('/api/products/get/one/'+id)
    .then((response)=>{
      var totalForQantity   =   parseInt(1 * response.data.offeredPrice);
          const userid = localStorage.getItem('admin_ID');
          // console.log("userid",response.data);
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
    var id = event.target.id;
     console.log("ididid", id);
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
  }
	render() {		
  	  	  const token = localStorage.getItem("admin_ID") ;

		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ecommerceProductCarousel mt20">
						<div className="row">
						
						  <ul className="nav nav-pills customPillsGrocery col-lg-offset-5">
						    <li className="active"><a data-toggle="pill" href="#home">Featured Products</a></li>
						  </ul> 
						   
						 <div className="tab-content customTabContent">
						    <div id="home" className="tab-pane fade in active ecommerceTabContent">
									<div className="col-lg-12 mt30">
										
										<div id="owl-demo" className="owl-carousel owl-theme " >
										        

										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

											<OwlCarousel
											    className="owl-theme customnNavButton"
											    margin={5}
											    items={4}
											    nav
											>

											{
											this.props.products && this.props.products.length > 0 ?
											this.props.products.map((data, index)=>{
												return(
												      <div className="item " key={index}>
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogs">
                                <div className="">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 flip-box ecommerceProduct ">
                                  {
                                    data.offered == true ?
                                    <div className="row">
                                    <div className="offerDetailsGrocery col-lg-6">Offer Price </div><div className="offerDetailsGrocery col-lg-6 "><span className="pull-right"><i className="fa fa-inr"></i>&nbsp;{data.offeredPrice}</span></div>
                                    </div>
                                    :
                                    null
                                  }
                                    <div className=" flip-box-inner">
                                      <img src={data.productImage[0]} className="flip-box-front img-responsive" alt="blog1"/>       
                                      <img src={data.productImage[1] ? data.productImage[1] : data.productImage[0]} className="flip-box-back img-responsive " alt="blog1"/>
                                    </div>
                                    <div id="" className="col-lg-6 col-sm-12 col-xs-12 mt40 row">
                                                  <fieldset className="ratingReview stars ">
                                                      <input type="radio" id="star5" name="ratingReview" value="5" /><label htmlFor="star5"></label>
                                                      <input type="radio" id="star4" name="ratingReview" value="4" /><label htmlFor="star4"></label>
                                                      <input type="radio" id="star3" name="ratingReview" value="3" /><label htmlFor="star3"></label>
                                                      <input type="radio" id="star2" name="ratingReview" value="2" /><label htmlFor="star2"></label>
                                                      <input type="radio" id="star1" name="ratingReview" value="1"/><label htmlFor="star1"></label>
                                                  </fieldset>
                                                  <div className="clearfix "></div>
                                              </div>
                                                <label className="pull-right priceDivProductGrocery mt40"><i className={"fa fa-"+data.currency}> </i>&nbsp;{data.actualPrice}</label><br/>
                                      <span className="col-lg-12 row nameOfProduct">{data.productName}</span>
                                      {
                                        token ?

                                            <div className="optionDiv col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                      <div  data-toggle="tooltip" title="Add to cart" className="col-lg-3 col-md-3 col-sm-3 col-xs-3  " >
                                                       
                                                        {
                                                                      token ?
                                                                      <div className={data.webCategory == "Grocery fa fa-shopping-cart" ? "iconContainerGrocery fa fa-shopping-cart" : "iconContainerEcommerce fa fa-shopping-cart"} onClick={this.addtocart.bind(this)} id={data._id}></div>
                                                           :
                                                                        <a href="/login"className="iconContainerEcommerce"><i className="fa fa-shopping-cart"></i></a>
                                                                    }
                                                        </div>
                                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3" data-toggle="tooltip" title="Add to wishlist">
                                                         {
                                                                      token ?
                                                                        <div className={data.webCategory == "Grocery" ? "iconContainerGrocery fa fa-heart" : "iconContainerEcommerce  fa fa-heart"} onClick={this.addtowishlist.bind(this)} id={data._id} ></div>
                                                                        :
                                                                        <a href="/login"className={data.webCategory == "Grocery" ? "iconContainerGrocery" : "iconContainerEcommerce  "}><i className="fa fa-heart "></i></a>

                                                                    }
                                                                        

                                                      </div>
                                                      <div  data-toggle="tooltip" title="View product">
                                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3  mr0 ">
                                                        <a href={"/ProductDetailsEcommerce/"+data._id}><div className={data.webCategory == "Grocery" ? "iconContainerGrocery ht20other " : "iconContainerEcommerce ht20"}><i className="fa fa-eye "></i></div></a>
                                                      </div>
                                                      </div>
                                            </div>
                                              :
                                               <div className="optionDiv col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                <div  data-toggle="tooltip" title="Add to cart" className="col-lg-3 col-md-3 col-sm-3 col-xs-3  " >
                                                 
                                                  {
                                                                token ?
                                                                <div className={data.webCategory == "Grocery fa fa-shopping-cart" ? "iconContainerGrocery fa fa-shopping-cart" : "iconContainerEcommerce fa fa-shopping-cart"} onClick={this.addtocart.bind(this)} id={data._id}></div>
                                                     :
                                                                  <a href="/login"className="iconContainerEcommerce"><i className="fa fa-shopping-cart"></i></a>
                                                              }
                                                  </div>
                                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3" data-toggle="tooltip" title="Add to wishlist">
                                                   {
                                                                token ?
                                                                  <div className={data.webCategory == "Grocery" ? "iconContainerGrocery fa fa-heart" : "iconContainerEcommerce fa fa-heart"} onClick={this.addtowishlist.bind(this)} id={data._id} ></div>
                                                                  :
                                                                  <a href="/login"className={data.webCategory == "Grocery" ? "iconContainerGrocery" : "iconContainerEcommerce"}><i className="fa fa-heart "></i></a>

                                                              }
                                                                  

                                                </div>
                                                 <div  data-toggle="tooltip" title="View product">
                                             <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 mr0 ">
                                                        {
                                                                  token ?
                                                          <a href={"/ProductDetailsEcommerce/"+data._id}> <div className={data.webCategory == "Grocery" ? "iconContainerGrocery  col-lg-12" : "iconContainerEcommerce ht20 col-lg-12 "}><i className="fa fa-eye "></i></div></a>
                                                                    :
                                                          <a href={"/ProductDetailsEcommerce/"+data._id}> <span className={data.webCategory == "Grocery" ? "iconContainerGrocery " : "iconContainerEcommerce"}><i className="fa fa-eye "></i></span></a>

                                                              }
                                                      </div>                                                
                                                </div>
                                              </div>
                                          }

                                  </div>
                          
                                </div>
                    </div>
													</div>
												);
												})
												: ''										   
											}
										    
										</OwlCarousel>
									</div>
										
										</div>
									</div>
								</div>
						 
						    <div id="menu2" className="tab-pane fade">
						    	
						    </div>
						</div>
					</div>
				</div>

		);
	}
}
