import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios'
import '../App.css'

class RegisterForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name:'',
             lastName:'',
             email:'',
             password:'',
             confPassword:''
        }
    }
    
    handleChange = (event) => {
        const name = event.target.name;

        
        this.setState({[name]: event.target.value});
      }

    
      handleSubmit = (event) => {
          
        event.preventDefault(); 
        this.props.handleChange(); 
          const user={
              name: this.state.name,
              lastName: this.state.lastName,
              email: this.state.email,
              password: this.state.password,
              confPassword: this.state.confPassword
          }
          console.log(user)
        axios.post('http://localhost:3001/user/register',  {user} )
          .then(res=>{
              console.log(res);
              console.log(res.data);
              alert(res.data.message);
              this.props.history.push('/login');
          }).catch(err=>{
              console.error(err);
          });
        
      }

      
      
    render() {
        return (
            <div className="container" style={this.styles}>
            <form onSubmit={this.handleSubmit}>
                <label>
                <input name="name" type="text" placeholder="name" value={this.state.name} onChange={this.handleChange} />
                </label><br/>
                <label>
                <input name="lastName" type="text" placeholder="last name" value={this.state.lastName} onChange={this.handleChange} />
                </label><br/>
                <label>
                <input name="email" type="text" placeholder="email" value={this.state.email} onChange={this.handleChange} />
                </label><br/>
                <label>
                <input name="password" type="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
                </label><br/>
                <label>
                <input name="confPassword" type="password" placeholder="confirm password" value={this.state.confPassword} onChange={this.handleChange} />
                </label>
                <br/>
                <input type="submit" value="Submit" />
                
            </form>
            </div>
        )
    }}
    export default withRouter(RegisterForm)