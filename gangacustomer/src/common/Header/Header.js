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
              this.setState({
                cartProduct : response.data[0].cartItems
              });
                this.props.initialCartData(response.data[0].cartItems);
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
    console.log('catArray',this.state.catArray);
    if (this.state.catArray.length > 0 && $('.headersearch').val() != '' ) {
      
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
    }
    if (this.state.catArray.length ==0 && $('.headersearch').val() != '' ) {
      var searchstr = $('.headersearch').val()
      var formValues =  {
                      "searchstr" :  searchstr
                    }
      axios.get("/api/products/get/search/"+searchstr)
        .then((response)=>{ 
            this.setState({searchResult : response.data},()=>{
                this.props.searchProduct(formValues,this.state.searchResult);  
            });
        })
        .catch((error)=>{
              console.log('error', error);
        })

      this.props.history.push("/searchProducts");        
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
                                
                                <li className="borderLeft cursorpointer" data-toggle="modal" data-target="#productviewmodal"><a>Customer Care</a></li>
                                <div className="modal " id="productviewmodal" role="dialog">
                                  <div className="modal-dialog modal-lg dialog">
                                    <div className="modal-content"> 
                                      <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                        <h4 className="modal-title">CUSTOMER REVIEWS</h4>
                                      </div> 
                                      <div className="modal-body">
                                          <div id="gotoreview" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop180 topspace">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                 <label className=" ">Name</label>
                                                 <input className="col-lg-12 col-md-12 col-xs-12 col-sm-12 inputbx" type="text"/>
                                                </div>
                                                 <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                 <label className=" ">MobileNumber</label>
                                                  <input className="col-lg-12 col-md-12 col-xs-12 col-sm-12 inputbx" type="text"/>
                                                </div>
                                              </div>
                                              <div className="row topspace15">
                                                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                                  <label className=" ">Review</label>
                                                </div>               
                                              </div>
                                               <div className="row topspace15">
                                                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                                <textarea className="col-lg-12 col-md-12 col-xs-12 col-sm-12" rows="4" cols="50"></textarea>
                                                </div>
                                              </div>
                                              <div className="row topspace15">
                                                <div className="col-lg-offset-8 col-lg-4 col-md-offset-9 col-md-3 col-xs-12 col-sm-12">
                                                  <div className="col-lg-12 text-center btn btn-warning">Submit Review</div>
                                                </div>               
                                              </div>
                                            </div>
                                          </div>
                                        </div>  
                                       <div className="modal-footer">                     
                                      </div>                  
                                    </div>
                                  </div>
                                </div>          
                                {
                                   <li className="borderLeft"><a href={user_ID ? "/shipment-tracking" : "/login"}>Track my order</a></li> 
                                }
                                
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
                                      <li className="col-lg-12 NOpadding"><a href="/profile">Your Profile</a></li>
                                      <li className="col-lg-12 NOpadding"><a href="/wishlist">Your Wishlist</a></li>
                                      <li className="col-lg-12 NOpadding"><a href="/my-orders">Your Orders</a></li>
                                      <li className="col-lg-12 NOpadding" onClick={this.signOut.bind(this)}><a href="/">Sign Out</a></li>
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
                                <a href="#" data-toggle="dropdown"><i className="fa fa-shopping-bag headercarticon" aria-hidden="true"></i><span className="cartvalue">{ user_ID ? this.props.cartCount:0}</span></a>
                                { user_ID ? 
                                  <ul className="dropdown-menu cartdropmenu" role="menu" aria-labelledby="menu1">
                                    <li className="col-lg-12">
                                      <div>
                                        <p className="col-lg-12"><b>{this.props.cartCount}</b> items</p>
                                        <p className="col-lg-12 text-right">Cart Subtotal :</p>

                                        <p className="col-lg-12 text-right"><i className="fa fa-inr"></i>{this.props.cartData && this.props.cartData.length>0 ? this.props.cartData[0].totalForQantity : ""}</p>
                                        <a href={user_ID ? "/cart" : "/login"}><div className="btn cartdropbtn btn-warning col-lg-12" title="Go to Checkout">Go to Checkout</div></a>
                                      </div>
                                    </li>
                                    { 
                                      this.props.cartData && this.props.cartData.length > 0 ?
                                      this.props.cartData.map((data, index)=>{
                                          return(
                                                  <li className="col-lg-12 cartdropheight " key={index}>
                                                    <div className="cartdropborder">
                                                      <div className="col-lg-3 cartdropimg">
                                                        <div className="row">
                                                          <img src={data.productImage[0]}/>
                                                        </div>
                                                      </div>
                                                      <div className="col-lg-7 cartdropimg">
                                                        <div className="row">
                                                          <a href={"/productdetails/"+data.product_ID}><p className="cartdroptext col-lg-12" title={data.productName}>{data.productName}</p></a>
                                                          <div className="cursorpointer col-lg-12">
                                                            <p className="row"><b><i className="fa fa-inr"></i> {data.offeredPrice}</b></p>
                                                          </div>
                                                          <div className="col-lg-12">
                                                            <div className="row">
                                                              <div className="col-lg-6">
                                                                <div className="row">
                                                                  <p className="col-md-6">Qty:</p>
                                                                  <p className="col-md-6 cartmodquntityborder text-center">{data.quantity}</p>
                                                                </div>
                                                              </div>
                                                              <div className="col-lg-6">
                                                                <div className="row">
                                                                  <div className="col-md-1 col-lg-1 pull-right"><div className="row"><a href={"/productdetails/"+data.product_ID}><i className="fa fa-cog cartdropaction" aria-hidden="true"></i></a></div></div>
                                                                  <div className="col-md-1 col-lg-1 pull-right"><div className="row"><i className="fa fa-trash-o cartdropaction" aria-hidden="true" id={data._id} onClick={this.Removefromcart.bind(this)}></i></div></div>
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
                                  :
                                  <ul className="dropdown-menu cartdropmenu" role="menu" aria-labelledby="menu1">
                                    <li className="col-lg-12 text-center">
                                    <h3>Please Sign In First</h3>
                                    </li>
                                      <li className="col-lg-12 ">
                                        <div className="cartdropborder">
                                          <a href="/login"><div className="btn cartdropbtn2 col-lg-12" title="Sign In">Sign In</div></a>
                                        </div>
                                      </li>
                                  </ul>                                
                                }
                                <a href={user_ID ? "/cart" : "/login"} className="cartitemscss">ITEM (S)</a>
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
                          <div className="dropdown-menu megamenudrop" role="menu" aria-labelledby="menu1">
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
    cartData :  state.cartData,
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
    initialCartData : (cartData)=> dispach({
      type:'CART_DATA',
      cartData : cartData 
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