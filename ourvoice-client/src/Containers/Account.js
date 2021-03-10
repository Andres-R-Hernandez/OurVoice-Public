import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Account({user, deleteAccount}) {
    let history = useHistory();
    
    const handleEditClick = () => {
        history.push(`/account/edit`);
    }

    const handleDeleteClick = () => {
        deleteAccount()
        history.push(`/`);
    }
    
    return (
        <div id='account'>
            <div id='accountDetails'>
                <h2>Account Details</h2>
                <div id='pollFormBox' >
                    <div>
                        <div className='formItem'><b>Name:</b> {user.name}</div>
                        <div className='formItem'><b>Email:</b> {user.email}</div>
                        <div className='formItem'><b>Address:</b> {user.address}</div>
                        <div className='formItem'><b>DOB:</b> {user.date_of_birth}</div>
                        <div className='formItem'><b>City:</b> {user.city}</div>
                        <div className='formItem'><b>State:</b> {user.state}</div>
                        <div className='formItem'><b>Zip Code:</b> {user.zip_code}</div>
                        <div className='formItem'><b>Ethnicity:</b> {user.ethnicity}</div>
                        <div className='formItem'><b>Gender:</b> {user.gender}</div>
                        <div className='formItem'><b>Party:</b> {user.party}</div>
                        <div className='formItem'><b>Occupation:</b> {user.occupation}</div>
                    </div>
                    <button onClick={handleEditClick}>Edit Info</button>
                    <button onClick={handleDeleteClick} style={{color:'red'}}>DELETE MY ACCOUNT</button>
                </div>
            </div>
        </div>
    )
}