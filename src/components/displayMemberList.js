import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import Paper from '@material-ui/core/Paper'
import MemberListHeader from './memberListHeader'
import MemberListBody from './memberListBody'
import MemberListPagination from './memberListPagination'
import { CommonHelper } from './helper'
import Styles from '../styles/memberList'

class DisplayTeamMemberList extends Component {
  render () {
    const {
      memberList,
      classes,
      pageSize,
      totalElements,
      pageNumber,
      handleChangePageCB
    } = this.props
    const emptyRows = pageSize - memberList.length

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
              total={totalElements}
              size={pageSize}
              page={pageNumber}
              handleChangePageCB={handleChangePageCB}
            />
          </Table>
        </div>
      </Paper>
    )
  }
}

export default withRouter(withStyles(Styles)(DisplayTeamMemberList))
