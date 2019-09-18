import React, { Component } from 'react';
// import { render } from 'react-dom';

// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import './Footer.css';

export default class Footer extends Component {

    constructor(props){
    super(props);
        this.state = {
          categoryDetails:[]
        }
    }
    componentDidMount(){
     
      axios.get("/api/category/get/list")
                .then((response)=>{
                  this.setState({
                      categoryDetails : response.data
                  })
                })
                .catch((error)=>{
                    console.log('error', error);
                })  
    }
    render(){
       return(
        <div >
        <div className="container">
            <div className="footer col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div className="footer-middle">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 logo-nb"> 
                            <a href="/" title="">
                                <img src="/images/logo1.png" alt="" />
                            </a>
                        </div>
                        <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6"> 
                            <div className="footer-middle-contact">
                                <strong>CONTACTS</strong><br/><br/>
                                <div className="col-lg-3 icondiv">
                                    <i className="fa fa-map-marker"></i>
                                </div>
                                <div className="col-lg-9 addressDetails">  
                                <a>PO Box CT16122 Collins Street<br /> West,  Victoria 8007, Australia.</a>
                                </div>
                            </div>
                        </div> 

                        <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6">
                        <br/><br/> 
                            <div className="col-lg-3 icondiv">
                                <i className="fa fa-phone"></i>
                            </div>
                            <div className="col-lg-9 addressDetails">  
                            <a>Phone: +1 (2) 345 6789<br /> Fax: +1 (2) 345 6789</a>
                            </div>
                        </div> 

                        <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6">
                        <br/><br/> 
                            <div className="col-lg-3 icondiv">
                                <i className="fa fa-envelope"></i>
                            </div>
                            <div className="col-lg-9 addressDetails">  
                            <a>contact@yourdomain.com<br /> Support@yourdomain.com</a>
                            </div>
                        </div>

                        <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6">
                        <strong>FOLLOW US</strong><br/><br/> 
                            <div className="col-lg-12 socialMedia">  
                                <ul>
                                    <li><a className="circle spin" href="https://www.facebook.com/"> <i className="fa fa-facebook-f icon-facebook"></i></a></li>
                                    <li><a className="circle spin" href="https://twitter.com/"> <i className="fa fa-twitter icon-twitter icon-twitter"></i> </a></li>
                                    <li><a className="circle spin" href="https://plus.google.com/"> <i className="fa fa-google-plus icon-gplus"></i></a></li>
                                    <li className="ic-pinterest"><a className="circle spin" href="https://www.pinterest.com/"> <i className="fa fa-pinterest-square icon-pinterest"></i></a></li>
                                    <li><a className="circle spin" href="http://www.linkercreative.com/"> <i className="fa fa-linkedin icon-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div> 
                    </div>
                </div>
                <br />
                <br />
                <div className="categoryDiv row">
                    {
                       
                        this.state.categoryDetails && this.state.categoryDetails.map((data,index)=>{
                            var subCategoryStr = '';
                            if (data.subCategory) {
                                subCategoryStr = data.subCategory.map( (subcat) =>{
                                    return  subcat['subCategoryTitle'] ;
                                  }).join(', ');
                            }
                              
                            return(
                                <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6">
                                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 NoPadding">
                                        <strong>{data.category}</strong><br/><br/> 
                                    </div>
                                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 NoPadding">
                                        <p>
                                        {subCategoryStr}
                                        </p>
                                    </div>
                                </div>
                                );
                            
                        })
                    }
                    
                </div>
                <br />
            </div>
        </div> 
        <div className="row footer3">
            <div className="container">
            <div className="footer_bottom">
                <div className="col-sm-9 col-md-7 col-lg-6">
                    <p>GangaExpress Copyright <i className="fa fa-copyright"></i> 2019 - 2020. All Rights Reserved.</p>
                </div>
                <div className="col-sm-3 col-md-5 col-lg-6">
                <a href="#">
                    <img src="http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media/multistore/icon/icon-footer.png" alt="" />
                </a>
                </div>
            </div>
            </div>
        </div>
        </div>   
        );
  } 

}