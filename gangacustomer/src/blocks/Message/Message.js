import React, { Component } from 'react';
import $                    from 'jquery';
import axios                from 'axios';
import "./Message.css";

class Message extends Component{
    constructor(props) {
        super(props);
        this.state={
            
        }
        window.scrollTo(0, 0);
    } 
    componentWillReceiveProps(nextProps){
        window.scrollTo(0, 0);
    }
    render(){
        console.log(this.props.messageData );
        return(
            <div className="">
            {
                this.props.messageData && this.props.messageData.type == 'inpage' ?
                <div className={"alert alert-"+this.props.messageData.class} role="alert">
                    <div className={this.props.messageData.icon+" inpagemessage"} dangerouslySetInnerHTML={{__html : this.props.messageData.message}}></div>
                </div>
                :
                    this.props.messageData && this.props.messageData.type == 'outpage' ?
                        <div className="row ml-auto pull-right outpageMessage">
                            <div className="alert-group">
                                <div className={"alert alert-"+this.props.messageData.class+" alert-dismissable alertMessage"}>
                                    <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                    
                                    <div className={this.props.messageData.icon+" inpagemessage"} dangerouslySetInnerHTML={{__html : this.props.messageData.message}} ></div>
                                </div>
                            </div>
                        </div>
                    :
                    null
            }
            </div>
        )
    }
}

export default Message;