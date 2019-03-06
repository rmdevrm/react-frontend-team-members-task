import moment from 'moment'
import axios from 'axios'

const RAILS_APP_URL = ''

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
  // TODO: need to add parameter
  static GetTeamMembersList () {
    let newItems = [...items]
    for (let index = 0; index < 9; index++) {
      newItems.push({
        'skills': [
          'js',
          'Angular',
          'python'
        ],
        'on_holidays_till': moment().add(4, 'days').toDate(),
        'free_since': moment().subtract(-1, 'days').toDate(),
        manager_id: {
          'last_name': `test ${index + 2}`,
          'first_name': 'manager',
          'id': index + 2
        },
        current_project: {
          'project_name': `project ${index + 2}`,
          'id': index + 2
        },
        'last_name': `member ${index + 2}`,
        'first_name': 'test',
        'id': index + 2
      })
    }

    return {
      'items': newItems,
      'has_previous': false,
      'has_next': true,
      'page_size': 10,
      'total_pages': 1,
      'total_elements': 10,
      'page': 1
    }
  }

  static async fetchDataBySearchText (searchType, inputValue) {
    let response
    try {
      response = await axios(`${RAILS_APP_URL}/team_members?${searchType}=${inputValue}`)
    } catch (e) {
      console.error('Error occurred while fetching the search data', e)
      response = { error: e }
    }
    return response
  }
}

export default TeamMemberAPIHelper
