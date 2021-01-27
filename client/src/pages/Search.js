import axios from 'axios'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import UserCard from '../components/UserCard'

export class Search extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             users:[{}],
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3001/user/search/'+this.props.match.params.query)
            .then(res=>{
                if(res.data.data){
                    this.setState({users:res.data.data})
                }
            })
    }
    
    render() {
        return (
            <div>
                <h1>search results</h1>
                {this.state.users.map(obj=>
                    //<div> {obj.user_name} </div>
                    <UserCard key={obj.user_id} name={obj.user_name} lastname={obj.user_lastname} id={obj.user_id} ></UserCard>
                )}                
            </div>
        )
    }
}

export default withRouter (Search)
