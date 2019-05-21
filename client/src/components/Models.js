import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Models extends Component {
    models = () => {
        if (this.props.models.length > 0) {
            return (
                this.props.models.map(model => (
                    <div>
                        <div className="well">
                        <h1>Model</h1>
                        <p>
                        {this.props.model.map((item) => (
                            <span>
                            {item.label}: {model[item.name]} {item.unit} <br/>
                            </span>
                        ))}
                        </p>
                        <a className="btn btn-info" style={{minWidth: '100px'}} target="_blank" href={'demo.html?id='.concat(model.id)}>Start</a>
                        <a className="btn btn-danger" style={{minWidth: '100px', float: 'right'}} onClick={() => {this.props.delete(model.id)}}>Delete</a>
                        </div>
                    </div>
                    ))
            );
        } else {
            return null;
        }
    }
    render() {
        return(
        <div className="col-md-7 col-sm-10 col-xs-12">
            {
                (this.props.login)?
                <h1 className="slim">Your models</h1>
                :
                <h1 className="slim">Login <Link style={{textDecoration: 'none'}} to='/login'>here</Link> to create your own models</h1>
            }
            {
                this.models()
            }
            </div>
        );
    }
}

export default Models;
