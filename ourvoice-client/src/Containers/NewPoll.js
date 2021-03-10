import React from 'react'
import { useHistory } from 'react-router-dom';
import CreatePollForm from '../Components/CreatePollForm'

export default function NewPoll({user, fetchPolls}) {
    let history = useHistory();

    const createPoll = (pollData) => {
        let reqPkg = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(pollData)
        }
        
        fetch('http://localhost:3000/polls', reqPkg)
        .then(resp=>resp.json())
        .then((data)=>{
            fetchPolls()
            history.push("/dashboard");
        })
    }
    
    return (
        <div id='createPollContainer'>
            <h2>Create A Poll</h2>
            <div id='pollFormBox'>
                <CreatePollForm user={user} createPoll={createPoll}/>
            </div>
        </div>
    )
}
