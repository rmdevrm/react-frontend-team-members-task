import { handleActions, combineActions } from 'redux-actions'
import {
  RESET_NOTIFICATION,
  TEAM_MEMBERS_LIST_SUCCESS,
  TEAM_MEMBERS_LIST_FAILURE
} from '../actions/actionTypes'

const defaultState = {
  isError: false,
  message: ''
}

export default handleActions(
  {
    [combineActions(TEAM_MEMBERS_LIST_FAILURE)]: (state, action) => {
      return {
        ...state,
        isError: true,
        message: action.payload.msg || 'Something went wrong. Please try again later !!'
      }
    },
    [TEAM_MEMBERS_LIST_SUCCESS]: (state) => ({
      ...state,
      isError: false,
      message: 'Team Members have been successfully fetched.'
    }),
    [RESET_NOTIFICATION]: (state) => ({
      ...state,
      message: ''
    })
  },
  defaultState
)
