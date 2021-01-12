import { makeStyles, Theme, createStyles } from "@material-ui/core"

export const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column-reverse',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
    minWidth: 300,
  },
  title: {
    fontSize: 20,
    [theme.breakpoints.up('sm')]: {
      fontSize: 40,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 70,
    },

  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: 30,
  },
  littleMargin: {
    margin: 5,
  },
  fullWidth: {
    width: '100%',
  },
  bold: {
    fontWeight: 'bold'
  }
}))