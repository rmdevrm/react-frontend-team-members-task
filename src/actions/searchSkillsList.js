import { createAction } from 'redux-actions'

import {
  SEARCH_SKILLS_LIST_SUCCESS,
  SEARCH_SKILLS_LIST_CLEAR,
  SEARCH_SKILLS_LIST_FAILURE
} from './actionTypes'

export const searchSkillListClear = createAction(SEARCH_SKILLS_LIST_CLEAR)

export const searchSkillListSuccess = createAction(
  SEARCH_SKILLS_LIST_SUCCESS,
  (payload) => payload
)

export const searchSkillListFailure = createAction(
  SEARCH_SKILLS_LIST_FAILURE,
  (payload) => payload
)
