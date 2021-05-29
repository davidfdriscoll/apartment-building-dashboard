import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
  formcontrollabel: {
    marginLeft: theme.spacing(1),
  },
}));

export default function SettingsSwitch(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setToggle(event.target.checked);
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Switch checked={props.toggle} onChange={handleChange} name={props.name} />}
        label={props.name}
        labelPlacement="start"
        className={classes.formcontrollabel}
      />
    </FormGroup>
  );
}