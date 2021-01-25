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
                                
                <Link to={"/"+5}>
            nothing here yet  
                </Link>
                <button onClick={this.press}>hi</button>
            </div>
        )
    }
}

export default withRouter (home)
