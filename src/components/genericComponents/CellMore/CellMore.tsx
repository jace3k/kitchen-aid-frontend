import React from 'react'
import { IconButton, Stack } from '@mui/material'
import CloseIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/CancelOutlined'
import RemoveIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import NewTabIcon from '@mui/icons-material/OpenInNew'

interface CellMoreProps {
  handleUpdate?: () => void
  handleClose?: () => void
  handleEdit?: () => void
  handleRemove?: () => void
  handleOpenNewWindow?: () => void
  editMode?: boolean
  loading?: boolean
  canEdit?: boolean
  canRemove?: boolean
  canOpenNewWindow?: boolean
}

const CellMore: React.FC<CellMoreProps> = ({
  handleUpdate,
  handleClose,
  handleEdit,
  handleRemove,
  handleOpenNewWindow,
  editMode,
  loading,
  canEdit,
  canRemove,
  canOpenNewWindow
}) => {
  return (
    <Stack direction="row" justifyContent="end">
      {
        canEdit && (
          editMode
            ? (
              <>
                <IconButton
                  size="small"
                  onClick={handleUpdate}
                >
                  <CloseIcon color="success" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleClose}
                >
                  <CancelIcon color="warning" />
                </IconButton>
              </>
            )
            : (
              <IconButton
                size="small"
                onClick={handleEdit}
                disabled={loading}
              >
                <EditIcon />
              </IconButton>
            )
        )
      }
      {
        canOpenNewWindow && (
          <IconButton
            size="small"
            onClick={handleOpenNewWindow}
            disabled={loading}
          >
            <NewTabIcon />
          </IconButton>
        )
      }
      {
        canRemove && (
          <IconButton
            size="small"
            disabled={loading}
            onClick={handleRemove}
          >
            <RemoveIcon />
          </IconButton>
        )
      }
    </Stack>
  )
}

export default CellMore
