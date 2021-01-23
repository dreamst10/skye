import axios from 'axios';
import React, { Component } from 'react'

export class LoginForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:'',
             password:'',
             user:null
        };

        
    }

    handleChange = (event) => {
        const name = event.target.name;

        
        this.setState({[name]: event.target.value});
      }

    
      handleSubmit = (event) => {
        event.preventDefault();
        const data={
            email:this.state.email,
            password:this.state.password
        }
        axios.post('http://localhost:3001/user/login', data )
        .then(res=>{
            console.log(res);
            console.log(res.data);
            alert(res.data.message);
            this.setState({user:res.data.user});
            console.log(this.state.user)
            axios.get('http://localhost:3001/',{withCredentials:'true'})
            .then(res=>{
                console.log(res);
                console.log(res.data);

            })
            //this.props.history.push('/home');
        }).catch(err=>{
            console.error(err);
            alert('wrong email or password')
        });
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
