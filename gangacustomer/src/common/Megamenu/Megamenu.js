import React, {Component} from 'react';
// import $                  from 'jquery';
import './Megamenu.css';

import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export default class Megamenu extends Component {
  
componentWillMount() {}

  render() {  
    return (
          <div className="container">
            <div className="mega-menu">
              <ul>
                <li className="menu-item menu-1">
                  <a href="#">Multivitamin & Suplemen</a>
                  <div className="mega-submenu">
                    <h2>Multivitamin & Suplemen</h2>
                    <div className="submenu-content">
                      <div className="section links">
                        <ul>
                          <li><a href="#">Lorem Ipsum 1</a></li>
                          <li><a href="#">Lorem Ipsum 2</a></li>
                          <li><a href="#">Vitamin A</a></li>
                          <li><a href="#">Vitamin B</a></li>
                          <li><a href="#">Vitamin C</a></li>
                          <li><a href="#">Asam Folat</a></li>
                          <li><a href="#">Vitamin E</a></li>
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
                <li className="menu-item menu-2">
                  <a href="#">Jamu & Herbal</a>
                  <div className="mega-submenu">
                    <h2>Jamu & Herbal</h2>
                    <div className="submenu-content">
                      <div className="section links">
                        <ul>
                          <li><a href="#">Lorem Ipsum 1</a></li>
                          <li><a href="#">Lorem Ipsum 2</a></li>
                          <li><a href="#">Vitamin A</a></li>
                          <li><a href="#">Vitamin B</a></li>
                          <li><a href="#">Vitamin C</a></li>
                          <li><a href="#">Asam Folat</a></li>
                          <li><a href="#">Vitamin E</a></li>
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
                <li className="menu-item menu-3">
                  <a href="#">Vaksinasi di Rumah</a>
                  <div className="mega-submenu">
                    <h2>Vaksinasi di Rumah</h2>
                    <div className="submenu-content">
                      <div className="section links">
                        <ul>
                          <li><a href="#">Lorem Ipsum 1</a></li>
                          <li><a href="#">Lorem Ipsum 2</a></li>
                          <li><a href="#">Vitamin A</a></li>
                          <li><a href="#">Vitamin B</a></li>
                          <li><a href="#">Vitamin C</a></li>
                          <li><a href="#">Asam Folat</a></li>
                          <li><a href="#">Vitamin E</a></li>
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
                <li className="menu-item menu-4">
                  <a href="#">Alat Kesehatan</a>
                  <div className="mega-submenu">
                    <h2>Alat Kesehatan</h2>
                    <div className="submenu-content">
                      <div className="section links">
                        <ul>
                          <li><a href="#">Lorem Ipsum 1</a></li>
                          <li><a href="#">Lorem Ipsum 2</a></li>
                          <li><a href="#">Vitamin A</a></li>
                          <li><a href="#">Vitamin B</a></li>
                          <li><a href="#">Vitamin C</a></li>
                          <li><a href="#">Asam Folat</a></li>
                          <li><a href="#">Vitamin E</a></li>
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
                <li className="menu-item menu-5">
                  <a href="#">Obat Asam Urat</a>
                  <div className="mega-submenu">
                    <h2>Obat Asam Urat</h2>
                    <div className="submenu-content">
                      <div className="section links">
                        <ul>
                          <li><a href="#">Lorem Ipsum 1</a></li>
                          <li><a href="#">Lorem Ipsum 2</a></li>
                          <li><a href="#">Vitamin A</a></li>
                          <li><a href="#">Vitamin B</a></li>
                          <li><a href="#">Vitamin C</a></li>
                          <li><a href="#">Asam Folat</a></li>
                          <li><a href="#">Vitamin E</a></li>
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
                <li className="menu-item menu-6">
                  <a href="#">Obat Darah Tinggi</a>
                  <div className="mega-submenu">
                    <h2>Obat Darah Tinggi</h2>
                    <div className="submenu-content">
                      <div className="section links">
                        <ul>
                          <li><a href="#">Lorem Ipsum 1</a></li>
                          <li><a href="#">Lorem Ipsum 2</a></li>
                          <li><a href="#">Vitamin A</a></li>
                          <li><a href="#">Vitamin B</a></li>
                          <li><a href="#">Vitamin C</a></li>
                          <li><a href="#">Asam Folat</a></li>
                          <li><a href="#">Vitamin E</a></li>
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
                <li className="menu-item menu-7">
                  <a href="#">Obat Diabetes</a>
                  <div className="mega-submenu">
                    <h2>Obat Diabetes</h2>
                    <div className="submenu-content">
                      <div className="section links">
                        <ul>
                          <li><a href="#">Lorem Ipsum 1</a></li>
                          <li><a href="#">Lorem Ipsum 2</a></li>
                          <li><a href="#">Vitamin A</a></li>
                          <li><a href="#">Vitamin B</a></li>
                          <li><a href="#">Vitamin C</a></li>
                          <li><a href="#">Asam Folat</a></li>
                          <li><a href="#">Vitamin E</a></li>
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
                <li className="menu-item menu-8">
                  <a href="#">Obat Jantung</a>
                  <div className="mega-submenu">
                    <h2>Obat Jantung</h2>
                    <div className="submenu-content">
                      <div className="section links">
                        <ul>
                          <li><a href="#">Lorem Ipsum 1</a></li>
                          <li><a href="#">Lorem Ipsum 2</a></li>
                          <li><a href="#">Vitamin A</a></li>
                          <li><a href="#">Vitamin B</a></li>
                          <li><a href="#">Vitamin C</a></li>
                          <li><a href="#">Asam Folat</a></li>
                          <li><a href="#">Vitamin E</a></li>
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
                <li className="menu-item menu-9">
                  <a href="#">Obat Kolesterol</a>
                  <div className="mega-submenu">
                    <h2>Obat Kolesterol</h2>
                    <div className="submenu-content">
                      <div className="section links">
                        <ul>
                          <li><a href="#">Lorem Ipsum 1</a></li>
                          <li><a href="#">Lorem Ipsum 2</a></li>
                          <li><a href="#">Vitamin A</a></li>
                          <li><a href="#">Vitamin B</a></li>
                          <li><a href="#">Vitamin C</a></li>
                          <li><a href="#">Asam Folat</a></li>
                          <li><a href="#">Vitamin E</a></li>
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
              </ul>
            </div>
        </div>      
      );  
   }
}