class TeamMemberAPIHelper {
  // TODO: need to add parameter
  static GetTeamMembersList () {
    return {
      'items': [
        {
          'skills': [
            'js',
            'Angular',
            'python'
          ],
          'manager_id': {
            'last_name': 'Szeptycki',
            'first_name': 'Adam',
            'id': 22
          },
          'on_holidays_till': 'iso_date',
          'free_since': 'iso_date',
          'current_project': {
            'project_name': 12,
            'id': 55
          },
          'working_hours': {
            'timezone': 'PST',
            'end': '',
            'start': ''
          },
          'last_name': 'Szeptycki',
          'first_name': 'Adam',
          'id': 2
        }
      ],
      'has_previous': false,
      'has_next': true,
      'page_size': 10,
      'total_pages': 40,
      'total_elements': 60,
      'page': 1
    }
  }
}

export default TeamMemberAPIHelper
