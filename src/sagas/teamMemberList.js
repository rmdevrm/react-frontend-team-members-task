import { takeLatest, put } from 'redux-saga/effects'

import { TEAM_MEMBERS_LIST_REQUEST } from '../actions/actionTypes'
import { teamMemberListSuccess, teamMemberListFailure } from '../actions/teamMemberList'
// import teamMemberAPIHelper from '../services/teamMemberList'

function * startTeamMemberListSagaFlow ({ payload }) {
  console.log('startTeamMemberListSagaFlow ')
  try {
    // TODO: Need to call the API
    yield put(teamMemberListSuccess({ response: [] }))
  } catch (err) {
    yield put(teamMemberListFailure({ msg: err }))
  }
}

export function * teamMemberListSaga () {
  yield takeLatest(TEAM_MEMBERS_LIST_REQUEST, startTeamMemberListSagaFlow)
}
