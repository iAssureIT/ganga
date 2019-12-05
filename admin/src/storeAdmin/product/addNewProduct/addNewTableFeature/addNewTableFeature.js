import React, { Component }   from 'react';
import $                      from 'jquery';
import _                      from 'underscore';
import 'bootstrap/js/tab.js';

export default class AddNewTableFeature extends Component{
    constructor(props) {
      super(props);
      this.state = {
        ["feature"+props.index] : props.feature
      };
    }
    deleteProductTableRow(event){
        event.preventDefault();
        $(event.currentTarget).parent().parent().remove();
    }

    handleChange(event){
      const target = event.target;
      const name   = target.name;
      this.setState({
          [name]: event.target.value,
      });
    }
    componentWillReceiveProps(nextProps) {
      this.setState({
        ['feature'+nextProps.index] : nextProps.feature
      },()=>{
        // // console.log('feature', this.state);
      });
    }
    render(){
        return(
            <tr>
               <td className="col-lg-11">
                  <input type="text" value={this.state['feature'+this.props.index]} name={"feature"+this.props.index} onChange={this.handleChange.bind(this)} className={"featuresRef"+this.props.index + " form-control featureRefMain"} ref={"featuresRef"+this.props.index} />
                  <input type="text" value={this.state['feature'+this.props.index]} name={"feature"+this.props.index} onChange={this.handleChange.bind(this)} className={"featuresRef"+this.props.index + " form-control featureRefMain"} ref={"featuresRef"+this.props.index} />
               </td>
               <td  className="col-lg-1">
                   <div className="delete-product-table-row" onClick={this.deleteProductTableRow.bind(this)} >
                       <i className="fa fa-trash redFont" aria-hidden="true"></i>
                   </div>
               </td>
           </tr>
        );
    }
}
