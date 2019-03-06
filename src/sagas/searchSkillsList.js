import { takeLatest, put } from 'redux-saga/effects'

import { SEARCH_SKILLS_LIST_REQUEST } from '../actions/actionTypes'
import { searchSkillListSuccess, searchSkillListFailure } from '../actions/searchSkillsList'
// import TeamMemberAPIHelper from '../services/teamMemberList'

function * startSearchSkillsListFlow ({ payload }) {
  try {
    // TODO: Send parameters
    // const response = TeamMemberAPIHelper.GetTeamMembersList()
    yield put(searchSkillListSuccess({ response: [{ id: 1, name: 'react' }, { id: 2, name: 'node' }] }))
  } catch (err) {
    yield put(searchSkillListFailure({ msg: err }))
  }
}

export function * searchSkillsListSaga () {
  yield takeLatest(SEARCH_SKILLS_LIST_REQUEST, startSearchSkillsListFlow)
}
