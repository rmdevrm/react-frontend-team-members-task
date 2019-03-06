import { createAction } from 'redux-actions'

import {
  SEARCH_SKILLS_LIST_REQUEST,
  SEARCH_SKILLS_LIST_SUCCESS,
  SEARCH_SKILLS_LIST_FAILURE
} from './actionTypes'

export const searchSkillListRequest = createAction(
  SEARCH_SKILLS_LIST_REQUEST,
  (payload) => payload
)

export const searchSkillListSuccess = createAction(
  SEARCH_SKILLS_LIST_SUCCESS,
  (payload) => payload
)

export const searchSkillListFailure = createAction(
  SEARCH_SKILLS_LIST_FAILURE,
  (payload) => payload
)
