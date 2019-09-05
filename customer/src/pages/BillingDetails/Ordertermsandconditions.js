import React, {Component}    		from 'react';
import $ 					 from 'jquery';
import _ 					 from 'underscore';
import swal 				 from 'sweetalert';
import axios 				 from 'axios';
import moment from 'moment';
import "./OrderPlaceSuccessfully.css";

class Ordertermsandconditions extends Component {
    constructor(props){
        super(props);
        this.state ={
            termsandconditions : ""
        }
    }
    componentWillMount() {    
        
    }
    componentDidMount(){
        var modal = document.getElementById('Ordertermsandconditionsmodal');
        var span = document.getElementsByClassName("Agree")[0];
		span.onclick = function() {
			modal.style.display = "none";
        }
        this.setState({
            termsandconditions : [
                'Pre-order is a term used when an item is not yet being distributed but can be ordered ahead of time. You can order the item and pay for it right now, but you won’t receive it until it becomes available.',
                'Refurbished describes a previously-used item that has been repaired, restored, or renewed in some way. This is a common term used for electronics, mainly smartphones, tablets, and computers.',
                'Back order (or backorder) is a term used when a product you would like to order, or have already ordered, is currently out of stock.'
            ]
        })
    }
       


  render(){

      return(
            <div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="" id="termsandconditions" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header headerbg">                                 
                                <h4 className="modal-title quotationHeader">Terms And Conditions of Goods/Services</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        { this.state.termsandconditions && this.state.termsandconditions.length > 0?
                                            this.state.termsandconditions.map((data, i)=>{
                                                return(
                                                    <li>{data}</li>
                                                );
                                            })
                                            :
                                            null
                                        }
                                    </div>
                                </div>
                                <div className="modal-footer termsfooter">
                                <div className="btn btn-default Agree">Okay, I Agree</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

      );
  }
}

export default Ordertermsandconditions;