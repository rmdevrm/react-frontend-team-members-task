import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { teamMemberListRequest } from '../actions/teamMemberList';
import DisplayMemberList from '../components/displayMemberList';
import MemberListFilter from '../components/memberListFilter';

const styles = () => ({
  root: {
    maxWidth: '90vw',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '1rem',
  }
});

class TeamMembersListContainer extends Component {

  handleChangePage = (event, page) => {
    if (page !== 0) {
      const { pageSize, filters } = this.props
      this.props.getTeamMemberList(page, pageSize, filters);
      this.setState({ pageNumber: page + 1 });
    }
  };

  render() {
    const { membersList, pagination } = this.props.teamMembersStates;

    return (
      <Paper className={this.props.classes.root} >
        <MemberListFilter getTeamMembersList={this.props.getTeamMemberList} />
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
    const { pageNumber, pageSize, filters } = this.props;
    this.props.getTeamMemberList(pageNumber, pageSize, filters);
  }
}

const mapStateToProps = (state) => ({ teamMembersStates: state.teamMembers });

const mapDispatchToProps = (dispatch) => ({
  getTeamMemberList: (pageNumber, pageSize, filter) => dispatch(teamMemberListRequest({ pageNumber, pageSize, filter }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TeamMembersListContainer));