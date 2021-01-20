import React, { useEffect } from 'react'
import { Badge, Card, CardContent, CardHeader, Container, Divider, IconButton, LinearProgress, List, ListItem, ListItemText, Tooltip } from '@material-ui/core'
import { useStyles } from './styles'
import { RouteComponentProps } from 'react-router-dom'
import CartIcon from '@material-ui/icons/AddShoppingCart'
import MealsIcon from '@material-ui/icons/Fastfood'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMealsForRetreatRequest } from 'store/retreats/actions'
import { ApplicationState } from 'store'
import Token from 'components/Token'

const RetreatDetail: React.FC<RouteComponentProps<{ id: string }>> = props => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { allMealsForRetreat, currentRetreat, loading } = useSelector((state: ApplicationState) => state.retreats)

  useEffect(() => {
    const { id } = props.match.params
    dispatch(fetchMealsForRetreatRequest(parseInt(id)))
  }, [])

  return (
    <>
      { loading && <LinearProgress />}
      <Container className={classes.detailContainer}>

        <Card className={classes.detailInformationPanel}>
          <CardContent>
            <h1>{currentRetreat?.name}</h1>
            <Divider style={{ marginBottom: 10 }} />
            <Tooltip title={<Token value="cartsCounter" />}>
              <IconButton>
                <Badge badgeContent={currentRetreat?.carts} color="primary" className={classes.badge}>
                  <CartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title={<Token value="mealsCounter" />}>
              <Badge badgeContent={currentRetreat?.mealsCount} color="secondary" className={classes.badge}>
                <MealsIcon />
              </Badge>
            </Tooltip>
          </CardContent>
        </Card>
        <Card className={classes.detailMealsList}>
          <CardContent>
            <h2><Token value="meals" /></h2>
            <Divider />
            <List>
              {allMealsForRetreat.map(meal => (
                <ListItem button key={meal.id}>
                  <ListItemText>
                    {meal.name}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default RetreatDetail
