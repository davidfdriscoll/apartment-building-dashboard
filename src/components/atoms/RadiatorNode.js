import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

import { nanoid } from "nanoid";

import StyledRadiatorNodeIcon from '../../components/atoms/StyledRadiatorNodeIcon';
import RadiatorPopperText from '../../components/atoms/RadiatorPopperText';


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


// The component presents this information both visually and textually within a button from helper components. 
// A popper on the button reads as follows (e.g.):
// Radiator Number: 1
// Last Message: April 7, 2021, 12:15am (30 seconds ago)
// Radiator Temperature: 215°F
// Room Temperature: 71°F
// This text is created in a helper component RadiatorPopperText

// The radiator icon within the button is also styled to communicate whether the node is working properly:
// Default color (green) indicates a normal node
// Disabled color (grey) indicates a node that appears to be offline (last message > 10 minutes ago)
// Error color (red) indicates a node with an unusual temperature 
  // radiator temperature outside bounds of 205-225 F
  // room temperature outside bounds of 65-80 F
// These icons and styling are created in a helper component StyledRadiatorNodeIcon

const radiatorMin = 205;
const radiatorMax = 225;
const roomMin = 65;
const roomMax = 80;

const lastMessageMax = 10 * 60 * 10000; // 10 minutes -> milliseconds
 
const useStyles = makeStyles((theme) => ({
  button: {
    padding: 0,
  },
}));

export default function RadiatorNode(props) {
  const classes = useStyles();

  const coldNode = 
    props.node.radiator_temperature < radiatorMin ||
    props.node.radiator_temperature > radiatorMax ||
    props.node.room_temperature < roomMin ||
    props.node.room_temperature > roomMax;
  const offlineNode = (props.now - props.node.last_message) > lastMessageMax;

  return (
    <PopupState variant="popper" popupId={nanoid()}>
      {(popupState) => (
        <div>
          <IconButton className={classes.button} {...bindToggle(popupState)}>
            <StyledRadiatorNodeIcon coldNode={coldNode} offlineNode={offlineNode} />
          </IconButton>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <ClickAwayListener onClickAway={popupState.close}>
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>
                    <RadiatorPopperText 
                      now={props.now}
                      node={props.node}
                      radiatorNumber={props.radiatorNumber}
                      coldNode={coldNode}
                      offlineNode={offlineNode}
                    />
                  </Paper>
                </Fade>
              </ClickAwayListener>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}