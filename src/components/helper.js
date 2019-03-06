import moment from 'moment'
import store from '../store'
import {
  searchProjectsListSuccess,
  searchProjectsListFailure
} from '../actions/searchProjectsList'

import {
  searchSkillListSuccess,
  searchSkillListFailure
} from '../actions/searchSkillsList'

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
      store.dispatch(searchProjectsListSuccess({ response }))
    } else {
      store.dispatch(searchProjectsListFailure({ msg: response.error }))
    }
    return response.error ? [] : response
  },

  async getSkillsList (inputValue) {
    const response = await TeamMemberAPIHelper.fetchDataBySearchText('skills', inputValue)
    if (response.error) {
      store.dispatch(searchSkillListSuccess({ response }))
    } else {
      store.dispatch(searchSkillListFailure({ msg: response.error }))
    }
    return response.error ? [] : response
  }
}

export { CommonHelper, APIHelper }
