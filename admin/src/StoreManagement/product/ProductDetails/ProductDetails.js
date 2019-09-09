import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import ReactTable             from "react-table";
import swal                   from 'sweetalert';
import _                      from 'underscore';
import './ProductDetails.css';

axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class ProductDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
            productCategoryParam    : '',
            productSubCategoryParam : '',
            productUrlParam         : '',
            productImage            : [],
            productDispalyFlip      : [],
            productData             : [],
            productVideoSelected    : [],
            productDispalyFlipType  : "",
            productDispalyFeatures  : [],
            manualPDFUrl            : "",
            BrochurePDFUrl          : "",
            InformationPDFUrl       : "",
            manualPDFUrlImage       : "/images/nopdf.png",
            BrochurePDFUrlImage     : "",
            InformationPDFUrlImage  : "/images/nopdf.png",
            productNoImageUrl       : "",
            prodImages              : '',
            productID               : this.props.match.params ? this.props.match.params.productID : "",
            featureList : []
        };
    }


    componentWillReceiveProps(nextProps) {
        var productID = nextProps.match.params.productID;
        if(nextProps){
            this.setState({
                productID : productID
            })
        }
    }



    componentDidMount() {
        this.getProductDetails(this.state.productID);
    }
    getProductDetails(productID){
        console.log('productID', productID);
        axios.get('/api/products/get/one/'+productID)
        .then((response)=>{
            console.log('response', response.data);
            this.setState({
                productName : response.data.productName,
                category    : response.data.category,
                subCategory : response.data.subCategory,
                productPrice: response.data.productPrice,
                productDetails : response.data.productDetails,
                productCode : response.data.productCode,
                featureList : response.data.featureList,
                currency : response.data.currency,
                brand : response.data.brand,
                availableQuantity : response.data.availableQuantity,
                productBrochurePDF : response.data.productBrochurePDF,
                productImage : response.data.productImage ? response.data.productImage : [],
                prodImages  : response.data.productImage[0],
                productInfoPDF : response.data.productInfoPDF
            })
        })
        .catch((error)=>{

        })
    }

    componentWillMount(){
        window.scrollTo(0, 0);
    }
    
    componentWillUnmount() {
        // $("body").find("script[src='/js/adminLte.js']").remove();
        // if(this.basicPageTracker)
        //   this.basicPageTracker.stop();
    }

    changeimageTo(event){
        var flipVal =event.target.id;
        console.log('val',flipVal);
        this.setState ({
            prodImages:flipVal,
            
        },()=>{
            console.log('productImage', this.state.prodImages);
        });         
    }
    render(){

        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="formWrapper">
                        <section className="content">
                          <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 titleaddcontact">
                                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 contactdeilsmg pageHeader">
                                      Product Display Details      
                                    </div>
                                    <hr className="hr-head container-fluid row"/>
                                </div>
                                <div className="prod-detail-main">
                                    <div className="row prod-detail-main-post">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                            <div className="row">
                                                <div className="prod-detail-top">
                                                    <div className="prod-details-top-left ">
                                                    <h3>{this.state.productName}</h3>
                                                    </div>
                                                    <div className="prod-details-top-right">
                                                    <h3>SHOP/SWINGS/WOODEN SWINGS</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                                <div className="prod-detail-left">
                                                    <div className="col-lg-12">
                                                        <div className="prod-flip-divs">

                                                        {
                                                            this.state.prodImages ?

                                                                <div className={"item img-responsiveProduct"}>
                                                                    <img className="img-responsive zoom" src={this.state.prodImages} alt="" />
                                                                </div>

                                                            :
                                                            null
                                                        }


                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="prod-detail-SelectBox1">
                                                        <div className="prod-detail-SelectBox2">
                                                            <ol className="prod-detail-SelectBox3">
                                                                {this.state.productImage.map((prodImages, index)=>{
                                                                    return(
                                                                        <li key={index}>

                                                                            <div className={(index==0?"item img-responsiveProduct ":"item img-responsiveProduct")} >
                                                                                <img className="img-responsive div-flip-type1 " id={prodImages} src={prodImages} alt="" onClick={this.changeimageTo.bind(this)} />
                                                                            </div>

                                                                        </li>
                                                                    );
                                                                    })
                                                                } 

                                                            </ol>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                                            <div className="row">
                                                <div className="prod-detail-right row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="prod-detail-header">
                                                            <h2 className="prod-detail-headerText">{this.state.productName}</h2>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="prod-detail-headerPrice">
                                                            <h2 className="prod-detail-headerTextPrice"><i className={"fa fa-"+this.state.currency}></i> {(parseInt(this.state.productPrice)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</h2>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="prod-detail-header">
                                                            <div className="prod-detail-headerText2">
                                                                {this.state.shortDescription}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/*
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <div className="prod-detail-header">
                                                    <div className="prod-detail-headerText3">
                                                    <div className="select-quantity-input">
                                                    Quantity: <input type="number" className="selectQntInp" defaultValue="1"/>
                                                    </div>
                                                    <div className="select-quantity-input">
                                                    <div className="select-add-to-cart-btn" onClick={this.onAddToCart.bind(this)}>
                                                    Add To Cart
                                                    </div>
                                                    </div>
                                                    </div>

                                                    </div>
                                                    </div>*/}
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <div className="product-details-tabs">

                                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                            <li className="nav-item active">
                                                                <a className="nav-link active" id="" data-toggle="tab" href="#linkToOverview" role="tab" aria-controls="linkToOverview" aria-selected="true">Overview</a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" id="" data-toggle="tab" href="#linkToFeatures" role="tab" aria-controls="linkToFeatures" aria-selected="false">Features</a>
                                                            </li>

                                                        </ul>
                                                        <div className="tab-content" id="myTabContent">
                                                            <div className="tab-pane active" id="linkToOverview" role="tabpanel" aria-labelledby="">
                                                                {this.state.productDetails}
                                                            </div>
                                                            <div className="tab-pane" id="linkToFeatures" role="tabpanel" aria-labelledby="">
                                                                <ul>
                                                                    {/* <li>
                                                                    <h3 className="prod-detail-feature-Title1">{this.state.productData.productName} </h3>
                                                                    <div className="prod-detail-feature-desc1">
                                                                    {this.state.productData.productDetails}
                                                                    </div>
                                                                    </li> */}
                                                                    <li>
                                                                        <h4 className="prod-detail-feature-Title2">{this.state.productName} </h4>
                                                                        <div className="prod-detail-feature-desc2">
                                                                            <ul>
                                                                                {this.state.featureList.map((dataFeatures, index)=>{
                                                                                    return (
                                                                                        <li key={index}> {dataFeatures.feature}</li>
                                                                                    );
                                                                                })}
                                                                            </ul>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
            </div>
        )
    }

}
export default ProductDetails;
