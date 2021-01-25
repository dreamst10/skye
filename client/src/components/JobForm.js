import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export class JobForm extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             title:this.props.jobInfo.title,
             description:this.props.jobInfo.description
        }
    }

    handleChange = (event) => {
        const name = event.target.name;

        
        this.setState({[name]: event.target.value});
      }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                
                <input name="title" type="text" placeholder="enter job title..." value={this.state.title} onChange={this.handleChange} />
                
                <br/>
                
                
                <input name="description" type="text" placeholder="enter job description..." value={this.state.description} onChange={this.handleChange} />
                
                <br/>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default withRouter (JobForm)
