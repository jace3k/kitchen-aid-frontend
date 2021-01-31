import { makeStyles, Theme, createStyles } from "@material-ui/core"

export const useStyles = makeStyles((theme: Theme) => createStyles({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      right: theme.spacing(10),
    }
  },
  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    }
  },
  detailInformationPanel: {
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
    margin: 10,
  },
  detailList: {
    flexGrow: 1,
    margin: 10,
  },
  badge: {
    margin: 10,
  }
}))
