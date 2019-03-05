import { handleActions } from 'redux-actions'
import {
  TEAM_MEMBERS_LIST_REQUEST,
  TEAM_MEMBERS_LIST_SUCCESS,
  TEAM_MEMBERS_LIST_FAILURE
} from '../actions/actionTypes'
import reducerHelper from './helper'

const defaultState = {
  error: '',
  isPending: false,
  memberslist: [],
  filters: [],
  meta: {
    pageNumber: 0,
    hasPrevious: false,
    hasNext: false,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10
  }
}

export default handleActions(
  {
    [TEAM_MEMBERS_LIST_REQUEST]: (state) => {
      return {
        ...state,
        isPending: true
      }
    },
    [TEAM_MEMBERS_LIST_SUCCESS]: (state, action) => {
      const data = action.payload && reducerHelper.getTeamMembersStates(action.payload.response, state)
      return {
        ...state,
        isPending: false,
        error: '',
        ...data
      }
    },
    [TEAM_MEMBERS_LIST_FAILURE]: (state, action) => {
      return {
        ...state,
        isPending: false,
        error: action.payload && action.payload.msg
      }
    }
  },
  defaultState
)
