import axios from 'axios'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { JobForm } from '../components/JobForm'

export class PostJob extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            jobInfo:{
                title:'',
                description:''
            }
            
        }
    }

    handleSubmit = (data) =>{
        const body={id:this.props.user.id,jobTitle:data.title,jobDesc:data.description}
        axios.post('http://localhost:3001/jobs/postJob', body).then(res=>{
            this.props.history.push('/editJobSkills/'+res.data.data.job_id)
        }).catch(err=>{
            console.error(err);
        })

    }
    

    render() {
        return (
            <div className="field">
                <h1>Post new job</h1>
                <JobForm submit={this.handleSubmit} jobInfo={this.state.jobInfo}/>
            </div>
        )
    }
}

export default withRouter (PostJob)
