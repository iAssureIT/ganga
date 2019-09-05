import React, { Component } from 'react';
import $ 				 from 'jquery';
import OwlCarousel 		 from 'react-owl-carousel';
import "./ProductCarouselEcommerce.css";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default class ProductCarouselEcommerce extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	products:[]
	    };
  	}
	 propertiesDataArray(){
        return [
            {
                image      	:"/images/bag.jpg",
                name  		: "GROCERY",
                price 		: "$1.61",
               
            }, {
                image      	:"/images/shoe.jpg",
                name  		: "LUGGEGE",
                price 		: "$1.61",
               
            }, {
                image      	:"/images/hadbag.jpg",
                name  		: "LUGGEGE",
                price 		: "$1.61",
               
            }, {
                image      	:"/images/mobile.jpg",
                name  		: "LUGGEGE",
                price 		: "$1.61",
               
            },{
                image      	:"/images/shoe.jpg",
                name  		: "LUGGEGE",
                price 		: "$1.61",
               
            },
            
            
        ]
    }
	
 
  render() {
  	
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

				<OwlCarousel
				    className="owl-theme customnNavButton"
				    loop
				    margin={5}
				    items={4}
				    nav
				>
			    {	
			    this.props.products && this.props.products.length > 0?
				this.props.products.map((data, index)=>{
				return(
			    <div class="item">
			   		<div className="item oneProp singleProc" key={index} >
						<div className="row">
                           <img src={data.productImage[0]} alt="blank" className="col-lg-12 noPad imgSize" />
                           <div className="row"><img  src={data.productImage[0]} alt="blank" className="col-lg-12  slide-left hoverImage" /></div>
                           		<span className="backColorTras">
                           			<a href="#" data-toggle="tooltip" title="Add to cart"><span className="iconContainer"><i className="fa fa-shopping-cart onTransDivElement"></i></span></a>
                           			<a href="#" data-toggle="tooltip" title="Add to fevroite"><span className="iconContainer" ><i className="fa fa-heart onTransDivElement"></i></span></a>
                           			<a href="#" data-toggle="tooltip" title="View product"><span className="iconContainer"><i className="fa fa-eye onTransDivElement"></i></span></a>
                           		</span>
                           <span className="col-lg-12 nameOfProc">{data.productName}</span>
                           <span className="col-lg-12 starP">
                           <i className="fa fa-star" aria-hidden="true"></i>
							<i className="fa fa-star" aria-hidden="true"></i>
							<i className="fa fa-star" aria-hidden="true"></i>
							<i className="fa fa-star" aria-hidden="true"></i>
							<i className="fa fa-star" aria-hidden="true"></i>
                           </span>
                           <span className="col-lg-12 priceOfProc"><i className={"fa fa-"+data.currency}> </i>{data.offeredPrice}</span>
                        </div>
                    </div>
			    </div>
			    );
				})
				:
				null
			}
						
			</OwlCarousel>
		</div>

		);
	}
}



