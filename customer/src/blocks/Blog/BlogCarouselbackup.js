




import React, { Component } from 'react';
import OwlCarousel 		 from 'react-owl-carousel';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import './Blog.css';

/*const OwlCarousel = Loadable({
    
  loader: () => import('react-owl-carousel'),
  loading() {
    return <div className="col-sm-12 col-xs-12 col-lg-2 col-lg-offset-5 col-md-12 loadingImg"><img src="../images/loadersglms.gif" className="img-responsive" alt="loading"/></div>
  }
});*/

export default class BlogCarousel extends Component {
    upstreamData(){
        return [
            {
                upstreamTitle : "EHS Applications in Oil & Gas",
                downstreamimg : "/images/blog1.jpg",
                upstreamLi    : "EHS software solutions facilitates streamlining all aspects environmental, health and safety programs in organization. EHS software plays a key role for providing detailed and intuitive reports on incident management, audits and inspections, risk analysis, environmental management, sustainability management, etc. These solutions are designed to increase transparency - especially in audits - and improve employee engagement."

            }, 
            {
                upstreamTitle : "Leveraging Machine Learning to add value to the Oil and Gas business.",
                downstreamimg : "/images/blog2.jpg",
                upstreamLi    : "Machine learning provides information systems the ability to automatically learn and improve from the experience, without being explicitly programmed. It is a subset of Artificial Intelligence that focuses on the development of computer programs that can access data, use patterns and inferences and use it to teach themselves."

            }, 
            {
                upstreamTitle : "Energy Management in Refineries and Petrochemicals Complex",
                downstreamimg : "/images/blog3.jpg",
                upstreamLi    : "As oil refiners face an increasingly competitive global business environment, they look out for the opportunities to reduce production costs without negatively affecting product yield or quality. Improving energy efficiency reduces operating cost and improves the refinery margin. A refinery-wide energy management system implementation is one of the most important and cost-saving initiatives an organisation can undertake."

            },
            {
                upstreamTitle : "How oil and gas industry is embracing new age technologies?",
                downstreamimg : "/images/blog3.jpg",
                upstreamLi    : "As we come to the middle of 2019, oil and gas companies worldwide are facing constant changes. Compliance, pollution control, supply-demand fluctuations, price volatility, and geopolitical changes are some of them worth mentioning."

            }
           
        ]
    }

    render(){
        return(
            <div>
                <div className="upstreamcontentheader col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 text-center ">                        
                  
                </div>
                <div className="col-lg-10 col-lg-offset-1">
                  <div>
                        <OwlCarousel
                        className="owl-theme"
                        loop
                        nav
                        dots={false}
                        items={3}
                        margin={0}
                    
                        autoplay={true}
                        autoplayHoverPause={true}
                        >
                        {
                            this.upstreamData().map((data, index)=>{
                                return (
                                <div className="col-lg-12" key={index}>
                                  <div className="">
                                    <div className={" index"+index}>
                                        <div className=" blogtext pricehover-float ">
                                            <div>
                                             <div className="blogblock col-lg-12">
                                                <div className="">
                                                  <div className="row blogsimg">
                                                    <img alt="" src={data.downstreamimg}/>
                                                  </div>
                                                    <div className=""><h4>{data.upstreamTitle}</h4></div>
                                                    <div className="">
                                                     <p>{data.upstreamLi}</p>
                                                    </div>
                                                <div className="price-footer col-lg-12">
                                                    <div className="row">
                                                        <div className="col-lg-6 blogdate">july 5,2019</div>
                                                       
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
                            })
                        }
                    </OwlCarousel>
                </div>                
              </div>                
            </div>   
        );
    }
}
