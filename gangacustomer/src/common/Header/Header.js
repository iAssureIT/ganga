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

class Header extends Component {
constructor(props){
    super(props);
    this.state = {
      options:[], 
      catArray:[],
      searchstr:'',
      searchResult:[]

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
componentDidMount(){
  this.getCartCount();
  this.getWishlistCount();
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
                 this.setState({searchResult : response.data})
                })
                .catch((error)=>{
                    console.log('error', error);
                }) 

        this.props.history.push("/searchProducts/"+searchstr+'/'+this.state.catArray);
        //window.location.reload();

    }
    
}
  signOut(event){
    event.preventDefault();
    localStorage.setItem("user_ID", "");
    this.props.history.push('/');
  }
  getCartCount(){
    const userid = localStorage.getItem('admin_ID');
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
    const userid = localStorage.getItem('admin_ID');
    axios.get("/api/wishlist/get/wishlistcount/"+userid)
        .then((response)=>{ 
          this.props.initialWishlist(response.data);
        })
        .catch((error)=>{
              console.log('error', error);
        })
  }
  render() { 
    const user_ID = localStorage.getItem("user_ID");
    // console.log('user', user_ID);
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
                                <li className="borderLeft"><a href="/ShipmentTracking">Track my order</a></li>
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
                                      <li className="col-lg-12"><a href="/MyOrders">Your Orders</a></li>
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
                                      <ReactMultiSelectCheckboxes placeholderButtonLabel="Shop by category" options={this.state.options} onChange={this.handleChange.bind(this)}/>
                                  </div>   
                                </div>   
                                <div className="col-lg-7">
                                  <div className="row">
                                      <input type="text" className="col-lg-12 headersearch" name="x" placeholder="What are you looking for...."/>
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
                            <div className="row">
                            <a href="/"><i className="fa fa-shopping-bag headercarticon" aria-hidden="true"></i><span className="cartvalue">{this.props.cartCount}</span></a>
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
                      <ul>
                        <li>njn</li>
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
    wishlistCount : state.wishlistCount
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
    })
  }
}
export default connect(mapStateToProps, mapDispachToProps)(withRouter(Header));