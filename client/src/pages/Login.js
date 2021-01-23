import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import {Link} from 'react-router-dom'

export class Login extends Component {
    render() {
        return (
            <div>
                <h1>Login</h1>
                <LoginForm/>
                <p>not registered? <Link to = '/register'>Sign up</Link></p>
            </div>
        )
    }
}

export default Login
