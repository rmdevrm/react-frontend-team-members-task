import axios from 'axios'

// Rails App URL
const RAILS_API_URL = `${process.env.REACT_APP_RAILS_APP_URL}/api`

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
      response = await axios.get(`${RAILS_API_URL}/team_members`, { params: paramsObj })
    } catch (e) {
      console.log('Error occured while fetching the team members list', e)
      response = { error: e }
    }
    return [response.data, response.error]
  }

  static async fetchDataBySearchText (searchType, inputValue) {
    let response
    try {
      response = await axios.get(`${RAILS_API_URL}/${searchType}/autocomplete`, {
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
