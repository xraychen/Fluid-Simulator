import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    state = {

    }
    componentWillMount() {

    }
    render() {
        return(
            <div className="col-md-5 col-sm-10 col-xs-12">
                <h1 className="slim">Create new simulation</h1>
                <form id="myForm">
                {
                    this.props.model.map(item => (
                    <div className="input-group">
                        <span className="input-group-addon" style={{minWidth: '150px'}}>{item.label}</span>
                        <input type="text" className="form-control" onChange={(e) => {this.props.onChange(e)}} name={item.name} placeholder={item.plc}/>
                    </div>
                    ))
                }
                <br/><br/>
                {
                    (this.props.login)?
                    <a className="btn btn-primary btn-block" onClick={() => {this.props.submit()}}>Create</a>
                    :
                    <a className="btn btn-primary btn-block" disabled>Create</a>
                }
                </form>
                <br/><br/>
            </div>
        );
    }
}

export default Form;
