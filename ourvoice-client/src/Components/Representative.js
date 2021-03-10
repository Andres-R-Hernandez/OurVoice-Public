import React from 'react'

export default function Representative({rep}) {
    const handleClick = () => {
        window.open(`http://www.google.com/search?q=${rep.name}`, "_blank")
    }
    
    return (
        <div className='pollCard' onClick={handleClick}>
            {rep.name}
        </div>
    )
}