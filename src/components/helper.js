import moment from 'moment'
import store from '../store'
import {
  searchProjectsListSuccess,
  searchProjectsListFailure,
  searchSkillListSuccess,
  searchSkillListFailure
} from '../actions'

import TeamMemberAPIHelper from '../services/teamMemberList'

const CommonHelper = {
  getColumnsForTeamMembersList () {
    return [
      'id',
      'Member Name',
      'Manager Name',
      'Skills',
      'Project',
      'On Holiday',
      'Working'
    ]
  },

  getName (firstName, lastName) {
    return `${firstName} ${lastName}`
  },

  isMemberOnHoliday (date) {
    return moment().isSameOrBefore(moment(date))
  },

  isMemberOnWorking (date) {
    return !moment().isBefore(moment(date))
  },

  getSkills (skills) {
    return skills.length ? skills.join() : ''
  }

}

const APIHelper = {
  async getProjectsList (inputValue) {
    const response = await TeamMemberAPIHelper.fetchDataBySearchText('project', inputValue)
    if (response.error) {
      store.dispatch(searchProjectsListFailure({ msg: response.error }))
    } else {
      store.dispatch(searchProjectsListSuccess({ response }))
    }
    return response.error ? [] : response
  },

  async getSkillsList (inputValue) {
    const response = await TeamMemberAPIHelper.fetchDataBySearchText('skills', inputValue)
    if (response.error) {
      store.dispatch(searchSkillListFailure({ msg: response.error }))
    } else {
      store.dispatch(searchSkillListSuccess({ response }))
    }
    return response.error ? [] : response
  }
}

export { CommonHelper, APIHelper }
