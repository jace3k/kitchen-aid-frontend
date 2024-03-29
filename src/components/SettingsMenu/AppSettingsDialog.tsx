import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Table, TableBody, TableCell, TableRow } from '@mui/material'
import Token from 'components/Token'
import LanguageChooser from 'components/SettingsMenu/LanguageChooser/LanguageChooser'
import DefaultRowsPerPageChooser from './DefaultRowsPerPageChooser/DefaultRowsPerPageChooser'


interface AppSettingsDialogProps {
  open: boolean,
  onClose: () => void,
}

const AppSettingsDialog: React.FC<AppSettingsDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth id="app-settings-dialog">
      <DialogTitle><Token value="settings" /></DialogTitle>
      <DialogContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Token value="language" />
              </TableCell>
              <TableCell>
                <LanguageChooser />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Token value="defaultRowsPerPageLabel" />
              </TableCell>
              <TableCell>
                <DefaultRowsPerPageChooser />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button id="app-settings-button-ok" onClick={onClose} color="primary">
          <Token value="ok" />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AppSettingsDialog
