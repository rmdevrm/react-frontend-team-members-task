import { takeLatest, put } from 'redux-saga/effects'

import { TEAM_MEMBERS_LIST_REQUEST } from '../actions/actionTypes'
import { teamMemberListSuccess, teamMemberListFailure } from '../actions'
import TeamMemberAPIHelper from '../services/teamMemberList'

function * startTeamMemberListSagaFlow ({ payload }) {
  const { pageNumber, pageSize, filters } = payload
  const [response, error] = yield TeamMemberAPIHelper.GetTeamMembersList(pageNumber, pageSize, filters)
  if (error) {
    yield put(teamMemberListFailure({ msg: 'Error occured while fetching the team member list' }))
  } else {
    yield put(teamMemberListSuccess({ response }))
  }
}

export function * teamMemberListSaga () {
  yield takeLatest(TEAM_MEMBERS_LIST_REQUEST, startTeamMemberListSagaFlow)
}
