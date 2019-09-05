import React, { Component } 		from 'react';
import EcommerceHeader 				from "../../blocks/common/EcommerceHeader/EcommerceHeader.js";
import Breadcumb 					from "../../blocks/common/Breadcumb/Breadcumb.js";
import EcommerceFooter    			from "../../blocks/common/EcommerceFooter/EcommerceFooter.js";
import Pagination 			from "react-js-pagination";

import 'bootstrap/js/collapse.js';


import "./AllBlogs.css";

export default class AllBlogs extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	blogDetails:[
	    	{"nameOfBlogger" : "Admin",
	    	"nameOfBlog"	: "Turpis at eleifend ps mi elit Aenean porta ac sed faucibus",
	    	"subCategory"   : "Sub Category-1",
	    	"dateOfPost"    : "24-05-2019",
	    	"numberOfComments" : "0",
	    	"numberOfHits"		: "122",
	    	}]
	    	
	    };
  	}  
  		handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
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
  	console.log(this.state.blogDetails);
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
					<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop180">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
					     
						{
							this.state.blogDetails &&this.state.blogDetails>0 ?
							this.state.blogDetails.map((data,index)=>{
							return(
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 imageOfBlogEcommerce mt20">
										<img src="/images/shopBlog.jpg" alt="blog"/>
										<div className="blogHeadingEcommerce mt20">
											{data.nameOfBlog}
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
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 borderBottomAllBlog fontPT">
											<div className="row">
											<p>
												Turpis at eleifend ps mi elit Aenean porta ac sed faucibus. Nunc urna Morbi fringilla vitae orci convallis condimentum auctor sit dui. Urna pretium elit mauris cursus Curabitur at elit Vestibulum

												Odio ut pretium ligula quam Vestibulum consequat convallis fringilla Vestibulum nulla. Accumsan morbi tristique auctor. At risus pretium urna tortor metus fringilla interdum mauris tempor congue.

												Commodo laoreet semper tincidunt lorem Vestibulum nunc at In Curabitur magna....

												</p>
												<span className="redirectSpan"><a href="/EcommerceBlogView"> Read More.</a></span>
											</div>
										</div>
										);
										}
									}

									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite">
										<Pagination
										          activePage={this.state.activePage}
										          itemsCountPerPage={10}
										          totalItemsCount={450}
										          prevPageText={"Previous"}
										          nextPageText={"Next"}
										          pageRangeDisplayed={2}
										          onChange={this.handlePageChange.bind(this)}
										        />
									</div>		
								</div>
						
						   	);

					    	})
							:
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noBlogs marginTop180">
								<label> No Blogs Added Yet.</label>
							</div>

						}
							
						</div>
						
					</div>
				</div>
			</div>
		);
	}
}
