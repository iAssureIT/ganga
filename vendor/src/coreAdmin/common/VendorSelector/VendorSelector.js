import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './VendorSelector.css';

export default class VendorSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
        vendorArray : []
    }
  }
  componentDidMount() {
      this.getVendorList();
  }
  getVendorList() {
    axios.get('/api/vendors/get/listbyuserid/'+localStorage.getItem('vendor_ID'))
      .then((response) => {
        console.log('res getVendorList', response);
        this.setState({
          vendorArray: response.data
        })
      })
      .catch((error) => {

      })
  }
  render() {
    return (
      <div>
        <header className=" VendorSelector">
          
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            {
                this.state.vendorArray.map((a, i)=>{
                    return(
                        <span>
                            <label className="collageSize ">
                            <input title="Please select size first." name="size" type="radio" id={a._id} />
                            <span title={a.companyName} className="collageCheck ">{a.companyName}</span>
                            </label> &nbsp; &nbsp;
                        </span>
                    );
                })
            }
          </div>
        </header>
      </div>
    );
  }
}
