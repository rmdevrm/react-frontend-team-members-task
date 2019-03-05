import { combineReducers } from 'redux'
import ListTeamMembers from './listTeamMembers'
import NotificationReducer from './notification'

const reducers = combineReducers({
  teamMembers: ListTeamMembers,
  response: NotificationReducer
})

export default reducers
