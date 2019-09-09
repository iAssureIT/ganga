import React, { Component } from 'react';
import Moment from 'react-moment';
import axios                from 'axios';
import swal from 'sweetalert';
import {Route, withRouter} from 'react-router-dom';
import { connect }        from 'react-redux';


import "./ProductCollage.css";
axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class ProductCollageEcommerce extends Component {
	constructor(props){
		super(props); 
		// console.log("1 = ", props);
		this.state = {
      products : props.products,
			propertiesData:[],
		}
	}

	componentDidMount(){
    
		this.setState({
      products: this.props.products
		},()=>{});

	}

  componentWillRecieveprops(nextProps){
    this.setState({
      products : nextProps.products
    });

  }
  addtocart(event){
    event.preventDefault();
    var id = event.target.id;
    // console.log("ididid", id);
    axios.get('/api/products/get/one/'+id)
    .then((response)=>{
      var totalForQantity   =   parseInt(1 * response.data.offeredPrice);
          const userid = localStorage.getItem('admin_ID');
          // console.log("userid",response.data);
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
            // console.log('response', response);
          swal(response.data.message)
            .then((obj)=>{
                  window.location.reload();
            });

          })
          .catch((error)=>{
            console.log('error', error);
          })
    })
    .catch((error)=>{
      console.log('error', error);
    })
  }


   addtowishlist(event){
    event.preventDefault();
    var id = event.target.id;
    axios.get('/api/products/get/one/'+id)
    .then((response)=>{
          const userid = localStorage.getItem('admin_ID');
          // console.log("userid",response.data);
          const formValues = 
          { 
              "user_ID"    : userid,
              "product_ID" : response.data._id,
          }
          axios.post('/api/wishlist/post', formValues)
          .then((response)=>{
            // console.log('response', response);
            swal(response.data.message)
              window.location.reload();
          })
          .catch((error)=>{
            console.log('error', error);
          })
    })
    .catch((error)=>{
      console.log('error', error);
    })
  }
  componentWillReceiveProps(){
  }
	render() {

  const token = localStorage.getItem("token");
  var plength = this.props.products.length ? this.props.products.length : 0;
  var productlength = plength % 3;
		return (
			<div className="row">
          <div className="col-lg-12 col-md-8 col-sm-8 col-xs-8 backColorWhite ">
            <span className="col-lg-1 dotDiv"> </span>
            <div className="col-lg-10 mainDiv"></div>
            <span className="col-lg-1 dotDiv"> </span>
          </div>
          <div className="col-lg-12 col-md-12 backColorWhite">
          <div className="row">
          {
            this.props.products.map((data,index)=>{
              if(productlength == 2){
                if(plength === index+2){
                  var classes = "mt20 col-lg-4  col-lg-offset-2";
                 
                }else{
                  var classes="mt20 col-lg-4";
               
              }
              }else if(productlength == 1){
                // console.log('productlength')
                if(plength === index+1){
                  var classes = "mt20 col-lg-4 col-lg-offset-4";                                   
                }else{
                  var classes="mt20 col-lg-4";                                 
              }
              }else{
                var classes="mt20 col-lg-4";                               
              }
               return ( 
                        <div  key={index} className={classes}>
                           <div  className="col-lg-12 singleProc">
                            <div className="row">
                             <img src={data.productImage[0]} alt="blank" className="col-lg-12 noPad imgSize" />
                            <div className="row">
                             <img src={data.productImage[1] ? data.productImage[1] : data.productImage[0]} alt="blank" className=" slide-left col-lg-12 hoverImage" />
                              </div>
                             <span className="backColorTrasPC">
                                  {
                                    token!==null ?
                                      <span className={data.webCategory == "Grocery" ? "iconContainerGrocery" : "iconContainerEcommerce"} onClick={this.addtocart.bind(this)} id={data._id}><i className="fa fa-shopping-cart onTransDivElement"></i></span>
                                      :
                                      <a href="/login"className="iconContainerEcommerce"><i className="fa fa-shopping-cart onTransDivElement"></i></a>
                                  }
                                  {
                                    token!==null ?
                                      <span className={data.webCategory == "Grocery" ? "iconContainerGrocery" : "iconContainerEcommerce"} onClick={this.addtowishlist.bind(this)} id={data._id} ><i className="fa fa-heart onTransDivElement"></i></span>
                                      :
                                      <a href="/login"className={data.webCategory == "Grocery" ? "iconContainerGrocery" : "iconContainerEcommerce"}><i className="fa fa-shopping-cart onTransDivElement"></i></a>
                                  }
                                      <span className={data.webCategory == "Grocery" ? "iconContainerGrocery" : "iconContainerEcommerce"}><a href={"/ProductDetailsEcommerce/"+data._id}><i className="fa fa-eye onTransDivElement"></i></a></span>
                              </span> 
                             <span  className="col-lg-12 nameOfProcEcommerce">{data.productName}</span>
                             <span className="col-lg-12 starP">
                             <i className="fa fa-star" aria-hidden="true"></i>
                              <i className="fa fa-star" aria-hidden="true"></i>
                              <i className="fa fa-star" aria-hidden="true"></i>
                              <i className="fa fa-star" aria-hidden="true"></i>
                              <i className="fa fa-star" aria-hidden="true"></i>
                             </span>
                             <span className="col-lg-12 priceOfProcEcommerce"><i className={"fa fa-"+data.currency}></i>{data.offeredPrice}</span>
                          </div>
                          </div>
                          
                        </div>
                      );
                 })
          }
         </div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch)=>{
  return {
    redirectToPropertyDetails   : (count)=> dispatch({type: "CART_VALUE",
                            cartvalue:count
                  }),
  }
};
// export default connect(mapDispatchToProps)(withRouter(ProductCollageEcommerce));
// export default withRouter(ProductCollageEcommerce);
export default withRouter(ProductCollageEcommerce);
