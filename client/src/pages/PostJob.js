import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { JobForm } from '../components/JobForm'

export class PostJob extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    handleSubmit = (data) =>{

    }
    

    render() {
        return (
            <div className="field">
                <JobForm submit={this.handleSubmit}/>
            </div>
        )
    }
}

export default withRouter (PostJob)
