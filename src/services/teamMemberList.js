import moment from 'moment'
import axios from 'axios'

// Rails App URL
const RAILS_API_URL = `${process.env.REACT_APP_RAILS_APP_URL}/api/team_members`

const items = [
  {
    'skills': [
      'js',
      'Angular',
      'python'
    ],
    'manager_id': {
      'last_name': 'manager',
      'first_name': 'test 1',
      'id': 1
    },
    'on_holidays_till': moment().add(4, 'days'),
    'free_since': moment().subtract(-1, 'days'),
    'current_project': {
      'project_name': 'project 1',
      'id': 1
    },
    'working_hours': {
      'timezone': 'PST',
      'end': '',
      'start': ''
    },
    'last_name': 'member 1',
    'first_name': 'test',
    'id': 1
  }
]

class TeamMemberAPIHelper {
  static async GetTeamMembersList (pageNumber, pageSize, filters) {
    const paramsObj = {
      page: pageNumber,
      per: pageSize
    }
    filters && filters.forEach((filter) => {
      if (filter.type === 'availability') {
        paramsObj[`${filter.value}`] = true
      } else {
        paramsObj[`${filter.type}`] = filter.value
      }
    })
    let response
    try {
      response = await axios.get(`http://192.168.3.87:5000/api/team_members`, { params: paramsObj })
    } catch (e) {
      console.log('Error occured while fetching the team members list', e)
      response = { error: e }
    }
    return [response.data, response.error]
  }

  static async fetchDataBySearchText (searchType, inputValue) {
    let response
    try {
      // TODO: modify the rails_app_url
      response = await axios.get(`http://192.168.3.87:3000/api/${searchType}/autocomplete`, {
        params: {
          [`${searchType}`]: inputValue
        }
      })
    } catch (e) {
      console.error('Error occurred while fetching the search data', e)
      response = { error: e }
    }
    return [response.data, response.error]
  }
}

export default TeamMemberAPIHelper
