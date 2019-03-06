import { takeLatest, put } from 'redux-saga/effects'

import { SEARCH_PROJECTS_LIST_REQUEST } from '../actions/actionTypes'
import { searchProjectsListSuccess, searchProjectsListFailure } from '../actions/searchProjectsList'
// import TeamMemberAPIHelper from '../services/teamMemberList'

function * startSearchProjectsListFlow ({ payload }) {
  try {
    // TODO: Send parameters
    // const response = TeamMemberAPIHelper.GetTeamMembersList()
    yield put(searchProjectsListSuccess({ response: [{ id: 1, name: 'Dapp' }, { id: 2, name: 'Dapp2' }] }))
  } catch (err) {
    yield put(searchProjectsListFailure({ msg: err }))
  }
}

export function * searchProjectsListSaga () {
  yield takeLatest(SEARCH_PROJECTS_LIST_REQUEST, startSearchProjectsListFlow)
}
