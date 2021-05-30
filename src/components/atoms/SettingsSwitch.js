import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  formGroup: {
    alignItems: "center",
  },
  formControlLabel: {
    marginRight: 0,
  },
  typography: {
    paddingLeft: theme.spacing(1),
  },
}));

export default function SettingsSwitch(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setToggle(event.target.checked);
  };

  return (
    <FormGroup row className={classes.formGroup}>
      <FormControlLabel
        control={
          <Switch
            checked={props.toggle}
            onChange={handleChange}
            name={props.name}
          />
        }
        labelPlacement="end"
        className={classes.formControlLabel}
      ></FormControlLabel>
      {props.icon}
      <Typography className={classes.typography}>{props.name}</Typography>
    </FormGroup>
  );
}
