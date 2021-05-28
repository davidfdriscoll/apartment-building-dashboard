import React from "react";
import Box from "@material-ui/core/Box";
import Unit from "../../components/atoms/Unit";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
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

The function renders as a horizontal flexbox, with the name of the floor, spaces, and units. 
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
        <Box key={nanoid()} className={classes.floor} width="100%" flexDirection="column">
          <Typography variant="h4" color="primary" p={3}>
            {props.floor.name}
          </Typography>
          {props.floor.spaces.length > 0 && (
            <Unit
              key={nanoid()}
              now={props.now}
              unit={{ name: "", spaces: props.floor.spaces }}
            />
          )}
          {props.floor.units.map((unit) => (
            <Unit key={nanoid()} now={props.now} unit={unit} />
          ))}
        </Box>

      </Hidden>

      {/* large view */}
      <Hidden smDown>
        <Box key={nanoid()} className={classes.floor} flexDirection="row">
          <Typography variant="h4" color="primary" className={classes.floorName}>
            {props.floor.name}
          </Typography>
          {props.floor.spaces.length > 0 && (
            <Unit
              key={nanoid()}
              now={props.now}
              unit={{ name: "", spaces: props.floor.spaces }}
            />
          )}
          {props.floor.units.map((unit) => (
            <Unit key={nanoid()} now={props.now} unit={unit} />
          ))}
        </Box>
      </Hidden>
    </div>
  );
}
