import React from "react";
import Unit from "../../components/atoms/Unit";
import Typography from "@material-ui/core/Typography";
import { nanoid } from "nanoid";

/*
This component serves as a helper function for putting together the name, spaces, and units on a floor,
where as the Floor component arranges these elements differently for mobile and desktop view

It receives as props floor and now
*/

export default function FloorElements(props) {
  return (
    <>
      <Typography variant="h4" color="primary" p={3}>
        {props.floor.name}
      </Typography>
      {props.floor.spaces.length > 0 && (
        <Unit
          key={nanoid()}
          now={props.now}
          unit={{ name: "Shared", spaces: props.floor.spaces }}
        />
      )}
      {props.floor.units.map((unit) => (
        <Unit key={nanoid()} now={props.now} unit={unit} />
      ))}
    </>
  );
}
