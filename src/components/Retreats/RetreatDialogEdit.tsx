import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import Token from 'components/Token'
import { useDispatch } from 'react-redux'
import { createRetreatRequest } from 'store/retreats/actions'

interface RetreatDialogEdit {
  open: boolean,
  onClose: () => void,
}

const RetreatDialogEdit: React.FC<RetreatDialogEdit> = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  const handleCreateRetreat = () => {
    dispatch(createRetreatRequest({ name }))
    setName('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle><Token value={"addNewRetreat"} /></DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={<Token value="retreatName" />}
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          <Token value="cancel" />
        </Button>
        <Button onClick={handleCreateRetreat} color="primary">
          <Token value="create" />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RetreatDialogEdit
