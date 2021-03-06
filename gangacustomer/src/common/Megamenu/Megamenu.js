import React, {Component} from 'react';
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
  axios.get("/api/sections/get/get_megamenu_list")
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
     
      axios.get('/api/products/get/one/'+id)
      .then((response)=>{
        var totalForQantity   =   parseInt(1 * response.data.discountedPrice);
            const userid = localStorage.getItem('user_ID');
            
            const formValues = { 
                "user_ID"    : userid,
                "product_ID" : response.data._id,
                "currency" : response.data.currency,
                "productCode" : response.data.productCode,
                "productName" : response.data.productName,
                "section_ID"        : response.data.section_ID,
            "section"           : response.data.section,
            "category_ID": response.data.category_ID,
            "category": response.data.category,
            "subCategory_ID": response.data.subCategory_ID,
            "subCategory": response.data.subCategory,
                "productImage" : response.data.productImage,
                "quantity" : 1  ,
                "discountedPrice" : parseInt(response.data.discountedPrice),
                "originalPrice" : parseInt(response.data.originalPrice),
                "discountPercent" :parseInt(response.data.discountPercent),
                "totalForQantity" : totalForQantity,
                
            }
            axios.post('/api/carts/post', formValues)
            .then((response)=>{
              
            // swal(response.data.message);
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
          <ul className="main-nav textAlignCenter">
          {/*  <li className="top-level-link">
              <a href="/"><span>Home</span></a>      
            </li> */}
            
            {
              this.state.categoryData && this.state.categoryData.map((data,index)=>{


                  return(
                    <li className="top-level-link">
                      <a className="mega-menu" href={"/section/"+data.sectionUrl+'/'+data._id}><span>{data.section}</span></a>
                      <div className="sub-menu-block textAlignLeft">
                        <div className="row">
                          <div className="col-md-3 col-lg-3 col-sm-3 megamenusubwidth">
                            {
                              data.categorylist.map((cateoryDetails,catindex)=>{
                                if(!cateoryDetails.subCategory.length>0){
                                  return(
                                    <div className="col-md-12 col-lg-12 col-sm-12 megamenusubwidth1">
                                      <h1 className="sub-menu-head"><a href={"/category/"+cateoryDetails.categoryUrl+'/'+data._id+'/'+cateoryDetails._id}>{cateoryDetails.category}</a></h1>
                                    </div>
                                  );
                                }
                              })
                            }
                          </div>
                          <div className="col-md-7 col-lg-7 col-sm-7 megamenusubwidth">
                            {
                              data.categorylist.map((cateoryDetails,catindex)=>{
                                if(cateoryDetails.subCategory.length>0){
                                  return(
                                    <div className="col-md-2 col-lg-2 col-sm-2 megamenusubwidth">
                                      <h1 className="sub-menu-head"><a href={"/category/"+cateoryDetails.categoryUrl+'/'+data._id+'/'+cateoryDetails._id}>{cateoryDetails.category}</a></h1>
                                      <ul className="sub-menu-lists">
                                        {
                                          cateoryDetails.subCategory.map((subCat,subindex)=>{
                                            return(
                                                <li><a href={"/subcategory/"+data._id+'/'+cateoryDetails._id+'/'+subCat._id}>{subCat.subCategoryTitle}</a></li>
                                              );
                                          })
                                        }
                                      </ul>           
                                    </div>
                                  );
                                }
                                
                              })
                            }
                          </div>
                        </div>
                      </div>
                    </li>
                    );
                 })
              }
          </ul> 
        </nav>
    </header>  
 
);  
      }
}