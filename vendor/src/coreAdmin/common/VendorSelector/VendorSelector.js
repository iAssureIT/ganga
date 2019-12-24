import React, { Component } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { getProductData, getProductCount, getFile, getProductImage } from '../../../actions/index';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './VendorSelector.css';
class VendorSelector extends Component {
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
    axios.get('/api/vendors/get/listbyuserid/'+localStorage.getItem('user_ID'))
    .then((response) => {
      if(localStorage.getItem("vendor_ID")){
        // console.log('if', localStorage.getItem("vendor_ID"));
      }else{
        localStorage.setItem("vendor_ID", response.data[0]._id);
      }
      this.setState({
        vendorArray: response.data,
        vendor_ID : localStorage.getItem("vendor_ID")
      })
    })
    .catch((error) => {

    })
  }
  selectVendor(event){
    var id = event.target.id;
    localStorage.setItem("vendor_ID", id);
    var data = {
      startRange: 0,
      limitRange: 100,
      vendor_ID : localStorage.getItem("vendor_ID")
    }
    this.props.fetchproducts(data);
    this.props.fetchfile(data);
    this.props.fetchproductcount();
    this.props.fetchproductsimage();
    this.setState({
      vendor_ID : localStorage.getItem("vendor_ID")
    })
  }
  render() {
    console.log('vendor_ID',this.state.vendor_ID);
    return (
      <div>
        <header className=" VendorSelector">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            {this.state.vendorArray && this.state.vendorArray.length>0?
              this.state.vendorArray.map((a, i)=>{
                return(
                  <span>
                    <label className="collageSize ">
                    <input onChange={this.selectVendor.bind(this)} checked={this.state.vendor_ID == a._id ? true : false} name="size" type="radio" id={a._id} value={a._id} />
                    <span title={a.companyName} className="collageCheck ">{a.companyName}</span>
                    </label> &nbsp; &nbsp;
                  </span>
                );
              })
              :
              null
            }
          </div>
        </header>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
      recentProductData: state.recentProductData,
      productCount : state.productCount
  }
}
const mapDispachToProps = (dispatch) => {
  return bindActionCreators({ fetchproducts: getProductData , fetchproductcount:getProductCount, fetchfile: getFile, fetchproductsimage: getProductImage}, dispatch)
}
export default connect(mapStateToProps, mapDispachToProps)(VendorSelector);