import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Pie } from 'react-chartjs-2'

export default function Poll({activePolls, user, castVote}) {
    let { pollId } = useParams();

    //state used to render poll data
    const [pollData, setPollData] = useState({representatives: [], polloptions: [], issue: "", category: ""})
    const [votedPollData, setVotedPollData] = useState([])

    //state used for voting
    const [pollOption, setPollOption] = useState(null)
    
    const findPollData = () => {
        setPollData(activePolls.filter(poll=>poll.id===parseInt(pollId))[0])
    }

    const convertPollResults = () => {
        return pollData.polloptions.map(option=>{
            return {
                description: option.description,
                count: pollData.votes.filter(vote=>vote.polloption_id===option.id).length
            }
        })
    }

    const fetchPollRepData = (pollId) => {
        fetch(`http://localhost:3000/pollRepData/${pollId}`)
        .then(resp=>resp.json())
        .then(data=>setVotedPollData(data))
    }

    useEffect(()=>{
        findPollData()
        setPollOption(null)
        fetchPollRepData(pollId)
    }, [pollId, activePolls])

    const renderOptions = () => {
        return pollData?.polloptions.map((polloption,i)=>{
            return (
                <div className="radio" key={i}>
                    <label>
                        <input type="radio" value={polloption.id} onChange={()=>setPollOption(polloption.id)} checked={pollOption===polloption.id}></input>
                        {polloption.description}
                    </label>
                </div>
            )
        })
    }

    const renderPieChart = () => {
        let pieData = convertPollResults()

        let labels = pieData.map(option=>option.description)
        let counts = pieData.map(option=>option.count)

        return (
            <div id='pieChart'>
                <h4>Total Votes Pie Chart:</h4>
                <Pie
                    data={{
                        labels: labels, //Need to generate array from polloptions
                        datasets: [{
                            data: counts, //Need to generate count of votes for each polloption
                            backgroundColor: ['white', 'lightgrey', 'ivory', 'slategray', 'black'],
                            borderColor: 'black',
                        }]
                    }}
                    options={{
                        scales: {
                            scaleLabel: {
                                fontColor: 'black'
                            }
                        }
                        // cutoutPercentage: 50,
                    }}
                    // height={150} //Need to figure out appropriate size for pie, maybe dynamic?
                    // width={300}
                />
            </div>
        )
    }

    const renderDataTable = () => {
        let optionRow = pollData?.polloptions.map((option,i)=>{
            return <th key={i}>{option.description}</th>
        })

        let repRow = votedPollData.map((rep,i)=>{
            let optionData = rep.option_totals.map((option,j)=>{
                return <td key={j}>{option}</td>
            })
            
            return (
                <tr key={i}>
                    <td><b>{rep.rep_name}</b></td>
                    {optionData}
                    <td>{rep.total_count}</td>
                </tr>
            )
        })

        return (
            <div id='dataTable'>
                <h4>Polled Constituencies:</h4>
                <i>(note: voters may belong to multiple constituencies polled)</i>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {optionRow}
                            <th>Totals</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repRow}
                    </tbody>
                </table>
            </div>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        castVote(pollOption, pollData.id)
    }

    const renderConstituencies = () => {
        return pollData?.representatives.map((rep,i)=>{
            return <li key={i}>{rep.name}</li>
        })
    }

    const voteStatus = () => {
        if (user.votes.filter(vote=>vote.poll_id===pollData?.id).length === 1) {
            let polloptionid = user.votes.filter(vote=>vote.poll_id===pollData.id)[0].polloption_id
            return (
                <div id='votedPoll'>
                    <div id='poll'>
                        <h4>Selected Poll:</h4>
                        Poll ID: {pollId}<br></br>
                        Category: {pollData?.category}<br></br>
                        Polled Constituencies:<br></br>
                        {renderConstituencies()}
                        <br></br>
                        Issue: {pollData?.issue}<br></br>
                        Total Votes Received: <b>{pollData?.votes.length}</b><br></br>
                        <h2>VOTE RECEIVED</h2>
                        Your Response Was: <b><i>{pollData?.polloptions.filter(option=>option.id===polloptionid)[0].description}</i></b>
                    </div>
                    {renderPieChart()}
                    {renderDataTable()}
                </div>
            )
        } else {
            return (
                <div id='poll'>
                    <h4>Selected Poll:</h4>
                    Poll ID: {pollId}<br></br>
                    Category: {pollData?.category}<br></br>
                    Polled Constituencies:<br></br>
                    {renderConstituencies()}
                    <br></br>
                    Issue: {pollData?.issue}<br></br>
                    <form id='selectedPollOptions' onSubmit={handleSubmit}>
                        {renderOptions()}
                        <br></br>
                        <button>Cast Vote</button>
                    </form>
                </div>
            )
        }
    }

    return (
        voteStatus()
    )
}