import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { teamMemberListRequest } from '../actions/teamMemberList'
import DisplayMemberList from '../components/displayMemberList'
import Loader from '../components/wrappers/Loader'
import MemberListFilter from '../components/memberListFilter'
import Styles from '../styles/teamMemberContainer';

class TeamMembersListContainer extends Component {
  state = {
    // Maintain the pageNumber for table pagination
    pageNumber: 0
  }

  handleChangePage = (event, page) => {
    const { pagination, filters } = this.props.teamMembersStates
    // Fetching the data as per selected previous and back button
    this.props.getTeamMemberList(page + 1, pagination.pageSize, filters);
    this.setState({ pageNumber: page });
  };

  componentWillReceiveProps(nextProps) {
    const { pageNumber } = this.state
    const { pageNumber: newPageNumber } = nextProps.teamMembersStates.pagination
    if (pageNumber !== 0 && newPageNumber !== pageNumber) {
      this.setState({ pageNumber: newPageNumber })
    }
  }

  render() {
    const { teamMembersStates, getTeamMemberList, classes } = this.props
    const { membersList, pagination, isPending } = this.props.teamMembersStates
    const { pageSize, totalElements } = pagination

    return (
      <Paper className={classes.root} >
        <MemberListFilter
          teamMembersStates={teamMembersStates}
          getTeamMembersList={getTeamMemberList}
        />
        {
          !isPending
            ? <DisplayMemberList
              memberList={membersList}
              pageNumber={this.state.pageNumber}
              pageSize={pageSize}
              totalElements={totalElements}
              handleChangePageCB={this.handleChangePage}
            />
            : <Loader />
        }
      </Paper>
    );
  }

  componentDidMount() {
    // Get the first page on component mount
    const { pagination, filters } = this.props.teamMembersStates;
    this.props.getTeamMemberList(pagination.pageNumber, pagination.pageSize, filters);
  }
}

const mapStateToProps = (state) => ({ teamMembersStates: state.teamMembers });

const mapDispatchToProps = (dispatch) => ({
  getTeamMemberList: (pageNumber, pageSize, filters) => dispatch(teamMemberListRequest({ pageNumber, pageSize, filters }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(TeamMembersListContainer));