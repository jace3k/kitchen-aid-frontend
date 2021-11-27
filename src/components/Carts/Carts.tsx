import React, { useEffect, useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CellProps, Column, Row } from 'react-table'
import { Container, Typography } from '@mui/material'
import { ApplicationState } from 'store'
import { fetchAllCartsRequest } from 'store/carts/actions'
import { Cart } from 'utils/interfaces/cart.interface'
import * as routes from 'utils/routes'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'
import Token from 'components/Token'
import CartName from './CartName'
import TextFilter from 'components/genericComponents/Filters/TextFilter'


const Carts: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch()
  const { carts, loading } = useSelector((state: ApplicationState) => state.carts)
  const { retreats } = useSelector((state: ApplicationState) => state.retreats)

  const onRowClick = (row: Row<Cart>) => {
    history.push(routes.Carts + '/' + row.original.id)
  }

  useEffect(() => {
    dispatch(fetchAllCartsRequest())
  }, [])

  const columns: Column<Cart>[] = useMemo(() => [
    {
      id: '1',
      accessor: 'id',
      Header: <Token value="cartLabel" />,
      Cell: ({ row }: CellProps<Cart>) => {
        return <CartName id={row.original.id} />
      },
      Filter: TextFilter,
    },
    {
      id: '2',
      accessor: 'retreat',
      Header: <Token value="retreatName" />,
      sortType: (a: Row<Cart>, b: Row<Cart>) => {
        return a.original.retreat.name.toLowerCase().localeCompare(b.original.retreat.name.toLowerCase())
      },
      Cell: ({ row }: CellProps<Cart>) => {
        return (
          <Typography sx={{ minWidth: 150 }}>
            {row.original.retreat.name}
          </Typography>
        )
      },
      Filter: TextFilter,
      filter: (rows: Row<Cart>[], columnIds: String[], filterValue: string) => {
        return rows.filter(row => row.original.retreat.name.toLowerCase().includes(filterValue.toLowerCase()))
      },
    },
  ], [])

  return (
    <Container style={{ minWidth: 300 }}>
      <h1><Token value="carts" /></h1>
      <GenericTable
        columns={columns}
        data={carts}
        loading={loading}
        onRowClick={onRowClick}
      />
    </Container>
  )
}

export default Carts
