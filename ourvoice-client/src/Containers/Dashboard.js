import {React, useState, useEffect} from 'react'
import { Route, useHistory, useRouteMatch } from 'react-router-dom'
import PollCard from '../Components/PollCard'
import Poll from '../Components/Poll'
import Select from 'react-select'

export default function Dashboard({activePolls=[], user, castVote}) {
    let { path } = useRouteMatch();
    let history = useHistory();
    const [repFilterSelections, setRepFilterSelections] = useState([]);
    const [filteredPolls, setFilteredPolls] = useState(activePolls);
    const [selectedPoll, setSelectedPoll] = useState(null);

    useEffect(()=>{
        filterOptions()
    }, [repFilterSelections, activePolls])
    
    const renderPolls = () => {
        return filteredPolls.map((poll,i)=><PollCard selectedPoll={selectedPoll} setSelectedPoll={setSelectedPoll} key={i} poll={poll}/>)
    }

    const handleNewPollClick = () => {
        history.push('/poll/new')
    }

    const renderRepsOptions = () => {
        //needs to return an array in the following form
        //[{ value: 'chocolate', label: 'Chocolate' },{ value: 'strawberry', label: 'Strawberry' }]
        return user.representatives.map(rep=> {
            return { value: rep.id, label: rep.name }
        })
    }

    const filterOptions = () => {
        if (repFilterSelections.length === 0) {
            setFilteredPolls(activePolls)
        } else {
            let fPolls = activePolls.filter(activePoll=>repFilterSelections.some(frep=>activePoll.representatives.some(pRep=>pRep.id===frep.value)))
            setFilteredPolls(fPolls)
        }
    }
    
    return (
        <div id='dashboard'>
            <div id='openPolls'>
                <h4>Open Polls</h4>
                <Select isMulti name='repOptions' onChange={event=>setRepFilterSelections(event)} options={renderRepsOptions()} />
                <div id='cards'>
                    {renderPolls()}
                </div>
                <button onClick={handleNewPollClick}>Create a Poll</button>
            </div>
            <Route path={`${path}/:pollId`}>
                <Poll castVote={castVote} user={user} activePolls={activePolls}/>
            </Route>
        </div>
    )
}
