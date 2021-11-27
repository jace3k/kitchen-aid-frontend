import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CellProps, Column, Row } from 'react-table'
import { ApplicationState } from 'store'
import { fetchAllRetreatsRequest } from 'store/retreats/actions'
import { Retreat } from 'utils/interfaces/retreat.interface'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'
import Token from 'components/Token'
import TextFilter from 'components/genericComponents/Filters/TextFilter'
import { Typography } from '@mui/material'


interface RetreatTableProps {
  onRowClick: (row: Row<Retreat>) => void
}

const RetreatTable = ({ onRowClick }: RetreatTableProps) => {
  const dispatch = useDispatch()
  const { retreats, loading } = useSelector((state: ApplicationState) => state.retreats)

  useEffect(() => {
    dispatch(fetchAllRetreatsRequest())
  }, [])

  const columns: Column<Retreat>[] = useMemo(() => [
    {
      id: '1',
      Header: <Token value="name" />,
      accessor: 'name',
      Cell: ({ row }: CellProps<Retreat>) => {
        return (
          <Typography sx={{ minWidth: 150 }}>
            {row.original.name}
          </Typography>
        )
      },
      Filter: TextFilter
    },
  ], [])

  return (
    <GenericTable
      columns={columns}
      data={retreats}
      loading={loading}
      onRowClick={onRowClick}
    />
  )
}

export default RetreatTable
