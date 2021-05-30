import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import StyledRadiatorIcon from '../../components/atoms/StyledRadiatorIcon';

const useStyles = makeStyles((theme) => ({
  typography: {
    paddingLeft: theme.spacing(1),
  },
}));

export default function Legend(props) {
  const classes = useStyles(props);

  return (
    <Box display="flex" flexDirection="column">
      <Box p={1} display="flex" alignItems="center">
        <StyledRadiatorIcon coldRadiator={false} offlineRadiator={false} width={1} /> 
        <Typography className={classes.typography}>Device and Radiator without issues</Typography>
      </Box>
      <Box p={1} display="flex" alignItems="center">
        <StyledRadiatorIcon coldRadiatorDemo={true} width={1} /> 
        <Typography className={classes.typography}>Radiator with an unusual temperature</Typography>
      </Box>
      <Box p={1} display="flex" alignItems="center">
        <StyledRadiatorIcon offlineRadiator={true} width={1} />
        <Typography className={classes.typography}>Device that is offline</Typography>
      </Box>      
      <Box p={1} display="flex" alignItems="center">
        <StyledRadiatorIcon devicelessRadiator={true} width={1} />
        <Typography className={classes.typography}>Radiator without any devices</Typography>
      </Box> 
    </Box>
  );
}