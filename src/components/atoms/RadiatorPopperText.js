import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { formatDistance } from 'date-fns';
import formatDateAndTime from '../../components/atoms/formatDateAndTime';


/* 
This components generates the text for the popper for each radiator. It takes as props:
now
node
radiatorNumber
coldNode
offlineNode
*/

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(1),
  },
}));

export default function RadiatorPopperText(props) {
  const classes = useStyles();

  const nowTime = new Date(props.now);
  const lastMessageTime = new Date(props.node.last_message);
  const humanReadableTime = formatDateAndTime(lastMessageTime);
  const distanceSinceLastMessage = formatDistance(
    lastMessageTime,
    nowTime
  );
  
  return (
    <>
      <Typography 
        className={classes.typography}
      >
        Radiator Number: {props.radiatorNumber}
      </Typography>
      <Typography 
        className={classes.typography}
        color={ props.offlineNode ? 'error' : 'inherit'}
      >
        Last Message: {humanReadableTime} ({distanceSinceLastMessage} ago)
      </Typography>
      <Typography 
        className={classes.typography}
        color={ props.coldNode ? 'error' : 'inherit' }
      >
        Radiator Temperature: {props.node.radiator_temperature}°F
      </Typography>
      <Typography 
        className={classes.typography}
      >
        Room Temperature: {props.node.room_temperature}°F
      </Typography>
    </>
  )
}