import React from "react";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import Building from "./components/pages/Building";
import sampleBuilding from "./1234_Test_Street.json";

import clsx from 'clsx';

import formatDateAndTime from "./components/atoms/formatDateAndTime";

const theme = createMuiTheme({
  typography: {
    fontFamily: `'Open Sans', sans-serif`
  },
  palette: {
    primary: {
      main: '#efbb40',
    },
    secondary: {
      main: '#26a9e0',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          backgroundColor: '#d7e9f8',
        },
        '#root': {
          height: '100%',          
        }
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBarFont: {
    color: theme.palette.common.white,
    textTransform: 'uppercase',
    letterSpacing: '1',
    fontSize: "16px",
    fontWeight: '600',
  },
  buildingName: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2),
      margin: theme.spacing(2),
    }
  },
}));

function App() {
  const classes = useStyles();
  const humanReadableNow = formatDateAndTime(
    new Date(sampleBuilding.retrieved_at)
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={clsx(classes.buildingName, classes.appBarFont)}>
            {sampleBuilding.name}
          </Typography>
          <Typography variant="h6" className={classes.appBarFont}>{humanReadableNow}</Typography>
        </Toolbar>
      </AppBar>
      <Container disableGutters maxWidth="lg">
        <Paper className={classes.paper}>
          <Building now={sampleBuilding.retrieved_at} building={sampleBuilding} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
