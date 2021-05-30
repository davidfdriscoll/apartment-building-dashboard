import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Popper from "@material-ui/core/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";

import { nanoid } from "nanoid";

import StyledRadiatorIcon from "../../components/atoms/StyledRadiatorIcon";
import RadiatorPopperText from "../../components/atoms/RadiatorPopperText";

import assessRadiator from "../../components/atoms/assessRadiator";

// This component renders a single radiator. It takes two props:

// radiator: a single radiator object composed of a radiator number and nodes with four properties, e.g.
// {
//   "nodes" : [
//      {
//         "last_message" : 1617840671000,
//         "lora_euid" : "D1E720CCCC347E6F",
//         "radiator_temperature" : 215,
//         "room_temperature" : 71
//      },
//      {
//         "last_message" : 1617840671000,
//         "lora_euid" : "3C53C5A4B807AD39",
//         "radiator_temperature" : 215,
//         "room_temperature" : 71
//      }
//   ],
//   "number" : 1
// },
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

const useStyles = makeStyles((theme) => ({
  button: {
    padding: 0,
  },
}));

export default function Radiator(props) {
  const classes = useStyles();

  const coldRadiator =
    assessRadiator(props.radiator, props.now) === "coldRadiator";
  const offlineRadiator =
    assessRadiator(props.radiator, props.now) === "offlineRadiator";

  // If this radiator has no devices
  if (props.radiator.nodes.length === 0)
    return <StyledRadiatorIcon devicelessRadiator={true} width={1} />;

  return (
    <PopupState variant="popper" popupId={nanoid()}>
      {(popupState) => (
        <div>
          <IconButton className={classes.button} {...bindToggle(popupState)}>
            <StyledRadiatorIcon
              coldRadiator={coldRadiator}
              offlineRadiator={offlineRadiator}
              width={props.radiator.nodes.length}
            />
          </IconButton>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <ClickAwayListener onClickAway={popupState.close}>
                <Fade {...TransitionProps} timeout={350}>
                  <Paper elevation={3}>
                    <RadiatorPopperText
                      now={props.now}
                      radiator={props.radiator}
                      coldRadiator={coldRadiator}
                      offlineRadiator={offlineRadiator}
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
