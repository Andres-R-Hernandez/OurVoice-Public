import React from 'react'
import {NavLink} from "react-router-dom"

export default function NavBar({loggedin, loggout}) {
    const loglink = () => {
        return loggedin() ?
        <>
            <NavLink className='navbarButtons' to='/dashboard'>MyPolls</NavLink>
            <NavLink className='navbarButtons' to='/representatives'>MyRepresentation</NavLink>
            <NavLink className='navbarButtons' to='/account'>MyAccount</NavLink>
            <NavLink className='navbarButtons' to='/' onClick={loggout}>Log Out</NavLink>
        </>
        :
        <>
            <NavLink className='navbarButtons' to='/login'>Login</NavLink><br></br>
        </>
    }
    
    
    return (
        <div id='navbar'>
            {loglink()}
        </div>
    )
}