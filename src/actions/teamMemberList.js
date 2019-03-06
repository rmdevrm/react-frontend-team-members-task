import { createAction } from 'redux-actions'

import {
  TEAM_MEMBERS_LIST_REQUEST,
  TEAM_MEMBERS_LIST_SUCCESS,
  TEAM_MEMBERS_LIST_FAILURE,
  TEAM_MEMBERS_LIST_FILTER_CLEAR
} from './actionTypes'

export const teamMemberListFilterClear = createAction(TEAM_MEMBERS_LIST_FILTER_CLEAR)

export const teamMemberListRequest = createAction(
  TEAM_MEMBERS_LIST_REQUEST,
  (payload) => payload
)

export const teamMemberListSuccess = createAction(
  TEAM_MEMBERS_LIST_SUCCESS,
  (payload) => payload
)

export const teamMemberListFailure = createAction(
  TEAM_MEMBERS_LIST_FAILURE,
  (payload) => payload
)
