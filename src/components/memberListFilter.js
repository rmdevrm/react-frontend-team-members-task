import React, { Component } from 'react'
import { connect } from 'react-redux'
import AsyncSelect from 'react-select/lib/Async'
import { withStyles } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import DeleteIcon from '@material-ui/icons/Delete'
import Paper from '@material-ui/core/Paper'
import _ from 'lodash'
import {
  Select as MaterialSelect,
  InputLabel,
  MenuItem,
  Button
} from '@material-ui/core'
import { APIHelper } from './helper'
import {
  teamMemberListFilterClear,
  searchProjectsListClear,
  searchSkillListClear
} from '../actions'

import Styles from '../styles/memberListFilter'

class MemberListFilter extends Component {
  state = {
    selectAvailability: 'All',
    selectedProject: {},
    selectedSkills: []
  }

  // Added debounce functionality to restrict the search API calling after every keyword
  projectsListDebounce = _.debounce((value, callback) => {
    this.getProjectsList(value, callback)
  }, 1000);

  skillsListDebounce = _.debounce((value, callback) => {
    this.getSkillsList(value, callback)
  }, 1000);

  getProjectsList = async (val, callback) => {
    if (!val) return callback([])
    // Fetch projects List
    const projectsList = await APIHelper.getProjectsList(val)
    return callback(projectsList)
  }

  getSkillsList = async (val, callback) => {
    if (!val) return []
    // Fetch skills List
    const skillsList = await APIHelper.getSkillsList(val)
    return callback(skillsList)
  }

  onProjectFieldChange = (selectedProject) => {
    this.setState({ selectedProject });
  }

  onSkillFieldChange = (selectedSkills) => {
    this.setState({ selectedSkills });
  }

  handleSelectChange = (event) => {
    this.setState({ selectAvailability: event.target.value });
  }

  searchByFilters = () => {
    const { selectAvailability, selectedProject, selectedSkills } = this.state;
    let filters = []
    // Create filters array
    if (selectAvailability !== 'All') {
      filters.push({ type: 'availability', value: selectAvailability })
    }
    if (selectedProject) {
      filters.push({ type: 'project', value: selectedProject.value })
    }
    if (selectedSkills) {
      filters.push({
        type: 'skills',
        value: selectedSkills.map((skill) => skill.value)
      })
    }
    // Search using filters
    this.props.getTeamMembersList(1, 10, filters)
  }

  clearFilters = () => {
    this.setState({
      selectAvailability: 'All',
      selectedProject: {},
      selectedSkills: []
    })
    // Clear filter of memberList reducer
    this.props.clearFilter()
    // Clear autocomplete field filter
    this.props.clearProjectsList()
    this.props.clearSkillsList()
  }

  render() {
    const { classes, teamMembersStates } = this.props

    return (
      <div className={'filter'}>
        <Paper zdepth={2}>
          <div className={'filter-root'} >
            <div className={'filter-body-style'}>
              <div className={'col-xs-4'} >
                <div className={'margin-bottom-11'}>
                  <InputLabel htmlFor='select-project'>Select Project</InputLabel>
                </div>
                <AsyncSelect
                  defaultOptions
                  value={this.state.selectedProject}
                  isDisabled={teamMembersStates.isPending}
                  loadOptions={this.projectsListDebounce}
                  onChange={this.onProjectFieldChange}
                  zIndex={1000}
                />
              </div>
              <div className={'col-xs-4'} >
                <div className={'margin-bottom-11'}>
                  <InputLabel htmlFor='select-skills'>Select Skills</InputLabel>
                </div>
                <AsyncSelect
                  defaultOptions
                  isMulti
                  isSearchable
                  isDisabled={teamMembersStates.isPending}
                  value={this.state.selectedSkills}
                  loadOptions={this.skillsListDebounce}
                  onChange={this.onSkillFieldChange}
                  zIndex={1000}
                />
              </div>
              <div className={'col-xs-4 select-option-root'} >
                <div className={'margin-bottom-11'}>
                  <InputLabel htmlFor='select-availibility'>Select Availibility</InputLabel>
                </div>
                <MaterialSelect
                  value={this.state.selectAvailability}
                  disabled={teamMembersStates.isPending}
                  classes={{ select: classes.selectRootStyle }}
                  onChange={this.handleSelectChange}
                  inputProps={{
                    name: 'select',
                    id: 'select-availibility'
                  }}
                >
                  <MenuItem value={'All'}>All</MenuItem>
                  <MenuItem value={'working'}>Working</MenuItem>
                  <MenuItem value={'holidays'}>Holiday</MenuItem>
                </MaterialSelect>
              </div>
            </div>
            <div className={'filter-footer-style'}>
              <Button
                onClick={this.searchByFilters}
                variant='contained'
                disabled={teamMembersStates.isPending}
                className={'margin-right-12'}
                color='secondary'>
                <SearchIcon /> Search
              </Button>
              <Button
                onClick={this.clearFilters}
                variant='contained'
                color='primary'>
                <DeleteIcon /> Clear
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (states) => ({ serachProjectsStates: states.searchProjectsList });

const mapDispatchToProps = (dispatch) => ({
  clearFilter: () => dispatch(teamMemberListFilterClear()),
  clearProjectsList: () => dispatch(searchProjectsListClear()),
  clearSkillsList: () => dispatch(searchSkillListClear())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(MemberListFilter))
