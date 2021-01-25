import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export class SkillsEdit extends Component {
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
        axios.delete('http://localhost:3001/skills/deleteUserSkills/'+this.props.user.id)
            .then(res=>{
                console.log(res)
                if(res.data.status === 200){
                    this.state.selInputs.map(obj=>{
                        const body = {score:obj.score,id:obj.value}
                        axios.post('http://localhost:3001/skills/addUserSkill/'+this.props.user.id, body)
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
        axios.get('http://localhost:3001/skills/getUserSkills/'+this.props.user.id)
        .then(res=>{
            console.log(res)
            console.log(res.data)
            res.data.data.map(obj=>{
                let inputs=this.state.selInputs.concat([{value:obj.skills_id,score:obj.user_skills_score}])
                this.setState({selInputs:inputs})
            })
        })
      }
    
      render() {
        return (
          <React.Fragment>
            {this.state.selInputs.map((selInput, index) => (
              <span key={index}>
                <select
                  onChange={this.handleSkillChange(index)}
                  value={this.state.selInputs[index].value}
                >
                    {this.state.skillList.map(obj=> <option key={obj.skills_id} value={obj.skills_id}> {obj.skills_description} </option> )}
                </select>
                <select onChange={this.handleScoreChange(index)} value={this.state.selInputs[index].score} >
                    <option value='1' > 1 </option>
                    <option value='2' > 2 </option>
                    <option value='3' > 3 </option>
                    <option value='4' > 4 </option>
                    <option value='5' > 5 </option>
                </select>
                <button onClick={this.handleDelete(index)}>X</button>
              </span>
            ))}
            <button onClick={this.addSelect}>+</button>
            <Link to="/"><button>cancel</button></Link>
            <button onClick={this.updateSkills} >confirm</button>
          </React.Fragment>
        )
      }
    }
export default SkillsEdit
