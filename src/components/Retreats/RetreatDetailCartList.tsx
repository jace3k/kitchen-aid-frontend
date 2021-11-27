import React from 'react'
import { useSelector } from 'react-redux'
import { CellProps } from 'react-table'
import { ApplicationState } from 'store'
import { Cart } from 'utils/interfaces/cart.interface'
import * as routes from 'utils/routes'
import Token from 'components/Token'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'
import CartName from '../Carts/CartName'
import TextFilter from 'components/genericComponents/Filters/TextFilter'
import CellMore from 'components/genericComponents/CellMore/CellMore'


const RetreatDetailCartList = () => {
  const { carts, loading } = useSelector((state: ApplicationState) => state.retreats)

  const columns = [
    {
      id: '1',
      accessor: 'id',
      Header: <Token value="cartLabel" />,
      Cell: ({ row }: CellProps<Cart>) => {
        return (
          <CartName id={row.original.id} />
        )
      },
      Filter: TextFilter,
    },
    {
      id: '99',
      Header: <Token value="more" />,
      Cell: ({ row }: CellProps<Cart>) => {
        return (
          <CellMore canOpenNewWindow
            handleOpenNewWindow={() => {
              const id = row.original.id
              window.open(`${routes.Carts}/${id}`, '_blank')
            }}
          />
        )
      }
    }
  ]
  return (
    <GenericTable columns={columns} data={carts} loading={loading} />
  )
}

export default RetreatDetailCartList
