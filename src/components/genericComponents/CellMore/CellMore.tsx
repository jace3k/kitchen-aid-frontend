import React from 'react'
import { IconButton, Stack, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/CancelOutlined'
import RemoveIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import NewTabIcon from '@mui/icons-material/OpenInNew'
import Token from 'components/Token'

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
  const placement = "top"

  return (
    <Stack direction="row" justifyContent="end">
      {
        canEdit && (
          editMode
            ? (
              <>
                <Tooltip title={<Token value="ok" />} placement={placement}>
                  <span>
                    <IconButton
                      size="small"
                      onClick={handleUpdate}
                    >
                      <CloseIcon color="success" />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title={<Token value="cancel" />} placement={placement}>
                  <span>
                    <IconButton
                      size="small"
                      onClick={handleClose}
                    >
                      <CancelIcon color="warning" />
                    </IconButton>
                  </span>
                </Tooltip>
              </>
            )
            : (
              <Tooltip title={<Token value="edit" />} placement={placement}>
                <span>
                  <IconButton
                    size="small"
                    onClick={handleEdit}
                    disabled={loading}
                  >
                    <EditIcon />
                  </IconButton>
                </span>
              </Tooltip>
            )
        )
      }
      {
        canOpenNewWindow && (
          <Tooltip title={<Token value="openNewWindow" />} placement={placement}>
            <span>
              <IconButton
                size="small"
                onClick={handleOpenNewWindow}
                disabled={loading}
              >
                <NewTabIcon />
              </IconButton>
            </span>
          </Tooltip>
        )
      }
      {
        canRemove && (
          <Tooltip title={<Token value="delete" />} placement={placement}>
            <span>
              <IconButton
                size="small"
                disabled={loading}
                onClick={handleRemove}
              >
                <RemoveIcon />
              </IconButton>
            </span>
          </Tooltip>
        )
      }
    </Stack>
  )
}

export default CellMore
