import React, {Component}           from 'react';
import $                     from 'jquery';
import _                     from 'underscore';
import swal                  from 'sweetalert';
import axios                 from 'axios';
import moment from 'moment';
import "./OrderPlaceSuccessfully.css";

export default  class Paymentgateway extends Component {
  constructor(props) {
    super(props);

          var UserId =  localStorage.getItem("admin_ID");
          console.log("UserId ----------------------",UserId);
    this.state = {
        UserId    : UserId,
        fullname  : "",
        username  : "",
        mobNumber : "",
        userProfile : "",
        firstName : "",
        lastName  : "",
        addressLine1  : "",
        addressLine2  : "",
        city  : "",
        state  : "",
        pincode  : "",
        type  : "",
      }     
       this.handleChange = this.handleChange.bind(this);
    }
      
  handleSubmit(event) {
    var userid = this.state.UserId;
    var formvalues = {
      "firstName"     : this.refs.firstName.value,
      "lastName"      : this.refs.lastName.value,
      "emailId"       : this.refs.username.value,
      "mobileNumber"  : this.refs.mobNumber.value,
      "userAddress" : {
        "addressLine1"  : this.refs.addressLine1.value,
        "addressLine2"  : this.refs.addressLine2.value,
        "block"         : this.refs.block.value,
        "country"       : this.refs.country.value,
        "city"          : this.refs.city.value,
        "state"         : this.refs.state.value,
        "pincode"       : this.refs.pincode.value,
        "type"          : this.refs.addType.value,
      }
    }
    console.log("formvalues",formvalues);
        axios.patch('/api/users/useraddress/'+userid, formvalues)
        .then((response)=> {    
          swal({
            title:"User updated successfully",
            text:"User updated successfully",
          });   
           // this.props.history.push('/umlistofusers'); 
          console.log('response --==',response);
        })
        .catch(function (error) {
          console.log('error============',error);
        });
  }

  handleChange(event){
      event.preventDefault();
          const target = event.target;
          const name   = target.name;
  }
  
  componentDidMount(){
    console.log("here edit view");
    var userid = this.state.UserId;
    console.log("userid-----------------------------------------",userid);
     axios.get('/api/users/'+ userid)
        .then( (res)=>{
          this.refs.firstName.value = res.data.profile.firstName;
          this.refs.lastName.value = res.data.profile.lastName;
          this.refs.username.value = res.data.profile.emailId;
          this.refs.mobNumber.value = res.data.profile.mobileNumber;

          this.refs.addressLine1.value = res.data.userAddress.addressLine1;
          this.refs.addressLine2.value = res.data.userAddress.addressLine2;
          this.refs.block.value = res.data.userAddress.block;
          this.refs.city.value = res.data.userAddress.city;
          this.refs.country.value = res.data.userAddress.country;
          this.refs.pincode.value = res.data.userAddress.pincode;
          this.refs.state.value = res.data.userAddress.state;
          this.refs.type.value = res.data.userAddress.type;
        })
        .catch((error)=>{
          console.log("error = ",error);
          // alert("Something went wrong! Please check Get URL.");
        });
        var modal = document.getElementById('paymentgatewayformmodal');
        var span = document.getElementsByClassName("Agree")[0];
        span.onclick = function() {
         modal.style.display = "none";
        }

  }
    
  render(){      
    return (
        <div>
          <div>                 
              <div className="">                  
                    <section className="content viewContent">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                          <div className="box">                          
                            <div className="box-header with-border boxMinHeight">
                      <div className="box-body">                        
                        <div className="col-lg-8 col-lg-offset-2 col-sm-10 col-sm-offset-1 col-xs-12 col-md-12  EditUserProfileWrap">
                          <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
                              <div className="col-lg-12 wishlistheader">
                                    <div className="">
                                        <div className="text-center">
                                            Payment Information
                                        </div>
                                    </div>
                              </div>
                            <div className=" col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                <div className=" col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent">
                                  <label className="formLable">Name On Card <label className="requiredsign">*</label></label>
                                  <span className="blocking-span">
                                   <div className="input-group inputBox-main  new_inputbx " >
                                     <div className="input-group-addon remove_brdr inputIcon">
                                     <i className="fa fa-user-circle fa "></i>
                                    </div>  
                                      <input type="text" style={{textTransform:'capitalize'}}
                                       className="form-control UMname inputText form-control  has-content"
                                        id="firstName" ref="firstName" name="firstName" onChange={this.handleChange}  placeholder="First Name"/>
                                   </div>   
                                  </span>
                                </div>
                                <div className="col-lg-6 col-sm-6 col-xs-6 col-md-6 group  inputContent">
                                    <label className="formLable">Card Number <label className="requiredsign">*</label></label>
                                    <span className="blocking-span">
                                     <div className="input-group inputBox-main  new_inputbx " >
                                       <div className="input-group-addon remove_brdr inputIcon">
                                      <i className="fa fa-mobile"></i>
                                      </div>  
                                        <input type="text" style={{textTransform:'capitalize'}}
                                         className="form-control UMname inputText form-control  has-content"
                                          id="mobNumber" ref="mobNumber" name="mobNumber"  onChange={this.handleChange} placeholder="mobile number"/>
                                     </div>   
                                    </span>
                                </div> 
                                <div className="col-lg-6 col-sm-6 col-xs-6 col-md-6 group btmmargin inputContent">
                                    <label className="formLable">CV Code</label>
                                    <span className="blocking-span">
                                     <div className="input-group inputBox-main  new_inputbx " >
                                       <div className="input-group-addon remove_brdr inputIcon">
                                      <i className="fa fa-map-marker  "></i>
                                      </div>  
                                        <input type="text" style={{textTransform:'capitalize'}}
                                         className="form-control UMname inputText form-control  has-content"
                                          id="pincode" ref="pincode" name="pincode"  onChange={this.handleChange} placeholder="Ex : 412201"/>
                                     </div>   
                                    </span>
                                </div> 
                            </div> 
                          </div>
                            <div className="col-lg-6 col-sm-12 col-xs-12 col-md-12 pull-right btmmargin Agree userProfileEditBtn">
                                <div  className="btn buttonhover Agree usereditbtn pull-right">&nbsp; &nbsp;Submit&nbsp; &nbsp;</div>
                            </div>
                          </div>
                        </div>  
                    </div>
                    </div>
                  </div>
                  </div>
                  </section>
                </div>
              </div>
                  
            </div>
          );
          
        

  } 

}

