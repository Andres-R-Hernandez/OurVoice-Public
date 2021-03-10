import React from 'react'
import { useHistory } from 'react-router-dom'

export default function PollCard({poll, selectedPoll, setSelectedPoll}) {
    let history = useHistory();

    const handleClick = () => {
        setSelectedPoll(poll.id)
        history.push(`/dashboard/${poll.id}`);
    }
    
    return (
        <div className={selectedPoll===poll.id ? 'pollCardActive' : 'pollCard'} onClick={handleClick} >
            {poll.issue}
        </div>
    )
}
