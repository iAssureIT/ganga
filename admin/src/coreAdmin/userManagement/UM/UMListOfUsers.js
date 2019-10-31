import React, { Component } 		  from 'react';
import CreateUser 					       from './CreateUser.js';
import axios                        from 'axios';
import swal                     	from 'sweetalert';
import _                        from 'underscore';
import './userManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/modal.js';
import IAssureTableUM from '../../IAssureTableUM/IAssureTable.jsx';
class UMListOfUsers extends Component {
	constructor(props){
		super(props);
		this.state = {
		 	allPosts : [],
		 	"twoLevelHeader"    : {
                apply           : false,
            },
             "tableHeading"     : {
                fullName        : 'User Name',
                emailId    		: 'Email',
                mobNumber       : 'Mobile Number', 
                status        	: 'Status',
                 roles        	: 'Role',
                actions        	: 'Action',
            },
            tableObjects : {
                paginationApply : true,
                searchApply     : false,
                deleteMethod    : 'delete',
                apiLink         : '/api/users',
                editUrl         : '/umlistofusers/'
            },
            "startRange"        : 0,
            "limitRange"        : 10, 
            "selectUsers" : [],
            blockActive	  :	[],	
		}
    	this.handleChange  = this.handleChange.bind(this);
			
	}
	handleChange(event){
	  	event.preventDefault();
        const target = event.target;
        const name   = target.name;
    }

	componentDidMount(){
		this.getCount();
		this.getUser();
		this.getData(this.state.startRange, this.state.limitRange);

	}
	componentWillReceiveProps(){
		this.getCount();
	}
	getCount(){
        axios.get('/api/users/get/count')
        .then((response)=>{
            // console.log('dataCount', response.data.dataCount);
            this.setState({
                dataCount : response.data.dataCount
            },()=>{
            	// console.log('dataCount', this.state.dataCount)
            })
        })
        .catch((error)=>{
            console.log('error', error);
        })
    }
	getUser(){
		var userID = localStorage.getItem('admin_ID');
		// console.log("userID =",userID);
        axios.get('/api/users/'+userID)
        .then((response)=>{
             // console.log('dataUserDetails', response.data);
            this.setState({
                dataUserDetails : response.data.username
            },()=>{
            	 console.log('dataUserDetails', this.state.dataUserDetails)
            })
        })
        .catch((error)=>{
            console.log('error', error);
        })
    }
	getData(startRange, limitRange){    
		console.log('startRange', startRange, limitRange)
		var data = {
			"startRange"        : startRange,
            "limitRange"        : limitRange, 
		}    
       axios.post('/api/users/userslist', data)
        .then( (res)=>{  
        	// console.log('res userData============================>', res.data)
        	var tableData = res.data.map((a, i)=>{
				return {
					_id 			: a._id,
					fullName        : a.fullName,
	                emailId    		: a.emailId,
	                mobNumber       : a.mobileNumber, 
	                status        	: a.status,	
	                roles        	: a.roles,	
				}
			})
          	this.setState({
              tableData 		: tableData,          
            },()=>{
            })
        })
	    .catch((error)=>{
	      console.log("error = ",error);
	      // alert("Something went wrong! Please check Get URL.");
	    }); 
    }
    getSearchText(searchText, startRange, limitRange){
        console.log(searchText, startRange, limitRange);
        this.setState({
            tableData : []
        });
    }

    adminRolesListData(){
		// return  Meteor.roles.find({"name":{ $nin: ["superAdmin"] }}).fetch();
	}

	rolesListData(){
		// var roleSetArray = [];
		// return  Meteor.roles.find({"name":{ $nin: ["superAdmin"]}}).fetch();
	}
	performselectaction(event){
		event.preventDefault();
		console.log("event.target.name",event.target.name, event.target.value);
		this.setState({
			[event.target.name] :event.target.value
		})
		var formValues = {
			selectedAction :event.target.value,
			selectUsers    :this.state.selectUsers
			// avctive    :this.state.selectUsers
		}
		console.log('formValues', formValues);
		axios.patch('/api/users/perform/action',formValues)
		.then((result)=>{
			swal(result.data.msg);
		this.getData(this.state.startRange, this.state.limitRange);
		})
		.catch((error)=>{
			 console.log("error = ",error);

		})
	}
	getSelectedUserID(selectUsers){
		this.setState({
			selectUsers : selectUsers
		})
	}
render(){
	// console.log('this.state.completeDataCount', this.state.completeDataCount);
     return(
		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
			<div className="modal-bodyuser col-lg-12 col-md-12 col-sm-12 col-xs-12 UMbackgroundWrapper NOpadding">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 box-header with-border nopaddingum2">
					<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12  NOpadding">

						<h4 className="usrmgnttitle weighttitle">User Management</h4>
					</div>
					<div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 NOpadding">
						<div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pull-right paddingright"  id="createmodal">
							<button type="button" className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 addexamform userbtn clickforhideshow adduserbtn1" data-toggle="modal" data-target="#CreateUserModal">Add User</button>
							<CreateUser getData={this.getData.bind(this)}/>
						</div>
						<div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pull-right paddingright"  id="createmodalcl">
							<a href="/umroleslist"><button type="button" className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 addexamform clickforhideshow">Add Role</button></a>
						</div>
					</div>

				</div>
				<form className="newTemplateForm">
					<div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 usrmgnhead">
						<div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
							<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Select Action</label>
							<select onChange={this.performselectaction.bind(this)} value={this.state.userListDropdown} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPadding  form-control" id="userListDropdownId" ref="userListDropdown" name="userListDropdown" >
								<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="-" >-- Select --</option>	
								<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="blocked">Block Selected</option>	
								<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="active">Active Selected</option>
								<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="delete">Delete Selected Acccounts</option>	
							</select>
						</div> 
						<div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
							<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Select Role</label>
							<select className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPadding  form-control" ref="roleListDropdown" name="roleListDropdown" >
								<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' name="roleListDDOption">-- Select --</option>
								<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="all"   name="roleListDDOption">Show All</option>		
								<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="users" name="roleListDDOption">users</option>		
								<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="ba"    name="roleListDDOption">ba</option>		
							</select>
						</div>
						<div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
							<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Select Status</label>
							<select className=" col-col-lg-12  col-md-12 col-sm-12 col-xs-12 noPadding  form-control "onChange={this.performselectaction.bind(this)} value={this.state.userListDropdown}  ref="blockActive" value={this.state.blockActive} name="blockActive" >
								<option>-- Select --</option>	
								<option  className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37'  value="all"	data-limit='37'>Show All</option>	
								<option  className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37'  value="Blocked" data-limit='37'>Blocked</option>	
								<option  className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37'  value="Active" data-limit='37'>Active </option>	
							</select>
						</div>
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginbottom">
						<IAssureTableUM
						dataCount={this.state.dataCount}
						tableObjects={this.state.tableObjects}
						twoLevelHeader={this.state.twoLevelHeader} 
						getData={this.getData.bind(this)} 
						tableHeading={this.state.tableHeading} 
						tableData={this.state.tableData} 
						getSearchText={this.getSearchText.bind(this)} 
						getSelectedUserID = {this.getSelectedUserID.bind(this)}
						/>			
					</div>
				</form>
			</div>
		</div>
     );
    }
}


export default UMListOfUsers;