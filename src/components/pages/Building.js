import React from "react";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Floor from "../../components/molecules/Floor";
import { nanoid } from "nanoid";

/*
This function receives as a 'building' like this example
{
  "floors" : [
      { 
        ...
  "name" : "1234 Test Street",
  "retrieved_at" : 1617840940000
}

I.e. the 'building' prop represents a building. The prop consists of an object with three keys:
floors: array of floors
name: name of the building
retrieved_at: when building last reported

The function renders as a vertical flexbox of floors. 
*/

export default function Building(props) {
  return (
    <Box display="flex" flexDirection="column" p={1}>
      {props.building.floors
        .slice(0)
        .reverse()
        .map((floor) => (
          <React.Fragment key={nanoid()}>
            <Floor
              key={nanoid()}
              now={props.building.retrieved_at}
              floor={floor}
            />
            <Divider key={nanoid()} />
          </React.Fragment>
        ))}
    </Box>
  );
}
