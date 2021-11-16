import React from 'react'
import { Table, TableBody, TableRow, TableCell, IconButton, Divider } from '@mui/material'
import PlusButton from '@mui/icons-material/Add'
import { ListItemsInterface } from './list-items.interface'
import Token from 'components/Token'


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
