import React, { Component } from 'react';
import ReactTooltip     from 'react-tooltip';
import { render }       from 'react-dom';
import swal         from 'sweetalert';
import $            from 'jquery';
import style        from '../css/BAOnboardingForm.css';
import axios                from 'axios';
import ContactDetails     from '../contactDetails/contactDetails.js';

axios.defaults.baseURL = 'http://gangaexpressapi.iassureit.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';
export default class LocationDetails extends Component{
  constructor(props) {
      super(props);
    
      this.state = {
        'locationType'     : '--Select Location Type--',
        'addressLineone'   : '',
        'city'             : '-- Select --',
        'block'            : '-- Select --',
        'states'           : '-- Select --',
        'area'             : '-- Select --',
        'addressLinetwo'   : '',
        'pincode'          : '',
        'country'          : '-- Select --',
        'indexOneValue'    : '',
        'uderscoreId'    : '',
        'locationTypeDisable'    : true,
        'stateArray'       : [],
        'districtArray'    : [],
        'blocksArray'      : [],
        'areaArray'        : [],
        'locationInfoAdded': 0,
        'locationId'       : ''
        // 'attachedDocuments'  : '',
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleChangeCountry = this.handleChangeCountry.bind(this);
      this.handleChangeState = this.handleChangeState.bind(this);
      this.handleChangeDistrict = this.handleChangeDistrict.bind(this);
      this.handleChangeBlock= this.handleChangeBlock.bind(this);
      this.camelCase = this.camelCase.bind(this)
    }
    
    componentDidMount() {
      window.scrollTo(0, 0);
      if(this.props.contactEdit){
          this.setState({locationInfoAdded:1,  contactEdit: 1});
      }
      if(this.props.updateBasic || this.props.locationEdit){
        this.locationDetails();
      }
      
      // ---------admin lte --------- // 
      //this.locationDetails();
      // -------------- validation ------------ //
      //    if(this.props.typeOption == 'Local'){
        $.validator.addMethod("regxAlphaNum", function(value, element, regexpr) {          
        return regexpr.test(value);
      }, "Name should only contain letters.");

      $("#LocationsDetail").validate({
        rules: {
          
          area: {
            required: true,
            regxAlphaNum: /^[a-zA-Z/\s,.'-/]*$|^$/,
          },       
        },
      })
    //  jQuery.validator.setDefaults({
    //    debug: true,
    //    success: "valid"
    //  });
       $("#LocationsDetail").validate({
       rules: {
         
         addressLineone: {
           required: true,
         },
         country: {
           required: true,
         },
         // states: {
         //   required: true,
         // },
         // city: {
         //   required: true,
         // },
         // area: {
         //   required: true,
         // },
         // pincode: {
         //   required: true,
         // },
       },
       errorPlacement: function(error, element) {
           if (element.attr("name") == "locationType"){
             error.insertAfter("#Incoterms");
           }
           if (element.attr("name") == "addressLineone"){
             error.insertAfter("#Line1");
           }
           if (element.attr("name") == "addressLinetwo"){
             error.insertAfter("#Line2");
           }
           if (element.attr("name") == "country"){
             error.insertAfter("#datacountry");
           }
           // if (element.attr("name") == "states"){
           //   error.insertAfter("#Statedata");
           // }
           // if (element.attr("name") == "city"){
           //   error.insertAfter("#Citydata");
           // }
           // if (element.attr("name") == "area"){
           //   error.insertAfter("#Areadata");
           // }
           // if (element.attr("name") == "pincode"){
           //   error.insertAfter("#Pincodedata");
           // }
         }
     });
    
    $(document).ready(function(){
      var $contenta = $(".addLocationForm").hide();
      $(".button4").on("click", function(e){
        $contenta.slideToggle();
      });
    });
   }
    // -------------- disable button --------------------- //

    //----------------------- new code -------------------//
    
    camelCase(str){
      return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    }
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value
        });   

        if(name=='area'){
          var currentVal = event.currentTarget.value;
          if(currentVal.match('[a-zA-Z ]+')){
            this.setState({
                [name]: event.target.value
            }); 
          }else{
            this.setState({
                [name]: ''
            }); 
          }
        }
    }

    handleChangeCountry(event){
      const target = event.target;
      this.getStates($(target).val())
      
    }
    getStates(StateCode){
      axios.get("http://locationapi.iassureit.com/api/states/get/list/"+StateCode)
            .then((response)=>{
          
              this.setState({
                  stateArray : response.data
              })
              $('#Statedata').val(this.state.states);
            })
            .catch((error)=>{
                console.log('error', error);
            })
    }
    handleChangeState(event){
      const target = event.target;
      const stateCode = $(target).val();
      const countryCode = $("#datacountry").val();
     
      this.getDistrict(stateCode,countryCode);
       
    }
    getDistrict(stateCode,countryCode){
      axios.get("http://locationapi.iassureit.com/api/districts/get/list/"+countryCode+"/"+stateCode)
            .then((response)=>{
              this.setState({
                  districtArray : response.data
              })
              console.log(this.state.city);
              $('#Citydata').val(this.state.city);
            })
            .catch((error)=>{
                console.log('error', error);
            })
    }
    handleChangeDistrict(event){
      const target = event.target;
      const districtName = $(target).val();
      const stateCode = $('#Statedata').val();
      const countryCode = $("#datacountry").val();
      this.getBlocks(districtName,stateCode,countryCode);
    }

    handleChangeBlock(event){
      const target = event.target;
      const blockName = $(target).val();
      const districtName = $('#Citydata').val();
      const stateCode = $('#Statedata').val();
      const countryCode = $("#datacountry").val();
      this.getAreas(blockName,districtName,stateCode,countryCode);
    }
    
    getBlocks(districtName,stateCode,countryCode){
      axios.get("http://locationapi.iassureit.com/api/blocks/get/list/"+countryCode+'/'+stateCode+"/"+districtName)
            .then((response)=>{
              this.setState({
                blocksArray : response.data
              })
              $('#Blocksdata').val(this.state.block);
            })
            .catch((error)=>{
                console.log('error', error);
            })
    }
    getAreas(blockName,districtName,stateCode,countryCode){
      axios.get("http://locationapi.iassureit.com/api/areas/get/list/"+countryCode+'/'+stateCode+"/"+districtName+'/'+blockName+'/Pune city')
            .then((response)=>{
              this.setState({
                areasArray : response.data
              })
              $('#Areasdata').val(this.state.area);
            })
            .catch((error)=>{
                console.log('error', error);
            })
    }
    locationdetailBack(event){
      event.preventDefault();
      /*var id = FlowRouter.getParam('id');
      if(location.pathname == '/LocationDetails/'+id){
          FlowRouter.go("/SupplierOnboardingForm/"+id);
        }else if(location.pathname == '/LocationDetailsSTL/'+id){
          FlowRouter.go("/SupplierOnboardingFormSTL/"+id);
        }else{
          FlowRouter.go("/SupplierOnboardingFormSTM/"+id);
        }*/
    }
    locationdetailsAdd(event){
    event.preventDefault();
    var baId = this.props.baId;
    
    if($('#LocationsDetail').valid()){
      console.log(this.props.BAInfo);
      var formValues = {
                'baID'            : baId,
                locationDetails   : [
                                    {
                                      'addressLine1'    : this.refs.addressLineone.value,
                                      'addressLine2'    : this.refs.addressLinetwo.value,
                                      'countryCode'     : this.refs.country.value,
                                      'stateCode'       : this.refs.states.value,
                                      'district'        : this.refs.district.value,
                                      'city'            : this.refs.block.value,
                                      'area'            : this.refs.area.value,
                                      'pincode'         : this.refs.pincode.value
                                    }
                                    ]
                
            }
    console.log();
    axios.patch("/api/businessassociates/patch/updateBaLoc",formValues)
            .then((response)=>{
              console.log(response);        
              swal({
                    title : 'Location details are added successfully',
                    text  : 'Location details are added successfully'
                  });
              this.locationDetails();
              $(".addLocationForm").hide();
              //$("#LocationsDetail").trigger('reset');
              this.setState({
                'addressLineone'   : '',
                'addressLinetwo'   : '',
                'area'             : '',
                'pincode'          : ''
                
              });
              
              $('.inputText').val('-- Select --');
            })
            .catch((error)=>{
                console.log('error', error);
          })
    }    
           
    }

    locationdetailBtn(event){

      this.setState({'locationInfoAdded':1},function(){
        console.log('lc',this.state.locationInfoAdded);
      });
      
      event.preventDefault();
      /*if(this.state.locationType != "--Select Location Type--" || this.state.addressLineone != '' || this.state.city != '-- Select --' || this.state.states != '-- Select --' || this.state.area != '-- Select --' || this.state.addressLinetwo != '' || this.state.pincode != '' || this.state.country != '-- Select --'){
      
      swal({
        title:'abc',
        text: "It seem that you are trying to enter a location. Click 'Cancel' to continue entering location. Click 'Ok' to go to next page.But you may lose values if already entered in the location form",
        buttons: {
              cancel: {
              text: "Cancel",
              value: false,
              visible: true,
              className: "CancelButtonSwal"
              },
              confirm: {
              text: "OK",
              value: true,
              visible: true,
              className: "OkButtonSwal",
              closeModal: true
              }
            },
      })
        
      $(".OkButtonSwal").parents('.swal-button-container').addClass('postionSwalRight');
      $(".CancelButtonSwal").parents('.swal-button-container').addClass('postionSwalLeft');

    
    }*/
    }
    componentWillReceiveProps(props){
      // // console.log('props recive',props)
      if (!props.loadingState) {
        this.setState({
          stateArray: props.postState
        })
      }
      if (!props.loadingDistrict) {
        this.setState({
          districtArray: props.postDistrict
        })
      }
      if(props.typeOption == 'Local'){
        $.validator.addMethod("regxA1", function(value, element, regexpr) {          
        return regexpr.test(value);
      }, "Name should only contain letters & number.");
      $.validator.addMethod("regxAlphaNum", function(value, element, regexpr) {          
            return regexpr.test(value);
        }, "Please enter alphabets and numbers only.");

      /*jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
      });*/
        $("#LocationsDetail").validate({
      rules: {
        locationType: {
          required: true,
        },
        addressLineone: {
          required: true,
        },
        country: {
          required: true,
        },
        states: {
          required: true,
        },
        city: {
          required: true,
        },
        area: {
          required: true,
          regxAlphaNum: /^[a-zA-Z0-9/\s,.'-/]*$|^$/,
        },
        pincode: {
          required: true,
        },
      },
      errorPlacement: function(error, element) {
          if (element.attr("name") == "locationType"){
            error.insertAfter("#Incoterms");
          }
          if (element.attr("name") == "addressLineone"){
            error.insertAfter("#Line1");
          }
          if (element.attr("name") == "addressLinetwo"){
            error.insertAfter("#Line2");
          }
          if (element.attr("name") == "country"){
            error.insertAfter("#datacountry");
          }
          if (element.attr("name") == "states"){
            error.insertAfter("#Statedata");
          }
          if (element.attr("name") == "city"){
            error.insertAfter("#city");
          }
          if (element.attr("name") == "area"){
            error.insertAfter("#area");
          }
          if (element.attr("name") == "pincode"){
            error.insertAfter("#Pincodedata");
          }
        }
      });
      }else{
        $.validator.addMethod("regxA1", function(value, element, regexpr) {          
        return regexpr.test(value);
      }, "Name should only contain letters & number.");

      /*jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
      });*/
        $("#LocationsDetail").validate({
      rules: {
        locationType: {
          required: true,
        },
        addressLineone: {
          required: true,
        },
        country: {
          required: true,
        },
        
      },
      errorPlacement: function(error, element) {
          if (element.attr("name") == "locationType"){
            error.insertAfter("#Incoterms");
          }
          if (element.attr("name") == "addressLineone"){
            error.insertAfter("#Line1");
          }
          if (element.attr("name") == "addressLinetwo"){
            error.insertAfter("#Line2");
          }
          if (element.attr("name") == "country"){
            error.insertAfter("#datacountry");
          }
          
        }
      });
      }
      this.handleChange = this.handleChange.bind(this);  
    }
    locationDetails(){
      axios.get("/api/businessassociates/get/one/"+this.props.baId)
            .then((response)=>{
              this.setState({'locationarray':response.data[0].locationDetails});
            })
            .catch((error)=>{
                console.log('error', error);
          })
    }
    locationDelete(event){
      event.preventDefault();
      var locationid = $(event.currentTarget).attr('id');
      console.log(locationid);
      var baId = this.props.baId;
      console.log(baId);
      
      axios.patch("/api/businessassociates/deleteLocation/"+baId+"/"+locationid)
            .then((response)=>{
              console.log(response);         
              swal({
                    title : 'Location is removed successfully',
                    text  : 'Location is removed successfully'
                  });
              
              this.locationDetails();
            })
            .catch((error)=>{
                console.log('error', error);
          })
    }
   
    locationEditUpdate(event){
      event.preventDefault();
      $(".addLocationForm").show();
      var idOne = $(event.currentTarget).attr('id');
      this.setState({
          "updateButton"    : true,
          "locationId"      :idOne
        });
      
      var baId = this.props.baId;
      
      var parameter = {
        "baID" : baId,
        "locationID" : idOne
      }
      axios.post("/api/businessassociates/post/singleLocation", parameter)
            .then((response)=>{
              console.log(response.data[0].locationDetails[0]);
              
              this.setState({
                'addressLineone'  : response.data[0].locationDetails[0].addressLine1,
                'addressLinetwo'  : response.data[0].locationDetails[0].addressLine2,
                'states'          : response.data[0].locationDetails[0].stateCode,
                'city'            : response.data[0].locationDetails[0].district,
                'block'           : response.data[0].locationDetails[0].city,
                'area'            : response.data[0].locationDetails[0].area,
                'pincode'         : response.data[0].locationDetails[0].pincode
              });
              this.getStates(response.data[0].locationDetails[0].countryCode);

              this.getDistrict(this.state.states,response.data[0].locationDetails[0].countryCode);

              $('#datacountry').val(response.data[0].locationDetails[0].countryCode);
              
              this.getBlocks(this.state.city,this.state.states,response.data[0].locationDetails[0].countryCode);
              
              this.getAreas(this.state.block,this.state.city,this.state.states,response.data[0].locationDetails[0].countryCode);
            })
            .catch((error)=>{
                console.log('error', error);
            }) 
    }
  updateLocationDetails(event){
    event.preventDefault();
    var baId = this.props.baId;
    var locationId = this.state.locationId;
    var formValues = {
      'baID'            : baId,
      'locationID'      : locationId,
      locationDetails   : [
                          {
                            'addressLine1'    : this.refs.addressLineone.value,
                            'addressLine2'    : this.refs.addressLinetwo.value,
                            'countryCode'     : this.refs.country.value,
                            'stateCode'       : this.refs.states.value,
                            'district'        : this.refs.district.value,
                            'city'            : this.refs.block.value,
                            'area'            : this.refs.area.value,
                            'pincode'         : this.refs.pincode.value
                          }
                          ]
                      }
   
    axios.patch("/api/businessassociates/patch/updateOneBaLoc",formValues)
            .then((response)=>{
              console.log(response);        
              swal({
                    title : 'Location details are updated successfully',
                    text  : 'Location details are updated successfully'
                  });
              this.locationDetails();
              $(".addLocationForm").hide();
              //$("#LocationsDetail").trigger('reset');
              this.setState({
                'addressLineone'   : '',
                'addressLinetwo'   : '',
                'area'             : '',
                'pincode'          : ''
                
              });
              
              $('.inputText').val('-- Select --');
            })
            .catch((error)=>{
                console.log('error', error);
          })
    /*var routerIdSupplier  = FlowRouter.getParam("id");
    var route = routerIdSupplier.split('-');
    if(/[-]/.test(routerIdSupplier)){
        var routerId = routerIdSupplier.split('-')[0];
    }else{
        var routerId = routerIdSupplier;
    }
    // if (route[1]) {
    //  var routerId = route[0];
    // }else{
    //  var routerId = route[0];
    // }
    var formValues={
      'locationType'      : this.state.locationType,
      'addressLineone'    : this.state.addressLineone,
      'city'              : this.state.city,
      'states'            : this.state.states,
      'area'              : this.state.area,
      'addressLinetwo'    : this.state.addressLinetwo,
      'pincode'           : this.state.pincode,
      'country'           : this.state.country,
      'indexOneValue'   : this.state.indexOneValue,
      'uderscoreId'   : this.state.uderscoreId,
    }
    Meteor.call('editUpdatelocationDetails',formValues,
              (error,result)=>{
                if(error){
                  // console.log(error.reason);
                }else{
                 this.setState({
                  'locationType'     : '--Select Location Type--',
              'addressLineone'   : '',
              'city'             : '-- Select --',
              'states'           : '-- Select --',
              'area'             : '',
              'addressLinetwo'   : '',
              'pincode'          : '',
              'country'          : '-- Select --',
                  indexOneValue         : '',
                  uderscoreId         : '',
          'locationTypeDisable'     : false,
                  'updateButton'        : false,

                 });
                  // // console.log('in update');
          $('.button2').attr('disabled',false);
            $('.button1').attr('disabled',false);
                  swal({
                    title:'abc',
                    text:'Updated added location details.'
                  });

                  if(location.pathname == '/LocationDetails/'+routerId){
              FlowRouter.go("/LocationDetails/"+routerId);
              }else if(location.pathname == '/LocationDetails/'+routerIdSupplier){
              FlowRouter.go("/LocationDetails/"+routerIdSupplier);
              }else if(location.pathname == '/LocationDetailsSTL/'+routerId){
              FlowRouter.go("/LocationDetailsSTL/"+routerId);
              }else if(location.pathname == '/LocationDetailsSTL/'+routerIdSupplier){
              FlowRouter.go("/LocationDetailsSTL/"+routerIdSupplier);
              }else if(location.pathname == '/LocationDetailsSTM/'+routerId){
              FlowRouter.go("/LocationDetailsSTM/"+routerId);
              }else if(location.pathname == '/LocationDetailsSTM/'+routerIdSupplier){
              FlowRouter.go("/LocationDetailsSTM/"+routerIdSupplier);
              }else{
              FlowRouter.go("/LocationDetails/"+routerId);
              }
                }
            });*/
  }
  admin(event){
      event.preventDefault();
      //FlowRouter.go('/adminDashboard');  
    }
  render() {
    
    var locationDataList   =  this.props.post2;
    var locationTypeSelect   =  this.props.post3;

    var locationTypeArry = [];
    var currentCountry   = [];
    var currentState     = [];
    var currentCity      = [];
    var currentArea      = [];
    // var currentPincode   = [];

    var currentCountryVal   = (this.state.country );
    var currentStateVal   = (this.state.states );
    var currentCityVal    = (this.state.city );
    var currentAreaVal    = (this.state.area );
    
    /*for (var i = 0; i < locationTypeSelect.length; i++) {
      locationTypeArry.push({value:locationTypeSelect[i].value});
    }*/

    /*for(var k=0;k<locationDataList.length;k++){
      currentCountry.push({value:locationDataList[k].countryName});
      
      if(currentCountryVal == locationDataList[k].countryName){
        currentState.push({value:locationDataList[k].stateName});
      
        if(currentStateVal == locationDataList[k].stateName){
          currentCity.push({value:locationDataList[k].districtName});

          if(currentCityVal == locationDataList[k].districtName){
            currentArea.push({value:locationDataList[k].cityloctn});
            
            // if(currentAreaVal == locationDataList[k].cityloctn){
            //  currentPincode.push({value:locationDataList[k].pincodeloctn});
            // }
          }
        }
      }
    }*/

    /*currentCountry = currentCountry.filter((obj,index,array)=>{
      return index === array.findIndex((t)=>(
        t.value === obj.value
      ));
    });
    currentState = currentState.filter((obj,index,array)=>{
      return index === array.findIndex((t)=>(
        t.value === obj.value
      ));
    });
    currentCity = currentCity.filter((obj,index,array)=>{
      return index === array.findIndex((t)=>(
        t.value === obj.value
      ));
    });
    currentArea = currentArea.filter((obj,index,array)=>{
      return index === array.findIndex((t)=>(
        t.value === obj.value
      ));
    });*/
    // currentPincode = currentPincode.filter((obj,index,array)=>{
    //  return index === array.findIndex((t)=>(
    //    t.value === obj.value
    //  ));
    // });
  let contactDetailsForm = <ContactDetails baId={this.props.baId} BAInfo={this.props.BAInfo} 
      updateBasic={this.props.updateBasic}  contactEdit={this.props.contactEdit}/>;

  return (
    <div>
          {!this.state.locationInfoAdded && <div className="">
          <div className="col-lg-12 col-md-12 hidden-sm hidden-xs secdiv"></div>
               {
              <section className="content viewContent">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                      <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                        <div className="box col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pdcls">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                  <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Onboarding Form</h4>
                                  <div title="Go to Admin" className="col-lg-1 col-md-1 col-xs-1 col-sm-1 NOpadding-right">
                                    
                                  </div>
                                </div>
                              </div>
                  <div id="parkingreport" className="nav-center OnboardingTabs col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <ul className="nav nav-pills">
                      <li className="col-lg-2 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn1 disabled">
                        <a href="#" className="basic-info-pillss backcolor">
                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                        Basic Info 
                        </a>
                        <div className="triangleone" id="triangle-right"></div>
                      </li>
                      <li className="active col-lg-2 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn2">
                        <div className="triangletwo" id="triangle-right1"></div>
                        <a href="#" className="basic-info-pillss">
                        <i className="fa fa-map-marker iconMarginLeft" aria-hidden="true"></i>
                        Location
                        </a>
                        <div className="trianglethree triangle3" id="triangle-right"></div>
                      </li>
                      <li className="col-lg-2 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn3 disabled">
                        <div className="trianglefour" id="triangle-right2"></div>
                        <a href="#" className="basic-info-pillss backcolorAct">
                        <i className="fa fa-phone phoneIcon" aria-hidden="true"></i>
                        Contact
                        </a>
                        <div className="trianglefive forActive" id="triangle-right"></div>
                      </li>
                    </ul>
                  </div>
                  <section className="Content">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <form  className="todaysParkingReport" >
                          <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-sm-6 locationTabs">
                                   <h4 className="MasterBudgetTitle"><i className="fa fa-map-marker" aria-hidden="true"></i> Location Details</h4>
                                </div>  
                                <div className="col-lg-6 col-md-6 col-sm-6 col-sm-6 locationTabs">
                                  <div className="button4  pull-right">
                                    <i className="fa fa-plus" aria-hidden="true"></i>&nbsp;Add Location
                                  </div>
                                </div>  
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 formHrTag"></div>   
                              </div>    
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addLocationForm" >
                              <form id="LocationsDetail" >  
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 locationSupplierForm">
                                
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12  marginsB" > 
                                  <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Address Line 1 <sup className="astrick">*</sup>
                                    <a data-tip data-for='happyFace' className="pull-right"> <i className="fa fa-question-circle"></i> </a>
                                    <ReactTooltip id='happyFace' type='error'>
                                      <span>Enter alphanumeric only..</span>
                                    </ReactTooltip>
                                  </label>
                                  <input id="Line1" type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText inputTextTwo"  value={this.state.addressLineone} ref="addressLineone" name="addressLineone" onChange={this.handleChange} required/>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12  marginsB" > 
                                  <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Address Line 2</label>
                                  <input id="Line2" type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText inputTextTwo" value={this.state.addressLinetwo} ref="addressLinetwo" name="addressLinetwo" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12  marginsB" > 
                                  <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Country <sup className="astrick">*</sup>
                                  </label>
                                  <select id="datacountry" className="form-control inputText inputTextTwo col-lg-12 col-md-12 col-sm-12 col-xs-12" 
                                    ref="country" name="country" onChange={this.handleChangeCountry} >
                                    <option selected={true} disabled={true}>-- Select --</option>
                                    <option value="IN">India</option>
                                    {
                                    /* this.props.postCountry.map((Countrydata, index)=>{
                                        return(      
                                            <option  key={index}>{Countrydata.countryName}</option>
                                          );
                                        }
                                      )*/
                                    }
                                  </select>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12  marginsB" > 
                                  <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">State <sup className="astrick">*</sup>
                                  </label>
                                  <select id="Statedata" className="form-control inputText inputTextTwo col-lg-12 col-md-12 col-sm-12 col-xs-12" 
                                    ref="states" name="states" onChange={this.handleChangeState} >
                                    <option selected={true} disabled={true}>-- Select --</option>
                                    {
                                      this.state.stateArray && this.state.stateArray.length > 0 ?
                                      this.state.stateArray.map((stateData, index)=>{
                                        return(      
                                            <option key={index} value={stateData.stateCode}>{this.camelCase(stateData.stateName)}</option>
                                          );
                                        }
                                      ) : ''
                                    }
                                  </select>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12  marginsB" > 
                                  <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">District {this.props.typeOption == 'Local' ? <sup className="astrick">*</sup> : null }
                                  </label>
                                  <select id="Citydata" className="form-control inputText inputTextTwo col-lg-12 col-md-12 col-sm-12 col-xs-12" 
                                    ref="district" name="district" onChange={this.handleChangeDistrict} >
                                    <option selected={true} disabled={true}>-- Select --</option>
                                    {  
                                      this.state.districtArray && this.state.districtArray.length > 0 ?
                                      this.state.districtArray.map((districtdata, index)=>{
                                        return(      
                                            <option  key={index} value={districtdata.districtName}>{this.camelCase(districtdata.districtName)}</option>
                                          );
                                        }
                                      ) : ''
                                    }
                                    </select>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12  marginsB" > 
                                  <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">City {this.props.typeOption == 'Local' ? <sup className="astrick">*</sup> : null }
                                  </label>
                                    <select id="Blocksdata" className="form-control inputText inputTextTwo col-lg-12 col-md-12 col-sm-12 col-xs-12" 
                                     ref="block" name="block" onChange={this.handleChangeBlock} >
                                      <option selected="true" disabled="true">-- Select --</option>
                                      {
                                        this.state.blocksArray && this.state.blocksArray.length > 0 ?
                                        this.state.blocksArray.map((blockdata, index)=>{
                                          return(      
                                              <option  key={index} value={blockdata.blockName}>{this.camelCase(blockdata.blockName)}</option>
                                            );
                                          }
                                        ) : ''
                                      }
                                    </select>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12  marginsB" > 
                                  <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Area 
                                  </label>
                                    <select id="Areasdata" className="form-control inputText inputTextTwo col-lg-12 col-md-12 col-sm-12 col-xs-12" 
                                     ref="area" name="area" onChange={this.handleChange} >
                                      <option selected="true" disabled="true">-- Select --</option>
                                      {
                                        this.state.areasArray && this.state.areasArray.length > 0 ?
                                        this.state.areasArray.map((areasArray, index)=>{
                                          return(      
                                              <option  key={index} value={areasArray.areaName}>{this.camelCase(areasArray.areaName)}</option>
                                            );
                                          }
                                        ) : ''
                                      }
                                    </select>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12  marginsB" > 
                                  <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Pincode {this.props.typeOption == 'Local' ? <sup className="astrick">*</sup> : null } 
                                  </label>
                                  <input type="text" id="Pincodedata" className="form-control inputText inputTextTwo col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.pincode}  ref="pincode" name="pincode" onChange={this.handleChange} />

                                  {/*<select id="Pincodedata" className="form-control inputText inputTextTwo col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.pincode}  ref="pincode" name="pincode" onChange={this.handleChange} >
                                    <option value="">-- Select --</option>
                                    {
                                      currentPincode.map((Pincodedata, index)=>{
                                        return(      
                                            <option  key={index}>{Pincodedata.value}</option>
                                          );
                                        }
                                      )
                                    }
                                    </select>*/}
                                </div>
                                </div>
                                <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7  marginsB">
                                  { 
                                    this.state.updateButton ?
                                    <button className="button3 button6 pull-right" onClick={this.updateLocationDetails.bind(this)}>&nbsp;Update Location</button>
                                    :
                                    <button className="button3 button6 pull-right" onClick={this.locationdetailsAdd.bind(this)}>&nbsp;Submit</button>
                                  }
                                </div>
                              </form>
                              </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  marginsB">
                                  <button className="button1 pull-right" onClick={this.locationdetailBtn.bind(this)}>Next&nbsp;<i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                </div>
                          </div> 
                            
                        </form>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12 foothd">
                             <h4 className="MasterBudgetTitle">Location Details</h4>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
                            { 

                              this.state.locationarray && this.state.locationarray.length>0 ?
                              this.state.locationarray.map((location,index)=>{
                                return(
                                  <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-12 boxul1" key={index}>
                                    <div className="liheader1 col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                                    </div>
                                    <ul className="col-lg-10 col-md-10 col-sm-10 col-xs-10 palfclr addrbox">
                                      <li>{location.addressLine1} , {location.addressLine2}</li>
                                      <li>{location.countryCode},{location.stateCode}, {location.district} {location.pincode}</li>
                                    </ul>
                                    <div className="liheader1 dropdown col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                      <i className="fa fa-ellipsis-h dropbtn" aria-hidden="true"></i>
                                      <div className="dropdown-content dropdown-contentLocation">
                                        <ul className="pdcls ulbtm">
                                          <li onClick={this.locationEditUpdate.bind(this)} id={location._id} name={index}>  
                                              <a href="#"><i className="fa fa-pencil penmrleft" aria-hidden="true"></i>&nbsp;&nbsp;Edit</a>
                                            </li>
                                            <li onClick={this.locationDelete.bind(this)} id={location._id} name={index}>
                                              <a href="#"><i className="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Delete</a>
                                            </li>
                                          </ul>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })  
                              :
                              <div className="textAlign">Locations will be shown here.</div>          
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                        </div>
                        </div>
                      </div>
                    </div>
                </section>
                }
          </div>
        }
          {
              this.state.locationInfoAdded ? contactDetailsForm : null
          }
      </div>
      );
  } 
}
