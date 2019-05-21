import React, { Component } from 'react';
import Header from '../containers/Header';
import Footer from '../containers/Footer';
import Form from '../components/Form';
import Models from '../components/Models';
import axios from 'axios';

let vals = {
    g : '',
    n : '',
    d : '',
    x : '',
    z : '',
    y : '',
    Nx: '',
    Nz: '',
    Ny: ''
};

let defa = {};

class modelHTML {
    constructor(label, name, val, unit) {
        this.label = label;
        this.name  = name;
        this.val   = val;
        this.unit  = unit;
        this.plc   = `${val} ${unit}`;
    }
}

class Main extends Component {
    state = {
        model: [
            new modelHTML('Gravity constant'            , 'g' , 9.8 , '(m/s^2)' ),
            new modelHTML('Viscosity constant'          , 'n' , 8E-2, '(kg/m s)'),
            new modelHTML('Density'                     , 'd' , 1E3 , '(kg/m^3)'),
            new modelHTML('Width of sink'               , 'x' , 0.3 , '(m)'     ),
            new modelHTML('Length of sink'              , 'z' , 0.1 , '(m)'     ),
            new modelHTML('Height of sink'              , 'y' , 0.1 , '(m)'     ),
            new modelHTML('Number of divisions (x axis)', 'Nx', 100 , ''        ),
            new modelHTML('Number of divisions (z axis)', 'Nz', 25  , ''        ),
            new modelHTML('Number of divisions (y axis)', 'Ny', 25  , ''        )
        ],
        models: []
    }
    fetmodels = () => {
        axios
            .get('api/model')
            .then(res => {
                if (res.data.success) {
                    this.setState({models: res.data.models_norm});
                    localStorage.setItem('models2D', JSON.stringify(res.data.models_norm));
                }
            });

    }
    onChange = (e) => {
        vals[e.target.name] = e.target.value;
    }
    delete = (model_id) => {
        axios
            .delete(`api/model/${model_id}`)
            .then(res => {
                if (res.data.success) {
                    this.setState({models: res.data.models_norm});
                    localStorage.setItem('models2D', JSON.stringify(res.data.models_norm));
                }
            });
    }
    submit = () => {
        let data = {};
        for (let ele in vals) {
            if (vals[ele] === '') {
                data[ele] = Number(defa[ele]);
            } else {
                data[ele] = Number(vals[ele]);
            }
        }
        axios
            .post('api/model', {
            data: data
        })
            .then(res => {
                if (res.data.success) {
                    this.setState({models: res.data.models_norm});
                    localStorage.setItem('models2D', JSON.stringify(res.data.models_norm));
                }
            });
    }
    componentDidMount() {
        this.state.model.forEach(ele => {
            this.setState({[ele.name]: ''});
            defa[ele.name] = ele.val;
        });
        this.fetmodels();
    }
    render() {
        console.log('state', this.state);
        return (
            <div className="container-fluid">
                <Header login={this.props.login}/>
                <div className="space-around">
                    <Form login={this.props.login} model={this.state.model} onChange={this.onChange} submit={this.submit}/>
                    <Models login={this.props.login} model={this.state.model} delete={this.delete} models={this.state.models}/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Main;
