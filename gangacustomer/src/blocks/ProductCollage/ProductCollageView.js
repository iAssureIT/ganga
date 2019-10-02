import React, { Component } from 'react';
import "./ProductCollageView.css";
import axios                      from 'axios';
import { connect }                from 'react-redux';
import ProductDetailsHomeView from "../../pages/ProductDetailsEcommerce/ProductDetailsHomeView.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';
import $ from 'jquery';
import {ToastsContainer, ToastsStore ,ToastsContainerPosition,message,timer,classNames} from 'react-toasts';

const user_ID = localStorage.getItem("user_ID");
class ProductCollageView extends Component {
	constructor(props){
    super(props);
	   this.state = {
         products:[],
         masterLimitProducts:[],
         categoryDetails:[],
         modalIDNew : []
	   }
  	}  
  	componentDidMount() {
      //console.log('nextProps',this.props);
  		this.setState({
	      products : this.props.products,
        masterLimitProducts : this.props.products
	    });

  	}
    componentWillReceiveProps(nextProps){
	    this.setState({
        products : nextProps.products,
        masterLimitProducts : nextProps.products,
        categoryDetails : nextProps.categoryDetails
	    });
  	}
        getCartData(){
        // const userid = '5d5bfb3154b8276f2a4d22bf';
        const userid = localStorage.getItem('user_ID');
        axios.get("/api/carts/get/list/"+userid)
          .then((response)=>{ 
           console.log('cartProduct=======================', response.data[0].cartItems)
              this.setState({
                cartProduct : response.data[0].cartItems
              });
                this.props.initialCartData(response.data[0].cartItems);
          })
          .catch((error)=>{
                console.log('error', error);
          })
    }

  	addtocart(event){
      if(user_ID){
      event.preventDefault();
      var id = event.target.id;
      axios.get('/api/products/get/one/'+id)
      .then((response)=>{
        var totalForQantity   =   parseInt(1 * response.data.discountedPrice);
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
                "discountedPrice" : parseInt(response.data.discountedPrice),
                "originalPrice" : parseInt(response.data.originalPrice),
                "totalForQantity" : totalForQantity,
                
            }
            axios.post('/api/carts/post', formValues)
            .then((response)=>{
            this.getCartData(); 
             ToastsStore.success(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 50000)
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
        }else{
        ToastsStore.error(<div className="alertback">Need To Sign In, Please Sign In First<a className="pagealerturl" href="/login">Sign In >></a><span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 50000)
    }
   }
    addtowishlist(event){
    event.preventDefault();
    var user_ID = localStorage.getItem('user_ID'); 
    if(user_ID){
      var id = event.currentTarget.id;
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
              if(response.status == 200){
              ToastsStore.success(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 50000)  
              }
              ToastsStore.warning(<div className="alertback">{response.data.messageinfo}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 50000)

            })
            .catch((error)=>{
              console.log('error', error);
            })
      })
      .catch((error)=>{
        console.log('error', error);
      })
    }else{
        ToastsStore.error(<div className="alertback">Need To Sign In, Please Sign In First<a className="pagealerturl" href="/login">Sign In >></a><span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 50000)
    }
    
  
    }
    sortProducts(event){
      event.preventDefault(); 
      var sortBy = event.target.value;
      console.log('sortBy',sortBy);
      //console.log('products1',this.state.products);
      if(sortBy == "alphabeticallyAsc"){
        let field='productName';
        this.setState({
          products: this.state.products.sort((a, b) => (a[field] || "").toString().localeCompare((b[field] || "").toString()))
        });
      }
      if(sortBy == "alphabeticallyDsc"){
        let field='productName';
        this.setState({
          products: this.state.products.sort((a, b) => -(a[field] || "").toString().localeCompare((b[field] || "").toString()))
        });
        
      }
      if(sortBy == "priceAsc"){
        let field='discountedPrice';
        this.setState({
          products: this.state.products.sort((a, b) => a[field] - b[field])
        });
      }
      if(sortBy == "priceDsc"){
        let field='discountedPrice';
        this.setState({
          products: this.state.products.sort((a, b) => b[field] - a[field])
        });
      }
    }
    limitProducts(event){
      event.preventDefault();
      var limit = $(event.target).val();   
      var products = this.state.masterLimitProducts.filter( (array_el, index)=>  {
          console.log('index',index);
          return index < limit ;
      });
      
      this.setState({products : products});
    }
  Closepagealert(event){
    event.preventDefault();
    $(".toast-error").html('');
    $(".toast-success").html('');
    $(".toast-info").html('');
    $(".toast-warning").html('');
    $(".toast-error").removeClass('toast');
    $(".toast-success").removeClass('toast');
    $(".toast-info").removeClass('toast');
    $(".toast-warning").removeClass('toast');

  }
    openModal(event){
      event.preventDefault();
      var modalID = event.target.id;
      this.setState({
        modalIDNew : {productID:modalID}
      })
    }
  render() {
    
    return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="pagealertnone">
          <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding mb20">
          <div className="col-lg-4 col-md-6 col-sm-8 col-xs-8 NoPadding">
            <div className="categoryName">{this.state.categoryDetails && this.state.categoryDetails.category}</div>
          </div>
          <div className="col-lg-offset-2 col-md-offset-2 col-lg-4 col-md-6 col-sm-9 col-xs-9 NoPadding">
            <label className="col-lg-3 col-md-6 col-sm-9 col-xs-9 NoPadding labeldiv">Sort By</label>
            <select className="sortProducts col-lg-8 col-sm-9 col-md-8 col-xs-9 NoPadding" onChange={this.sortProducts.bind(this)}>
              <option  className="hidden" >Relevence</option>
              <option value="alphabeticallyAsc">Name A-Z</option>
              <option value="alphabeticallyDsc">Name Z-A</option>
              <option value="priceAsc">Price Low to High</option>
              <option value="priceDsc">Price High to Low </option>
          </select>
          </div>
         
          <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3 pull-right NoPadding">
            <label className="col-lg-5 col-md-5 col-sm-10 col-xs-10 NoPadding labeldiv">Show</label>
            <select className="limitProducts col-lg-6 col-md-6 col-sm-6 col-xs-6 NoPadding" onChange={this.limitProducts.bind(this)}>
              <option  className="10" >10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
          </select>
          </div>
        </div>
        <div className="row">
        {
            this.state.products && this.state.products.map((value, index) =>{
            
            return (
              <div className="col-lg-4 col-md-4 col-sm-5 col-xs-5 card" key={index}>
                <div className="item-top">
                  <div className="productImg">
                  <a href="#" className="product photo product-item-photo" tabIndex="-1">
                    <img className="productImage" src={value.productImage && value.productImage[0] ? value.productImage[0] : '/images/notavailable.jpg'} />
                  </a>
                  <div className="hoveractions">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">  
                        <ul>
                            <li  data-toggle="modal" className="circle spin" data-target="#productviewmodal"><i id={value._id} onClick={this.openModal.bind(this)} className="fa fa-info viewDetail cursorpointer"></i></li> 
                            <li><a className="circle spin" href="#" onClick={this.addtowishlist.bind(this)} id={value._id}> <i className="fa fa-heart addTOWishList"></i></a></li>
                        </ul>
                    </div>
                  </div>
                  </div>
                  <div className="productDetails">
                    <div className="innerDiv">
                      {<a href={"/productdetails/"+ value._id } className="product-item-link">
                       {
                        value.productName !== undefined ? 
                          (value.productName.length > 25 ? value.productName.substring(0, 25) + '...' : value.productName )
                        : ''}</a>}
                      <div className="product-reviews-summary">
                          <div className="rating-summary">
                              <div className="ratingReview stars ">
                                <label htmlFor="star5"></label>
                                <label htmlFor="star4"></label>
                                <label htmlFor="star3"></label>
                                <label htmlFor="star2"></label>
                                <label htmlFor="star1"></label>
                              </div>
                            <div className="clearfix "></div>
                          </div>
                      </div>
                      <div > 
                        <span className="price"><i className={"fa fa-"+value.currency}>{value.discountedPrice}</i></span> &nbsp;
                        <span className="oldprice"><i className={"fa fa-"+value.currency}>{ value.originalPrice}</i></span> 
                      </div>
                      <div className="actions">
                      <button type="submit" id={value._id} onClick={this.addtocart.bind(this)} title="Add to Cart" className="actiontocart addtocartbtn btn-warning ">
                      {/*<i className="fa fa-shopping-cart"></i>*/}&nbsp;Add to Cart
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              );
            })
        } 
        <div id="productviewmodal" className="modal" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title"></h4>
              </div>
              <div className="modal-body">
                <ProductDetailsHomeView productInfo={this.state.modalIDNew} />
              </div>
              <div className="modal-footer">
              </div>
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
export default connect(mapStateToProps, mapDispachToProps)(ProductCollageView);