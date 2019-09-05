import React, {Component} from 'react';
// import $                  from 'jquery';
import './Header.css';

import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export default class Header extends Component {
  
componentWillMount() {$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
        $(".headerflow").addClass("headerflowscroll");
    } else {
        $(".headerflow").removeClass("headerflowscroll");
    }
});
}

  render() {  
    return (
    <header className="col-lg-12 headerflow"> 
      <div className="row"> 
        <div className="navbar navbar-static-top" id="bb">
          <div className="col-lg-12">
            <div className="row"> 
             <div className="col-lg-12 top_spacing">
              <div className="row"> 
                <div className="col-lg-3">
                  <div className="navbar-header col-lg-8 col-lg-offset-2">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                    <a className="headerlogo" href="/"><img alt="Logo" src="/images/logo.png"/></a>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row"> 
                    <div className="col-lg-12">
                        <nav>
                          <label htmlFor="drop" className="toggle">&#8801; Menu</label>
                          <input type="checkbox" id="drop" />
                          <ul className="menu">
                             <li><a href="/">Home</a></li>
                             <li> 
                                <label htmlFor="drop-1" className="toggle">About Us</label>
                                <a href="/about-us">About Us <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                <input type="checkbox" id="drop-1"/>
                                <ul>
                                  <li><a href="/about-us">Company Profile</a></li>
                                  <li><a href="/founderprofile">Founder's Profile</a></li>
                                  <li><a href="/ourjourny">Our Journey</a></li>
                                </ul>
                              </li>
                              <li>  
                              <label htmlFor="drop-2" className="toggle">Services</label>
                              <a href="/services">Services <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                              <input type="checkbox" id="drop-2"/>
                              <ul>
                                <li> 
                                  <label htmlFor="drop-3" className="toggle">Downstream</label>
                                  <a href="/downstream">Downstream <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                  <input type="checkbox" id="drop-3"/>
                                  <ul>
                                    <li className="zindex">
                                    <label htmlFor="drop-4" className="toggle">Supply Chain Management</label>
                                    <a href="/supplychain">Supply Chain Management <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                    <input type="checkbox" id="drop-4"/>
                                      <ul>
                                        <li className="zindex">
                                        <label htmlFor="drop-5" className="toggle">Planning & Scheduling</label>
                                        <a href="/planningschedul">Planning & Scheduling <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                        <input type="checkbox" id="drop-5"/>
                                          <ul>
                                            <li><a href="/refineryplanning">Production Planning </a></li>
                                            <li><a href="/refineryschedule">Production Scheduling</a></li>
                                            <li><a href="/backcasting">Back Casting / Retro-Analysis</a></li>
                                            <li><a href="/lputility">LP Utilities</a></li>
                                            <li><a href="/lpconfig">LP Configuration studies</a></li>
                                          </ul>
                                        </li>
                                        <li className="zindex">
                                        <label htmlFor="drop-5" className="toggle">Supply & Distribution</label>
                                        <a href="/supplydistribute">Supply & Distribution <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                        <input type="checkbox" id="drop-5"/>
                                          <ul>
                                            <li><a href="/demandmanagement">Demand Management</a></li>
                                            <li><a href="/inventorymanagement">Inventory Management</a></li>
                                            <li><a href="/diatributionplanning">Distribution Planning & Optimization</a></li>
                                            <li><a href="/retailautomation">Retail Automation</a></li>
                                          </ul>
                                        </li>
                                        <li><a href="/">&nbsp;</a></li>
                                        <li><a href="/">&nbsp;</a></li>
                                        <li><a href="/">&nbsp;</a></li>
                                        <li><a href="/">&nbsp;</a></li>
                                      </ul>
                                    </li>
                                    <li className="zindex">
                                    <label htmlFor="drop-4" className="toggle">Manufacturing Execution System</label>
                                    <a href="/manufacturesystem">Manufacturing Execution System <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                    <input type="checkbox" id="drop-4"/>
                                      <ul>
                                        <li><a href="/productionaccounting">Production Accounting</a></li>
                                        <li><a href="/datahistorian">Real time Data Historian</a></li>
                                        <li><a href="/corporatedashboard">Corporate Dashboard & Analytics</a></li>
                                        <li><a href="/operationlogbook">Operation Logbook & Target Dashboard</a></li>
                                        <li><a href="/oilmovement">Oil Movement Management Systems</a></li>
                                      </ul>
                                    </li>
                                    <li className="zindex"><a href="/simulation">Simulation & Modelling</a></li>
                                    <li className="zindex"><a href="/energy">Energy Management</a></li>
                                    <li className="zindex"><a href="/apc-services">APC Services</a></li>
                                    <li className="zindex"><a href="/etrm">ETRM & Pricing Tool Application</a></li>
                                   </ul>
                                </li>
                                <li> 
                                  <label htmlFor="drop-3" className="toggle">Upstream</label>
                                  <a href="/upstream">Upstream <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                  <input type="checkbox" id="drop-3"/>
                                  <ul>
                                    <li className="zindex">
                                    <label htmlFor="drop-4" className="toggle">Geology & Geophysics</label>
                                    <a href="/geoligy">Geology & Geophysics <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                    <input type="checkbox" id="drop-4"/>
                                      <ul>
                                        <li><a href="/geophysicalinterpretation">Geophysical Interpretation</a></li>
                                        <li><a href="/geologicalinterpretation">Geological Interpretation</a></li>
                                        <li><a href="/petrophysicalanalysis">Petrophysical Analysis</a></li>
                                        <li><a href="/subsurfacemodeling">Subsurface Modeling</a></li>
                                      </ul>
                                    </li>
                                     <li className="zindex">
                                    <label htmlFor="drop-4" className="toggle">Reservior Management</label>
                                    <a href="/reserviormanagement">Reservior Management <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                    <input type="checkbox" id="drop-4"/>
                                      <ul>
                                        <li><a href="/reservoirengineering">Reservoir Engineering</a></li>
                                        <li><a href="/fielddevelopmentplan">Field Development Plan</a></li>
                                        <li><a href="/dynamicreservoirsimulation">Dynamic Reservoir Simulation</a></li>
                                        <li><a href="/reservoircharacterization">Reservoir Characterization</a></li>
                                      </ul>
                                    </li> 
                                    <li className="zindex">
                                    <label htmlFor="drop-4" className="toggle">Well & Drilling</label>
                                    <a href="/welldrilling">Well & Drilling <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                    <input type="checkbox" id="drop-4"/>
                                      <ul>
                                        <li><a href="/wellplanningdrilling">Well Planning & Drilling</a></li>
                                        <li><a href="/wellperformanceanalysis">Well Performance Analysis</a></li>
                                        <li><a href="/wellmodeling">Well Modeling</a></li>
                                        <li><a href="/wellloginterpretation">Well Log Interpretation</a></li>
                                        <li><a href="/welldrillingservices">Well Drilling Services</a></li>
                                        <li><a href="/welldatamanagement">Well Data Management</a></li>
                                      </ul>
                                    </li> 
                                    <li className="zindex">
                                    <label htmlFor="drop-4" className="toggle">Production Management</label>
                                    <a href="/productionmanagement">Production Management <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                    <input type="checkbox" id="drop-4"/>
                                      <ul>
                                        <li><a href="/productionengineering">Production Engineering</a></li>
                                        <li><a href="/productionmonitoringsurveillance">Production Monitoring & Surveillance</a></li>
                                        <li><a href="/productionaccountingsolution">Production Accounting</a></li>
                                        <li><a href="/productionoptimization">Production Optimization</a></li>
                                        <li><a href="/productionforecasting">Production Forecasting</a></li>
                                        <li><a href="/welltesting">Well Testing</a></li>
                                      </ul>
                                    </li> 
                                    <li className="zindex">
                                    <label htmlFor="drop-4" className="toggle">Data Management</label>
                                    <a href="/datamanagement">Data Management <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                    <input type="checkbox" id="drop-4"/>
                                      <ul>
                                        <li><a href="/seismicdatamanagement">Seismic Data Management</a></li>
                                        <li><a href="/welldatamanagements">Well Data Management </a></li>
                                        <li><a href="/realtimeproductiondatamanagement">Real-time Production Data Management</a></li>
                                        <li><a href="/datagovernance">Data Governance</a></li>
                                        <li><a href="/comprehensivemasterdatamanagement">Comprehensive E & P Master Data Management</a></li>
                                        <li><a href="/cloudbaseddatamanagement">Cloud-based Data Management</a></li>
                                      </ul>
                                    </li>
                                  </ul>
                                </li>
                                 <li> 
                                  <label htmlFor="drop-3" className="toggle">Digital Services</label>
                                  <a href="/digitalservices">Digital Services <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                  <input type="checkbox" id="drop-3"/>
                                  <ul>
                                      <li className="zindex"><a href="/digitalstratergy">Digital IT Strategy & Roadmaps</a></li>
                                      <li className="zindex"><a href="/applicationdevlopment">Application Development & Application Management (ADAM)</a></li>
                                      <li className="zindex"><a href="/enablingtechnology">Enabling Technologies</a></li>
                                      <li className="zindex"><a href="/visualizationdashboard">Visualization & Dashboards</a></li>                                     
                                      <li className="zindex"><a href="/digitalasset">Digital Asset Life Cycle Management</a></li>                                     
                                  </ul>
                                </li>
                                <li> 
                                  <label htmlFor="drop-3" className="toggle">Health Safety & Environment</label>
                                  <a href="/Healthsafty">Health Safety & Environment <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                  <input type="checkbox" id="drop-3"/>
                                  <ul>
                                      <li className="zindex"><a href="/processsafty">Process Safety Management</a></li> 
                                      <li className="zindex"><a href="/occupationhealth">Occupational Health & Safety Management</a></li> 
                                      <li className="zindex"><a href="/environmentsustain">Environmental Consulting & Sustainability Management</a></li> 
                                      <li className="zindex"><a href="/hsesystemevalution">HSE System Evaluation</a></li> 
                                      <li className="zindex"><a href="/hsebusinessprocessingmapping">HSE Business Process Framing</a></li> 
                                      <li className="zindex"><a href="/hsesolutionsimplementation">HSE Solutions Implementation</a></li> 
                                      <li className="zindex"><a href="/changemanagement">Change Management</a></li> 
                                  </ul>
                                </li>
                                 <li> 
                                  <label htmlFor="drop-3" className="toggle">Service Arms</label>
                                  <a href="/servicearms">Service Arms <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                  <input type="checkbox" id="drop-3"/>
                                  <ul>
                                      <li className="zindex"><a href="/iogimplement">iOGImplement</a></li>  
                                      <li className="zindex"><a href="/iogconsult">iOGConsult</a></li>  
                                      <li className="zindex"><a href="/iogtrain">iOGTrain</a></li>  
                                      <li className="zindex"><a href="/iogstudy">iOGStudy</a></li>  
                                  </ul>
                                </li>
                                  <li> 
                                  <label htmlFor="drop-3" className="toggle">Asset Management</label>
                                  <a href="/assetmanagement">Asset Management <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                  <input type="checkbox" id="drop-3"/>
                                  <ul>
                                     <li className="zindex"><a href="/EAM">Enterprise Asset Management</a></li>
                                     <li className="zindex">
                                    <label htmlFor="drop-4" className="toggle">Asset Reliability & Integraity Management</label>
                                    <a href="/arimanagement">Asset Reliability & Integraity Management <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                    <input type="checkbox" id="drop-4"/>
                                      <ul>
                                        <li><a href="/">Asset Criticality Analysis</a></li>
                                        <li><a href="/">Risk Based Inspection</a></li>
                                        <li><a href="/">Root Cause Analysis</a></li>
                                        <li><a href="/">Failure Mode Effect Analysis</a></li>
                                        <li><a href="/">Reliability Centered Maintenance</a></li>
                                        <li><a href="/">Asset Strategy Management</a></li>
                                        <li><a href="/">Inspection Management</a></li>
                                        <li><a href="/">Calibration Management</a></li>
                                        <li><a href="/">Reliability Availability & Maintainability (RAM) Moeling</a></li>
                                        <li><a href="/">Spares Inventory Management & Optimisation (SIMO) </a></li>
                                      </ul>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                            <li> 
                                <label htmlFor="drop-1" className="toggle">Industries</label>
                                <a href="/industries">Industries <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                <input type="checkbox" id="drop-1"/>
                                <ul>
                                  <li><a href="/refinery">Refinery</a></li>
                                  <li><a href="/petrochemicals">Petrochemicals</a></li>
                                  <li><a href="/chemicals">Chemicals</a></li>
                                  <li><a href="/lng">LNG</a></li>
                                  <li><a href="/gasprocessing">Gas Processing</a></li>
                                  <li><a href="/oilgasep">Oil & Gas E&P</a></li>
                                </ul>
                            </li>
                            <li><a href="/careers">Careers</a></li>
                            <li><a href="/resource">Resources</a></li>
                            <li><a href="/blog">Blogs</a></li>
                            <li><a href="/contact-us">Contact Us</a></li>
                          </ul>
                        </nav>
                     </div>
                    </div>
                 </div>
               </div>
             </div>
           </div>
          </div>
        </div>
      </div>
    </header>
    );  
  }
}