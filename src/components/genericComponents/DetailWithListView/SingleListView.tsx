import React from 'react'
import { Table, TableBody, TableRow, TableCell, IconButton, Divider } from '@material-ui/core'
import PlusButton from '@material-ui/icons/Add'
import Token from 'components/Token'
import { ListItemsInterface } from './list-items.interface'

interface SingleListViewProps {
  generateItem: ListItemsInterface
}

const SingleListView: React.FC<SingleListViewProps> = ({ generateItem }) => {
  // in SingleListView - generateItemsList has only one element
  const { name, list, onAddToListClick } = generateItem

  return (
    <div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <h2><Token value={name} /></h2>
            </TableCell>
            <TableCell>
              <span onClick={onAddToListClick}>
                <IconButton size="small" style={{ float: 'right' }}>
                  <PlusButton />
                </IconButton>
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Divider />
      {list()}
    </div>
  )
}

export default SingleListView
