import React from 'react';
import Box from '@material-ui/core/Box';
import Space from '../../components/atoms/Space';
import Unit from '../../components/atoms/Unit';
import Typography from '@material-ui/core/Typography';
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
*/ 

const useStyles = makeStyles((theme) => ({
  floor: {
    display: 'inline-flex',
    border: '1px solid black',
  },
  floorName: {
    alignSelf: 'center',
  }
}));

export default function Floor(props) {
  const classes = useStyles();

  return (
    <Box key={nanoid()} className={classes.floor} flexDirection="row" p={1} m={1}>
      <Typography variant="h1" className={classes.floorName} p={1}>{props.floor.name}</Typography>
      {props.floor.spaces.map((space) => <Space key={nanoid()} now={props.now} space={space} />)}
      {props.floor.units.map((unit) => <Unit key={nanoid()} now={props.now} unit={unit} />)}
    </Box>
  );
}