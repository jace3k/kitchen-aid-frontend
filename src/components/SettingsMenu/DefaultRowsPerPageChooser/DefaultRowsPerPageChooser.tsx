import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { ApplicationState } from 'store'
import { setDefaultItemsPerPage } from 'store/user/actions'
import { ROWS_PER_PAGE_OPTIONS } from 'utils/constants'
import Token from 'components/Token'


const DefaultRowsPerPageChooser = () => {
  const currentRowsPerPage = useSelector((state: ApplicationState) => state.user.itemsPerPage)
  const dispatch = useDispatch()

  const handleChange = (event: SelectChangeEvent<number>) => {
    dispatch(setDefaultItemsPerPage(event.target.value as number))
  }

  return (
    <FormControl id="def-rows-per-page-chooser" size="small" variant='outlined' fullWidth>
      <InputLabel id="lang-selector">
        <Token value='rowsPerPage' />
      </InputLabel>
      <Select
        id="def-rows-per-page-select"
        labelId='lang-selector'
        label={<Token value='rowsPerPage' />}
        value={currentRowsPerPage}
        onChange={handleChange}
      >
        {ROWS_PER_PAGE_OPTIONS.map(num => (
          <MenuItem id={`def-rows-per-page-menu-item-${num}`} value={num} key={`key-${num}`}>
            {num}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default DefaultRowsPerPageChooser
