import React from 'react';
import Box from '@material-ui/core/Box';
import Unit from '../../components/atoms/Unit';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
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
    display: 'inline-flex',
  },
  floorName: {
    alignSelf: 'center',
  }
}));

export default function Floor(props) {
  const classes = useStyles();

  return (
    <Box key={nanoid()} flexDirection="column">
      <Divider />
      <Box 
        key={nanoid()} 
        className={classes.floor} 
        flexDirection="row" 
        flexWrap="wrap" 
        justifyContent="space-between"
      >
        <Typography variant="h4" p={3}>{props.floor.name}</Typography>
        {props.floor.spaces.length > 0 && 
          <Unit key={nanoid()} now={props.now} unit={{"name": "", "spaces": props.floor.spaces}} />
        }
        {props.floor.units.map((unit) => <Unit key={nanoid()} now={props.now} unit={unit} />)}
      </Box>
    </Box>
  );
}