import React, {Component} from 'react';
import axios              from 'axios';
import $                  from 'jquery';
import { connect }        from 'react-redux';
import swal               from 'sweetalert';
import SmallBanner        from '../../blocks/SmallBanner/SmallBanner.js';
import './Wishlist.css';
import Sidebar from '../../common/Sidebar/Sidebar.js';

class Wishlist extends Component {
	constructor(props) {
        super(props);
        this.state={
            bannerData : {
                title : "MY WISHLIST",
                breadcrumb : 'My Shopping Cart',
                backgroungImage : '/images/wishlist.png',
            },
            wishlist : [],
            products : [],
            abc :[],
            quantity : 1
        }
        window.scrollTo(0, 0);
    }
    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    componentDidMount(){
        this.getData();   
     }
     getProduct(product_ID){
      axios.get('/api/products/get/one/'+product_ID)
        .then((response)=>{
          console.log('response', response);
        })
        .catch((error)=>{
          console.log('error', error);
        })
     }

    getData(){
        var user_ID = localStorage.getItem('user_ID');
        console.log('user_ID', user_ID);

        axios.get('/api/wishlist/get/userwishlist/'+user_ID)
        .then((response)=>{
          console.log('userwishlist', response.data)
          response.data.map((a, i)=>{
            console.log('a', a.product_ID);
            axios.get('/api/products/get/one/'+a.product_ID)
            .then((res)=>{
              console.log('response getData', res.data);
              var products = this.state.products;
              products.push({
                "productName"       : res.data.productName,
                "actualPrice"       : res.data.actualPrice,
                "availableQuantity" : res.data.availableQuantity,
                "bestSeller"        : res.data.bestSeller,
                "brand"             : res.data.brand,
                "category"          : res.data.category,
                "currency"          : res.data.currency,
                "offeredPrice"      : res.data.offeredPrice,
                "productCode"       : res.data.productCode,
                "productImage"      : res.data.productImage,
                "product_ID"        : res.data._id,
                "wishlist_ID"       : a._id
              });
              this.setState({
                products : products
              })
            })
            .catch((error)=>{
              console.log('error', error);
            })
          })
        })
        .catch((error)=>{
          console.log('error', error);
        })

    }
  addtocart(event){
    event.preventDefault();
    var id = event.target.id;
    var wishlist_ID = event.target.getAttribute('wishid');
     console.log("iwishdidid", wishlist_ID);
     console.log("ididid", id);
    axios.get('/api/products/get/one/'+id)
    .then((response)=>{
      var totalForQantity   =   parseInt(this.state.quantity * response.data.offeredPrice);
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
              "quantity" : this.state.quantity,
              "offeredPrice" : parseInt(response.data.offeredPrice),
              "actualPrice" : parseInt(response.data.actualPrice),
              "totalForQantity" : totalForQantity,
              
          }
          axios.post('/api/carts/post', formValues)
          .then((response)=>{
            console.log('response', response.data);
            this.props.changeCartCount(response.data.cartCount);
            swal(response.data.message)
            axios.delete('/api/wishlist/delete/'+wishlist_ID)
            .then((response)=>{
              this.setState({
                products : []
              })
              this.getData();
              // swal(response.data.message);
              
            })
            .catch((error)=>{
              console.log('error', error);
            })  

            })
          .catch((error)=>{
            console.log('error', error);
          })
    })
    .catch((error)=>{
      console.log('error', error);
    })
  }

  removefromwishlist(event){
    event.preventDefault();
    var id = event.target.id;
      console.log("ididid", id);
          axios.delete('/api/wishlist/delete/'+id)
          .then((response)=>{
            // console.log('response', response);
            this.setState({
              products : []
            })
            this.getData();
            swal(response.data.message);
            
            
          })
          .catch((error)=>{
            console.log('error', error);
          })  
  }
    
    render() {  
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                <SmallBanner bannerData={this.state.bannerData}/>  
                
                <div className="container">
                    <br/>
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 NOpadding">
                        <Sidebar />
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8 NOpadding">
                        {
                            this.state.products && this.state.products.length >0 ?
                            this.state.products.map((data,index)=>{
                                console.log('data', data);
                                return(
                                    <div className="wishlist col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 colageimg">
                                            <img className="img img-responsive" src={data.productImage[0]} />
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 wishProductDetails">
                                            <h5 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding wishProductName">{data.productName}</h5>
                                            <p className="fa fa-inr col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding wishProductPrize mb25"> {data.offeredPrice}</p>
                                            <input className="col-lg-1 col-md-1 col-sm-2 col-xs-2 wishlistInput" value={this.state.quantity} name="quantity" onChange={this.handleChange.bind(this)}/>
                                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                <button className="btn col-lg-4 col-md-4 col-sm-10 col-xs-10 wishAddtoCart" wishid={data.wishlist_ID} id={data.product_ID} onClick={this.addtocart.bind(this)}>ADD TO CART</button>
                                                <span id={data.wishlist_ID} onClick={this.removefromwishlist.bind(this)} className="fa fa-trash col-lg-4 col-md-4 col-sm-10 col-xs-10 wishRemove"> &nbsp;Remove</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                            :
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="wishlistNoProduct col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
                                    <i className="fa fa-exclamation-triangle"></i>&nbsp;  You have no items in your wish list.
                                </div>
                                <a href="/" className="pull-right mt15 wishBack">Back</a>
                            </div>
                        }
                        
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
  
  export default connect(mapStateToProps, mapDispachToProps)(Wishlist);