import React from 'react'

const Navbar = ({title}) => {
    return (
        <div classname='Navbar' style={styles}>
            <h1>{title}</h1>
        </div>
    )
}

const styles={
    backgroundColor: '#0055ff80',
    color: '#ffffff',
    textAlign: 'center'
}


export default Navbar
