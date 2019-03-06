import { handleActions } from 'redux-actions'
import {
  SEARCH_PROJECTS_LIST_REQUEST,
  SEARCH_PROJECTS_LIST_SUCCESS,
  SEARCH_PROJECTS_LIST_FAILURE
} from '../actions/actionTypes'

const defaultState = {
  error: '',
  isPending: false,
  projectsList: []
}

export default handleActions(
  {
    [SEARCH_PROJECTS_LIST_REQUEST]: (state) => {
      return {
        ...state,
        isPending: true
      }
    },
    [SEARCH_PROJECTS_LIST_SUCCESS]: (state, action) => {
      return {
        ...state,
        isPending: false,
        error: '',
        projectsList: action.payload.response
      }
    },
    [SEARCH_PROJECTS_LIST_FAILURE]: (state, action) => {
      return {
        ...state,
        isPending: false,
        error: action.payload && action.payload.msg
      }
    }
  },
  defaultState
)
