import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

export class JobCard extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <div>
                <span><p>Job title: {this.props.title}, job description: {this.props.description} </p></span>
                <span><Link to={"/editjobskills/"+this.props.id} >edit job skills</Link></span>
                </div>
            </div>
        )
    }
}

export default withRouter (JobCard)
