import React from 'react'
import NavBar from '../Containers/NavBar';
import {NavLink} from "react-router-dom"

export default function Header({loggedin, loggout}) {
    return (
        <header>
            <div>
            <NavLink className='pageTitle' to='/'>OurVoice</NavLink>
            </div>
            <div>
                <NavBar loggedin={loggedin} loggout={loggout}/>
            </div>
        </header>
    )
}
