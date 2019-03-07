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
  // static async GetTeamMembersList (pageNumber, pageSize, filters) {
  //   const paramsObj = {
  //     page: pageNumber,
  //     per_page: pageSize
  //   }
  //   filters.forEach((filter) => {
  //     if (filter.type === 'availability') {
  //       paramsObj[`${filter.value}`] = true
  //     } else {
  //       paramsObj[`${filter.type}`] = filter.value
  //     }
  //   })
  //   const response = await axios.get(RAILS_API_URL, { params: paramsObj })
  //   return response
  // }

  // TODO: need to add parameter
  static GetTeamMembersList (pageNumber, pageSize, filter) {
    console.log('arguments', arguments)
    const TOTAL_ELEMENTS = 22
    let RANGE
    if (pageNumber === 1) {
      RANGE = 10
    } else if (pageNumber === 2) {
      RANGE = 10
    } else {
      RANGE = 2
    }
    let newItems = [...items]
    for (let index = 0; index < RANGE; index++) {
      newItems.push({
        'skills': [
          'js',
          'Angular',
          'python'
        ],
        'on_holidays_till': moment().add(4, 'days').toDate(),
        'free_since': moment().subtract(-1, 'days').toDate(),
        manager_id: {
          'last_name': `test ${index + pageNumber + 2}`,
          'first_name': 'manager',
          'id': index + pageNumber + 2
        },
        current_project: {
          'project_name': `project ${index + pageNumber + 2}`,
          'id': index + 2
        },
        'last_name': `member ${index + pageNumber + 2}`,
        'first_name': 'test',
        'id': pageNumber
      })
    }

    return {
      'items': newItems,
      'has_previous': false,
      'has_next': true,
      'page_size': 10,
      'total_pages': 2,
      'total_elements': TOTAL_ELEMENTS,
      'page': 1
    }
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
