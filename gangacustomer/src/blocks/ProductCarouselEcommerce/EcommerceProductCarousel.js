import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import Loadable from 'react-loadable';
import axios from 'axios';
import { connect } from 'react-redux';
import "./EcommerceProductCarousel.css";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ProductDetailsHomeView from "../../pages/ProductDetailsEcommerce/ProductDetailsHomeView.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';
import { ToastsContainer, ToastsStore, ToastsContainerPosition, message, timer, classNames } from 'react-toasts';


const OwlCarousel = Loadable({
  loader: () => import('react-owl-carousel'),
  loading() {
    return <div className="col-sm-12 col-xs-12 col-lg-2 col-lg-offset-5 col-md-12 loadingImg"><img src="../images/loadersglms.gif" className="img-responsive" alt="loading" /></div>
  }
});

const user_ID = localStorage.getItem("user_ID");
class EcommerceProductCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 5
        }
      },
      responsive2: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 4
        }
      },
      productType: props.type,
      newProducts: [],
      modalIDNew: []
    };
  }

  componentDidMount() {

    //   const second = 1000,
    //   minute = second * 60,
    //   hour = minute * 60,
    //   day = hour * 24;

    // let countDown = new Date('Sep 30, 2019 00:00:00').getTime(),
    // x = setInterval(function() {

    //   let now = new Date().getTime(),
    //       distance = countDown - now;

    // document.getElementById('days').innerText = Math.floor(distance / (day));
    // document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour));
    // document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute));
    // document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

    //do something later when date is reached
    //if (distance < 0) {
    //  clearInterval(x);
    //  'IT'S MY BIRTHDAY!;
    //}

    // }, second)
  }
  getCartData() {
    // const userid = '5d5bfb3154b8276f2a4d22bf';
    const userid = localStorage.getItem('user_ID');
    axios.get("/api/carts/get/list/" + userid)
      .then((response) => {
        // console.log('cartProduct=======================', response.data[0].cartItems)
        this.setState({
          cartProduct: response.data[0].cartItems
        });
        this.props.initialCartData(response.data[0].cartItems);
      })
      .catch((error) => {
        console.log('error', error);
      })
  }
  addtocart(event) {
    if (user_ID) {
      event.preventDefault();
      var id = event.target.id;
      // console.log('id', id);
      axios.get('/api/products/get/one/' + id)
        .then((response) => {
          var totalForQantity = parseInt(1 * response.data.discountedPrice);
          const userid = localStorage.getItem('user_ID');

          const formValues = {
            "user_ID": userid,
            "product_ID": response.data._id,
            "currency": response.data.currency,
            "productCode": response.data.productCode,
            "productName": response.data.productName,
            "section_ID"        : response.data.section_ID,
            "section"           : response.data.section,
            "category_ID": response.data.category_ID,
            "category": response.data.category,
            "subCategory_ID": response.data.subCategory_ID,
            "subCategory": response.data.subCategory,
            "productImage": response.data.productImage,
            "quantity": 1,
            "discountedPrice": parseInt(response.data.discountedPrice),
            "originalPrice": parseInt(response.data.originalPrice),
            "totalForQantity": totalForQantity,

          }
          axios.post('/api/carts/post', formValues)
            .then((response) => {
              this.getCartData();
              ToastsStore.success(<div className="alertback">{response.data.message}<span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
              this.props.changeCartCount(response.data.cartCount);
            })
            .catch((error) => {
              console.log('error', error);
            })
        })
        .catch((error) => {
          console.log('error', error);
        })
    }
    else {
      ToastsStore.error(<div className="alertback">Need To Sign In, Please Sign In First<a className="pagealerturl" href="/login">Sign In >></a><span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      newProducts: nextProps.newProducts,
      type: nextProps.type
    })
  }

  addtowishlist(event) {
    if (user_ID) {
      event.preventDefault();
      var id = event.target.id;
      const userid = localStorage.getItem('user_ID');
      const formValues =
      {
        "user_ID": userid,
        "product_ID": id,
      }
      axios.post('/api/wishlist/post', formValues)
        .then((response) => {
          this.props.getWishData();
          this.props.changeWishlistCount(response.data.wishlistCount);
        })
        .catch((error) => {
          console.log('error', error);
        })
    }
    else {
      ToastsStore.error(<div className="alertback">Need To Sign In, Please Sign In First<a className="pagealerturl" href="/login">Sign In >></a><span className="pull-right pagealertclose" onClick={this.Closepagealert.bind(this)}>X</span></div>, 10000)
    }
  }
  getCategoryID(event) {
    event.preventDefault();
    var id = event.target.id;
    this.props.changeProductCateWise(id, this.state.type);
  }
  openModal(event) {
    event.preventDefault();
    var modalID = event.target.id;
    this.setState({
      modalIDNew: { productID: modalID, productType: this.state.productType }
    })
  }
  Closepagealert(event) {
    event.preventDefault();
    $(".toast-error").html('');
    $(".toast-success").html('');
    $(".toast-info").html('');
    $(".toast-warning").html('');
    $(".toast-error").removeClass('toast');
    $(".toast-success").removeClass('toast');
    $(".toast-info").removeClass('toast');
    $(".toast-warning").removeClass('toast');

  }
  render() {
    const token = localStorage.getItem("user_ID");
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
        <div className="row">
          <div className="pagealertnone">
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productcomponentheading text-center">
              <div className="producttextclass  col-lg-2">
                <h3 className="row">
                  <b>{this.props.title}</b>
                </h3>
              </div>
              <div className="col-lg-5 producttimer producttimerposition1">
              </div>
              <div className="col-lg-5 producttimer producttimerposition">
                <OwlCarousel
                  className="owl-theme customnNavButtoncaro1"
                  margin={0}
                  nav={true}
                  responsive={this.state.responsive2}
                  autoplay={true}
                  autoplayHoverPause={true}
                >
                  {
                    this.props.categories && this.props.categories.length > 0 ?
                      this.props.categories.map((data, index) => {
                        return (
                          <div className="item" key={index}>
                            <span className="col-lg-12 row  productcarotext1" id={data._id} onClick={this.getCategoryID.bind(this)}>{data.category}</span>//
                          </div>
                        );
                      })
                      :
                      null
                  }
                </OwlCarousel>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
          <div className="tab-content customTabContent">
            <div id="home" className="tab-pane fade in active ecommerceTabContent">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt50">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <OwlCarousel
                    className="owl-theme customnNavButton"
                    margin={0}
                    nav={true}
                    responsive={this.state.responsive}
                    autoplay={true}
                    autoplayHoverPause={true}
                  >
                    {
                      this.state.newProducts && this.state.newProducts.length > 0 ?
                        this.state.newProducts.map((data, index) => {
                          var x = this.props.wishList && this.props.wishList.length > 0 ? this.props.wishList.filter((abc) => abc.product_ID == data._id) : [];
                          if(x && x.length > 0){
                            var wishClass = '';
                            var tooltipMsg = 'Wish listed';
                          }else{
                            var wishClass = '-o';
                            var tooltipMsg = 'Add to wishlist';
                          }
                          return (
                            <div className="item col-lg-12 col-md-12 col-sm-12 col-xs-12" key={index}>
                              <a>
                                <div className="">
                                  <div className="card">
                                    <div className="item-top">
                                      <div className="productImg">
                                        <button type="submit" id={data._id} title={tooltipMsg} className={"wishIcon fa fa-heart"+wishClass} onClick={this.addtowishlist.bind(this)}></button>
                                        {data.discountPercent ? <div className="btn-warning discounttag">{data.discountPercent} % </div> : null} 
                                        <a href={"/productdetails/" + data._id} className="product photo product-item-photo" tabIndex="-1">
                                          <img src={data.productImage[0] ? data.productImage[0] : '/images/notavailable.jpg'} />
                                        </a>
                                      </div>
                                      <div className="productDetails">
                                        <div className="innerDiv">
                                          <a href={"/productdetails/" + data._id}><div className="product-brand" title={data.productName}>{data.productName}</div></a>
                                          <a href={"/productdetails/" + data._id}><div className=" product-item-link" title={data.productName}>{data.brand}</div></a>
                                          <a href={"/productdetails/" + data._id}><div className="col-lg-12 col-md-12 NOpadding">
                                            {
                                              data.discountPercent ?
                                                <div className="col-lg-12 col-md-12 NOpadding">
                                                  <span className="oldprice"><i className="fa fa-inr oldprice"></i>&nbsp;{data.originalPrice}</span> &nbsp;
                                                  <span className="price"><i className="fa fa-inr"></i>&nbsp;{data.discountedPrice}</span>
                                                </div>
                                                :
                                                <span className="price"><i className="fa fa-inr"></i>&nbsp;{data.originalPrice}</span>
                                            }
                                          </div></a>
                                          {/* <div className="product-reviews-summary">
                                            <div className="col-lg-3 col-md-3 product-reviews-summary ratebox">4.4 &nbsp;<i class="fa fa-star"></i></div>
                                          </div> */}
                                          <div >
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 NOpadding">
                                              
                                            </div>
                                            <div className=" col-lg-7 col-md-7 col-sm-12 col-xs-12 NOpadding">
                                              <button type="submit" id={data._id} onClick={this.addtocart.bind(this)} title="Add to Cart" className="homeCart fa fa-shopping-cart col-lg-11 col-lg-offset-1">
                                                &nbsp;Add to Cart
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          );
                        })
                        : ''
                    }
                  </OwlCarousel>
                </div>
                <div className="modal " id={"productviewmodal" + this.state.productType} role="dialog">
                  <div className="modal-dialog modal-lg dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title"></h4>
                      </div>
                      <div className="modal-body">
                        <ProductDetailsHomeView productInfo={this.state.modalIDNew} />
                      </div>
                      <div className="modal-footer">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cartData: state.cartData
  }
}
const mapDispachToProps = (dispach) => {
  return {
    changeCartCount: (cartCount) => dispach({
      type: 'CART_COUNT',
      cartCount: cartCount
    }),
    changeWishlistCount: (wishlistCount) => dispach({
      type: 'WISHLIST_COUNT',
      wishlistCount: wishlistCount
    }),
    initialCartData: (cartData) => dispach({
      type: 'CART_DATA',
      cartData: cartData
    }),
  }
}

export default connect(mapStateToProps, mapDispachToProps)(EcommerceProductCarousel);