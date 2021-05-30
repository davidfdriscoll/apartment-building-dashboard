import React from "react";
import Box from "@material-ui/core/Box";
import Radiator from "../../components/atoms/Radiator";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { nanoid } from "nanoid";

/*
This function receives as props 'now' and a 'space' like this example
{
  "name" : "Studio",
  "radiators" : [
    {
        "nodes" : [
          {
              "last_message" : 1617840671000,
              "lora_euid" : "D1E720CCCC347E6F",
              "radiator_temperature" : 215,
              "room_temperature" : 71
          },
          {
              "last_message" : 1617840671000,
              "lora_euid" : "3C53C5A4B807AD39",
              "radiator_temperature" : 215,
              "room_temperature" : 71
          }
        ],
        "number" : 1
    },
    {
        "nodes" : [
          {
              "last_message" : 1617840786000,
              "lora_euid" : "658914C159839C21",
              "radiator_temperature" : 218,
              "room_temperature" : 75
          }
        ],
        "number" : 2
    }
  ]
}

I.e. the 'space' prop represents a room (or other section of the building, e.g. hallway). The prop consists of an object with two keys:
name, name of space
radiators, an array of objects, where each object represents an array of nodes.

The function passes each node onto RadiatorNode, displaying distinct nodes vertically and extra long nodes horizontally. 
The name of the space is placed at the top of the box.
*/

const useStyles = makeStyles((theme) => ({
  space: {
    display: "inline-flex",
    alignItems: "center",
  },
  inlineFlex: {
    display: "inline-flex",
  },
}));

export default function Space(props) {
  const classes = useStyles();

  return (
    <Box key={nanoid()} className={classes.space} flexDirection="column" p={1}>
      <Typography variant="caption" align="center">
        {props.space?.name}
      </Typography>
      <Box key={nanoid()} className={classes.inlineFlex}>
        {props.space.radiators.map((radiator) => (
          <Radiator key={nanoid()} now={props.now} radiator={radiator} />
        ))}
      </Box>
    </Box>
  );
}
