import React from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { CommonHelper } from './helper'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
})

const MemberListBody = ({ rows, emptyRows }) => {
  return (
    <TableBody>
      {rows.map(row => {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={row.id}>
            <TableCell align='right'>{row.id}</TableCell>
            <TableCell>
              {CommonHelper.getName(row.first_name, row.last_name)}
            </TableCell>
            <TableCell padding='none'>
              {CommonHelper.getName(row.manager_id.first_name, row.manager_id.last_name)}
            </TableCell>
            <TableCell>
              {CommonHelper.getSkills(row.skills)}
            </TableCell>
            <TableCell align='right'>
              {row.current_project.project_name}
            </TableCell>
            <TableCell>
              {CommonHelper.isMemberOnHoliday(row.on_holidays_till) ? 'Yes' : 'No'}
            </TableCell>
            <TableCell align='right'>
              {CommonHelper.isMemberOnWorking(row.free_since) ? 'Yes' : 'No'}
            </TableCell>
          </TableRow>
        )
      })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 49 * emptyRows }}>
          <TableCell colSpan={7} />
        </TableRow>
      )}
    </TableBody>
  )
}

export default withRouter(withStyles(styles, { withTheme: true })(MemberListBody))
