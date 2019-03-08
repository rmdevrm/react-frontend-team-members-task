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
    if (!val) return callback([])
    // Fetch skills List
    const skillsList = await APIHelper.getSkillsList(val)
    return callback(skillsList)
  }

  resetToFirstPage = () => {
    if (this.isAnyFilterSelected() && this.isComponentFilterReset()) {
      // Reset page to 1
      this.props.getTeamMembersList(1, 10, [])
    }
  }

  isComponentFilterReset() {
    const { selectAvailability, selectedProject, selectedSkills } = this.state
    return (selectAvailability === 'All'
      && _.isEmpty(selectedProject)
      && !selectedSkills.length)
  }

  onProjectFieldChange = (selectedProject) => {
    this.setState({ selectedProject }, () => this.resetToFirstPage());
  }

  onSkillFieldChange = (selectedSkills) => {
    this.setState({ selectedSkills }, () => this.resetToFirstPage());
  }

  handleSelectChange = (event) => {
    this.setState({ selectAvailability: event.target.value }, () => this.resetToFirstPage());
  }

  searchByFilters = () => {
    const { selectAvailability, selectedProject, selectedSkills } = this.state;
    let filters = []
    // Create filters array
    if (selectAvailability !== 'All') {
      filters.push({ type: 'availability', value: selectAvailability })
    }
    if (!_.isEmpty(selectedProject)) {
      filters.push({ type: 'project', value: selectedProject.value })
    }
    if (selectedSkills && selectedSkills.length) {
      filters.push({
        type: 'skills',
        value: selectedSkills.map((skill) => skill.value).join()
      })
    }
    // Reset page to 1
    this.props.getTeamMembersList(1, 10, filters)
  }

  isAnyFilterSelected() {
    const { teamMembersStates } = this.props
    return teamMembersStates.filters && teamMembersStates.filters.length
  }

  clearFilterStore() {
    const { clearFilter, clearProjectsList, clearSkillsList } = this.props
    clearFilter()
    // Clear autocomplete field filter
    clearProjectsList()
    clearSkillsList()
  }

  clearFilters = () => {
    const { getTeamMembersList } = this.props
    const isAnyFilterSelected = this.isAnyFilterSelected()
    if (!isAnyFilterSelected && this.isComponentFilterReset()) {
      return
    }

    this.setState({
      selectAvailability: 'All',
      selectedProject: {},
      selectedSkills: []
    })

    this.clearFilterStore()

    if (isAnyFilterSelected) {
      // Reset page to 1
      getTeamMembersList(1, 10, [])
    }
  }

  render() {
    const { classes, teamMembersStates } = this.props
    const { selectedProject, selectedSkills } = this.state

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
                  isClearable={!!(selectedProject && selectedProject.value)}
                  value={selectedProject}
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
                  value={selectedSkills}
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
                  <MenuItem value={'working_hour'}>Working</MenuItem>
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
                <DeleteIcon /> Clear All
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearFilter: () => dispatch(teamMemberListFilterClear()),
  clearProjectsList: () => dispatch(searchProjectsListClear()),
  clearSkillsList: () => dispatch(searchSkillListClear())
});

export default connect(null, mapDispatchToProps)(withStyles(Styles)(MemberListFilter))
