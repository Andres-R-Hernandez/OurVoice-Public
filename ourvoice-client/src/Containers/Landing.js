import React from 'react'
import Gif from '../Images/giphy.gif'

export default function Landing() {
    return (
        <div id="landingContainer">
            <h2>Welcome to OurVoice</h2>
            <p style={{textAlign:'center'}}>
                OurVoice is a platform for constituents to poll and communicate indirectly with elected officials and overall body of government.
            </p>
            <p style={{textAlign:'center'}}>
                Our goal is to provide clear, relevant, open-access polling with accessible data for all to see.
            </p>
            <p style={{textAlign:'center'}}>
                Intended primarily for local jurisdiction, but can be scaled to apply to national issues.
            </p>
            <p style={{textAlign:'center'}}>
                We want to help constituents feel more involved in politics, and to provide more data for elected officials to make informed decisions.
            </p>
            <p style={{textAlign:'center'}}>
                Politicians hate this one easy trick to become more informed of how a constituency is polling.
            </p>
            <div style={{display:'flex', flexGrow:'1', alignItems:'center'}}>
                <img src={Gif} alt='hand voting'></img>
            </div>
        </div>
    )
}
