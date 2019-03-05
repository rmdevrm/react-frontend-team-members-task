import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
import TeamMemberContainer from './containers/teamMembersContainer'
import Notification from './components/wrappers/Notification'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          ToDo Test
        </header>
        <Switch>
          <Route path='/' component={TeamMemberContainer} />
          <Redirect to='/' />
        </Switch>
        <Notification />
      </div>
    )
  }
}

export default App
