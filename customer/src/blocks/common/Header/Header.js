import React, { Component } from 'react';
import $         from 'jquery';

import "./Header.css";

export default class Header extends Component {

constructor(props) {
        super(props);
            this.state = {
                "userName" : "Priyanka",
            };

       
    }
  ScrollTop(event){
    window.scrollTo(0,0);
  }

  componentDidMount()
  {
    var acc = document.getElementsByClassName("colorWhite");
    console.log("x=",acc);
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


    }
    window.onscroll = function() {myFunction()};
    var header = document.getElementById("myHeader");
    console.log("header",header);
    var sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
  } 

  logout(){
    var token = localStorage.removeItem("token");
      if(token!==null){
      // console.log("Header Token = ",token);
      // browserHistory.push("/login");
      // this.props.history.push("/");
    }
  }

  render() {
              const token = localStorage.getItem("token");

     
    return (
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
           {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 miniHeaderDesolvedEC">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="row">
                      <span className="headerFont">Free Shipping On Order Over $99&nbsp;&nbsp;&nbsp;&nbsp;Download App  </span>&nbsp;
                      <i className="fa fa-apple"></i>&nbsp;&nbsp;<i className="fa fa-windows" aria-hidden="true"></i>&nbsp;&nbsp;<i className="fa fa-android" aria-hidden="true"></i>

                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 headerFont pull-right">
                  <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 "> English <i className="fa fa-angle-down" aria-hidden="true"></i> </div>
                  <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 row "> USD <i className="fa fa-angle-down" aria-hidden="true"></i> </div>
              
              </div>
            </div>*/}
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 constantHeaderEcommerce"  id="myHeader">
            <div className="row">
             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 iconAndSearchBar">
              <div className="row">
                <div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 ">
                  <div className="">
                   <div className="col-lg-3 col-lg-offset-1 col-md-4 col-sm-4 col-xs-4 logoContainer ">
                      <div className="row">
                       <a href="/"> <img src="/images/groceryLogo.png" /></a>
                      </div>
                    </div>
                    
                    <div className="col-lg-4 col-md-3 col-sm-3 col-xs-3 inputContainerEH ">
                     <input type="text" className="customInputEH col-lg-10 col-md-6 col-sm-6 col-xs-6" placeholder="Search .."/>
                      <span className="searchIcon col-lg-2 col-md-3 col-sm-3 col-xs-3"><i className="fa fa-search iconS" aria-hidden="true"></i></span>
                    </div>
                   
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 iconContainerEH  ">
                    {
                      token!==null ?
                      <div className="col-lg-3 col-lg-offset-2">
                          <a href="/"onClick={this.logout.bind(this)}>{this.state.userName} <i className="fa fa-angle-down" aria-hidden="true"></i></a>&nbsp;&nbsp;
                      </div>
                      :
                      <div className="col-lg-4 noPadding col-lg-offset-2">
                          <a href="/login">LOGIN & SIGN UP </a>
                      </div>
                    }
                      <div className="col-lg-2 noPadding dropdown">
                            <a class=" btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">MORE <i className="fa fa-angle-down" aria-hidden="true"></i> </a>
                             <div class="dropdown-menu customDropdownMenu" aria-labelledby="dropdownMenuLink">
                              <a class="dropdown-item customDropdownMenuItem" href="/MyOrders">My Orders</a><br/>
                              <a class="dropdown-item customDropdownMenuItem" href="/ShipmentTracking">Shipping Details</a><br/>
                              <a class="dropdown-item customDropdownMenuItem" href="#">Wish List</a><br/>
                            </div>
                      </div>
                       <div className="col-lg-3 noPadding cartContainer">
                          <a href=""><i className="fa fa-shopping-cart"></i>&nbsp;&nbsp; CART</a>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blueColor greenColor">
                  <div className="row">
                    <div className="col-lg-3 col-md-2 col-sm-3 col-xs-3 ">
                       {/*<div className="accordion colorWhite"><i className="fa fa-arrow-circle-down add"></i>&nbsp;&nbsp;SHOP BY CATEGORY</div>
                        <div className="panel customPanel">
                        <ul className="myDIV">
                          <li><a href="/GroceryHomepage"><div className="imgOfCateDiv col-lg-4 col-md-3 col-sm-3 col-xs-3"></div><span>Grocery</span></a></li>
                        </ul> 
                        </div>*/}
                    </div>
                    <div className="col-lg-7 col-md-6 col-sm-7 col-xs-7 headerMenuEH greenColor">
                      <div className="row">
                          <nav className="navbar  navText customNavText mt10 ">
                              <ul className="nav navbar-nav customNavBar otherClass">
                                  {/*<li className="active showActive"><a href="/">HOME</a></li>*/}
                                  <li className="dropdown">
                                   <label htmlFor="drop-4" className="toggle">ALL PRODUCTS&nbsp;</label>
                                    <a href="/ProductPage">ALL PRODUCTS </a>
                                    <input type="checkbox" id="drop-4"/>
                                  </li>
                                  <li>  
                                    <label htmlFor="drop-2" className="toggle">FEATURED PRODUCTS</label>
                                    <a href="/ProductPageEcommerce">FEATURED PRODUCTS </a>
                                    <input type="checkbox" id="drop-2"/>
                                  </li>
                                  <li>  
                                    <label htmlFor="drop-2" className="toggle">EXCLUSIVE PRODUCTS</label>
                                    <a href="/ProductPageEcommerce">EXCLUSIVE PRODUCTS </a>
                                    <input type="checkbox" id="drop-2"/>
                                  </li>
                                  <li>  
                                    <label htmlFor="drop-2" className="toggle">BEST SELLER</label>
                                    <a href="/ProductPageEcommerce">BEST SELLER </a>
                                    <input type="checkbox" id="drop-2"/>
                                  </li>
                                {/* <li className="dropdown">
                                   <label htmlFor="drop-4" className="toggle">ABOUT US&nbsp;</label>
                                    <a href="/about-us">ABOUT US&nbsp;</a>
                                    <input type="checkbox" id="drop-4"/>
                                  </li>
                                   <li className="dropdown">
                                   <label htmlFor="drop-4" className="toggle">CONTACT US&nbsp;</label>
                                    <a href="/contact-us">CONTACT US&nbsp;</a>
                                    <input type="checkbox" id="drop-4"/>
                                  </li>*/}
                                  
                              </ul>
                          </nav>
                      </div>
                    </div>
                    {/* <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 contactDivEH ">
                      <i className="fa fa-phone"></i>&nbsp;&nbsp;123-656-8978
                      
                    </div>*/}
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div>
            <div className="col-lg-1 backToTopButtton" onClick={this.ScrollTop.bind(this)}><i className="fa fa-arrow-up customTop"></i></div>
          </div>
        </div>
    );
  }
}
