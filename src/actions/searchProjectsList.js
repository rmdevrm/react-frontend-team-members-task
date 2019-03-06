import { createAction } from 'redux-actions'

import {
  SEARCH_PROJECTS_LIST_REQUEST,
  SEARCH_PROJECTS_LIST_SUCCESS,
  SEARCH_PROJECTS_LIST_FAILURE
} from './actionTypes'

export const searchProjectsListRequest = createAction(
  SEARCH_PROJECTS_LIST_REQUEST,
  (payload) => payload
)

export const searchProjectsListSuccess = createAction(
  SEARCH_PROJECTS_LIST_SUCCESS,
  (payload) => payload
)

export const searchProjectsListFailure = createAction(
  SEARCH_PROJECTS_LIST_FAILURE,
  (payload) => payload
)
