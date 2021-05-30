import React from "react";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import Building from "./components/pages/Building";
import ApartmentAppBar from "./components/molecules/ApartmentAppBar";
import sampleBuilding from "./1234_Test_Street.json";
import Legend from './components/pages/Legend';


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

  // Three choices for display
  // Show units without any devices (i.e. 2D)
  const [showEmptyUnits, setShowEmptyUnits] = React.useState(false);
  // Show spaces without radiators altogether
  const [showEmptySpaces, setShowEmptySpaces] = React.useState(false);
  // Show spaces with radiators but without installed devices
  const [showDevicelessRadiators, setShowDevicelessRadiators] = React.useState(false);
  const [currentBuilding, setCurrentBuilding] = React.useState(sampleBuilding);

  React.useEffect(() => {
    // Some data cleaning here performed on the front end
    // Normally this would be done elsewhere in the creation of the JSON

    let tempBuilding = JSON.parse(JSON.stringify(sampleBuilding));

    // Remove units without any devices
    if(!showEmptyUnits)
      // for each floor
      for(let i = tempBuilding.floors.length - 1; i >= 0; i--)
        // for each unit
        for(let j = tempBuilding.floors[i].units.length - 1; j >= 0; j--) {
          const unit = tempBuilding.floors[i].units[j];
          // if all spaces in that unit
          if(unit.spaces.length === unit.spaces.filter((space) => {
            // have no radiators at all
            if(space.radiators.length === 0) return true;
            // or have no nodes (devices) attached to their radiators
            if(space.radiators.length === space.radiators.filter((radiator) => radiator.nodes.length === 0).length) return true;
            return false;
          }).length)
            // remove that unit
            tempBuilding.floors[i].units.splice(j, 1);
        }

    // Remove spaces without radiators and/or without devices
    // only skip this loop if we are showing all devices
 //   if(!(showEmptySpaces && showDevicelessRadiators))
      // for each floor
      for(let i = tempBuilding.floors.length - 1; i >= 0; i--)
        // for each unit
        for(let j = tempBuilding.floors[i].units.length - 1; j >= 0; j--) {
          // for each space
          for(let k = tempBuilding.floors[i].units[j].spaces.length - 1; k >= 0; k--) {
            const space = tempBuilding.floors[i].units[j].spaces[k];
            if(
              // if that space has no radiators and we are not showing such spaces
              (space.radiators.length === 0 && !showEmptySpaces) ||
              // or if that space has radiators but no devices and we are not showing such spaces
              (space.radiators.length >= 1 && 
               space.radiators.length === space.radiators.filter((radiator) => radiator.nodes.length === 0).length && 
               !showDevicelessRadiators)
            ) {
              tempBuilding.floors[i].units[j].spaces.splice(k, 1);
            }          
          } 
        } 

    setCurrentBuilding(tempBuilding);
  }, [showEmptySpaces, showEmptyUnits, showDevicelessRadiators]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApartmentAppBar 
        building={currentBuilding} 
        showEmptyUnits={showEmptyUnits}
        setShowEmptyUnits={setShowEmptyUnits}
        showEmptySpaces={showEmptySpaces}
        setShowEmptySpaces={setShowEmptySpaces}
        showDevicelessRadiators={showDevicelessRadiators}
        setShowDevicelessRadiators={setShowDevicelessRadiators}
      />
      <Container disableGutters maxWidth="lg">
        <Paper className={classes.paper}>
          <Building now={currentBuilding.retrieved_at} building={currentBuilding} />
        </Paper>
        <Paper className={classes.paper}>
          <Legend />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;