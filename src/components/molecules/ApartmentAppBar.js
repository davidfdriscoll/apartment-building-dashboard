/* This component renders an appbar for the dashboard.
The appbar has three main components:

An icon triggering a settings dialog to control the visualization
The name of the building
The last recorded time in human readable format

It receives one prop named 'building'
*/

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import clsx from "clsx";

import formatDateAndTime from "../../components/atoms/formatDateAndTime";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(2),
    },
    color: theme.palette.common.white,
  },
  appBarFont: {
    color: theme.palette.common.white,
    textTransform: "uppercase",
    letterSpacing: "1",
    fontSize: "16px",
    fontWeight: "600",
  },
  buildingName: {
    flexGrow: 1,
  },
}));

export default function ApartmentAppBar(props) {
  const classes = useStyles();

  const humanReadableNow = formatDateAndTime(
    new Date(props.building.retrieved_at)
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          className={clsx(classes.buildingName, classes.appBarFont)}
        >
          {props.building.name}
        </Typography>
        <Typography variant="h6" className={classes.appBarFont}>
          {humanReadableNow}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
