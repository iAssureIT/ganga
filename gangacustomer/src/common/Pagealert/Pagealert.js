import React, {Component} from 'react';
import './Pagealert.css';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
export default class Pagealert extends Component {
constructor(props) {
        super(props);
        window.scrollTo(0, 0);
    }

componentDidMount(){}  

componentWillMount() {}
  
  render() {  
        return (
                  <div className="col-lg-12 alertDisplay">
                    <div className="col-lg-8 col-lg-offset-2 message"> 

                    </div>
                  </div>
                );  
           }
}