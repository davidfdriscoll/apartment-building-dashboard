import React from "react";
import Box from "@material-ui/core/Box";
import Space from "../../components/atoms/Space";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
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
      } ...

I.e. the 'unit' prop represents an apartment. The prop consists of an object with two keys:
name, name of the unit (e.g. 1C)
spaces, an array of spaces

The function renders as a horizontal flexbox, with the name and each space. 
*/

const useStyles = makeStyles((theme) => ({
  unit: {
    display: "inline-flex",
  },
  spaces: {
    display: "inline-flex",
    [theme.breakpoints.down("md")]: {
      flexGrow: 1,
    },
    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
    },
  },
  unitName: {
    alignSelf: "center",
  },
}));

export default function Unit(props) {
  const classes = useStyles();

  return (
    <Box
      key={nanoid()}
      className={classes.unit}
      flexDirection="row"
      p={1}
      m={1}
      border={1}
      borderColor="primary.main"
      borderRadius={16}
    >
      <Typography variant="h5" className={classes.unitName} p={1}>
        {props.unit.name}
      </Typography>
      <Box
        key={nanoid()}
        flexDirection="row"
        justifyContent="center"
        className={classes.spaces}
      >
        {props.unit.spaces.map((space) => (
          <Space key={nanoid()} now={props.now} space={space} />
        ))}
      </Box>
    </Box>
  );
}
