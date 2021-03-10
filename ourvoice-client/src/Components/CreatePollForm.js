import {React, useState}  from 'react'
import Select from 'react-select'

export default function NewPollForm({createPoll, user}) {
    const [issue, setIssue] = useState(null);
    const [category, setCategory] = useState(null);
    const [pollOption1, setPollOption1] = useState(null);
    const [pollOption2, setPollOption2] = useState(null);
    const [pollOption3, setPollOption3] = useState(null);
    const [pollOption4, setPollOption4] = useState(null);
    const [repOptions, setRepOptions] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault()
        let repObj = repOptions.map(obj=>{
            return {representative_id: obj.value}
        })
        let pollData = {
            poll: {
                issue: issue,
                category: category,
                polloptions_attributes: [
                    {description: pollOption1},
                    {description: pollOption2},
                    {description: pollOption3},
                    {description: pollOption4}
                ],
                rpjoiners_attributes: repObj
            }
        }
        createPoll(pollData)
    }

    const renderRepsOptions = () => {
        //needs to return an array in the following form
        //[{ value: 'chocolate', label: 'Chocolate' },{ value: 'strawberry', label: 'Strawberry' }]
        return user.representatives.map(rep=> {
            return { value: rep.id, label: rep.name }
        })
    }
    
    return (
            <form id='pollForm' onSubmit={handleSubmit}>
                Issue:
                <textarea style={{width:'100%'}} name='issue' onChange={(e)=>setIssue(e.target.value)}></textarea>
                <div className='formItem'>Category: <input name='category' onChange={(e)=>setCategory(e.target.value)}></input></div>
                <br></br>
                Polloptions:
                <div className='formItem'>Option 1: <input name='pollOption1' onChange={(e)=>setPollOption1(e.target.value)}></input></div>
                <div className='formItem'>Option 2: <input name='pollOption2' onChange={(e)=>setPollOption2(e.target.value)}></input></div>
                <div className='formItem'>Option 3: <input name='pollOption3' onChange={(e)=>setPollOption3(e.target.value)}></input></div>
                <div className='formItem'>Option 4: <input name='pollOption4' onChange={(e)=>setPollOption4(e.target.value)}></input></div>
                <br></br>
                Select All Representative Tags That Apply:
                <i>(You can only poll represenative groups that you are a constituent of)</i>
                <Select isMulti name='repOptions' onChange={event=>setRepOptions(event)} options={renderRepsOptions()} />
                <br></br>
                <button>Submit Poll</button>
            </form>
    )
}
