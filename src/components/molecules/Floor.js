import React from "react";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import FloorElements from "../../components/atoms/FloorElements";
import { makeStyles } from "@material-ui/core/styles";
import { nanoid } from "nanoid";

/*
This function receives as props 'now' and a 'floor' like this example
   "level" : 1,
   "name" : "1",
   "spaces" : [],
   "units" : [
      {
         "name" : "1A",
         "spaces" : [
            {
               "name" : "Kitchen",
               "radiators" : []
            },
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

I.e. the 'floor' prop represents a floor. The prop consists of an object with four keys:
level: floor level
name: name of the floor
spaces: units with radiators not within units
units

The function renders as a flexbox, with the name of the floor, spaces, and units. 
The flexbox is vertical in mobile mode and horizontal in desktop mode.
The actual arrangement of floor name, space, and unit is done by a helper component.
It renders each independent space as a dummy unit with no name
*/

const useStyles = makeStyles((theme) => ({
  floor: {
    display: "inline-flex",
  },
  floorName: {
    padding: theme.spacing(2),
  },
}));

export default function Floor(props) {
  const classes = useStyles();

  return (
    <div>
      {/* mobile view */}
      <Hidden mdUp>
        <Box
          key={nanoid()}
          className={classes.floor}
          width="100%"
          flexDirection="column"
        >
          <FloorElements now={props.now} floor={props.floor} />
        </Box>
      </Hidden>

      {/* large view */}
      <Hidden smDown>
        <Box key={nanoid()} className={classes.floor} flexDirection="row">
          <FloorElements now={props.now} floor={props.floor} />
        </Box>
      </Hidden>
    </div>
  );
}
