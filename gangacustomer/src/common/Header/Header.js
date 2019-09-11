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
        // console.log(sp.find('.search_by'));
        sp.find('button span.search_by').html(text);
      });
    });

}
componentDidMount(){
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

                 console.log(response)
                 this.setState({searchResult : response.data})
                })
                .catch((error)=>{
                    console.log('error', error);
                }) 
                console.log('catArray',this.state.catArray)


        this.props.history.push("/searchProducts/"+searchstr+'/'+this.state.catArray);
        //window.location.reload();

    }
    
}
  render() { 
    // const options = [
    //   { label: '1', value: 1},
    //   { label: '2', value: 2},
    //   { label: '3', value: 3},
    //   { label: '4', value: 4},
    //   { label: '5', value: 5},
    //   { label: '6', value: 6},
    // ]; 
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
                                <li><a href="/">Sell on Multistore</a></li>
                                <li><a href="/">Customer Care</a></li>
                                <li><a href="/ShipmentTracking">Track my order</a></li>
                              </ul>  
                            </div>
                          </div>
                          <div className="col-lg-6 header1list2">
                            <div className="row">
                              <ul>
                                <li><a href="/">Get the app</a></li>
                                <li><a href="/"  data-toggle="dropdown"><i className="fa fa-pencil" aria-hidden="true"></i> Sign In <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                    <ul className="dropdown-menu signinmenuul">
                                      <li className="col-lg-12"><a href="#">Your Account</a></li>
                                      <li className="col-lg-12"><a href="#">Your Wishlist</a></li>
                                      <li className="col-lg-12"><a href="/MyOrders">Your Orders</a></li>
                                    </ul> 
                                </li>
                                <li><a href="/">Customer Care</a></li>
                                <li><a href="/ShipmentTracking">Track my order</a></li>
                                </ul>  
                            </div>
                          </div>
                        </div>
                      </div> 
                    </div> 
                  </div> 
                  <div className="col-lg-3 headerlogoimg headerpaddingtop text-center">
                  <img src="/images/logo1.png"/>
              </div>  
              <div className="col-lg-6 col-md-6 headerpaddingtop">
                  <div className="col-lg-12">
                      <div className="col-lg-3 NOpadding">
                          <ReactMultiSelectCheckboxes options={this.state.options} onChange={this.handleChange.bind(this)}/>
                      </div>   
                      <input type="text" className="col-lg-6 headersearch" name="x" placeholder="What are you looking for...."/>
                      <button className="col-lg-2 btn searchbutton" type="button" onClick={this.searchProducts.bind(this)} ><i className="fa fa-search" aria-hidden="true"></i></button>
                  </div> 
              </div>
              <div className="col-lg-3 col-md-3 headerpaddingtop text-center">
                  <div className="col-lg-12 headercart">
                  <a href="/"><i className="fa fa-shopping-bag headercarticon" aria-hidden="true"></i><span className="cartvalue">0</span></a>
                  <a href="/" className="cartitemscss">ITEM (S)</a>
                  </div> 
              </div>
            </div>
          </header>
          <nav>
          <div className="col-lg-12 catogeryvaluebg">
            <div className="col-lg-4">
            <div className="dropdown">
              <button className="dropdown-toggle" id="menu1" type="button" data-toggle="dropdown"><i className="fa fa-bars" aria-hidden="true"></i>  ALL CATEGORY</button>
              <div className="dropdown-menu" role="menu" aria-labelledby="menu1">
                 <Megamenu />
              </div>
            </div>

            </div>
          </div>
          </nav>
    </div>
    );  
  }
}


export default withRouter(Header);