import React from 'react';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Building from './components/pages/Building';
import sampleBuilding from './1234_Test_Street.json';

const theme = createMuiTheme({

});

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   buildingName: {
      flexGrow: 1,
   },
}));

function App() {
   const classes = useStyles();

   const nowTime = new Date(sampleBuilding.retrieved_at);
   const timeFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      timeStyle: "medium",
      dateStyle: "medium"
    });
    const humanReadableNow = timeFormatter.format(nowTime);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
         <Toolbar>
            <Typography variant="h6" className={classes.buildingName}>
               {sampleBuilding.name}
            </Typography>
            <Typography variant="h6">
               {humanReadableNow}
            </Typography>
         </Toolbar>
      </AppBar>
      <Building
        now={sampleBuilding.retrieved_at} 
        building={sampleBuilding}
      />
    </ThemeProvider>
  );
}

export default App;