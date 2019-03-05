import React from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

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
            <TableCell>{row.firstName}</TableCell>
            <TableCell padding='none'>{row.lastName}</TableCell>
            <TableCell>{row.lastName}</TableCell>
            <TableCell align='right'>{row.project}</TableCell>
            <TableCell>{row.skills}</TableCell>
            <TableCell align='right'>{row.working}</TableCell>
            <TableCell>{row.holiday}</TableCell>
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
