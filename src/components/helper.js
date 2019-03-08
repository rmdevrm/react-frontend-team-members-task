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

  getSkills (skills) {
    return skills.length ? skills.join() : ''
  },

  filterList (items, isProjectList) {
    return items.map((item) => {
      item.label = `${item.name}`
      item.value = isProjectList ? item.id : item.name
      return item
    })
  }

}

const APIHelper = {
  async getProjectsList (inputValue) {
    let [response, error] = await TeamMemberAPIHelper.fetchDataBySearchText('projects', inputValue)
    if (error) {
      store.dispatch(searchProjectsListFailure({ msg: 'Error occured while calling the API' }))
    } else {
      response = CommonHelper.filterList(response, true)
      store.dispatch(searchProjectsListSuccess({ response }))
    }
    return error ? [] : response
  },

  async getSkillsList (inputValue) {
    let [response, error] = await TeamMemberAPIHelper.fetchDataBySearchText('skills', inputValue)
    if (error) {
      store.dispatch(searchSkillListFailure({ msg: 'Error occured while calling the API' }))
    } else {
      response = CommonHelper.filterList(response)
      store.dispatch(searchSkillListSuccess({ response }))
    }
    return error ? [] : response
  }
}

export { CommonHelper, APIHelper }
