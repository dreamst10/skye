import React, { Component } from 'react'
import { Link } from 'react-router-dom'
let userImg = require('../assets/user.jpg')

export class UserCard extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <div>
                <span><img src={userImg.default} /><p> {this.props.name+''+this.props.lastname} <Link to={"/userskills/"+this.props.id} >check skills</Link></p></span>
                <span></span>
                </div>
            </div>
        )
    }
}

export default UserCard
