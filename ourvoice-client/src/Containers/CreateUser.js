import React from 'react'
import {Link, useHistory} from "react-router-dom"
import CreateUserForm from '../Components/CreateUserForm'

export default function CreateUser({setUser, fetchPolls}) {    
    let history = useHistory();

    const createUser = (userData) => {
        let stuff = {
            user: userData
        }
        let reqPkg = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(stuff)
        }
        fetch('http://localhost:3000/users', reqPkg)
        .then(resp=>resp.json())
        .then((data)=>{
            if (data.userData) {
                setUser(data.userData);
                localStorage.setItem("token", data.token);
                fetchPolls();
                history.push("/dashboard");    
            } else {
                alert("Account with that email has already been created. Please try logging in.")
            }
        })
        .catch(()=>alert('It looks like something went wrong with your submission. Please check your inputs.'))
    }
    
    return (
        <div id='loginContainer'>
            <div id='loginBox'>
                <h3>Create An Account</h3>
                <CreateUserForm createUser={createUser}/>
                <Link to='/login'>Back to Login</Link>
            </div>
        </div>
    )
}