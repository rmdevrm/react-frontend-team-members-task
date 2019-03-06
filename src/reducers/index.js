import { combineReducers } from 'redux'
import ListTeamMembers from './listTeamMembers'
import searchProjectsList from './searchProjectsList'
import searchSkillsList from './searchSkillsList'
import NotificationReducer from './notification'

const reducers = combineReducers({
  searchProjectsList,
  searchSkillsList,
  teamMembers: ListTeamMembers,
  response: NotificationReducer
})

export default reducers
