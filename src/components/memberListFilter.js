import React, { Component } from 'react'
import { connect } from 'react-redux'
import AsyncSelect from 'react-select/lib/Async'
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

class MemberListFilter extends Component {
  state = {
    selectAvailability: 'All',
    selectedProject: {},
    selectedSkills: []
  }

  projectsListDebounce = _.debounce((value, callback) => this.getProjectsList(value, callback), 1000);
  skillsListDebounce = _.debounce((value) => this.getSkillsList(value), 1000);

  getProjectsList = async (val, callback) => {
    if (!val) return callback([])
    const projectsList = await APIHelper.getProjectsList(val)
    return callback(projectsList)
  }

  getSkillsList = async (val, callback) => {
    if (!val) return []
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
    if (selectAvailability !== 'All') {
      filters.push({ type: 'availibility', value: selectAvailability })
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
      selectSkills: []
    })
    // Clear filter of memberList reducer
    this.props.clearFilter()
    // Clear autocomplete field filter
    this.props.clearProjectsList()
    this.props.clearSkillsList()
  }

  render() {

    return (
      <div>
        <Paper zdepth={2}>
          <div className={'container-fluid'} >
            <div className={'row container-fluid'}>
              <div className={'col-xs-4'} >
                <AsyncSelect
                  defaultOptions
                  loadOptions={this.getProjectsList}
                  onChange={this.onProjectFieldChange}
                  zIndex={1000}
                />
              </div>
              <div className={'col-xs-4'} />
              <InputLabel htmlFor='select-availibility'>Select Availibility</InputLabel>
              <MaterialSelect
                value={this.state.selectAvailability}
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
              <div className={'col-xs-4'} >
                <AsyncSelect
                  defaultOptions
                  isMulti
                  loadOptions={this.getSkillsList}
                  onChange={this.onSkillFieldChange}
                  zIndex={1000}
                />
              </div>
            </div>
            <Button
              onClick={this.searchByFilters}
              variant='contained'
              color='secondary'>
              Search
            </Button>
            <Button
              onClick={this.clearFilters}
              variant='contained'
              color='primary'>
              Clear
            </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(MemberListFilter)