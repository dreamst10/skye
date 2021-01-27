import axios from 'axios'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { JobCard } from '../components/JobCard'

export class CheckJobs extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             jobs:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3001/user/getUserJobs/'+this.props.user.id)
        .then(res=>{
            console.log(res.data);
            this.setState({jobs:res.data.data.data})
            console.log(this.state.jobs)
        }).catch(err=>{
            console.error(err);
        });
    }
    
    render() {
        return (
            <div>
                <h1>your posted jobs</h1>
                {this.state.jobs.map(obj=>(
                    <JobCard key={obj.job_id} id={obj.job_id} title={obj.job_title} description={obj.job_description} />
                ))}
            </div>
        )
    }
}

export default withRouter (CheckJobs)
