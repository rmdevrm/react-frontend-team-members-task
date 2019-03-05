import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import Paper from '@material-ui/core/Paper'
import MemberListHeader from './memberListHeader'
import MemberListBody from './memberListBody'
import MemberListPagination from './memberListPagination'
import CommonHelper from './helper'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: 'auto'
  }
})

class DisplayTeamMemberList extends Component {
  render () {
    const {
      memberList,
      pagination,
      classes,
      handleChangePageCB
    } = this.props

    const emptyRows = pagination.pageSize - memberList.length

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby='tableTitle'>
            <MemberListHeader columns={CommonHelper.getColumnsForTeamMembersList()} />
            <MemberListBody
              rows={memberList}
              emptyRows={emptyRows}
            />
            <MemberListPagination
              total={pagination.totalElements}
              size={pagination.pageSize}
              page={pagination.pageNumber}
              handleChangePageCB={handleChangePageCB}
            />
          </Table>
        </div>
      </Paper>
    )
  }
}

export default withRouter(withStyles(styles)(DisplayTeamMemberList))
