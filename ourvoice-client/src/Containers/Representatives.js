import React from 'react'
import Representative from '../Components/Representative'

export default function Representatives({user, refreshReps}) {
    const renderReps = () => {
        return user.representatives?.map((rep,i)=>{
            return <Representative key={i} rep={rep}/>
        })
    }
    
    return (
        <div id='representationContainer'>
            <div id='userRepsBox'>
                <h4>My Representation</h4>
                    <div id='cards'>
                        {renderReps()}
                    </div>
                <button onClick={refreshReps}>REFRESH REPRESENTATION</button>
            </div>
        </div>
    )
}
