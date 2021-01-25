import React, { Component } from 'react'
import RegisterForm from '../components/RegisterForm'
import {Link} from 'react-router-dom'
import '../App.css'

export default class Register extends Component {

    componentDidMount(){
        
    }


    render() {
        return (
            <div className="field">
                <h1>Register</h1>
                <RegisterForm />
                <p>already registered? <Link to = '/login'>Log in</Link></p>
            </div>
        )
    }
}
