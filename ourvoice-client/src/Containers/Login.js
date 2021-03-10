import React from 'react'
import {useState} from 'react'
import {Link, useHistory} from "react-router-dom"

export default function Login({setUser, fetchPolls}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let history = useHistory();
    
    const handleSubmit = (event) => {
        event.preventDefault()

        const userdata = {
            email: email,
            password: password
        }

        const reqPkg = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(userdata)
        }

        fetch(`http://localhost:3000/login`, reqPkg)
        .then(resp=>resp.json())
        .then((data)=>{
            if (data.userData) {
                setUser(data.userData);
                localStorage.setItem("token", data.token);
                fetchPolls();
                history.push("/dashboard");    
            } else {
                alert("Either your email or password was incorrect. Please try again.")
            }
        })
        .catch(()=>alert('It looks like something went wrong with your submission. Please check your inputs.'))
    }

    return (
        <div id='loginContainer'>
            <div id='loginBox'>
                <h3>LOGIN</h3>
                <form id='loginForm' onSubmit={handleSubmit}>
                    <div className='formItem'><input placeholder='EMAIL' onChange={e=>setEmail(e.target.value)}></input></div>
                    <div className='formItem'><input  type='password' placeholder='PASSWORD' onChange={e=>setPassword(e.target.value)}></input></div>
                    <button>Submit</button>
                </form>
                <Link to='/create_user'>Create An Account</Link>
            </div>
        </div>
    )
}
