import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'


export class home extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    press=()=>{
        console.log(this.props.user)
        console.log(this.props.match.params.id)
    }

    render() {
        
        return (
            <div>
                                
            <h1>welcome, {this.props.user.name} </h1>
            </div>
        )
    }
}

export default withRouter (home)
