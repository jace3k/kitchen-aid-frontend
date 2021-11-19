import React, { useEffect, useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CellProps, Column, Row } from 'react-table'
import { Container } from '@mui/material'
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
        const retreatA = retreats.find(x => x.id === a.original.retreat)
        const retreatB = retreats.find(x => x.id === b.original.retreat)
        if (retreatA && retreatB) {
          return retreatA.name.toLowerCase().localeCompare(retreatB.name.toLowerCase())
        }
        return 1
      },
      disableSortBy: !retreats.length,
      Cell: ({ row }: CellProps<Cart>) => {
        const retreat = retreats.find(x => x.id === row.original.retreat)
        return retreat?.name || ''
      },
      Filter: TextFilter,
      // TODO: get retreats from backend in one carts fetch
      // filter: (rows: Row<Cart>[], columnIds: String[], filterValue: string) => {
      //   const retreatsMap = {}

      //   return rows.filter(row => )
      // },
      disableFilters: true
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
