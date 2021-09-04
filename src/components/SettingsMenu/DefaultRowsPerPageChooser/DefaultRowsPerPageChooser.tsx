import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import Token from 'components/Token'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from 'store'
import { setDefaultItemsPerPage } from 'store/user/actions'
import { ROWS_PER_PAGE_OPTIONS } from 'utils/constants'

const DefaultRowsPerPageChooser = () => {
  const currentRowsPerPage = useSelector((state: ApplicationState) => state.user.itemsPerPage)
  const dispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(setDefaultItemsPerPage(event.target.value as number))
  }

  return (
    <FormControl size="small" variant='outlined' fullWidth>
      <InputLabel id="lang-selector">
        <Token value='rowsPerPage' />
      </InputLabel>
      <Select
        labelId='lang-selector'
        label={<Token value='rowsPerPage' />}
        value={currentRowsPerPage}
        onChange={handleChange}
      >
        {ROWS_PER_PAGE_OPTIONS.map(num => (
          <MenuItem value={num} key={`key-${num}`}>
            {num}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default DefaultRowsPerPageChooser
