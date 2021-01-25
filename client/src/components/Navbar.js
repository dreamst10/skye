import React from 'react'

const Navbar = ({title, logout}) => {
    return (
        <div classname='Navbar' style={styles}>
            <h1>{title}</h1>
            <button onClick={logout} >logout</button>
        </div>
    )
}

const styles={
    backgroundColor: '#0055ff80',
    color: '#ffffff',
    textAlign: 'center'
}


export default Navbar
