import React, { Component } from 'react'

export class LoginForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:'',
             password:''
        };

        
    }

    handleChange = (event) => {
        const name = event.target.name;

        
        this.setState({[name]: event.target.value});
      }

    
      handleSubmit = (event) => {
        alert('submitted: ' + this.state.email + ', ' + this.state.password);
        event.preventDefault();
      }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                <input name="email" type="text" placeholder="email" value={this.state.email} onChange={this.handleChange} />
                </label>
                <br/>
                <label>
                <input name="password" type="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
                </label>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default LoginForm
