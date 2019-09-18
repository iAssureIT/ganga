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
                                  <div className="productImg">
                                  <img src={data.orderdetails[0].productImage[0]} className="productImage"/>
                                  </div>
                                  <div className="product-desc">
                                    <a className="title" href="">{data.orderdetails[0].productName}</a>
                                    <div className="price"><i className={ "fa fa-"+data.orderdetails[0].currency}>{data.orderdetails[0].offeredPrice}</i></div>
                                    <a href="#" className="btn-atc" onClick={this.addtocart.bind(this)} id={data.orderdetails[0]._id}>Add to Cart</a>
                                  </div>
                                </div>
                              </div>
                              <div className="section promotions">
                                <a href="#" className="promo promo 1">
                                  <img src={data.categoryImage} className="thumb"/>
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