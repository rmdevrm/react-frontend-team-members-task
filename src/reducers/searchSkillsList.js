import { handleActions } from 'redux-actions'
import {
  SEARCH_SKILLS_LIST_CLEAR,
  SEARCH_SKILLS_LIST_SUCCESS,
  SEARCH_SKILLS_LIST_FAILURE
} from '../actions/actionTypes'

const defaultState = {
  error: '',
  isPending: false,
  skillsList: []
}

export default handleActions(
  {
    [SEARCH_SKILLS_LIST_SUCCESS]: (state, action) => {
      return {
        ...state,
        isPending: false,
        error: '',
        skillsList: action.payload.response
      }
    },
    [SEARCH_SKILLS_LIST_FAILURE]: (state, action) => {
      return {
        ...state,
        isPending: false,
        error: action.payload && action.payload.msg
      }
    },
    [SEARCH_SKILLS_LIST_CLEAR]: (state) => {
      return {
        ...state,
        isPending: false,
        skillsList: []
      }
    }
  },
  defaultState
)
