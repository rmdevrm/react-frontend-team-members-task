import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { teamMemberListRequest } from '../actions/teamMemberList';
import DisplayMemberList from '../components/displayMemberList';

const styles = () => ({
  root: {
    maxWidth: '90vw',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '1rem',
  }
});

class TeamMembersListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 0,
      pageSize: 10,
      sort: 'dateCreated',
      order: 'desc',
      filter: '',
      filterName: '',
    };
  }

  handleChangePage = (event, page) => {
    // Call API to get paged data
    this.props.getTeamMemberList(page, this.state.pageSize, this.state.filter);
    // Also update local state to maintain sort while routing to details page and back
    this.setState({ pageNumber: page });
  };

  handleFilterChange = ({ target }) => {
    const filterName = target.name;
    const filter = target.value;
    this.setState({ filter, filterName });
  }

  render() {
    const { membersList, pagination } = this.props.teamMembersStates;

    return (
      <Paper className={this.props.classes.root} >
        <DisplayMemberList
          memberList={membersList}
          pagination={pagination}
          handleChangePageCB={this.handleChangePage}
        />
      </Paper>
    );
  }

  componentDidMount() {
    // Get the first page on component mount
    const { pageNumber, pageSize, filter } = this.state;
    this.props.getTeamMemberList(pageNumber, pageSize, filter);
  }
}

const mapStateToProps = (state) => ({ teamMembersStates: state.teamMembers });

const mapDispatchToProps = (dispatch) => ({
  getTeamMemberList: (pageNumber, pageSize, filter) => dispatch(teamMemberListRequest({ pageNumber, pageSize, filter }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TeamMembersListContainer));