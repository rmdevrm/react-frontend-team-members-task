import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

class MemberListHeader extends React.Component {
  render () {
    const { columns } = this.props

    return (
      <TableHead>
        <TableRow>
          {columns.map(
            column => (
              <TableCell key={column}>
                <span>{column}</span>
              </TableCell>
            )
          )}
        </TableRow>
      </TableHead>
    )
  }
}

export default MemberListHeader
