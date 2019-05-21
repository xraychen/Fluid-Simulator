import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Header extends Component {
    logout = () => {
        axios
            .get('api/v1/logout')
            .then(res => {
                if (res.data.success) {
                    window.location = '/login';
                }
            });
    }
    render() {
        return (
            <div className="header clearfix">
                <h3>
                <Link to="/" style={{textDecoration: 'none', color: '#777'}}>Fluid simulator</Link>
                {
                    (this.props.login)?
                    <small onClick={() => {this.logout()}} style={{float: 'right', cursor: 'pointer', marginTop: '20px'}}>Logout</small>
                    :
                    null
                }
                </h3>
            </div>
        );
    }
}
