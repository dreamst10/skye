import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import {Link} from 'react-router-dom'
import '../App.css'

export class Login extends Component {
    render() {
        return (
            <div className="field">
                <h1>Login</h1>
                <LoginForm handleUser={this.props.handleUser} handleLoggedIn={this.props.handleLoggedIn} />
                <p>not registered? <Link to = '/register'>Sign up</Link></p>
            </div>
        )
    }
}

export default Login
