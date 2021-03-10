import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Account from './Containers/Account';
import Dashboard from './Containers/Dashboard';
import Landing from './Containers/Landing';
import Login from './Containers/Login';
import Poll from './Components/Poll';
import Header from './Containers/Header';
import Footer from './Containers/Footer'
import NotFound from './Containers/NotFound';
import CreateUser from './Containers/CreateUser'
import AccountEdit from './Containers/AccountEdit'
import Representatives from './Containers/Representatives'
import NewPoll from './Containers/NewPoll'

function App() {
  const [user, setUser] = useState({representatives:[], votes:[]})
  const [activePolls, setPolls] = useState([])

  const fetchPolls = () => {
    if (user.id) {
      fetch(`http://localhost:3000/user_polls/${user.id}`)
      .then(resp=>resp.json())
      .then(data=>setPolls(data))
    }
  }

  const checkToken = () => {
    if (localStorage.token) {      
      fetch(`http://localhost:3000/check`, {headers: {"Authenticate": localStorage.token}})
      .then(resp=>resp.json())
      .then(data=>{
          setUser(data)
          fetchPolls()
      })
    }
  }

  useEffect(checkToken, [])
  useEffect(fetchPolls, [user])

  const loggedin = () => {
    if (Object.keys(user).length===2) {
      return false
    } else {
      return true
    }
  }

  const loggout = () => {
    localStorage.removeItem("token")
    setUser({representatives:[], votes:[]})
    setPolls([])
  }

  const castVote = (polloption_id, poll_id) => {
    let newVote = {
        user_id: user.id,
        poll_id: poll_id,
        polloption_id: polloption_id
    }
    let reqPkg = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(newVote)
    }
    fetch(`http://localhost:3000/votes`, reqPkg)
    .then(resp=>resp.json())
    .then(userData=>{
      setUser(userData)
      fetchPolls()
    })
  }

  const updateUser = (newUser) => {
    console.log('changes have been made', newUser)
    let data = {
      user: newUser
    }
    let reqPkg = {
      method: 'PATCH',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    }
    fetch(`http://localhost:3000/users/${user.id}`, reqPkg)
    .then(resp=>resp.json())
    .then(data=>setUser(data))
    .catch(error=>alert('It looks like something went wrong with your submission. Don\'t forget to enter your password'))
  }

  const deleteAccount = () => {
    let reqPkg = {
      method: 'DELETE',
      headers: {'Content-Type':'application/json'}
    }
    fetch(`http://localhost:3000/users/${user.id}`, reqPkg)
    .then(()=>loggout())
  }

  const refreshReps = () => {
    fetch(`http://localhost:3000//rep_refresh/${user.id}`)
    .then(resp=>resp.json())
    .then(user=>setUser(user))
  }

  const easterEgg = () => {
    return activePolls.every(poll=>user.votes.some(vote=>vote.poll_id===poll.id))
  }

  return (
    <Router>
      <div id={user?.party==='Dance' ? 'backimgAllPollsComplete' : 'backimg'}></div>
      <div id='app'>
        <Header loggedin={loggedin} loggout={loggout}/>
        <div id='mainBack'></div>
        <div id='main'>
          <Switch>
            <Route exact path='/' component={Landing}/>

            <Route exact path='/login'>
              <Login setUser={setUser} fetchPolls={fetchPolls}/>
            </Route>

            <Route exact path='/loggout'>
              <Redirect to="/login"/>
            </Route>

            <Route path='/dashboard'>
              <Dashboard castVote={castVote} user={user} activePolls={activePolls}/>
            </Route>

            <Route exact path='/poll' component={Poll}/>

            <Route exact path='/create_user'>
              <CreateUser setUser={setUser} fetchPolls={fetchPolls}/>
            </Route>

            <Route exact path='/account'>
              <Account deleteAccount={deleteAccount} user={user} />
            </Route>

            <Route exact path='/account/edit'>
              <AccountEdit easterEgg={easterEgg} updateUser={updateUser} user={user} />
            </Route>

            <Route exact path='/representatives'>
              <Representatives refreshReps={refreshReps} user={user}/>
            </Route>

            <Route exact path='/poll/new'>
              <NewPoll fetchPolls={fetchPolls} user={user}/>
            </Route>

            <Route component={NotFound}/>
          </Switch>
        </div>
        <Footer/>
      </div>
  </Router>
  );
}

export default App;
