import axios from 'axios'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { JobForm } from '../components/JobForm'

export class JobEdit extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            jobInfo:{
                title:'',
                description:''
            }
            
        }
    }
    componentDidMount(){
        axios.get('http://localhost:3001/jobs/getJobInfo/'+this.props.match.params.id)
            .then(res=>{
                console.log(res)
                console.log(res.data)
                this.setState({
                    jobInfo:{
                        title:res.data.data.job_title,
                        description:res.data.data.job_description

                    }
                })
            }).catch(err=>{
                console.error(err);
            })
    }

    handleSubmit = (data) =>{
        const body ={jobTitle:data.title,jobDesc:data.description,id:this.props.user.id}
        axios.put('http://localhost:3001/jobs/updateJob/'+this.props.match.params.id,body)
            .then(res=>{
                console.log(res);
            }).catch(err=>{
                console.error(err);
            })
        this.props.history.push('/');
    }
    
    render() {
        return (
            <div className="field">
                <h1>Edit job details</h1>
                {this.state.jobInfo.title && this.state.jobInfo.description && <JobForm submit={this.handleSubmit} jobInfo={this.state.jobInfo} />}
            </div>
        )
    }
}

export default withRouter (JobEdit)

