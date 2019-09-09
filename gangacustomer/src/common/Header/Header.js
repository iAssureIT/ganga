import React, {Component} from 'react';
// import $                  from 'jquery';
import './Header.css';

import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/dropdown.js';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Megamenu         from '../Megamenu/Megamenu.js';


export default class Header extends Component {
  
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

  render() { 
    const options = [
      { label: '1', value: 1},
      { label: '2', value: 2},
      { label: '3', value: 3},
      { label: '4', value: 4},
      { label: '5', value: 5},
      { label: '6', value: 6},
    ]; 
    return (
      <div className="homecontentwrapper"> 
          <header className="col-lg-12 headerflow"> 
            <div className="row"> 
              <div className="col-lg-3 headerlogoimg headerpaddingtop text-center">
                  <img src="/images/logo1.png"/>
              </div>  
              <div className="col-lg-6 col-md-6 headerpaddingtop">
                  <div className="col-lg-12">
                      <div className="col-lg-3 NOpadding">
                          <ReactMultiSelectCheckboxes options={options} />
                      </div>   
                      <input type="text" className="col-lg-6 headersearch" name="x" placeholder="What are you looking for...."/>
                      <button className="btn searchbutton" type="button"><i className="fa fa-search" aria-hidden="true"></i></button>
                  </div> 
              </div>
              <div className="col-lg-3 col-md-3 headerpaddingtop text-center">
                  <div className="col-lg-12 headercart">
                  <a href="/"><i className="fa fa-shopping-bag headercarticon" aria-hidden="true"></i><badge className="cartvalue">0</badge></a>
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