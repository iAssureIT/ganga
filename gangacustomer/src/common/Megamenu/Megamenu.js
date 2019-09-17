import React, {Component} from 'react';
// import $                  from 'jquery';
import './Megamenu.css';

import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
export default class Megamenu extends Component {
constructor(props) {
        super(props);
        this.state = {
          categoryData:[],
        };
        window.scrollTo(0, 0);
    }

componentDidMount(){
  axios.get("/api/category/get/list")
            .then((response)=>{
              this.setState({ 
                  categoryData : response.data
              })
            })
            .catch((error)=>{
                console.log('error', error);
            })
}  
componentWillMount() {}
  
  render() {  
    return (
          <div className="container">
            <div className="mega-menu">
              <ul>
                {
                  this.state.categoryData && this.state.categoryData.map((data,index)=>{
                    
                    return ( 
                        <li className="menu-item menu-1" key={index}>
                          <a href={"/product-collage/"+data._id}>{data.category}</a>
                          <div className="mega-submenu">
                            <h2>{data.category}</h2>
                            <div className="submenu-content">
                              <div className="section links">
                                <ul>
                                  {
                                    data.subCategory && data.subCategory.map((subcat,ind)=>{
                                      return(<li key={ind}><a href={"/product-collage/"+data._id+'/'+subcat._id}>{subcat.subCategoryTitle}</a></li>);
                                    })
                                  }
                                  
                                </ul>
                              </div>
                              <div className="section featured-product">
                                <div className="product-detail">
                                  <div className="badge">Featured</div>
                                  <img src="https://lab.devaradise.com/codepen-assets/featured-product.jpg" className="thumb"/>
                                  <div className="product-desc">
                                    <a className="title" href="#">Wellness Echinaciae + Vit C isi 30</a>
                                    <div className="price">Rp. 170.000</div>
                                    <a href="#" className="btn-atc">Add to Cart</a>
                                  </div>
                                </div>
                              </div>
                              <div className="section promotions">
                                <a href="#" className="promo promo 1">
                                  <img src="https://lab.devaradise.com/codepen-assets/promo-1.jpg" className="thumb"/>
                                </a>
                                <a href="#" className="promo promo 2">
                                  <img src="https://lab.devaradise.com/codepen-assets/promo-2.jpg" className="thumb"/>
                                </a>
                              </div>
                            </div>
                          </div>  
                        </li>
                    );
                    
                  })
                }

              </ul>
            </div>
        </div>      
      );  
   }
}