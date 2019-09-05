import React, { Component } from 'react';
import $         from 'jquery';
import axios                from 'axios';
import { connect }        from 'react-redux';
import "./EcommerceHeader.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/js/modal.js';
import {Route, withRouter} from 'react-router-dom';

axios.defaults.baseURL = 'http://gangaexpressapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';


class EcommerceHeader extends Component {

constructor(props) {
        super(props);
            this.state = {
                "searchVal" :"",
                "userinfo" : {},
                "Categories" : [],
                "products" :[],
                "urlParameter" : '',
                "urlSecondParameter":'',
                "isGrocery":0,
                "limit" : 5,
                "orderData":[],
                "wishlistcount":""
            };
 
       
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }

  componentDidMount() {
    var url = window.location.href;
    var lastSegment = url.split('/').pop() || url.split('/').pop();  // handle potential trailing slash

    var result= url.split('/');
    var urlSecondParameter = result[result.length-2];
    this.setState({urlParameter : lastSegment, urlSecondParameter:urlSecondParameter});

    var acc = document.getElementsByClassName("colorWhite");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");

        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });

       axios.get("/api/category/get/list")
        .then((response)=>{ 
            var data = [];
            response.data.filter((n,i)=>{
                
                if(n.webCategory !== undefined){

                  if (this.state.urlParameter == 'Grocery' || this.state.urlSecondParameter == 'Grocery') {
                    this.setState({isGrocery:1})
                    if (n.webCategory=="Grocery") {
                      data.push(n);
                    } 
                  }
                  else {
                    
                     $('#grocerylink').show();
                    //$('.shopByCatEH').show();
                   // document.getElementsByClassName('.headerMenuEH').style["margin-left"] = "30px !important";
                    
                    if (n.webCategory=="Main-Site") {
                      data.push(n);
                    }
                  }
                  
                }
              });
              this.setState({
                  categories : data
              })
            
        })
        .catch((error)=>{
              console.log('error', error);
        })

    }

        window.onscroll = function() {myFunction()};
        var header = document.getElementById("myHeader");
    
       var sticky = header.offsetTop;

      function myFunction() {
        if (window.pageYOffset > sticky) {
          header.classList.add("sticky");
        } else {
          header.classList.remove("sticky");
        }
      }

      // var modal = document.getElementById('MyOrdersModal');
      // var span = document.getElementsByClassName("myordermodalclose")[0];
      //     span.onclick = function() {
      //       modal.style.display = "none";  
      //     }

      // var modal1 = document.getElementById('ShippingTrackingModal');
      // var span1 = document.getElementsByClassName("shipmentmodalclose")[0];
      //     span1.onclick = function() {
      //       modal1.style.display = "none"; 
      //     }

      // var modal2 = document.getElementById('ReturnModal');
      // var span2 = document.getElementsByClassName("returnclose")[0];
      //     span2.onclick = function() {
      //       modal2.style.display = "none"; 
      //     }
    
      var modal3 = document.getElementById('Useraccountmodal');
      var span3 = document.getElementsByClassName("Useraccountmodalclose")[0];
          span3.onclick = function() {
            modal3.style.display = "none"; 
          }

      //  window.onclick = function(event) {
      //    if (event.target == modal) {
      //      modal.style.display = "none";
      //      }
      //     }
    this.getData();
  } 
  handleChange(event){
    event.preventDefault();
    this.setState({
      "searchVal" : this.refs.searchVal.value,
    })
  }

    getMyOrders(){
      var userId=localStorage.getItem('admin_ID');
      axios.get("/api/orders/get/list/"+userId)
            .then((response)=>{
              this.setState({ 
                  orderData : response.data
              })
            })
            .catch((error)=>{
                console.log('error', error);
            })
    }
    getData(){
        
        this.getUserInfo();
        this.getCartCount();
        this.getWishlistCount();
        
    }
    getUserInfo(){
      const userid = localStorage.getItem('admin_ID');
        axios.get("/api/users/"+userid)
          .then((response)=>{ 
              this.setState({
                  userinfo : response.data
              })
          })
          .catch((error)=>{
                console.log('error', error);
          })
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
    Submit(event){
      event.preventDefault();
      this.setState({
      "searchVal" : this.refs.searchVal.value,
    })
    this.props.history.push("/searchProducts/"+this.state.searchVal);
     window.location.reload();
    }
  
  logout(){
    var token = localStorage.setItem('admin_ID', "")
      if(token!==null){
      this.props.history.push("/");
    }
  }

  gotocart(event){
    const token = localStorage.getItem("admin_ID");
    if(token != "" && token != null){
      this.props.history.push('/cart');
    }else{
      this.props.history.push('/login');
    }
  }
  gotowishlist(event){
    const token = localStorage.getItem("admin_ID");
    if(token != "" && token != null){
      this.props.history.push('/wishlist');
    }else{
      this.props.history.push('/login');
    }
  }

  render() {
    const token = localStorage.getItem("admin_ID");
    
    return (
      <div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 constantHeaderEcommerce" id="myHeader">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 iconAndSearchBar">
              <div className="col-lg-2 col-md-4 col-sm-4 col-xs-4 logoContainer ">
                <div className="row">
                  <a href="/"> <img src="/images/im1.png" className="col-lg-12"/></a>
                </div>
              </div>
              <form className="col-lg-4 col-md-3 col-sm-3 col-xs-3 col-lg-offset-1 inputContainerEH " onSubmit={this.Submit.bind(this)}>
                <input type="text" className="customInputEH col-lg-11 col-md-6 col-sm-6 col-xs-6" placeholder="Search .." ref="searchVal" value={this.state.searchVal} onChange={this.handleChange.bind(this)}/>
                <span className="searchIcon col-lg-1 col-md-3 col-sm-3 col-xs-3 row"><i className="fa fa-search iconS" aria-hidden="true"></i></span>
              </form>







              
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 iconContainerEH ">
                    {
                      token != "" && token != null ?
                      <div className="col-lg-2 noPadding dropdown pull-right">
                        <div className="row">
                          <a className=" btn-secondary dropdown-toggle moreI " href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More <i className="fa fa-angle-down" aria-hidden="true"></i> </a>
                            <div className="dropdown-menu customDropdownMenu" aria-labelledby="dropdownMenuLink">
                            <div>
                              <a href="/MyOrders" className="col-lg-12 btn dropdown-item customDropdownMenuItem" id="MyOrdersModalbtn" > My Orders </a>
                              <a href="/ShipmentTracking" className="col-lg-12 btn dropdown-item customDropdownMenuItem" id="ShipmentTrackingbtn" > Shipment Tracking </a>
                            </div>
                          </div> 
                        </div> 
                      </div>
                      :
                      <div className="col-lg-2 noPadding dropdown pull-right">
                        
                      </div>
                    }

                    {
                      token != "" && token != null ?
                        <div className="col-lg-3 noPadding col-lg-offset-3 text-center">
                          <a href="/" className="btn-secondary dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >{this.state.userinfo && this.state.userinfo.profile ? this.state.userinfo.profile.firstName:null} <i className="fa fa-angle-down" aria-hidden="true"></i></a>&nbsp;&nbsp;
                          <div className="dropdown-menu customDropdownMenuSignOut" aria-labelledby="dropdownMenuLink">
                            <a className=" dropdown-item  customDropdownMenuItem myProfile col-lg-12 fa fa-user" id="Useraccountbtn" href="/useraccount" > &nbsp; My Profile</a><br/>
                            <span onClick={this.logout.bind(this)} className="col-lg-12 btn dropdown-item customDropdownMenuItem logCss" id="Useraccountbtn" ><i className="fa fa-sign-out" aria-hidden="true"></i> &nbsp; Logout</span>
                          </div> 
                        </div>
                      :
                      <div className="col-lg-3 noPadding col-lg-offset-3">
                        <a href="/login" >Login/Signup</a>
                      </div>
                    }

                    {
                      token != "" && token != null ?
                      <div>
                        <div className="col-lg-2 noPadding cartContainer pull-right">
                          <i title="cart" className="fa fa-shopping-cart" onClick={this.gotocart.bind(this)}><span className="badge custombadge badge-secondary">{this.props.cartCount}</span></i>
                        </div>

                        <div className="col-lg-2 noPadding textAlignCenter">
                          <i title="Wishlist" className="fa fa-heart heartI" onClick={this.gotowishlist.bind(this)}><span className="badge custombadge badge-secondary">{this.props.wishlistCount}</span></i>
                        </div>
                      </div>
                      :
                      <div>
                        <div className="col-lg-2 noPadding cartContainer pull-right">
                          <i title="cart" className="fa fa-shopping-cart" onClick={this.gotocart.bind(this)}><span className="badge custombadge badge-secondary">0</span></i>
                        </div>

                        <div className="col-lg-2 noPadding textAlignCenter">
                          <i title="Wishlist" className="fa fa-heart heartI" onClick={this.gotowishlist.bind(this)}><span className="badge custombadge badge-secondary">0</span></i>
                        </div>
                      </div>
                  }
                  </div>
                
              








            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  blueColor">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                  <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3 shopByCatEH">
                      <div className="accordion colorWhite"><i className="fa fa-arrow-circle-down add"></i>&nbsp;&nbsp;SHOP BY CATEGORY</div>
                        <div className="panel customPanel">
                          <ul className="myDIV">
                          </ul> 
                        </div>
                      </div> 
                      <div className="col-lg-12 col-md-6 col-sm-7 col-xs-7 headerMenuEH "> 
                        <div className="row">
                          <nav className="navbar  navText customNavText mt10 ">
                            <ul className="nav navbar-nav customNavBar">
                              <li className="dropdown" id="">
                                <label htmlFor="drop-4" className="toggle">All Products &nbsp;</label>
                                  <a href="/">All Products </a>
                              </li>
                              <li className="dropdown" id="grocerylink">
                                <label htmlFor="drop-4" className="toggle">Grocery &nbsp;</label>
                                <a href="/Grocery">Grocery </a>
                              </li>         
                              {
                                this.state.categories && this.state.categories.length > 0 && 
                                this.state.categories.map((data,index)=>{
                                  if(index < this.state.limit){
                                    return(
                                      <li className="dropdown" key={index}>
                                        <label htmlFor="drop-4" className="toggle">{data.category}&nbsp;</label>
                                          { this.state.isGrocery != 1 ? <a href={"/main-site/"+data._id}>{data.category} </a>
                                          : 
                                          <a href={"/Grocery/"+data._id}>{data.category} </a>
                                          }
                                          <input type="checkbox" id="drop-4"/>
                                      </li>
                                    )
                                  }
                                })
                              }
                              {
                                this.state.categories  && this.state.categories.length > this.state.limit ? 

                                  <li>
                                    <a className=" btn-secondary dropdown-toggle mtminus" href="#" role="button" id="downMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More <i className="fa fa-angle-down" aria-hidden="true"></i> </a>
                                    <div className="dropdown-menu customDropdownMenu" aria-labelledby="downMenuLink">
                                    {
                                      this.state.categories && this.state.categories.length > 0 && 
                                      this.state.categories.map((data,index)=>{
                                        if(index >= this.state.limit ){
                                          return(
                                            this.state.isGrocery != 1 ?
                                              <a className="col-lg-12 btn dropdown-item customDropdownMenuItem" href={"/main-site/"+data._id}>{data.category} </a>
                                              : 
                                              <a className="col-lg-12 btn dropdown-item customDropdownMenuItem" href={"/Grocery/"+data._id}>{data.category} </a>
                                          )
                                        }
                                      })
                                    }
                                    </div> 
                                  </li>
                                : ''
                              }
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-1 backToTopButtton" onClick={this.ScrollTop.bind(this)}><i className="fa fa-arrow-up customTop"></i></div>
            </div>
          </div>
          
          <div id="Useraccountmodal" className="modal Useraccountmodal ssmodal">
            <button type="button" className="close Useraccountmodalclose" data-dismiss="modal">&times;</button>
          </div>
          
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
export default connect(mapStateToProps, mapDispachToProps)(withRouter(EcommerceHeader));
