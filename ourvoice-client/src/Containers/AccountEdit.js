import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";

export default function AccountEdit({easterEgg, user, updateUser}) {
    let history = useHistory();

    const [newUser, setNewUser] = useState({
        name: user.name,
        email: user.email,
        address: user.address,
        date_of_birth: user.date_of_birth,
        city: user.city,
        state: user.state,
        zip_code: user.zip_code,
        gender: user.gender,
        party: user.party,
        occupation: user.occupation,
        password: null
    })

    const handleChange = (event) => {
        let newUserData = newUser
        newUserData[event.target.name] = event.target.value
        setNewUser(newUserData)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateUser(newUser)
        history.push('/account')
    }
    
    return (
        <div id='createPollContainer'>
            <h2>EDIT ACCOUNT DETAILS</h2>
            <div id='pollFormBox'>
                <form id='pollForm' onSubmit={handleSubmit}>
                    <div className='formItem'>Name: <input placeholder={user.name} name='name' onChange={handleChange}></input></div>
                    <div className='formItem'>Email: <input placeholder={user.email} name='email' onChange={handleChange}></input></div>
                    <div className='formItem'>Address: <input placeholder={user.address} name='address' onChange={handleChange}></input></div>
                    <div className='formItem'>DOB: <input placeholder={user.date_of_birth} name='date_of_birth' onChange={handleChange} type='date'></input></div>
                    <div className='formItem'>City: <input placeholder={user.city} name='city' onChange={handleChange}></input></div>
                    <div className='formItem'>State: <input placeholder={user.state} name='state' onChange={handleChange}></input></div>
                    <div className='formItem'>Zip Code: <input placeholder={user.zip_code} name='zip_code' onChange={handleChange}></input></div>
                    <div className='formItem'>Gender: <select name='gender' onChange={handleChange} placeholder={user.gender}>
                            <option value={null}></option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Non-Binary</option>
                        </select></div>
                    <div className='formItem'>Party: <select name='party' onChange={handleChange} placeholder={user.party}>
                                <option value={null}></option>
                                <option>Republican</option>
                                <option>Democrat</option>
                                <option>Independent</option>
                                <option>Other</option>
                                {easterEgg() ? <option>Dance</option> : null}
                            </select></div>
                    <div className='formItem'>Occupation: <input placeholder={user.occupation} name='occupation' onChange={handleChange}></input></div>
                    <div className='formItem'>Enter Password: <input name='password' onChange={handleChange}></input></div>
                    <button>CONFIRM CHANGES</button>
                    <Link to='/account'>Back</Link>
                </form>
            </div>
        </div>
    )
}
