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

    }
    
    render() {
        return (
            <div className="field">
                <JobForm submit={this.handleSubmit} jobInfo={this.state.jobInfo} />
            </div>
        )
    }
}

export default withRouter (JobEdit)

