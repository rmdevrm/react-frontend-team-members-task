import moment from 'moment'

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

export default CommonHelper
