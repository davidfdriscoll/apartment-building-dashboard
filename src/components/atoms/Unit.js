import React from 'react';
import Box from '@material-ui/core/Box';
import Space from '../../components/atoms/Space';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { nanoid } from "nanoid";

/*
This function receives as props 'now' and a 'unit' like this example
{
    "name" : "1C",
    "spaces" : [
      {
          "name" : "Bedroom 1",
          "radiators" : [
            {
                "nodes" : [
                  {
                      "last_message" : 1617840763000,
                      "lora_euid" : "FE55275B554461AF",
                      "radiator_temperature" : 219,
                      "room_temperature" : 75
                  }
                ],
                "number" : 1
            }
          ]
      },
      {
          "name" : "Bedroom 2",
          "radiators" : [
            {
                "nodes" : [
                  {
                      "last_message" : 1617657051000,
                      "lora_euid" : "4F23C11506976B0F",
                      "radiator_temperature" : 211,
                      "room_temperature" : 74
                  }
                ],
                "number" : 1
            }
          ]
      },
      {
          "name" : "Dining Room",
          "radiators" : []
      },
      {
          "name" : "Hallway",
          "radiators" : [
            {
                "nodes" : [
                  {
                      "last_message" : 1617840811000,
                      "lora_euid" : "1CAFB11E12EC4D6F",
                      "radiator_temperature" : 219,
                      "room_temperature" : 76
                  }
                ],
                "number" : 1
            }
          ]
      },
      {
          "name" : "Living Room",
          "radiators" : [
            {
                "nodes" : [
                  {
                      "last_message" : 1617840665000,
                      "lora_euid" : "42FFB09C97242CA6",
                      "radiator_temperature" : 215,
                      "room_temperature" : 70
                  }
                ],
                "number" : 1
            }
          ]
      }
    ]
}

I.e. the 'unit' prop represents an apartment. The prop consists of an object with two keys:
name, name of the unit (e.g. 1C)
spaces, an array of spaces

The function renders as a horizontal flexbox, with the name and each space. 
*/ 

const useStyles = makeStyles((theme) => ({
  unit: {
    display: 'inline-flex',
    border: '1px solid black',
  },
  unitName: {
    alignSelf: 'center',
  }
}));

export default function Unit(props) {
  const classes = useStyles();

  return (
    <Box key={nanoid()} className={classes.unit} flexDirection="row" p={1} m={1}>
      <Typography variant="h2" className={classes.unitName} p={1}>{props.unit.name}</Typography>
      {props.unit.spaces.map((space) => <Space key={nanoid()} now={props.now} space={space} />)}
    </Box>
  );
}