import { createAction } from 'redux-actions'

import {
  SEARCH_PROJECTS_LIST_SUCCESS,
  SEARCH_PROJECTS_LIST_CLEAR,
  SEARCH_PROJECTS_LIST_FAILURE
} from './actionTypes'

export const searchProjectsListClear = createAction(SEARCH_PROJECTS_LIST_CLEAR)

export const searchProjectsListSuccess = createAction(
  SEARCH_PROJECTS_LIST_SUCCESS,
  (payload) => payload
)

export const searchProjectsListFailure = createAction(
  SEARCH_PROJECTS_LIST_FAILURE,
  (payload) => payload
)
