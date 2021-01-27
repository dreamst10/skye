import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({title, logout, search}) => {
    const [query, setQuery] = 
    useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        search(query);
    }

    return (
        <div classname='Navbar' style={styles}>
            <h1>{title}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="search users..." value={query} onChange={(event)=>{setQuery(event.target.value)}} ></input>
                <input type="submit" value="search"/>
            </form>
            <Link to="/"> <button style={{border:'none', backgroundColor:'transparent'}}>home</button></Link>
            <Link to="/edituserskills"> <button style={{border:'none', backgroundColor:'transparent'}}>edit skills</button></Link>
            <Link to="/postJob"> <button style={{border:'none', backgroundColor:'transparent'}}>post job</button></Link>
            <Link to="/checkJobs"> <button style={{border:'none', backgroundColor:'transparent'}}>checkJobs</button></Link>
            <button style={{border:'none', backgroundColor:'transparent'}} onClick={logout} >logout</button>

        </div>
    )
}

const styles={
    backgroundColor: '#0055ff80',
    color: '#ffffff',
    textAlign: 'center'
}


export default Navbar
