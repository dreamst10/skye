import axios from 'axios'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export class Profile extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             skillList:[],
             user:{}
        }
    }
    

    componentDidMount() {
        axios.get('http://localhost:3001/skills/getUserSkills/'+this.props.match.params.id)
        .then(res=>{
            console.log(res)
            console.log(res.data)
            if(res.data.data){
            res.data.data.map(obj=>{
                let skills=this.state.skillList.concat([{name:obj.skills_description,score:obj.user_skills_score}])
                return this.setState({skillList:skills})
            })
          }
        }).catch(err=>{
            console.error(err);
        });
        axios.get('http://localhost:3001/user/getUserInfo/'+this.props.match.params.id)
        .then(res=>{
            this.setState({user:res.data.data})
            
        })
    
    }

    render() {
        return (
            <div  >
                <h1> {this.state.user.user_name} {this.state.user.user_lastname}'s skills </h1>
                {this.state.skillList.map((obj, index)=>(
                    <span key={index}>
                        <label>skill: {obj.name},    score: {obj.score}</label>
                        
                        <p></p>
                        <br/>
                    </span>
                ))}                
            </div>
        )
    }
}

export default withRouter (Profile)
