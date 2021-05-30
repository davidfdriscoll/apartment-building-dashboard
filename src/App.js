import React from "react";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import Building from "./components/pages/Building";
import ApartmentAppBar from "./components/molecules/ApartmentAppBar";
import sampleBuilding from "./1234_Test_Street.json";
import Legend from "./components/pages/Legend";

import mockApi from "./components/molecules/mockApi";
import countRadiators from "./components/molecules/countRadiators";

const theme = createMuiTheme({
  typography: {
    fontFamily: `'Open Sans', sans-serif`,
  },
  palette: {
    primary: {
      main: "#efbb40",
    },
    secondary: {
      main: "#26a9e0",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          height: "100%",
        },
        body: {
          height: "100%",
          backgroundColor: "#d7e9f8",
        },
        "#root": {
          height: "100%",
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(0),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(2),
      margin: theme.spacing(2),
    },
  },
}));

function App() {
  const classes = useStyles();

  const [vizOptions, setVizOptions] = React.useState({
    showGoodRadiators: true,
    showColdRadiators: true,
    showOfflineRadiators: true,
    // Show spaces with radiators but without installed devices
    showDevicelessRadiators: false,
    showLongRadiators: true,
    // Show units without any devices (e.g. 2D)
    showEmptyUnits: false,
    // Show spaces without radiators altogether
    showEmptySpaces: false,
  });

  const [radiatorCount, setRadiatorCount] = React.useState({
    goodRadiator: 0,
    offlineRadiator: 0,
    coldRadiator: 0,
    devicelessRadiator: 0,
    longRadiator: 0,
  });

  const [currentBuildingViz, setCurrentBuildingViz] =
    React.useState(sampleBuilding);

  React.useEffect(() => {
    setRadiatorCount(countRadiators(sampleBuilding));
  }, []);

  React.useEffect(() => {
    let tempBuilding = JSON.parse(JSON.stringify(sampleBuilding));
    tempBuilding = mockApi(tempBuilding, vizOptions);
    setCurrentBuildingViz(tempBuilding);
  }, [vizOptions]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApartmentAppBar building={currentBuildingViz} />
      <Container disableGutters maxWidth="lg">
        <Paper className={classes.paper}>
          <Legend
            vizOptions={vizOptions}
            setVizOptions={setVizOptions}
            radiatorCount={radiatorCount}
          />
        </Paper>
        <Paper className={classes.paper}>
          <Building building={currentBuildingViz} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
