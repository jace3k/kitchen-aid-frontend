import React from 'react'
import { Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { TranslationTokensType } from 'utils/translations'
import StyledFab from '../StyledFab/StyledFab'
import Token from 'components/Token'
import { Box } from '@mui/system'


interface MainHeaderProps {
  title: TranslationTokensType
  addTitle: TranslationTokensType
  onClickAddBtn: () => void
}

const MainHeader: React.FC<MainHeaderProps> = ({ title, addTitle, onClickAddBtn }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

    }}>
      <h1><Token value={title} /></h1>
      <Tooltip title={<Token value={addTitle} />} placement='left'>
        <StyledFab color="primary" onClick={onClickAddBtn}>
          <AddIcon />
        </StyledFab>
      </Tooltip>
    </Box>
  )
}

export default MainHeader
