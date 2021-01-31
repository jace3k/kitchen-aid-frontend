import React, { useEffect } from 'react'
import { Button, Card, CardActionArea, CardActions, CardContent, CircularProgress, Divider, List, ListItem, ListItemIcon } from '@material-ui/core'
import Token from 'components/Token'
import { Dish, IngredientRow } from 'store/dishes/types'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIngredientRowsRequest } from 'store/dishes/actions'
import { ApplicationState } from 'store'
import IngredientIcon from '@material-ui/icons/Grain'
import { ListItemText } from '@material-ui/core'
import DataGrid from 'components/DataGrid/DataGrid'
import { Column } from 'react-table'

interface DishInformationPanelProps {
  className?: string,
  dish: Dish | null,
}

const DishInformationPanel = ({ className, dish }: DishInformationPanelProps) => {
  const dispatch = useDispatch()
  const { ingredientRows, ingredientsLoading } = useSelector((state: ApplicationState) => state.dishes)

  const fetchIngredients = (dishId: number) => {
    dispatch(fetchIngredientRowsRequest(dishId))
  }

  const subText = (ing: IngredientRow) => `Cena: ${ing.price} zł - Margines: ${ing.margin} - Część: ${ing.part * 100}%`

  useEffect(() => {
    if (dish)
      fetchIngredients(dish.id)
  }, [dish])

  const columns: Column<IngredientRow>[] = [
    {
      id: '1',
      Header: 'Nazwa składnika',
      accessor: 'ingredient',
      Cell: ({ value }) => value.name,
    },
    {
      id: '2',
      Header: 'Cena',
      accessor: 'price',
      Cell: ({ value }) => `${value} zł`
    },
    {
      id: '4',
      Header: 'Margines',
      accessor: 'margin',
    },
    {
      id: '5',
      Header: 'Część',
      accessor: 'part',
      Cell: ({ value }) => `${value * 100}%`,
    }
  ]


  if (dish) {
    return (
      <Card className={className}>
        <CardContent>
          <h2>{dish.name}</h2>
          <Divider />
          <h3><Token value="ingredients" /></h3>
          {/* {ingredientsLoading && <div style={{ textAlign: 'center' }}><CircularProgress /></div>} */}
          <DataGrid
              data={ingredientRows}
              columns={columns}
              loading={ingredientsLoading}
            />



          {/* <List dense>
            {ingredientRows.map(ing => (
              <ListItem key={`list-item-ing-row-${ing.id}`}>
                <ListItemIcon>
                  <IngredientIcon />
                </ListItemIcon>
                <ListItemText primary={ing.ingredient.name} secondary={subText(ing)} />
              </ListItem>
            ))}
          </List> */}
          <Divider />

        </CardContent>
        <CardActions>
          <Button color="primary" disabled={ingredientsLoading}>
            Zmień przepis
          </Button>
          <Button color="secondary" disabled={ingredientsLoading}>
            Usuń
          </Button>
        </CardActions>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardContent>
        <h3 style={{ textAlign: 'center' }}>Wybierz danie aby poznać jego szczegóły.</h3>
      </CardContent>
    </Card>
  )
}

export default DishInformationPanel
