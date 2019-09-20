import React, { Component } from 'react';
import "./ProductCollageView.css";
import axios                      from 'axios';
import { connect }                from 'react-redux';
import swal                       from 'sweetalert';
import ProductDetailsHomeView from "../../pages/ProductDetailsEcommerce/ProductDetailsHomeView.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';
import $ from 'jquery';
const user_ID = localStorage.getItem("user_ID");
class ProductCollageView extends Component {
	constructor(props){
    super(props);
	   this.state = {
         products:[],
         masterLimitProducts:[],
         categoryDetails:[],
         modalIDNew : ""
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
  		//console.log('nextProps11',nextProps.products); 
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
            this.getCartData();  
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
        }else{
      swal({
          title: "Need to Sign In",
          text: "Please Sign In First",
          icon: "warning",
          buttons: ["No Thanks", "Sign In"],
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            window.location = "/login";
          } 
      });
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
              swal(response.data.message)
              
            })
            .catch((error)=>{
              console.log('error', error);
            })
      })
      .catch((error)=>{
        console.log('error', error);
      })
    }else{
      swal({
          title: "Need to Sign In",
          text: "Please Sign In First",
          icon: "warning",
          buttons: ["No Thanks", "Sign In"],
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            window.location = "/login";
          } 
      });
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
        let field='offeredPrice';
        this.setState({
          products: this.state.products.sort((a, b) => a[field] - b[field])
        });
      }
      if(sortBy == "priceDsc"){
        let field='offeredPrice';
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
    openModal(event){
      event.preventDefault();
      var modalID = event.target.id;
      this.setState({
        modalIDNew : modalID
      })
    }
  render() {
  	//console.log('products',this.state.product);
    return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding mb20">
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 NoPadding">
            <div className="categoryName">{this.state.categoryDetails && this.state.categoryDetails.category}</div>
          </div>
          <div className="col-lg-offset-2 col-md-offset-2 col-lg-4 col-md-4 col-sm-4 col-xs-4 NoPadding">
            <label className="col-lg-3 col-md-3 col-sm-3 col-xs-3 NoPadding labeldiv">Sort By</label>
            <select className="sortProducts col-lg-8 col-sm-8 col-md-8 col-xs-8 NoPadding" onChange={this.sortProducts.bind(this)}>
              <option  className="hidden" >Relevence</option>
              <option value="alphabeticallyAsc">Name A-Z</option>
              <option value="alphabeticallyDsc">Name Z-A</option>
              <option value="priceAsc">Price Low to High</option>
              <option value="priceDsc">Price High to Low </option>
          </select>
          </div>
         
          <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4 pull-right NoPadding">
            <label className="col-lg-5 col-md-5 col-sm-5 col-xs-5 NoPadding labeldiv">Show</label>
            <select className="limitProducts col-lg-6 col-md-6 col-sm-6 col-xs-6 NoPadding" onChange={this.limitProducts.bind(this)}>
              <option  className="10" >10</option>
              <option value="1">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
          </select>
          </div>
        </div>
        <div className="row">
        {
            this.state.products && this.state.products.map((value, index) =>{
             
            return (
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 card" key={index}>
                <div className="item-top">
                  <div className="productImg">
                  <a href="#" className="product photo product-item-photo" tabIndex="-1">
                    <img className="productImage" src={value.productImage && value.productImage[0] ? value.productImage[0] : '/images/notavailable.jpg'} />
                  </a>
                  <div className="hoveractions">
                    <div className="col-lg-12">  
                        <ul>
                            <li  data-toggle="modal" className="circle spin" data-target="#productviewmodal"><i id={value._id} onClick={this.openModal.bind(this)} className="fa fa-info viewDetail cursorpointer"></i></li>
                            
                            <li><a className="circle spin" href="#" onClick={this.addtowishlist.bind(this)} id={value._id}> <i className="fa fa-heart addTOWishList"></i></a></li>
                        </ul>
                    </div>
                  </div>
                  </div>
                  <div className="productDetails">

                    <div className="innerDiv">
                      <a href={"/productdetails/"+ value._id } className="product-item-link">
                       {
                        value.productName !== undefined ? 
                          (value.productName.length > 25 ? value.productName.substring(0, 25) + '...' : value.productName )
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
                        <span className="price"><i className={"fa fa-"+value.currency}>{value.offeredPrice}</i></span> &nbsp;
                        <span className="oldprice"><i className={"fa fa-"+value.currency}>{ value.actualPrice}</i></span> 
                      </div>
                      <div className="actions">
                        <button type="submit" title="Add to Cart" className="actiontocart primary" onClick={this.addtocart.bind(this)} id={value._id}>
                          <span onClick={this.addtocart.bind(this)} id={value._id}><i className="fa fa-shopping-cart" ></i>&nbsp;Add to Cart</span>
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
                <ProductDetailsHomeView productID={this.state.modalIDNew} />
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