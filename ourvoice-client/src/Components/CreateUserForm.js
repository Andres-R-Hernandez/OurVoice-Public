import React, {useState} from 'react';

export default function CreateUserForm({createUser}) {
    
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [date, setDate] = useState(null)
    const [address, setAddress] = useState(null)
    const [city, setCity] = useState(null)
    const [state, setState] = useState(null)
    const [zip_code, setZip] = useState(null)
    const [ethnicity, setEthnicity] = useState(null)
    const [gender, setGender] = useState(null)
    const [party, setParty] = useState(null)
    const [occupation, setOccupation] = useState(null)
    const [password, setPassword] = useState(null)


    const handleSubmit = (event) => {
        event.preventDefault()
        let userData = {
            name: name,
            email: email,
            date_of_birth: date,
            address: address,
            city: city,
            state: state,
            zip_code: zip_code,
            ethnicity: ethnicity,
            gender: gender,
            party: party,
            occupation: occupation,
            password: password
        }
        createUser(userData)
    }
    
    return (
        <form id='loginForm' onSubmit={handleSubmit}>
            <div className='formItem'>Name: <input name='name' onChange={(e)=>setName(e.target.value)}></input></div>
            <div className='formItem'>Email: <input placeholder='REQUIRED' name='email' onChange={(e)=>setEmail(e.target.value)}></input></div>
            <div className='formItem'>Date of Birth: <input name='date' type='date' onChange={(e)=>setDate(e.target.value)}></input></div>
            <div className='formItem'>Address: <input placeholder='REQUIRED' type='address' name='address' onChange={(e)=>setAddress(e.target.value)}></input></div>
            <div className='formItem'>City: <input placeholder='REQUIRED' name='city' onChange={(e)=>setCity(e.target.value)}></input></div>
            <div className='formItem'>State: <input placeholder='REQUIRED' name='state' onChange={(e)=>setState(e.target.value)}></input></div>
            <div className='formItem'>Zip Code: <input placeholder='REQUIRED' name='zip_code' onChange={(e)=>setZip(e.target.value)}></input></div>
            <div className='formItem'>Ethnicity: <input name='ethnicity' onChange={(e)=>setEthnicity(e.target.value)}></input></div>
            <div className='formItem'>Gender: <select name='gender' onChange={(e)=>setGender(e.target.value)}>
                        <option value={null}></option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Non-Binary</option>
                    </select>
            </div>
            <div className='formItem'>Party Affiliation: <select name='party' onChange={(e)=>setParty(e.target.value)}>
                        <option value={null}></option>
                        <option>Republican</option>
                        <option>Democrat</option>
                        <option>Independent</option>
                        <option>Other</option>
                    </select>
            </div>
            <div className='formItem'>Occupation: <input name='occupation' onChange={(e)=>setOccupation(e.target.value)}></input></div>
            <div className='formItem'>Password: <input placeholder='REQUIRED' name='password' onChange={(e)=>setPassword(e.target.value)}></input></div>
            <button>Submit</button><br></br>
        </form>
    )
}
