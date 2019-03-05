import { takeLatest, put } from 'redux-saga/effects'

import { TEAM_MEMBERS_LIST_REQUEST } from '../actions/actionTypes'
import { teamMemberListSuccess, teamMemberListFailure } from '../actions/teamMemberList'
import TeamMemberAPIHelper from '../services/teamMemberList'

function * startTeamMemberListSagaFlow ({ payload }) {
  try {
    // TODO: Send parameters
    const response = TeamMemberAPIHelper.GetTeamMembersList()
    yield put(teamMemberListSuccess({ response }))
  } catch (err) {
    yield put(teamMemberListFailure({ msg: err }))
  }
}

export function * teamMemberListSaga () {
  yield takeLatest(TEAM_MEMBERS_LIST_REQUEST, startTeamMemberListSagaFlow)
}
