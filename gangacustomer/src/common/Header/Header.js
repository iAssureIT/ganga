import React, {Component} from 'react';
// import $                  from 'jquery';
import './Header.css';

import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/dropdown.js';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Megamenu         from '../Megamenu/Megamenu.js';
import axios                    from 'axios';
import {Route, withRouter} from 'react-router-dom';
import { connect }        from 'react-redux';
import swal from 'sweetalert';

class Header extends Component {
constructor(props){
    super(props);
    this.state = {
      options:[], 
      catArray:[],
      searchstr:'',
      searchCriteria:[],
      searchResult:[],
      hotProducts:[],
      categoryDetails: [],
      productCartData:[],
      cartProduct:[]


    }
    this.getCartData();   

}
componentWillMount() {
      $(document).ready(function(e){
      
      $('.search-panel li a').on('click', function(e){
        var sp = $(this).closest('.search-panel');
        var to = $(this).html();
        var text = $(this).html();
        sp.data('search', to);
        sp.find('button span.search_by').html(text);
      });
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
          })
          .catch((error)=>{
                console.log('error', error);
          })
    }

componentDidMount(){
  this.getCartCount();
  this.getWishlistCount();
  this.getHotProduct();
  this.getCartData();   
  const options = [];
  axios.get("/api/category/get/list")
            .then((response)=>{

              response.data.map((data,index)=>{
                  options.push({label: data.category, value: data._id}); 
              });  
              
              
              this.setState({
                  options : options
              })
            })
            .catch((error)=>{
                console.log('error', error);
            })  
}
componentWillReceiveProps(nextProps){
      var categoryArray = [];
      var categoryDetails = [];
      this.setState({
        searchCriteria  : nextProps.searchCriteria
      },()=>{
        $('.headersearch').val(this.state.searchCriteria.searchstr)

        {
          this.state.searchCriteria.catArray && this.state.searchCriteria.catArray.map((data,index)=>{
            $('option[value="'+data+'"]').attr('selected', 'selected');
          }); 
        }
      })

      this.setState({
        searchResult  : nextProps.searchResult
      },()=>{
        {
          categoryArray = this.unique(this.state.searchResult,'category_ID');
          console.log('categoryArray',categoryArray);
          categoryArray.map((data,index)=>{
            this.getCategoryDetails(data, categoryDetails); 
          });
          

        }
      })
            
      
}

unique(arr, prop) {
    return arr.map(function(e) { return e[prop]; }).filter(function(e,i,a){
        return i === a.indexOf(e);
    });
}


getCategoryDetails(category_ID, categoryDetails){
    axios.get("/api/category/get/one/"+category_ID)
        .then((response)=>{ 
            console.log('response',response.data);
            categoryDetails.push(response.data);

            this.setState({categoryDetails: categoryDetails}, () =>{
               this.props.getCategoryDetails(categoryDetails); 
            });
            
            
        })
        .catch((error)=>{
              console.log('error', error);
        })

        
}
handleChange(event){
  var catArray = []
  event.map((data,index)=>{
    catArray.push(data.label);
  })

  this.setState({catArray : catArray});
}

searchProducts(){

    if ($('.headersearch').val() != '' ) {

        var searchstr = $('.headersearch').val()
        
        var formValues =  {
                        "searchstr" :  searchstr,  
                        "catArray"  :  this.state.catArray
                      }
        axios.post("/api/products/post/searchINCategory",formValues)
                .then((response)=>{
                  this.setState({searchResult : response.data},()=>{
                    this.props.searchProduct(formValues,this.state.searchResult);  
                  });
                })
                .catch((error)=>{
                    console.log('error', error);
                }) 

        this.props.history.push("/searchProducts");
        //window.location.reload();
    }
    
}
  signOut(event){
    event.preventDefault();
    localStorage.setItem("user_ID", "");
    this.props.history.push('/');
  }
  getCartCount(){
    const userid = localStorage.getItem('user_ID');
    axios.get("/api/carts/get/count/"+userid)
        .then((response)=>{ 
            this.setState({
                count : response.data
            })
            this.props.initialCart(response.data);
        })
        .catch((error)=>{
              console.log('error', error);
        }) 
    
  }
  getWishlistCount(){
    const userid = localStorage.getItem('user_ID');
    axios.get("/api/wishlist/get/wishlistcount/"+userid)
        .then((response)=>{ 
          this.props.initialWishlist(response.data);
        })
        .catch((error)=>{
              console.log('error', error);
        })
  }
 Removefromcart(event){
        event.preventDefault();
        const userid = localStorage.getItem('user_ID');
        // console.log("userid",userid);
        const cartitemid = event.target.getAttribute('id');
        // console.log("cartitemid",cartitemid);

        const formValues = { 
              "user_ID"    : userid,
              "cartItem_ID" : cartitemid,
          }

        axios.patch("/api/carts/remove" ,formValues)
          .then((response)=>{
            console.log('removed');
            swal(response.data.message)           
             .then((obj)=>{
                  window.location.reload();
             });

            this.getCartData();   
            this.getCompanyDetails();

          })
          .catch((error)=>{
                console.log('error', error);
          })


    }
  getHotProduct(){
    axios.get("/api/products/get/hotproduct")
    .then((response)=>{ 
      console.log('hotProducts', response.data);
      this.setState({
        hotProducts : response.data
      })
    })
    .catch((error)=>{
          console.log('error', error);
    })
  }
  render() { 
    const user_ID = localStorage.getItem("user_ID");
    return (
      <div className="homecontentwrapper">
          <header className="col-lg-12 headerflow"> 
            <div className="row"> 
                  <div className="col-lg-12 header1wrapper">
                    <div className="row">
                      <div className="col-lg-10 col-lg-offset-1">
                        <div className="row">
                          <div className="col-lg-6 header1list1">
                            <div className="row">
                              <ul>
                                <li><a href="/">Get the app</a></li>
                                
                                <li className="borderLeft"><a href="/">Customer Care</a></li>
                                <li className="borderLeft"><a href="/shipment-tracking">Track my order</a></li>
                              </ul>  
                            </div>
                          </div>
                          <div className="col-lg-6 header1list2">
                            <div className="row">
                              <ul>
                                <li className="borderLeft"><a href="/signup"><i className="fa fa-sign-in"></i> &nbsp;Join Free</a></li>
                                {
                                  user_ID? 
                                  <li><a href="/"  data-toggle="dropdown"><i className="fa fa-user" aria-hidden="true"></i> &nbsp;My Account <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                    <ul className="dropdown-menu signinmenuul">
                                      <li className="col-lg-12"><a href="/profile">Your Profile</a></li>
                                      <li className="col-lg-12"><a href="/wishlist">Your Wishlist</a></li>
                                      <li className="col-lg-12"><a href="/my-orders">Your Orders</a></li>
                                      <li className="col-lg-12" onClick={this.signOut.bind(this)}><a href="/">Sign Out</a></li>
                                    </ul> 
                                  </li>
                                  :
                                  <li><a href="/login"><i className="fa fa-pencil"></i> Sign In <i className="fa fa-angle-down"></i></a></li>
                                }
                                </ul>  
                            </div>
                          </div>
                        </div>
                      </div> 
                    </div> 
                  </div> 
                  <div className="col-lg-10 col-lg-offset-1">
                   <div className="row">
                      <div className="col-lg-3 headerlogoimg headerpaddingtop text-center">
                        <div className="row">
                          <div className="col-lg-8">
                            <div className="row">
                              <a href="/"><img src="/images/logo1.png"/></a>
                            </div>  
                          </div>  
                        </div>  
                      </div>  
                      <div className="col-lg-7 col-md-7 headerpaddingtop">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-3">
                                  <div className="row">
                                      <ReactMultiSelectCheckboxes placeholderButtonLabel="Shop by category" margin-top={"40px"} options={this.state.options} onChange={this.handleChange.bind(this)}/>
                                  </div>   
                                </div>   
                                <div className="col-lg-7">
                                  <div className="row">
                                      <input type="text" className="col-lg-12 headersearch" name="x" placeholder="What are you looking for...." />
                                  </div>   
                                </div>   
                                <div className="col-lg-2">
                                  <div className="row">
                                      <button className="col-lg-8 btn searchbutton" type="button" onClick={this.searchProducts.bind(this)} ><i className="fa fa-search" aria-hidden="true"></i></button>
                                  </div>   
                                </div>   
                            </div> 
                          </div> 
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2 headerpaddingtop text-center">
                          <div className="col-lg-12 headercart">
                            <div className="row dropdown">
                                <a href="/" data-toggle="dropdown"><i className="fa fa-shopping-bag headercarticon" aria-hidden="true"></i><span className="cartvalue">{this.props.cartCount}</span></a>
                                  <ul className="dropdown-menu cartdropmenu" role="menu" aria-labelledby="menu1">
                                    <li className="col-lg-12">
                                      <div>
                                        <p className="col-lg-12"><b>{this.props.cartCount}</b> items</p>
                                        <p className="col-lg-12 text-right">Cart Subtotal :</p>
                                        <p className="col-lg-12 text-right"><i className="fa fa-inr"></i>{this.state.cartProduct && this.state.cartProduct.length>0 ? this.state.cartProduct[0].totalForQantity : ""}</p>
                                        <a href="/cart"><div className="btn cartdropbtn btn-warning col-lg-12" title="Go to Checkout">Go to Checkout</div></a>
                                      </div>
                                    </li>
                                  {
                                      this.state.cartProduct && this.state.cartProduct.length > 0?
                                      this.state.cartProduct.map((data, index)=>{
                                          return(
                                                  <li className="col-lg-12 cartdropheight ">
                                                    <div className="cartdropborder">
                                                      <div className="col-lg-3 cartdropimg">
                                                        <div className="row">
                                                          <img src={data.productImage[0]}/>
                                                        </div>
                                                      </div>
                                                      <div className="col-lg-7 cartdropimg">
                                                        <div className="row">
                                                          <a href={"/productdetails/"+data.product_ID}><p className="cartdroptext col-lg-12" title={data.productName}>{data.productName}</p></a>
                                                          <p className="cursorpointer col-lg-12">
                                                            <div className="row"><b><i className="fa fa-inr"></i> {data.offeredPrice}</b></div>
                                                          </p>
                                                          <div className="col-lg-12">
                                                            <div className="row">
                                                              <div className="col-lg-6">
                                                                <div className="row">
                                                                  <p className="col-md-6">Qty:</p>
                                                                  <div className="col-md-6 cartmodquntityborder text-center">{data.quantity}</div>
                                                                </div>
                                                              </div>
                                                              <div className="col-lg-6">
                                                                <div className="row">
                                                                  <p className="col-md-1 col-lg-1 pull-right"><div className="row"><i className="fa fa-cog cartdropaction" aria-hidden="true"></i></div></p>
                                                                  <div className="col-md-1 col-lg-1 pull-right"><div className="row"><a href={"/productdetails/"+data.product_ID}><i className="fa fa-trash-o cartdropaction" aria-hidden="true" id={data._id} onClick={this.Removefromcart.bind(this)}></i></a></div></div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </li>
                                                  );
                                        })
                                        :
                                        <div>
                                            <div><p className="mt15 mb15 col-lg-12 col-md-12 col-sm-12 col-xs-12">You have no items in your shopping cart.</p></div>
                                        </div>
                                    }
                                    <li className="col-lg-12 ">
                                      <div className="cartdropborder">
                                        <a href="/cart"><div className="btn cartdropbtn2 col-lg-12" title="VIEW AND EDIT CART">VIEW AND EDIT CART</div></a>
                                      </div>
                                    </li>
                                  </ul>
                                <a href="/cart" className="cartitemscss">ITEM (S)</a>
                            </div> 
                          </div> 
                      </div>
                </div>
              </div>
            </div>
          </header>
          <nav>
            <div className="col-lg-12 catogeryvaluebg">
              <div className="row">
                <div className="col-lg-10 col-lg-offset-1">
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="row">
                        <div className="dropdown">
                          <button className="dropdown-toggle" id="menu1" type="button" data-toggle="dropdown">
                          <i className="fa fa-bars megabars col-lg-3" aria-hidden="true"></i>
                            &nbsp;&nbsp;ALL CATEGORY</button>
                          <div className="dropdown-menu" role="menu" aria-labelledby="menu1">
                             <Megamenu />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-9">
                      <ul className="box-static-link">
                        {this.state.hotProducts && this.state.hotProducts.length > 0?
                          this.state.hotProducts.map((data, index)=>{
                            if(index < 6){
                              return(
                                <li key={index}>
                                  <span>HOT</span>
                                  <a href={"/ProductDetails/"+data._id}>{data.productName}</a>
                                </li>
                              );
                            }
                          })
                          :
                          null
                        }
                      </ul>
                    </div>
                  </div>
                </div>
                </div>
              </div>
          </nav>
    </div>
    );  
  }
}
const mapStateToProps = (state)=>{
  return {
    cartCount :  state.cartCount,
    wishlistCount : state.wishlistCount,
    searchResult : state.searchResult,
    searchCriteria : state.searchCriteria
  }
}
const mapDispachToProps = (dispach) =>{
  return {
    initialCart : (cartCount)=> dispach({
      type:'CART_COUNT_INITIALLY',
      cartCount : cartCount
    }),
    initialWishlist : (wishlistCount)=> dispach({
      type:'WISHLIST_COUNT_INITIALLY',
      wishlistCount : wishlistCount
    }),
    searchProduct : (searchCriteria, searchResult)=> dispach({
      type:'SEARCH_PRODUCT',
      searchCriteria : searchCriteria,
      searchResult : searchResult
    }),
    getCategoryDetails : (categoryDetails)=> dispach({
      type:'GET_CATEGORY_DETAILS',
      categoryDetails : categoryDetails
    })
  }
}
export default connect(mapStateToProps, mapDispachToProps)(withRouter(Header));