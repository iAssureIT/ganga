import React, {Component} from 'react';
import swal                       from 'sweetalert';
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
  axios.get("/api/products/get/getmegamenulist")
            .then((response)=>{
              this.setState({ 
                  categoryData : response.data
              })
            })
            .catch((error)=>{
                console.log('error', error);
            })
}  
addtocart(event){
      event.preventDefault();
      var id = event.target.id;
      console.log('id', id);
      axios.get('/api/products/get/one/'+id)
      .then((response)=>{
        var totalForQantity   =   parseInt(1 * response.data.offeredPrice);
            const userid = localStorage.getItem('user_ID');
            
            const formValues = { 
                "user_ID"    : userid,
                "product_ID" : response.data._id,
                "currency" : response.data.currency,
                "productCode" : response.data.productCode,
                "productName" : response.data.productName,
                "category" : response.data.category,
                "subCategory" : response.data.subCategory,
                "productImage" : response.data.productImage,
                "quantity" : 1  ,
                "offeredPrice" : parseInt(response.data.offeredPrice),
                "actualPrice" : parseInt(response.data.actualPrice),
                "totalForQantity" : totalForQantity,
                
            }
            axios.post('/api/carts/post', formValues)
            .then((response)=>{
              
            swal(response.data.message);
            this.props.changeCartCount(response.data.cartCount);
            })
            .catch((error)=>{
              console.log('error', error);
            })
      })
      .catch((error)=>{
        console.log('error', error);
      })
}
componentWillMount() {}
  
  render() {  
        return (
          <header className="dark">
        <nav role="navigation">
          <a href="javascript:void(0);" className="ic menu" tabindex="1">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </a>
          <a href="javascript:void(0);" className="ic close"></a>
          <ul className="main-nav">
            <li className="top-level-link">
              <a><span>Home</span></a>      
            </li> 
            
            <li className="top-level-link">
              <a className="mega-menu"><span>Products</span></a>
              <div className="sub-menu-block">
                <div className="row">
                  <div className="col-md-2 col-lg-2 col-sm-2">
                    <h2 className="sub-menu-head">Clothing</h2>
                    <ul className="sub-menu-lists">
                      <li><a>Mens</a></li>
                      <li><a>Womens</a></li>
                      <li><a>Kids</a></li>
                      <li><a>New Born</a></li>
                      <li><a>View All</a></li>
                    </ul>           
                  </div>
                  <div className="col-md-2 col-lg-2 col-sm-2">
                    <h2 className="sub-menu-head">Handbags</h2>
                    <ul className="sub-menu-lists">
                      <li><a>Wallets</a></li>
                      <li><a>Athletic bag</a></li>
                      <li><a>Backpack</a></li>
                      <li><a>Bucket Bag</a></li>
                      <li><a>View All</a></li>
                    </ul>
                  </div>
                  <div className="col-md-2 col-lg-2 col-sm-2">
                    <h2 className="sub-menu-head">Shoes</h2>
                    <ul className="sub-menu-lists">
                      <li><a>Mens</a></li>
                      <li><a>Womens</a></li>
                      <li><a>Kids</a></li>
                      <li><a>View All</a></li>
                    </ul>
                  </div>
                  <div className="col-md-2 col-lg-2 col-sm-2">
                    <h2 className="sub-menu-head">Shoes</h2>
                    <ul className="sub-menu-lists">
                      <li><a>Mens</a></li>
                      <li><a>Womens</a></li>
                      <li><a>Kids</a></li>
                      <li><a>View All</a></li>
                    </ul>
                  </div>
                  <div className="col-md-2 col-lg-2 col-sm-2">
                    <h2 className="sub-menu-head">Shoes</h2>
                    <ul className="sub-menu-lists">
                      <li><a>Mens</a></li>
                      <li><a>Womens</a></li>
                      <li><a>Kids</a></li>
                      <li><a>View All</a></li>
                    </ul>
                  </div>
                  <div className="col-md-2 col-lg-2 col-sm-2">
                    <h2 className="sub-menu-head">Shoes</h2>
                    <ul className="sub-menu-lists">
                      <li><a>Mens</a></li>
                      <li><a>Womens</a></li>
                      <li><a>Kids</a></li>
                      <li><a>View All</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="top-level-link">
              <a className="mega-menu"><span>About</span></a>
              <div className="sub-menu-block">
                <div className="row">
                  <div className="col-md-2 col-lg-2 col-sm-2">
                    <h2 className="sub-menu-head">Clothing</h2>
                    <ul className="sub-menu-lists">
                      <li><a>Mens</a></li>
                      <li><a>Womens</a></li>
                      <li><a>Kids</a></li>
                      <li><a>New Born</a></li>
                      <li><a>View All</a></li>
                    </ul>           
                  </div>
                  <div className="col-md-2 col-lg-2 col-sm-2">
                    <h2 className="sub-menu-head">Handbags</h2>
                    <ul className="sub-menu-lists">
                      <li><a>Wallets</a></li>
                      <li><a>Athletic bag</a></li>
                      <li><a>Backpack</a></li>
                      <li><a>Bucket Bag</a></li>
                      <li><a>View All</a></li>
                    </ul>
                  </div>
                  <div className="col-md-2 col-lg-2 col-sm-2">
                    <h2 className="sub-menu-head">Shoes</h2>
                    <ul className="sub-menu-lists">
                      <li><a>Mens</a></li>
                      <li><a>Womens</a></li>
                      <li><a>Kids</a></li>
                      <li><a>View All</a></li>
                    </ul>
                  </div>
                  <div className="col-md-2 col-lg-2 col-sm-2">
                    <h2 className="sub-menu-head">Shoes</h2>
                    <ul className="sub-menu-lists">
                      <li><a>Mens</a></li>
                      <li><a>Womens</a></li>
                      <li><a>Kids</a></li>
                      <li><a>View All</a></li>
                    </ul>
                  </div>
                  <div className="col-md-2 col-lg-2 col-sm-2">
                    <h2 className="sub-menu-head">Shoes</h2>
                    <ul className="sub-menu-lists">
                      <li><a>Mens</a></li>
                      <li><a>Womens</a></li>
                      <li><a>Kids</a></li>
                      <li><a>View All</a></li>
                    </ul>
                  </div>
                  <div className="col-md-2 col-lg-2 col-sm-2">
                    <h2 className="sub-menu-head">Shoes</h2>
                    <ul className="sub-menu-lists">
                      <li><a>Mens</a></li>
                      <li><a>Womens</a></li>
                      <li><a>Kids</a></li>
                      <li><a>View All</a></li>
                    </ul>
                  </div>
                </div>                
              </div>
            </li>
          </ul> 
        </nav>
    </header>  
 
);  
      }
}