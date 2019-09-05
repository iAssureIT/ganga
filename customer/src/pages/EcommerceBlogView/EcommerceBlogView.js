import React, { Component } 		from 'react';
import EcommerceHeader 				from "../../blocks/common/EcommerceHeader/EcommerceHeader.js";
import Breadcumb 					from "../../blocks/common/Breadcumb/Breadcumb.js";
import EcommerceFooter    			from "../../blocks/common/EcommerceFooter/EcommerceFooter.js";
import 'bootstrap/js/collapse.js';


import "./EcommerceBlogView.css";

export default class EcommerceBlogView extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	"nameOfBlogger" : "Admin",
	    	"nameOfBlog"	: "Turpis at eleifend ps mi elit Aenean porta ac sed faucibus",
	    	"subCategory"   : "Sub Category-1",
	    	"dateOfPost"    : "24-05-2019",
	    	"numberOfComments" : "0",
	    	"numberOfHits"		: "122",
	    	
	    };
  	}  
  	  	componentDidMount(){
  	  	var x = document.getElementsByClassName("add");
  	  	console.log("x=",x);
  		var acc = document.getElementsByClassName("accordion");
  		  	  	console.log("x=",acc);

		var i;

		for (i = 0; i < acc.length; i++) {
		  acc[i].addEventListener("click", function() {
		    this.classList.toggle("active");

		    var panel = this.nextElementSibling;
		    if (panel.style.display === "block") {
		      panel.style.display = "none";
		    } else {
		      panel.style.display = "block";
		    }
		  });
		}

  	}


  render() {
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
					<div className="row">
					<EcommerceHeader />
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">

						<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 imageOfBlogEcommerce">
							<img src="/images/shopBlog.jpg" alt="blog"/>
							<div className="blogHeadingEcommerce mt20">
								{this.state.nameOfBlog}
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 textStyleEcommerce  mt20 ">
								<div className="row">
									<i className="fa fa-user " aria-hidden="true"></i>&nbsp;<span className="textStyleEcommerce">Posted By :</span> &nbsp;{this.state.nameOfBlogger}&nbsp;&nbsp;
									<i className="fa fa-list "></i>&nbsp;<span className="textStyleEcommerce" >In :</span> &nbsp;{this.state.subCategory}&nbsp;&nbsp;
									<i className="fa fa-calendar " aria-hidden="true"></i>&nbsp;<span className="textStyleEcommerce">On :</span> &nbsp;{this.state.dateOfPost}&nbsp;&nbsp;
									<i className="fa fa-comments "></i>&nbsp;<span className="textStyleEcommerce">Comments :</span> &nbsp;{this.state.numberOfComments}&nbsp;&nbsp;
									<i className="fa fa-heart "></i>&nbsp;<span className="textStyleEcommerce">Hits :</span> &nbsp;{this.state.numberOfHits}&nbsp;&nbsp;
								</div>
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 borderBottom fontPT">
								<div className="row">
								<p>
									Turpis at eleifend ps mi elit Aenean porta ac sed faucibus. Nunc urna Morbi fringilla vitae orci convallis condimentum auctor sit dui. Urna pretium elit mauris cursus Curabitur at elit Vestibulum

									Odio ut pretium ligula quam Vestibulum consequat convallis fringilla Vestibulum nulla. Accumsan morbi tristique auctor. At risus pretium urna tortor metus fringilla interdum mauris tempor congue.

									Commodo laoreet semper tincidunt lorem Vestibulum nunc at In Curabitur magna. Euismod euismod Suspendisse tortor ante adipiscing risus Aenean Lorem vitae id. Odio ut pretium ligula quam Vestibulum consequat convallis fringilla Vestibulum nulla. Accumsan morbi tristique auctor Aenean nulla lacinia Nullam elit vel vel. At risus pretium urna tortor metus fringilla interdum mauris tempor congue.

									Donec tellus Nulla lorem Nullam elit id ut elit feugiat lacus. Congue eget dapibus congue tincidunt senectus nibh risus Phasellus tristique justo. Justo Pellentesque Donec lobortis faucibus Vestibulum Praesent mauris volutpat vitae metus. Ipsum cursus vestibulum at interdum Vivamus nunc fringilla Curabitur ac quis. Nam lacinia wisi tortor orci quis vitae.

									Sed mauris Pellentesque elit Aliquam at lacus interdum nascetur elit ipsum. Enim ipsum hendrerit Suspendisse turpis laoreet fames tempus ligula pede ac. Et Lorem penatibus orci eu ultrices egestas Nam quam Vivamus nibh. Morbi condimentum molestie Nam enim odio sodales pretium eros sem pellentesque. Sit tellus Integer elit egestas lacus turpis id auctor nascetur ut. Ac elit vitae.

									Mi vitae magnis Fusce laoreet nibh felis porttitor laoreet Vestibulum faucibus. At Nulla id tincidunt ut sed semper vel Lorem condimentum ornare. Laoreet Vestibulum lacinia massa a commodo habitasse velit Vestibulum tincidunt In. Turpis at eleifend ps mi elit Aenean porta ac sed faucibus. Nunc urna Morbi fringilla vitae orci convallis condimentum auctor sit dui. Urna pretium elit mauris cursus Curabitur at elit Vestibulum.
								</p>
								</div>
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  likeDivEcommerce ">
								<div className="row">
									<span>Like This </span>&nbsp;&nbsp;&nbsp; <span className="tweeterButton"><i className="fa fa-twitter" aria-hidden="true"></i>&nbsp;Tweet</span>
									&nbsp;&nbsp;<span className="likeButton"><i className="fa fa-thumbs-up"></i>&nbsp;Like</span>
									&nbsp;&nbsp;<span className="">Sign Up  to see what your friends like</span>
								</div>
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  Tags ">
								<div className="row">
									<span>Tags : </span>&nbsp;&nbsp;&nbsp; <span className="tag1">&nbsp;templete</span>
									
								</div>
							</div>
							<form className="col-lg-12 col-md-12 col-sm-12 col-xs-12  commentSectionEcommerce ">
								<div className="row">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 commentLabelEcommerce row">
										<label>Leave your comment</label>
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin1Top10">
										<div className="row">
											<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 ">
												<label></label>
											</div>
											<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 ">
												<div className="row">
												<span>Full Name</span>&nbsp;<span className="asterix">*</span>
												</div>
											</div>
											<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 ">
			                        			<input type="text" className="customInput"  placeholder="Enter your name"/>
											</div>
										</div>
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin1Top10 ">
										<div className="row">
											<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 ">
												<label></label>
											</div>
											<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 ">
												<div className="row">
												<span>E-mail</span>&nbsp;<span className="asterix">*</span>
												</div>
											</div>
											<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 ">
			                        			<input type="text" className="customInput"  placeholder="Enter your email"/>
											</div>
										</div>
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin1Top10 ">
										<div className="row">
											<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 ">
												<label></label>
											</div>
											<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 ">
												<div className="row">
												<span>Comment</span>&nbsp;<span className="asterix">*</span>
												</div>
											</div>
											<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 ">
			                        			<textarea type="text" className="customInputArea" rows="7"  placeholder="Enter your comment"></textarea>
											</div>
										</div>
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin1Top10 ">
										<div className="row">
											<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 ">
												<label></label>
											</div>
											<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 ">
												<div className="row">
												<span>Capacha</span>&nbsp;<span className="asterix">*</span>
												</div>
											</div>
											<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12   ">
												<div className="customInput capacha">89FG3S</div>
											</div>
											<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 ">
												<input type="text" className="customInput"/>
											</div>
										</div>
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin1Top10 ">
										<button className="col-lg-2 col-md-12 col-sm-12 col-xs-12 submitBtn pull-right"> Submit
										</button>
									</div>
								</div>
							</form>
						</div>
							<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 ">
								<div className="row">
									<div className="col-lg-9 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 categoriesContainerEcommerce">
										<div className="row">
										<label>Categories</label>
										</div>
									</div>	
										<div className="col-lg-9 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 categoriesContainerEcommerce">
											<div className="row">
											<div className="plusContainer accordion">Clothing<i className="fa fa-plus-circle pull-right add"></i></div>
											  <div className="panel myDIV">
												<ul>
													<li>Option</li>
													<li>Option</li>
													<li>Option</li>
													<li>Option</li>
													<li>Option</li>
													<li>Option</li>
												</ul>	
												</div>
									
											  </div>
																																		
										</div>	
										<div className="col-lg-9 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 categoriesContainerEcommerce">
											<div className="row">
											<div className="plusContainer accordion">Electronic<i className="fa fa-plus-circle pull-right"></i></div>
											  <div className="panel myDIV">
												<ul >
													<li>Option 1</li>
													<li>Option 2</li>
													<li>Option 2</li>
													<li>Option 2</li>
													<li>Option 2</li>
													<li>Option 2</li>
												</ul>	
												</div>
									
											  </div>
																																		
										</div>	
									<div className="col-lg-9 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 categoriesContainerEcommerce">
											<div className="row">
											<div className="plusContainer accordion">Cleaning<i className="fa fa-plus-circle pull-right"></i></div>
												  <div className="panel myDIV">
												<ul >
													<li>Option</li>
													<li>Option</li>
													<li>Option</li>
													<li>Option</li>
													<li>Option</li>
													<li>Option</li>
												</ul>	
												</div>
									
											  </div>
																																		
										</div>	
									<div className="col-lg-9 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 categoriesContainerEcommerce">
											<div className="row">
											<div className="plusContainer accordion">Home Decor<i className="fa fa-plus-circle pull-right"></i></div>
												<div className="panel myDIV">
												<ul >
													<li>Option</li>
													<li>Option</li>
													<li>Option</li>
													<li>Option</li>
													<li>Option</li>
													<li>Option</li>
												</ul>	
												</div>
									
											  </div>
																																		
										</div>	
									<div className="col-lg-9 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 categoriesContainerEcommerce">
											<div className="row">
											<div className="plusContainer accordion">TV & Computers<i className="fa fa-plus-circle pull-right"></i></div>
											 	<div className="panel myDIV">
												<ul >
													<li>Option</li>
													<li>Option</li>
													<li>Option</li>
													<li>Option</li>
													<li>Option</li>
													<li>Option</li>
												</ul>	
												</div>
									
											  </div>
																																		
										</div>

								</div>	
							</div>
							</div>
						</div>
					</div>
						<EcommerceFooter />
				</div>
		);
	}
}