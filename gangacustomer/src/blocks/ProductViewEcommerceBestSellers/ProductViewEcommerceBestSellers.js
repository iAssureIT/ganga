import React, { Component }     from 'react';
import $              from 'jquery';
import {Route, withRouter} from 'react-router-dom';
import axios                  from 'axios';
import "./ProductViewEcommerceBestSellers.css";
import _                      from 'underscore';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import Loadable                   from 'react-loadable';
import { connect }                from 'react-redux';
// import ProductDetailsEcommerceView from "../../pages/ProductDetailsEcommerce/ProductDetailsEcommerceView.js";

const OwlCarousel = Loadable({
  loader: () => import('react-owl-carousel'),
  loading() {
    return <div className="col-sm-12 col-xs-12 col-lg-2 col-lg-offset-5 col-md-12 loadingImg"><img src="../images/loadersglms.gif" className="img-responsive" alt="loading"/></div>
  }
});

axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';



class ProductViewEcommerceBestSellers extends Component {
  constructor(props){
    super(props);
      this.state = {
         responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                800:{
                    items:2 
                },
                1000:{
                    items:5 
                }
             },
             newProducts:[],
             Products:[]
        
      };
            this.product();
    } 

    componentDidMount() {
      this.product();
    }  

    product(event){
      axios.get("/api/products/get/one/"+this.props.productID)
      .then((response)=>{
        this.setState({
            newProducts:response.data
        })
          var category_ID = this.state.newProducts.category_ID;
          // console.log("category_ID====================",category_ID);
          axios.get("/api/products/get/list/"+category_ID)
            .then((result)=>{
                      this.setState({
                         Products:result.data
            },(()=>{
              // console.log("Products",this.state.Products);
            })
            )
          })
          .catch((error)=>{
            console.log('error', error);
          })
      })
      .catch((error)=>{
            console.log('error', error);
      })
        
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
            
          // swal(response.data.message);
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
      
      // swal(response.data.message);
      this.props.changeWishlistCount(response.data.wishlistCount);
    })
    .catch((error)=>{
      console.log('error', error);
    })
  }
  render() {
    // console.log('Product', this.props.title,this.props.newProducts);
          const token = localStorage.getItem("user_ID") ;
          // console.log("user_ID:",localStorage.getItem("user_ID"))
    return (

        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productcomponentheading">
                    <div className="producttextclass  col-lg-3">
                      <h3 className="row">
                       <b>{this.props.title}</b>
                      </h3>
                    </div>
                  </div>
                </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
             <div className="tab-content customTabContent">
                <div id="home" className="tab-pane fade in active ecommerceTabContent">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt50">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <OwlCarousel
                        className="owl-theme customnNavButton"
                        margin={0}
                        nav={true}
                        responsive={this.state.responsive} 
                        autoplay={true}
                        autoplayHoverPause={true}
                    >
                    {
                    this.state.Products && this.state.Products.length > 0 ?
                    this.state.Products.map((data, index)=>{
                        // console.log('ididid ',data._id);
                    return (
                      <div className="item col-lg-12 col-md-12 col-sm-12 col-xs-12" key={index}>
                        <div className="">
                          <div className="card">
                            <div className="item-top">
                                <div className="productImg">
                               { <div className="btn-warning discounttag">-93%</div>}
                                  <a className="product photo product-item-photo" tabindex="-1">
                                    <img src={data.productImage[0] ? data.productImage[0] : '/images/notavailable.jpg'}/>
                                  </a>
                                  <div className="hoveractions1">
                                      <ul>
                                        <li  data-toggle="modal" data-target="#productviewmodal"><a className="circle spin" href="#"> <i className="fa fa-info viewDetail"></i></a></li>
                                        <li className="circle spin"> <i id={data._id} onClick={this.addtowishlist.bind(this)} className="fa fa-heart addTOWishList"></i></li>
                                      </ul>
                                  </div>
                                </div>
                              <div className="productDetails">
                                <div className="innerDiv">
                                    <a href={"/productdetails/"+data._id}><p className="product-item-link" title={data.productName}>{data.productName}</p></a>
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
                                      {
                                        data.offered == true ?
                                          <span className="price"><i className="fa fa-inr"></i>&nbsp;{data.offeredPrice}</span>
                                          :
                                          <div>
                                              <span className="oldprice"><i className="fa fa-inr oldprice"></i>&nbsp;{data.offeredPrice}</span> &nbsp;                     
                                              <span className="price"><i className="fa fa-inr"></i>&nbsp;{data.offeredPrice}</span>
                                          </div>
                                      }
                                    </div>
                                    <div className="actions">
                                      <button type="submit" id={data._id} onClick={this.addtocart.bind(this)} title="Add to Cart" className="actiontocart btn-warning fa fa-shopping-cart">
                                        &nbsp;Add to Cart
                                      </button>
                                    </div>
                                </div>
                              </div>
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
          </div>
          <div className="modal " id="productviewmodal" role="dialog">
              <div className="modal-dialog modal-lg dialog">
                <div className="modal-content">  
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title"></h4>
                </div>                 
                  <div className="modal-body">
{/*                    <ProductDetailsEcommerceView productID="5d660c31804d8daec92da7d3"/>
                  */}                  </div>  
                   <div className="modal-footer">                     
                  </div>                  
                </div>
              </div>
            </div>
        </div>
    );
  }
}
const mapStateToProps = (state)=>{
  return {
    
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
    })
  }
}

export default connect(mapStateToProps, mapDispachToProps)(ProductViewEcommerceBestSellers);