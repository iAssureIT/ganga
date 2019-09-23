import React, { Component } from 'react';
import ReactTooltip     from 'react-tooltip';
import { render }       from 'react-dom';
import swal         from 'sweetalert';
import $            from 'jquery';
import style        from '../css/BAOnboardingForm.css';
import axios                from 'axios';
import LocationDetails    from '../locationDetails/locationDetails.js';
import S3FileUpload           from 'react-s3';

// axios.defaults.baseURL = 'http://gangaapi.iassureit.com';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

class BasicInfo extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      
      'companyname'      : '',
      'emailID'          : '',
      'MobileNo'         : '',
      'pan'              : '',
      'tin'              : '',
      'website'          : '',
      'gstno'            : '',
      'category'         : '-- Select --',
      'coino'            : '',
      'mfg'              : '',
      'Evaluation'       : '',
      'score'            : '',
      'attachedDocuments': [],
      'logoUrl'             : '',
      'edit'             : props.routerId ? true : false,
      'basicInfoAdded'   : 0,
      'locationInfoAdded': 0,
      'baId'             : '',
      'updateBasic'      : 0,
      'locationEdit'     : 0,
      'contactEdit'      : 0 
      //'baId'       : '5d4a63f991ccf561c4c683cd'
    };
    
      this.handleChange = this.handleChange.bind(this);
      this.keyPress = this.keyPress.bind(this);
      this.handleOptionChange = this.handleOptionChange.bind(this);
      this.supplier = this.supplier.bind(this);
  } 
  componentDidMount() {
   
    if(this.props.match.params.BaId){

      this.setState({baId:this.props.match.params.BaId});


      axios.get("/api/businessassociates/get/one/"+this.props.match.params.BaId)
            .then((response)=>{
              this.setState({
                  baInfo      : response.data,
                  companyname : response.data[0].companyName,
                  emailID     : response.data[0].emailID,
                  MobileNo    : response.data[0].mobileNo,
                  website     : response.data[0].website,
                  pan         : response.data[0].pan,
                  gstno       : response.data[0].gstno,
                  logoUrl     : response.data[0].logo,
                  updateBasic : 1 
              })
             
            })
            .catch((error)=>{
                console.log('error', error);
            })

      if(this.props.match.params.locationEdit){
          this.setState({basicInfoAdded:1, locationEdit: 1});
      }
      if(this.props.match.params.contactEdit){
          this.setState({basicInfoAdded:1,  contactEdit: 1});
      }
             
    }
    
    var idForActive = '';
    if (idForActive) {
      $('.backcolor').addClass('activeTab');
      $('.backcolor').removeClass('inActiveTab');
      $('.forActive').addClass('activeTabTra');
      $('.forActive').removeClass('inActiveTabTra');
    }else{
      $('.backcolor').removeClass('activeTab');
      $('.backcolor').addClass('inActiveTab');
      $('.forActive').removeClass('activeTabTra');
      $('.forActive').addClass('inActiveTabTra');
    }
    // renderFunction();
    // $("#fileupload").click(function(){
    //     $("#upload-file").click();
    // });​
    window.scrollTo(0, 0);
    $.validator.addMethod("regxA1", function(value, element, regexpr) {          
      return regexpr.test(value);
    }, "Name should only contain letters & number.");
    // $.validator.addMethod("regxA2", function(value, element, regexpr) {          
    //   return regexpr.test(value);
    // }, "Please enter a valid PAN Number.");
    $.validator.addMethod("regxA3", function(value, element, regexpr) {          
      return regexpr.test(value);
    }, "Please enter a valid TIN Number.");
    $.validator.addMethod("regxA4", function(value, element, regexpr) {          
      return regexpr.test(value);
    }, "It should be www.abcd.com");
    // $.validator.addMethod("regxA5", function(value, element, regexpr) {          
    //   return regexpr.test(value);
    // }, "Please enter the valid GST number.");

    $.validator.addMethod("regxA6", function(value, element, regexpr) {          
      // // console.log('value: ',value + element);          
      return regexpr.test(value);
    }, "Please select category.");
    $.validator.addMethod("regxA7", function(value, element, regexpr) {          
      // // console.log('value: ',value + element);          
      return regexpr.test(value);
    }, "Please enter the valid COI No.");
    // $.validator.addMethod("regxA8", function(value, element, regexpr) {          
    //   // // console.log('value: ',value + element);          
    //   return regexpr.test(value);
    // }, "Please enter the valid MFG Pro.");
          
    $.validator.setDefaults({
      debug: true,
      success: "valid"
    });
    $("#BasicInfo").validate({
      rules: {
        companyname: {
          required: true,
          // regxA1: /^[A-Za-z_0-9 ][A-Za-z\d_ ]*$/,
        },
        // pan: {
        //   required: true,
        //   regxA2: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
        // },
        website: {
          required: true,
          regxA4: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/,
        },
        // gstno: {
        //   required: true,
        //   regxA5: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        // },
        category: {
          required: true,
          // regxA1: /^[A-za-z']+( [A-Za-z']+)*$|^$/,
        },
        coino: {
          required: false,
          // regxA6: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
        },
        // mfg: {
        //   required: false,
        //   regxA8: /^[0-9]{2}[A-Za-z]{2}[0-9]{7}$/,

        //   // regxA7: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
        // },
        // LogoImageUp:{
        //   required: true,

        // }

      },
        errorPlacement: function(error, element) {
              if (element.attr("name") == "companyname"){
                error.insertAfter("#basicInfo1");
              }
              // if (element.attr("name") == "pan"){
              //   error.insertAfter("#basicInfo2");
              // }
              if (element.attr("name") == "tin"){
                error.insertAfter("#basicInfo3");
              }
              if (element.attr("name") == "website"){
                error.insertAfter("#basicInfo4");
              }
              // if (element.attr("name") == "gstno"){
              //   error.insertAfter("#basicInfo5");
              // }
              if (element.attr("name") == "category"){
                error.insertAfter("#basicInfo8");
              }

              if (element.attr("name") == "coino"){
                error.insertAfter("#basicInfo6");
              }
              if (element.attr("name") == "mfg"){
                error.insertAfter("#basicInfo7");
              }
              // if (element.attr("name") == "LogoImageUp"){
              //   error.insertAfter("#LogoImageUpOne");
              // }
              
            }
      });
    $(document).ready(function(){
        $("#companyIn").keypress(function(event){
            var inputValue = event.charCode;
            if(!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0) && !(inputValue >=48 &&  inputValue <= 57)){
                event.preventDefault();
            }
        });
    });
    

  }


  componentWillUnmount(){
      $("script[src='/js/adminLte.js']").remove();
      $("link[href='/css/dashboard.css']").remove();
  }

  
  handleChange(event) {
      event.preventDefault();
      const target = event.target;
      const name = target.name;

      this.setState({
          [name]: event.target.value
      });   
  }

  handleOptionChange(event) {
      const target = event.target;
      const name = target.name;

      this.setState({
          [name]: event.target.value
      });   
  }
  supplier(event){
      event.preventDefault();
      
      if($('#BasicInfo').valid()){

          var userForm = {
            'companyName'      : this.state.companyname,
            'pwd'              : 'gangaexpress123',
            'mobileNumber'     : this.state.MobileNo,
            'emailId'          : this.state.emailID,
            'status'           : 'Active',
            'roles'            : ['ba']
          }
          axios.post("/api/users/ba",userForm)
                .then((response)=>{
                  console.log(response.data.user._id);
                  var formValues = {
                      'companyName'      : this.state.companyname,
                      'emailID'          : this.state.emailID,
                      'mobileNo'         : this.state.MobileNo,
                      'website'          : this.state.website,
                      'pan'              : this.state.pan,
                      'gstno'            : this.state.gstno,
                      'logo'             : this.state.logoUrl,
                      'userID'           : response.data.user._id
                  }
                  axios.post("/api/businessassociates/post",formValues)
                        .then((response)=>{
                          this.setState({'basicInfoAdded':1, 'baId' : response.data.id, 'BAInfo':formValues});
                          swal({
                                title : response.data.message,
                                text  : response.data.message,
                              });

                          // $("#BasicInfo").validate().reset();
                          // $('.inputText').removeClass('addclas');   
                        })
                        .catch((error)=>{
                            console.log('error', error);
                        })
                })
                .catch((error)=>{
                    console.log('error', error);
                })
            /*axios.post("/api/businessassociates/post",formValues)
            .then((response)=>{
              this.setState({'basicInfoAdded':1, 'baId' : response.data.id, 'BAInfo':formValues});
              swal({
                    title : response.data.message,
                    text  : response.data.message,
                  });

              // $("#BasicInfo").validate().reset();
              // $('.inputText').removeClass('addclas');
              this.insertBAInUser(userForm);
                  
            })
            .catch((error)=>{
                console.log('error', error);
            })*/
          
      }else{
        // $('.inputText').addClass('addclas');
        // $('inputText.error:fir').first().focus();
        $(event.target).parent().parent().find('.inputText.error:first').focus();
      }   
  }
 
  updateBA(event){
     event.preventDefault();
     if($('#BasicInfo').valid()){

          var formValues = {
              'baID'             : this.state.baId,
              'companyName'      : this.state.companyname,
              'emailID'          : this.state.emailID,
              'mobileNo'         : this.state.MobileNo,
              'website'          : this.state.website,
              'pan'              : this.state.pan,
              'logo'             : this.state.logoUrl, 
              'gstno'            : this.state.gstno
          }
          console.log(formValues);
            axios.patch("/api/businessassociates/patch",formValues)
            .then((response)=>{
              console.log(response);
              this.setState({'basicInfoAdded':1, 'baId' : this.state.baId, 'BAInfo':formValues});
              swal({
                    title : response.data.message,
                    text  : response.data.message,
                  });
              
              $('.inputText').removeClass('addclas');
            })
            .catch((error)=>{
              
                console.log('error', error);
                swal({
                    title : '',
                    text  : "Change some fields",
                  });
          })
          
      }else{
        // $('.inputText').addClass('addclas');
        // $('inputText.error:fir').first().focus();
        $(event.target).parent().parent().find('.inputText.error:first').focus();
      }
  }
  
  docBrowse(e){
    e.preventDefault();
      var fileObj = this.state.attachedDocuments;
      for (var i = 0; i < e.currentTarget.files.length; i++) {
        if(e.currentTarget.files){
        var file=e.currentTarget.files[i];
        // // console.log('file=: ',file);
        if(file){
        var fileExt=e.currentTarget.files[i].name.split('.').pop();
        // // console.log('file=: ',fileExt);
        var allowedExtensions = /(\.jpg)$/i;
          fileObj.push(file);
          console.log('fileObj',fileObj);

          this.setState({attachedDocuments : fileObj })

        }
      }           
    }
 
      
  }

  keyPressWeb = (e) => {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13 ,190,110]) !== -1 ||
           // Allow: Ctrl+A, Command+A
          (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true))||
          (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true))||
          (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true))||
          (e.keyCode === 190 && (e.ctrlKey === true || e.metaKey === true))||
          (e.keyCode === 110 && (e.ctrlKey === true || e.metaKey === true))||
           // Allow: home, end, left, right, down, up
          (e.keyCode >= 35 && e.keyCode <= 40) || e.keyCode===189  || e.keyCode===32) {
               // let it happen, don't do anything
               return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 90) ) && (e.keyCode < 96 || e.keyCode > 105  )) {
          e.preventDefault();
      }
  }
    /*======== alphanumeric  =========*/
  keyPress = (e) => {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
         // Allow: Ctrl+A, Command+A
        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true))||
        (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true))||
        (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true))||
         // Allow: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40) || e.keyCode===189  || e.keyCode===32) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if (((e.keyCode < 48 || e.keyCode > 90)) && (e.keyCode < 96 || e.keyCode > 105 || e.keyCode===190 || e.keyCode===46)) {
        e.preventDefault();
        // // console.log(e.keyCode);
    }
  }

  keyPressNumber = (e) => {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 189]) !== -1 ||
         // Allow: Ctrl+A, Command+A
        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true))||
        (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true))||
        (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true))||
         // Allow: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40) || e.keyCode===189  || e.keyCode===32) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 58)) && (e.keyCode < 96 || e.keyCode > 105 || e.keyCode===190 || e.keyCode===46)) {
        e.preventDefault();
        // // console.log(e.keyCode);
    }
  }
  clicktoattach(event){
    event.preventDefault();
    $("#upload-file").click();
  }
  uploadProductImage(event){
    event.preventDefault();
    
    var file = event.currentTarget.files[0]
    if (file) {
      var fileName  = file.name; 
      var ext = fileName.split('.').pop();  
      if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="JPG" || ext==="PNG" || ext==="JPEG"){
      
      } 
      var objTitle = { fileInfo :file };
      console.log('objTitle',objTitle);
      main().then(logoUrl=>{
          console.log('logo', logoUrl);
          this.setState({logoUrl : logoUrl})
          
      });
      async function main(){
        var config = await getConfig();
        var s3url = await s3upload(objTitle.fileInfo, config, this);
        //console.log('s3url',s3url);
        return Promise.resolve(s3url);
      }
      function s3upload(image,configuration){
        return new Promise(function(resolve,reject){
            S3FileUpload
               .uploadFile(image,configuration)
               .then((Data)=>{
                    resolve(Data.location);
               })
               .catch((error)=>{
                    console.log(error);
               })
        })
      }   
      function getConfig(){
        return new Promise(function(resolve,reject){
            axios
               .get('/api/projectSettings/get/one/s3')
               .then((response)=>{
                    console.log("proj set res = ",response.data);
                    const config = {
                        bucketName      : response.data.bucket,
                        dirName         : 'propertiesImages',
                        region          : response.data.region,
                        accessKeyId     : response.data.key,
                        secretAccessKey : response.data.secret,
                    }
                    resolve(config);                           
                })
               .catch(function(error){
                    console.log(error);
               })
        })
      }  
    }
  }
  
  attachfile(event,props){
    // event.preventDefault();

    var suppliers = this.props.post4;
    // // console.log('suppliers :',suppliers);
    var attcharr  = [];
    if (suppliers) {
      for (var i = 0; i < suppliers.length; i++) {
          var path = suppliers[i].logo
          attcharr.push({
            'location'  : suppliers[i],
            'id'        : suppliers[i]._id,
            'name'      : suppliers[i].name,
            'extension' : suppliers[i].extension,
            'path'      : suppliers[i].logo,

          });

      }
      // // console.log('hello ',attcharr);
    }
    return attcharr;
  }
  removeAttachment(event){
    event.preventDefault();
    var id = $(event.currentTarget).attr('id')
    // // console.log(id);
    /*Meteor.call('removeAttachment',id,
        function(error,result){
          if(error){
            // console.log(error.reason);
          }else{
            swal({
              title:'abc',
              text:'Attached file removed successfully.'
            });
          }
      });*/
  }
  componentWillReceiveProps(nextProps) { 
    if(nextProps.routerId && nextProps.post5){ 
      
      var lengthData = nextProps.post.length;    
      this.setState({          
        companyname                   : nextProps.post5.companyname,         
        pan                           : nextProps.post5.pan,         
        tin                           : nextProps.post5.tin,         
        website                       : nextProps.post5.website,         
        gstno                         : nextProps.post5.gstno,         
        category                      : nextProps.post5.category,                  
        coino                         : nextProps.post5.coino,         
        mfg                           : nextProps.post5.mfg,         
        score                         : nextProps.post5.score,         
        Evaluation                    : nextProps.post5.Evaluation,         
        attachedDocuments             : nextProps.post5.attachedDocuments,         
        logo                          : nextProps.post5.logo,
        edit                          : true          
      });    
    }
    this.handleChange = this.handleChange.bind(this);  
  }
  
  render() {
    let locationDetailsForm = <LocationDetails baId={this.state.baId} BAInfo={this.state.BAInfo} 
    updateBasic={this.state.updateBasic} locationEdit={this.state.locationEdit} contactEdit={this.state.contactEdit}/>
    
      return (
        <div>
            {/* Content Wrapper. Contains page content */}
            {!this.state.basicInfoAdded && <div className="">
              <div className="col-lg-12 col-md-12 hidden-sm hidden-xs secdiv"></div>
                 <section className="content">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                      <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                        <div className="box col-lg-12 col-md-12 col-xs-12 col-sm-12">
                          <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                            <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Onboarding Form</h4>
                            <div title="Go to Admin" className="col-lg-1 col-md-1 col-xs-1 col-sm-1 NOpadding-right">
                              {this.props.vendorData ? <div className="redirectToAdmin col-lg-5 col-lg-offset-7 col-md-10 col-xs-10 col-sm-10 fa fa-arrow-right"></div> : null}
                            </div>
                          </div>
                          <div id="parkingreport" className="nav-center OnboardingTabs col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <ul className="nav nav-pills ">
                              <li className="active col-lg-2 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn1">
                                <a  href="#" className="basic-info-pillss pills">
                                <i className="fa fa-info-circle" aria-hidden="true"></i>
                                Basic Info 
                                </a>
                                <div className="triangleone triangleones" id="triangle-right"></div>

                              </li>
                              <li className="col-lg-2 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn2 disabled">
                                <div className="triangletwo" id="triangle-right1"></div>
                                
                                <a  href="#" className="basic-info-pillss backcolor">
                                <i className="fa fa-map-marker iconMarginLeft" aria-hidden="true"></i>
                                Location
                                </a>
                                <div className="trianglethree forActive" id="triangle-right"></div>

                              </li>
                              <li className="col-lg-2 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn3 disabled">
                                
                                <div className="trianglefour" id="triangle-right2"></div>
                                
                                <a  href="#" className="basic-info-pillss backcolor">
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
                                <form id="BasicInfo">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                    
                                    {/*<div className="col-lg-12 col-md-12 col-sm-12 col-sm-12">*/}
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <h4 className="MasterBudgetTitle"><i className="fa fa-info-circle " aria-hidden="true"></i> Basic Info</h4>     
                                      </div> 
                                      
                                      <div className="col-lg-12 col-md-12 col-sm-12 supplierForm"> 
                     
                                        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 pdcls">
                                          <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12"> 
                                            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Company Name <i className="astrick">*</i></label>
                                            <input type="text" id="basicInfo1" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.companyname}  ref="companyname" name="companyname" onChange={this.handleChange} placeholder="Enter company name.." required/>
                                          </div>
                                          <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12 NOpadding-left NOpadding-right" > 
                                            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Email Id
                                             <a data-tip data-for='basicInfo4Tooltip' className="pull-right"> <i className="fa fa-question-circle"></i> </a>
                                              <ReactTooltip id='basicInfo4Tooltip' type='error'>
                                                <span>Please enter valid Email Id</span>
                                              </ReactTooltip>
                                            </label>
                                            <input type="text" id="basicInfo4" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" value={this.state.emailID} ref="emailID" name="emailID" onChange={this.handleChange} required/>
                                          </div>
                                          <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12" > 
                                            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Mobile No
                                             <a data-tip data-for='basicInfo4Tooltip' className="pull-right"> <i className="fa fa-question-circle"></i> </a>
                                              <ReactTooltip id='basicInfo4Tooltip' type='error'>
                                                <span>Please enter valid Mobile No</span>
                                              </ReactTooltip>
                                            </label>
                                            <input type="text" id="basicInfo4" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" value={this.state.MobileNo} ref="MobileNo" name="MobileNo" pattern="[0-9]+" onChange={this.handleChange} required/>
                                          </div>
                                          <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12 Websiteerror NOpadding-left NOpadding-right" > 
                                            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Website
                                             <a data-tip data-for='basicInfo4Tooltip' className="pull-right"> <i className="fa fa-question-circle"></i> </a>
                                              <ReactTooltip id='basicInfo4Tooltip' type='error'>
                                                <span>Please enter valid Website(www.abc.xyz).</span>
                                              </ReactTooltip>
                                            </label>
                                            <input type="text" id="basicInfo4" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" value={this.state.website} ref="website" name="website" onChange={this.handleChange}/>
                                          </div>
                                          <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12 panerror" > 
                                            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">PAN <i className="astrick"></i>
                                             <a data-tip data-for='basicInfo2Tooltip' className="pull-right"> <i className="fa fa-question-circle"></i> </a>
                                              <ReactTooltip id='basicInfo2Tooltip' type='error'>
                                                <span>Please enter valid PAN number (like this ABCDE1234Z).</span>
                                              </ReactTooltip>
                                            </label>
                                            <input type="text" id="basicInfo2" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText"  value={this.state.pan} ref="pan" name="pan" onChange={this.handleChange} placeholder="ABCDE1234Z" required/>
                                        </div>
                                        <div className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12 NOpadding-left NOpadding-right"> 
                                            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">GST No <i className="astrick"></i>
                                            <a data-tip data-for='basicInfo5Tooltip' className="pull-right"> <i className="fa fa-question-circle"></i> </a>
                                              <ReactTooltip id='basicInfo5Tooltip' type='error'>
                                                <span>Please enter valid GST number(like this 29ABCDE1234F1Z5)</span>
                                              </ReactTooltip>
                                            </label>
                                            <input type="text" id="basicInfo5" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" value={this.state.gstno} ref="gstno" name="gstno" onChange={this.handleChange} placeholder="29ABCDE1234F2Z5" required/>
                                        </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addpicmr marginsBottom" id="hide">
                                          <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12"> {this.state.logoUrl != "" ? "Change Logo" : "ADD LOGO"} </label>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos" id="LogoImageUpOne">
                                            
                                            <img src={this.state.logoUrl} className="img-responsive logoStyle" />
                                              <input type="file" className="form-control commonFilesUpld" accept=".jpg,.jpeg,.png" onChange={this.uploadProductImage.bind(this)} />
                                          </div>
                                        </div>
                                      </div>
                                      
                                    </div>
                                    
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <hr/>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 attachDocuments">
                                      Attach Documents
                                               
                                    </div>
                                    
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="hidedoc">
                                      <div className="attachDoc">
                                        <input onChange={this.docBrowse.bind(this)} type="file" multiple className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 docAttach" id="upload-file" name="upload-file"/>
                                        <i className="fa fa-upload uploadlogo uploadlogoTwo col-lg-1 col-md-1 col-sm-1 col-xs-1 clickHere" aria-hidden="true" onClick={this.clicktoattach.bind(this)}></i>
                                        <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 drag ">
                                        {/*Drag and drop or <a href="" onChange={this.docBrowse.bind(this)}>browse</a> your files*/}
                                        Drag and drop your Documents or  <a onClick={this.clicktoattach.bind(this)} className="clickHere">click here</a> to select files.Attach Document such as Technical Specification , Drawings,Designs,Images,Additional information, etc.
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
                                    {
                                      this.state.attachedDocuments.map((data,index)=>{
                                        console.log(data);
                                        return(
                                            <div className="row">
                                              <span>{data.name}</span>
                                              <i className="fa fa-times pull-right crossbtn" aria-hidden="true" id={index} onClick={this.removeAttachment.bind(this)}></i>
                                            </div>
                                          );
                                      })
                                    }


                                      {

                                        this.attachfile().map((data,index)=>{
                                            return(
                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-4" key={index} id={data.id}>
                                                  <i className="fa fa-times pull-right crossbtn" aria-hidden="true" id={data.id} onClick={this.removeAttachment.bind(this)}></i>
                                                  { data.extension == "xlsx" || data.extension == "xls" ?
                                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 attachfiles">
                                                        <img src="/images/exel.png" className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 paddingZero" download/>
                                                      </div>
                                                      :
                                                      data.extension == "pptx" || data.extension == "ppt" ?
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 attachfiles">
                                                          <img src="/images/ppt.png" className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 paddingZero" download/>
                                                        </div>
                                                        :
                                                        data.extension == "docx" || data.extension == "doc" ?
                                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 attachfiles">
                                                            <img src="/images/doc.png" className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 paddingZero" download/>
                                                          </div>
                                                          :
                                                          data.extension == "pdfx" || data.extension == "pdf" ?
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 attachfiles">
                                                              <img src="/images/pdf.png" className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 paddingZero" download/>
                                                            </div>
                                                            :
                                                             data.extension == "gif" || data.extension == "ico" || data.extension == "jpeg" || data.extension == "jpg" || data.extension == "png" || data.extension == "ps" || data.extension == "psd" || data.extension == "svg" || data.extension == "tif" || data.extension == "tiff"? 
                                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 attachfiles">
                                                                <img src={data.location.logo} className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 paddingZero" download/>
                                                              </div>
                                                              :
                                                            data.extension != "pdfx" || data.extension != "pdf" ||  data.extension != "docx" || data.extension != "doc"  ||  data.extension != "pptx" || data.extension != "ppt"  ||  data.extension != "xlsx" || data.extension != "xls" ?
                                                           
                                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 attachfiles">
                                                                <img src="/images/imgNotFound.jpg" className="img-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 paddingZero" download/>
                                                              </div>
                                                              :
                                                              null

                                                  }
                                                    <a href={data.path} download={'file.'+data.extension} className="" title={"Click to download "+data.name}>
                                                      <i className="fa fa-download"></i>
                                                    </a>
                                                </div>
                                            );
                                        })
                                      }
                                      
                                    </div>
                                    </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                      
                                        <button className="btn button3 pull-right" onClick={this.state.updateBasic ? this.updateBA.bind(this): this.supplier.bind(this)} > {this.state.updateBasic ? 'Update' : 'Save & Next'}  &nbsp;<i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                      
                                  </div> 
                                </form>
                              </div>
                            </div>
                          </section> 
                        </div>
                  </div>
                  </div>
                </div>
               </section>
            </div>
        }
          {this.state.basicInfoAdded && !this.state.locationInfoAdded ? locationDetailsForm : null}
          
          
        </div> 
       
      );  
  } 
}

export default BasicInfo
