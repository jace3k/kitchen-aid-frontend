import React, { useEffect, useMemo } from 'react'
import { Column, Row } from 'react-table'
import { Retreat } from 'utils/interfaces/retreat.interface'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'store'
import Token from 'components/Token'
import { fetchAllRetreatsRequest } from 'store/retreats/actions'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'

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
