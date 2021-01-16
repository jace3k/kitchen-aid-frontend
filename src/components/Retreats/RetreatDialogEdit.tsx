import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import Token from 'components/Token'
import { Retreat } from 'store/retreats/types'

interface RetreatDialogEdit {
  open: boolean,
  onClose: () => void,
  retreat?: Retreat,
}

const RetreatDialogEdit: React.FC<RetreatDialogEdit> = ({ open, onClose, retreat }) => {
  const [retreatName, setRetreatName] = useState(retreat ? retreat.name : '')

  const BtnUpdate = () => (
    <Button onClick={onClose} color="primary">
      <Token value="update" />
    </Button>
  )

  const BtnCreate = () => (
    <Button onClick={onClose} color="primary">
      <Token value="create" />
    </Button>
  )

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle><Token value={retreat ? "editName" : "addNewRetreat"} /></DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={<Token value="retreatName" />}
          value={retreatName}
          onChange={e => setRetreatName(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          <Token value="cancel" />
        </Button>
        {retreat ? <BtnUpdate /> : <BtnCreate />}
      </DialogActions>
    </Dialog>
  )
}

export default RetreatDialogEdit
