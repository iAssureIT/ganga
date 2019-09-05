import React, { Component } 		from 'react';
import Breadcumb 					from "../../blocks/common/Breadcumb/Breadcumb.js";
import 'bootstrap/js/collapse.js';


import "./BlogView.css";

export default class BlogView extends Component {
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
					
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">

						<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 imageOfBlog">
							<img src="/images/blog1.jpg" alt="blog"/>
							<div className="blogHeading mt20">
								{this.state.nameOfBlog}
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 textStyle  mt20 ">
								<div className="row">
									<i className="fa fa-user textStyle" aria-hidden="true"></i>&nbsp;<span className="textStyle">Posted By :</span> &nbsp;{this.state.nameOfBlogger}&nbsp;&nbsp;
									<i className="fa fa-list textStyle"></i>&nbsp;<span className="textStyle" >In :</span> &nbsp;{this.state.subCategory}&nbsp;&nbsp;
									<i className="fa fa-calendar textStyle" aria-hidden="true"></i>&nbsp;<span className="textStyle">On :</span> &nbsp;{this.state.dateOfPost}&nbsp;&nbsp;
									<i className="fa fa-comments textStyle"></i>&nbsp;<span className="textStyle">Comments :</span> &nbsp;{this.state.numberOfComments}&nbsp;&nbsp;
									<i className="fa fa-heart textStyle"></i>&nbsp;<span className="textStyle">Hits :</span> &nbsp;{this.state.numberOfHits}&nbsp;&nbsp;
								</div>
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 borderBottom ">
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
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  likeDiv ">
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
							<form className="col-lg-12 col-md-12 col-sm-12 col-xs-12  commentSection ">
								<div className="row">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 commentLabel row">
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
									<div className="col-lg-9 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 categoriesContainer">
										<div className="row">
										<label>Categories</label>
										</div>
									</div>	
									<div className="col-lg-9 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 categoriesContainer">
										<div className="row">
										<div className="plusContainer accordion">Vegetables<i className="fa fa-plus-circle pull-right add"></i></div>
										  <div className="panel">
											<ul id="myDIV">
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
											</ul>	
											</div>
								
										  </div>
																																	
									</div>	
									<div className="col-lg-9 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 categoriesContainer">
										<div className="row">
										<div className="plusContainer accordion">Fruits and Berries<i className="fa fa-plus-circle pull-right"></i></div>
										  <div className="panel">
											<ul id="myDIV">
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
											</ul>	
											</div>
								
										  </div>
																																	
									</div>	
									<div className="col-lg-9 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 categoriesContainer">
										<div className="row">
										<div className="plusContainer accordion">Fruits and Berries<i className="fa fa-plus-circle pull-right"></i></div>
										  <div className="panel">
											<ul id="myDIV">
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
											</ul>	
											</div>
								
										  </div>
																																	
									</div>	
									<div className="col-lg-9 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 categoriesContainer">
										<div className="row">
										<div className="plusContainer accordion">Meat<i className="fa fa-plus-circle pull-right"></i></div>
										  <div className="panel">
											<ul id="myDIV">
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
											</ul>	
											</div>
								
										  </div>
																																	
									</div>	
									<div className="col-lg-9 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 categoriesContainer">
										<div className="row">
										<div className="plusContainer accordion">Tasty Breakfast<i className="fa fa-plus-circle pull-right"></i></div>
										  <div className="panel">
											<ul id="myDIV">
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
												<li>Potatos</li>
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
		);
	}
}
