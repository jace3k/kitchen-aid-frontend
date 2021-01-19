import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@material-ui/core'
import Token from 'components/Token'
import LanguageChooser from 'components/LanguageChooser/LanguageChooser'

interface AppSettingsDialogProps {
  open: boolean,
  onClose: () => void,
}

const AppSettingsDialog: React.FC<AppSettingsDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle><Token value="settings" /></DialogTitle>
      <DialogContent>
        <LanguageChooser />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          <Token value="ok" />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AppSettingsDialog
