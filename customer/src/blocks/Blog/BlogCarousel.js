import React, { Component } from 'react';
import $ 				 from 'jquery';
import OwlCarousel 		 from 'react-owl-carousel';

import "./Blog.css";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default class BlogCarousel extends Component {
	constructor(props){
    super(props);
	   this.state = {
			blogArray:[],
		}
  	}  
  	componentDidMount(){
		const propertiesDataArray = [
			{"image":"/images/45-home_default.jpg"},
			{"image":"/images/40-home_default.jpg"},
			{"image":"/images/57-home_default.jpg"},
			{"image":"/images/44-home_default.jpg"},
			{"image":"/images/33-home_default.jpg"},
	        {"image":"/images/41-home_default.jpg"},
	        {"image":"/images/32-home_default.jpg"},
	        {"image":"/images/62-home_default.jpg"},
		];

		this.setState({
			propertiesData: propertiesDataArray,
		},()=>{});

		$.getScript('/js/carousel.js',function(){});
	}
  render() {
		return (
			
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  owl-theme">

				<OwlCarousel
				    className="owl-theme"
				    loop
				    margin={5}
				    items={3}
				    nav
				>
			    <div className="item">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogs">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 firstBlogs">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blog1 ">
									<div className="row">
										<img src="/images/blog1.jpg" alt="blog1"/>
									</div>
									<span className="nameOfBlog">Urna pretium elit mauris cursus Curabitur at elit Vestibulum</span>	
									<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 nameOfBlogger ">
										<div className="row">
										<i className="fa fa-user" aria-hidden="true"></i> &nbsp;&nbsp;Admin Admin
										</div>
									</div>
									<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 nameOfBlogger ">
										<div className="row">
										<i className="fa fa-clock-o" aria-hidden="true"></i> &nbsp;&nbsp;2013-12-18
										</div>
									</div>
									<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 comments ">
										<div className="row">
										<i className="fa fa-comments" aria-hidden="true"></i>&nbsp;&nbsp;0
										</div>
									</div><br/>
									<span className="descDiv"> Mi vitae magnis Fusce laoreet nibh felis porttitor 
									laoreet Vestibulum faucibus. At Nulla id tincidunt ut sed semper...</span>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 readMore row">
									 <a href="#">Read more</a>
									</div>
	
								</div>
				
							</div>
					</div>
				</div>
			    <div className="item">
			    	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogs">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 firstBlogs">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blog1 ">
									<div className="row">
										<img src="/images/blog2.jpg" alt="blog1"/>
									</div>
									<span className="nameOfBlog">Urna pretium elit mauris cursus Curabitur at elit Vestibulum</span>	
									<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 nameOfBlogger ">
										<div className="row">
										<i className="fa fa-user" aria-hidden="true"></i> &nbsp;&nbsp;Admin Admin
										</div>
									</div>
									<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 nameOfBlogger ">
										<div className="row">
										<i className="fa fa-clock-o" aria-hidden="true"></i> &nbsp;&nbsp;2013-12-18
										</div>
									</div>
									<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 comments ">
										<div className="row">
										<i className="fa fa-comments" aria-hidden="true"></i>&nbsp;&nbsp;0
										</div>
									</div><br/>
									<span className="descDiv"> Mi vitae magnis Fusce laoreet nibh felis porttitor 
									laoreet Vestibulum faucibus. At Nulla id tincidunt ut sed semper...</span>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 readMore row">
									 <a href="#">Read more</a>
									</div>
								</div>
							</div>
					</div>
			    </div>
			    <div className="item">
			    	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogs">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 firstBlogs">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blog1 ">
								<div className="row">
									<img src="/images/blog3.jpg" alt="blog1"/>
								</div>
								<span className="nameOfBlog">Urna pretium elit mauris cursus Curabitur at elit Vestibulum</span>	
								<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 nameOfBlogger ">
									<div className="row">
									<i className="fa fa-user" aria-hidden="true"></i> &nbsp;&nbsp;Admin Admin
									</div>
								</div>
								<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 nameOfBlogger ">
									<div className="row">
									<i className="fa fa-clock-o" aria-hidden="true"></i> &nbsp;&nbsp;2013-12-18
									</div>
								</div>
								<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 comments ">
									<div className="row">
									<i className="fa fa-comments" aria-hidden="true"></i>&nbsp;&nbsp;0
									</div>
								</div><br/>
								<span className="descDiv"> Mi vitae magnis Fusce laoreet nibh felis porttitor 
								laoreet Vestibulum faucibus. At Nulla id tincidunt ut sed semper...</span>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 readMore row">
								 <a href="#">Read more</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			    <div className="item">
			   		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogs">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 firstBlogs">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blog1 ">
								<div className="row">
									<img src="/images/blog3.jpg" alt="blog1"/>
								</div>
								<span className="nameOfBlog">Urna pretium elit mauris cursus Curabitur at elit Vestibulum</span>	
								<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 nameOfBlogger ">
									<div className="row">
									<i className="fa fa-user" aria-hidden="true"></i> &nbsp;&nbsp;Admin Admin
									</div>
								</div>
								<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 nameOfBlogger ">
									<div className="row">
									<i className="fa fa-clock-o" aria-hidden="true"></i> &nbsp;&nbsp;2013-12-18
									</div>
								</div>
								<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 comments ">
									<div className="row">
									<i className="fa fa-comments" aria-hidden="true"></i>&nbsp;&nbsp;0
									</div>
								</div><br/>
								<span className="descDiv"> Mi vitae magnis Fusce laoreet nibh felis porttitor 
								laoreet Vestibulum faucibus. At Nulla id tincidunt ut sed semper...</span>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 readMore row">
								 <a href="#">Read more</a>
								</div>
							</div>
						</div>
					</div>
			    </div>
			    <div className="item">
			   		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blogs">
						<div className="col-lg-12 col-md-4 col-sm-4 col-xs-4 firstBlogs">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blog1 ">
								<div className="row">
									<img src="/images/blog1.jpg" alt="blog1"/>
								</div>
								<span className="nameOfBlog">Urna pretium elit mauris cursus Curabitur at elit Vestibulum</span>	
								<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 nameOfBlogger ">
									<div className="row">
									<i className="fa fa-user" aria-hidden="true"></i> &nbsp;&nbsp;Admin Admin
									</div>
								</div>
								<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 nameOfBlogger ">
									<div className="row">
									<i className="fa fa-clock-o" aria-hidden="true"></i> &nbsp;&nbsp;2013-12-18
									</div>
								</div>
								<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 comments ">
									<div className="row">
									<i className="fa fa-comments" aria-hidden="true"></i>&nbsp;&nbsp;0
									</div>
								</div><br/>
								<span className="descDiv"> Mi vitae magnis Fusce laoreet nibh felis porttitor 
								laoreet Vestibulum faucibus. At Nulla id tincidunt ut sed semper...</span>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 readMore row">
								 <a href="#">Read more</a>
								</div>
							</div>
						</div>
					</div>
			    </div>
			</OwlCarousel>
		</div>
		);
	}
}



