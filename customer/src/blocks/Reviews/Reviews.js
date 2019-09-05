import React, { Component } from 'react';
import $ 				 from 'jquery';
import OwlCarousel 		 from 'react-owl-carousel';

import "./Reviews.css";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default class Reviews extends Component {
		  BlogsData(){
        return [
            {
                image      	:"/images/user2.png",
                name  		: "MARK JECNO",
                desc 		: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.",
               
            },  {
                image      	:"/images/user2.png",
                name  		: "MARK JECNO",
                desc 		: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.",
               
            }, {
                image      	:"/images/user2.png",
                name  		: "MARK JECNO",
                desc 		: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.",
               
            }
            
            
        ]
    }

  render() {
		return (
			
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 backColorSkyBlue ">
			<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12  ">

				<OwlCarousel
				    className="owl-theme"
				    loop
				    items={1}
				    autoplay={true}
				>
				{
				this.BlogsData().map((data, index)=>{
                return (
			    <div className="item" key={index}>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ht170  ">
						<div className="col-lg-2 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 miniCarReview">
							<div className="row">
								<img src={data.image}/>
							</div>
						</div>
						<div className="col-lg-7 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 nameOflinkReview">
							<div className="row">
								<span className="nameOfAuthor">{data.name}</span><br/>
								<span className="descOfBlog">{data.desc}</span>
							</div>
						</div>
						</div>
					</div>
				</div>
				);
				})
            	}
			   
			</OwlCarousel>
		</div>
		</div>
		);
	}
}



