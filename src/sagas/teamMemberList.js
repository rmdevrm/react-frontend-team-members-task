import { takeLatest, put, delay } from 'redux-saga/effects'

import { TEAM_MEMBERS_LIST_REQUEST } from '../actions/actionTypes'
import { teamMemberListSuccess, teamMemberListFailure } from '../actions'
import TeamMemberAPIHelper from '../services/teamMemberList'

function * startTeamMemberListSagaFlow ({ payload }) {
  try {
    yield delay(2000)
    const { pageNumber, pageSize, filter } = payload
    const response = TeamMemberAPIHelper.GetTeamMembersList(pageNumber, pageSize, filter)
    yield put(teamMemberListSuccess({ response }))
  } catch (err) {
    yield put(teamMemberListFailure({ msg: err }))
  }
}

export function * teamMemberListSaga () {
  yield takeLatest(TEAM_MEMBERS_LIST_REQUEST, startTeamMemberListSagaFlow)
}
