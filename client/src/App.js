import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';

class App extends Component {
    state = {
        login: null,
        user: null
    }
    componentDidMount() {
        axios.get('/api/user')
            .then(res => {
                if (res.data.success) {
                    this.setState({login: true, user: res.data.user});
                } else {
                    this.setState({login:false});
                }
            });
    }

    render() {
        if (this.state.login === null) {
            return (
                'Loading ...'
            );
        } else {
            return (
                <BrowserRouter>
                    <Switch>
                    <Route exact path='/' render={() => <Main login={this.state.login}/>}/>
                    <Route exact path='/login' render = {() => <Login/>}/>
                    <Route exact path='/signup' render = {() => <Signup/>}/>
                    </Switch>
                </BrowserRouter>
            );
        }
    }
}

export default App;
