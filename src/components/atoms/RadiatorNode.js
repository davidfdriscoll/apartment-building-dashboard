import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as RadiatorNodeIcon } from '../../icons/radiator.svg';

import { nanoid } from "nanoid";

import { formatDistance } from 'date-fns';
import formatDateAndTime from '../../components/atoms/formatDateAndTime';


// This component renders a single radiator node. It takes three props: 

// node: a single node object with four entries, e.g.
// {
//   "last_message" : 1617840671000,
//   "lora_euid" : "D1E720CCCC347E6F",
//   "radiator_temperature" : 215,
//   "room_temperature" : 71
// },
// radiatorNumber: the radiator number (i.e. to which radiator this node belongs), and
// now: the current time in unix epoch.


// The component presents this information both visually and textually within a button. 
// A popper on the button reads as follows (e.g.):
// Radiator Number: 1
// Last Message: April 7, 2021, 12:15am (30 seconds ago)
// Radiator Temperature: 215°F
// Room Temperature: 71°F

// The radiator icon within the button is also styled to communicate whether the node is working properly:
// Default color (black) indicates a normal node
// Disabled color (grey) indicates a node that appears to be offline (last message > 10 minutes ago)
// Error color (red) indicates a node with an unusual temperature 
  // radiator temperature outside bounds of 205-225 F
  // room temperature outside bounds of 65-80 F

const radiatorMin = 205;
const radiatorMax = 225;
const roomMin = 65;
const roomMax = 80;

const lastMessageMax = 10 * 60 * 10000; // 10 minutes -> milliseconds
 
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(1),
  },
  button: {
    padding: 0,
  }
}));

export default function RadiatorNode(props) {
  const classes = useStyles();

  const coldNode = 
    props.node.radiator_temperature < radiatorMin ||
    props.node.radiator_temperature > radiatorMax ||
    props.node.room_temperature < roomMin ||
    props.node.room_temperature > roomMax;
  const offlineNode = (props.now - props.node.last_message) > lastMessageMax;

  let color = 'inherit';
  if(offlineNode) color = 'disabled';
  if(coldNode) color = 'error';

  const nowTime = new Date(props.now);
  const lastMessageTime = new Date(props.node.last_message);
  const humanReadableTime = formatDateAndTime(lastMessageTime);
  const distanceSinceLastMessage = formatDistance(
    lastMessageTime,
    nowTime
  );

  return (
    <PopupState variant="popper" popupId={nanoid()}>
      {(popupState) => (
        <div>
          <IconButton className={classes.button} {...bindToggle(popupState)}>
            <SvgIcon 
              aria-label='Radiator Node'
              component={RadiatorNodeIcon} 
              viewBox="0 0 600 600" 
              fontSize = 'large'
              className={classes.radiatorNode} 
              color={color}
            />
          </IconButton>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Typography 
                    className={classes.typography}
                  >
                    Radiator Number: {props.radiatorNumber}
                  </Typography>
                  <Typography 
                    className={classes.typography}
                    color={ offlineNode ? 'error' : 'inherit'}
                  >
                    Last Message: {humanReadableTime} ({distanceSinceLastMessage} ago)
                  </Typography>
                  <Typography 
                    className={classes.typography}
                    color={ coldNode ? 'error' : 'inherit' }
                  >
                    Radiator Temperature: {props.node.radiator_temperature}°F
                  </Typography>
                  <Typography 
                    className={classes.typography}
                  >
                    Room Temperature: {props.node.room_temperature}°F
                  </Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}