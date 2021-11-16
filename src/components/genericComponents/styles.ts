import { makeStyles, Theme, createStyles } from "@mui/material"

export const styles = (theme: Theme) => ({
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
  wideDetailContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  detailInformationPanel: {
    width: 'auto',
    margin: 10,
    minWidth: 250,
    [theme.breakpoints.up('md')]: {
      width: 300,
    }
  },
  wideDetailInformationPanel: {
    width: 'auto',
    margin: 10,
    minWidth: 250,
  },
  itemList: {
    minWidth: 250,
    flexGrow: 1,
    margin: 10,
  },
  badge: {
    margin: 10,
  }
})

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
  wideDetailContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  detailInformationPanel: {
    width: 'auto',
    margin: 10,
    minWidth: 250,
    [theme.breakpoints.up('md')]: {
      width: 300,
    }
  },
  wideDetailInformationPanel: {
    width: 'auto',
    margin: 10,
    minWidth: 250,
  },
  itemList: {
    minWidth: 250,
    flexGrow: 1,
    margin: 10,
  },
  badge: {
    margin: 10,
  }
}))
