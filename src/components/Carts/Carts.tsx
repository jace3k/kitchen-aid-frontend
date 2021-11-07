import React, { useEffect, useMemo, useState } from 'react'
import { Container } from '@material-ui/core'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'
import { useStyles } from 'components/genericComponents/styles'
import Token from 'components/Token'
import { useSelector, useDispatch } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { CellProps, Column, Row } from 'react-table'
import { fetchAllCartsRequest } from 'store/carts/actions'
import { Cart } from 'utils/interfaces/cart.interface'
import * as routes from 'utils/routes'
import CartName from './CartName'
import { ApplicationState } from 'store'

const Carts: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles()
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
      Header: <Token value="cartLabel" />,
      Cell: ({ row }: CellProps<Cart>) => {
        return <CartName id={row.original.id} />
      }
    },
    {
      id: '2',
      Header: <Token value="retreatName" />,
      Cell: ({ row }: CellProps<Cart>) => {
        const retreat = retreats.find(x => x.id === row.original.retreat)
        return retreat?.name || ''
      }
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
