import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { nanoid } from "nanoid";

import { formatDistance } from "date-fns";
import formatDateAndTime from "../../components/atoms/formatDateAndTime";

import isColdNode from "../../components/atoms/isColdNode";
import isOfflineNode from "../../components/atoms/isOfflineNode";

/* 
This components generates the text for the popper for each radiator. It takes as props:
now
radiator
*/

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(1),
  },
}));

export default function RadiatorPopperText(props) {
  const classes = useStyles();

  const nowTime = new Date(props.now);

  return (
    <Box p={1}>
      <Typography className={classes.typography} variant="h5">
        Radiator {props.radiator.number}
      </Typography>
      <Typography variant="h6">
        <Box pl={1} fontWeight="fontWeightBold" fontFamily="Monospace">
          Nodes
        </Box>
      </Typography>
      {props.radiator.nodes.map((node, index) => (
        <Box
          p={1}
          m={1}
          border={1}
          borderColor="secondary.main"
          borderRadius={16}
          key={nanoid()}
        >
          <Typography
            className={classes.typography}
            color={isOfflineNode(props.now, node) ? "error" : "inherit"}
          >
            Last Message: {formatDateAndTime(new Date(node.last_message))} (
            {formatDistance(new Date(node.last_message), nowTime)} ago)
          </Typography>
          <Typography
            className={classes.typography}
            color={isColdNode(node) ? "error" : "inherit"}
          >
            {isOfflineNode(props.now, node) && "Last Recorded"} Radiator
            Temperature: {node.radiator_temperature}°F
          </Typography>
          <Typography className={classes.typography}>
            {isOfflineNode(props.now, node) && "Last Recorded"} Room
            Temperature: {node.room_temperature}°F
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
