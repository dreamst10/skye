import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

export class JobSkillsEdit extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            selInputs: [],
             skillList:[]
        }
    }

        
  
    handleSkillChange = i => e => {
        let selInputs = [...this.state.selInputs]
        selInputs[i].value = e.target.value
        this.setState({
          selInputs
        })
      }
      handleScoreChange = i => e => {
        let selInputs = [...this.state.selInputs]
        selInputs[i].score = e.target.value
        this.setState({
          selInputs
        })
      }
    
      handleDelete = i => e => {
        e.preventDefault()
        let selInputs = [
          ...this.state.selInputs.slice(0, i),
          ...this.state.selInputs.slice(i + 1)
        ]
        this.setState({
            selInputs
        })
      }
    
      addSelect = e => {
        e.preventDefault()
        let selInputs = this.state.selInputs.concat([{value:'',score:''}])
        this.setState({
            selInputs
        })
      }

      updateSkills = () =>{
        axios.delete('http://localhost:3001/skills/deleteJobSkills/'+this.props.match.params.id)
            .then(res=>{
                console.log(res)
                if(res.data.status === 200){
                    this.state.selInputs.map(obj=>{
                        const body = {score:obj.score,id:obj.value}
                        return axios.post('http://localhost:3001/skills/addJobSkill/'+this.props.match.params.id, body)
                            .then(res=>{console.log(res)})
                            .catch(err=>console.error(err))
                    })
                    
                }
            }).catch(err=>{
                console.error(err);
            })        
      }

      componentDidMount() {
        //console.log(this.props)
        axios.get('http://localhost:3001/skills/getSkills')
            .then(res=>{
                this.setState({
                    skillList:res.data.data
                });
            }).catch(err=>{
                console.error(err)
            });
        axios.get('http://localhost:3001/skills/getJobSkills/'+this.props.match.params.id)
        .then(res=>{
            console.log(res)
            console.log(res.data)
            if(res.data.data){
            res.data.data.map(obj=>{
                let inputs=this.state.selInputs.concat([{value:obj.skills_id,score:obj.job_skills_score}])
                return this.setState({selInputs:inputs})
            })
        }
        })
      }
    
      render() {
        return (
          <React.Fragment>
            <div className='field'>
              <h1>Edit job skill</h1>
            {this.state.selInputs.map((selInput, index) => (
              <span key={index}>
                <label>select skill:</label>
                <select
                  onChange={this.handleSkillChange(index)}
                  value={this.state.selInputs[index].value}
                >
                    {this.state.skillList.map(obj=> <option key={obj.skills_id} value={obj.skills_id}> {obj.skills_description} </option> )}
                </select>
                <label>select skill score</label>
                <select onChange={this.handleScoreChange(index)} value={this.state.selInputs[index].score} >
                    <option value='1' > 1 </option>
                    <option value='2' > 2 </option>
                    <option value='3' > 3 </option>
                    <option value='4' > 4 </option>
                    <option value='5' > 5 </option>
                </select>
                <button onClick={this.handleDelete(index)}>delete skill</button><br/>
              </span>
            ))}
            <button onClick={this.addSelect}>add skill</button>
            <Link to="/"><button>cancel</button></Link>
            <button onClick={this.updateSkills} >confirm</button>
            </div>
          </React.Fragment>
        )
      }
    }

export default withRouter (JobSkillsEdit)
