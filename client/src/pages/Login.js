import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../containers/Header';
import Footer from '../containers/Footer';
import axios from 'axios';

export default class Login extends Component {
    state={
        email: '',
        pwd: '',
        error: null
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    submit = () => {
        axios.post('/api/v1/login', {
            email: this.state.email,
            pwd: this.state.pwd
        }, {
            withCredentials: true
        }).then(res => {
            if (res.data.success) {
                window.location = '/';
            } else {
                this.setState({error: res.data.error});
            }
        });
    }
    error = () => {
        if (this.state.error) {
            return (
                <div className="alert alert-danger">
                {this.state.error}
                </div>
            );
        }
    }
    render() {
        return (
            <div className="container-fluid">
                <Header login={this.props.login}/>
                <div className="center">
                    <div className="scol">
                        <h2 className="slim">Login <small className="slim">or signup <Link to='/signup' style={{textDecoration: 'none'}}>here</Link></small></h2>
                            {this.error()}
                            <div className="form-group">
                            <label>Email</label>
                            <input name="email" type="text" className="form-control" onChange={(e) => {this.onChange(e)}}/>
                            </div>
                            <div className="form-group">
                            <label>Password</label>
                            <input name="pwd" type="password" className="form-control" onChange={(e) => {this.onChange(e)}}/>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block" onClick={() => this.submit()}>Login</button>

                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
